import { batch, createSignal } from "solid-js";

export const addPendingRequest = () => {
  batch(() => {
    setInOneSeconds(v => v + 1);
    setInFiveSeconds(v => v + 1);
    setInTenSeconds(v => v + 1);
  });
}

export let waitingQueue = null;
export const initializeWaitingQueue = resolve => {
  if (waitingQueue === null) {
    waitingQueue = [resolve];
    resolve();
  } else if (!waitingQueue.includes(resolve)) {
    waitingQueue.push(resolve);
  }
}

export const removeFromWaitingQueue = () => {
  waitingQueue?.shift();
  const resolve = waitingQueue?.[0];
  if (resolve) {
    resolve();
  } else {
    waitingQueue = null;
  }
}

export const removePendingRequest = () => {
  setTimeout(() => setInOneSeconds(v => v - 1), 1_000);
  setTimeout(() => setInFiveSeconds(v => v - 1), 5_000);
  setTimeout(() => setInTenSeconds(v => v - 1), 10_000);
}

const [inOneSeconds, setInOneSeconds] = createSignal(0);
const [inFiveSeconds, setInFiveSeconds] = createSignal(0);
const [inTenSeconds, setInTenSeconds] = createSignal(0);

export { inOneSeconds, inFiveSeconds, inTenSeconds };
