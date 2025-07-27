import { IndexedDB } from "../api";
import { assert } from "../assert";
import { assertFunction } from "../functionUtils";
import { TokenBucket } from "../TokenBucket";
import { FetchSettings } from "./FetchSettings";

const fetchRateLimits = {
  "animeThemes": new TokenBucket({
    start: 90,
    limit: 90,
    interval: 60,
    defaultDelay: 20,
  }),
  "anilist": new TokenBucket({
    start: 5,
    limit: 5,
    interval: 2,
    defaultDelay: 20,
    pool: new TokenBucket({
      start: 60,
      limit: 90,
      interval: 60,
      fillAmount: 60,
    })
  }),
  "jikan": new TokenBucket({
    start: 1,
    limit: 1,
    interval: 1/3,
    defaultDelay: 1,
    pool: new TokenBucket({
      start: 3,
      limit: 3,
      interval: 1.25,
      pool: new TokenBucket({
        start: 60,
        limit: 60,
        interval: 60,
        fillAmount: 60,
      })
    })
  }),
}

export class Fetch {
  /** @type {number} - Date.getTime() of when to expire the cache data */
  expires;
  /** @type {undefined|(object) => any} - Format the response data if needed */
  #formatResponse;
  /** @type {undefined|(data: Fetch) => Fetch} - Format the loaded data from cache before returning it */
  #formatLoad;
  /** @type {undefined|(newData: Fetch, oldData: null|Fetch) => Fetch} - Format the saved data before saving it to cache */
  #formatSave;
  #controller;
  #signal;
  /** @type {FetchSettings} - settings for fething caching */
  #settings;
  #cacheKeyGeneratorObject;
  constructor(url, { method = "POST", headers, body }, formatResponse) {
    assert(url, "Url missing");
    assert(method, "Method missing");
    if (method === "POST") assert(body, "Body is missing");

    const defaultHeader = { "Content-Type": "application/json" }
    this.url = url;
    this.method = method;
    this.headers = headers || defaultHeader;
    this.body = body;
    this.fromCache = true;
    this.#formatResponse = formatResponse;
    this.#settings = new FetchSettings({ storeName: "results", type: "fetch-once", expiresInSeconds: 60 * 60 * 24 * 365 });

    this.cacheKey = this.#generateCacheKey(this);
  }

  clone() {
    const fetchClone = new Fetch(this.url, this, this.#formatResponse);

    fetchClone.#cacheKeyGeneratorObject = this.#cacheKeyGeneratorObject;
    fetchClone.#formatLoad = this.#formatLoad 
    fetchClone.#formatResponse = this.#formatResponse;
    fetchClone.#formatSave = this.#formatSave;
    fetchClone.#settings = this.#settings;
    fetchClone.cacheKey = this.cacheKey;
    fetchClone.data = this.data;
    fetchClone.fromCache = this.fromCache;

    return fetchClone;
  }


  setCacheKeyGenerator(generatorCallback) {
    const cacheKeyObj = generatorCallback(structuredClone({ url: this.url, body: this.body }));
    this.#cacheKeyGeneratorObject = cacheKeyObj;
    this.cacheKey = this.#generateCacheKey(cacheKeyObj);
    return this;
  }

  setFormatLoad(callback) {
    this.#formatLoad = callback;
    this.cacheKey = this.#generateCacheKey(this.#cacheKeyGeneratorObject || this);
    return this;
  }

  /**
   * @param {(newData: Fetch, oldData: null|Fetch) => Fetch} callback
   */
  setFormatSave(callback) {
    this.#formatSave = callback;
    this.cacheKey = this.#generateCacheKey(this.#cacheKeyGeneratorObject || this);
    return this;
  }

  /**
   * @param {(data: Fetch) => void} success
   * @param {() => void} error
   */
  load(success, error) {
    assertFunction(success);

    const cacheReq = IndexedDB.fetchCache();
    cacheReq.onerror = error;
    cacheReq.onsuccess = evt => {
      const db = evt.target.result;
      const store = IndexedDB.store(db, this.#settings.storeName, "readonly");
      const getReg = store.get(this.cacheKey);
      getReg.onerror = error;
      getReg.onsuccess = evt => {
        if (evt.target.result) {
          assert(evt.target.result.expires, "Cache should have a expiration date");
          assert(evt.target.result.data, "Cache should always have data");

          if (evt.target.result.expires > new Date()) {
            if (this.#formatLoad) {
              const cacheData = this.#formatLoad({ ...evt.target.result, fromCache: true });
              return success(cacheData);
            } else {
              return success({ ...evt.target.result, fromCache: true });
            }
          } 
        }

        error?.();
      };
    }
  }

  /**
   * @param {Fetch} data
   * @param {undefined|() => any} afterSaveCallback
   */
  save(data, afterSaveCallback) {
    if (this.#formatSave) {
      const success = cacheData => this.#save(this.#formatSave(data, cacheData), afterSaveCallback);
      const noCacheDataFound = () => this.#save(this.#formatSave(data, null), afterSaveCallback);

      this.load(success, noCacheDataFound);
    } else {
      this.#save(data, afterSaveCallback);
    }
  }

  /**
   * @param {Fetch} data
   * @param {undefined|() => any} afterSaveCallback
   */
  #save(data, afterSaveCallback) {
    const cacheReq = IndexedDB.fetchCache();
    cacheReq.onerror = afterSaveCallback;
    cacheReq.onsuccess = evt => {
      const db = evt.target.result;
      const store = IndexedDB.store(db, this.#settings.storeName, "readwrite", afterSaveCallback, afterSaveCallback);
      store.put(data);
    }
  }


  #generateCacheKey(keyObject) {
    let key = `${keyObject.url}-${this.method}`;
    if (keyObject.body) {
      const body = JSON.stringify(keyObject.body).replaceAll("\"", "");
      key += body;
    }
    if (this.headers) {
      const headers = JSON.stringify(this.headers).replaceAll("\"", "");
      key += headers;
    }
    if (this.#formatResponse) {
      const formatResponse = this.#formatResponse.toString().replace(/[\n\t\r ]+/g, "");
      key += formatResponse;
    }
    if (this.#formatSave) {
      const formatSave = this.#formatSave.toString().replace(/[\n\t\r ]+/g, "");
      key += formatSave;
    }
    if (this.#formatLoad) {
      const formatLoad = this.#formatLoad.toString().replace(/[\n\t\r ]+/g, "");
      key += formatLoad;
    }

    return key;
  }

  #getFetchRateLimitBucket() {
    if (this.url.startsWith("https://graphql.anilist.co")) {
      return fetchRateLimits["anilist"];
    } else if (this.url.startsWith("https://api.jikan.moe")) {
      return fetchRateLimits["jikan"];
    } else if (this.url.startsWith("https://api.animethemes.moe")) {
      return fetchRateLimits["animeThemes"];
    } else {
      assert(false, `Fetch to url "${this.url}" does not have any rate limits`);
    }
  }

