import { A } from "@solidjs/router";
import { mediaUrl } from "@/utils/formatUtils.js";
import "./MediaNavigation.scoped.css";

export function MediaNavigation(props) {
  return (
    <nav class="media-navigation" aria-label="Media">
      <ul>
        <li>
          <A scoped class="navigation-link" classList={{ selected: !props.sub }} noScroll href={mediaUrl(props.media)}>Info</A>
        </li>
        <li>
          <A scoped class="navigation-link" classList={{ selected: props.sub === "characters" }} noScroll href={mediaUrl(props.media) + "/characters"}>Characters</A>
        </li>
        <li>
          <A scoped class="navigation-link" classList={{ selected: props.sub === "staff" }} noScroll href={mediaUrl(props.media) + "/staff"}>Staff</A>
        </li>
      </ul>
    </nav>
  );
}
