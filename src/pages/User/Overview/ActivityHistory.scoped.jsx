import { createMemo, For, Show } from "solid-js";
import { Tooltip } from "@/components/Tooltip.scoped";
import { formatTimeToDate } from "@/utils/formatUtils.js";
import "./ActivityHistory.scoped.css";
import { arrayUtils } from "@/utils/utils.js";
import { timeCollection } from "@/constants/constants.js";
import { wrapToArray } from "@/utils/arrayUtils";

export function ActivityHistoryScoped(props) {
  const start = createStartDate() / 1000;

  // Anilist doesn't guarantee the order of the activity history
  const history = createMemo(() => wrapToArray(props.history).toSorted((a, b) => a.date - b.date));

  const days = createMemo(() => {
    const end = new Date() / 1000;
    const parsedHistory = [];

    history().forEach((cur, i, arr) => {
      // Date is out of range skip iteration
      if (cur.date < start || cur.date > end + timeCollection.dayAsSeconds) {
        return;
      }

      const prev = arr[i - 1]?.date;
      // Days aren't always 24 hours long because of DST so the delta between history dates needs to be rounded
      const missingDays = prev >= start - timeCollection.dayAsSeconds
        ? Math.round((cur.date - prev) / timeCollection.dayAsSeconds) - 1
        : localDayNumber(cur.date) - localDayNumber(start);

      // Add missing empty dates in between history
      for (let i = missingDays; i > 0; i--) {
        parsedHistory.push({date: addDays(cur.date, -i)});
      }

      parsedHistory.push(cur);
    });

    // Add missing empty dates at the end
    const lastDate = history().at(-1)?.date;
    const rightPadding = Math.floor((end - lastDate) / timeCollection.dayAsSeconds);
    for (let i = 1; i < rightPadding; i++) {
      parsedHistory.push({date: addDays(lastDate, i)});
    }

    return parsedHistory;
  });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Show when={history().at(-1)?.date > start}>
      <div>
        <h3>Activity</h3>
        <div class="activity-history-container">
          <ol class="activity-history-header-list">
            <For each={dayNames}>{(_, i) => (
              <li class="activity-history-header">{arrayUtils.at(dayNames, i() + firstDay)}</li>
            )}</For>
          </ol>
          <ol class="activity-history-list">
            <For each={days()}>{(activity) => (
              <li class="activity-item" attr:data-level={activity.level}>
                <ActivityTooltip date={activity.date * 1000} amount={activity.amount}/>
              </li>
            )}</For>
          </ol>
        </div>
      </div>
    </Show>
  );

  function ActivityTooltip(props) {
    return (
      <Tooltip>
        <p>{formatTimeToDate(props.date)}</p>
        <p>Amount: {props.amount || 0}</p>
      </Tooltip>
    );
  }
}


const firstDay = 1 // Monday
const addDays = (seconds, days) => {
  const date = new Date(seconds * 1000);
  date.setDate(date.getDate() + days);
  return date.getTime() / 1000;
}
const localDayNumber = (seconds) => {
  const date = new Date(seconds * 1000);
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / timeCollection.dayAsMilliSeconds;
}
const createStartDate = () => {
  const [date] = new Date().toISOString().split("T");
  const start = new Date(`${date}T00:00`);
  // Move start half a year
  start.setDate(start.getDate() - 182);
  // Set start to the firstDay of that week
  start.setDate((start.getDate() - start.getDay()) + firstDay);
  return start.getTime();
}
