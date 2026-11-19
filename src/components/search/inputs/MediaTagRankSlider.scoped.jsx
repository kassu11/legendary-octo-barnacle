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

  const writeRank = newRank => setSearchParams({ rank: newRank || undefined }, { replace: true });

  const handleRankInputChange = e => {
    const text = e.target.value.trim();
    const typedRank = text ? parseInt(text, 10) : 0;
    const newRank = Number.isNaN(typedRank) ? rank() : Math.min(100, Math.max(0, typedRank));
    // Value has to be reset by hand, when the typed rank is clamped to the current rank
    e.target.value = newRank || "";
    writeRank(newRank);
  };

  const handleRankInputKeyDown = e => {
    if (e.key === "Enter") e.target.blur();
    if (e.key === "Escape") {
      e.target.value = rank() || "";
      e.target.blur();
    }
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const step = (e.shiftKey ? 10 : 1) * (e.key === "ArrowUp" ? 1 : -1);
      const newRank = Math.min(100, Math.max(0, rank() + step));
      e.target.value = newRank || "";
      writeRank(newRank);
    }
  };

  const tooltip = () => hasTags()
    ? "How relevant the selected tags need to be. Higher values only match media where the tags are a major part of the story"
    : "Select a tag first. Tag rank sets how relevant the selected tags need to be to the media";

  return (
    <div class="tag-rank-slider">
      <label classList={{ active: hasTags() && rank() > 0, disabled: !hasTags() }}>
        <span class="icon"><TagRankIcon /></span>
        <span class="label">Tag Rank</span>
        <input
          class="range"
          type="range"
          step="5"
          min="0"
          max="100"
          value={rank()}
          disabled={!hasTags()}
          aria-valuetext={rankText()}
          style={{ "--scoped-progress": rank() / 100 }}
          onInput={e => setDraggedRank(+e.target.value)}
          onChange={e => writeRank(+e.target.value)}
        />
        <span class="value">
          <input
            class="rank-input"
            type="text"
            inputmode="numeric"
            maxlength="3"
            placeholder="Any"
            aria-label="Minimum tag rank percentage"
            value={rank() || ""}
            disabled={!hasTags()}
            onFocus={e => e.target.select()}
            onKeyDown={handleRankInputKeyDown}
            onChange={handleRankInputChange}
          />
          <span class="unit" aria-hidden="true">%</span>
        </span>
        <Show when={!isTouch()}>
          <Tooltip placements={["bottom", "top"]} delay={600}>{tooltip()}</Tooltip>
        </Show>
      </label>
    </div>
  );
}
