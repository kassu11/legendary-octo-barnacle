import { createMemo } from "solid-js";
import { functionUtils } from "./utils.js";
import { asserts, localizations } from "../collections/collections.js";

const createFetcherWithArguments = (fetcherCreator, args) => {
  asserts.isTypeFunction(fetcherCreator);

  const unwrapperArgs = [];
  for (const arg of args) {
    const value = functionUtils.unwrapFunction(arg);
    if (value === undefined) {
      return;
    }

    unwrapperArgs.push(value);
  }

  return fetcherCreator(...unwrapperArgs);
}

/**
 * @param {(any) => Fetcher} fetcherCreator
 */
export const createFetcher = (fetcherCreator, ...args) => {
  return createMemo(() => createFetcherWithArguments(fetcherCreator, args));
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

// *     1 - `"no-store"`: Skips cache entirely and fetches fresh data.
// *     1 - `"reload"`: Always fetches fresh data and updates the cache.
// *     2 - `"fetch-once"`: Always fetches fresh data once and after that use the cache.
// *     3 - `"default"`: Uses the cache if data exists; otherwise, fetches from the server.
// *     4 - `"only-if-cached"`: Serves data from cache only; returns null if no cache exists.
const cacheTypesInLeastFetchableOrder = [localizations.onlyIfCached, localizations.defaultVal, localizations.fetchOnce, localizations.reload, localizations.noStore];
/**
 * Creates a dynamic cache type configuration.
 *
 * @param {CacheTypeObject} cacheTypeObjects - The cache behavior configuration.
 * @returns {}
 */
export const createDynamicCacheType = cacheTypeObjects => {
  return createMemo(() => {
    for (const cacheTypeName of cacheTypesInLeastFetchableOrder) {
      if (functionUtils.unwrapFunction(cacheTypeObjects[cacheTypeName])) {
        return cacheTypeName;
      }
    }
  });
}
