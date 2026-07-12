import { createSignal } from "solid-js";
import { safeParseJson, safeStringifyJson } from "./jsonUtils";
import { isTypeFunction } from "./functionUtils";
import { assertThruthy, assertTypeString } from "../collections/asserts";

export function getLocalStorageJson(key, defaultValue) {
  const data = localStorage[key];
  if (!data) return defaultValue;

  return safeParseJson(data, defaultValue);
}

export function setLocalStorageJson(key, value) {
  const data = safeStringifyJson(value);
  if (!data) {
    localStorage.removeItem(key);
  } else {
    localStorage[key] = data;
  }
}

export const createLocalStorageJsonSignal = (key, initialValue) => {
  const [value, _setValue] = createSignal(getLocalStorageJson(key, initialValue));
  const setValue = val => {
    _setValue(v => {
      const value = isTypeFunction(val) ? val(v) : val;
      setLocalStorageJson(key, value);
      return value;
    });
  }

  return [value, setValue];
}

export const createLocalStorageSignal = (key, initialValue) => {
  const [value, _setValue] = createSignal(localStorage.getItem(key) ?? initialValue);
  const setValue = mutate => {
    _setValue(v => {
      if (isTypeFunction(mutate)) mutate = mutate(v);
      if (!mutate) localStorage.removeItem(key);
      else localStorage.setItem(key, mutate);
      return mutate;
    });
  }

  return [value, setValue];
}

export const createLocalStorageBooleanSignal = (key, initialValue) => {
  assertTypeString(key);
  assertThruthy(key);
  const start = localStorage.getItem(key);
  const [value, _setValue] = createSignal(start ? start === "true" : initialValue);
  const setValue = mutate => {
    _setValue(v => {
      if (isTypeFunction(mutate)) mutate = mutate(v);
      if (mutate == null) localStorage.removeItem(key);
      else localStorage.setItem(key, mutate);
      return mutate;
    });
  }

  return [value, setValue];
}

export const createLocalStorageBooleanSignal = (key, initialValue) => {
  const val = localStorage.getItem(key);
  const [value, _setValue] = createSignal(val != null ? val === "true" : initialValue);
  const setValue = mutate => {
    _setValue(v => {
      if (isTypeFunction(mutate)) mutate = mutate(v);
      if (!mutate) localStorage.removeItem(key);
      else localStorage.setItem(key, mutate);
      return mutate;
    });
  }

  return [value, setValue];
}
