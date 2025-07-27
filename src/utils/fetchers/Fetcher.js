import { cache } from "@solidjs/router";
import { IndexedDB } from "../api";
import { assert } from "../assert";
import { assertFunction, unwrapFunction } from "../functionUtils";
import { TokenBucket } from "../TokenBucket";
import { CacheObject } from "./CacheObject";
import { Fetch } from "./Fetch";
import { FetchSettings } from "./FetchSettings";
import { batch, createEffect, createSignal, onCleanup, untrack } from "solid-js";

const DEBUG = location.origin.includes("localhost");

// const fetchRateLimits = {
//   "animeThemes": new TokenBucket({
//     start: 90,
//     limit: 90,
//     interval: 60,
//     defaultDelay: 20,
//   }),
//   "anilist": new TokenBucket({
//     start: 5,
//     limit: 5,
//     interval: 2,
//     defaultDelay: 20,
//     pool: new TokenBucket({
//       start: 60,
//       limit: 90,
//       interval: 60,
//       fillAmount: 60,
//     })
//   }),
//   "jikan": new TokenBucket({
//     start: 1,
//     limit: 1,
//     interval: 1/3,
//     defaultDelay: 1,
//     pool: new TokenBucket({
//       start: 3,
//       limit: 3,
//       interval: 1.25,
//       pool: new TokenBucket({
//         start: 60,
//         limit: 60,
//         interval: 60,
//         fillAmount: 60,
//       })
//     })
//   }),
// }

export class Fetcher {
  constructor(url, options, formatResponse) {
    assert(url, "URL is missing");

    this.url = url;
    this.options = options;
    this.formatResponse = formatResponse;
    this.controller = new AbortController();
    this.settings = new FetchSettings({ storeName: "results", type: "fetch-once", expiresInSeconds: 60 * 60 * 24 * 365 });
  }

  get cacheKey() {
    return `${this.url}${JSON.stringify(this.options).replaceAll("\"", "")}${this.formatResponse || ""}`;
  }
}

const sendFetcher = fetcher => {
  const options = { 
    ...fetcher.options,
    signal: fetcher.controller.signal,
  };
  options.body &&= JSON.stringify(fetcher.options.body);
  options.cache ??= "default";

  if (Math.random() > 1) {
    console.log("Error route")
    return fetch("http://127.0.0.1:3000/api/version", options);
  } else {
    return fetch(fetcher.url, options);
  }
}

const fetchRequests = {};
const fetchResponses = {};

/** @param {Fetcher} fetcher */
const fetchData = async fetcher => {
  try {
    const fetchRequest = fetchRequests[fetcher.cacheKey] ??= sendFetcher(fetcher);
    var response = await fetchRequest;
  } catch(e) {
    console.error(e);
    return null;
  } finally {
    delete fetchRequests[fetcher.cacheKey];
  }

  if (!response.ok) {
    return null;
  }

  try {
    const jsonRequest = fetchResponses[fetcher.cacheKey] ??= response.json();
    var json = await jsonRequest;
  } catch(e) {
    console.error(e);
    return null;
  } finally {
    delete fetchResponses[fetcher.cacheKey];
  }

  return fetcher.formatResponse?.(json) || json;
}

class ApiResponse {
  /**
   * @param {string} cacheKey
   * @param {any} data
   * @param {undefined|"local"|"indexedDB"} cacheType
   */
  constructor(cacheKey, data, cacheType) {
    assert(cacheKey, "CacheKey is missing");

    this.cacheKey = cacheKey;
    this.data = data;
    this.cacheType = cacheType;
  }
}


/** @type {Object.<string, CacheObject>} */
const cacheObjects = {};

/**
 * @param {() => (Fetch|null)} fetcherSignal - Fetch to be send
 * @param {FetchSettings} [overwriteSettings] - Custom settings to overwrite fetch settings
 */
