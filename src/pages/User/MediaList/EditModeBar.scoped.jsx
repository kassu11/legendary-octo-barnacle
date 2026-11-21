import { Show } from "solid-js";
import { CloseIcon } from "@/assets/icons.jsx";
import { numberCommas } from "@/utils/formatUtils.js";
import "./EditModeBar.scoped.css";

/**
 * Bar fixed to the top of the screen while the user media list is in edit mode
 *
 * @param {Object} props
 * @param {number} props.selectedCount
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
        <Show when={!props.selectedCount}>
          <p class="hint">Click or Shift click cards to select them, drag to select a range and Ctrl drag to add one</p>
        </Show>
      </div>
      <div class="actions">
        <Show when={props.selectedCount}>
          <button class="clear" onClick={() => props.onClearSelection()}>Clear selection</button>
        </Show>
        <button class="exit" onClick={() => props.onExit()} aria-label="Exit edit mode" title="Exit edit mode">
          <CloseIcon scoped />
        </button>
      </div>
    </div>
  );
}
