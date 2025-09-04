import { Show } from "solid-js";
import { useAuthentication, useUser } from "../../../context/providers.js";
import api from "../../../utils/api.js";
import { asserts } from "../../../collections/collections.js";

export function DeleteFavourite(props) {
  const { authUserData, accessToken } = useAuthentication();
  const { user } = useUser();
  asserts.assertTrue(props.onClick, "onClick is missing");
  asserts.assertTrue(props.mutate, "mutate is missing");

  return (
    <Show when={user().id === authUserData()?.data.id}>
      <button class="profile-favourites-delete-button" onClick={async (e) => {
        e.preventDefault();
        props.onClick();
        const response = await api.anilist.toggleFavourite(accessToken(), {
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


