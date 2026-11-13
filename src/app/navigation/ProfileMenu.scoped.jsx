import { A, useLocation } from "@solidjs/router";
import { createEffect, createSignal, on, onCleanup } from "solid-js";
import "./ProfileMenu.scoped.css";
import { useAuthentication } from "@/state/providers";
import { BookOutlineIcon, ChevronDownIcon, LogOutIcon, SettingsIcon, TvOutlineIcon, UserIcon } from "@/assets/icons.jsx";

export function ProfileMenu(props) {
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
    <div ref={elem => ref = elem} class="profile-menu">
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

      <div class="dropdown" classList={{ open: open() }}>
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
