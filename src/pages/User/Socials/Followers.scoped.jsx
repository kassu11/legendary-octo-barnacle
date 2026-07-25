import { A } from "@solidjs/router";
import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { useUser } from "../../../context/providers.js";
import { queries } from "../../../collections/collections.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../../utils/fetcherUtils.js";
import { createTimer, formatMSToString } from "../../../utils/timeUtils.js";
import "./Followers.scoped.css";
import { createCleanUpAbortController } from "../../../utils/abortUtils.js";

export function Followers(props) {
  const { user } = useUser();
  const userId = createMemo(() => user()?.id);

  const [showNext, setShowNext] = createSignal(false);

  const [followersTime, startFollowersTimer, stopFollowersTimer] = createTimer();
  const [loading, setLoading] = createSignal(false);
  const [followersData, setFollowersData] = createSignal(undefined, { equals: false });
  const followersController = createCleanUpAbortController();
  let followersFetcher;
  createEffect(() => {
    const id = userId();
    if (!id) return;
    const signal = followersController.abortAndRenew();

    followersFetcher = createAnilistFetcher(queries.anilistGetUserFollowers, { id, page: props.page }, signal);

    sendAnilistFetcher(followersFetcher, {
      name: "Anilist followers",
      onFetch: () => followersController.disable(),
      onStart: time => {
        startFollowersTimer(time);
        setLoading(true);
      },
      onStop: time => {
        stopFollowersTimer(time);
        setLoading(false);
      },
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === followersFetcher.cacheKey) setFollowersData(res.data.data.Page);
      }
    });
  });

  return (
    <>
      <div class="page" classList={{ loading: loading() }}>
        <Show when={loading()}>
          <p class="time">{formatMSToString(followersTime())}</p>
        </Show>
        <Show when={followersData()}>
          <For each={followersData().followers}>{follower => (
            <li>
              <A href={"/user/" + follower.name}>
                <img src={follower.avatar.large} alt="User profile" />
                <p>{follower.name}</p>
              </A>
            </li>
          )}</For>
        </Show>
      </div>
      <Show when={followersData()?.pageInfo.hasNextPage}>
        <Show when={showNext()} fallback={<button onClick={() => setShowNext(true)}>Load more</button>}>
          <Followers page={props.page + 1} />
        </Show>
      </Show>
    </>
  );
}
