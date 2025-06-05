import api from "../utils/api";
import { Show, createSignal, createEffect } from "solid-js";
import style from "./Home.module.scss";
import { useAuthentication } from "../context/AuthenticationContext";
import { ActivityCard } from "../components/Activity.jsx";
import { leadingAndTrailingDebounce } from "../utils/scheduled.js";
import { assert } from "../utils/assert.js";
import { formatTitleToUrl } from "../utils/formating.js";
import { A } from "@solidjs/router";

function Home() {
  const { accessToken, authUserData } = useAuthentication();

  return (
    <Show when={authUserData()}>
      <div class={style.container}>
        <CurrentWatchingMedia token={accessToken()} userId={authUserData().data.id} />
        <Activity token={accessToken()}/>
      </div>
    </Show>
  )
}

function Activity(props) {
  const [activityType, setActivityType] = createSignal(undefined);
  const [isFollowing, setIsFollowing] = createSignal(true);
  const [hasReplies, setHasReplies] = createSignal(undefined);
  const [variables, setVariables] = createSignal({
    "page": 1,
    "isFollowing": true,
  });
  const [activityData, { mutateCache }] = api.anilist.getActivity(props.token, variables);

  createEffect(() => {
    setVariables(current => {
      const base = {
        ...current,
        activityType: activityType(),
        isFollowing: isFollowing(),
        hasReplies: hasReplies(),
      };

      for (const key of Object.keys(base)) {
        if (base[key] !== current[key]) {
          return base;
        }
      }

      return current;
    });
  });

  return (
    <>
      <h2>Activity</h2>
      <div>
        <button onClick={() => setActivityType(undefined)}>All</button>
        <button onClick={() => setActivityType("TEXT")}>Text Status</button>
        <button onClick={() => setActivityType("MEDIA_LIST")}>List Progress</button>
      </div>
      <button onClick={() => {
        setIsFollowing(true); 
        setHasReplies(undefined);
      }}>Following</button>
      <button onClick={() => {
        setIsFollowing(false);
        setHasReplies(true);
      }}>Global</button>
      <div class="user-profile-activity">
        <For each={activityData()?.data.data.Page.activities}>{activity => (
          <ActivityCard activity={activity} mutateCache={mutateCache} />
        )}</For>
      </div>
    </>
  )
}


function CurrentWatchingMedia(props) {
  const [animeData, { mutateCache: mutateAnimeCache }] = api.anilist.wachingAnime(props.userId, props.token);
  const [mangaData, { mutateCache: mutateMangaCache }] = api.anilist.readingManga(props.userId, props.token);

  const sortAiringTime = (a, b) => {
    const [aTime, bTime] = [a.media.nextAiringEpisode?.airingAt, b.media.nextAiringEpisode?.airingAt];
    if (aTime && bTime) { return aTime - bTime; } 
    else if (aTime == bTime) { return 0; } 
    else if (aTime == null) { return 1; } 
    return -1;
  };

  return (
    <div class={style.header}>
      <Show when={animeData()}>
        <CurrentCards 
          cards={animeData().data.data.Page.mediaList.filter(anime => anime.media.status !== "FINISHED").toSorted(sortAiringTime)} 
          mutateCache={mutateAnimeCache} 
        />
        <CurrentCards 
          cards={animeData().data.data.Page.mediaList.filter(anime => anime.media.status === "FINISHED")} 
          mutateCache={mutateAnimeCache} 
        />
      </Show>
      <Show when={mangaData()}>
        <CurrentCards cards={mangaData().data.data.Page.mediaList} mutateCache={mutateMangaCache} />
      </Show>
    </div>
  );
}

function CurrentCards(props) {
  return (
    <Show when={props.cards.length}>
      <div class={style.rowContainer}>
        <For each={props.cards}>{cardData => (
          <CurrentCard data={cardData} mutateCache={props.mutateCache} />
        )}</For>
      </div>
    </Show>
  );
}

