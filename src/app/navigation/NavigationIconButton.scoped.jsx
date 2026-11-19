import { A } from "@solidjs/router";
import "./NavigationIconButton.scoped.css";

export function NavigationIconButton(props) {
  return (
    <A scoped href={props.href} state={props.state} class="icon-button" aria-label={props.ariaLabel ?? props.label} title={props.label}>
      <props.icon scoped />
      {props.children}
    </A>
  );
}
