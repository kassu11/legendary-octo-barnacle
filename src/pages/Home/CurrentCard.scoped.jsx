import { createMemo, createSignal, Match, Show, Switch } from "solid-js";
import { leadingAndTrailingDebounce } from "../../utils/scheduled.js";
import { A } from "@solidjs/router";
import { mediaUrl } from "../../utils/formating.js";
import { EpisodeTime } from "./EpisodeTime.jsx";
import "./CurrentCard.scoped.css";
import { queries, timeCollection } from "../../collections/collections.js";
import { createAnilistFetcher, fetcherToFetch } from "../../utils/fetcherUtils.js";
import { assertTypeInteger } from "../../collections/asserts.js";
import { mergeObjects } from "../../utils/objectUtils.js";

function nextAiringEpisode(nextAiringEpisodeObject) {
  if (!nextAiringEpisodeObject?.episode) {
    return null;
  }

  if (nextAiringEpisodeObject?.airingAt < timeCollection.currentTimeInSeconds) {
    const delta = Math.abs(nextAiringEpisodeObject.airingAt - timeCollection.currentTimeInSeconds);

    return nextAiringEpisodeObject.episode + Math.floor(delta / timeCollection.weekInSeconds) + 1;
  }

  return nextAiringEpisodeObject.episode;
}

export function ProgressButton(props) {
  const triggerProgressIncrease = leadingAndTrailingDebounce(async (mediaId, progress) => {

    const fetcher = createAnilistFetcher(queries.anilistMutateMedia, { mediaId, progress }, AbortSignal.timeout(30_000));
    try {
      const res = await fetcherToFetch(fetcher);
      if (res.status !== 200) return;

      const json = await res.json();

      assertTypeInteger(json.data.SaveMediaListEntry.progress, "No progress found");
      mergeObjects(props.data, json.data.SaveMediaListEntry);
      if (json.data.SaveMediaListEntry.status === "COMPLETED") {
        props.mutateCache((request) => {
          for (const { lists } of Object.values(request.data.data)) {
            for (const list of lists) {
              list.entries = list.entries.filter(entry => entry.media.id !== mediaId);
            }
          }
          return request;
        });
      } else {
        props.mutateCache((data) => data);
      }
    } catch {
      console.error("Error");
    }
  }, 250, 2);

  return (
    <Switch fallback={
      <button
        class="cp-current-card-hover-info"
        onClick={(e) => {
          e.preventDefault();
          triggerProgressIncrease(props.data.media.id, props.progress() + 1);
          props.setProgress((val) => val + 1);
        }}
      >
        {props.progress} <span class="plus">+</span>
      </button>
    }
    >
      <Match when={props.data.media.episodes === props.progress() || props.data.media.chapters === props.progress()}>
        <button class="cp-current-card-hover-info normal" onClick={(e) => e.preventDefault()}>
          Completed
        </button>
      </Match>
    </Switch>
  );
}

export function CurrentCardScoped(props) {
  const [progress, setProgress] = createSignal(props.data.progress);
  const [airingEpisode, setAiringEpisode] = createSignal(nextAiringEpisode(props.data.media.nextAiringEpisode));

  const isBehind = createMemo(() => airingEpisode() > progress() + 1);

  const tiles = () => airingEpisode() - (progress() + 1);
  const gapPercent = () => Math.min(tiles() / 10, .45);
  const width = () => 1 / (tiles() - gapPercent()) * 100;

  return (
    <A href={mediaUrl(props.data.media)} data-tooltip-trigger class="cp-current-card">
      <img src={props.data.media.coverImage.large} alt="Cover." />
      <Show when={props.data.media.nextAiringEpisode?.airingAt}>
        <div class="cp-current-card-info">
          <p>Ep {airingEpisode()}</p>
          <EpisodeTime airingAt={props.data.media.nextAiringEpisode.airingAt} setAiringEpisode={setAiringEpisode} />
          <Show when={isBehind()}>
            <div class="is-behind-container" style={{ background: `repeating-linear-gradient(90deg, var(--red-400), var(--red-400) ${width() * (1 - gapPercent())}%, transparent ${width() * (1 - gapPercent())}%, transparent ${width()}%)` }}></div>
          </Show>
        </div>
      </Show>
      <ProgressButton data={props.data} mutateCache={props.mutateCache} progress={progress} setProgress={setProgress} />
      <div class="hover" data-tooltip-positions="right left middle">
        <Switch>
          <Match when={airingEpisode() && isBehind()}>
            <p>
              {airingEpisode() - (progress() + 1)} episode
              {airingEpisode() - (progress() + 1) > 1 && "s"} behind
            </p>
          </Match>
          <Match when={airingEpisode() == null && props.data.media.episodes - progress() > 0}>
            <p>
              {props.data.media.episodes - progress()} episode
              {props.data.media.episodes - progress() > 1 && "s"} left
            </p>
          </Match>
          <Match when={props.data.media.chapters - progress() > 0}>
            <p>
              {props.data.media.chapters - progress()} chapter
              {props.data.media.chapters - progress() > 1 && "s"} left
            </p>
          </Match>
        </Switch>
        <p class="line-clamp">{props.data.media.title.userPreferred}</p>
        <p class="progress-status">
          Progress: {progress()}
          <Show when={props.data.media.episodes}>
            /{props.data.media.episodes}
          </Show>
          <Show when={props.data.media.chapters}>
            /{props.data.media.chapters}
          </Show>
        </p>
      </div>
    </A>
  );
}
