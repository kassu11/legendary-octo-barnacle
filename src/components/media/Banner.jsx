import style from "../../pages/AnimeInfo.module.scss";
import { Show } from "solid-js";

export function Banner(props) {
  return (
    <Show when={props.src}>
      <div class={style.banner}>
        <img src={props.src} alt="Banner" />
      </div>
    </Show>
  );
} 