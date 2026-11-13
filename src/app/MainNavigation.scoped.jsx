import { A, useLocation } from "@solidjs/router";
import { createEffect, createSignal, Match, on, onCleanup, Show, Switch } from "solid-js";
import "./MainNavigation.scoped.css";
import { queries } from "@/api/api";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils";
import { anilistClientId } from "@/utils/urlUtils";
import { useAuthentication } from "@/state/providers";
import { authUserData, setAuthUserData, token2 } from "@/state/globalState";
import { AnilistIcon, BellIcon, BookOutlineIcon, ChevronDownIcon, HomeIcon, LogOutIcon, SearchIcon, SettingsIcon, TvOutlineIcon, UserIcon } from "@/assets/icons.jsx";

const loginUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${anilistClientId()}&response_type=token`;

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
        <A scoped href="/" class="brand" end aria-label="Legendary Octo Barnacle, home">
          <span class="logo" aria-hidden="true">LOB</span>
          <span class="brand-name" aria-hidden="true">Octo Barnacle</span>
        </A>

        <ul class="primary">
          <li><NavLink href="/" end icon={HomeIcon}>Home</NavLink></li>
          <li><NavLink href="/ani/browse/anime" icon={TvOutlineIcon}>Anime</NavLink></li>
          <li><NavLink href="/ani/browse/manga" icon={BookOutlineIcon}>Manga</NavLink></li>
        </ul>

        <div class="actions">
          <A scoped href="/ani/browse/media" class="icon-button" aria-label="Search" title="Search">
            <SearchIcon scoped />
          </A>
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
              <A scoped href="/settings" class="icon-button" aria-label="Settings" title="Settings">
                <SettingsIcon scoped />
              </A>
              <a href={loginUrl} class="login">
                <AnilistIcon scoped />
                <span>Log in</span>
              </a>
            </Match>
          </Switch>
        </div>
      </div>
    </nav>
  );
}

function NavLink(props) {
  return (
    <A scoped href={props.href} end={props.end} class="nav-link">
      <props.icon scoped />
      <span class="label">{props.children}</span>
    </A>
  );
}

function NotificationsLink(props) {
  const label = () => props.count > 0 ? `Notifications, ${props.count} unread` : "Notifications";

  return (
    <A scoped href="/notifications" class="icon-button" aria-label={label()} title="Notifications">
      <BellIcon scoped />
      <Show when={props.count > 0}>
        <span class="badge" aria-hidden="true">{props.count > 99 ? "99+" : props.count}</span>
      </Show>
    </A>
  );
}

function ProfileMenu(props) {
  const { logoutUser } = useAuthentication();
  const location = useLocation();
  const [open, setOpen] = createSignal(false);
  let ref;
  let button;

  const closeOnOutsideClick = e => open() && !ref.contains(e.target) && setOpen(false);
  const closeOnEscape = e => {
    if (e.key !== "Escape" || !open()) return;
    setOpen(false);
    button.focus();
  };
  window.addEventListener("pointerdown", closeOnOutsideClick);
  window.addEventListener("keydown", closeOnEscape);
  onCleanup(() => {
    window.removeEventListener("pointerdown", closeOnOutsideClick);
    window.removeEventListener("keydown", closeOnEscape);
  });

  createEffect(on(() => location.pathname, () => setOpen(false), { defer: true }));

  const userUrl = () => "/user/" + props.user.name;

  return (
    <div ref={elem => ref = elem} class="profile-menu" classList={{ open: open() }}>
      <button
        ref={elem => button = elem}
        class="avatar-button"
        onClick={() => setOpen(s => !s)}
        aria-expanded={open()}
        aria-haspopup="true"
        aria-label="Account menu"
      >
        <img src={props.user.avatar.large} alt="" />
        <ChevronDownIcon scoped />
      </button>

      <div class="dropdown">
        <A scoped href={userUrl()} end class="dropdown-header">
          <img src={props.user.avatar.large} alt="" />
          <span class="user">
            <span class="name">{props.user.name}</span>
            <span class="hint">View profile</span>
          </span>
        </A>
        <hr />
        <A scoped href={userUrl()} end class="dropdown-item">
          <UserIcon scoped />Profile
        </A>
        <A scoped href={userUrl() + "/anime/list"} class="dropdown-item">
          <TvOutlineIcon scoped />Anime list
        </A>
        <A scoped href={userUrl() + "/manga/list"} class="dropdown-item">
          <BookOutlineIcon scoped />Manga list
        </A>
        <A scoped href="/settings" class="dropdown-item">
          <SettingsIcon scoped />Settings
        </A>
        <hr />
        <button class="dropdown-item logout" onClick={() => logoutUser()}>
          <LogOutIcon scoped />Log out
        </button>
      </div>
    </div>
  );
}
