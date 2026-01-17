import { useAuthentication } from "../../context/providers.js";
import { createMemo, createSignal, Match, Show, Switch } from "solid-js";
import { leadingAndTrailingDebounce } from "../../utils/scheduled.js";
import api from "../../utils/api.js";
import { A } from "@solidjs/router";
import { mediaUrl } from "../../utils/formating.js";
import { EpisodeTime } from "./EpisodeTime.jsx";
import "./CurrentCard.scoped.css";
import { timeCollection } from "../../collections/collections.js";

function nextAiringEpisode(nextAiringEpisodeObject) {
  if (!nextAiringEpisodeObject?.episode) {
    return null;
  }

  if (nextAiringEpisodeObject?.airingAt < timeCollection.currentTimeInSeconds) {
    const delta = Math.abs(
      nextAiringEpisodeObject.airingAt - timeCollection.currentTimeInSeconds,
    );

    return (
      nextAiringEpisodeObject.episode +
      Math.floor(delta / timeCollection.weekInSeconds) +
      1
    );
  }

  return nextAiringEpisodeObject.episode;
}

export function CurrentCardScoped(props) {
  const { accessToken } = useAuthentication();
  const [progress, setProgress] = createSignal(props.data.progress);
  const [airingEpisode, setAiringEpisode] = createSignal(
    nextAiringEpisode(props.data.media.nextAiringEpisode),
  );

  const isBehind = createMemo(() => airingEpisode() > progress() + 1);

  const triggerProgressIncrease = leadingAndTrailingDebounce(
    async (token, mediaId, newProgress) => {
      const response = await api.anilist.mutateMedia(token, {
        mediaId,
        progress: newProgress,
      });
      if (response.status !== 200) {
        return;
      }

      asserts.assertTrue(response.data.progress, "No progress found");
      props.data.progress = response.data.progress;
      if (response.data.status === "COMPLETED") {
        props.mutateCache((request) => {
          request.data.data.Page.mediaList =
            request.data.data.Page.mediaList.filter(
              (media) => media.id !== props.data.id,
            );
          return request;
        });
      } else {
        props.mutateCache((data) => data);
      }
    },
    250,
    2,
  );

  const tiles = () => airingEpisode() - (progress() + 1);
  const gapPercent = () => Math.min(tiles() / 10, .45);
  const width = () => 1 / (tiles() - gapPercent()) * 100;

  return (
    <A
      href={mediaUrl(props.data.media)}
      data-tooltip-trigger
      class="cp-current-card"
    >
      <img src={props.data.media.coverImage.large} alt="Cover." />
      <Show when={props.data.media.nextAiringEpisode?.airingAt}>
        <div class="cp-current-card-info">
          <p>Ep {airingEpisode()}</p>
          <EpisodeTime
            airingAt={props.data.media.nextAiringEpisode.airingAt}
            setAiringEpisode={setAiringEpisode}
          />
          <Show when={isBehind()}>
            <div class="is-behind-container" style={{background: `repeating-linear-gradient(90deg, var(--red-400), var(--red-400) ${width() * (1 - gapPercent())}%, transparent ${width() * (1 - gapPercent())}%, transparent ${width()}%)`}}></div>
          </Show>
        </div>
      </Show>
      <Switch
        fallback={
          <button
            class="cp-current-card-hover-info"
            onClick={(e) => {
              e.preventDefault();
              triggerProgressIncrease(
                accessToken(),
                props.data.media.id,
                progress() + 1,
              );
              setProgress((val) => val + 1);
            }}
          >
            {progress} <span class="plus">+</span>
          </button>
        }
      >
        <Match
          when={
            props.data.media.episodes === progress() ||
            props.data.media.chapters === progress()
          }
        >
          <button
            class="cp-current-card-hover-info normal"
            onClick={(e) => e.preventDefault()}
          >
            Completed
          </button>
        </Match>
      </Switch>
      <div class="hover" data-tooltip-positions="right left middle">
        <Switch>
          <Match when={airingEpisode() && isBehind()}>
            <p>
              {airingEpisode() - (progress() + 1)} episode
              {airingEpisode() - (progress() + 1) > 1 && "s"} behind
            </p>
          </Match>
          <Match
            when={
              airingEpisode() == null &&
              props.data.media.episodes - progress() > 0
            }
          >
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
