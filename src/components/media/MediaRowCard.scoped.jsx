import { A } from "@solidjs/router";
import { createMemo, For, Match, Show, splitProps, Switch } from "solid-js";
import { capitalize, formatMediaFormat, formatMediaStatus, mediaUrl, numberCommas } from "@/utils/formatUtils.js";
import { formatSecondsToLongString } from "@/utils/timeUtils.js";
import { CheckIcon, StarIcon } from "@/assets/icons.jsx";
import EmojiByScore from "@/components/EmojiByScore.scoped.jsx";
import { createHover, HoverPortal } from "@/hooks/createHover";
import { MediaHoverCard } from "@/components/media/MediaHoverCard.scoped.jsx";
import { MediaQuickActions } from "@/components/media/MediaQuickActions.scoped.jsx";
import { MediaStatusIcon } from "@/components/media/MediaStatusIcon.scoped.jsx";
import { MediaRowCardCharacterRole } from "@/components/media/MediaRowCardCharacterRole.scoped.jsx";
import { MediaRowCardStaffRole } from "@/components/media/MediaRowCardStaffRole.scoped.jsx";
import { globalEditedMedia, setMediaPageAnilistData } from "@/state/globalState.js";
import "./MediaRowCard.scoped.css";

/**
 * Wide media card that shows the media info on one row
 * @param {Object} props
 * @param {Object} [props.media] Anilist media, card renders as an empty skeleton without it
 * @param {Object} [props.mediaListEntry] List entry to show, overrides the session edits and media.mediaListEntry
 * @param {boolean} [props.showStatus] Users list status icon next to the title
 * @param {boolean} [props.otherUsersEntry] mediaListEntry belongs to another user, so the quick actions edit the viewers own entry instead
 * @param {Function} [props.afterMutation] Called with the saved list entry after the media has been edited through the quick actions
 * @param {Function} [props.afterDelete] Called after the list entry has been deleted through the quick actions
 * @param {number} [props.rank] Rank shown on the left side of the card
 * @param {string} [props.type] Search page type (anime, manga or media) used in the genre links, defaults to the media type
 * @param {boolean} [props.loading] Grays out the card while new data is being fetched
 * @param {boolean} [props.subgrid] Columns come from the parent grid, so they line up with the other row cards. The parent grid has to be a size container
 * @param {Object} [props.characterRole] Character media edge, shows the role and voice actors under the genres
 * @param {string[]} [props.voiceActorLanguages] Languages of the voice actors shown with the character role
 * @param {Object} [props.staffRole] Roles of a staff member in the media, shows the voiced characters and staff roles under the genres
 * @param {boolean} [props.showDates] Users start and completion dates at the bottom of the hover card
 * @param {boolean} [props.showProgress] Users list progress in place of the episode, chapter and volume counts
 * @param {boolean} [props.showType] Media type (format) above the episode, chapter and volume counts
 * @param {boolean} [props.showUserScore] Users list score in place of the media type, takes its place when both are set
 * @param {string} [props.scoreFormat] Score format of the list entry owner used by showUserScore, defaults to POINT_10_DECIMAL
 * @param {boolean} [props.selectable] Card is clicked as a whole for selecting it, links and quick actions are disabled
 * @param {boolean} [props.selected] Use with selectable
 */
export function MediaRowCard(props) {
  const [local, scoping] = splitProps(props, ["media", "mediaListEntry", "showStatus", "otherUsersEntry", "afterMutation", "afterDelete", "rank", "type", "loading", "subgrid", "class", "characterRole", "voiceActorLanguages", "staffRole", "showDates", "showProgress", "showType", "showUserScore", "scoreFormat", "selectable", "selected"]);

  return (
    <div {...scoping} classList={{ "media-row-card": true, "subgrid": local.subgrid, "loading": local.loading, "selectable": local.selectable, "selected": local.selected, [local.class]: !!local.class }}>
      <Show when={local.media}>
        <MediaRowCardContent media={local.media} mediaListEntry={local.mediaListEntry} showStatus={local.showStatus} otherUsersEntry={local.otherUsersEntry} afterMutation={local.afterMutation} afterDelete={local.afterDelete} rank={local.rank} type={local.type} loading={local.loading} characterRole={local.characterRole} voiceActorLanguages={local.voiceActorLanguages} staffRole={local.staffRole} showDates={local.showDates} showProgress={local.showProgress} showType={local.showType} showUserScore={local.showUserScore} scoreFormat={local.scoreFormat} selectable={local.selectable} />
      </Show>
    </div>
  );
}

