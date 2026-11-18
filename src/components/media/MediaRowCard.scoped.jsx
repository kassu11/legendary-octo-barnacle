import { A } from "@solidjs/router";
import { createMemo, For, Match, Show, splitProps, Switch } from "solid-js";
import { capitalize, formatMediaFormat, formatMediaStatus, mediaUrl, numberCommas } from "@/utils/formatUtils.js";
import { formatSecondsToLongString } from "@/utils/timeUtils.js";
import EmojiByScore from "@/components/EmojiByScore.scoped.jsx";
import { createHover, HoverPortal } from "@/hooks/createHover";
import { MediaHoverCard } from "@/components/media/MediaHoverCard.scoped.jsx";
import { MediaQuickActions } from "@/components/media/MediaQuickActions.scoped.jsx";
import { MediaStatusIcon } from "@/components/media/MediaStatusIcon.scoped.jsx";
import { MediaRowCardCharacterRole } from "@/components/media/MediaRowCardCharacterRole.scoped.jsx";
import { MediaRowCardStaffRole } from "@/components/media/MediaRowCardStaffRole.scoped.jsx";
import { globalEditedMedia } from "@/state/globalState.js";
import "./MediaRowCard.scoped.css";

/**
 * Wide media card that shows the media info on one row
 * @param {Object} props
 * @param {Object} [props.media] Anilist media, card renders as an empty skeleton without it
 * @param {number} [props.rank] Rank shown on the left side of the card
 * @param {string} [props.type] Search page type (anime, manga or media) used in the genre links, defaults to the media type
 * @param {boolean} [props.loading] Grays out the card while new data is being fetched
 * @param {boolean} [props.subgrid] Columns come from the parent grid, so they line up with the other row cards. The parent grid has to be a size container
 * @param {Object} [props.characterRole] Character media edge, shows the role and voice actors under the genres
 * @param {string[]} [props.voiceActorLanguages] Languages of the voice actors shown with the character role
 * @param {Object} [props.staffRole] Roles of a staff member in the media, shows the voiced characters and staff roles under the genres
 */
export function MediaRowCard(props) {
  const [local, scoping] = splitProps(props, ["media", "rank", "type", "loading", "subgrid", "class", "characterRole", "voiceActorLanguages", "staffRole"]);

  return (
    <div {...scoping} classList={{ "media-row-card": true, "subgrid": local.subgrid, "loading": local.loading, [local.class]: !!local.class }}>
      <Show when={local.media}>
        <MediaRowCardContent media={local.media} rank={local.rank} type={local.type} loading={local.loading} characterRole={local.characterRole} voiceActorLanguages={local.voiceActorLanguages} staffRole={local.staffRole} />
      </Show>
    </div>
  );
}

function MediaRowCardContent(props) {
  const hover = createHover({ placements: ["left-center", "bottom", "top"], offset: 25, alignOffset: 25 });
  // Session edits override the entry from the response, same as in MediaCard
  const mediaListEntry = createMemo(() => globalEditedMedia[props.media.id] === undefined ? props.media.mediaListEntry : globalEditedMedia[props.media.id]);

  return (
    <div class="row" classList={{ ranked: !!props.rank }} data-status={mediaListEntry()?.status} style={{ "--media-background-color": props.media.coverImage?.color }}>
      <Show when={props.rank}>
        <p class="ranking">
          #
          <span>{props.rank}</span>
        </p>
      </Show>
      <div class="body" ref={hover.triggerRef}>
        <div class="cover-container">
          <img src={props.media.coverImage?.large} class="cover" alt="Cover." />
        </div>
        <div class="content clamp">
          <A scoped href={mediaUrl(props.media)} class="title line-clamp">
            <Show when={mediaListEntry()?.status}>
              <span class="status-icon">
                <MediaStatusIcon status={mediaListEntry().status} />
              </span>
            </Show>
            {props.media.title.userPreferred}
          </A>
          <ol class="genre-list">
            <For each={props.media.genres}>{genre => (
              <li class="genre">
                <A scoped href={`/ani/search/${(props.type || props.media.type || "media").toLowerCase()}?theme=${encodeURIComponent(genre)}`}>{genre}</A>
              </li>
            )}</For>
          </ol>
          <Show when={props.characterRole}>
            <MediaRowCardCharacterRole edge={props.characterRole} languages={props.voiceActorLanguages} />
          </Show>
          <Show when={props.staffRole}>
            <MediaRowCardStaffRole role={props.staffRole} />
          </Show>
        </div>
        <div class="info">
          <div class="score">
            <Show when={props.media.averageScore}>
              <EmojiByScore score={props.media.averageScore} />
              <div class="clamp">
                <p>{props.media.averageScore}%</p>
                <p>{numberCommas(props.media.popularity)} users</p>
              </div>
            </Show>
          </div>
          <div class="clamp">
            <p>{formatMediaFormat(props.media.format) || "TBA"}</p>
            <p>
              <Switch>
                <Match when={props.media.type === "ANIME"}>
                  <Switch>
                    <Match when={props.media.format === "MOVIE"}>{formatSecondsToLongString(props.media.duration)}</Match>
                    <Match when={props.media.episodes}>
                      {numberCommas(props.media.episodes)} Episode
                      <Show when={props.media.episodes > 1}>s</Show>
                    </Match>
                  </Switch>
                </Match>
                <Match when={props.media.type === "MANGA" && props.media.format === "NOVEL" && props.media.volumes}>
                  {numberCommas(props.media.volumes)} Volume
                  <Show when={props.media.volumes > 1}>s</Show>
                </Match>
                <Match when={props.media.type === "MANGA" && props.media.chapters}>
                  {numberCommas(props.media.chapters)} Chapter
                  <Show when={props.media.chapters > 1}>s</Show>
                </Match>
              </Switch>
            </p>
          </div>
          <div class="clamp">
            {/* TODO: Check how anilist handles airing episodes*/}
            <Switch>
              <Match when={(props.media.episodes > 32 || props.media.type === "MANGA") && props.media.endDate?.year - props.media.startDate?.year > 0}>
                <p>{props.media.startDate.year} - {props.media.endDate.year}</p>
              </Match>
              <Match when={props.media.season}>
                <p>{capitalize(props.media.season)} {props.media.seasonYear}</p>
              </Match>
            </Switch>
            <p>{formatMediaStatus(props.media.status)}</p>
          </div>
        </div>
        <Show when={hover.isOpen()}>
          <div class="quick-actions">
            <MediaQuickActions horizontal media={props.media} mediaListEntry={mediaListEntry()} status={mediaListEntry()?.status} />
          </div>
        </Show>
      </div>
      <Show when={hover.isOpen()}>
        <HoverPortal>
          <MediaHoverCard media={props.media} loading={props.loading} ref={hover.floatingRef} />
        </HoverPortal>
      </Show>
    </div>
  );
}
