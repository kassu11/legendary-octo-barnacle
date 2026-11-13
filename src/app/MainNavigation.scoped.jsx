import { createEffect, Match, Switch } from "solid-js";
import "./MainNavigation.scoped.css";
import { queries } from "@/api/api";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils";
import { authUserData, setAuthUserData, token2 } from "@/state/globalState";
import { BookOutlineIcon, HomeIcon, SearchIcon, SettingsIcon, TvOutlineIcon } from "@/assets/icons.jsx";
import { NavigationBrand } from "./navigation/NavigationBrand.scoped.jsx";
import { NavigationLink } from "./navigation/NavigationLink.scoped.jsx";
import { NavigationIconButton } from "./navigation/NavigationIconButton.scoped.jsx";
import { NotificationsLink } from "./navigation/NotificationsLink.scoped.jsx";
import { ProfileMenu } from "./navigation/ProfileMenu.scoped.jsx";
import { LoginButton } from "./navigation/LoginButton.scoped.jsx";

export function MainNavigation() {
  createEffect(() => {
    const t = token2();
    if (!t) return;

    const fetcher = createAnilistFetcher(queries.currentUser, {});
    sendAnilistFetcher(fetcher, {
      name: "AniList authed user",
      setValue: (res) => {
        setAuthUserData({ data: res.data.data.Viewer })
      }
    });
  });

  return (
    <nav class="main-navigation" aria-label="Main">
      <div class="bar">
        <NavigationBrand />

        <ul class="primary">
          <li><NavigationLink href="/" end icon={HomeIcon}>Home</NavigationLink></li>
          <li><NavigationLink href="/ani/browse/anime" icon={TvOutlineIcon}>Anime</NavigationLink></li>
          <li><NavigationLink href="/ani/browse/manga" icon={BookOutlineIcon}>Manga</NavigationLink></li>
        </ul>

        <div class="actions">
          <NavigationIconButton href="/ani/browse/media" label="Search" icon={SearchIcon} />
          <Switch>
            <Match when={token2() && authUserData()}>{userData => (
              <>
                <NotificationsLink count={userData().data.unreadNotificationCount} />
                <ProfileMenu user={userData().data} />
              </>
            )}</Match>
            <Match when={token2()}>
              <span class="avatar-placeholder" aria-hidden="true" />
            </Match>
            <Match when={!token2()}>
              <NavigationIconButton href="/settings" label="Settings" icon={SettingsIcon} />
              <LoginButton />
            </Match>
          </Switch>
        </div>
      </div>
    </nav>
  );
}
