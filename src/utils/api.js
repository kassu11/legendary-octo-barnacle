import { createEffect, createSignal } from "solid-js";
import * as querys from "./querys";
const DEBUG = location.origin.includes("localhost");

const normalCache = cacheBuilder({ storeName: "results" });
const fetchOnce = cacheBuilder({ fetchOnce: true, storeName: "results" });
const noCache = cacheBuilder({ noCache: true });
const debugCache = cacheBuilder({ storeName: "debug", fetchOnDebug: true, fetchOnce: true });

const api = {
  anilist: {
    mediaId: normalCache(id => {
      return Fetch.anilist(querys.anilistMediaById, { id, perPage: 6 });
    }),
    characterId: normalCache(id => {
      return Fetch.anilist(querys.anilistCharacterById, {
        id,
        "page": 1,
        "sort": "POPULARITY_DESC",
        "onList": null,
        "withRoles": true
      });
    }),
    trendingAnime: normalCache(() => {
      return Fetch.anilist(querys.trendingAnime, {
        "type": "ANIME",
        "season": "WINTER",
        "seasonYear": 2025,
        "nextSeason": "SPRING",
        "nextYear": 2025
      });
    }),
    getAuthUserData: normalCache(token => {
      return Fetch.authAnilist(token, querys.currentUser);
    }),
    searchMedia: fetchOnce((token, variables) => {
      return Fetch.authAnilist(token, querys.searchMedia, variables);
    }),
    mutateMedia: noCache((token, variables) => {
      return Fetch.authAnilist(token, querys.anilistMutateMedia, variables);
    }),
    wachingAnime: normalCache((id, token) => {
      return Fetch.authAnilist(token, querys.currentWachingMedia, {
        "userId": id, "type": "ANIME", "perPage": 40
      });
    }),
    readingManga: normalCache((id, token) => {
      return Fetch.authAnilist(token, querys.currentWachingMedia, {
        "userId": id, "type": "MANGA", "perPage": 40
      });
    }),
    topAnime: normalCache(() => {
      return Fetch.anilist(querys.searchMedia, { 
        "page": 1, "type": "ANIME", "sort": "POPULARITY_DESC" 
      });
    }),
    topManga: normalCache(() => {
      return Fetch.anilist(querys.searchMedia, { 
        "page": 1, "type": "MANGA", "sort": "POPULARITY_DESC" 
      });
    }),
  },
};

export default api;


class Fetch {
  constructor(url, { method = "POST", headers, body }) {
    console.assert(url, "Url missing");
    console.assert(method, "Method missing");
    if (method === "POST") console.assert(body, "Body is missing");

    const defaultHeader = { "Content-Type": "application/json" }
    this.url = url;
    this.method = method;
    this.headers = headers || defaultHeader;
    this.body = body;
    this.fromCache = true;

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

    return key;
  }

  async send() {
    const opt = {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
    }

    const response = await fetch(this.url, opt);
    this.data = await response.json();
    this.fromCache = false;
    return this;
  }

  static anilist(query, variables = {}) {
    return Fetch.authAnilist(null, query, variables);
  }

  static authAnilist(token, query, variables = {}) {
    console.assert(query.length > 10, "Query must be above of length 10");
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
    });
  }
}

const localFetchCacheStorage = new Map();

/**
 * @param {{ storeName: "results"|"debug", fetchOnce: boolean, fetchOnDebug: boolean, noCache: boolean }} settings
 */
function cacheBuilder(settings) {
  settings.storeName ??= "debug";
  settings.fetchOnDebug ??= false;
  settings.fetchOnce ??= false;
  settings.noCache ??= false;

  /**
   * @param {(fetchOptions: any[]) => Fetch} fetchCallback
   */
  return function cache(fetchCallback) {
    return (...fetchOptions) => {
      const [data, setData] = createSignal(undefined);
      let request = null;
      const fetchOnStart = DEBUG == false || settings.fetchOnDebug || settings.noCache;

      const mutateCache = mutateData => {
        if (typeof mutateData === "function") {
          mutateData = mutateData(data());
        }


        if (settings.noCache == false) {
          localFetchCacheStorage.set(request.cacheKey, mutateData);
          const cacheReq = IndexedDB.fetchCache();
          cacheReq.onsuccess = evt => {
            const db = evt.target.result;
            const store = IndexedDB.store(db, settings.storeName, "readwrite");
            store.put(mutateData);
          }
        }
      }

      const mutate = mutateData => {
        if (typeof mutateData === "function") {
          mutateData = mutateData(data());
        }

        mutateCache(mutateData);
        setData(mutateData);
      }

      const refetch = async () => {
        const data = await request.send();
        mutate(data);
      }

      createEffect(() => {
        const options = fetchOptions.map(option => typeof option == "function" ? option() : option);
        request = fetchCallback(...options);
        if (options.some(option => option === undefined)) {
          return; // Don't fetch if you have undefined values
        };

        if (localFetchCacheStorage.has(request.cacheKey)) {
          setData({ ...localFetchCacheStorage.get(request.cacheKey), fromCache: true });
          if (settings.fetchOnce) { return }
        }

        if (fetchOnStart) {
          refetch();
        }

        if (settings.noCache != true) {
          const cacheReq = IndexedDB.fetchCache();
          cacheReq.onerror = refetch;
          cacheReq.onsuccess = evt => {
            const db = evt.target.result;
            const store = IndexedDB.store(db, settings.storeName, "readonly");
            const getReg = store.get(request.cacheKey);
            getReg.onerror = refetch;
            getReg.onsuccess = evt => {
              if (evt.target.result) {
                console.assert(evt.target.result.exspires, "Cache should have a expiration date");
                console.assert(evt.target.result.data, "Cache should always have data");
                setData({ ...evt.target.result, fromCache: true });
              } else if (fetchOnStart == false) {
                refetch();
              }
            };
          }
        }
      });

      return [data, { mutate, refetch, mutateCache }];
    }
  }
}

export class IndexedDB {
  static #createStore(db, name, key) {
    if (!db.objectStoreNames.contains(name)) {
      db.createObjectStore(name, key);
    }
  }

  static store(db, storeName, mode, error) {
    const tx = db.transaction(storeName, mode);
    if (error) { tx.onerror = error; }
    else { tx.onerror = console.warn; }
    const store = tx.objectStore(storeName);

    return store;
  }

  static fetchCache(errorCallback) {
    const request = indexedDB.open("MyAniList-cache", 2);
    if (errorCallback) request.onerror = errorCallback;

    request.onupgradeneeded = evt => {
      const db = evt.target.result;
      switch(evt.oldVersion) {
        case 0: {
          IndexedDB.#createStore(db, "results", { keyPath: "cacheKey" });
        }
        case 1: {
          IndexedDB.#createStore(db, "debug", { keyPath: "cacheKey" });
        }
      }
    };

    return request;
  }


  static user(errorCallback) {
    const request = indexedDB.open("MyAniList-users", 1);
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
