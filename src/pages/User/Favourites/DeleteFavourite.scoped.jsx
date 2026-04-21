import { Show } from "solid-js";
import { useAuthentication, useUser } from "../../../context/providers.js";
import apiOLD from "../../../utils/api-OLD.js";
import { asserts } from "../../../collections/collections.js";
import "./DeleteFavourite.scoped.css"

export function DeleteFavouriteScoped(props) {
  const { authUserData, accessToken } = useAuthentication();
  const { user } = useUser();
  asserts.assertTrueOLD(props.onClick, "onClick is missing");
  asserts.assertTrueOLD(props.mutate, "mutate is missing");

  return (
    <Show when={user().id === authUserData()?.data.id}>
      <button class="cp-delete-favourite" onClick={async (e) => {
        e.preventDefault();
        props.onClick();
        const response = await apiOLD.anilist.toggleFavourite(accessToken(), {
          mangaId: props.mangaId,
          animeId: props.animeId,
          staffId: props.staffId,
          characterId: props.characterId,
          studioId: props.studioId,
        });

        if (response.status === 200) {
          props.mutate();
        }
      }}>Delete</button>
    </Show>
  );
}


