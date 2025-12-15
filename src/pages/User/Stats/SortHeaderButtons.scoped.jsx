import {useParams} from "@solidjs/router";
import {Match, Switch} from "solid-js";

export function SortHeaderButtons(props) {
  const params = useParams();
  return (
    <div>
      <button onClick={() => props.setState("count")}>
        <Switch>
          <Match when={params.type === "anime"}>Titles Watched</Match>
          <Match when={params.type === "manga"}>Titles read</Match>
        </Switch>
      </button>
      <Switch>
        <Match when={params.type === "anime"}>
          <button onClick={() => props.setState("minutesWatched")}>Hours Watched</button>
        </Match>
        <Match when={params.type === "manga"}>
          <button onClick={() => props.setState("chaptersRead")}>Chapters Read</button>
        </Match>
      </Switch>
      <button onClick={() => props.setState("meanScore")}>Mean Score</button>
    </div>
  );
}