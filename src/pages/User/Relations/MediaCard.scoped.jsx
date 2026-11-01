import { A } from "@solidjs/router";
import { createMemo, For, Match, Show, splitProps, Switch } from "solid-js";
import { capitalize, formatMediaFormat, formatMediaStatus, languageFromCountry } from "../../../utils/formating";
import "./index-(user-relations).scoped.css";
import { DurationToTime, EpisodeTime2 } from "../../Home/EpisodeTime";
import { formatingUtils, urlUtils } from "../../../utils/utils";
import Star from "../../../assets/Star";
import { setMediaPageAnilistData } from "../../MediaPageAnilist/index(media-page-anilist).scoped";
import "./MediaCard.scoped.css";
import { ImageLoader } from "./ImageLoader.scoped";
import Complete from "../../../assets/Complete";
import { RepeatIcon } from "../../../assets/RepeatIcon";
import Planning from "../../../assets/Planning";
import Watching from "../../../assets/Watching";
import TrashIcon from "../../../assets/TrashIcon";
import StopIcon from "../../../assets/StopIcon";
import { useEditMediaEntries } from "../../../context/providers";
import { createAnilistFetcher, fetcherToFetch } from "../../../utils/fetcherUtils";
import { queries } from "../../../collections/collections";
import { addApplicationNotification } from "../../App/ApplicationNotifications.scoped";
import { globalEditedMedia, storeGlobalEditedMedia, token2 } from "../../../core/globalState";
import Edit from "../../../assets/Edit";
import { createHover, HoverPortal } from "../../../hooks/createHover";


export function MediaCard(props) {

  // We don't want this to be reactive, because if they switch between animation, the animation will stop
  const [local, scoping] = splitProps(props, ["media", "coverFadeIn", "loading", "cardZoomIn"]);
  const { cardZoomIn } = local;

  const handleClick = () => {
    setMediaPageAnilistData({ data: { data: { Media: local.media } } });
  };

  const status = createMemo(() => {

    const entry = globalEditedMedia[local.media?.id];
    if (entry === undefined) {
      return local.media?.mediaListEntry?.status;
    }

    return entry?.status

  });

  const hover = createHover({ placements: ["right-start", "left-start", "bottom"], offset: 25, alignOffset: 25 });

  return (
    <A scoped {...scoping} ref={hover.triggerRef} href={urlUtils.anilistMediaUrl(local.media)} data-status={status()} class="media-card" classList={{ "zoom-in": cardZoomIn, "loading": local.loading }} style={{ "--media-background-color": local.media?.coverImage?.color }} onClick={handleClick}>
      <ImageLoader scoped class="bg" fadeIn={local.coverFadeIn} src={local.media?.coverImage?.extraLarge || local.media?.coverImage?.large} />
      <Show when={local.media?.averageScore}>
        <div class="score">
          <Star scoped /> {(local.media.averageScore / 10)}
        </div>
      </Show>
      <Show when={local.media?.title?.userPreferred}>
        <p class="line-clamp">
          <StatusIcon status={status()} />
          {local.media.title.userPreferred}
        </p>
      </Show>
      <Show when={hover.isOpen() && local.media}>
        <QuickActionItemList {...local} status={status()} />
        <HoverPortal>
          <HoverCard {...local} ref={hover.floatingRef} />
        </HoverPortal>
      </Show>
    </A>
  )
}

function QuickActionItemList(props) {
  const { openEditor } = useEditMediaEntries();

  const handleClick = status => async e => {
    e.preventDefault();

    const fetcher = createAnilistFetcher(queries.anilistMutateMedia, { mediaId: props.media.id, status }, AbortSignal.timeout(30_000));
    const res = await fetcherToFetch(fetcher);
    if (res.status === 200) {
      const json = await res.json();
      storeGlobalEditedMedia(json.data.SaveMediaListEntry.mediaId, json.data.SaveMediaListEntry);
    } else {
      addApplicationNotification({ type: "error", message: "Failed to update media status", duration: 30_000 });
    }
  };

  const hover = createHover();

  return (
    <Show when={token2()}>
      <div class="quick-action-wrapper" ref={hover.triggerRef}>

        <QuickActionButton label="Edit media" onClick={e => {
          e.preventDefault();
          openEditor(props.media);
        }}>
          <Edit scoped />
        </QuickActionButton>

        <Show when={hover.isOpen()}>

          <QuickActionButton active={props.status === "PLANNING"} onClick={handleClick("PLANNING")} label="Set to planning">
            <Planning scoped />
          </QuickActionButton>

          <QuickActionButton active={props.status === "CURRENT"} onClick={handleClick("CURRENT")} label={"Set to " + (props.media.type === "ANIME" ? "watching" : "reading")}>
            <Watching scoped />
          </QuickActionButton>

          <QuickActionButton active={props.status === "COMPLETED"} onClick={handleClick("COMPLETED")} label="Set to completed">
            <Complete scoped />
          </QuickActionButton>

          <QuickActionButton active={props.status === "REPEATING"} onClick={handleClick("REPEATING")} label={"Set to " + (props.media.type === "ANIME" ? "rewatching" : "rereading")}>
            <RepeatIcon scoped />
          </QuickActionButton>

        </Show>

      </div>
    </Show>
  );
}

