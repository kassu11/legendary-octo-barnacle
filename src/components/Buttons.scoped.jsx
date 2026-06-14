import { asserts } from "../collections/collections";
import "./Buttons.scoped.css";

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
    <div class="wrapper">
      <button class="cp-media-action-item" classList={{ big: props.big }} onClick={props.onClick}>
        {props.children}
      </button>
      <div class="tool-tip">{props.label}</div>
    </div>
  );
}
