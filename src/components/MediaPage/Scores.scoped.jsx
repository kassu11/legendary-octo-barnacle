import {Show, Switch} from "solid-js";
import "./Scores.scoped.css";

export function MediaPageScores() {
  const { anilistData, jikanData } = useMediaInfo();

  return (
    <div class="scores">
      <div>
        <p>Mean</p>
        <span>
          <Show when={anilistData()?.data?.meanScore > 0} fallback="N/A">
            {((anilistData()?.data?.meanScore || 0) / 10).toFixed(1)}
          </Show>
        </span>
      </div>
      <div>
        <p>Average</p>
        <span>
          <Show when={anilistData()?.data?.averageScore > 0} fallback="N/A">
            {((anilistData()?.data?.averageScore || 0) / 10).toFixed(1)}
          </Show>
        </span>
      </div>
      <p class="anilist-users">
        <Show when={anilistData()?.data?.stats.scoreDistribution?.reduce((acc, v) => v.amount + acc, 0)} fallback="-">
          {numberUtils.numberCommas(anilistData()?.data?.stats.scoreDistribution?.reduce((acc, v) => v.amount + acc, 0))}
        </Show>
        {" "}Users
      </p>
      <div>
        <p>MAL</p>
        <span>
          <Switch fallback="N/A">
            <Match when={jikanData.loading}>...</Match>
            <Match when={jikanData()?.data.score > 0}>
              {((jikanData().data.score || 0)).toFixed(2)}
            </Match>
          </Switch>
        </span>
      </div>
      <p>
        <Show when={jikanData()?.data?.scored_by} fallback="-">
          {numberUtils.numberCommas(jikanData().data.scored_by)}
        </Show>
        {" "}Users
      </p>
    </div>
  )
}
