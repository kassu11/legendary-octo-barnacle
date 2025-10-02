import { asserts } from "../collections/collections";

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
    <button class="cp-media-action-item" classList={{big: props.big}} onClick={props.onClick} label={props.label}>
      {props.children}
    </button>
  );
}
