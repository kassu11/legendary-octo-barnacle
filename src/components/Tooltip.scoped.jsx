import { onMount, Show } from "solid-js";
import { createHover, HoverPortal } from "../hooks/createHover";
import "./Tooltip.scoped.css";

/**
 * Tooltip for the parent element, it opens when the parent is hovered or focused.
 *
 * @example
 * <button>?
 *   <Tooltip placements={["bottom", "top"]}>Help text</Tooltip>
 * </button>
 *
 * @param {Object} props
 * @param {import("../hooks/createHover").HoverPlacement[]} [props.placements]
 * @param {number} [props.offset]
 */
export function Tooltip(props) {
  const hover = createHover({ placements: props.placements ?? ["top", "bottom"], offset: props.offset ?? 8 });
  // Empty text node is used to find the parent element, so the tooltip doesn't need a wrapper element
  const anchor = document.createTextNode("");
  onMount(() => hover.triggerRef(anchor.parentElement));

  return (
    <>
      {anchor}
      <Show when={hover.isOpen()}>
        <HoverPortal>
          <div role="tooltip" class="tooltip" ref={hover.floatingRef}>
            {props.children}
          </div>
        </HoverPortal>
      </Show>
    </>
  );
}
