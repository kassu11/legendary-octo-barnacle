import { A } from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";
import { useUser } from "../../../context/providers.js";
import { useAuthentication } from "../../../context/providers.js";
import api from "../../../utils/api.js";
import { assert } from "../../../utils/assert.js";
import { Followers } from "./Followers.jsx";

export function Following(props) {
  assert(props.page, "Page is missing");
  const { user } = useUser();
  const { authUserData, accessToken } = useAuthentication();
  const [following] = api.anilist.userFollowing(() => user().id, props.page, accessToken);
  const [showNext, setShowNext] = createSignal(false);

  return (
    <Show when={following()}>
      <For each={following().data.following}>{follower => (
        <li>
          <A href={"/user/" + follower.name}>
            <img src={follower.avatar.large} alt="User profile" />
            <p>{follower.name}</p>
            <Show when={user().id === authUserData()?.data.id}>
              <button onClick={async e => {
                e.preventDefault();
                const response = await api.anilist.toggleFollow(accessToken(), follower.id);
              }}>Unfollow</button>
            </Show>
          </A>
        </li>
      )}</For>
      <Show when={following().data.pageInfo.hasNextPage}>
        <Show when={showNext()} fallback={<button onClick={() => setShowNext(true)}>Load more</button>}>
          <Followers page={props.page + 1} />
        </Show>
      </Show>
    </Show>
  );
}
