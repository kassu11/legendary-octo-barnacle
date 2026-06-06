import { Show } from "solid-js";
import { useUser } from "../../../context/providers.js";
import { asserts, queries } from "../../../collections/collections.js";
import "./DeleteFavourite.scoped.css"
import { createAnilistFetcher, fetcherToFetch } from "../../../utils/fetcherUtils.js";
import { addApplicationNotification } from "../../App/ApplicationNotifications.scoped.jsx";
import { authUserData } from "../../../core/globalState.js";

export function DeleteFavouriteScoped(props) {
  const { user } = useUser();
  asserts.assertTrueOLD(props.onClick, "onClick is missing");
  asserts.assertTrueOLD(props.mutate, "mutate is missing");

  return (
    <Show when={user().id === authUserData()?.data.id}>
      <button class="cp-delete-favourite" onClick={async (e) => {
        e.preventDefault();
        props.onClick();

        const fetcher = createAnilistFetcher(queries.anilistMutateToggleFavourite, {
          MANGA: props.mangaId,
          ANIME: props.animeId,
          STAFF: props.staffId,
          CHARACTER: props.characterId,
          STUDIO: props.studioId,
        }, AbortSignal.timeout(30_000));

        const res = await fetcherToFetch(fetcher);
        if (res.status === 200) {
          props.mutate();
        } else {
          addApplicationNotification({ type: "error", message: "Removing from favourites has failed", duration: 30_000 });
        }
      }}>Delete</button>
    </Show>
  );
}


