import { createRenderEffect, createSignal } from "solid-js";
import { asserts, modes } from "../collections/collections.js";

export const localStorageString = (key, initialValue) => {
  const [value, _setValue] = createSignal(localStorage.getItem(key) ?? initialValue);
  const setValue = val => {
    _setValue(v => {
      const value = typeof val === "function" ? val(v) : val;
      if (value == null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }

      return value;
    });
  }

  return [value, setValue];
}

const parseBoolean = str => {
  if (str === "true") {
    return true;
  }

  if (str === "false") {
    return false;
  }
}

export const localStorageBoolean = (key, initialValue) => {
  const [value, _setValue] = createSignal(parseBoolean(localStorage.getItem(key)) ?? initialValue);
  const setValue = val => {
    _setValue(v => {
      const value = typeof val === "function" ? val(v) : val;
      if (value == null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, String(value));
      }

      return value;
    });
  }

  return [value, setValue];
}

const parseJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
  }
}

export const localStorageJSON = (key, initialValue) => {
  const [value, _setValue] = createSignal(parseJson(localStorage.getItem(key)) ?? initialValue);
  const setValue = val => {
    _setValue(v => {
      const value = typeof val === "function" ? val(v) : val;
      if (value == null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }

      return value;
    });
  }

  return [value, setValue];
}

export const debug = (booleanToGiveWhenInDubugMode = true) => createSignal(modes.debug === booleanToGiveWhenInDubugMode);

export const createSignalWithSignal = signal => {
  asserts.isTypeFunction(signal);

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
