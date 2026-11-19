import { useSearchParams } from "@solidjs/router";
import { createEffect, createSignal, on, Show } from "solid-js";
import { useParsedSearchParams, useResponsive } from "@/state/providers.js";
import { Tooltip } from "@/components/Tooltip.scoped.jsx";
import { TagRankIcon } from "@/assets/icons.jsx";
import "./MediaTagRankSlider.scoped.css";

export function MediaTagRankSlider() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const { isTouch } = useResponsive();
  // Url is written only when the slider is released, so the search isn't refetched for every step of a drag
  const [draggedRank, setDraggedRank] = createSignal();

  createEffect(on(() => parsedSearchParams().rank, () => setDraggedRank(undefined)));

  const hasTags = () => parsedSearchParams().tags.length > 0 || parsedSearchParams().excludedTags.length > 0;
  const rank = () => draggedRank() ?? parsedSearchParams().rank ?? 0;
  const rankText = () => rank() ? rank() + "%+" : "Any";

  const tooltip = () => hasTags()
    ? "How relevant the selected tags need to be. Higher values only match media where the tags are a major part of the story"
    : "Select a tag first. Tag rank sets how relevant the selected tags need to be to the media";

  return (
    <div class="tag-rank-slider">
      <label classList={{ active: hasTags() && rank() > 0, disabled: !hasTags() }}>
        <span class="icon"><TagRankIcon /></span>
        <span class="label">Tag Rank</span>
        <input
          type="range"
          step="5"
          min="0"
          max="100"
          value={rank()}
          disabled={!hasTags()}
          aria-valuetext={rankText()}
          onInput={e => setDraggedRank(+e.target.value)}
          onChange={e => setSearchParams({ rank: +e.target.value || undefined }, { replace: true })}
        />
        <output>{rankText()}</output>
        <Show when={!isTouch()}>
          <Tooltip placements={["bottom", "top"]} delay={600}>{tooltip()}</Tooltip>
        </Show>
      </label>
    </div>
  );
}
