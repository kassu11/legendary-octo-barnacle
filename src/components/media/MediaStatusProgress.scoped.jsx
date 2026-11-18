import { For, Show } from "solid-js";
import "./MediaStatusProgress.scoped.css";
import { MediaStatusIcon } from "@/components/media/MediaStatusIcon.scoped";
import { Tooltip } from "@/components/Tooltip.scoped";
import { formatUsersMediaStatus } from "@/utils/formatUtils.js";

// Order of the status bar segments
const LIST_STATUSES = ["CURRENT", "REPEATING", "COMPLETED", "PAUSED", "DROPPED", "PLANNING"];

/**
 * Bar of how many of the media are on the users list, split by the list status. Renders nothing when none of them are on the list
 * @param {Object} props
 * @param {{ listed: number, total: number, [status: string]: number }} props.counts Media count of each list status, how many are on the list and how many there are in total
 * @param {"anime"|"manga"|"media"} props.type Media type of the status labels
 */
export function MediaStatusProgress(props) {
  return (
    <Show when={props.counts.listed}>
      <div class="media-status-progress">
        <div class="bar">
          <For each={LIST_STATUSES}>{status => (
            <Show when={props.counts[status]}>
              <div
                class="segment"
                attr:data-status={status}
                style={{ width: `${props.counts[status] / props.counts.total * 100}%` }}
              >
                <Tooltip>{formatUsersMediaStatus(status, props.type)} {props.counts[status]}</Tooltip>
              </div>
            </Show>
          )}</For>
        </div>
        <ul class="legend">
          <For each={LIST_STATUSES}>{status => (
            <Show when={props.counts[status]}>
              <li>
                <MediaStatusIcon status={status} />
                <span class="status-label">
                  {formatUsersMediaStatus(status, props.type)}
                </span>
                {" "}{props.counts[status]}
              </li>
            </Show>
          )}</For>
          <li class="total">{props.counts.listed} / {props.counts.total}</li>
        </ul>
      </div>
    </Show>
  );
}
