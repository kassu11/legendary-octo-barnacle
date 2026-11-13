import { A } from "@solidjs/router";
import "./NavigationLink.scoped.css";

export function NavigationLink(props) {
  return (
    <A scoped href={props.href} end={props.end} class="nav-link">
      <props.icon scoped />
      <span class="label">{props.children}</span>
    </A>
  );
}
