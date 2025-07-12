import { batch, createEffect, createSignal, onCleanup, untrack } from "solid-js";
import { assertFunction, unwrapFunction } from "../functionUtils";
import { IndexedDB } from "../api";
import { assert } from "../assert";
import { FetchSettings } from "./FetchSettings";
import { Fetch } from "./Fetch";

const DEBUG = location.origin.includes("localhost");

export const createSignalFetcher = (fetcherCreater, ...args) => {
  assertFunction(fetcherCreater);

  const [fetcher, setFetcher] = createSignal();

  createEffect(() => {
    const unwrapperArgs = [];
    for(const arg of args) {
      const value = unwrapFunction(arg);
      if (value === undefined) {
        return;
      }

      unwrapperArgs.push(value);
    }

    setFetcher(fetcherCreater(...unwrapperArgs));
  });

  return fetcher;
}

const localFetchCacheStorage = new Map();
const currentlyFetching = new Map();

/**
 * @param {() => Fetch} fetcherSignal - Fetch to be send
 * @param {FetchSettings} [overwriteSettings] - Custom settings to overwrite fetch settings
 */
export const send = (fetcherSignal, overwriteSettings = {}) => {
  const [data, setData] = createSignal(undefined);
  const [error, setError] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [indexedDBClosed, setIndexedDBClosed] = createSignal(true);

  /** @type {Fetch} */
  let request = null;
  /** @type {FetchSettings} */
  let settings = {};

  /**
   * @param {Fetch|() => Fetch} mutateData
   * @param {() => any} callback
   */
  const mutateCache = (mutateData, callback) => {
    if (typeof mutateData === "function") {
      mutateData = mutateData(untrack(data));
    }
    // Create a deepcopy because onsuccess events are not instant so mutations could leak into cache.
    mutateData = structuredClone(mutateData);

    assert(untrack(data) !== null || settings.type !== "only-if-cached", "Can't mutate null data");
    assert(typeof mutateData === "object", "Data should always be JSON object data");


    if (settings.type !== "no-store") {
      localFetchCacheStorage.set(request.cacheKey, mutateData);

      if (settings.storeName) {
        setIndexedDBClosed(false);
        request.save(mutateData, () => {
          setIndexedDBClosed(true);
          callback?.();
        });
        // const cacheReq = IndexedDB.fetchCache();
        // cacheReq.onsuccess = evt => {
        //   const db = evt.target.result;
        //   const store = IndexedDB.store(db, settings.storeName, "readwrite", () => setIndexedDBClosed(true), () => setIndexedDBClosed(true));
        //   const putReq = store.put(mutateData);
        //   if (callback) {
        //     putReq.onsuccess = callback;
        //   }
        // }
      }
    }
  }

  const safeMutate = mutateData => {
    if (mutateData.cacheKey === request.cacheKey) {
      setData(mutateData);
    }
  }

  const mutate = mutateData => {
    if (typeof mutateData === "function") {
      mutateData = mutateData(untrack(data));
    }

    setData(mutateData);
  }

  const refetch = async () => {
    if (settings.type === "only-if-cached") {
      setLoading(false);
      return setData(null);
    }

    if (!currentlyFetching.has(request.cacheKey)) {
      currentlyFetching.set(request.cacheKey, request.send());
    }
    const data = await currentlyFetching.get(request.cacheKey);
    currentlyFetching.delete(request.cacheKey);

    if (data === null) { // Data should be only null if signal aborted
      return;
    }

    if (settings.expiresInSeconds) {
      const time = new Date();
      data.expires = time.setSeconds(time.getSeconds() + settings.expiresInSeconds);
    }

    batch(() => {
      if (!data.error) {
        mutateCache(data);
        safeMutate(data);
      } else {
        setError(true);
        console.assert(!DEBUG, "Fetch error, not saving data to cache");
      }

      setLoading(false);
    });
  }

  createEffect(() => {
    if (!fetcherSignal() || overwriteSettings.active?.() === false) {
      return;
    };

    request?.abort();

    request = fetcherSignal();
    settings = request.setSettings(overwriteSettings).getSettings();
    const checkCacheBeforeFetch = settings.type == "default" || settings.type == "only-if-cached";
    const fetchOnStart = (DEBUG == false || settings.fetchOnDebug || settings.type == "no-store" || !settings.storeName) && checkCacheBeforeFetch == false;
    if (DEBUG) {
      console.log("Fetching", settings.type, request.body || request.url);
    }

    batch(() => {
      setLoading(true);
      setError(false);
    });

    const localCacheData = localFetchCacheStorage.get(request.cacheKey);
    if (localCacheData && localCacheData.expires > new Date()) {
      safeMutate({ ...localCacheData, fromCache: true });
      if (settings.type === "fetch-once") { 
        setLoading(false);
        return;
      } else if(fetchOnStart === false) {
        setLoading(false);
      }
    } else if (settings.type !== "no-store" && settings.storeName) {
      const success = cacheData => {
        safeMutate(cacheData);
        if (fetchOnStart == false) {
          setLoading(false);
        }
      };
      request.load(success, refetch);
      // const cacheReq = IndexedDB.fetchCache();
      // cacheReq.onerror = refetch;
      // cacheReq.onsuccess = evt => {
      //   const db = evt.target.result;
      //   const store = IndexedDB.store(db, settings.storeName, "readonly");
      //   const getReg = store.get(request.cacheKey);
      //   getReg.onerror = refetch;
      //   getReg.onsuccess = evt => {
      //     if (evt.target.result) {
      //       assert(evt.target.result.expires, "Cache should have a expiration date");
      //       assert(evt.target.result.data, "Cache should always have data");
      //
      //       if (evt.target.result.expires > new Date()) {
      //         if (fetchOnStart == false) {
      //           setLoading(false);
      //         }
      //         const cacheData = { ...evt.target.result, fromCache: true };
      //         if (settings.type !== "only-if-cached") {
      //           localFetchCacheStorage.set(cacheData.cacheKey, cacheData);
      //         }
      //         return saveMutate(cacheData);
      //       }
      //     } 
      //
      //     if (fetchOnStart == false) {
      //       refetch();
      //     }
      //   };
      // }
    } else if (fetchOnStart == false) {
      refetch();
    } 

    if (fetchOnStart) {
      refetch();
    }
  });

  Object.defineProperties(data, {
    error: { get: () => error() },
    loading: { get: () => loading() },
    indexedDBClosed: { get: () => indexedDBClosed() },
  });

  onCleanup(() => request?.abort());

  return [data, { mutate, refetch, mutateCache }];
}
