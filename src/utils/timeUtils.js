import { createSignal, onCleanup } from "solid-js";
import { plural } from "./formating";

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
  if (ms < 1000) return `${Math.round(ms)} ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)} s`;
  if (ms < 3_600_000) return `${Math.floor(ms / 60_000)} m ${Math.floor(ms / 1000)} s`;
  return `${Math.floor(ms / 3_600_000)} h ${Math.floor(ms / 60_000)} m ${Math.floor(ms / 1000)} s`;
}

export function formatSecondsToLongString(s) {
  let h = Math.floor(s / 60);
  let m = s % 60;

  if (h && m) return `${h} hour${plural(h)}, ${m} min${plural(m)}`;
  if (h) return `${h} hour${plural(h)}`;
  return `${m} min${plural(m)}`;
}

export function timeStringToMs(string) {
  let sum = 0;

  string.replace(/(\d)+ms/, (_, num) => sum += +num                         );
  string.replace(/(\d)+s/,  (_, num) => sum += +num * 1_000                 );
  string.replace(/(\d)+m/,  (_, num) => sum += +num * 60_000                );
  string.replace(/(\d)+h/,  (_, num) => sum += +num * 60_000 * 60           );
  string.replace(/(\d)+d/,  (_, num) => sum += +num * 60_000 * 60 * 24      );
  string.replace(/(\d)+w/,  (_, num) => sum += +num * 60_000 * 60 * 24 * 7  );
  string.replace(/(\d)+m/,  (_, num) => sum += +num * 60_000 * 60 * 24 * 31 );
  string.replace(/(\d)+y/,  (_, num) => sum += +num * 60_000 * 60 * 24 * 365);

  return sum;
}
