import { asserts } from "../collections/collections";
import "./Tooltips.scss";

/**
 * @param {Object} props
 * @param {"inline-end" | "top" | "block-start" | "bottom" | "block-end" | "right" | "inline-start" | "left"} props.tipPosition
 */
export function Tooltip(props) {
  return (
    <tool-tip inert role="tooltip" attr:tip-position={props.tipPosition} {...props} />
  );
}

export function Tooltip2(props) {
  asserts.isTypeString(props.positions, "positions");

  return (
    <tool-tip2 inert role="tooltip" attr:data-tooltip-positions={props.positions} {...props} />
  );
}