function MediaRowCardContent(props) {
  const hover = createHover({ placements: ["left-center", "bottom", "top"], offset: 25, alignOffset: 25 });
  // A given entry can belong to another user, so session edits only override it when they are for the same entry
  const mediaListEntry = createMemo(() => {
    const entry = globalEditedMedia[props.media.id];
    if (props.mediaListEntry !== undefined) {
      if (entry && entry.id === props.mediaListEntry?.id) {
        return { ...props.mediaListEntry, ...entry };
      }

      return props.mediaListEntry;
    }

    if (entry === undefined) {
      return props.media.mediaListEntry;
    }

    return entry;
  });

  const status = createMemo(() => props.showStatus ? mediaListEntry()?.status : undefined);

  // Quick actions always edit the viewers own entry, which is only known when it has been edited during this session
  const quickActionsEntry = createMemo(() => props.otherUsersEntry ? globalEditedMedia[props.media.id] : mediaListEntry());

  // Plain accessors instead of inline ternaries, because the compiler wraps prop ternaries in a memo,
  // which would be created without an owner when the callbacks are read inside event handlers
  const quickActionsAfterMutation = () => props.otherUsersEntry ? undefined : props.afterMutation;
  const quickActionsAfterDelete = () => props.otherUsersEntry ? undefined : props.afterDelete;

  const handleClick = () => {
    setMediaPageAnilistData({ data: { data: { Media: props.media } } });
  };

  return (
    <div class="row" classList={{ ranked: !!props.rank }} data-status={status()} style={{ "--media-background-color": props.media.coverImage?.color }}>
      <Show when={props.rank}>
        <p class="ranking">
          #
          <span>{props.rank}</span>
        </p>
      </Show>
      <div class="body" ref={hover.triggerRef}>
        <Show when={props.selectable}>
          <div class="selection-check">
            <CheckIcon scoped />
          </div>
        </Show>
        <div class="cover-container">
          <img src={props.media.coverImage?.large} class="cover" alt="Cover." />
        </div>
        <div class="content clamp">
          <A scoped href={mediaUrl(props.media)} class="title line-clamp" onClick={handleClick}>
            <Show when={status()}>
              <span class="status-icon">
                <MediaStatusIcon status={status()} />
              </span>
            </Show>
            {props.media.title.userPreferred}
          </A>
          <ol class="genre-list">
            <For each={props.media.genres}>{genre => (
              <li class="genre">
                <A scoped href={`/ani/search/${(props.type || props.media.type || "media").toLowerCase()}?genre=${encodeURIComponent(genre)}`}>{genre}</A>
              </li>
            )}</For>
          </ol>
          <Show when={props.characterRole}>
            <MediaRowCardCharacterRole edge={props.characterRole} languages={props.voiceActorLanguages} media={props.media} />
          </Show>
          <Show when={props.staffRole}>
            <MediaRowCardStaffRole role={props.staffRole} media={props.media} />
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
            <Switch>
              <Match when={props.showUserScore}>
                <Show when={mediaListEntry()?.score}>
                  <p class="user-score">
                    <Switch>
                      <Match when={props.scoreFormat === "POINT_100"}>{mediaListEntry().score}/100</Match>
                      <Match when={props.scoreFormat === "POINT_5"}>
                        {mediaListEntry().score}/5
                        <span class="score-icon"><StarIcon /></span>
                      </Match>
                      <Match when={props.scoreFormat === "POINT_3"}>
                        <span class="score-icon"><EmojiByScore score={[0, 0, 70, 80][mediaListEntry().score]} /></span>
                      </Match>
                      <Match when>{mediaListEntry().score}/10</Match>
                    </Switch>
                  </p>
                </Show>
              </Match>
              <Match when={props.showType}>
                <p>{formatMediaFormat(props.media.format) || "TBA"}</p>
              </Match>
            </Switch>
            <p>
              <Switch>
                <Match when={props.media.type === "ANIME" && props.media.format === "MOVIE"}>
                  {formatSecondsToLongString(props.media.duration)}
                </Match>
                <Match when={props.showProgress && props.media.type === "ANIME" && mediaListEntry()}>
                  Ep {numberCommas(mediaListEntry().progress)}
                  <Show when={mediaListEntry().progress < props.media.episodes}>/{numberCommas(props.media.episodes)}</Show>
                </Match>
                <Match when={props.showProgress && props.media.format === "NOVEL" && mediaListEntry()}>
                  Vol {numberCommas(mediaListEntry().progressVolumes)}
                  <Show when={mediaListEntry().progressVolumes < props.media.volumes}>/{numberCommas(props.media.volumes)}</Show>
                </Match>
                <Match when={props.showProgress && props.media.type === "MANGA" && mediaListEntry()}>
                  Ch {numberCommas(mediaListEntry().progress)}
                  <Show when={mediaListEntry().progress < props.media.chapters}>/{numberCommas(props.media.chapters)}</Show>
                </Match>
                <Match when={props.media.type === "ANIME" && props.media.episodes}>
                  {numberCommas(props.media.episodes)} Episode
                  <Show when={props.media.episodes > 1}>s</Show>
                </Match>
                <Match when={props.media.format === "NOVEL" && props.media.volumes}>
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
              <Match when={props.media.type === "MANGA" && props.media.startDate?.year}>
                <p>{props.media.startDate.year}</p>
              </Match>
            </Switch>
            <p>{formatMediaStatus(props.media.status)}</p>
          </div>
        </div>
        <Show when={hover.isOpen() && !props.selectable}>
          <div class="quick-actions">
            <MediaQuickActions horizontal media={props.media} mediaListEntry={quickActionsEntry()} status={quickActionsEntry()?.status} afterMutation={quickActionsAfterMutation()} afterDelete={quickActionsAfterDelete()} />
          </div>
        </Show>
      </div>
      <Show when={hover.isOpen()}>
        <HoverPortal>
          <MediaHoverCard media={props.media} entry={mediaListEntry()} showDates={props.showDates} loading={props.loading} ref={hover.floatingRef} />
        </HoverPortal>
      </Show>
    </div>
  );
}
