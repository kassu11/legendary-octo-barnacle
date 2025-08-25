import { IndexedDB } from "./api";
import { Fetcher } from "./Fetcher/Fetcher.js";
import { asserts } from "./utils.js";

export class CacheObject {
  /**
  * @param {Fetcher} fetcher
  * @param {object} data
  */
  constructor(fetcher, data) {
    asserts.assertTrue(data, "Don't cache empty data");
    asserts.assertTrue(fetcher.settings.expiresInSeconds, "Expiration date is missing");

    this.data = data;
    this.cacheKey = fetcher.cacheKey;
    const time = new Date();
    this.expires = time.setSeconds(time.getSeconds() + fetcher.settings.expiresInSeconds);
  }
}
