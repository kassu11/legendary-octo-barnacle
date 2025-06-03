import { Navigate, useParams } from "@solidjs/router";
import { Switch } from "solid-js";

const animeSearch = {
  type: "anime",
  header: ["finished", "this-season", "new", "next-season", "trending", "popular", "top-100"],
}
const mangaSearch = {
  type: "manga",
  header: ["finished", "finished-manga", "finished-novel", "novel", "new", "manhwa", "trending", "popular", "top-100"],
}

const bothSearch = {
  type: "media",
  header: ["finished", "trending", "popular", "top-100"],
}

export function RedirectSearchHeaders() {
  // For example if you are in anime/next-season
  // Then you change types to manga, which doesn't have next-season header, this component will convert next-season to ?year=...&season=...
  const params = useParams();
  return (
    <Switch>
      <Match when={params.type === "anime"}>
        Anime
      </Match>
      <Match when={params.type === "manga"}>
        manga
      </Match>
      <Match when={params.type === "anime"}>
        Anime
      </Match>
      <Match when={params.type === "media"}>
        Anime
      </Match>
    </Switch>
  );
}
