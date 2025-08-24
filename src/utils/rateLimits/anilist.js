import { batch, createSignal } from "solid-js";

export const addPendingRequest = () => {
  batch(() => {
    setInOneSeconds(v => v + 1);
    setInFiveSeconds(v => v + 1);
    setInTenSeconds(v => v + 1);
  });
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
