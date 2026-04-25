import { safeParseJson, safeStringifyJson } from "./jsonUtils";

export function getSessionStorageJson(key, defaultValue) {
  const data = sessionStorage[key];
  if (!data) return defaultValue;

  return safeParseJson(data, defaultValue);
}

export function setSessionStorageJson(key, value, defaultValue) {
  sessionStorage[key] = safeStringifyJson(value, defaultValue);
}
