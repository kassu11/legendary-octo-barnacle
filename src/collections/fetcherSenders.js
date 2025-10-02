import { batch, createMemo, createRenderEffect, createSignal, onCleanup, untrack } from "solid-js";
import { fetcherUtils } from "../utils/utils.js";
import { asserts, modes, signals } from "./collections.js";
import { CacheObject } from "../utils/CacheObject.js";
import { IndexedDB } from "../utils/api.js";

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

/** @type {Object.<string, CacheObject>} */
const cacheObjects = {};

export const sendWithNullUpdates = fetcherSignal => sendGeneric(() => null, false, () => false, false, fetcherSignal);
export const sendWithCacheTypeWithoutNullUpdates = (cacheTypeSignal, fetcherSignal) => sendGeneric(cacheTypeSignal, true, () => false, false, fetcherSignal);
export const sendWithDisabledSignal = (disabledSignal, fetcherSignal) => sendGeneric(() => null, true, disabledSignal, false, fetcherSignal);


/**
 * @param {boolean} disableNullValues - When true cache only calls that are not found will return null
 */
const sendGeneric = (cacheTypeSignal, disableNullValues, senderDisabledSignal, enableDebugLogs, fetcherSignal) => {
  asserts.isTypeFunction(cacheTypeSignal, "cacheTypeSignal is not a function");
  asserts.isTypeFunction(senderDisabledSignal, "senderDisabledSignal is not a function");
  asserts.isTypeFunction(fetcherSignal, "fetcherSignal is not a function");

  /** @type {[() => null|ApiResponse, (ApiResponse) => void, (ApiResponse) => void]} */
  const [response, setResponse, setResponseWithoutUpdate] = signals.createCustomSignal(undefined);
  const [error, setError] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [indexedDBClosed, setIndexedDBClosed] = createSignal(true);
  /** @type {null|fetcherUtils.Fetcher} */
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

  const refetch = async (fetcher, type) => {
    if (fetcher !== currentFetcher) {
      return;
    }
    asserts.assertTrue(fetcher, "fetcher should not be undefined");
    if (type === "only-if-cached") {
      batch(() => {
        if (!disableNullValues) {
          setResponse(new ApiResponse(fetcher.cacheKey, null));
          setLoading(false);
        }
      });
      return;
    }

    currentController?.abort();
    const controller = new AbortController();
    currentController = controller;
    const data = await fetcherUtils.fetchData(fetcher, controller.signal);

    if (data === null) { // Data should be only null if signal aborted or error
      if (fetcher === currentFetcher) {
        batch(() => {
          setError(true);
          setLoading(false);
          if (!controller.signal.aborted && !disableNullValues) {
            setResponse(new ApiResponse(fetcher.cacheKey, null));
          }
        });
      }
    } else {
      batch(() => {
        const response = new ApiResponse(fetcher.cacheKey, data);
        mutateCache(response);
        safeMutate(response);
        if (fetcher === currentFetcher) {
          setLoading(false);
        }
      });
    }
  }

  const cacheType = createMemo(prev => {
    const fetcher = fetcherSignal();
    const type = cacheTypeSignal() || fetcher?.settings.type || prev;

    if (currentFetcher !== fetcher) {
      return type;
    }

    asserts.isTypeString(prev, "prev", "If fetcher is same as currentFetcher why is there no previous cacheType");

    // 1 = Highest fresh data
    // 4 = Lowest cache data
    // *     1 - `"no-store"`: Skips cache entirely and fetches fresh data.
    // *     1 - `"reload"`: Always fetches fresh data and updates the cache.
    // *     2 - `"fetch-once"`: Always fetches fresh data once and after that use the cache.
    // *     3 - `"default"`: Uses the cache if data exists; otherwise, fetches from the server.
    // *     4 - `"only-if-cached"`: Serves data from cache only; returns null if no cache exists.
    switch(prev) {
      case "only-if-cached": {
        if (type === "default") return type;
      }
      case "default": {
        if (type === "fetch-once") return type;
      }
      case "fetch-once": {
        if (type === "reload" || type === "no-store") return type;
      }
    }
    return prev;
  });

  const isDisabled = createMemo(() => {
    const fetcher = fetcherSignal();
    const disabled = senderDisabledSignal();

    if (currentFetcher !== fetcher) {
      return disabled;
    }

    return false;
  });

  createRenderEffect(() => {
    const fetcher = fetcherSignal();
    if (!fetcher || isDisabled()) {
      return;
    };

    asserts.assertTrue(fetcher instanceof fetcherUtils.Fetcher);

    const type = cacheType();
    asserts.isTypeString(type, "caheType");
    const isOnDebugSoDontFetch = modes.debug && !fetcher.settings.fetchOnDebug && type !== "no-store";
    const sendFetchEvenWhenCacheIsFound = !isOnDebugSoDontFetch && (type === "fetch-once" || type === "reload" || type === "no-store");
    const cacheKey = fetcher.cacheKey;

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
      const safeRefetch = () => !sendFetchEvenWhenCacheIsFound && refetch(fetcher, type);
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
      refetch(fetcher, type);
    }
  });

  Object.defineProperties(response, {
    error: { get: () => error() },
    loading: { get: () => loading() },
    indexedDBClosed: { get: () => indexedDBClosed() },
  });

  onCleanup(() => currentController?.abort());

  return [response, { mutate, refetch: () => refetch(untrack(fetcherSignal), untrack(fetcherSignal).settings.type), mutateCache, mutateBoth }];
}
