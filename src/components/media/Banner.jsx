import "../../pages/MediaInfo.scss";
import { Show } from "solid-js";

const Banner = (props) => {
  return (
    <Show when={props.src}>
      <div class="media-page-banner">
        <img src={props.src} alt="Banner" />
      </div>
    </Show>
  );
};

export default Banner; 
