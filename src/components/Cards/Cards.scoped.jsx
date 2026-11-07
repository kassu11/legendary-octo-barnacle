import { A } from "@solidjs/router";
import { queries } from "@/api/api.js";
import { asserts, urlUtils } from "@/utils/utils.js";
import Edit from "@/assets/Edit.jsx";
import Planning from "@/assets/Planning.jsx";
import Watching from "@/assets/Watching.jsx";
import Complete from "@/assets/Complete.jsx";
import { useEditMediaEntries } from "@/state/providers.js";
import Star from "@/assets/Star.jsx";
import { QuickActionListButton } from "@/components/Buttons.scoped.jsx";
import ThumbUp from "@/assets/ThumbUp.jsx";
import ThumbDown from "@/assets/ThumbDown.jsx";
import "./Cards.scoped.css";
import { Match, Show, Switch } from "solid-js";
import { createAnilistFetcher, fetcherToFetch } from "@/api/fetcherUtils.js";
import { addApplicationNotification } from "@/state/notifications";
import { mediaWithMalId, token2 } from "@/state/globalState.js";
import { RepeatIcon } from "@/assets/RepeatIcon.jsx";
import { createHover, HoverPortal } from "@/hooks/createHover";
import { MediaHoverCard } from "@/components/media/MediaCard.scoped.jsx";

function AnilistMediaCardListBody(props) {
  const hover = createHover({ placements: ["right-start", "left-start", "bottom"], offset: 25, alignOffset: 25 });

  return (
    <li class="cp-media-card inline-container" data-index={props["data-index"]} classList={{ skeleton: props.skeleton, loading: props.loading, "loading-end": !props.loading }} style={{ "--card-cover-url": `url("${props.media?.coverImage?.large}")`, "--media-background-color": props.media?.coverImage?.color }} ref={props.ref}>
      <Show when={!props.skeleton}>
        <A class="block-link" href={urlUtils.anilistMediaUrl(props.media)} ref={hover.triggerRef}>
          <div class="wrapper">
            <img class="absolute-inset" src={props.media.coverImage.extraLarge || props.media.coverImage.large} alt="Cover." />
            <Show when={props.media.averageScore}>
              <div class="score">
                <Star /> {(props.media.averageScore / 10)}
              </div>
            </Show>
            {props.children}
          </div>
          <p class="line-clamp">
            <Show when={props.media.mediaListEntry?.status}>
              <div class="list-status" attr:data-status={props.media.mediaListEntry.status}></div>
            </Show>
            {props.media.title.userPreferred}
          </p>
        </A>
        <Show when={hover.isOpen()}>
          <HoverPortal>
            <MediaHoverCard media={props.media} ref={hover.floatingRef} />
          </HoverPortal>
        </Show>
      </Show>
    </li>
  )
}

function JikanMediaCardListBody(props) {
  asserts.assertTruthy(props.media, "Missing media");

  return (
    <li class="cp-media-card inline-container">
      <A class="block-link" href={urlUtils.jikanMediaUrl(props.type, props.media)}>
        <div class="wrapper">
          <img class="absolute-inset" src={props.media.images.webp.large_image_url} alt="Cover." />
          <Show when={props.media.score}>
            <div class="score">
              <Star /> {(props.media.score)}
            </div>
          </Show>
          {props.children}
        </div>
        <p class="line-clamp">
          <Show when={props.media.titles} fallback={props.media.title}>
            <Switch>
              <Match when={props.media.titles.English}>{props.media.titles.English}</Match>
              <Match when={props.media.titles.Default}>{props.media.titles.Default}</Match>
            </Switch>
          </Show>
        </p>
      </A>
    </li>
  )
}

export function JikanMediaCard(props) {
  asserts.assertTruthy(props.media, "Missing media");
  asserts.assertTypeString(props.type);

  return (
    <JikanMediaCardListBody {...props}>
      <Show when={mediaWithMalId[props.media.mal_id]}>
        <QuickActionItemList media={mediaWithMalId[props.media.mal_id]} />
      </Show>
    </JikanMediaCardListBody>
  );
}

