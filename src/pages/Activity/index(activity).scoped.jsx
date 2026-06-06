import { A, useParams } from "@solidjs/router";
import {  createEffect, createSignal, For, Show, } from "solid-js";
import "./index(activity).scoped.css";
import { ActivityCard } from "../../components/Activity.jsx";
import { OldMarkdownComponent } from "../../components/Markdown.jsx";
import { CreatedAt } from "../../components/CreatedAt.jsx";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils.js";
import { queries } from "../../collections/collections.js";
import { createTimer, formatMSToString } from "../../utils/timeUtils.js";

export function ActivityPage() {
  const params = useParams();

  const [activityTime, startActivityTimer, stopActivityTimer] = createTimer();
  const [activityData, setActivityData] = createSignal(undefined, { equals: false });
  let activityFetcher, activityController;
  createEffect(() => {
    activityController?.abort();
    activityController = new AbortController();

    activityFetcher = createAnilistFetcher(queries.anilistActivityById, { id: params.id }, activityController.signal);

    sendAnilistFetcher(activityFetcher, {
      name: "Anilist activity",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === activityFetcher.cacheKey) activityController = null;
      },
      onStart: startActivityTimer,
      onStop: stopActivityTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === activityFetcher.cacheKey) setActivityData(res.data.data.Activity);
      }
    });
  });

  const [repliesTime, startRepliesTimer, stopRepliesTimer] = createTimer();
  const [repliesData, setRepliesData] = createSignal(undefined, { equals: false });
  let repliesFetcher, repliesController;
  createEffect(() => {
    repliesController?.abort();
    repliesController = new AbortController();

    repliesFetcher = createAnilistFetcher(queries.anilistActivityRepliedById, { id: params.id, page: 1}, repliesController.signal);

    sendAnilistFetcher(repliesFetcher, {
      name: "Anilist replies",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === repliesFetcher.cacheKey) repliesController = null;
      },
      onStart: startRepliesTimer,
      onStop: stopRepliesTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === repliesFetcher.cacheKey) setRepliesData(res.data.data.Page);
      }
    });
  });

  document.title = "Activity - LOB";

  return (
    <div class="activity-page">
      {formatMSToString(activityTime())}
      <Show when={activityData()}>
        <ActivityCard activity={activityData()} mutateCache={(e) => console.log("mutate", e)} />
      </Show>
      {formatMSToString(repliesTime())}
      <Show when={repliesData()}>
        <For each={repliesData().activityReplies}>{reply => (
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
