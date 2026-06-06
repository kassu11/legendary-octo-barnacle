import { createSignal } from "solid-js";
import { safeParseJson, safeStringifyJson } from "./jsonUtils";
import { isTypeFunction } from "./functionUtils";

export function getSessionStorageJson(key, defaultValue) {
  const data = get(key);
  if (!data) return defaultValue;

  return safeParseJson(data, defaultValue);
}

export function setSessionStorageJson(key, value, defaultValue) {
  set(key, safeStringifyJson(value, defaultValue));
}

function set(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Probably hit session storage limit, so lets clean sessionStorage
    sessionStorage.clear();
    sessionStorage.setItem(key, value);
  }
}

function get(key, fallback) {
  return sessionStorage.getItem(key) ?? fallback;
}

export function createOneTimeSessionStorageSignal(key, initialValue) {
  const [value, _setValue] = createSignal(get(key) ?? initialValue);
  sessionStorage.removeItem(key);

  const setValue = mutate => {
    _setValue(v => {
      if (isTypeFunction(mutate)) mutate = mutate(v);
      return mutate;
    });
  }

  window.addEventListener("beforeunload", () => {
    const val = value();
    if (val) set(key, val);
  });

  return [value, setValue];
}

export function createOneTimeSessionStorageJsonSignal(key, initialValue) {
  const [value, _setValue] = createSignal(getSessionStorageJson(key, initialValue));
  sessionStorage.removeItem(key);

  const setValue = mutate => {
    _setValue(v => {
      if (isTypeFunction(mutate)) mutate = mutate(v);
      return mutate;
    });
  }

  window.addEventListener("beforeunload", () => {
    const val = value();
    if (val) setSessionStorageJson(key, val);
  });

  return [value, setValue];
}
