import { dateUtils } from "./utils.js";
import { asserts } from "../collections/collections.js";

export class CacheObject {
  /**
  * @param {string} cacheKey
  * @param {expiresInSeconds} expiresInSeconds 
  * @param {object} data
  */
  constructor(cacheKey, expiresInSeconds, data) {
    asserts.assertTrueOLD(cacheKey, "Missing cacheKey");
    asserts.assertTrueOLD(data, "Don't cache empty data");
    asserts.assertTrueOLD(expiresInSeconds, "Expiration date is missing");

    this.data = data;
    this.cacheKey = cacheKey;
    this.expires = dateUtils.nowPlusSeconds(expiresInSeconds);
  }
}