function QuickActionButton(props) {

  const hover = createHover({ placements: ["left", "right", "bottom"], offset: 16 });

  return (
    <>
      <button class="action-button" classList={{ active: props.active }} onClick={props.onClick} ref={hover.triggerRef}>
        {props.children}
      </button>
      <Show when={hover.isOpen()}>
        <HoverPortal>
          <div class="action-tool-tip" ref={hover.floatingRef}>{props.label}</div>
        </HoverPortal>
      </Show>
    </>
  )
}

function StatusIcon(props) {
  return (
    <Show when={props.status}>
      <div class="list-status2">
        <Switch>
          <Match when={props.status === "COMPLETED"}>
            <Complete scoped />
          </Match>
          <Match when={props.status === "REPEATING"}>
            <RepeatIcon scoped />
          </Match>
          <Match when={props.status === "PLANNING"}>
            <Planning scoped />
          </Match>
          <Match when={props.status === "CURRENT"}>
            <Watching scoped />
          </Match>
          <Match when={props.status === "DROPPED"}>
            <TrashIcon scoped />
          </Match>
          <Match when={props.status === "PAUSED"}>
            <StopIcon scoped />
          </Match>
        </Switch>
      </div>
    </Show>
  )
}

function HoverCard(props) {
  return (
    <div class="hover-card" classList={{ loading: props.loading }} style={{ "--media-background-color": props.media?.coverImage?.color }} ref={props.ref}>
      <ImageLoader scoped class="banner" waitBeforeFade={300} fadeIn src={props.media?.bannerImage} />
      <p class="line-clamp header shadow">{props.media?.title.userPreferred}</p>
      <Show when={props.media?.nextAiringEpisode?.episode && props.media?.nextAiringEpisode?.airingAt}>
        <p class="episodes">
          <Show when={props.media?.format !== "MOVIE"} fallback="Movie ">
            Ep {props.media?.nextAiringEpisode.episode}{" "}
          </Show>
          <EpisodeTime2 airingAt={props.media?.nextAiringEpisode.airingAt} flavorText="airing in " day=" day" hour=" hour" fallback={
            <EpisodeTime2 airingAt={props.media?.nextAiringEpisode.airingAt} flavorText="airing in " minute=" minute" fallback="has aired" />
          } />
        </p>
      </Show>
      <div class="body">
        <Show when={props.media?.studios?.edges.length}>
          <div class="studios shadow">
            <For each={props.media?.studios?.edges}>{edge => (
              <p>{edge.node.name}</p>
            )}</For>
          </div>
        </Show>
        <Show when={props.media?.genres?.length}>
          <div class="genres">
            <For each={props.media?.genres}>{genre => (
              <p>{genre}</p>
            )}</For>
          </div>
        </Show>
      </div>
      <div class="type-and-season">
        <div class="flex-bullet-separator">
          <Show when={props.media?.format} fallback="Format TBA">
            <span>
              <Switch>
                <Match when={!props.media?.countryOfOrigin || props.media.countryOfOrigin === "JP"}>
                  {formatMediaFormat(props.media?.format)}
                </Match>
                <Match when={props.media?.countryOfOrigin !== "JP"}>
                  {formatMediaFormat(props.media?.format)} ({languageFromCountry(props.media?.countryOfOrigin)})
                </Match>
              </Switch>
            </span>
          </Show>
          <span>
            <Switch>
              <Match when={props.media?.type === "MANGA"}>
                <Switch>
                  <Match when={props.media?.format === "NOVEL" && props.media?.volumes}>
                    {props.media?.volumes} Volume{formatingUtils.plural(props.media?.volumes)}
                  </Match>
                  <Match when={props.media?.chapters}>
                    {props.media?.chapters} Chapter{formatingUtils.plural(props.media?.chapters)}
                  </Match>
                  <Match when={props.media?.status}>
                    {formatMediaStatus(props.media?.status)}
                  </Match>
                </Switch>
              </Match>
              <Match when={props.media?.type === "ANIME"}>
                <Switch>
                  <Match when={props.media?.format === "MOVIE" && props.media?.duration}>
                    <DurationToTime time={props.media?.duration * 60} minute=" minute" hour=" hour" />
                  </Match>
                  <Match when={props.media?.format !== "MOVIE" && props.media?.episodes}>
                    {props.media?.episodes} Episode{formatingUtils.plural(props.media?.episodes)}
                  </Match>
                </Switch>
              </Match>
            </Switch>
          </span>
        </div>
        <span class="season">
          <Switch>
            <Match when={props.media?.type === "MANGA"}>
              <Switch>
                <Match when={props.media?.startDate?.year}>
                  {props.media?.startDate.year}
                </Match>
                <Match when={props.media?.startDate?.year == null}>
                  TBA
                </Match>
              </Switch>
            </Match>
            <Match when={props.media?.type === "ANIME"}>
              <Switch>
                <Match when={props.media?.seasonYear && props.media?.season}>
                  {capitalize(props.media?.season)} {props.media?.seasonYear}
                </Match>
                <Match when={props.media?.startDate?.year}>
                  {props.media?.startDate.year}
                </Match>
                <Match when={props.media?.startDate?.year == null}>
                  TBA
                </Match>
              </Switch>
            </Match>
          </Switch>
        </span>
      </div>
    </div>
  );
}
