import { Show, splitProps } from "solid-js";
import { useResponsive } from "../../../context/providers.js";
import { Tooltip } from "../../../components/Tooltip.scoped.jsx";
import "./MediaSelectItem.scoped.css"

export function MediaSelectItem(props) {
  const [local, others] = splitProps(props, ["tooltip", "tooltipTitle", "children"]);
  const { isTouch } = useResponsive();

  return (
    <div class="select-item" {...others}>
      {local.children}
      {/* Mobile selects are modals in the top layer, so the tooltip would be rendered under them */}
      <Show when={local.tooltip && !isTouch()}>
        <Tooltip placements={["right", "left", "bottom"]} offset={12}>
          <Show when={local.tooltipTitle}>
            <span class="tooltip-title">{local.tooltipTitle}</span>
          </Show>
          {local.tooltip}
        </Tooltip>
      </Show>
    </div>
  );
}
