import { A } from "@solidjs/router";
import "./App.scoped.css"
import { useAuthentication } from "./context/providers.js";
import { InstallPWAInfoPanel } from "./components/InstallPWAInfoPanel.jsx";
import { createEffect } from "solid-js";
import { urlUtils } from "./utils/utils.js";
import { Show } from "solid-js";
import { localizations, modes, queries } from "./collections/collections";
import { createFetcher, sendFetcher } from "./utils/fetcherUtils";
import { authUserData, setAuthUserData, token2 } from "./context/AuthenticationContext";
import { assertTypeString } from "./collections/asserts";
import { getIndexedDBValue, setIndexedDBValue } from "./utils/indexedDButils";
import { getSessionStorageJson, setSessionStorageJson } from "./utils/sessionStorageUtils";

const portIsOpen = port => fetch("http://localhost:" + port, { signal: AbortSignal.timeout(100) }).then(() => true).catch(() => false);

function createAnilistFetcher(query, variables, signal) {
  assertTypeString(query);

  const t = token2();
  const headers = { "Content-Type": "application/json" };
  if (t) headers.Authorization = `Bearer ${t}`;

  return createFetcher("https://graphql.anilist.co", {
    method: "POST",
    headers,
    body: {
      query: query,
      variables
    },
    signal
  });
}

const cache = new Set();

function App(props) {
  const loginUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${urlUtils.anilistClientId()}&response_type=token`;

  const { accessToken, logoutUser } = useAuthentication();

  let controller = new AbortController();

  createEffect(() => {
    const t = accessToken();
    if (!t) return;

    const fetcher = createAnilistFetcher(queries.currentUser, {}, new AbortController().signal);

    sendFetcher(fetcher, {
      active: (res) => {
        return !(res && (modes.debug || cache.has(res.cacheKey)));
      },
      cache: {
        get: async res => {
          const session = getSessionStorageJson(res.cacheKey, null);
          if (session) return session;

          const data = await getIndexedDBValue("fetches", res.cacheKey);
          return data;
        },
        set: async res => {
          cache.add(res.cacheKey);
          setSessionStorageJson(res.cacheKey, res);
          await setIndexedDBValue("fetches", res);
        }
      },
      onError: async res => {
        if (!res) return;
        const { errors } = await res.json();
        for (const { message, status } of errors) {
          // Token has expired so lets log out the user
          if (status === 400 && message === "Invalid token") return logoutUser()
        }
      },
      setValue: (res) => {
        setAuthUserData({ data: res.data.data.Viewer });
      }
    });
  });

  createEffect(() => {
    controller.abort()
    controller = new AbortController();

    window.addEventListener("keydown", async e => {
      if (e.target !== document.body || e.shiftKey || e.ctrlKey) {
        return;
      }

      const { port, hostname, href, origin } = location;
      if (e.key === "d" && e.altKey) {
        e.preventDefault();

        if (hostname === "localhost") {
          // Open alternative debug port (used to sign in on alternative user or check behavior between big refactors)
          if (port != __DEBUG_PORT__ && await portIsOpen(__DEBUG_PORT__)) window.open(href.replace(origin, "http://localhost:" + __DEBUG_PORT__));
          else window.open(href.replace(origin, "https://kassu11.github.io"));
        } else window.open(href.replace(origin, "http://localhost:" + __PORT__));
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
      <Show when={localStorage.getItem(localizations.LOB_DEV_BRANCH)}>{branch => (
        <div class="dev-branch">
          <p>Preview: {branch}</p>
          <button onClick={() => {
            localStorage.removeItem(localizations.LOB_DEV_BRANCH);
            location.reload();
          }}>Back to Production</button>
        </div>
      )}</Show>
      <InstallPWAInfoPanel />
      <main id="page-content">
        {props.children}
      </main>
      <footer class="main-footer"></footer>
    </>
  )
}

export default App
