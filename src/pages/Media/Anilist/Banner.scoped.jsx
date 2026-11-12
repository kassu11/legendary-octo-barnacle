import { Show, splitProps } from "solid-js";
import "./Banner.scoped.css";

export const MediaBanner = (props) => {
  const [local, scoping] = splitProps(props, ["src", "loading"]);

  return (
    <Show when={local.src}>
      <div {...scoping} class="media-banner" classList={{loading: local.loading}}>
        <img src={local.src} alt="Banner" />
      </div>
    </Show>
  );
};
