import { For, Match, Switch } from "solid-js";
import "./ApplicationNotifications.scoped.css";
import CloseIcon from "@/assets/CloseIcon";
import ErrorIcon from "@/assets/ErrorIcon";
import SuccessIcon from "@/assets/SuccessIcon";
import InfoIcon from "@/assets/InfoIcon";
import WarningIcon from "@/assets/WarningIcon";
import { notifications, startNotificationInterval, stopNotificationInterval } from "@/state/notifications";

export function ApplicationNotifications() {
  return (
    <div class="notifications-wrapper" onFocusin={stopNotificationInterval} onMouseEnter={stopNotificationInterval} onMouseLeave={startNotificationInterval} onFocusOut={startNotificationInterval}>
      <For each={notifications()}>{val => (
        <div class="notification" className={val.type} classList={{ hidden: val.hidden() }}>
          <div class="icon-wrapper">
            <Switch>
              <Match when={val.type === "error"}>
                <ErrorIcon />
              </Match>
              <Match when={val.type === "info"}>
                <InfoIcon />
              </Match>
              <Match when={val.type === "warning"}>
                <WarningIcon />
              </Match>
              <Match when={val.type === "success"}>
                <SuccessIcon />
              </Match>
            </Switch>
          </div>
          <p>{val.message}</p>
          <button onClick={() => val.setHidden(true)}>
            <CloseIcon />
          </button>
        </div>
      )}</For>
    </div>
  );
}
