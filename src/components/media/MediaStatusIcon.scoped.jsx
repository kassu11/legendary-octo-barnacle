import { Match, Show, splitProps, Switch } from "solid-js";
import "./MediaStatusIcon.scoped.css";
import { CalendarIcon, CheckIcon, PauseIcon, PlayIcon, RepeatIcon, TrashIcon } from "@/assets/icons.jsx";

export function MediaStatusIcon(props) {
  const [local, scoping] = splitProps(props, ["status"]);

  return (
    <Show when={local.status}>
      <div {...scoping} classList={{ "list-status-icon": true, [scoping.class]: !!scoping.class }} data-status={local.status}>
        <Switch>
          <Match when={local.status === "COMPLETED"}>
            <CheckIcon scoped />
          </Match>
          <Match when={local.status === "REPEATING"}>
            <RepeatIcon scoped />
          </Match>
          <Match when={local.status === "PLANNING"}>
            <CalendarIcon scoped />
          </Match>
          <Match when={local.status === "CURRENT"}>
            <PlayIcon scoped />
          </Match>
          <Match when={local.status === "DROPPED"}>
            <TrashIcon scoped />
          </Match>
          <Match when={local.status === "PAUSED"}>
            <PauseIcon scoped />
          </Match>
        </Switch>
      </div>
    </Show>
  )
}
