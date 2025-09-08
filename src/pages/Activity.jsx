import { A, useParams } from "@solidjs/router";
import api from "../utils/api.js";
import { createSignal, For, Match, onCleanup, Show, } from "solid-js";
import "./Activity.scss";
import { ActivityCard } from "../components/Activity.jsx";
import { OldMarkdownComponent } from "../components/Markdown.jsx";
import { plural } from "../utils/formating.js";
import { useAuthentication } from "../context/providers.js";
import { CreatedAt } from "./CreatedAt.jsx";

export default function Activity() {
  const { accessToken } = useAuthentication();
  const params = useParams();
  const [activity] = api.anilist.activityById(() => params.id, accessToken);
  const [replies] = api.anilist.activityRepliesById(() => params.id, 1, accessToken);

  document.title = "Activity - LOB";

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
              <OldMarkdownComponent children={reply.text} />
            </div>
          </div>
        )}</For>
      </Show>
    </div>
  )
}
