import { useParams } from "@solidjs/router";
import { createEffect, createSignal, on, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { localizations, queries } from "../../../../collections/collections.js";
import { GenreItems } from "./GenreItems.scoped.jsx";
import { SortHeaderButtons } from "../SortHeaderButtons.scoped.jsx";
import { createTimer, formatMSToString } from "../../../../utils/timeUtils.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../../../utils/fetcherUtils.js";

export function StatsMediaGenres() {
  const params = useParams();

  const [userStatsTime, startUserStatsTimer, stopUserStatsTimer] = createTimer();
  const [userStatsData, setUserStatsData] = createSignal(undefined, { equals: false });
  let userStatsFetcher, userStatsController;
  createEffect(() => {
    userStatsController?.abort();
    userStatsController = new AbortController();
    const { type } = params;

    if (type === localizations.anime) userStatsFetcher = createAnilistFetcher(queries.anilistGetUserAnimeGenres, { name: params.name }, userStatsController.signal);
    if (type === localizations.manga) userStatsFetcher = createAnilistFetcher(queries.anilistGetUserMangaGenres, { name: params.name }, userStatsController.signal);

    sendAnilistFetcher(userStatsFetcher, {
      name: "Anilist user genre stats",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === userStatsFetcher.cacheKey) userStatsController = null;
      },
      onStart: startUserStatsTimer,
      onStop: stopUserStatsTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === userStatsFetcher.cacheKey) setUserStatsData(res.data.data.User.statistics[type].genres);
      }
    });
  });

  return (
    <Show when={userStatsData()}>
      <p>{formatMSToString(userStatsTime())}</p>
      <StatsGenres genres={userStatsData()} />
    </Show>
  )
}

function StatsGenres(props) {
  const [mediaIds, setMediaIds] = createSignal(new Set());
  const [state, setState] = createSignal("count");
  const [store, setStore] = createStore({});

  let mediaFetcher, mediaController;
  createEffect(() => {
    const ids = [...mediaIds()];
    if (!ids.length) return;
    mediaController?.abort();
    mediaController = new AbortController();

    mediaFetcher = createAnilistFetcher(queries.anilistGetMediasWithIds(ids.length), { id_in: ids }, mediaController.signal);

    sendAnilistFetcher(mediaFetcher, {
      name: "Anilist media ids",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === mediaFetcher.cacheKey) mediaController = null;
      },
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== mediaFetcher.cacheKey) return;
        Object.values(res.data.data).forEach(page => {
          page.media.forEach(m => {
            setStore(m.id, m);
          });
        });
      }
    });
  });

  createEffect(on(() => props.genres, genres => {
    setMediaIds(current => {
      const newSet = new Set(genres.map(genre => genre.mediaIds.slice(0, 6)).flat())
      // This works basically as a store
      // When props.genres update check if the new set has anything that the old set did not have
      // If so update, otherwise don't
      // This is a quick fix https://github.com/kassu11/legendary-octo-barnacle/issues/235
      // Remake this whole component when you have time :P
      if (newSet.difference(current).size) {
        return newSet;
      }

      return current;
    });
  }));

  return (
    <section class="user-profile-stats-genres">
      <div class="flex-space-between">
        <h2>Genres</h2>
        <SortHeaderButtons setState={ setState } />
      </div>
      <GenreItems genres={props.genres} state={state} store={store} setStore={setStore} mediaIds={mediaIds} />
    </section>
  );
}

