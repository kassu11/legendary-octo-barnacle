import { IndexedDB } from "../api";
import { CacheObject } from "../CacheObject";
import { asserts, localizations, modes, rateLimits } from "../utils";
import { FetchSettings } from "./FetchSettings";
import { batch, createRenderEffect, createSignal, on, onCleanup, untrack } from "solid-js";

export class Fetcher {
  constructor(url, options, formatResponse) {
    asserts.assertTrue(url, "URL is missing");

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
  rateLimits.addPendingRequestToUrl(fetcher.url);
  const request = fetcherToFetch(fetcher, signal).finally(() => rateLimits.removePendingRequestToUrl(fetcher.url));
  return request;
}

const fetcherToFetch = (fetcher, signal) => {
  const options = {
    ...(fetcher.options || {}),
    signal
  };
  options.body &&= JSON.stringify(fetcher.options.body);
  options.cache ??= "default";

  if (Math.random() > 1) {
    console.log("Error route")
    switch (Math.ceil(Math.random() * 3)) {
      case 1: return fetch("https://http.codes/429", options);
      case 2: return fetch("https://http.codes/500", options);
      case 3: return fetch("https://http.codes/cors", options);
    }
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
    const { resolve, promise } = Promise.withResolvers();
    for (let i = 0; i < 3 && !signal.aborted; i++) {
      if (rateLimits.hasWaitingQueueForUrl(fetcher.url)) {
        rateLimits.initializeOrAddToWaitingQueueForUrl(fetcher.url, resolve);
        await promise;
      }

      try {
        const fetchRequest = fetchRequests[fetcher.cacheKey] ??= sendFetcher(fetcher, signal);
        var response = await fetchRequest;
      } catch (e) {
        if (signal.aborted) {
          return null;
        }
      } finally {
        delete fetchRequests[fetcher.cacheKey];
      }

      const delay = rateLimits.getDelayByStatusCodeAndUrl(fetcher.url, response?.status || "cors");
      if (response?.status === 429 && response.headers.get("Retry-After")) {
        rateLimits.initializeOrAddToWaitingQueueForUrl(fetcher.url, resolve);
        const time = parseInt(response.headers.get("Retry-After"));
        await new Promise(res => setTimeout(res, time * 1000));
        continue;
      } else if (delay) {
        rateLimits.initializeOrAddToWaitingQueueForUrl(fetcher.url, resolve);
        await new Promise(res => setTimeout(res, delay));
        continue;
      } else if (!response?.ok) {
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
  } catch (e) {
  } finally {
    rateLimits.removeFromWaitingQueueWithUrl(fetcher.url);
  }

  return null;
}

class ApiResponse {
  /**
   * @param {string} cacheKey
   * @param {any} data
   * @param {undefined|"local"|"indexedDB"} cacheType
   */
  constructor(cacheKey, data, cacheType) {
    asserts.assertTrue(cacheKey, "CacheKey is missing");

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

export const oldSendChangeName = fetcherSignal => genericSend(() => false, () => false, false, fetcherSignal);
export const sendDefaultWithoutNullValues = (changeTypeToDefault, fetcherSignal) => genericSend(changeTypeToDefault, () => false, true, fetcherSignal);
export const sendDefaultOrCacheOnlyWithoutNullValues = (changeTypeToDefault, changeTypeToCacheOnly, fetcherSignal) => genericSend(changeTypeToDefault, changeTypeToCacheOnly, true, fetcherSignal);
export const sendCacheOnlyWithoutNullValues = (changeTypeToCacheOnly, fetcherSignal) => genericSend(() => false, changeTypeToCacheOnly, true, fetcherSignal);


/**
 * @param {() => boolean} isSetCacheTypeToDefault - Change cache type to default when active
 * @param {() => boolean} isSetCacheTypeToCacheOnly - Change cache type to cache when active
 * @param {() => (Fetcher|null)} fetcherSignal - Fetch to be send
 * @param {boolean} disableNullValues - When true cache only calls that are not found will return null
 * @param {FetchSettings} [overwriteSettings] - Custom settings to overwrite fetch settings
 */
const genericSend = (isSetCacheTypeToDefault, isSetCacheTypeToCacheOnly, disableNullValues, fetcherSignal) => {
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
    const cacheMutation = new CacheObject(processedMutation.cacheKey, currentFetcher.settings.expiresInSeconds, structuredClone(processedMutation.data));
    if (cacheMutation.cacheKey === currentFetcher.cacheKey) {
      setResponseWithoutUpdate(processedMutation);
    }

    const { type, storeName } = currentFetcher.settings;

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
    asserts.assertTrue(mutateData instanceof ApiResponse);
    if (mutateData.cacheKey === currentFetcher.cacheKey) {
      setResponse(mutateData);
    }
  }

  /** @param {ApiResponse|(data: ApiResponse) => ApiResponse} mutation */
  const mutate = mutation => {
    mutation = unwrapMutation(mutation);

    asserts.assertTrue(mutation instanceof ApiResponse);
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

  let previousSendFetchCacheKey;
  const refetch = async fetcher => {
    if (fetcher !== currentFetcher) {
      return;
    }
    asserts.assertTrue(fetcher, "fetcher should not be undefined");
    const type = untrack(() => getCacheType(fetcher));
    if (type === "only-if-cached") {
      batch(() => {
        if (!disableNullValues) {
          setResponse(new ApiResponse(fetcher.cacheKey, null));
          setLoading(false);
        } else {
        }
      });
      return;
    }

    currentController?.abort();
    const controller = new AbortController();
    currentController = controller;
    previousSendFetchCacheKey = fetcher.cacheKey;
    const data = await fetchData(fetcher, controller.signal);

    if (data === null) { // Data should be only null if signal aborted or error
      if (fetcher.cacheKey === previousSendFetchCacheKey) {
        batch(() => {
          setError(true);
          setLoading(false);
        });
      }
    } else {
      batch(() => {
        const response = new ApiResponse(fetcher.cacheKey, data);
        mutateCache(response);
        safeMutate(response);
        if (fetcher.cacheKey === previousSendFetchCacheKey) {
          setLoading(false);
        }
      });
    }
  }

  const getCacheType = fetcher => {
    if (isSetCacheTypeToCacheOnly()) {
      return localizations.onlyIfCached;
    } else if (isSetCacheTypeToDefault()) {
      return localizations.defaultVal;
    }

    return fetcher.settings.type;
  }

  createRenderEffect(() => {
    const fetcher = fetcherSignal();
    if (!fetcher) {
      return;
    };

    asserts.assertTrue(fetcher instanceof Fetcher);

    const type = getCacheType(fetcher);
    const isOnDebugSoDontFetch = modes.debug && !fetcher.settings.fetchOnDebug && type !== "no-store";
    const sendFetchEvenWhenCacheIsFound = !isOnDebugSoDontFetch && (type === "fetch-once" || type === "reload" || type === "no-store");
    const cacheKey = fetcher.cacheKey;

    if (currentFetcher === fetcher) {
      if (previousSendFetchCacheKey === cacheKey) {
        return
      }

      const res = untrack(response);
      const previousFetcherDataWasFromNewFetcherAndWasFromCache = res?.data && res.cacheKey === cacheKey && res.cacheType;
      if (previousFetcherDataWasFromNewFetcherAndWasFromCache && !sendFetchEvenWhenCacheIsFound) {
        return
      }
    }

    currentFetcher = fetcher;

    batch(() => {
      setError(false);
      setLoading(true);
    });

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
    } else if (type !== "no-store" && fetcher.settings.storeName) {
      const cacheReq = IndexedDB.fetchCache();
      const safeRefetch = () => !sendFetchEvenWhenCacheIsFound && refetch(fetcher);
      cacheReq.onerror = safeRefetch;
      cacheReq.onsuccess = evt => {
        const db = evt.target.result;
        const store = IndexedDB.store(db, fetcher.settings.storeName, "readonly");
        const getReg = store.get(cacheKey);
        getReg.onerror = safeRefetch;
        getReg.onsuccess = evt => {
          /** @type {CacheObject} */
          const result = evt.target.result;
          if (result) {
            asserts.assertTrue(result.expires, "Cache should have a expiration date");
            asserts.assertTrue(result.data, "Cache should always have data");

            if (result.expires > new Date()) {
              const response = new ApiResponse(cacheKey, result.data, "indexedDB");
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
      refetch(fetcher);
    }
  });

  Object.defineProperties(response, {
    error: { get: () => error() },
    loading: { get: () => loading() },
    indexedDBClosed: { get: () => indexedDBClosed() },
  });

  onCleanup(() => currentController?.abort());

  return [response, { mutate, refetch, mutateCache, mutateBoth }];
}


