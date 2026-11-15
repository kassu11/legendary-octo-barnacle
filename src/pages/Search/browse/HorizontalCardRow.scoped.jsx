import { For } from "solid-js";
import "./HorizontalCardRow.scoped.css";
import { asserts } from "@/utils/utils.js";
import { BrowsePageHeaderLinks } from "./BrowsePageHeaderLinks.scoped.jsx";
import { MediaCard } from "@/components/media/MediaCard.scoped.jsx";
import { GridReelAutoFill } from "@/components/ui/GridReelAutoFill.scoped.jsx";

export function HorizontalCardRowScoped(props) {
  asserts.assertTruthy("href" in props, "Link is missing");

  return (
    <section>
      <BrowsePageHeaderLinks {...props} />
      <GridReelAutoFill scoped class="grid-reel-auto-fill">
        <For each={props.data || Array(7).fill(null)}>{media => (
          <MediaCard scoped class="media-card" media={media} loading={props.loading} cardZoomIn coverFadeIn showScore showStatus quickActions hoverCard />
        )}</For>
      </GridReelAutoFill>
    </section>
  );
}
