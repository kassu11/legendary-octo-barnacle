import { assertFunction } from "../functionUtils";
import { CacheObject } from "../CacheObject";
import { asserts } from "../utils";

/**
* @typedef {Object} FetchSettingsOptions - Cache settings.
* @property {"results"|"debug"} storeName - The name of the store in IndexedDB. If not provided, data will not be stored in IndexedDB.
* @property {boolean} fetchOnDebug - Determines whether data should be fetched in debug mode.
* @property {number} expiresInSeconds - The duration (in seconds) before cached data expires. Once expired, the data will not be served from cache, as outdated data is considered worse than waiting for fresh data.
* @property {(cache: CacheObject) => void} [saveToSessionStorage] - Object you can do what ever you want. All data that is going to store cache will go through this method
* @property {"default"|"fetch-once"|"no-store"|"only-if-cached"|"reload"} type - A cache strategy inspired by the Fetch API's {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/cache Request.cache} property. Unlike fetch, expired cache entries are never returned.
*     - `"default"`: Uses the cache if data exists; otherwise, fetches from the server.
*     - `"fetch-once"`: Always fetches fresh data once and after that use the cache.
*     - `"no-store"`: Skips cache entirely and fetches fresh data.
*     - `"only-if-cached"`: Serves data from cache only; returns null if no cache exists.
*     - `"reload"`: Always fetches fresh data and updates the cache.
*/

export class FetchSettings {
  constructor(/** @type {FetchSettingsOptions} */settings = {}) {
    this.expiresInSeconds = settings.expiresInSeconds;
    this.fetchOnDebug = settings.fetchOnDebug || false;
    this.storeName = settings.storeName || "";
    this.type = settings.type || "default"; 
    this.saveToSessionStorage = settings.saveToSessionStorage;

    asserts.assertTrue(typeof settings === "object", "Settings must be object");
    asserts.assertTrue(!settings.active || typeof settings.active === "function", "settings.active should a signal");
    asserts.assertTrue(settings.type === "no-store" || Number.isInteger(settings.expiresInSeconds), "Give explicit expiration time. 0 if the data never expires");
    asserts.assertTrue(settings.type === "no-store" || settings.expiresInSeconds > 0, "Expiration time should be more than 0");
    asserts.assertTrue(settings.type !== "no-store" || !settings.storeName, "StoreName is not used because cache type is no-store");
    asserts.assertTrue(!settings.saveToSessionStorage || typeof settings.saveToSessionStorage === "function", "saveToSessionStorage is not function");
  }
}
