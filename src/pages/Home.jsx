import { A } from "../components/CustomA";
import api from "../utils/api";
import { createResource, Switch, Match, Show, createSignal, createEffect } from "solid-js";
import style from "./Home.module.scss";
import { useAuthentication } from "../context/AuthenticationContext";

function Home() {
  const [trendingAnime] = createResource(api.anilist.trendingAnime);
  const { accessToken, authUserData } = useAuthentication();

  return (
    <Show when={authUserData()}>
      {console.log(authUserData())}
      <div class={style.container}>
        <CurrentWatchingMedia token={accessToken()} userId={authUserData().data.data.Viewer.id} />
        <div class={style.body}>
          <div class={style.left}>
            <div class={style.rowContainer}></div>
            <div class={style.rowContainer}></div>
            <div class={style.rowContainer}></div>
            <div class={style.rowContainer}></div>
            <div class={style.rowContainer}></div>
            <div class={style.rowContainer}></div>
            <div class={style.rowContainer}></div>
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

function CurrentWatchingMedia(props) {
  const [animeData] = createResource(props.userId, async (id) => api.anilist.wachingAnime(id, props.token));
  const [mangaData] = createResource(props.userId, async (id) => api.anilist.readingManga(id, props.token));

  const sortAiringTime = (a, b) => {
    const [aTime, bTime] = [a.media.nextAiringEpisode?.airingAt, b.media.nextAiringEpisode?.airingAt];
    if (aTime && bTime) { return aTime - bTime; } 
    else if (aTime == bTime) { return 0; } 
    else if (aTime == null) { return -1; } 
    return 1;
  };

  return (
    <div class={style.header}>
      {console.log(animeData(), mangaData())}
      <Show when={animeData()}>
        <div class={style.rowContainer}>
          <For each={animeData().data.data.Page.mediaList.toSorted(sortAiringTime)}>{anime => (
            <Show when={anime.media.status != "FINISHED"}>
              <AnimeCard anime={anime} />
            </Show>
          )}</For>
        </div>
        <div class={style.rowContainer}>
          <For each={animeData().data.data.Page.mediaList}>{anime => (
            <Show when={anime.media.status == "FINISHED"}>
              <AnimeCard anime={anime} />
            </Show>
          )}</For>
        </div>
      </Show>
      <div class={style.rowContainer}></div>
    </div>
  );
}

function AnimeCard(props) {
  const { accessToken } = useAuthentication();
  const [progress, setProgress] = createSignal(props.anime.progress);
  const [isBehind, setIsBehind] = createSignal(props.anime.media.nextAiringEpisode?.episode > progress() + 1);

  createEffect(() => {
    setIsBehind(props.anime.media.nextAiringEpisode?.episode > progress() + 1);
  })

  return (
    <A 
      href={"/anime/" + props.anime.media.id + "/" + props.anime.media.title.userPreferred} class={style.card} >
      <img src={props.anime.media.coverImage.large} alt="Cover." />
      <Show when={props.anime.media.nextAiringEpisode?.airingAt}>
        <div class={style.normalInfo}>
          <p>Ep {props.anime.media.nextAiringEpisode.episode}</p>
          <EpisodeTime airingAt={props.anime.media.nextAiringEpisode.airingAt} />
          <Show when={isBehind()}>
            <div class={style.isBehind}></div>
          </Show>
        </div>
      </Show>
      <Show when={props.anime.media.episodes - progress()}>
        <div class={style.hoverInfo} onClick={e => {
          e.preventDefault();
          if (progress() < props.anime.media.episodes) {
            api.anilist.mutateMedia(accessToken(), {mediaId: anime.media.id, progress: progress() + 1});
            setProgress(val => val + 1);
          }
        }}>
          <p>{progress} <span class={style.plus}>+</span></p>
        </div>
      </Show>
      <div class={style.cardRight}>
        <Show when={props.anime.media.episodes - progress()}>
          <Show when={isBehind()} fallback={
            <p>{props.anime.media.episodes - progress()} episodes left</p>
          }>
            <p>{props.anime.media.nextAiringEpisode.episode - (progress() + 1)} episodes behind</p>
          </Show>
        </Show>
        <p>{props.anime.media.title.userPreferred}</p>
        <p>Progress: {progress()}/{props.anime.media.episodes}</p>
      </div>
    </A>
  )
}

const [currentTime, setCurentTime] = createSignal((new Date()) / 1000);

setInterval(() => setCurentTime((new Date()) / 1000), 1000 * 60);

function EpisodeTime(props) {
  const [time, setTime] = createSignal(Math.abs(props.airingAt - currentTime()));
  createEffect(() => {
    setTime(Math.abs(props.airingAt - currentTime()));
  });

  return (
    <p>
      <Show when={Math.floor(time() / 3600 / 24)} children={days => (<>{days}d </>)} />
      <Show when={Math.floor((time() / 3600) % 24)} children={hours => (<>{hours}h </>)} />
      <Show when={Math.floor((time() % 3600) / 60)} children={minutes => (<>{minutes}m </>)} />
    </p>
  )
}

export default Home
