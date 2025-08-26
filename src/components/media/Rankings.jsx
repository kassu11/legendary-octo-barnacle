import { ErrorBoundary, For } from "solid-js";
import "./Rankings.scss";

const Rankings = (props) => {
  return (
    <ErrorBoundary fallback="Ranking error">
      <Show when={props.rankings}>
        <div class="pg-media-ranking" classList={{loading: props.loading}}>
          <h2>Ranking</h2>
          <ul>
            <For each={props.rankings}>{ranking => (
              <li>#{ranking.rank} {ranking.context} {ranking.season} {ranking.year}</li>
            )}</For>
          </ul>
        </div>
      </Show>
    </ErrorBoundary>
  );
};

export default Rankings;
