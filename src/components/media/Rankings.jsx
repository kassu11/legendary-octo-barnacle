import { For } from "solid-js";
import style from "../../pages/AnimeInfo.module.scss";

export function Rankings(props) {
  return (
    <div class={style.rankingContainer}>
      <h2>Ranking</h2>
      <ul>
        <For each={props.rankings}>{ranking => (
          <li class={style.ranking}>#{ranking.rank} {ranking.context} {ranking.season} {ranking.year}</li>
        )}</For>
      </ul>
    </div>
  );
} 