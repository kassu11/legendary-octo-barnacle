import {useParams} from "@solidjs/router";
import api from "../../../../utils/api.js";
import {createEffect, createSignal, on, Show} from "solid-js";
import {createStore} from "solid-js/store";
import {useAuthentication } from "../../../../context/providers.js";
import {fetcherSenderUtils} from "../../../../utils/utils.js";
import {fetchers, fetcherSenders} from "../../../../collections/collections.js";
import {GenreItems} from "./GenreItems.scoped.jsx";
import {SortHeaderButtonsScoped} from "./SortHeaderButtons.scoped.jsx";

export function StatsAnimeGenres() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [userStats] = api.anilist.userAnimeGenres(() => params.name, accessToken);

  return (
    <Show when={userStats()}>
      <StatsGenres genres={userStats().data} />
    </Show>
  )
}
export function StatsMangaGenres() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [userStats] = api.anilist.userMangaGenres(() => params.name, accessToken);

  return (
    <Show when={userStats()}>
      <StatsGenres genres={userStats().data} />
    </Show>
  )
}

function StatsGenres(props) {
  const { accessToken } = useAuthentication();
  const [mediaIds, setMediaIds] = createSignal(new Set());
  const [state, setState] = createSignal("count");
  const mediaVariable = () => ({ id_in: [...mediaIds()] });
  const fetcher = fetcherSenderUtils.createFetcher(fetchers.anilist.getMediasWithIds, accessToken, mediaVariable);
  const [mediaById, { mutate }] = fetcherSenders.sendWithNullUpdates(fetcher);
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
        <SortHeaderButtonsScoped setState={ setState } />
      </div>
      <GenreItems genres={props.genres} state={state} store={store} setStore={setStore} mediaIds={mediaIds} mutate={mutate} />
    </section>
  );
}

