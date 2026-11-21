import { deleteIndexDBValue, getIndexedDBValue, setIndexedDBValue } from "./indexedDBUtils";
import { getSessionStorageJson, setSessionStorageJson } from "./sessionStorageUtils";

export function setFetcherValueToStorage(value, { sessionCache = true } = {}) {
  if (!value?.cacheKey) return;
  if (!value) {
    deleteIndexDBValue("fetches", value);
    sessionStorage.removeItem(value.cacheKey);
  } else {
    setIndexedDBValue("fetches", value);
    if (sessionCache) setSessionStorageJson(value.cacheKey, value);
  }
}

export function deleteFetcherValueFromStorage(fetcher) {
  if (!fetcher?.cacheKey) return;
  deleteIndexDBValue("fetches", fetcher.cacheKey);
  sessionStorage.removeItem(fetcher.cacheKey);
}

export function getFetcherValueFromStorage(fetcher, defaultValue, { sessionCache = true } = {}) {
  if (!fetcher?.cacheKey) return defaultValue;

  if (!sessionCache) return getIndexedDBValue("fetches", fetcher.cacheKey) || defaultValue;
  return getSessionStorageJson(fetcher.cacheKey, null) || getIndexedDBValue("fetches", fetcher.cacheKey) || defaultValue;
}
