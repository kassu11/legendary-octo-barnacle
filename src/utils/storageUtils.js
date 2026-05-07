import { deleteIndexDBValue, setIndexedDBValue } from "./indexedDButils";
import { setSessionStorageJson } from "./sessionStorageUtils";

export const setFetcherValueToStorage = (value) => {
  if (!value?.cacheKey) return;
  if (!value) {
    deleteIndexDBValue("fetches", value);
    sessionStorage.removeItem(value.cacheKey);
  } else {
    setIndexedDBValue("fetches", value);
    setSessionStorageJson(value.cacheKey, value);
  }
}
