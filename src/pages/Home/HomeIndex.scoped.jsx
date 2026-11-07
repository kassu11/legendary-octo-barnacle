import { Show } from "solid-js";
import "./HomeIndex.scoped.css";
import { useAuthentication } from "@/state/providers.js";
import { CurrentWatchingMediaScoped } from "./CurrentWatchingMedia.scoped.jsx";
import { Activity } from "./Activity.jsx";

export function Home() {
  const { accessToken, authUserData } = useAuthentication();

  document.title = "Home - LOB";

  return (
    <Show when={authUserData()}>
      <div class="pg-home">
        <CurrentWatchingMediaScoped token={accessToken()} userId={authUserData().data.id} />
        <Activity token={accessToken()} />
      </div>
    </Show>
  )
}


