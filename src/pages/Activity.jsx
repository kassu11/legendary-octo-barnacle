import { A, useParams } from "@solidjs/router";
import api from "../utils/api.js";
import { createSignal, For, Match, onCleanup, Show, } from "solid-js";
import "./Activity.scss";
import { useAuthentication } from "../context/AuthenticationContext.jsx";
import { ActivityCard } from "../components/Activity.jsx";
import { Markdown } from "../components/Markdown.jsx";
import { plural } from "../utils/formating.js";

export default function Activity() {
  const { accessToken } = useAuthentication();
  const params = useParams();
  const [activity] = api.anilist.activityById(() => params.id, accessToken);
  const [replies] = api.anilist.activityRepliesById(() => params.id, 1, accessToken);

  return (
    <div class="activity-page">
      <Show when={activity()?.data}>
        <ActivityCard activity={activity().data} mutateCache={(e) => console.log("mutate", e)} />
      </Show>
      <Show when={replies()?.data}>
        <For each={replies().data.activityReplies}>{reply => (
          <div class="activity-message-card">
            <div class="header">
              <A href={"/user/" + reply.user.name} class="message-card-profile-header">
                <img class="profile" src={reply.user.avatar.large} alt="Profile" />
                {reply.user.name}
              </A>
              <CreatedAt createdAt={reply.createdAt} />
            </div>
            <div class="content">
              <Markdown children={reply.text} />
            </div>
          </div>
        )}</For>
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
