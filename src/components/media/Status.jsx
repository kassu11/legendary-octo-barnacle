import { Switch, Match, Show, splitProps } from "solid-js";

function Status(props) {

  const [local, scoping] = splitProps(props, ["friend", "type", "media"]);

  return (
    <p {...scoping}>
      <Switch fallback={local.friend.status}>
        <Match when={local.friend.status === "COMPLETED"}>Completed</Match>
        <Match when={local.friend.status === "CURRENT"}>
          <Switch>
            <Match when={local.type === "ANIME"}>Watching</Match>
            <Match when={local.type === "MANGA"}>Reading</Match>
          </Switch>
        </Match>
        <Match when={local.friend.status === "DROPPED"}>Dropped</Match>
        <Match when={local.friend.status === "PAUSED"}>Paused</Match>
        <Match when={local.friend.status === "PLANNING"}>Planning</Match>
        <Match when={local.friend.status === "REPEATING"}>
          <Switch>
            <Match when={local.type === "ANIME"}>Rewatching</Match>
            <Match when={local.type === "MANGA"}>Rereading</Match>
          </Switch>
        </Match>
      </Switch>
      <Show when={local.friend.progress > 0 && local.friend.progress !== local.media.episodes && local.friend.progress !== local.media.chapters}>
        <Switch>
          <Match when={local.type === "ANIME"}> Ep. {local.friend.progress}</Match>
          <Match when={local.type === "MANGA"}> Ch. {local.friend.progress}</Match>
        </Switch>
      </Show>
      <Show when={local.friend.progressVolumes > 0 && local.friend.progressVolumes !== local.media.volumes}>
        {" "}Vol. {local.friend.progressVolumes}
      </Show>
    </p>
  );
}

export default Status; 
