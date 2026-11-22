import { For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import "./ActiveQueries.scoped.css";
import { CloseIcon } from "@/assets/icons.jsx";
import { Tooltip } from "@/components/Tooltip.scoped.jsx";

/**
 * Removable chips of the active search params
 *
 * @param {Object} props
 * @param {import("@/utils/activeQueryUtils.js").ActiveQuery[]} props.activeQueries
 * @param {boolean} [props.singleRow] Scrolls horizontally instead of wrapping to many rows
 */
export function ActiveQueries(props) {
  return (
    <Show when={props.activeQueries.length}>
      <ul class="active-queries" classList={{ "single-row": props.singleRow }}>
        <For each={props.activeQueries}>{activeQuery => (
          <li>
            <Show when={!activeQuery.clearAll} fallback={
              <button class="clear" onClick={activeQuery.onRemove}>{activeQuery.description}</button>
            }>
              <button class="query" onClick={activeQuery.onRemove}>
                <span class="icon" classList={{ "extra-padding": !!activeQuery.imageColor }} style={{ "background-color": activeQuery.imageColor }}>
                  <Show when={activeQuery.image} fallback={<Dynamic component={activeQuery.icon} />}>
                    <img src={activeQuery.image} alt="" />
                  </Show>
                </span>
                <span>{activeQuery.description}</span>
                <CloseIcon scoped />
                <Tooltip placements={["bottom", "top"]}>Remove filter</Tooltip>
              </button>
            </Show>
          </li>
        )}</For>
      </ul>
    </Show>
  );
}
