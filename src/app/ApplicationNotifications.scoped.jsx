import { For, Match, Switch } from "solid-js";
import "./ApplicationNotifications.scoped.css";
import { CloseIcon, ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "@/assets/icons.jsx";
import { notifications, startNotificationInterval, stopNotificationInterval } from "@/state/notifications";

export function ApplicationNotifications() {
  return (
    <div class="notifications-wrapper" onFocusin={stopNotificationInterval} onMouseEnter={stopNotificationInterval} onMouseLeave={startNotificationInterval} onFocusOut={startNotificationInterval}>
      <For each={notifications()}>{val => (
        <div class="notification" className={val.type} classList={{ hidden: val.hidden() }}>
          <div class="icon-wrapper">
            <Switch>
              <Match when={val.type === "error"}>
                <ErrorIcon scoped />
              </Match>
              <Match when={val.type === "info"}>
                <InfoIcon scoped />
              </Match>
              <Match when={val.type === "warning"}>
                <WarningIcon scoped />
              </Match>
              <Match when={val.type === "success"}>
                <SuccessIcon scoped />
              </Match>
            </Switch>
          </div>
          <p>{val.message}</p>
          <button onClick={() => val.setHidden(true)}>
            <CloseIcon scoped />
          </button>
        </div>
      )}</For>
    </div>
  );
}
