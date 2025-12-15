import api from "../../utils/api.js";
import { Show } from "solid-js";
import { CurrentCardsScoped } from "./CurrentCards.scoped.jsx";
import "./CurrentWatchingMedia.scoped.css";
import { timeCollection } from "../../collections/collections.js";

export function CurrentWatchingMediaScoped(props) {
  const [animeData, { mutateCache: mutateAnimeCache }] =
    api.anilist.wachingAnime(props.userId, props.token);
  const [mangaData, { mutateCache: mutateMangaCache }] =
    api.anilist.readingManga(props.userId, props.token);

  const today = new Date() / 1000;
  const sortAiringTime = (a, b) => {
    const aDelta =
      (a.media.nextAiringEpisode?.airingAt - today) %
      timeCollection.weekInSeconds;
    const aTime =
      aDelta >= 0 ? aDelta : timeCollection.weekInSeconds - Math.abs(aDelta);
    const bDelta =
      (b.media.nextAiringEpisode?.airingAt - today) %
      timeCollection.weekInSeconds;
    const bTime =
      bDelta >= 0 ? bDelta : timeCollection.weekInSeconds - Math.abs(bDelta);

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
        <CurrentCardsScoped
          cards={animeData()
            .data.data.Page.mediaList.filter(
              (anime) => anime.media.status !== "FINISHED",
            )
            .toSorted(sortAiringTime)}
          mutateCache={mutateAnimeCache}
          loading={animeData.loading}
        />
        <CurrentCardsScoped
          cards={animeData().data.data.Page.mediaList.filter(
            (anime) => anime.media.status === "FINISHED",
          )}
          mutateCache={mutateAnimeCache}
          loading={animeData.loading}
        />
      </Show>
      <Show when={mangaData()}>
        <CurrentCardsScoped
          cards={mangaData().data.data.Page.mediaList}
          mutateCache={mutateMangaCache}
          loading={mangaData.loading}
        />
      </Show>
    </div>
  );
}
