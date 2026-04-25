import { safeParseJson } from "./jsonUtils";

export function getLocalStorageJson(key, defaultValue) {
  const data = localStorage[key];
  if (!data) return defaultValue;

  return safeParseJson(data, defaultValue);
}