export const send2 = (fetcherSignal, overwriteSettings = {}) => {
  /** @type {[() => null|ApiResponse, (ApiResponse) => void]} */
  const [response, setResponse] = createSignal(undefined);
  const [error, setError] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [indexedDBClosed, setIndexedDBClosed] = createSignal(true);
  /** @type {null|Fetcher} */
  let currentFetcher = null;
  /** @type {[null|any]} */
  let currentCacheData = null;

  /**
   * @param {ApiResponse|(data: ApiResponse) => ApiResponse} mutated
   * @param {() => any} callback
   */
  const mutateCache = (mutated, callback) => {
    if (typeof mutated === "function") {
      const { data, cacheType } = untrack(response) || {};
      mutated = mutated(new ApiResponse(currentFetcher.cacheKey, currentCacheData || data, cacheType));
    }
    // Create a deepcopy because onsuccess events are not instant so mutations could leak into cache.
    currentCacheData = structuredClone(mutated.data);
    mutated = new CacheObject(currentFetcher, currentCacheData);

    const {type, storeName} = currentFetcher.settings;

    if (type === "no-store" || !storeName) {
      return;
    }

    currentFetcher.settings.saveToSessionStorage?.(mutated);
    cacheObjects[mutated.cacheKey] = mutated;

    setIndexedDBClosed(false);
    const cacheReq = IndexedDB.fetchCache();
    cacheReq.onsuccess = evt => {
      const db = evt.target.result;
      const store = IndexedDB.store(db, storeName, "readwrite", () => setIndexedDBClosed(true), () => setIndexedDBClosed(true));
      const putReq = store.put(mutated);
      if (callback) {
        putReq.onsuccess = callback;
      }
    }
  }

  /** @param {ApiResponse} mutateData */
  const safeMutate = mutateData => {
    assert(mutateData instanceof ApiResponse);
    if (mutateData.cacheKey === currentFetcher.cacheKey) {
      setResponse(mutateData);
    }
  }

  /** @param {ApiResponse|(data: ApiResponse) => ApiResponse} mutateData */
  const mutate = mutateData => {
    if (typeof mutateData === "function") {
      mutateData = mutateData(untrack(response));
    }

    assert(mutateData instanceof ApiResponse);
    setResponse(mutateData);
  }

  const refetch = async () => {
    assert(currentFetcher, "currentFetcher should not be undefined");
    if (currentFetcher.settings.type === "only-if-cached") {
      batch(() => {
        setResponse(new ApiResponse(currentFetcher.cacheKey, null));
        setLoading(false);
      });
      return;
    }

    const data = await fetchData(currentFetcher);

    if (data === null) { // Data should be only null if signal aborted or error
      batch(() => {
        setError(true);
        setLoading(false);
      });
    } else {
      batch(() => {
        const response = new ApiResponse(currentFetcher.cacheKey, data);
        mutateCache(response);
        safeMutate(response);
        setLoading(false);
      });
    }
  }

  createEffect(() => {
    if (!fetcherSignal() || overwriteSettings?.active?.() === false) {
      return;
    };

    currentFetcher?.controller.abort();
    currentFetcher = fetcherSignal();
    currentCacheData = null;
    assert(currentFetcher instanceof Fetcher);

    Object.assign(currentFetcher.settings, overwriteSettings);

    batch(() => {
      setError(false);
      setLoading(true);
    });

    const type = currentFetcher.settings.type;
    const isOnDebugSoDontFetch = DEBUG && !currentFetcher.settings.fetchOnDebug && type !== "no-store";
    const sendFetchEvenWhenCacheIsFound = !isOnDebugSoDontFetch && (type === "fetch-once" || type === "reload" || type === "no-store");
    const cacheKey = currentFetcher.cacheKey;
    
    if (cacheKey in cacheObjects) {
      const response = cacheObjects[cacheKey];
      setResponse(new ApiResponse(response.cacheKey, response.data, "local"));
      if (isOnDebugSoDontFetch || type === "only-if-cached" || type === "fetch-once" || type === "default") {
        return;
      }
    } else if (type !== "no-store" && currentFetcher.settings.storeName) {
      const cacheReq = IndexedDB.fetchCache();
      const safeRefetch = () => !sendFetchEvenWhenCacheIsFound && refetch();
      cacheReq.onerror = safeRefetch;
      cacheReq.onsuccess = evt => {
        const db = evt.target.result;
        const store = IndexedDB.store(db, currentFetcher.settings.storeName, "readonly");
        const getReg = store.get(cacheKey);
        getReg.onerror = safeRefetch;
        getReg.onsuccess = evt => {
          /** @type {CacheObject} */
          const result = evt.target.result;
          if (result) {
            assert(result.expires, "Cache should have a expiration date");
            assert(result.data, "Cache should always have data");

            if (result.expires > new Date()) {
              if (!sendFetchEvenWhenCacheIsFound) {
                setLoading(false);
              }
              
              const response = new ApiResponse(result.cacheKey, result.data, "indexedDB");
              return safeMutate(response);
            }
          }

          safeRefetch()
        };
      }
    }

    console.log(sendFetchEvenWhenCacheIsFound, isOnDebugSoDontFetch);

    if (sendFetchEvenWhenCacheIsFound) {
      refetch();
    }
  });

  Object.defineProperties(response, {
    error: { get: () => error() },
    loading: { get: () => loading() },
    indexedDBClosed: { get: () => indexedDBClosed() },
  });

  onCleanup(() => currentFetcher?.controller.abort());

  return [response, { mutate, refetch, mutateCache }];
}
