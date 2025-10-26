import {useParams} from "@solidjs/router";
import {numberCommas, plural} from "../../../../utils/formating.js";
import {Match, Show, Switch} from "solid-js";

export function GetOlScoped(props) {
  const params = useParams();

  return (
    <ol class="flex-space-between">
      <li>
        <p class="value">{numberCommas(props.genre.count || 0)}</p>
        <p class="title">Count</p>
      </li>
      <li>
        <p class="value">{(props.genre.meanScore || 0)}</p>
        <p class="title">Mean score</p>
      </li>
      <li>
        <Switch>
          <Match when={params.type === "anime"}>
            <p class="value">
              <Show
                when={Math.floor(props.genre.minutesWatched / 60 / 24)}>{days => <>{numberCommas(days())} day{plural(days())} </>}</Show>
              <Show
                when={Math.floor(props.genre.minutesWatched / 60 % 24)}>{hours => <>{numberCommas(hours())} hour{plural(hours())} </>}</Show>
              <Show
                when={props.genre.minutesWatched < 60}>{props.genre.minutesWatched} minute{plural(props.genre.minutesWatched)}</Show>
            </p>
            <p class="title">Time watched</p>
          </Match>
          <Match when={params.type === "manga"}>
            <p class="value">{numberCommas(props.genre.chaptersRead)}</p>
            <p class="title">Chapters read</p>
          </Match>
        </Switch>
      </li>
    </ol>
  );
}