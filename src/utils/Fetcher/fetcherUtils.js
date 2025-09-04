import { createComputed, createEffect, createMemo, createRenderEffect, createSignal, on, untrack } from "solid-js";
import { assertFunction, unwrapFunction } from "../functionUtils";
import { Fetcher } from "./Fetcher";
import { asserts, localizations } from "../utils.js";

/**
 * @param {(any) => Fetcher} fetcherCreator
 */
const createFetcherWithArguments = (fetcherCreator, args) => {
  assertFunction(fetcherCreator);

  const unwrapperArgs = [];
  for (const arg of args) {
    const value = unwrapFunction(arg);
    if (value === undefined) {
      return;
    }

    unwrapperArgs.push(value);
  }

  return fetcherCreator(...unwrapperArgs);
}

/**
 * @param {(fetcherCreator, args) => Fetcher} createWithArgs
 * @param {(args) => Fetcher} fetcherCreator
 * @param {Array<any>} args
 */
const fetcherSignal = (createWithArgs, fetcherCreator, args) => {
  const [fetcher, setFetcher] = createSignal();

  createRenderEffect(() => {
    const fetcher = createWithArgs(fetcherCreator, args);
    if (fetcher) {
      setFetcher(fetcher);
    }
  });

  return [fetcher, setFetcher];
}

/**
 * @param {(any) => Fetcher} fetcherCreator
 */
const createPagelessFetcherWithArguments = (fetcherCreator, args) => {
  const fetcher = createFetcherWithArguments(fetcherCreator, args);
  if (fetcher) {
    fetcher.options.body.variables.page = "pageless";
    fetcher.settings.type = "only-if-cached";
  }
  return fetcher;
}

/**
 * @param {(any) => Fetcher} fetcherCreator
 */
export const createSignalFetcher = (fetcherCreator, ...args) => {
  const [fetcher] = fetcherSignal(createFetcherWithArguments, fetcherCreator, args);
  return fetcher;
}

/**
 * @param {(any) => Fetcher} fetcherCreator
 */
export const createAnilistPagelessSignalFetcher = (fetcherCreator, ...args) => {
  const [fetcher] = fetcherSignal(createPagelessFetcherWithArguments, fetcherCreator, args);
  return fetcher;
}

export const activationController = (signal, creationFunction, ...args) => {
  const fetcher = creationFunction(...args);
  const value = () => {
    if (signal()) {
      return fetcher();
    }
    return undefined;
  }

  return value;
}

export const cacheOnly = (cacheOnlySignal, creationFunction, ...args) => {
  const [fetcher, setFetcher] = fetcherSignal(createFetcherWithArguments, creationFunction, args);

  let previousType;
  const switchCacheType = localFetcher => {
    if (localFetcher) {
      [previousType, localFetcher.settings.type] = [localFetcher.settings.type, previousType];
    }
  }

  let refreshFetcherWhenActive;
  createRenderEffect(on(fetcher, f => {
    previousType = localizations.onlyIfCached;
    refreshFetcherWhenActive = !cacheOnlySignal();
    if (refreshFetcherWhenActive) {
      switchCacheType(f);
    }
  }));

  createRenderEffect(on(cacheOnlySignal, currentState => {
    asserts.assertFalse(!currentState && refreshFetcherWhenActive);

    if (refreshFetcherWhenActive) {
      asserts.assertTrue(currentState);
      refreshFetcherWhenActive = false;
      previousType = localizations.onlyIfCached;
      const fetcher = switchCacheType(createFetcherWithArguments(creationFunction, args));
      asserts.assertTrue(fetcher, "This might cause a weird edge case but not sure if this will ever really happen.");
      setFetcher(fetcher);
    } else {
      switchCacheType(untrack(fetcher));
    }
  }, { defer: true }));


  return fetcher;
}

