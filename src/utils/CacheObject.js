import { IndexedDB } from "./api";
import { assert } from "./assert";
import { Fetcher } from "./Fetcher/Fetcher.js";

export class CacheObject {
  /**
  * @param {Fetcher} fetcher
  * @param {object} data
  */
  constructor(fetcher, data) {
    assert(data, "Don't cache empty data");
    assert(fetcher.settings.expiresInSeconds, "Expiration date is missing");

    this.data = data;
    this.cacheKey = fetcher.cacheKey;
    const time = new Date();
    this.expires = time.setSeconds(time.getSeconds() + fetcher.settings.expiresInSeconds);
  }
}
