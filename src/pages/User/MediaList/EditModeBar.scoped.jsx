import { Show } from "solid-js";
import { CloseIcon } from "@/assets/icons.jsx";
import { numberCommas } from "@/utils/formatUtils.js";
import ScoreInput from "@/components/media/ScoreInput.scoped.jsx";
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
          <p class="hint">Click or Shift click cards to select them, drag to select a range and Ctrl drag to add one</p>
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
        <label class="auto-save" title="Saves the changes 15 seconds after the last change">
          <input type="checkbox" checked={props.autoSave} onChange={e => props.onAutoSaveChange(e.target.checked)} />
          Auto save
        </label>
        <button class="save" disabled={!props.unsavedCount || props.saving} onClick={() => props.onSave()}>
          {props.saving ? "Saving..." : "Save"}
          <Show when={props.unsavedCount}> ({numberCommas(props.unsavedCount)})</Show>
        </button>
        <button class="exit" onClick={() => props.onExit()} aria-label="Exit edit mode" title="Exit edit mode">
          <CloseIcon scoped />
        </button>
      </div>
    </div>
  );
}
