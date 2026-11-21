import { Show, splitProps } from "solid-js";
import "./MediaBadges.scoped.css";
import { CommentIcon, RepeatIcon, StarIcon } from "@/assets/icons.jsx";
import { Tooltip } from "@/components/Tooltip.scoped";
import { formatMediaStatus } from "@/utils/formatUtils";

/**
 * Small info badges for the media cover. Every badge is opt-in.
 *
 * @param {Object} props
 * @param {Object} props.media Anilist media
 * @param {Object} [props.entry] Users media list entry
 * @param {boolean} [props.showAdult] 18+ badge for adult media
 * @param {boolean} [props.showRepeats] Rewatch / reread count
 * @param {boolean} [props.showNotes] Users notes, the note text is shown as a tooltip
 * @param {boolean} [props.showScore] Global average score
 * @param {boolean} [props.showHaltedStatus] Media release status when it is on hiatus or cancelled
 */
export function MediaBadges(props) {
  const [local, scoping] = splitProps(props, ["media", "entry", "showAdult", "showRepeats", "showNotes", "showScore", "showHaltedStatus"]);

  return (
    <div {...scoping} classList={{ "media-badges": true, [props.class]: !!props.class }}>
      <Show when={local.showAdult && local.media?.isAdult}>
        <div class="badge adult">18+</div>
      </Show>
      <Show when={local.showHaltedStatus && (local.media?.status === "HIATUS" || local.media?.status === "CANCELLED")}>
        <div classList={{ badge: true, hiatus: local.media.status === "HIATUS", cancelled: local.media.status === "CANCELLED" }}>{formatMediaStatus(local.media.status)}</div>
      </Show>
      <Show when={local.showRepeats && local.entry?.repeat}>
        <div class="badge">
          {local.entry.repeat}
          <RepeatIcon scoped />
          <Tooltip placements={["top", "bottom"]}>
            {(local.media?.type === "MANGA" ? "Reread " : "Rewatched ") + local.entry.repeat + (local.entry.repeat === 1 ? " time" : " times")}
          </Tooltip>
        </div>
      </Show>
      <Show when={local.showNotes && local.entry?.notes}>
        <div class="badge">
          <CommentIcon scoped />
          <Tooltip placements={["top", "bottom"]}>{local.entry.notes}</Tooltip>
        </div>
      </Show>
      <Show when={local.showScore && local.media?.averageScore}>
        <div class="badge score">
          <StarIcon scoped />
          {local.media.averageScore / 10}
        </div>
      </Show>
    </div>
  );
}
