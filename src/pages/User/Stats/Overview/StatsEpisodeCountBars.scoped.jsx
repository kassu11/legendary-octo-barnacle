import {useParams} from "@solidjs/router";
import {createEffect, createSignal, For, Match, Show, Switch} from "solid-js";
import {DraggableScrollContainerScoped2} from "./DraggableScrollContainer.scoped.jsx";
import {numberCommas} from "../../../../utils/formating.js";

export function StatsEpisodeCountBarsScoped(props) {
  const params = useParams();
  const [state, setState] = createSignal("count");
  const [max, setMax] = createSignal(0);

  createEffect(() => {
    const maxValue = props.data.reduce((acc, v) => Math.max(acc, v[state()]), 0);
    setMax(maxValue);
  });

  return (
    <section>
      <div class="flex-space-between">
        <h2>Episode count</h2>
        <div>
          <button onClick={() => setState("count")}>
            <Switch>
              <Match when={params.type === "anime"}>Titles Watched</Match>
              <Match when={params.type === "manga"}>Titles read</Match>
            </Switch>
          </button>
          <Switch>
            <Match when={params.type === "anime"}>
              <button onClick={() => setState("minutesWatched")}>Hours Watched</button>
            </Match>
            <Match when={params.type === "manga"}>
              <button onClick={() => setState("chaptersRead")}>Chapters Read</button>
            </Match>
          </Switch>
          <button onClick={() => setState("meanScore")}>Mean Score</button>
        </div>
      </div>
      <DraggableScrollContainerScoped2>
        <ol>
          <For each={props.data}>{stat => (
            <li>
              <p class="no-wrap">{stat.length || "Unknown"}</p>
              <div style={{height: `${stat[state()] / max() * 85}%`}}></div>
              <p>
                <Show when={state() === "minutesWatched"} fallback={numberCommas(stat[state()])}>
                  {numberCommas(Math.ceil(stat[state()] / 60))}
                </Show>
              </p>
            </li>
          )}</For>
        </ol>
      </DraggableScrollContainerScoped2>
    </section>
  );
}
