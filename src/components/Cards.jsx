import { A } from "@solidjs/router";
import { asserts } from "../collections/collections";
import { urlUtils } from "../utils/utils";
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

function AnilistMediaCardListBody(props) {
  asserts.assertTrue(props.media, "Missing media");

  return (
    <li class="cp-media-card">
      <A class="clean-link" href={urlUtils.anilistMediaUrl(props.media)}>
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

export function AnilistMediaCard(props) {
  asserts.assertTrue(props.media, "Missing media");

  const { openEditor } = useEditMediaEntries();
  const { accessToken } = useAuthentication();

  return (
    <AnilistMediaCardListBody {...props}>
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
    </AnilistMediaCardListBody>
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
