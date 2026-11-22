import { A } from "@solidjs/router";
import { Tooltip } from "@/components/Tooltip.scoped.jsx";
import "./NavigationIconButton.scoped.css";

export function NavigationIconButton(props) {
  return (
    <A scoped href={props.href} state={props.state} replace={props.replace} class="icon-button" aria-label={props.ariaLabel ?? props.label}>
      <props.icon scoped />
      {props.children}
      <Tooltip placements={["bottom", "top"]}>{props.label}</Tooltip>
    </A>
  );
}
