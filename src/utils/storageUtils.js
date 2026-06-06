import { deleteIndexDBValue, getIndexedDBValue, setIndexedDBValue } from "./indexedDButils";
import { getSessionStorageJson, setSessionStorageJson } from "./sessionStorageUtils";

export function setFetcherValueToStorage(value) {
  if (!value?.cacheKey) return;
  if (!value) {
    deleteIndexDBValue("fetches", value);
    sessionStorage.removeItem(value.cacheKey);
  } else {
    setIndexedDBValue("fetches", value);
    setSessionStorageJson(value.cacheKey, value);
  }
}

export function getFetcherValueFromStorage(fetcher, defaultValue) {
  if (!fetcher?.cacheKey) return defaultValue;

  return getSessionStorageJson(fetcher.cacheKey, null) || getIndexedDBValue("fetches", fetcher.cacheKey) || defaultValue;
}
