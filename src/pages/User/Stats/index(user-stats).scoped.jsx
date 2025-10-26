import { A } from "@solidjs/router";
import { createEffect } from "solid-js";
import { useUser } from "../../../context/providers.js";
import "./index(user-stats).scoped.css";

export function Stats(props) {
  const { user } = useUser();
  createEffect(()=> {
    document.title = `${user().name} stats - LOB`;
  });

  return (
    <div class="user-profile-stats-page">
      <div>
        <ol>
          <li>
            Anime stats
            <ol>
              <li>
                <A href={"/user/" + user().name + "/stats/anime/overview"}>Overview</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/stats/anime/genres"}>Genres</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/stats/anime/tags"}>Tags</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/stats/anime/voice-actors"}>Voice actors</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/stats/anime/studios"}>Studios</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/stats/anime/staff"}>Staff</A>
              </li>
            </ol>
          </li>
          <li>
            Manga stats
            <ol>
              <li>
                <A href={"/user/" + user().name + "/stats/manga/overview"}>Overview</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/stats/manga/genres"}>Genres</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/stats/manga/tags"}>Tags</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/stats/manga/staff"}>Staff</A>
              </li>
            </ol>
          </li>
        </ol>
      </div>
      <div class="content">
        {props.children}
      </div>
    </div>
  );
}
