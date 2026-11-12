import { A } from "@solidjs/router";
import { ArrowRightIcon } from "@/assets/icons.jsx";
import "./BrowsePageHeaderLinks.scoped.css";

export function BrowsePageHeaderLinks(props) {
  return (
    <div class="header">
      <h2>
        <A href={props.href} class="link">{props.title}</A>
      </h2>
      <A scoped href={props.href} class="view-all">
        <span>View all</span>
        <ArrowRightIcon scoped />
      </A>
    </div>
  );
}
