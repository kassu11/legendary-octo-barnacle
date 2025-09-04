import { dateUtils } from "./utils.js";
import { asserts } from "../collections/collections.js";

export class CacheObject {
  /**
  * @param {string} cacheKey
  * @param {expiresInSeconds} expiresInSeconds 
  * @param {object} data
  */
  constructor(cacheKey, expiresInSeconds, data) {
    asserts.assertTrue(cacheKey, "Missing cacheKey");
    asserts.assertTrue(data, "Don't cache empty data");
    asserts.assertTrue(expiresInSeconds, "Expiration date is missing");

    this.data = data;
    this.cacheKey = cacheKey;
    this.expires = dateUtils.nowPlusSeconds(expiresInSeconds);
  }
}
