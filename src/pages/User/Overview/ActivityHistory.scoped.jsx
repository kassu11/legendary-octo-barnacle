import {createMemo, For, Show} from "solid-js";
import {Tooltip} from "../../../components/Tooltips.jsx";
import {formatTimeToDate} from "../../../utils/formating.js";
import "./ActivityHistory.scoped.css";

export function ActivityHistoryScoped(props) {
  const start = createStartDate() / 1000;

  const days = createMemo(() => {
    const end = new Date() / 1000;
    const parsedHistory = [];

    props.history?.forEach((cur, i, arr) => {
      const delta = cur.date - numberUtils.max(arr[i - 1]?.date, start - timeCollection.dayAsSeconds);
      // Date is out of range skip iteration
      if (cur.date < start || cur.date > end + timeCollection.dayAsSeconds) {
        return;
      }

      // Add missing empty dates in between history
      for (let i = Math.floor(delta / timeCollection.dayAsSeconds) - 1; i > 0; i--) {
        parsedHistory.push({date: cur.date - timeCollection.dayAsSeconds * i});
      }

      parsedHistory.push(cur);
    });

    // Add missing empty dates at the end
    const lastDate = props.history?.at(-1)?.date;
    const rightPadding = Math.floor((end - lastDate) / timeCollection.dayAsSeconds);
    for (let i = 1; i < rightPadding; i++) {
      parsedHistory.push({date: lastDate + timeCollection.dayAsSeconds * i});
    }

    return parsedHistory;
  });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Show when={props.history.at(-1).date > start}>
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
    const getTipPosition = date => {
      if (date < (start + 3600 * 24 * 60) * 1000) {
        return "right";
      }
      if (date > (start + 3600 * 24 * (180 - 60)) * 1000) {
        return "left";
      }
    }

    return (
      <Tooltip tipPosition={getTipPosition(props.date)}>
        <p>{formatTimeToDate(props.date)}</p>
        <p>Amount: {props.amount || 0}</p>
      </Tooltip>
    );
  }
}


const firstDay = 1 // Monday
const createStartDate = () => {
  const [date] = new Date().toISOString().split("T");
  const start = new Date(`${date}T00:00`);
  // Move start half a year
  start.setDate(start.getDate() - 182);
  // Set start to the firstDay of that week
  start.setDate((start.getDate() - start.getDay()) + firstDay);
  return start.getTime();
}
