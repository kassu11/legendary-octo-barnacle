import { createEffect, on } from "solid-js";
import { useUser } from "../../../context/providers.js";
import { FavouriteSection } from "./FavouriteSection.jsx";
import "./Favourites.scss";

export function FavouriteContainer() {
  const { user } = useUser();
  createEffect(on(user, u => {
    document.title = `${u.name} favourites - LOB`;
  }));

  return (
    <div class="user-profile-favourites">
      <FavouriteSection title="Favourite animes" type="anime" />
      <FavouriteSection title="Favourite characters" type="characters" />
      <FavouriteSection title="Favourite manga" type="manga" />
      <FavouriteSection title="Favourite staff" type="staff" />
      <FavouriteSection title="Favourite studios" type="studios" />
    </div>
  );
}


