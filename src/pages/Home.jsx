import { A } from "../components/CustomA";
import api from "../utils/api";
import { createResource, Switch, Match, Show } from "solid-js";
import style from "./Home.module.scss";
import { useAuthentication } from "../context/AuthenticationContext";

function Home() {
  const [trendingAnime] = createResource(api.anilist.trendingAnime);
  const { authUserData } = useAuthentication();

  return (
    <Show when={authUserData()}>
      {console.log(authUserData())}
      <div class={style.container}>
        <CurrentWatchingMedia userId={authUserData().data.data.Viewer.id} />
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
  const [animeData] = createResource(props.userId, api.anilist.wachingAnime);
  const [mangaData] = createResource(props.userId, api.anilist.readingManga);

  const sortAiringTime = (a, b) => {
    const [aTime, bTime] = [a.media.nextAiringEpisode?.airingAt == b.media.nextAiringEpisode?.airingAt];
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
              {animeCard(anime)}
            </Show>
          )}</For>
        </div>
        <div class={style.rowContainer}>
          <For each={animeData().data.data.Page.mediaList.toSorted(sortAiringTime)}>{anime => (
            <Show when={anime.media.status == "FINISHED"}>
              {animeCard(anime)}
            </Show>
          )}</For>
        </div>
      </Show>
      <div class={style.rowContainer}></div>
    </div>
  );
}

function animeCard(anime) {
  console.log(anime);
  const isBehind = anime.media.nextAiringEpisode?.episode > anime.progress + 1;
  return (
    <A 
      href={"/anime/" + anime.media.id + "/" + anime.media.title.userPreferred} 
      classList={{[style.card]: true, [style.behind]: isBehind}}
    >
      <img src={anime.media.coverImage.large} alt="Cover." />
      <div class={style.cardRight}>
        <Show when={anime.media.episodes}>
          <Show when={isBehind} fallback={
            <span>{anime.media.episodes - anime.progress} episodes left</span>
          }>
            <p>{anime.media.nextAiringEpisode.episode - anime.progress + 1} episodes behind</p>
          </Show>
        </Show>
        <p>{anime.media.title.userPreferred}</p>
        <p>Progress: {anime.progress}/{anime.media.episodes}</p>
      </div>
    </A>
  )
}

export default Home
