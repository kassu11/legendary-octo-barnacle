import { createSignal } from "solid-js";
import { safeParseJson, safeStringifyJson } from "./jsonUtils";
import { isTypeFunction } from "./functionUtils";

export function getSessionStorageJson(key, defaultValue) {
  const data = sessionStorage[key];
  if (!data) return defaultValue;

  return safeParseJson(data, defaultValue);
}

export function setSessionStorageJson(key, value, defaultValue) {
  try {
    sessionStorage[key] = safeStringifyJson(value, defaultValue);
  } catch {
    // Probably hit session storage limit, so lets clean sessionStorage
    sessionStorage.clear();
    sessionStorage[key] = safeStringifyJson(value, defaultValue);
  }
}

export function createOneTimeSessionStorageSignal(key, initialValue) {
  const [value, _setValue] = createSignal(sessionStorage.getItem(key) ?? initialValue);
  sessionStorage.removeItem(key);

  const setValue = mutate => {
    _setValue(v => {
      if (isTypeFunction(mutate)) mutate = mutate(v);
      return mutate;
    });
  }

  window.addEventListener("beforeunload", () => {
    const val = value();
    if (val) sessionStorage.setItem(key, val);
  });

  return [value, setValue];
}
