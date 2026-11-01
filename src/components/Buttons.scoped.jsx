import { asserts } from "../collections/collections";
import "./Buttons.scoped.css";
import { Tooltip } from "./Tooltip.scoped";

export function QuickActionListButton(props) {

  return (
    <li>
      <QuickActionButton {...props} />
    </li>
  );
}

export function QuickActionButton(props) {
  asserts.isTypeStringOLD(props.label, "label");
  asserts.assertTypeFunctionOLD(props.onClick, "onClick");

  return (
    <button class="cp-media-action-item" classList={{ big: props.big }} onClick={props.onClick}>
      {props.children}
      <Tooltip placements={["left", "right", "bottom"]}>{props.label}</Tooltip>
    </button>
  );
}
