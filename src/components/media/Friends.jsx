import { For, Show } from "solid-js";
import Status from "./Status";
import Score from "./Score";
import style from "./Friends.module.scss";

function Friends(props) {
  return (
    <Show when={props.friend}>
      <div class={style.friendContainer}>
        <ul>
          <For each={props.friend.mediaList}>{friend => (
            <li class={style.friend}>
              <img src={friend.user.avatar.large} alt="User profile" />
              <p>{friend.user.name}</p>
              <Status friend={friend} media={props.media} type={props.type} />
              <Score format={friend.user.mediaListOptions.scoreFormat} score={friend.score} />
            </li>
          )}</For>
        </ul>
      </div>
    </Show>
  );
}

export default Friends; 