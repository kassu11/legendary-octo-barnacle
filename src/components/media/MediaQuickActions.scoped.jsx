import { batch, Show, splitProps } from "solid-js";
import "./MediaQuickActions.scoped.css";
import Complete from "@/assets/Complete";
import { RepeatIcon } from "@/assets/RepeatIcon";
import Planning from "@/assets/Planning";
import Watching from "@/assets/Watching";
import Edit from "@/assets/Edit";
import { useEditMediaEntries } from "@/state/providers";
import { createAnilistFetcher, fetcherToFetch } from "@/api/fetcherUtils";
import { queries } from "@/api/api";
import { addApplicationNotification } from "@/state/notifications";
import { storeGlobalEditedMedia, token2 } from "@/state/globalState";
import { createHover } from "@/hooks/createHover";
import { Tooltip } from "@/components/Tooltip.scoped";

/**
 * @param {Object} props
 * @param {Object} props.media Anilist media
 * @param {Object} [props.mediaListEntry] Users list entry, used as the editors default values
 * @param {string} [props.status] Users current list status
 * @param {Function} [props.afterMutation] Called with the saved list entry after the media has been edited
 * @param {Function} [props.afterDelete] Called after the list entry has been deleted
 */
export function MediaQuickActions(props) {
  const [local, scoping] = splitProps(props, ["media", "mediaListEntry", "status", "afterMutation", "afterDelete"]);
  const { openEditor } = useEditMediaEntries();

  const handleClick = status => async e => {
    e.preventDefault();

    const fetcher = createAnilistFetcher(queries.anilistMutateMedia, { mediaId: local.media.id, status }, AbortSignal.timeout(30_000));
    const res = await fetcherToFetch(fetcher);
    if (res.status === 200) {
      const json = await res.json();
      const entry = json.data.SaveMediaListEntry;
      batch(() => {
        local.afterMutation?.(entry);
        storeGlobalEditedMedia(entry.mediaId, entry);
      });
    } else {
      addApplicationNotification({ type: "error", message: "Failed to update media status", duration: 30_000 });
    }
  };

  const hover = createHover();

  return (
    <Show when={token2()}>
      <div {...scoping} class={"quick-action-wrapper " + (scoping.class ?? "")} ref={hover.triggerRef}>

        <QuickActionButton label="Edit media" onClick={e => {
          e.preventDefault();
          openEditor({ ...local.media, mediaListEntry: local.mediaListEntry }, {
            mutateMedia: local.afterMutation,
            deleteMedia: local.afterDelete,
          });
        }}>
          <Edit scoped />
        </QuickActionButton>

        <Show when={hover.isOpen()}>

          <QuickActionButton active={local.status === "PLANNING"} onClick={handleClick("PLANNING")} label="Set to planning">
            <Planning scoped />
          </QuickActionButton>

          <QuickActionButton active={local.status === "CURRENT"} onClick={handleClick("CURRENT")} label={"Set to " + (local.media.type === "ANIME" ? "watching" : "reading")}>
            <Watching scoped />
          </QuickActionButton>

          <QuickActionButton active={local.status === "COMPLETED"} onClick={handleClick("COMPLETED")} label="Set to completed">
            <Complete scoped />
          </QuickActionButton>

          <QuickActionButton active={local.status === "REPEATING"} onClick={handleClick("REPEATING")} label={"Set to " + (local.media.type === "ANIME" ? "rewatching" : "rereading")}>
            <RepeatIcon scoped />
          </QuickActionButton>

        </Show>

      </div>
    </Show>
  );
}

function QuickActionButton(props) {
  return (
    <button class="action-button" classList={{ active: props.active }} onClick={props.onClick}>
      {props.children}
      <Tooltip placements={["left", "right", "bottom"]} offset={16}>{props.label}</Tooltip>
    </button>
  );
}
