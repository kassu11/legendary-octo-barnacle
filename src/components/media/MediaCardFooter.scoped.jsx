import { batch, createEffect, createSignal, For, Match, on, Show, splitProps, Switch } from "solid-js";
import "./MediaCardFooter.scoped.css";
import Score from "@/components/media/Score.scoped.jsx";
import { createAnilistFetcher, fetcherToFetch } from "@/api/fetcherUtils";
import { queries } from "@/api/api";
import { addApplicationNotification } from "@/state/notifications";
import { storeGlobalEditedMedia } from "@/state/globalState";
import { leadingAndTrailingDebounce } from "@/utils/scheduleUtils";
import { Tooltip } from "@/components/Tooltip.scoped";

/**
 * Users list progress and score for the bottom of the media cover.
 *
 * @param {Object} props
 * @param {Object} props.media Anilist media
 * @param {Object} props.entry Users media list entry
 * @param {string} [props.scoreFormat] Score format of the entry owner, defaults to POINT_10_DECIMAL
 * @param {boolean} [props.progressIncrement] "+" buttons to increase the progress
 * @param {boolean} [props.showAdvancedScores] Users advanced scores as a tooltip when hovering the score, shown in the same score format
 * @param {Function} [props.afterProgressMutation] Called with the saved list entry after the progress has been increased
 */
export function MediaCardFooter(props) {
  const [local, scoping] = splitProps(props, ["media", "entry", "scoreFormat", "progressIncrement", "afterProgressMutation", "showAdvancedScores"]);

  // Unscored advanced score categories are stored as 0, so they are left out
  const advancedScores = () => Object.entries(local.entry.advancedScores || {}).filter(([, score]) => score);

  return (
    <div {...scoping} classList={{ "media-card-footer": true, [props.class]: !!props.class }}>
      <p>
        <Switch>
          <Match when={local.media.type === "ANIME" && local.media.format === "MOVIE"}>
            <ProgressInfo {...local} label="Movie" progressKey="progress" maxProgressKey="episodes" />
          </Match>
          <Match when={local.media.type === "ANIME"}>
            <ProgressInfo {...local} label="Ep" progressKey="progress" maxProgressKey="episodes" />
          </Match>
          <Match when={local.media.type === "MANGA"}>
            <ProgressInfo {...local} label="Ch" progressKey="progress" maxProgressKey="chapters" />
            <br />
            <ProgressInfo {...local} label="Vol" progressKey="progressVolumes" maxProgressKey="volumes" />
          </Match>
        </Switch>
      </p>
      <Score score={local.entry.score} format={local.scoreFormat || "POINT_10_DECIMAL"}>
        <Show when={local.showAdvancedScores && advancedScores().length}>
          <Tooltip placements={["top", "bottom"]}>
            <For each={advancedScores()}>{([name, score]) => (
              <div class="advanced-score">
                {name}:
                <Score score={score} format={local.scoreFormat || "POINT_10_DECIMAL"} />
              </div>
            )}</For>
          </Tooltip>
        </Show>
      </Score>
    </div>
  );
}

function ProgressInfo(props) {
  const [count, setCount] = createSignal(props.entry[props.progressKey]);
  const max = () => props.media[props.maxProgressKey];

  createEffect(on(() => props.entry, entry => setCount(entry[props.progressKey]), { defer: true }));

  // Each progress key has its own debounce, so that chapter and volume clicks don't cancel each other
  const saveProgress = leadingAndTrailingDebounce(async progress => {
    const fetcher = createAnilistFetcher(queries.anilistMutateMedia, { mediaId: props.media.id, [props.progressKey]: progress }, AbortSignal.timeout(30_000));
    const res = await fetcherToFetch(fetcher);
    if (res.status !== 200) {
      addApplicationNotification({ type: "error", message: "Failed to save media changes", duration: 30_000 });
      return;
    }

    const json = await res.json();
    const entry = json.data.SaveMediaListEntry;
    batch(() => {
      props.afterProgressMutation?.(entry);
      storeGlobalEditedMedia(entry.mediaId, entry);
    });
  }, 250, 2);

  return (
    <>
      {props.label}
      <Show when={props.label !== "Movie" || count() !== 1}> {count()}</Show>
      <Show when={count() < max()}>
        /{max()}
      </Show>
      <Show when={props.progressIncrement && (max() === null || count() < max())}>
        <button onClick={e => {
          e.preventDefault();
          const progress = Math.min(max() || count() + 1, count() + 1);
          setCount(progress);
          saveProgress(progress);
        }}>+</button>
      </Show>
    </>
  );
}
