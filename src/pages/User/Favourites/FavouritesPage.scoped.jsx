import { createEffect, createSignal, For, Show, untrack, on } from "solid-js";
import apiOLD from "../../../utils/api-OLD.js";
import { useAuthentication, useUser, useFavourites } from "../../../context/providers.js";
import { FavouritePageItemScoped } from "./FavouritePageItem.scoped.jsx";
import { Intersection } from "../../../components/utils/Intersection.scoped.jsx";

export function FavouritesPageScoped(props) {
  const { user } = useUser();
  const { type, allEdges } = useFavourites();
  const { accessToken } = useAuthentication();
  const [page, setPage] = createSignal(undefined);
  const [favourites, { mutateCache: mutateFavouritesCache }] = apiOLD.anilist.favouritesByUserId(() => user().id || undefined, props.page === 1 ? () => props.page : page, accessToken);

  createEffect(() => {
    if (favourites()?.data[type]?.edges.length > 0) {
      untrack(allEdges).splice((props.page - 1) * 25, 25, ...favourites().data[type].edges);
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
    <>
      <Intersection rootMargin="100px" onIntersection={() => setPage(props.page)}>
        <For each={favourites()?.data?.[type].edges}>{edge => (
          <FavouritePageItemScoped edge={edge} />
        )}</For>
      </Intersection>
      <Show when={!favourites.loading && favourites()?.data?.[type].pageInfo.hasNextPage}>
        <FavouritesPageScoped page={props.page + 1} />
      </Show>
    </>
  );
}

