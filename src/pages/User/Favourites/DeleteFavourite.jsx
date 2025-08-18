import { Show } from "solid-js";
import { useAuthentication, useUser } from "../../../context/providers.js";
import api from "../../../utils/api.js";
import { assert } from "../../../utils/assert.js";

export function DeleteFavourite(props) {
  const { authUserData, accessToken } = useAuthentication();
  const { user } = useUser();
  assert(props.onClick, "onClick is missing");
  assert(props.mutate, "mutate is missing");

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


