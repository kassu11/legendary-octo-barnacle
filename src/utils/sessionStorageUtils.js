import { safeParseJson, safeStringifyJson } from "./jsonUtils";

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
