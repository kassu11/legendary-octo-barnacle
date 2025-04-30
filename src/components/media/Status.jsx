import { Switch, Match, Show } from "solid-js";

function Status(props) {
  return (
    <p class="friend-list-status">
      <Switch fallback={props.friend.status}>
        <Match when={props.friend.status === "COMPLETED"}>Completed</Match>
        <Match when={props.friend.status === "CURRENT"}>
          <Switch>
            <Match when={props.type === "ANIME"}>Watching</Match>
            <Match when={props.type === "MANGA"}>Reading</Match>
          </Switch>
        </Match>
        <Match when={props.friend.status === "DROPPED"}>Dropped</Match>
        <Match when={props.friend.status === "PAUSED"}>Paused</Match>
        <Match when={props.friend.status === "PLANNING"}>Planning</Match>
        <Match when={props.friend.status === "REPEATING"}>
          <Switch>
            <Match when={props.type === "ANIME"}>Rewatching</Match>
            <Match when={props.type === "MANGA"}>Rereading</Match>
          </Switch>
        </Match>
      </Switch>
      <Show when={props.friend.progress !== 0 && props.friend.progress !== props.media.episodes && props.friend.progress !== props.media.chapters}>
        <Switch>
          <Match when={props.type === "ANIME"}> Ep {props.friend.progress}</Match>
          <Match when={props.type === "MANGA"}> Ch {props.friend.progress}</Match>
        </Switch>
      </Show>
    </p>
  );
}

export default Status; 
