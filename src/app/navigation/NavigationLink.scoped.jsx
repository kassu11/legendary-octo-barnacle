import { A, useLocation, useResolvedPath } from "@solidjs/router";
import { createMemo } from "solid-js";
import "./NavigationLink.scoped.css";

// Solid router keeps a single trailing slash when comparing paths, so "/base/" wouldn't match "/base"
const trimTrailingSlash = (path) => path.replace(/\/+$/, "");

export function NavigationLink(props) {
  const location = useLocation();
  const to = useResolvedPath(() => props.href);

  const isActive = createMemo(() => {
    if (to() === undefined) return false;
    const path = trimTrailingSlash(to().split(/[?#]/, 1)[0].toLowerCase());
    const loc = trimTrailingSlash(decodeURI(location.pathname.toLowerCase()));
    return props.end ? path === loc : path === loc || loc.startsWith(path + "/");
  });

  return (
    <A scoped href={props.href} class="nav-link" classList={{ active: isActive(), inactive: !isActive() }}>
      <props.icon scoped />
      <span class="label">{props.children}</span>
    </A>
  );
}