function CurrentCard(props) {
  const { accessToken } = useAuthentication();
  const [progress, setProgress] = createSignal(props.data.progress);
  const [airingEpisode, setAiringEpisode] = createSignal(props.data.media.nextAiringEpisode?.episode);
  const [isBehind, setIsBehind] = createSignal(props.data.media.nextAiringEpisode?.episode > progress() + 1);

  const triggerProgressIncrease = leadingAndTrailingDebounce(async (token, mediaId, newProgress) => {
    const response = await api.anilist.mutateMedia(token, {mediaId, progress: newProgress});
    if (response.status !== 200) { return; }

    assert(response.data.progress, "No progress found");
    props.data.progress = response.data.progress;
    if (response.data.status === "COMPLETED") {
      props.mutateCache(request => {
        request.data.data.Page.mediaList = request.data.data.Page.mediaList.filter(media => media.id !== props.data.id);
        return request;
      });
    } else {
      props.mutateCache(data => data);
    }
  }, 250, 2);

  createEffect(() => {
    setIsBehind(airingEpisode() > progress() + 1);
  });

  return (
    <A href={"/" + props.data.media.type.toLowerCase() + "/" + props.data.media.id + "/" + formatTitleToUrl(props.data.media.title.userPreferred)} class={style.card} >
      <img src={props.data.media.coverImage.large} alt="Cover." />
      <Show when={props.data.media.nextAiringEpisode?.airingAt}>
        <div class={style.normalInfo}>
          <p>Ep {props.data.media.nextAiringEpisode?.episode}</p>
          <EpisodeTime airingAt={props.data.media.nextAiringEpisode.airingAt} setAiringEpisode={setAiringEpisode}/>
          <Show when={isBehind()}>
            <div class={style.isBehind}></div>
          </Show>
        </div>
      </Show>
      <Switch fallback={
        <div class={style.hoverInfo} onClick={e => {
          e.preventDefault();
          triggerProgressIncrease(accessToken(), props.data.media.id, progress() + 1);
          setProgress(val => val + 1);
        }}>
          <p>{progress} <span class={style.plus}>+</span></p>
        </div>
      }>
        <Match when={
          props.data.media.episodes === progress() || props.data.media.chapters === progress()
        }>
          <div class={style.hoverInfo + " " + style.normal} onClick={e => e.preventDefault()}>
            <p>Completed</p>
          </div>
        </Match>
      </Switch>
      <div class={style.cardRight}>
        <Switch>
          <Match when={props.data.media.nextAiringEpisode?.episode && isBehind()}>
            <p>{airingEpisode() - (progress() + 1)} episode
              <Show when={airingEpisode() - (progress() + 1) > 1}>s</Show> behind
            </p>
          </Match>
          <Match when={props.data.media.nextAiringEpisode?.episode == null && props.data.media.episodes - progress() > 0}>
            <p>{props.data.media.episodes - progress()} episode
              <Show when={props.data.media.episodes - progress() > 1}>s</Show> left
            </p>
          </Match>
          <Match when={props.data.media.chapters - progress() > 0}>
            <p>{props.data.media.chapters - progress()} chapter
              <Show when={props.data.media.chapters - progress() > 1}>s</Show> left
            </p>
          </Match>
        </Switch>
        <p>{props.data.media.title.userPreferred}</p>
        <p class={style.progressStatus}>
          Progress: {progress()}
          <Show when={props.data.media.episodes}>/{props.data.media.episodes}</Show>
          <Show when={props.data.media.chapters}>/{props.data.media.chapters}</Show>
        </p>
      </div>
    </A>
  )
}

const [currentTime, setCurentTime] = createSignal((new Date()) / 1000);

setInterval(() => setCurentTime((new Date()) / 1000), 1000 * 30);

function EpisodeTime(props) {
  const [time, setTime] = createSignal(Math.abs(props.airingAt - currentTime()));
  const [timeLimitReached, setTimeLimitReached] = createSignal(false);

  createEffect(() => {
    setTime(Math.abs(props.airingAt - currentTime()));
    if (props.airingAt < currentTime() && timeLimitReached() == false) {
      props.setAiringEpisode(ep => ep + 1);
      setTimeLimitReached(true);
    }
  });

  return (
    <>
      <Show when={timeLimitReached()}>aired in</Show>
      <p>
        <Show when={Math.floor(time() / 3600 / 24)} children={days => (<>{days}d </>)} />
        <Show when={Math.floor((time() / 3600) % 24)} children={hours => (<>{hours}h </>)} />
        <Show when={Math.floor((time() % 3600) / 60)} children={minutes => (<>{minutes}m </>)} />
      </p>
    </>
  )
}

export default Home