  abort() {
    this.#controller?.abort();
  }

  /** 
   * @param {FetchSettings} settings
   * @returns {Fetch}
  */
  setSettings(settings) {
    this.#settings = new FetchSettings({ ...this.#settings, ...settings });
    return this;
  }

  getSettings() {
    return this.#settings;
  }

  async send() {
    const bucket = this.#getFetchRateLimitBucket();
    this.#controller = new AbortController();
    this.#signal = this.#controller.signal;

    const response = await bucket.enqueue(async () => {
      while(true) {
        if (this.#signal.aborted) {
          return null;
        }

        if (document.hidden) {
          const { promise, resolve } = Promise.withResolvers();
          document.addEventListener("visibilitychange", resolve, { once: true });
          await promise;
        }

        const token = bucket.requestToken();
        if (!token) {
          await Promise.race([
            bucket.getsNextToken(),
            new Promise(res => this.#signal.addEventListener("abort", res))
          ]);
          continue;
        }

        const response = await this.#sendRequest();

        if (response.status === 429) {
          console.warn('429 received, backing off...', this.url);
          const time = (parseInt(response.headers.get("Retry-After")) || bucket.getDefaultDelay());
          await new Promise(res => setTimeout(res, time * 1000));
          continue;
        } 

        return response;
      }
    });

    if (response == null) {
      return null;
    }

    this.status = response.status;

    if (!response.ok) {
      this.error = true;
      return this;
    }

    const json = await response.json(); 
    this.data = this.#formatResponse?.(json) || json;
    this.fromCache = false;
    return this;
  }

  #sendRequest() {
    const opt = {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      cache: "default",
    }

    if (Math.random() > 1) {
      console.log("Error route")
      return fetch("http://127.0.0.1:3000/api/version", opt);
    } else {
      return fetch(this.url, opt);
    }
  }

  static anilist(query, variables = {}, formatResponse) {
    return Fetch.authAnilist(null, query, variables, formatResponse);
  }

  static authAnilist(token, query, variables = {}, formatResponse) {
    assert(query.length > 10, "Query must be above of length 10");
    const headers = { 
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }

    return new Fetch("https://graphql.anilist.co", {
      method: "POST",
      headers,
      body: {
        query,
        variables,
      },
    }, formatResponse);
  }

  static getJson(url, formatResponse) {
    return new Fetch(url, {
      method: "GET",
      cache: "default",
      headers: { "Content-Type": "application/json" },
    }, formatResponse);
  }
}
