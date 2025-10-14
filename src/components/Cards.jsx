import { A } from "@solidjs/router";
import { asserts, globalState } from "../collections/collections";
import { stringUtils, urlUtils } from "../utils/utils";
import Edit from "../assets/Edit";
import Planning from "../assets/Planning";
import Watching from "../assets/Watching";
import Complete from "../assets/Complete";
import Rewatched from "../assets/Rewatched";
import { useAuthentication, useEditMediaEntries } from "../context/providers";
import Star from "../assets/Star";
import api from "../utils/api";
import { QuickActionListButton } from "./Buttons";
import ThumbUp from "../assets/ThumbUp";
import ThumbDown from "../assets/ThumbDown";

export function MediaCardContainer(props) {
  return (
    <section class="cp-media-card-container" {...props} />
  );
}

function AnilistMediaCardListBody(props) {
  asserts.assertTrue(props.media, "Missing media");

  return (
    <li class="cp-media-card inline-container">
      <A class="block-link" href={urlUtils.anilistMediaUrl(props.media)}>
        <div class="wrapper">
          <img class="absolute-inset" src={props.media.coverImage.large} alt="Cover." />
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
    </li>
  )
}

function JikanMediaCardListBody(props) {
  asserts.assertTrue(props.media, "Missing media");

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

export function AnilistMediaCard(props) {
  asserts.assertTrue(props.media, "Missing media");

  return (
    <AnilistMediaCardListBody {...props}>
      <QuickActionItemList {...props} />
    </AnilistMediaCardListBody>
  );
}

export function JikanMediaCard(props) {
  asserts.assertTrue(props.media, "Missing media");
  asserts.isTypeString(props.type);

  return (
    <JikanMediaCardListBody {...props}>
      <Show when={globalState.mediaWithMalId[props.media.mal_id]}>
        <QuickActionItemList media={globalState.mediaWithMalId[props.media.mal_id]} />
      </Show>
    </JikanMediaCardListBody>
  );
}

function QuickActionItemList(props) {
  const { openEditor } = useEditMediaEntries();
  const { accessToken } = useAuthentication();

  asserts.assertTrue(props.media, "Missing media");

  return (
    <Show when={accessToken()}>
      <ul class="cp-media-card-quick-action-items">
        <QuickActionListButton label="Edit media" onClick={e => {
          e.preventDefault();
          openEditor(props.media);
        }}>
          <Edit />
        </QuickActionListButton>
        <QuickActionListButton label="Set to planning" onClick={e => {
          e.preventDefault();
          api.anilist.mutateMedia(accessToken(), { mediaId: props.media.id, status: "PLANNING" });
        }}>
          <Planning />
        </QuickActionListButton>
        <QuickActionListButton label={"Set to " + (props.media.type === "ANIME" ? "watching" : "reading")} onClick={e => {
          e.preventDefault();
          api.anilist.mutateMedia(accessToken(), { mediaId: props.media.id, status: "CURRENT" });
        }}>
          <Watching />
        </QuickActionListButton>
        <QuickActionListButton label="Set to completed" onClick={e => {
          e.preventDefault();
          api.anilist.mutateMedia(accessToken(), { mediaId: props.media.id, status: "COMPLETED" });
        }}>
          <Complete />
        </QuickActionListButton>
        <QuickActionListButton label={"Set to " + (props.media.type === "ANIME" ? "rewatching" : "rereading")} onClick={e => {
          e.preventDefault();
          api.anilist.mutateMedia(accessToken(), { mediaId: props.media.id, status: "REPEAT" });
        }}>
          <Rewatched />
        </QuickActionListButton>
      </ul>
    </Show>
  );
}

export function AnilistMediaRecommendationCard(props) {
  asserts.assertTrue(props.node, "Missing node");
  asserts.isTypeFunction(props.handleRateUp, "handleRateUp");
  asserts.isTypeFunction(props.handleRateDown, "handleRateDown");
  asserts.isTypeString(props.userRating, "userRating");
  asserts.isTypeInteger(props.rating, "rating");

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
  asserts.assertTrue(props.character, "character");
  asserts.isTypeString(props.role, "role");

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
  asserts.assertTrue(props.staff, "staff");
  asserts.assertTrue(props.positions, "positions");

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
  asserts.isTypeString(props.alt);

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
