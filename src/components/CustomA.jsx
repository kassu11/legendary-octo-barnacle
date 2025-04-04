import { A as A2, useLocation } from "@solidjs/router";
import { Show } from "solid-js";

export function A(props) {
  const location = useLocation()

  return (
    <Show when={props.href.startsWith("/") === false} fallback={<A2 {...props} />}>
      <A2 {...props} href={location.pathname.replace("/MyAniList", "") + "/" + props.href} />
    </Show>
  );
}
