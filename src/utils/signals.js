import { createRenderEffect, createSignal } from "solid-js";
import { modes } from "@/constants/constants.js";
import * as asserts from "./asserts.js";

export const debug = (booleanToGiveWhenInDubugMode = true) => createSignal(modes.debug === booleanToGiveWhenInDubugMode);

export const createSignalWithSignal = signal => {
  asserts.assertTypeFunction(signal);

  const [value, setValue] = createSignal();
  createRenderEffect(() => {
    const val = signal();
    setValue(val);
  });

  return [value, setValue];
}

export const createCustomSignal = initialValue => {
  const [trackingSignal, setTrackingSignal] = createSignal(0);
  let currentValue = initialValue;

  const value = () => {
    trackingSignal(); // track in reactive scopes
    return currentValue;
  };

  const setValue = (mutation) => {
    const newValue = typeof mutation === "function" ? mutation(currentValue) : mutation;
    currentValue = newValue;
    setTrackingSignal((n) => n + 1); // trigger change
    return currentValue;
  };

  const setValueWithoutUpdate = (mutation) => {
    currentValue = typeof mutation === "function" ? mutation(currentValue) : mutation;
    return currentValue;
  };

  return [value, setValue, setValueWithoutUpdate];
}
