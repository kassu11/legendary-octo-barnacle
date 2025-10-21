import {Show} from "solid-js";
import "./index.scss";
import {useAuthentication} from "../../context/providers.js";
import {CurrentWatchingMedia} from "./CurrentWatchingMedia.jsx";
import {Activity} from "./Activity.jsx";

export function Home() {
  const { accessToken, authUserData } = useAuthentication();

  document.title = "Home - LOB";

  return (
    <Show when={authUserData()}>
      <div class="pg-home">
        <CurrentWatchingMedia token={accessToken()} userId={authUserData().data.id} />
        <Activity token={accessToken()}/>
      </div>
    </Show>
  )
}


