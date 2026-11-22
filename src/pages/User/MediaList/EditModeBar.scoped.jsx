import { Show } from "solid-js";
import { CloseIcon } from "@/assets/icons.jsx";
import { numberCommas } from "@/utils/formatUtils.js";
import ScoreInput from "@/components/media/ScoreInput.scoped.jsx";
import { Tooltip } from "@/components/Tooltip.scoped.jsx";
import "./EditModeBar.scoped.css";

/**
 * Bar fixed to the top of the screen while the user media list is in edit mode
 *
 * @param {Object} props
 * @param {number} props.selectedCount
 * @param {number} props.unsavedCount Entries with score changes that haven't been saved
 * @param {number | ""} props.score Score of the selected entries, empty when they have different scores
 * @param {string} props.scoreFormat
 * @param {boolean} props.saving
 * @param {boolean} props.autoSave
 * @param {(score: number) => void} props.onScoreChange Called with the score for every selected entry
 * @param {() => void} props.onSave
 * @param {(enabled: boolean) => void} props.onAutoSaveChange
 * @param {() => void} props.onClearSelection
 * @param {() => void} props.onExit
 */
export function EditModeBar(props) {
  return (
    <div class="edit-mode-bar" role="toolbar" aria-label="Edit mode">
      <div class="selection">
        <p class="count">
          {numberCommas(props.selectedCount)} selected
        </p>
        <Show when={props.selectedCount} fallback={
          <p class="hint">Click a card to select it, Ctrl click to add one, Shift click or drag to select a range</p>
        }>
          <div class="score">
            <span aria-hidden="true">Score</span>
            <ScoreInput scoped class="score-input" id="edit-mode-score" aria-label="Score of the selected entries" format={props.scoreFormat} value={props.score} onChange={score => props.onScoreChange(score)} />
          </div>
        </Show>
      </div>
      <div class="actions">
        <Show when={props.selectedCount}>
          <button class="clear" onClick={() => props.onClearSelection()}>Clear selection</button>
        </Show>
        <label class="auto-save">
          <input type="checkbox" checked={props.autoSave} onChange={e => props.onAutoSaveChange(e.target.checked)} />
          Auto save
          <Tooltip placements={["bottom", "top"]}>Saves the changes 15 seconds after the last change</Tooltip>
        </label>
        <button class="save" disabled={!props.unsavedCount || props.saving} onClick={() => props.onSave()}>
          {props.saving ? "Saving..." : "Save"}
          <Show when={props.unsavedCount}> ({numberCommas(props.unsavedCount)})</Show>
        </button>
        <button class="exit" onClick={() => props.onExit()} aria-label="Exit edit mode">
          <CloseIcon scoped />
          <Tooltip placements={["bottom", "top"]}>Exit edit mode</Tooltip>
        </button>
      </div>
    </div>
  );
}
