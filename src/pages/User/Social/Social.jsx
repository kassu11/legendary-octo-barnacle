import { createEffect, createSignal, on, Show, Switch, Match } from "solid-js";
import { useUser } from "../../../context/providers.js";
import { Following } from "./Following.jsx";
import { Followers } from "./Followers.jsx";
import "./Social.scss";

export function Socials() {
  const { user } = useUser();
  const [tab, setTab] = createSignal("following");
  createEffect(on(user, u => {
    document.title = `${u.name} socials - LOB`;
  }));

  return (
    <div class="user-profile-socials-page">
      <ul>
        <li>
          <button onClick={() => setTab("following")}>Following</button>
        </li>
        <li>
          <button onClick={() => setTab("followers")}>Followers</button>
        </li>
      </ul>
      <Switch>
        <Match when={tab() === "following"}>
          <ol class="user-profile-social-grid">
            <Show when={user().id} keyed>
              <Following page={1} />
            </Show>
          </ol>
        </Match>
        <Match when={tab() === "followers"}>
          <ol class="user-profile-social-grid">
            <Show when={user().id} keyed>
              <Followers page={1} />
            </Show>
          </ol>
        </Match>
      </Switch>
    </div>
  );
}
