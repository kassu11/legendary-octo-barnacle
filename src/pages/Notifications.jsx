import { A } from "@solidjs/router";
import api from "../utils/api.js";
import { createSignal, For, Match, Show } from "solid-js";
import "./Notifications.scss";
import { formatTitleToUrl, mediaUrl } from "../utils/formating.js";
import { useAuthentication } from "../context/providers.js";
import { CreatedAt } from "./CreatedAt.jsx";

export default function Notifications() {
  const { accessToken } = useAuthentication();
  const [type, setType] = createSignal("all");
  const [notifications] = api.anilist.notifications(accessToken, type, 1);

  document.title = "Notifications - LOB";

  return (
    <div class="notification-page">
      <ol class="flex-space-between">
        <li><button onClick={() => setType("all")}>All</button></li>
        <li><button onClick={() => setType("airing")}>Airing</button></li>
        <li><button onClick={() => setType("activity")}>Activity</button></li>
        <li><button onClick={() => setType("forum")}>Forum</button></li>
        <li><button onClick={() => setType("follows")}>Follows</button></li>
        <li><button onClick={() => setType("media")}>Media</button></li>
      </ol>
      <Show when={notifications()?.data.notifications.length}>
        <ol class="notifications-container">
          <For each={notifications().data.notifications}>{notification => (
            <li>
              <Switch fallback={"Notification type \"" + notification.type + "\" not supported."}>
                <Match when={notification.type === "RELATED_MEDIA_ADDITION"}>
                  <A href={mediaUrl(notification.media)}>
                    <img src={notification.media.coverImage.large} alt="Media cover" />
                  </A>
                  <div class="content">
                    <p>
                      <A href={mediaUrl(notification.media)}>
                        {notification.media.title.userPreferred}
                      </A>
                      {notification.context}
                    </p>
                    <CreatedAt createdAt={notification.createdAt} />
                  </div>
                </Match>
                <Match when={notification.type === "AIRING"}>
                  <A href={mediaUrl(notification.media)}>
                    <img src={notification.media.coverImage.large} alt="Media cover" />
                  </A>
                  <div class="content">
                    <p>
                      {notification.contexts[0]}
                      {notification.episode}
                      {notification.contexts[1]}
                      <A href={mediaUrl(notification.media)}>
                        {notification.media.title.userPreferred}
                      </A>
                      {notification.contexts[2]}
                    </p>
                    <CreatedAt createdAt={notification.createdAt} />
                  </div>
                </Match>
                <Match when={notification.type === "ACTIVITY_REPLY_LIKE" || notification.type === "ACTIVITY_LIKE" || notification.type === "ACTIVITY_REPLY"}>
                  <A href={"/user/" + notification.user.name}>
                    <img src={notification.user.avatar.large} alt="Media cover" />
                  </A>
                  <div class="content">
                    <A href={"/activity/" + notification.activityId}>
                      {notification.user.name}
                      {notification.context}
                    </A>
                    <CreatedAt createdAt={notification.createdAt} />
                  </div>
                </Match>
                <Match when={notification.type === "FOLLOWING"}>
                  <A href={"/user/" + notification.user.name}>
                    <img src={notification.user.avatar.large} alt="Media cover" />
                  </A>
                  <div class="content">
                    <p>
                      <A href={"/user/" + notification.user.name}>
                        {notification.user.name}
                      </A>
                      {notification.context}
                    </p>
                    <CreatedAt createdAt={notification.createdAt} />
                  </div>
                </Match>
              </Switch>
            </li>
          )}</For>
        </ol>
      </Show>
    </div>
  )
}
