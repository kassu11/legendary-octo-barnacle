/**
* @typedef {Object} FetchSettingsOptions - Cache settings.
* @property {"results"|"debug"} storeName - The name of the store in IndexedDB. If not provided, data will not be stored in IndexedDB.
* @property {boolean} fetchOnDebug - Determines whether data should be fetched in debug mode.
* @property {() => boolean} [active] - Only active fetch request will send a request (even if the request of cache only)
* @property {number} expiresInSeconds - The duration (in seconds) before cached data expires. Once expired, the data will not be served from cache, as outdated data is considered worse than waiting for fresh data.
* @property {"default"|"fetch-once"|"no-store"|"only-if-cached"|"reload"} type - A cache strategy inspired by the Fetch API's {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/cache Request.cache} property. Unlike fetch, expired cache entries are never returned.
*     - `"default"`: Uses the cache if data exists; otherwise, fetches from the server.
*     - `"fetch-once"`: Always fetches fresh data once and after that use the cache.
*     - `"no-store"`: Skips cache entirely and fetches fresh data.
*     - `"only-if-cached"`: Serves data from cache only; returns null if no cache exists.
*     - `"reload"`: Always fetches fresh data and updates the cache.
*/

import { assert } from "../assert";

export class FetchSettings {
  constructor(/** @type {FetchSettingsOptions} */settings = {} ) {
    this.expiresInSeconds = settings.expiresInSeconds;
    this.fetchOnDebug = settings.fetchOnDebug || false;
    this.storeName = settings.storeName || "";
    this.type = settings.type || "default"; 
    this.active = settings.active;

    assert(typeof settings === "object", "Settings must be object");
    assert(!settings.active || typeof settings.active === "function", "settings.active should a signal");
    assert(settings.type === "no-store" || Number.isInteger(settings.expiresInSeconds), "Give explisite expiration time. 0 if the data never expires");
    assert(settings.type === "no-store" || settings.expiresInSeconds > 0, "Expiration time should be more than 0");
    assert(settings.type !== "no-store" || !settings.storeName, "StoreName is not used because cache type is no-store");
  }
}
