import { For, Show } from "solid-js";
import Status from "./Status";
import Score from "./Score";
import style from "./Friends.module.scss";
import { A } from "@solidjs/router";

function Friends(props) {
  return (
    <Show when={props.friend?.mediaList.length}>
      <div class={style.friendContainer}>
        <ul>
          <For each={props.friend.mediaList}>{friend => (
            <li>
              <A class={style.friend} href={"/user/" + friend.user.name}>
                <img src={friend.user.avatar.large} alt="User profile" />
                <p>{friend.user.name}</p>
                <Status friend={friend} media={props.media} type={props.type} />
                <Score format={friend.user.mediaListOptions.scoreFormat} score={friend.score} />
              </A>
            </li>
          )}</For>
        </ul>
      </div>
    </Show>
  );
}

export default Friends; 
