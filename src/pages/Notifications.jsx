import { A } from "@solidjs/router";
import api from "../utils/api.js";
import { createSignal, For, Match, onCleanup, Show } from "solid-js";
import "./Notifications.scss";
import { formatTitleToUrl, plural } from "../utils/formating.js";
import { useAuthentication } from "../context/providers.js";

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
                  <A href={"/" + notification.media.type.toLowerCase() + "/" + notification.media.id + "/" + formatTitleToUrl(notification.media.title.userPreferred)}>
                    <img src={notification.media.coverImage.large} alt="Media cover" />
                  </A>
                  <div class="content">
                    <p>
                      <A href={"/" + notification.media.type.toLowerCase() + "/" + notification.media.id + "/" + formatTitleToUrl(notification.media.title.userPreferred)}>
                        {notification.media.title.userPreferred}
                      </A>
                      {notification.context}
                    </p>
                    <CreatedAt createdAt={notification.createdAt} />
                  </div>
                </Match>
                <Match when={notification.type === "AIRING"}>
                  <A href={"/" + notification.media.type.toLowerCase() + "/" + notification.media.id + "/" + formatTitleToUrl(notification.media.title.userPreferred)}>
                    <img src={notification.media.coverImage.large} alt="Media cover" />
                  </A>
                  <div class="content">
                    <p>
                      {notification.contexts[0]}
                      {notification.episode}
                      {notification.contexts[1]}
                      <A href={"/" + notification.media.type.toLowerCase() + "/" + notification.media.id + "/" + formatTitleToUrl(notification.media.title.userPreferred)}>
                        {notification.media.title.userPreferred}
                      </A>
                      {notification.contexts[2]}
                    </p>
                    <CreatedAt createdAt={notification.createdAt} />
                  </div>
                </Match>
                <Match when={notification.type === "ACTIVITY_LIKE" || notification.type === "ACTIVITY_REPLY"}>
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

function CreatedAt(props) {
  const [time, setTime] = createSignal(Math.max(1, Math.abs(new Date() / 1000 - props.createdAt)));

  let interval = null;
  if (time() < 60) {
    interval = setInterval(() => setTime(Math.max(1, Math.abs(new Date() / 1000 - props.createdAt))), 1000);
  } else if (time() < 3600) {
    interval = setInterval(() => setTime(Math.max(1, Math.abs(new Date() / 1000 - props.createdAt))), 1000 * 60);
  }

  onCleanup(() => clearInterval(interval));
  return (
    <time
      class="notifications-created-at"
      dateTime={(new Date(props.createdAt * 1000)).toISOString()}
      title={(new Date(props.createdAt * 1000)).toLocaleString()}>
      <Switch>
        <Match when={Math.floor(time() / 3600 / 24 / 365.25)} children={years => (<>{years} years{plural(years())} ago </>)} />
        <Match when={Math.floor(time() / 3600 / 24 / 30)} children={months => (<>{months} month{plural(months())} ago </>)} />
        <Match when={Math.floor(time() / 3600 / 24 / 7)} children={weeks => (<>{weeks} week{plural(weeks())} ago </>)} />
        <Match when={Math.floor(time() / 3600 / 24)} children={days => (<>{days} day{plural(days())} ago </>)} />
        <Match when={Math.floor((time() / 3600) % 24)} children={hours => (<>{hours} hour{plural(hours())} ago</>)} />
        <Match when={Math.floor((time() % 3600) / 60)} children={minutes => (<>{minutes} minute{plural(minutes())} ago </>)} />
        <Match when={Math.floor((time() % 3600) % 60)} children={seconds => (<>{seconds} second{plural(seconds())} ago </>)} />
      </Switch>
    </time>
  )
}
