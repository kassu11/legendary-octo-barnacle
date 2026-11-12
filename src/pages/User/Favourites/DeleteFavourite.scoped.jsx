import { Show, splitProps } from "solid-js";
import { useUser } from "@/state/providers.js";
import { queries } from "@/api/api.js";
import { asserts } from "@/utils/utils.js";
import "./DeleteFavourite.scoped.css"
import { createAnilistFetcher, fetcherToFetch } from "@/api/fetcherUtils.js";
import { addApplicationNotification } from "@/state/notifications";
import { authUserData } from "@/state/globalState.js";

export function DeleteFavourite(props) {
  const [local, scoping] = splitProps(props, ["onClick", "mutate", "mangaId", "animeId", "staffId", "characterId", "studioId"]);
  const { user } = useUser();
  asserts.assertTruthy(local.onClick, "onClick is missing");
  asserts.assertTruthy(local.mutate, "mutate is missing");

  return (
    <Show when={user().id === authUserData()?.data.id}>
      <button {...scoping} class="delete-favourite" onClick={async (e) => {
        e.preventDefault();
        local.onClick();

        const fetcher = createAnilistFetcher(queries.anilistMutateToggleFavourite, {
          MANGA: local.mangaId,
          ANIME: local.animeId,
          STAFF: local.staffId,
          CHARACTER: local.characterId,
          STUDIO: local.studioId,
        }, AbortSignal.timeout(30_000));

        const res = await fetcherToFetch(fetcher);
        if (res.status === 200) {
          local.mutate();
        } else {
          addApplicationNotification({ type: "error", message: "Removing from favourites has failed", duration: 30_000 });
        }
      }}>Delete</button>
    </Show>
  );
}


