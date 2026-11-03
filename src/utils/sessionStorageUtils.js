import { createSignal } from "solid-js";
import { safeParseJson, safeStringifyJson } from "./jsonUtils";
import { isTypeFunction } from "./functionUtils";

export function getSessionStorageJson(key, defaultValue) {
  const data = get(key);
  if (!data) return defaultValue;

  return safeParseJson(data, defaultValue);
}

export function getOrInsertSessionStorageInt(key, defaultValue) {
  const data = +get(key);
  if (!data) {
    set(key, defaultValue);
    return defaultValue;
  }

  return data;
}

export function setSessionStorageJson(key, value, defaultValue) {
  set(key, safeStringifyJson(value, defaultValue));
}

function set(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Probably hit session storage limit, so lets clean sessionStorage
    const sessionTime = get("LOB-session-time"); // We don't want to ever clear sessionTime, so lets keep it in memory
    sessionStorage.clear();
    sessionStorage.setItem("LOB-session-time", sessionTime);
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
