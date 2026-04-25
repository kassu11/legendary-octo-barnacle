import { assertTypeObject } from "../collections/asserts";
import { safeParseJson } from "./jsonUtils";

export function getLocalStorageJson(key, defaultValue) {
  assertTypeObject(defaultValue);
  return safeParseJson(key, defaultValue);
}
