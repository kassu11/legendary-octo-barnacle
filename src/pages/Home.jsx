import { A } from "../components/CustomA";
import api from "../utils/api";
import { Show, createSignal, createEffect } from "solid-js";
import style from "./Home.module.scss";
import { useAuthentication } from "../context/AuthenticationContext";
import { ActivityCard } from "../components/Activity.jsx";
import { leadingAndTrailingDebounce } from "../utils/scheduled.js";

function Home() {
  const { accessToken, authUserData } = useAuthentication();

  return (
    <Show when={authUserData()}>
      <div class={style.container}>
        <CurrentWatchingMedia token={accessToken()} userId={authUserData().data.data.Viewer.id} />
        <div class={style.body}>
          <div class={style.left}>
            <Activity token={accessToken()}/>
          </div>
          <div class={style.right}>
            <div class={style.rowContainer}></div>
            <div class={style.rowContainer}></div>
            <div class={style.rowContainer}></div>
          </div>
        </div>
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
      {console.log(activityData())}
      <For each={activityData()?.data.data.Page.activities}>{activity => (
        <ActivityCard activity={activity} mutateCache={mutateCache} />
      )}</For>
    </>
  )
}


function CurrentWatchingMedia(props) {
  const [animeData, { mutateCache }] = api.anilist.wachingAnime(props.userId, props.token);
  const [mangaData] = api.anilist.readingManga(props.userId, props.token);

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
        <div class={style.rowContainer}>
          <For each={animeData().data.data.Page.mediaList.toSorted(sortAiringTime)}>{anime => (
            <Show when={anime.media.status != "FINISHED"}>
              <AnimeCard anime={anime} mutateCache={mutateCache} />
            </Show>
          )}</For>
        </div>
        <div class={style.rowContainer}>
          <For each={animeData().data.data.Page.mediaList}>{anime => (
            <Show when={anime.media.status == "FINISHED"}>
              <AnimeCard anime={anime} mutateCache={mutateCache} />
            </Show>
          )}</For>
        </div>
      </Show>
      <Show when={mangaData()}>
        <div class={style.rowContainer}>
          <For each={mangaData().data.data.Page.mediaList}>{manga => (
            <AnimeCard anime={manga} mutateCache={mutateCache} />
          )}</For>
        </div>
      </Show>
    </div>
  );
}

function AnimeCard(props) {
  const { accessToken } = useAuthentication();
  const [progress, setProgress] = createSignal(props.anime.progress);
  const [airingEpisode, setAiringEpisode] = createSignal(props.anime.media.nextAiringEpisode?.episode);
  const [isBehind, setIsBehind] = createSignal(props.anime.media.nextAiringEpisode?.episode > progress() + 1);

  const triggerMutation = leadingAndTrailingDebounce((token, mediaId, progress) => {
    api.anilist.mutateMedia(token, {mediaId, progress});
  }, 250, 2);

  createEffect(() => {
    setIsBehind(airingEpisode() > progress() + 1);
  });

  return (
    <A 
      href={"/anime/" + props.anime.media.id + "/" + props.anime.media.title.userPreferred} class={style.card} >
      <img src={props.anime.media.coverImage.large} alt="Cover." />
      <Show when={props.anime.media.nextAiringEpisode?.airingAt}>
        <div class={style.normalInfo}>
          <p>Ep {props.anime.media.nextAiringEpisode?.episode}</p>
          <EpisodeTime airingAt={props.anime.media.nextAiringEpisode.airingAt} setAiringEpisode={setAiringEpisode}/>
          <Show when={isBehind()}>
            <div class={style.isBehind}></div>
          </Show>
        </div>
      </Show>
      <Show when={props.anime.media.episodes - progress()}>
        <div class={style.hoverInfo} onClick={e => {
          e.preventDefault();
          if (progress() < props.anime.media.episodes) {
            triggerMutation(accessToken(), props.anime.media.id, progress() + 1);
            props.anime.progress += 1;
            props.mutateCache(data => data);
            setProgress(val => val + 1);
          }
        }}>
          <p>{progress} <span class={style.plus}>+</span></p>
        </div>
      </Show>
      <div class={style.cardRight}>
        <Show when={props.anime.media.nextAiringEpisode?.episode} fallback={
          <Show when={props.anime.media.episodes}>
            <p>{props.anime.media.episodes - progress()} episodes left</p>
          </Show>
        }>
          <Show when={isBehind()}>
            <p>{airingEpisode() - (progress() + 1)} episodes behind</p>
          </Show>
        </Show>
        <p>{props.anime.media.title.userPreferred}</p>
        <p>Progress: {progress()}<Show when={props.anime.media.episodes}>{e => (<>/{e()}</>)}</Show></p>
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
