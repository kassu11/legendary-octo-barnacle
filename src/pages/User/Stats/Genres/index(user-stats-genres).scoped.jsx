import { useParams } from "@solidjs/router";
import { createEffect, createSignal, on, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { useAuthentication } from "../../../../context/providers.js";
import { fetcherSenderUtils } from "../../../../utils/utils.js";
import { fetchersOLD, fetcherSendersOLD, localizations, queries } from "../../../../collections/collections.js";
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
  const { accessToken } = useAuthentication();
  const [mediaIds, setMediaIds] = createSignal(new Set());
  const [state, setState] = createSignal("count");
  const mediaVariable = () => ({ id_in: [...mediaIds()] });
  const fetcher = fetcherSenderUtils.createFetcherOLD(fetchersOLD.anilist.getMediasWithIds, accessToken, mediaVariable);
  const [mediaById, { mutate }] = fetcherSendersOLD.sendWithNullUpdates(fetcher);
  const [store, setStore] = createStore({});

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

  createEffect(on(mediaById, medias => {
    medias?.data.forEach(media => setStore(media.id, media));
  }));

  return (
    <section class="user-profile-stats-genres">
      <div class="flex-space-between">
        <h2>Genres</h2>
        <SortHeaderButtons setState={ setState } />
      </div>
      <GenreItems genres={props.genres} state={state} store={store} setStore={setStore} mediaIds={mediaIds} mutate={mutate} />
    </section>
  );
}

