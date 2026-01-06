import { A } from "@solidjs/router";
import "./App.scoped.css"
import { useAuthentication } from "./context/providers.js";
import { InstallPWAInfoPanel } from "./components/InstallPWAInfoPanel.jsx";
import { createEffect } from "solid-js";
import { urlUtils } from "./utils/utils.js";
import {Show} from "solid-js";

function App(props) {
  const loginUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${urlUtils.anilistClientId()}&response_type=token`;

  const { accessToken, authUserData, logoutUser } = useAuthentication();

  let controller = new AbortController();

  createEffect(() => {
    controller.abort()
    controller = new AbortController();
    const name = authUserData()?.data?.name;
    window.addEventListener("keydown", e => {
      if (e.target !== document.body || e.shiftKey || e.ctrlKey) {
        return;
      }

      if (e.key === "d" && e.altKey && name === "kassu11") {
        e.preventDefault();
        if (location.hostname != "localhost") {
          window.open(location.href.replace(location.origin, "http://localhost:" + __PORT__));
        } else if (location.port == __PORT__) {
          window.open(location.href.replace(__PORT__, __DEBUG_PORT__));
        } else {
          window.open(location.href.replace(location.origin, "https://kassu11.github.io"));
        }
      }
    }, { signal: controller.signal });
  });

  return (
    <>
      <nav class="main-navigation">
        <ul>
          <li><A href="/">Home</A></li>
          <li><A href="/browse/anime">Anime</A></li>
          <li><A href="/browse/manga">Manga</A></li>
          <li><A href="/browse/media">Search</A></li>
          <Show when={accessToken()} fallback={<li><a href={loginUrl}>Login with AniList</a></li>}>
            <li>
              <button onClick={() => logoutUser()}>Logout</button>
            </li>
            <Show when={authUserData()}>
              <li><A href="/notifications">Notifications ({authUserData().data.unreadNotificationCount})</A></li>
              <li class="profile">
                <A href={"/user/" + authUserData().data.name}>
                  {authUserData().data.name}
                  <img src={authUserData().data.avatar.large} alt="Profile avatar" />
                </A>
              </li>
            </Show>
          </Show>
        </ul>
      </nav>
      <InstallPWAInfoPanel />
      <main id="page-content">
        {props.children}
      </main>
      <footer class="main-footer"></footer>
    </>
  )
}

export default App