export const defaultOrCacheOnly = (defaultSignal, cacheOnlySignal, creationFunction, ...args) => {
  const [fetcher, setFetcher] = fetcherSignal(createFetcherWithArguments, creationFunction, args);

  let originalType, updateDefault, updateFresh;
  createRenderEffect(on(fetcher, localFetcher => {
    originalType = updateDefault = updateFresh = null;
    if (!localFetcher) {
      return;
    };

    originalType = localFetcher.settings.type;
    if (!defaultSignal() && !cacheOnlySignal()) {
      return;
    }

    if (cacheOnlySignal()) {
      updateDefault = updateFresh = true;
      localFetcher.settings.type = localizations.onlyIfCached;
    } else if (defaultSignal()) {
      updateFresh = true;
      localFetcher.settings.type = localizations.defaultVal;
    }
  }));

  createRenderEffect(on(() => [defaultSignal(), cacheOnlySignal()], ([defaultState, cacheState]) => {
    const localFetcher = untrack(fetcher);
    if (!localFetcher) {
      return;
    }

    asserts.assertTrue(originalType);

    if (cacheState) {
      localFetcher.settings.type = localizations.onlyIfCached;
    } else if (defaultState) {
      if (updateDefault) {
        const fetcher = createFetcherWithArguments(creationFunction, args);
        if (fetcher) {
          fetcher.settings.type = localizations.defaultVal;
          updateDefault = false;
          setFetcher(fetcher);
        }
      } else {
        localFetcher.settings.type = localizations.defaultVal;
      }
    } else {
      if (updateFresh) {
        const fetcher = createFetcherWithArguments(creationFunction, args);
        if (fetcher) {
          fetcher.settings.type = originalType
          updateDefault = updateFresh = false;
          setFetcher(fetcher);
        }
      } else {
        localFetcher.settings.type = originalType;
      }
    }
  }, { defer: true }));

  return fetcher;
}

/**
 * @typedef {Object} CacheTypeObject
 * @property {undefined | import("solid-js").Accessor<boolean>} [no-store]
 *    Skips cache entirely and fetches fresh data.
 * @property {undefined | import("solid-js").Accessor<boolean>} [reload]
 *    Always fetches fresh data and updates the cache.
 * @property {undefined | import("solid-js").Accessor<boolean>} [fetch-once]
 *    Always fetches fresh data once and after that use the cache.
 * @property {undefined | import("solid-js").Accessor<boolean>} [default]
 *    Uses the cache if data exists; otherwise, fetches from the server.
 * @property {undefined | import("solid-js").Accessor<boolean>} [only-if-cached]
 *    Serves data from cache only; returns null if no cache exists.
 */

/**
 * Creates a dynamic cache type configuration.
 *
 * @param {CacheTypeObject} cacheTypeObjects - The cache behavior configuration.
 * @returns {}
 */
export const dynamicCacheType = cacheTypeObjects => {
    // *     1 - `"no-store"`: Skips cache entirely and fetches fresh data.
    // *     1 - `"reload"`: Always fetches fresh data and updates the cache.
    // *     2 - `"fetch-once"`: Always fetches fresh data once and after that use the cache.
    // *     3 - `"default"`: Uses the cache if data exists; otherwise, fetches from the server.
    // *     4 - `"only-if-cached"`: Serves data from cache only; returns null if no cache exists.
  return createMemo(() => {
    if (cacheTypeObjects[localizations.onlyIfCached]?.()) {
      return localizations.onlyIfCached;
    }
    if (cacheTypeObjects[localizations.defaultVal]?.()) {
      return localizations.defaultVal;
    }
    if (cacheTypeObjects[localizations.fetchOnce]?.()) {
      return localizations.fetchOnce;
    }
    if (cacheTypeObjects[localizations.reload]?.()) {
      return localizations.reload;
    }
    if (cacheTypeObjects[localizations.noStore]?.()) {
      return localizations.noStore;
    }
  });
}

export const changeCacheType = (fetcher, type) => {
  if (fetcher) {
    fetcher.settings.type = type;
  }

  return fetcher;
}
