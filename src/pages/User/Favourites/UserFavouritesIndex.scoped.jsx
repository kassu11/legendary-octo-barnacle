import { createEffect, on } from "solid-js";
import { useUser } from "@/state/providers.js";
import { FavouriteSectionScoped } from "./FavouriteSection.scoped.jsx";
import "./UserFavouritesIndex.scoped.css"

export function IndexFavouriteScoped() {
  const { user } = useUser();
  createEffect(on(user, u => {
    document.title = `${u.name} favourites - LOB`;
  }));

  return (
    <div class="user-profile-favourites">
      <FavouriteSectionScoped title="Favourite animes" type="anime" />
      <FavouriteSectionScoped title="Favourite characters" type="characters" />
      <FavouriteSectionScoped title="Favourite manga" type="manga" />
      <FavouriteSectionScoped title="Favourite staff" type="staff" />
      <FavouriteSectionScoped title="Favourite studios" type="studios" />
    </div>
  );
}


