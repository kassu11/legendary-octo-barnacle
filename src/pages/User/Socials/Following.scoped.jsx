import { A } from "@solidjs/router";
import { createEffect, createSignal, For, Show } from "solid-js";
import { useUser } from "../../../context/providers.js";
import { asserts, queries } from "../../../collections/collections.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../../utils/fetcherUtils.js";
import { authUserData } from "../../../core/globalState.js";
import "./Following.scoped.css";
import { createTimer, formatMSToString } from "../../../utils/timeUtils.js";

export function Following(props) {
  asserts.assertTrueOLD(props.page, "Page is missing");

  const [followingTime, startFollowingTimer, stopFollowingTimer] = createTimer();
  const [followingData, setFollowingData] = createSignal(undefined, { equals: false });
  const [loading, setLoading] = createSignal(false);
  let followingFetcher, followingController;
  createEffect(() => {
    followingController?.abort();
    followingController = new AbortController();

    followingFetcher = createAnilistFetcher(queries.anilistGetUserFollowing, { id: user().id, page: props.page }, followingController.signal);

    sendAnilistFetcher(followingFetcher, {
      name: "Anilist socials following",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === followingFetcher.cacheKey) followingController = null;
      },
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

  return (
    <>
      <div class="page" classList={{ loading: loading() }}>
        <Show when={loading()}>
          <p>{formatMSToString(followingTime())}</p>
        </Show>
        <Show when={followingData()}>
          <For each={followingData().data.data.Page.following}>{follower => (
            <li>
              <A href={"/user/" + follower.name}>
                <img src={follower.avatar.large} alt="User profile" />
                <p>{follower.name}</p>
                <Show when={user().id === authUserData()?.data.id}>
                  <button onClick={async e => {
                    e.preventDefault();
                    // const response = await apiOLD.anilist.toggleFollow(accessToken(), follower.id);
                  }}>Unfollow</button>
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
