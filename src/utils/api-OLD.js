import { asserts } from "../collections/collections.js";
import * as queries from "../collections/querys";
import { TokenBucket } from "./TokenBucket";

const fetchRateLimits = {
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
}

const apiOLD = {
  anilist: {
    mutateMedia: async (token, variables) => {
      asserts.assertTrueOLD(token, "Token is missing");
      asserts.assertTrueOLD(typeof token !== "function", "This specific api doesnt support signals");
      asserts.assertTrueOLD(variables, "Variables missing");
      asserts.assertTrueOLD(variables.id || variables.mediaId, "No mutation id given");
      const request = Fetch.authAnilist(token, queries.anilistMutateMedia, variables, res => res.data.SaveMediaListEntry);
      return await request.send();
    },
    deleteMediaListEntry: async (token, id) => {
      asserts.assertTrueOLD(token, "Token is missing");
      asserts.assertTrueOLD(typeof token !== "function", "This specific api doesnt support signals");
      asserts.assertTrueOLD(id !== undefined, "Variables missing");
      const request = Fetch.authAnilist(token, queries.anilistDeleteMediaListEntry, { id });
      return await request.send();
    },
    toggleActivityLike: async (token, variables) => {
      asserts.assertTrueOLD(token, "Token is missing");
      asserts.assertTrueOLD(variables, "Variables missing");
      asserts.assertTrueOLD(typeof token !== "function", "This specific api doesnt support signals");
      asserts.assertTrueOLD(variables.id || variables.mediaId, "No mutation id given");
      const request = Fetch.authAnilist(token, queries.anilistMutateToggleLike, {...variables, type: "ACTIVITY"});
      return await request.send();
    },
    toggleFavourite: async (token, variables) => {
      asserts.assertTrueOLD(token, "Token is missing");
      asserts.assertTrueOLD(variables, "Variables missing");
      asserts.assertTrueOLD(typeof token !== "function", "This specific api doesnt support signals");
      const request = Fetch.authAnilist(token, queries.anilistMutateToggleFavourite, variables);
      return await request.send();
    },
  },
};

export default apiOLD;


class Fetch {
  /** @type {number} - Date.getTime() of when to expire the cache data */
  expires;
  /** @type {undefined|(object) => any} - Formatthe response data if needed */
  #formatResponse;
  #controller;
  #signal;
  constructor(url, { method = "POST", headers, body }, formatResponse) {
    asserts.assertTrueOLD(url, "Url missing");
    asserts.assertTrueOLD(method, "Method missing");
    if (method === "POST") asserts.assertTrueOLD(body, "Body is missing");

    const defaultHeader = { "Content-Type": "application/json" }
    this.url = url;
    this.method = method;
    this.headers = headers || defaultHeader;
    this.body = body;
    this.fromCache = true;
    this.#formatResponse = formatResponse;

    this.cacheKey = this.#generateCacheKey();
  }

  #generateCacheKey() {
    let key = `${this.url}-${this.method}`;
    if (this.body) {
      const body = JSON.stringify(this.body).replaceAll("\"", "");
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

    return key;
  }

  #getFetchRateLimitBucket() {
    if (this.url.startsWith("https://graphql.anilist.co")) {
      return fetchRateLimits["anilist"];
    } else {
      asserts.assertTrueOLD(false, `Fetch to url "${this.url}" does not have any rate limits`);
    }
  }

  abort() {
    this.#controller?.abort();
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
          console.warn("429 received, backing off...", this.url);
          const time = (parseInt(response.headers.get("Retry-After")) || bucket.getDefaultDelay());
          await new Promise(res => setTimeout(res, time * 1000));
          continue;
        }

        if (response.status === 500 && this.url.includes("anilist")) {
          console.warn("500 received, the request was probably fine, but anilist has lot of traffic. Resend after 2 seconds");
          await new Promise(res => setTimeout(res, 2000));
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
    asserts.assertTrueOLD(query.length > 10, "Query must be above of length 10");
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


/**
 * @param {Object} settings - Cache settings.
 * @param {"results"|"debug"} settings.storeName - The name of the store in IndexedDB. If not provided, data will not be stored in IndexedDB.
 * @param {boolean} settings.fetchOnDebug - Determines whether data should be fetched in debug mode.
 * @param {number} settings.expiresInSeconds - The duration (in seconds) before cached data expires. Once expired, the data will not be served from cache, as outdated data is considered worse than waiting for fresh data.
 * @param {"default"|"fetch-once"|"no-store"|"only-if-cached"|"reload"} settings.type - A cache strategy inspired by the Fetch API's {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/cache Request.cache} property. Unlike fetch, expired cache entries are never returned.
 *     - `"default"`: Uses the cache if data exists; otherwise, fetches from the server.
 *     - `"fetch-once"`: Always fetches fresh data once and after that use the cache.
 *     - `"no-store"`: Skips cache entirely and fetches fresh data.
 *     - `"only-if-cached"`: Serves data from cache only; returns null if no cache exists.
 *     - `"reload"`: Always fetches fresh data and updates the cache.
 */

export class IndexedDB {
  static #createStore(db, name, key) {
    if (!db.objectStoreNames.contains(name)) {
      db.createObjectStore(name, key);
    }
  }

  static store(db, storeName, mode, error, complete) {
    const tx = db.transaction(storeName, mode);
    if (error) {
      tx.onerror = error;
    } else {
      tx.onerror = console.warn;
    }
    if (complete) {
      tx.oncomplete = complete;
    }
    const store = tx.objectStore(storeName);

    return store;
  }

  static fetchCache(errorCallback) {
    const request = indexedDB.open("legendary-octo-barnacle-cache", 2);
    if (errorCallback) request.onerror = errorCallback;

    request.onupgradeneeded = evt => {
      const db = evt.target.result;
      switch(evt.oldVersion) {
        case 0: {
          IndexedDB.#createStore(db, "results", { keyPath: "cacheKey" });
          // fallthrough
        }
        case 1: {
          IndexedDB.#createStore(db, "debug", { keyPath: "cacheKey" });
        }
      }
    };

    return request;
  }


  static user(errorCallback) {
    const request = indexedDB.open("legendary-octo-barnacle-users", 1);
    if (errorCallback) request.onerror = errorCallback;

    request.onupgradeneeded = evt => {
      const db = evt.target.result;
      switch(evt.oldVersion) {
        case 0: {
          IndexedDB.#createStore(db, "data");
        }
      }
    };

    return request;
  }
}
