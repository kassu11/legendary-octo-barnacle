import { For } from "solid-js";
import style from "../../pages/AnimeInfo.module.scss";

export function Genres(props) {
  return (
    <div class={style.genreContainer}>
      <h2>Genres</h2>
      <ul>
        <For each={props.genres}>{genre => (
          <li class={style.genre}>{genre}</li>
        )}</For>
      </ul>
    </div>
  );
} 