import {useParams} from "@solidjs/router";
import {Match, Show, Switch} from "solid-js";
import {numberCommas, plural} from "../../../../utils/formating.js";
import "./DistributionFooter.scoped.css";

export function DistributionFooterScoped(props) {
  const params = useParams();

  return (
    <p class="time">
      <Switch>
        <Match when={params.type === "anime"}>
          <Show
            when={Math.floor(props.stats.minutesWatched / 60 / 24)}>{days => <>{numberCommas(days())} day{plural(days())} </>}</Show>
          <Show
            when={Math.floor(props.stats.minutesWatched / 60 % 24)}>{hours => <>{numberCommas(hours())} hour{plural(hours())} </>}</Show>
          <Show
            when={props.stats.minutesWatched < 60}>{props.stats.minutesWatched} minute{plural(props.stats.minutesWatched)}</Show>
        </Match>
        <Match when={params.type === "manga"}>
          Chapters read {numberCommas(props.stats.chaptersRead)}
        </Match>
      </Switch>
    </p>
  );
}