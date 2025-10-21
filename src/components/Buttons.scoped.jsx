import { asserts } from "../collections/collections";

import {Tooltip2Scoped} from "./Tooltip2.scoped.jsx";

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
    <button class="cp-media-action-item" classList={{ big: props.big }} data-tooltip-trigger onClick={props.onClick}>
      {props.children}
      <Tooltip2Scoped positions="left right">
        {props.label}
      </Tooltip2Scoped>
    </button>
  );
}
