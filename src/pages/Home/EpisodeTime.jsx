import { createMemo, createSignal, Show } from "solid-js";
import { timeCollection } from "../../collections/collections";

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
