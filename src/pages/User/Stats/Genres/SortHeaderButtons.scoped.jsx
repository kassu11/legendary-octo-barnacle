import {useParams} from "@solidjs/router";
import {Match, Switch} from "solid-js";

export function SortHeaderButtonsScoped(props) {
  const params = useParams();
  return (
    <div>
      <button onClick={() => props.setState("count")}>Count</button>
      <Switch>
        <Match when={params.type === "anime"}>
          <button onClick={() => props.setState("minutesWatched")}>Time Watched</button>
        </Match>
        <Match when={params.type === "manga"}>
          <button onClick={() => props.setState("chaptersRead")}>Chapters Read</button>
        </Match>
      </Switch>
      <button onClick={() => props.setState("meanScore")}>Mean Score</button>
    </div>
  );
}
