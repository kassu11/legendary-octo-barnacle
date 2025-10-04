import { asserts } from "../collections/collections";
import { Tooltip2 } from "./Tooltips";

export function QuickActionListButton(props) {

  return (
    <li>
      <QuickActionButton {...props} />
    </li>
  );
}

export function QuickActionButton(props) {
  asserts.isTypeString(props.label, "label");
  asserts.isTypeFunction(props.onClick, "onClick");

  return (
    <button class="cp-media-action-item" classList={{ big: props.big }} onClick={props.onClick}>
      {props.children}
      <Tooltip2 positions="left right">
        {props.label}
      </Tooltip2>
    </button>
  );
}
