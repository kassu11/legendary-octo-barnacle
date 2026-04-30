import { A } from "@solidjs/router";
import { batch, createEffect, Match, Show, Switch } from "solid-js";
import "./MainNavigation.scoped.css";
import { queries } from "../../collections/collections";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils";
import { anilistClientId } from "../../utils/urlUtils";
import { useAuthentication } from "../../context/providers";
import { authUserData, setAuthedUserId, setAuthUserData, token2 } from "../../core/globalState";

const loginUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${anilistClientId()}&response_type=token`;

export function MainNavigation() {
  const { logoutUser } = useAuthentication();

  createEffect(() => {
    const t = token2();
    if (!t) return;

    const fetcher = createAnilistFetcher(queries.currentUser, {}, new AbortController().signal);
    sendAnilistFetcher(fetcher, {
      name: "AniList authed user",
      setValue: (res) => {
        batch(() => {
          setAuthUserData({ data: res.data.data.Viewer })
          setAuthedUserId(res.data.data.Viewer.id);
        });
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
