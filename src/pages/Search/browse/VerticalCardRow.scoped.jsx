import { For } from "solid-js";
import "./VerticalCardRow.scoped.css";
import { asserts } from "@/utils/utils.js";
import { BrowsePageHeaderLinks } from "./BrowsePageHeaderLinks.scoped.jsx";
import { MediaRowCard } from "@/components/media/MediaRowCard.scoped.jsx";

export function VerticalCardRowScoped(props) {
  asserts.assertTruthy("href" in props, "Link is missing");
  asserts.assertTypeString(props.type, "type is not type of string");

  return (
    <section>
      <BrowsePageHeaderLinks {...props} />
      <ol class="vertical-search-card-row">
        <For each={props.data}>{(card, i) => (
          <li class="vertical-search-card">
            <MediaRowCard subgrid media={card} rank={i() + 1} type={props.type} />
          </li>
        )}</For>
      </ol>
    </section>
  );
}
