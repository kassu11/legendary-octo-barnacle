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
                <A href={"/user/" + user().name + "/anime/stats/overview"}>Overview</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/anime/stats/genres"}>Genres</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/anime/stats/tags"}>Tags</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/anime/stats/voice-actors"}>Voice actors</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/anime/stats/studios"}>Studios</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/anime/stats/staff"}>Staff</A>
              </li>
            </ol>
          </li>
          <li>
            Manga stats
            <ol>
              <li>
                <A href={"/user/" + user().name + "/manga/stats/overview"}>Overview</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/manga/stats/genres"}>Genres</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/manga/stats/tags"}>Tags</A>
              </li>
              <li>
                <A href={"/user/" + user().name + "/manga/stats/staff"}>Staff</A>
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
