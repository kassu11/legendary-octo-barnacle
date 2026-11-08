import { A } from "@solidjs/router";
import { createMemo, Show, splitProps } from "solid-js";
import { urlUtils } from "@/utils/utils";
import "./MediaCard.scoped.css";
import { ImageLoader } from "./ImageLoader.scoped";
import { globalEditedMedia, setMediaPageAnilistData } from "@/state/globalState";
import { createHover, HoverPortal } from "@/hooks/createHover";
import { MediaHoverCard } from "./MediaHoverCard.scoped";
import { MediaQuickActions } from "./MediaQuickActions.scoped";
import { MediaStatusIcon } from "./MediaStatusIcon.scoped";
import { MediaBadges } from "./MediaBadges.scoped";
import { MediaCardFooter } from "./MediaCardFooter.scoped";

/**
 * Base media cover card. Every extra feature is opt-in and off by default.
 *
 * @param {Object} props
 * @param {Object} [props.media] Anilist media, card renders as an empty skeleton without it
 * @param {Object} [props.mediaListEntry] List entry to show, overrides the session edits and media.mediaListEntry
 * @param {boolean} [props.loading] Grays out the card while new data is being fetched
 * @param {number} [props.rank] Rank badge shown in the top left corner
 * @param {boolean} [props.cardZoomIn] Zoom in animation when the card is mounted (not reactive)
 * @param {boolean} [props.coverFadeIn] Fade in the cover image when it has loaded
 * @param {boolean} [props.showScore] Global average score badge in the top right corner
 * @param {boolean} [props.showStatus] Users list status icon next to the title
 * @param {boolean} [props.quickActions] Edit and list status buttons when hovering the card
 * @param {boolean} [props.showFooter] Users list progress and score at the bottom of the cover
 * @param {string} [props.scoreFormat] Score format used by the footer, defaults to POINT_10_DECIMAL
 * @param {boolean} [props.progressIncrement] "+" buttons in the footer to increase the progress
 * @param {Function} [props.afterProgressMutation] Called with the saved list entry after the progress has been increased through the footer
 * @param {Function} [props.afterMutation] Called with the saved list entry after the media has been edited through the quick actions
 * @param {Function} [props.afterDelete] Called after the list entry has been deleted through the quick actions
 * @param {boolean} [props.hoverCard] Media info popup when hovering the card
 * @param {boolean} [props.showAdult] 18+ badge for adult media
 * @param {boolean} [props.showRepeats] Users rewatch / reread count badge
 * @param {boolean} [props.showNotes] Users notes badge
 * @param {import("solid-js").JSX.Element} [props.children] Extra content rendered on top of the cover
 */
export function MediaCard(props) {
  const [badges, local, scoping] = splitProps(props, ["showAdult", "showRepeats", "showNotes"], ["media", "mediaListEntry", "coverFadeIn", "loading", "cardZoomIn", "rank", "showScore", "showStatus", "showFooter", "scoreFormat", "progressIncrement", "afterProgressMutation", "quickActions", "afterMutation", "afterDelete", "hoverCard", "children"]);

  // We don't want these to be reactive, because if they switch between animation, the animation will stop
  const { cardZoomIn } = local;

  const handleClick = () => {
    setMediaPageAnilistData({ data: { data: { Media: local.media } } });
  };

  // A given entry can belong to another user, so session edits only override it when they are for the same entry
  const mediaListEntry = createMemo(() => {
    const entry = globalEditedMedia[local.media?.id];
    if (local.mediaListEntry !== undefined) {
      if (entry && entry.id === local.mediaListEntry?.id) {
        return { ...local.mediaListEntry, ...entry };
      }

      return local.mediaListEntry;
    }

    if (entry === undefined) {
      return local.media?.mediaListEntry;
    }

    return entry;
  });

  const status = createMemo(() => {
    if (!local.showStatus && !local.quickActions) {
      return undefined;
    }

    return mediaListEntry()?.status;
  });

  // Hover tracking polls every frame, so only create it when something uses it
  const hover = (local.hoverCard || local.quickActions) && createHover({ placements: ["right-start", "left-start", "bottom"], offset: 25, alignOffset: 25 });

  return (
    <A scoped {...scoping} ref={hover?.triggerRef} href={urlUtils.anilistMediaUrl(local.media)} data-status={status()} classList={{ "media-card": true, "zoom-in": cardZoomIn, "loading": local.loading, [props.class]: !!props.class }} style={{ "--media-background-color": local.media?.coverImage?.color }} onClick={handleClick}>
      <ImageLoader scoped class="bg" fadeIn={local.coverFadeIn} src={local.media?.coverImage?.extraLarge || local.media?.coverImage?.large} />
      <Show when={local.media}>
        {/* Score is its own badge group, so it stays in the top right while the other badges wrap next to it */}
        <div class="top">
          <MediaBadges {...badges} scoped class="badges" media={local.media} entry={mediaListEntry()} />
          <MediaBadges scoped class="score" media={local.media} showScore={local.showScore} />
        </div>
      </Show>
      <Show when={local.media && local.rank}>
        <div class="rank">#{local.rank}</div>
      </Show>
      <Show when={local.media?.title?.userPreferred}>
        <p class="line-clamp">
          <Show when={local.showStatus}>
            <MediaStatusIcon scoped class="status-icon" status={status()} />
          </Show>
          {local.media.title.userPreferred}
        </p>
      </Show>
      {/* Quick actions and footer share one column, so the quick actions stack on top of the footer instead of overlapping it */}
      <Show when={local.media && (local.showFooter || local.quickActions)}>
        <div class="bottom">
          <Show when={local.quickActions && hover.isOpen()}>
            <MediaQuickActions scoped class="quick-actions" media={local.media} mediaListEntry={mediaListEntry()} status={status()} afterMutation={local.afterMutation} afterDelete={local.afterDelete} />
          </Show>
          <Show when={local.showFooter && mediaListEntry()}>
            <MediaCardFooter scoped class="footer" media={local.media} entry={mediaListEntry()} scoreFormat={local.scoreFormat} progressIncrement={local.progressIncrement} afterProgressMutation={local.afterProgressMutation} />
          </Show>
        </div>
      </Show>
      {local.children}
      <Show when={hover?.isOpen() && local.media}>
        <Show when={local.hoverCard}>
          <HoverPortal>
            <MediaHoverCard media={local.media} loading={local.loading} ref={hover.floatingRef} />
          </HoverPortal>
        </Show>
      </Show>
    </A>
  )
}
