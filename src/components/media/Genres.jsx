import { For } from "solid-js";
import "./Genres.scss";
import { A } from "@solidjs/router";
import { Show } from "solid-js";

const Genres = (props) => {
  return (
    <Show when={props.genres?.length}>
      <div class="media-page-genre-container">
        <h2>
          <A href={"/search/" + props.type.toLowerCase() + "?" + props.genres.map(genre => "genre=" + genre).join("&")}>
            Genres
          </A>
        </h2>
        <ul>
          <For each={props.genres}>{genre => (
            <li class="media-page-genre">
              <A href={"/search/" + props.type.toLowerCase() + "?genre=" + genre}>
                {genre}
              </A>
            </li>
          )}</For>
        </ul>
      </div>
    </Show>
  );
};

export default Genres; 
