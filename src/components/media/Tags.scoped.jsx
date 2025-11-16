import { createEffect, createSignal, ErrorBoundary, For, on, Show } from "solid-js";
import { A } from "@solidjs/router";
import "./Tags.scoped.css";

export const Tags = (props) => {
  const [showSpoilers, setShowSpoilers] = createSignal(false);

  createEffect(on(() => props.tags, () => {
    setShowSpoilers(false);
  }));

  function nonSpoilerAndHighRankTags() {
    const tags = [];
    for (const tag of props.tags) {
      if (tag.rank < 90 && tags.length >= 3) {
        break;
      }
      if (showSpoilers() || (!tag.isMediaSpoiler && !tag.isGeneralSpoiler)) {
        tags.push(`genre=${tag.name}`);
      }
    }
    return tags;
  }

  return (
    <ErrorBoundary fallback="Tags error">
      <Show when={props.tags?.length}>
        <div class="pg-media-tags" classList={{loading: props.loading}}>
          <div class="flex-space-between">
            <A href={"/search/" + props.type.toLowerCase() + "?" + nonSpoilerAndHighRankTags().join("&")}>
              <h2>Tags</h2>
            </A>
            <Show when={props.tags.some(tag => tag.isMediaSpoiler || tag.isGeneralSpoiler)}>
              <button onClick={() => setShowSpoilers(state => !state)}>
                <Show when={!showSpoilers()} fallback="Hide spoilers">Show spoilers</Show>
              </button>
            </Show>
          </div>
          <ol>
            <For each={props.tags}>{tag => (
              <li 
                classList={{
                  spoiler: tag.isMediaSpoiler || tag.isGeneralSpoiler,
                  hidden: (tag.isMediaSpoiler || tag.isGeneralSpoiler) && !showSpoilers()
                }} 
                title={tag.description}
              >
                <A href={ "/search/" + props.type.toLowerCase() + "?genre=" + tag.name + "&rank=" + tag.rank}>{tag.name} <span>{tag.rank}%</span></A>
              </li>
            )}</For>
          </ol>
        </div>
      </Show>
    </ErrorBoundary>
  );
};
