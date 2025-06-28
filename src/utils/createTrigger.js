import { createSignal } from "solid-js"

export function createTrigger() {
  const [value, setValue] = createSignal(NaN);
  return [() => value() || true, () => setValue(NaN)];
}
