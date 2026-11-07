import { asserts } from "@/utils/utils";
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
  asserts.assertTypeString(props.label, "label is not type of string");
  asserts.assertTypeFunction(props.onClick, "onClick is not type of function");

  return (
    <button class="cp-media-action-item" classList={{ big: props.big }} onClick={props.onClick}>
      {props.children}
      <Tooltip placements={["left", "right", "bottom"]}>{props.label}</Tooltip>
    </button>
  );
}
