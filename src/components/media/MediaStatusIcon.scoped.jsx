import { Match, Show, splitProps, Switch } from "solid-js";
import "./MediaStatusIcon.scoped.css";
import Complete from "@/assets/Complete";
import { RepeatIcon } from "@/assets/RepeatIcon";
import Planning from "@/assets/Planning";
import Watching from "@/assets/Watching";
import TrashIcon from "@/assets/TrashIcon";
import StopIcon from "@/assets/StopIcon";

export function MediaStatusIcon(props) {
  const [local, scoping] = splitProps(props, ["status"]);

  return (
    <Show when={local.status}>
      <div {...scoping} classList={{ "list-status-icon": true, [scoping.class]: !!scoping.class }} data-status={local.status}>
        <Switch>
          <Match when={local.status === "COMPLETED"}>
            <Complete scoped />
          </Match>
          <Match when={local.status === "REPEATING"}>
            <RepeatIcon scoped />
          </Match>
          <Match when={local.status === "PLANNING"}>
            <Planning scoped />
          </Match>
          <Match when={local.status === "CURRENT"}>
            <Watching scoped />
          </Match>
          <Match when={local.status === "DROPPED"}>
            <TrashIcon scoped />
          </Match>
          <Match when={local.status === "PAUSED"}>
            <StopIcon scoped />
          </Match>
        </Switch>
      </div>
    </Show>
  )
}
