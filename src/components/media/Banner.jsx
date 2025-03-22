import style from "../../pages/AnimeInfo.module.scss";
import { Show } from "solid-js";

const Banner = (props) => {
  return (
    <Show when={props.src}>
      <div class={style.banner}>
        <img src={props.src} alt="Banner" />
      </div>
    </Show>
  );
};

export default Banner; 