import { IndexedDB } from "../api";
import { assert } from "../assert";
import { CacheObject } from "../CacheObject";
import { FetchSettings } from "./FetchSettings";
import { batch, createEffect, createSignal, on, onCleanup, untrack } from "solid-js";

const DEBUG = location.origin.includes("localhost");

export class Fetcher {
  constructor(url, options, formatResponse) {
    assert(url, "URL is missing");

    this.url = url;
    this.options = options;
    this.formatResponse = formatResponse;
    this.settings = new FetchSettings({ storeName: "results", type: "fetch-once", expiresInSeconds: 60 * 60 * 24 * 365 });
  }

  get cacheKey() {
    return `${this.url}${JSON.stringify(this.options)?.replaceAll("\"", "") || ""}${this.formatResponse || ""}`;
  }
}

const sendFetcher = (fetcher, signal) => {
  const options = {
    ...(fetcher.options || {}),
    signal
  };
  options.body &&= JSON.stringify(fetcher.options.body);
  options.cache ??= "default";

  if (Math.random() > 1) {
    console.log("Error route")
    return fetch("http://127.0.0.1:3000/api/version", options);
  } else if (fetcher.delay) {
    return new Promise((res, rej) => {
      fetch(fetcher.url, options)
        .then(data => setTimeout(() => res(data), fetcher.delay))
        .catch(rej);
    });
  } else {
    return fetch(fetcher.url, options);
  }
}

const fetchRequests = {};
const fetchResponses = {};

/** @param {Fetcher} fetcher */
const fetchData = async (fetcher, signal) => {
  try {
    const fetchRequest = fetchRequests[fetcher.cacheKey] ??= sendFetcher(fetcher, signal);
    var response = await fetchRequest;
  } catch(e) {
    if (!signal.aborted && DEBUG) {
      console.error(e);
    }
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

function createCustomSignal(initialValue) {
  const [trackingSignal, setTrackingSignal] = createSignal(0);
  let currentValue = initialValue;

  const value = () => {
    trackingSignal(); // track in reactive scopes
    return currentValue;
  };

  const setValue = (mutation) => {
    const newValue = typeof mutation === "function" ? mutation(currentValue) : mutation;
    currentValue = newValue;
    setTrackingSignal((n) => n + 1); // trigger change
    return currentValue;
  };

  const setValueWithoutUpdate = (mutation) => {
    currentValue = typeof mutation === "function" ? mutation(currentValue) : mutation;
    return currentValue;
  };

  return [value, setValue, setValueWithoutUpdate];
}


/** @type {Object.<string, CacheObject>} */
const cacheObjects = {};

/**
 * @param {() => (Fetcher|null)} fetcherSignal - Fetch to be send
 * @param {FetchSettings} [overwriteSettings] - Custom settings to overwrite fetch settings
 */
export const send = (fetcherSignal, overwriteSettings = {}) => {
  /** @type {[() => null|ApiResponse, (ApiResponse) => void, (ApiResponse) => void]} */
  const [response, setResponse, setResponseWithoutUpdate] = createCustomSignal(undefined);
  const [error, setError] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [indexedDBClosed, setIndexedDBClosed] = createSignal(true);
  /** @type {null|Fetcher} */
  let currentFetcher = null;
  /** @type {null|AbortController} */
  let currentController = null;

  /**
   * @param {ApiResponse|(data: ApiResponse) => ApiResponse} possibleCallback
   * @returns {ApiResponse}
   */
  const unwrapMutation = possibleCallback => {
    if (typeof possibleCallback === "function") {
      const { data, cacheType } = untrack(response) || {};
      return possibleCallback(new ApiResponse(currentFetcher.cacheKey, data, cacheType));
    }

    return possibleCallback;
  }

  /**
   * @param {ApiResponse|(data: ApiResponse) => ApiResponse} cacheMutation
   * @param {() => any} callback
   */
  const mutateCache = (mutation, callback) => {
    const processedMutation = unwrapMutation(mutation);
    // Create a deepcopy because onsuccess events are not instant so mutations could leak into cache.
    const cacheMutation = new CacheObject(currentFetcher, structuredClone(processedMutation.data));
    setResponseWithoutUpdate(processedMutation);

    const {type, storeName} = currentFetcher.settings;

    if (type === "no-store" || !storeName) {
      return;
    }

    currentFetcher.settings.saveToSessionStorage?.(cacheMutation);
    cacheObjects[cacheMutation.cacheKey] = cacheMutation;

    setIndexedDBClosed(false);
    const cacheReq = IndexedDB.fetchCache();
    cacheReq.onsuccess = evt => {
      const db = evt.target.result;
      const store = IndexedDB.store(db, storeName, "readwrite", () => setIndexedDBClosed(true), () => setIndexedDBClosed(true));
      const putReq = store.put(cacheMutation);
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

  /** @param {ApiResponse|(data: ApiResponse) => ApiResponse} mutation */
  const mutate = mutation => {
    mutation = unwrapMutation(mutation);

    assert(mutation instanceof ApiResponse);
    setResponse(mutation);
  }

  /**
   * @param {ApiResponse|(data: ApiResponse) => ApiResponse} mutation
   * @param {() => any} callback
   */
  const mutateBoth = (mutation, callback) => {
    mutation = unwrapMutation(mutation);

    mutateCache(mutation, callback);
    mutate(mutation);
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

    currentController?.abort();
    const controller = new AbortController();
    currentController = controller;
    const data = await fetchData(currentFetcher, controller.signal);

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

  const updateFetcherInfo = fetcher => {
    if (!fetcher) {
      return;
    };

    currentFetcher = fetcher;
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
      if (isOnDebugSoDontFetch || type === "only-if-cached" || type === "fetch-once" || type === "default") {
        batch(() => {
          setResponse(new ApiResponse(response.cacheKey, response.data, "local"));
          setLoading(false);
        });
        return;
      } else {
        setResponse(new ApiResponse(response.cacheKey, response.data, "local"));
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
              const response = new ApiResponse(result.cacheKey, result.data, "indexedDB");
              if (!sendFetchEvenWhenCacheIsFound) {
                batch(() => {
                  safeMutate(response);
                  setLoading(false);
                });
              } else {
                safeMutate(response);
              }

              return
            }
          }

          safeRefetch()
        };
      }
    }

    if (sendFetchEvenWhenCacheIsFound) {
      refetch();
    }
  }

  updateFetcherInfo(untrack(fetcherSignal));
  createEffect(on(fetcherSignal, updateFetcherInfo, { defer: true }));

  Object.defineProperties(response, {
    error: { get: () => error() },
    loading: { get: () => loading() },
    indexedDBClosed: { get: () => indexedDBClosed() },
  });

  onCleanup(() => currentController?.abort());

  return [response, { mutate, refetch, mutateCache, mutateBoth }];
}
