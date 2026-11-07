import { createSignal, untrack } from "solid-js";

export const [notifications, setNotifications] = createSignal([]);

// setTimeout(addApplicationNotification, 1, { type: "error", message: "Status 404 data not found", duration: 10_000 });
// setTimeout(addApplicationNotification, 200, { type: "info", message: "Anilist api is down", duration: 2_000 });
// setTimeout(addApplicationNotification, 500, { type: "warning", message: "Token has expired", duration: 3_000 });
// setTimeout(addApplicationNotification, 1000, { type: "success", message: "Media update saved", duration: 4_000 });

let interval = null;

const getTime = () => new Date().getTime();

export function startNotificationInterval() {
  if (interval !== null) return;

  clearInterval(interval);
  interval = setInterval(hideExpiredNotifications, 1000);
  const n = getTime();
  for (const val of untrack(notifications)) {
    val.expires = n + val.duration;
  }
}

export function stopNotificationInterval() {
  if (interval === null) return;

  clearInterval(interval);
  interval = null;
  const n = getTime();
  for (const val of untrack(notifications)) {
    const delta = val.expires - n;
    if (!delta) continue;
    val.duration = delta;
  }
}

startNotificationInterval();

export function addApplicationNotification(options) {
  const [hidden, setHidden] = createSignal(false);

  options.hidden = hidden;
  options.setHidden = setHidden;
  options.expires = getTime() + options.duration;

  setNotifications(arr => [...arr, options]);
}

function hideExpiredNotifications() {
  const n = getTime();
  for (const val of untrack(notifications)) {
    if (val.expires > n) continue;
    if (untrack(val.hidden)) continue;

    val.setHidden(true);
    setTimeout(setNotifications, 1_000, arr => arr.filter(v => v !== val));
  }
}
