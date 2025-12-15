import { asserts } from "../collections/collections";
import "./Tooltip2.scoped.css";

export function Tooltip2Scoped(props) {
  asserts.isTypeString(props.positions, "positions");

  return (
    <tool-tip2 inert role="tooltip" attr:data-tooltip-positions={props.positions} {...props} />
  );
}
