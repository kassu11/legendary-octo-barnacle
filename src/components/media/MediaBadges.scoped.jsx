import { Show, splitProps } from "solid-js";
import "./MediaBadges.scoped.css";
import { RepeatIcon } from "@/assets/RepeatIcon";
import NotesIcon from "@/assets/NotesIcon";
import { Tooltip } from "@/components/Tooltip.scoped";

/**
 * Small info badges for the media cover. Every badge is opt-in.
 *
 * @param {Object} props
 * @param {Object} props.media Anilist media
 * @param {Object} [props.entry] Users media list entry
 * @param {boolean} [props.showAdult] 18+ badge for adult media
 * @param {boolean} [props.showRepeats] Rewatch / reread count
 * @param {boolean} [props.showNotes] Users notes, the note text is shown as a tooltip
 */
export function MediaBadges(props) {
  const [local, scoping] = splitProps(props, ["media", "entry", "showAdult", "showRepeats", "showNotes"]);

  return (
    <div {...scoping} classList={{ "media-badges": true, [props.class]: !!props.class }}>
      <Show when={local.showAdult && local.media?.isAdult}>
        <div class="badge adult">18+</div>
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
          <NotesIcon scoped />
          <Tooltip placements={["top", "bottom"]}>{local.entry.notes}</Tooltip>
        </div>
      </Show>
    </div>
  );
}
