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
    const [aTime, bTime] = [
      timeCollection.weekInSeconds -
        Math.abs(
          (a.media.nextAiringEpisode?.airingAt - today) %
            timeCollection.weekInSeconds,
        ),
      timeCollection.weekInSeconds -
        Math.abs(
          (b.media.nextAiringEpisode?.airingAt - today) %
            timeCollection.weekInSeconds,
        ),
    ];

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
        />
        <CurrentCardsScoped
          cards={animeData().data.data.Page.mediaList.filter(
            (anime) => anime.media.status === "FINISHED",
          )}
          mutateCache={mutateAnimeCache}
        />
      </Show>
      <Show when={mangaData()}>
        <CurrentCardsScoped
          cards={mangaData().data.data.Page.mediaList}
          mutateCache={mutateMangaCache}
        />
      </Show>
    </div>
  );
}
