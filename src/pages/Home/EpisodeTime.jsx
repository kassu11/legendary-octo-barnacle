import { createMemo, createSignal, Show } from "solid-js";
import { timeCollection } from "../../collections/collections";
import { formatingUtils } from "../../utils/utils";

const [currentTime, setCurentTime] = createSignal(
  timeCollection.currentTimeInSeconds,
);
setInterval(() => setCurentTime(new Date() / 1000), 1000 * 30);

export function EpisodeTime(props) {
  const timeAlreadyOver = props.airingAt < currentTime();

  const time = createMemo(() => {
    const delta = Math.abs(props.airingAt - currentTime());
    if (timeAlreadyOver) {
      return (
        timeCollection.weekInSeconds - (delta % timeCollection.weekInSeconds)
      );
    }

    return delta;
  });

  const timeLimitReached = createMemo((prev) => {
    if (prev === false && props.airingAt < currentTime()) {
      props.setAiringEpisode((ep) => ep + 1);
      return true;
    }

    return prev;
  }, false);

  return (
    <>
      <Show when={!timeAlreadyOver && timeLimitReached()}>aired in</Show>
      <p>
        <Show
          when={Math.floor(time() / 3600 / 24)}
          children={(days) => <>{days}d </>}
        />
        <Show
          when={Math.floor((time() / 3600) % 24)}
          children={(hours) => <>{hours}h </>}
        />
        <Show
          when={Math.floor((time() % 3600) / 60)}
          children={(minutes) => <>{minutes}m </>}
        />
      </p>
    </>
  );
}

export function EpisodeTime2(props) {
  const time = createMemo(() => Math.max(props.airingAt - currentTime(), 0));

  return (
    <DurationToTime time={time()} {...props} />
  );
}

export function DurationToTime(props) {
  const text = createMemo(() => {
    const {time, day, hour, minute} = props;
    const days = day && Math.floor(time / 3600 / 24);
    const hours = hour && Math.floor((time / 3600) % 24);
    const minutes = minute && Math.floor((time % 3600) / 60);

    let returnValue = "";

    if (days) {
      returnValue += ` ${days}${day}${formatingUtils.plural(days)}`;
    }
    if (hours) {
      returnValue += ` ${hours}${hour}${formatingUtils.plural(hours)}`;
    }
    if (minutes) {
      returnValue += ` ${minutes}${minute}${formatingUtils.plural(minutes)}`;
    }

    return returnValue.trim();
  });

  return (
    <Show when={text()} fallback={props.fallback}>
      {props.flavorText}
      {text()}
    </Show>
  );
}
