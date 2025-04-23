import { A, useParams } from "@solidjs/router";
import api from "../utils/api.js";
import { For, Show, createEffect, createSignal } from "solid-js";
import "./User.scss";
import { Markdown } from "../components/Markdown.jsx";
import { useAuthentication } from "../context/AuthenticationContext.jsx";
import Banner from "../components/media/Banner.jsx";
import ExternalLinks from "../components/media/ExternalLinks.jsx";
import ExtraInfo from "../components/media/ExtraInfo.jsx";
import Rankings from "../components/media/Rankings.jsx";
import Genres from "../components/media/Genres.jsx";
import Tags from "../components/media/Tags.jsx";
import Header from "../components/media/Header.jsx";
import Characters from "../components/media/Characters.jsx";
import Friends from "../components/media/Friends.jsx";
import AnimeThemes from "../components/media/AnimeThemes.jsx";
import { assert } from "../utils/assert.js";
import { useEditMediaEntries } from "../context/EditMediaEntriesContext.jsx";
import { formatTimeToDate, formatTitleToUrl } from "../utils/formating.js";
import { FavouriteToggle } from "../components/FavouriteToggle.jsx";

export default function User() {
  const params = useParams();
  const [userData] = api.anilist.userByName(() => params.name);

  return (
    <Show when={userData()}>
      <Content user={userData().data.data.User} />
    </Show>
  )
}

function Content(props) {
  return (
    <div class="user-page">
      {console.log(props.user)}
      <div class="profile-banner-container">
        <Show when={props.user.bannerImage} fallback={<div class="banner"></div>}>
          <img src={props.user.bannerImage} class="banner" alt="Banner" />
        </Show>
        <div class="user-profile-container">
          <img src={props.user.avatar.large} class="profile" alt="Profile" />
          <div class="content">
            <h2>{props.user.name}</h2>
            <p>Joined {formatTimeToDate(props.user.createdAt * 1000)} ({Math.floor((new Date() - (props.user.createdAt * 1000)) / 1000 / 60 / 60 / 24)} days)</p>
          </div>
        </div>
      </div>
      <nav class="profile-navigation">
        <ul>
          <li><A href="">Overview</A></li>
          <li><A href="anime">Anime list</A></li>
          <li><A href="manga">Manga list</A></li>
          <li><A href="favourites">Favourites</A></li>
          <li><A href="stats">Stats</A></li>
          <li><A href="socials">Socials</A></li>
        </ul>
      </nav>
      <div class="body">
        <div class="user-info-container">
          <Switch>
            <Match when={props.user.donatorTier === 1}>
              <p>{props.user.donatorBadge}</p>
            </Match>
            <Match when={props.user.donatorTier === 2}>
              <p>{props.user.donatorBadge} (fancy)</p>
            </Match>
            <Match when={props.user.donatorTier === 3}>
              <p>{props.user.donatorBadge} (extra fancy)</p>
            </Match>
          </Switch>
          <ActivityHistory history={props.user.stats?.activityHistory || []} />
        </div>
        <div class="user-activity-container">
          content
        </div>
      </div>
    </div>
  );
}

function ActivityHistory(props) {
  const amount = Math.round(365 / 2 + 3);
  const _now = new Date();
  let start = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate());
  const end = start.getTime() / 1000;
  start.setDate(start.getDate() - amount);
  start /= 1000;

  return (
    <Show when={props.history.at(-1).date > start}>
      activity
      <div class="activity-history-container">
        <For each={props.history}>{(activity, i) => (
          <Show when={activity.date > start}>
            <For each={Array(Math.max(0, Math.round((activity.date - (props.history[i() - 1]?.date || start)) / 3600 / 24) - 1)).fill(0)}>{_ => (
              <div>_</div>
            )}</For>
            <div>X</div>
          </Show>
        )}</For>
        <For each={Array(Math.max(0, Math.round((end - (props.history.at(-1)?.date || start)) / 3600 / 24) - 1)).fill(0)}>{_ => (
          <div>_</div>
        )}</For>
      </div>
    </Show>
  );
}
