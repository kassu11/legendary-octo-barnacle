import { A } from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";
import { useUser } from "../../../context/providers.js";
import { useAuthentication } from "../../../context/providers.js";
import api from "../../../utils/api.js";
import { asserts } from "../../../collections/collections.js";

export function Followers(props) {
  asserts.assertTrue(props.page, "Page is missing");
  const { user } = useUser();
  const { accessToken } = useAuthentication();
  const [followers] = api.anilist.userFollowers(() => user().id, props.page, accessToken);
  const [showNext, setShowNext] = createSignal(false);

  return (
    <Show when={followers()}>
      <For each={followers().data.followers}>{follower => (
        <li>
          <A href={"/user/" + follower.name}>
            <img src={follower.avatar.large} alt="User profile" />
            <p>{follower.name}</p>
          </A>
        </li>
      )}</For>
      <Show when={followers().data.pageInfo.hasNextPage}>
        <Show when={showNext()} fallback={<button onClick={() => setShowNext(true)}>Load more</button>}>
          <Followers page={props.page + 1} />
        </Show>
      </Show>
    </Show>
  );
}
