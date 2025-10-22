import { createEffect, createSignal, Show } from "solid-js";

const [currentTime, setCurentTime] = createSignal((new Date()) / 1000);
setInterval(() => setCurentTime((new Date()) / 1000), 1000 * 30);

export function EpisodeTime(props) {
  const [time, setTime] = createSignal(Math.abs(props.airingAt - currentTime()));
  const [timeLimitReached, setTimeLimitReached] = createSignal(false);

  createEffect(() => {
    setTime(Math.abs(props.airingAt - currentTime()));
    if (props.airingAt < currentTime() && timeLimitReached() === false) {
      props.setAiringEpisode(ep => ep + 1);
      setTimeLimitReached(true);
    }
  });

  return (
    <>
      <Show when={timeLimitReached()}>aired in</Show>
      <p>
        <Show when={Math.floor(time() / 3600 / 24)} children={days => (<>{days}d </>)} />
        <Show when={Math.floor((time() / 3600) % 24)} children={hours => (<>{hours}h </>)} />
        <Show when={Math.floor((time() % 3600) / 60)} children={minutes => (<>{minutes}m </>)} />
      </p>
    </>
  )
}
