import { A } from "@solidjs/router";
import { createMemo, Show, splitProps } from "solid-js";
import { urlUtils } from "@/utils/utils";
import Star from "@/assets/Star";
import "./MediaCard.scoped.css";
import { ImageLoader } from "./ImageLoader.scoped";
import { globalEditedMedia, setMediaPageAnilistData } from "@/state/globalState";
import { createHover, HoverPortal } from "@/hooks/createHover";
import { MediaHoverCard } from "./MediaHoverCard.scoped";
import { MediaQuickActions } from "./MediaQuickActions.scoped";
import { MediaStatusIcon } from "./MediaStatusIcon.scoped";

/**
 * Base media cover card. Every extra feature is opt-in and off by default.
 *
 * @param {Object} props
 * @param {Object} [props.media] Anilist media, card renders as an empty skeleton without it
 * @param {boolean} [props.loading] Grays out the card while new data is being fetched
 * @param {number} [props.rank] Rank badge shown in the top left corner
 * @param {boolean} [props.cardZoomIn] Zoom in animation when the card is mounted (not reactive)
 * @param {boolean} [props.coverFadeIn] Fade in the cover image when it has loaded
 * @param {boolean} [props.showScore] Global average score badge in the top right corner (not reactive)
 * @param {boolean} [props.showStatus] Users list status icon next to the title (not reactive)
 * @param {boolean} [props.quickActions] Edit and list status buttons when hovering the card (not reactive)
 * @param {boolean} [props.hoverCard] Media info popup when hovering the card (not reactive)
 * @param {import("solid-js").JSX.Element} [props.children] Extra content rendered on top of the cover
 */
export function MediaCard(props) {
  const [local, scoping] = splitProps(props, ["media", "coverFadeIn", "loading", "cardZoomIn", "rank", "showScore", "showStatus", "quickActions", "hoverCard", "children"]);

  // We don't want these to be reactive, because if they switch between animation, the animation will stop
  // and features shouldn't appear or disappear after the card has been created
  const { cardZoomIn, showScore, showStatus, quickActions, hoverCard } = local;

  const handleClick = () => {
    setMediaPageAnilistData({ data: { data: { Media: local.media } } });
  };

  const status = createMemo(() => {
    if (!showStatus && !quickActions) {
      return undefined;
    }

    const entry = globalEditedMedia[local.media?.id];
    if (entry === undefined) {
      return local.media?.mediaListEntry?.status;
    }

    return entry?.status
  });

  // Hover tracking polls every frame, so only create it when something uses it
  const hover = (hoverCard || quickActions) && createHover({ placements: ["right-start", "left-start", "bottom"], offset: 25, alignOffset: 25 });

  return (
    <A scoped {...scoping} ref={hover?.triggerRef} href={urlUtils.anilistMediaUrl(local.media)} data-status={status()} class="media-card" classList={{ "zoom-in": cardZoomIn, "loading": local.loading }} style={{ "--media-background-color": local.media?.coverImage?.color }} onClick={handleClick}>
      <ImageLoader scoped class="bg" fadeIn={local.coverFadeIn} src={local.media?.coverImage?.extraLarge || local.media?.coverImage?.large} />
      <Show when={local.media && local.rank}>
        <div class="rank">#{local.rank}</div>
      </Show>
      <Show when={showScore && local.media?.averageScore}>
        <div class="score">
          <Star scoped /> {(local.media.averageScore / 10)}
        </div>
      </Show>
      <Show when={local.media?.title?.userPreferred}>
        <p class="line-clamp">
          <Show when={showStatus}>
            <MediaStatusIcon scoped class="status-icon" status={status()} />
          </Show>
          {local.media.title.userPreferred}
        </p>
      </Show>
      {local.children}
      <Show when={hover?.isOpen() && local.media}>
        <Show when={quickActions}>
          <MediaQuickActions scoped class="quick-actions" media={local.media} status={status()} />
        </Show>
        <Show when={hoverCard}>
          <HoverPortal>
            <MediaHoverCard media={local.media} loading={local.loading} ref={hover.floatingRef} />
          </HoverPortal>
        </Show>
      </Show>
    </A>
  )
}
