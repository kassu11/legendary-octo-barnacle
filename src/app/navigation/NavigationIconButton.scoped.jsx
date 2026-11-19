import { A } from "@solidjs/router";
import "./NavigationIconButton.scoped.css";

export function NavigationIconButton(props) {
  return (
    <A scoped href={props.href} state={props.state} replace={props.replace} class="icon-button" aria-label={props.ariaLabel ?? props.label} title={props.label}>
      <props.icon scoped />
      {props.children}
    </A>
  );
}
