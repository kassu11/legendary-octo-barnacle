import { createEffect, createSignal, For, Show, untrack, on, createMemo } from "solid-js";
import { useUser, useFavourites } from "../../../context/providers.js";
import { FavouritePageItemScoped } from "./FavouritePageItem.scoped.jsx";
import { Intersection } from "../../../components/utils/Intersection.scoped.jsx";
import { createAnilistFetcher, sendAnilistFetcher } from "../../../utils/fetcherUtils.js";
import { queries } from "../../../collections/collections.js";
import { setFetcherValueToStorage } from "../../../utils/storageUtils.js";
import { createCleanUpAbortController } from "../../../utils/abortUtils.js";

export function FavouritesPageScoped(props) {
  const { user } = useUser();
  const { type, allEdges } = useFavourites();
  const [page, setPage] = createSignal(undefined);
  const userId = createMemo(() => user().id);

  const [loading, setLoading] = createSignal(false);
  const [favouritesData, setFavouritesData] = createSignal(undefined, { equals: false });
  const favouritesController = createCleanUpAbortController();
  let favouritesFetcher;
  createEffect(() => {
    const id = userId()
    const p = props.page === 1 ? props.page : page();
    if (!id || !p) return;

    const signal = favouritesController.abortAndRenew();

    favouritesFetcher = createAnilistFetcher(queries.anilistUserFavouriteById, { id, page: p}, signal);

    sendAnilistFetcher(favouritesFetcher, {
      name: "Anilist favourites",
      onFetch: () => favouritesController.disable(),
      onStart: () => setLoading(true),
      onStop: () => setLoading(false),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === favouritesFetcher.cacheKey) setFavouritesData(res);
      }
    });
  });

  createEffect(() => {
    if (favouritesData()?.data.data.User.favourites[type]?.edges.length > 0) {
      untrack(allEdges).splice((props.page - 1) * 25, 25, ...favouritesData().data.data.User.favourites[type].edges);
    }
    if (props.page === 1) {
      props.setVisible(favouritesData()?.data.data.User.favourites[type]?.edges.length > 0)
    }
  });

  createEffect(on(allEdges, listOfEdges => {
    const favourites = untrack(favouritesData);
    if (!favourites?.data) return;

    favourites.data.data.User.favourites[type].edges = listOfEdges.slice((props.page - 1) * 25, props.page * 25);
    setFetcherValueToStorage(favourites);
  }, { defer: true }));

  return (
    <>
      <Intersection rootMargin="100px" onIntersection={() => setPage(props.page)}>
        <For each={favouritesData()?.data.data.User.favourites?.[type].edges}>{edge => (
          <FavouritePageItemScoped edge={edge} />
        )}</For>
      </Intersection>
      <Show when={!loading() && favouritesData()?.data.data.User.favourites?.[type].pageInfo.hasNextPage}>
        <FavouritesPageScoped page={props.page + 1} />
      </Show>
    </>
  );
}

