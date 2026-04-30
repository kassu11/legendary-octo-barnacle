import { A } from "@solidjs/router";
import { createEffect, Match, Show, Switch } from "solid-js";
import "./MainNavigation.scoped.css";
import { modes, queries } from "../../collections/collections";
import { getSessionStorageJson, setSessionStorageJson } from "../../utils/sessionStorageUtils";
import { getIndexedDBValue, setIndexedDBValue } from "../../utils/indexedDButils";
import { authUserData, setAuthUserData, token2 } from "../../context/AuthenticationContext";
import { assertTypeString } from "../../collections/asserts";
import { createFetcher, sendFetcher } from "../../utils/fetcherUtils";
import { anilistClientId } from "../../utils/urlUtils";
import { useAuthentication } from "../../context/providers";

const loginUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${anilistClientId()}&response_type=token`;
const cache = new Set();

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

export function MainNavigation() {
  const { logoutUser } = useAuthentication();

  createEffect(() => {
    const t = token2();
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


  return (
    <nav class="main-navigation">
      <ul>
        <li><A href="/">Home</A></li>
        <li><A href="/browse/anime">Anime</A></li>
        <li><A href="/browse/manga">Manga</A></li>
        <li><A href="/browse/media">Search</A></li>
        <Switch>
          <Match when={token2()}>
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
          </Match>
          <Match when={!token2()}>
            <li><a href={loginUrl}>Login with AniList</a></li>
          </Match>
        </Switch>
      </ul>
    </nav>
  );
}