function QuickActionItemList(props) {
  const { openEditor } = useEditMediaEntries();

  asserts.assertTruthy(props.media, "Missing media");

  const handleClick = status => async e => {
    e.preventDefault();

    const fetcher = createAnilistFetcher(queries.anilistMutateMedia, { mediaId: props.media.id, status }, AbortSignal.timeout(30_000));
    const res = await fetcherToFetch(fetcher);
    if (res.status === 200) {
      // const json = await res.json();
      // console.log("JSON", json)
      // props.activity.likeCount = json.data.ToggleLike.likeCount;
    } else {
      addApplicationNotification({ type: "error", message: "Failed to update media status", duration: 30_000 });
    }
  };

  return (
    <Show when={token2()}>
      <ul class="cp-media-card-quick-action-items">
        <QuickActionListButton label="Edit media" onClick={e => {
          e.preventDefault();
          openEditor(props.media);
        }}>
          <Edit />
        </QuickActionListButton>
        <QuickActionListButton label="Set to planning" onClick={handleClick("PLANNING")}>
          <Planning />
        </QuickActionListButton>
        <QuickActionListButton label={"Set to " + (props.media.type === "ANIME" ? "watching" : "reading")} onClick={handleClick("CURRENT")}>
          <Watching />
        </QuickActionListButton>
        <QuickActionListButton label="Set to completed" onClick={handleClick("COMPLETED")}>
          <Complete />
        </QuickActionListButton>
        <QuickActionListButton label={"Set to " + (props.media.type === "ANIME" ? "rewatching" : "rereading")} onClick={handleClick("REPEATING")}>
          <RepeatIcon />
        </QuickActionListButton>
      </ul>
    </Show>
  );
}

export function AnilistMediaRecommendationCard(props) {
  asserts.assertTruthy(props.node, "Missing node");
  asserts.assertTypeFunction(props.handleRateUp, "handleRateUp is not type of function");
  asserts.assertTypeFunction(props.handleRateDown, "handleRateDown is not type of function");
  asserts.assertTypeString(props.userRating, "userRating is not type of string");
  asserts.assertTypeInteger(props.rating, "rating is not type of integer");

  return (
    <AnilistMediaCardListBody media={props.node.mediaRecommendation}>
      <div class="absolute-inset recommendation-rating-wrapper">
        <div class="flex-space-between">
          <div>
            <button classList={{active: props.userRating === "RATE_UP"}} style={{"--color": "lime"}} onClick={props.handleRateUp}>
              <ThumbUp />
            </button>
            <button classList={{active: props.userRating === "RATE_DOWN"}} style={{"--color": "crimson"}} onClick={props.handleRateDown}>
              <ThumbDown />
            </button>
          </div>
          <span>
            <Show when={props.rating > 0}>+</Show>
            {props.rating}
          </span>
        </div>
      </div>
    </AnilistMediaCardListBody>
  );
}

export function MalCharacterCard(props) {
  asserts.assertTruthy(props.character, "character");
  asserts.assertTypeString(props.role, "role is not type of string");

  return (
    <li class="cp-character-card">
      <CharacterSection
        href={urlUtils.jikanCharacterUrl(props.character)}
        src={props.character.images.webp.image_url}
        name={props.character.name}
        extra={props.role}
        alt="Character."
      />
      <Show when={props.voiceActor}>
        <CharacterSection
          href={props.voiceActor.person.url}
          src={props.voiceActor.person.images.jpg.image_url}
          name={props.voiceActor.person.name}
          extra={props.voiceActor.language}
          alt="Voice actor."
          class="dir-rtl"
        />
      </Show>
    </li>
  );
}

export function MalStaffCard(props) {
  asserts.assertTruthy(props.staff, "staff");
  asserts.assertTruthy(props.positions, "positions");

  return (
    <li class="cp-character-card">
      <CharacterSection
        href={props.staff.url}
        src={props.staff.images.jpg.image_url}
        name={props.staff.name}
        extra={props.positions.join(", ")}
        alt="Staff."
      />
    </li>
  );
}

function CharacterSection(props) {
  asserts.assertTypeString(props.alt);

  return (
    <A className="clean-link flex" class={props.class} href={props.href}>
      <img src={props.src} alt={props.alt} />
      <div class="grid">
        <span>{props.name}</span>
        <span>{props.extra}</span>
      </div>
    </A>
  )
}
