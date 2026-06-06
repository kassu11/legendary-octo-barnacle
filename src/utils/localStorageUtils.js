import { createSignal } from "solid-js";
import { safeParseJson, safeStringifyJson } from "./jsonUtils";
import { isTypeFunction } from "./functionUtils";

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
      return mutate;
    });
  }

  return [value, setValue];
}
