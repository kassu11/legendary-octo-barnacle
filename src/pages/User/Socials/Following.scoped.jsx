import { A } from "@solidjs/router";
import { createEffect, createSignal, For, Show, untrack } from "solid-js";
import { useUser } from "@/state/providers.js";
import { queries } from "@/api/api.js";
import { asserts } from "@/utils/utils.js";
import { createAnilistFetcher, fetcherToFetch, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { authUserData } from "@/state/globalState.js";
import "./Following.scoped.css";
import { createTimer } from "@/hooks/createTimer.js";
import { formatMSToString } from "@/utils/timeUtils.js";
import { createCleanUpAbortController } from "@/utils/abortUtils.js";
import { setFetcherValueToStorage } from "@/utils/storageUtils.js";
import { addApplicationNotification } from "@/state/notifications.js";

export function Following(props) {
  asserts.assertTruthy(props.page, "Page is missing");

  const [followingTime, startFollowingTimer, stopFollowingTimer] = createTimer();
  const [followingData, setFollowingData] = createSignal(undefined, { equals: false });
  const [loading, setLoading] = createSignal(false);
  const followingController = createCleanUpAbortController();
  let followingFetcher;
  createEffect(() => {
    const signal = followingController.abortAndRenew();

    followingFetcher = createAnilistFetcher(queries.anilistGetUserFollowing, { id: user().id, page: props.page }, signal);

    sendAnilistFetcher(followingFetcher, {
      name: "Anilist socials following",
      onFetch: () => followingController.disable(),
      onStart: time => {
        startFollowingTimer(time);
        setLoading(true);
      },
      onStop: time => {
        stopFollowingTimer(time);
        setLoading(false);
      },
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === followingFetcher.cacheKey) setFollowingData(res);
      }
    });
  });

  const { user } = useUser();
  const [showNext, setShowNext] = createSignal(false);

  const removeFromFollowing = id => {
    const res = untrack(followingData);
    const page = res.data.data.Page;
    page.following = page.following.filter(follower => follower.id !== id);
    setFollowingData(res);
    setFetcherValueToStorage(res);
  }

  return (
    <>
      <div class="page" classList={{ loading: loading() }}>
        <Show when={loading()}>
          <p>{formatMSToString(followingTime())}</p>
        </Show>
        <Show when={followingData()}>
          <For each={followingData().data.data.Page.following}>{follower => (
            <li>
              <A scoped href={"/user/" + follower.name}>
                <img src={follower.avatar.large} alt="User profile" />
                <p>{follower.name}</p>
                <Show when={user().id === authUserData()?.data.id}>
                  <UnfollowButton id={follower.id} onUnfollow={() => removeFromFollowing(follower.id)} />
                </Show>
              </A>
            </li>
          )}</For>
        </Show>
      </div>
      <Show when={followingData()?.data.data.Page.pageInfo.hasNextPage}>
        <Show when={showNext()} fallback={<button onClick={() => setShowNext(true)}>Load more</button>}>
          <Following page={props.page + 1} />
        </Show>
      </Show>
    </>
  );
}

function UnfollowButton(props) {
  const [loading, setLoading] = createSignal(false);

  return (
    <button disabled={loading()} onClick={async e => {
      e.preventDefault();
      setLoading(true);

      const fetcher = createAnilistFetcher(queries.anilistToggleFollow, { id: props.id }, AbortSignal.timeout(30_000));
      const res = await fetcherToFetch(fetcher);
      if (res?.status === 200) {
        const json = await res.json();
        // The mutation is a toggle, so only the response knows the new state
        if (!json.data.ToggleFollow.isFollowing) props.onUnfollow();
      } else {
        addApplicationNotification({ type: "error", message: "Unfollowing has failed", duration: 30_000 });
      }

      setLoading(false);
    }}>Unfollow</button>
  );
}
