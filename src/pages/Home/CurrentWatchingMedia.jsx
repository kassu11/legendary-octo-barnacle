import api from "../../utils/api.js";
import {Show} from "solid-js";
import {CurrentCards} from "./CurrentCards.jsx";

export function CurrentWatchingMedia(props) {
  const [animeData, {mutateCache: mutateAnimeCache}] = api.anilist.wachingAnime(props.userId, props.token);
  const [mangaData, {mutateCache: mutateMangaCache}] = api.anilist.readingManga(props.userId, props.token);

  const sortAiringTime = (a, b) => {
    const [aTime, bTime] = [a.media.nextAiringEpisode?.airingAt, b.media.nextAiringEpisode?.airingAt];
    if (aTime && bTime) {
      return aTime - bTime;
    } else if (aTime == bTime) {
      return 0;
    } else if (aTime == null) {
      return 1;
    }
    return -1;
  };

  return (
    <div class="pg-home-current">
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
        <CurrentCards cards={mangaData().data.data.Page.mediaList} mutateCache={mutateMangaCache}/>
      </Show>
    </div>
  );
}