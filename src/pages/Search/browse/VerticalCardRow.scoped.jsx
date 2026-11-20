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
        {/* Empty row cards are skeletons until the data has loaded */}
        <For each={props.data || Array(10).fill(null)}>{(card, i) => (
          <li class="vertical-search-card">
            <MediaRowCard subgrid showStatus media={card} rank={i() + 1} type={props.type} loading={props.loading} />
          </li>
        )}</For>
      </ol>
    </section>
  );
}
