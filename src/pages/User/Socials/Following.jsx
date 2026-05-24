import { A } from "@solidjs/router";
import { createEffect, createSignal, For, Show } from "solid-js";
import { useUser } from "../../../context/providers.js";
import { Followers } from "./Followers.jsx";
import { asserts, queries } from "../../../collections/collections.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../../utils/fetcherUtils.js";
import { authUserData } from "../../../core/globalState.js";

export function Following(props) {
  asserts.assertTrueOLD(props.page, "Page is missing");

  const [followingData, setFollowingData] = createSignal(undefined, { equals: false });
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
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === followingFetcher.cacheKey) setFollowingData(res);
      }
    });
  });

  const { user } = useUser();
  const [showNext, setShowNext] = createSignal(false);

  return (
    <>
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
        <Show when={followingData().data.data.Page.pageInfo.hasNextPage}>
          <Show when={showNext()} fallback={<button onClick={() => setShowNext(true)}>Load more</button>}>
            <Followers page={props.page + 1} />
          </Show>
        </Show>
      </Show>
    </>
  );
}
