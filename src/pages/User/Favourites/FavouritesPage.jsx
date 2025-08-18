import { createEffect, createSignal, For, Show, untrack, on } from "solid-js";
import { DoomScroll } from "../../../components/utils/DoomScroll.jsx";
import api from "../../../utils/api.js";
import { useAuthentication, useUser, useFavourites } from "../../../context/providers.js";
import { FavouritePageItem } from "./FavouritePageItem.jsx";

export function FavouritesPage(props) {
  const { user } = useUser();
  const { type, allEdges } = useFavourites();
  const { accessToken } = useAuthentication();
  const [page, setPage] = createSignal(undefined);
  const [favourites, { mutateCache: mutateFavouritesCache }] = api.anilist.favouritesByUserId(() => user().id || undefined, props.page === 1 ? () => props.page : page, accessToken);

  createEffect(() => {
    if (favourites()?.data[type]?.edges.length > 0) {
      untrack(allEdges).splice((props.page - 1) * 25, 25, ...favourites()?.data[type]?.edges);
    }
    if (props.page === 1) {
      props.setVisible(favourites()?.data[type]?.edges.length > 0)
    }
  });

  createEffect(on(allEdges, listOfEdges => {
    untrack(favourites).data[type].edges = listOfEdges.slice((props.page - 1) * 25, props.page * 25);
    mutateFavouritesCache(data => data);
  }, { defer: true }));

  return (
    <DoomScroll rootMargin="100px" onIntersection={() => setPage(props.page)} loading={props.loading} fetchResponse={favourites}>{fetchCooldown => (
      <>
        <For each={favourites()?.data[type].edges}>{edge => (
          <FavouritePageItem edge={edge} />
        )}</For>
        <Show when={favourites().data[type].pageInfo.hasNextPage}>
          <Show when={fetchCooldown === false} fallback="Fetch cooldown">
            <FavouritesPage
              page={props.page + 1}
              loading={favourites.loading}
            />
          </Show>
        </Show>
      </>
    )}</DoomScroll>
  );
}


