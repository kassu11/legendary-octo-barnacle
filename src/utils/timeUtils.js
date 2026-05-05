import { createSignal, onCleanup } from "solid-js";

export function createTimer() {
  const [val, setVal] = createSignal(0);
  let active = false;

  const startTimer = (time = 0) => {
    setVal(time);
    active = true;
    requestAnimationFrame((prevTime) => {
      requestAnimationFrame((time) => loop(prevTime, time))
    });
  };

  const stopTimer = time => {
    active = false;
    if (time) setVal(time);
  };

  const loop = (prevTime, curTime) => {
    if (!active) return;
    setVal(v => v + (curTime - prevTime));
    requestAnimationFrame((time) => loop(curTime, time));
  }

  onCleanup(() => active = false);

  return [val, startTimer, stopTimer];
}

export function formatMSToString(ms) {
  if (ms >= 1000) {
    return `${(ms / 1000).toFixed(1)} s`;
  }

  return `${Math.round(ms)} ms`;
}
