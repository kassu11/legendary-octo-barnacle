import api from "../../utils/api.js";
import { Show } from "solid-js";
import { CurrentCardsScoped } from "./CurrentCards.scoped.jsx";
import "./CurrentWatchingMedia.scoped.css";
import { signals, timeCollection } from "../../collections/collections.js";
import { ProgressButton } from "./CurrentCard.scoped.jsx";
import { useAuthentication } from "../../context/providers.js";

const PICTURE_MODE = 0;
const TEXT_MODE = 1;

export function CurrentWatchingMediaScoped(props) {
  const { isDeveloper } = useAuthentication();
  const [animeData, { mutateCache: mutateAnimeCache }] =
    api.anilist.wachingAnime(props.userId, props.token);
  const [mangaData, { mutateCache: mutateMangaCache }] =
    api.anilist.readingManga(props.userId, props.token);

  const today = new Date() / 1000;

  const wrapOldCacheAiringTimes = (airingAt) => {
    if (airingAt == null) {
      return null;
    }

    // Keep the same day but move airingAt time ahead of today
    if (airingAt < today) {
      const delta = (today - airingAt) % timeCollection.weekInSeconds;
      return today + (timeCollection.weekInSeconds - delta);
    }

    return airingAt;
  };

  const sortAiringTime = (a, b) => {
    const aTime = wrapOldCacheAiringTimes(a.media.nextAiringEpisode?.airingAt);
    const bTime = wrapOldCacheAiringTimes(b.media.nextAiringEpisode?.airingAt);

    if (aTime && bTime) {
      return aTime - bTime;
    } else if (aTime == bTime) {
      return 0;
    } else if (aTime == null) {
      return 1;
    }
    return -1;
  };

  const [mode, setMode] = signals.localStorageString("LOB_CURRENTLY_WATCHING_MODE", PICTURE_MODE);

  return (
    <>
      <Show when={isDeveloper()}>
        <button onClick={() => setMode(PICTURE_MODE)}>Picture mode</button>
        <button onClick={() => setMode(TEXT_MODE)}>Text mode</button>
      </Show>
      <div class="pg-home-current" classList={{picture: mode() == PICTURE_MODE, text: mode() == TEXT_MODE}}>
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
    </>
  );
}

