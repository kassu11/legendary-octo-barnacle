import { Show } from "solid-js";
import "./NotificationsLink.scoped.css";
import { BellIcon } from "@/assets/icons.jsx";
import { NavigationIconButton } from "./NavigationIconButton.scoped.jsx";

export function NotificationsLink(props) {
  const ariaLabel = () => props.count > 0 ? `Notifications, ${props.count} unread` : "Notifications";

  return (
    <NavigationIconButton href="/notifications" label="Notifications" ariaLabel={ariaLabel()} icon={BellIcon}>
      <Show when={props.count > 0}>
        <span class="badge" aria-hidden="true">{props.count > 99 ? "99+" : props.count}</span>
      </Show>
    </NavigationIconButton>
  );
}
