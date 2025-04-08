import { createEffect, createSignal } from "solid-js";
import * as querys from "./querys";
import { assert } from "./assert";
const DEBUG = location.origin.includes("localhost");

const reloadCache = cacheBuilder({ storeName: "results", type:"reload", expiresInSeconds: 60 * 60 * 24 * 365 });
const fetchOnce = cacheBuilder({ storeName: "results", type: "fetch-once", expiresInSeconds: 60 * 60 * 24 * 365 });
const onlyIfCache = cacheBuilder({ storeName: "results", type: "only-if-cached", expiresInSeconds: 60 * 60 * 24 * 365 });
// const noCache = cacheBuilder({ type: "no-store" });
// const debugCache = cacheBuilder({ storeName: "debug", fetchOnDebug: true, type: "fetch-once", expiresInSeconds: 60 });

const api = {
  animeThemes: {
    themesByAniListId: fetchOnce(id => {
      return Fetch.getJson(querys.animeThemesById(id));
    }),
    artisBySlug: fetchOnce(slug => {
      return Fetch.getJson(querys.animeThemesByArtisSlug(slug));
    }),
  },
  myAnimeList: {
    animeById: fetchOnce(id => {
      return Fetch.getJson(querys.myAnimeListAnimeById(id));
    }),
    mangaById: fetchOnce(id => {
      return Fetch.getJson(querys.myAnimeListMangaById(id));
    }),
  },
  anilist: {
    mediaId: fetchOnce((id, token) => {
      return Fetch.authAnilist(token, querys.anilistMediaById, { id, perPage: 6 });
    }),
    characterId: fetchOnce(id => {
      return Fetch.anilist(querys.anilistCharacterById, {
        id,
        "page": 1,
        "sort": "POPULARITY_DESC",
        "onList": null,
        "withRoles": true
      });
    }),
    characters: fetchOnce((id, page = 1) => {
      return Fetch.anilist(querys.anilistCharacters, { id, page });
    }),
    trendingAnime: fetchOnce(() => {
      return Fetch.anilist(querys.trendingAnime, {
        "type": "ANIME",
        "season": "WINTER",
        "seasonYear": 2025,
        "nextSeason": "SPRING",
        "nextYear": 2025
      });
    }),
    mediaListEntry: async (token, mediaId) => {
      assert(mediaId, "MediaId missing");
      assert(typeof token !== "function", "This specific api doesnt support signals");
      const request = Fetch.authAnilist(token, querys.mediaListEntry, { mediaId });
      return await request.send();
    },
    getAuthUserData: reloadCache(token => {
      return Fetch.authAnilist(token, querys.currentUser);
    }),
    getActivity: fetchOnce((token, variables) => {
      return Fetch.authAnilist(token, querys.anilistActivity, variables);
    }),
    searchMedia: fetchOnce((token, variables) => {
      return Fetch.authAnilist(token, querys.searchMedia, variables);
    }),
    searchMediaCache: onlyIfCache((token, variables) => {
      return Fetch.authAnilist(token, querys.searchMedia, variables);
    }),
    friendsMediaScore: fetchOnce((token, id, variables) => {
      return Fetch.authAnilist(token, querys.anilistGetFriendMediaScore, {id, ...variables});
    }),
    mutateMedia: async (token, variables) => {
      assert(token, "Token is missing");
      assert(typeof token !== "function", "This specific api doesnt support signals");
      assert(variables, "Variables missing");
      assert(variables.id || variables.mediaId, "No mutation id given");
      const request = Fetch.authAnilist(token, querys.anilistMutateMedia, variables);
      return await request.send();
    },
    deleteMediaListEntry: async (token, id) => {
      assert(token, "Token is missing");
      assert(typeof token !== "function", "This specific api doesnt support signals");
      assert(id !== undefined, "Variables missing");
      const request = Fetch.authAnilist(token, querys.anilistDeleteMediaListEntry, { id });
      return await request.send();
    },
    toggleActivityLike: async (token, variables) => {
      assert(token, "Token is missing");
      assert(variables, "Variables missing");
      assert(typeof token !== "function", "This specific api doesnt support signals");
      assert(variables.id || variables.mediaId, "No mutation id given");
      const request = Fetch.authAnilist(token, querys.anilistMutateToggleLike, {...variables, type: "ACTIVITY"});
      return await request.send();
    },
    toggleFavourite: async (token, variables) => {
      assert(token, "Token is missing");
      assert(variables, "Variables missing");
      assert(typeof token !== "function", "This specific api doesnt support signals");
      const request = Fetch.authAnilist(token, querys.anilistMutateToggleFavourite, variables);
      return await request.send();
    },
    wachingAnime: fetchOnce((id, token) => {
      return Fetch.authAnilist(token, querys.currentWachingMedia, {
        "userId": id, "type": "ANIME", "perPage": 40
      });
    }),
    readingManga: fetchOnce((id, token) => {
      return Fetch.authAnilist(token, querys.currentWachingMedia, {
        "userId": id, "type": "MANGA", "perPage": 40
      });
    }),
    topAnime: fetchOnce(() => {
      return Fetch.anilist(querys.searchMedia, { 
        "page": 1, "type": "ANIME", "sort": "POPULARITY_DESC" 
      });
    }),
    topManga: fetchOnce(() => {
      return Fetch.anilist(querys.searchMedia, { 
        "page": 1, "type": "MANGA", "sort": "POPULARITY_DESC" 
      });
    }),
  },
};

export default api;


class Fetch {
  /** @type {number} - Date.getTime() of when to expire the cache data */
  expires;
  constructor(url, { method = "POST", headers, body }) {
    assert(url, "Url missing");
    assert(method, "Method missing");
    if (method === "POST") assert(body, "Body is missing");

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
    });
  }

  static getJson(url) {
    return new Fetch(url, {
      method: "GET",
      cache: "default",
      headers: { "Content-Type": "application/json" },
    });
  }
}

const localFetchCacheStorage = new Map();

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
function cacheBuilder(settings) {
  settings.storeName ??= "";
  settings.fetchOnDebug ??= false;
  settings.type ??= "default"; 
  assert(settings.type === "no-store" || Number.isInteger(settings.expiresInSeconds), "Give explisite expiration time. 0 if the data never expires");
  assert(settings.type === "no-store" || settings.expiresInSeconds > 0, "Expiration time should be more than 0");
  assert(settings.type !== "no-store" || !settings.storeName, "StoreName is not used because cache type is no-store");

  /**
   * @param {(fetchOptions: any[]) => Fetch} fetchCallback
   */
  return function cache(fetchCallback) {
    return (...fetchOptions) => {
      const [data, setData] = createSignal(undefined);
      let request = null;
      const checkCacheBeforeFetch = settings.type == "default" || settings.type == "only-if-cached";
      const fetchOnStart = (DEBUG == false || settings.fetchOnDebug || settings.type == "no-store" || !settings.storeName) && checkCacheBeforeFetch == false;

      const mutateCache = mutateData => {
        if (typeof mutateData === "function") {
          mutateData = mutateData(data());
        }

        assert(data() !== null || settings.type !== "only-if-cached", "Can't mutate null data");
        assert(typeof mutateData === "object", "Data should always be JSON object data");


        if (settings.type !== "no-store") {
          localFetchCacheStorage.set(request.cacheKey, mutateData);

          if (settings.storeName) {
            const cacheReq = IndexedDB.fetchCache();
            cacheReq.onsuccess = evt => {
              const db = evt.target.result;
              const store = IndexedDB.store(db, settings.storeName, "readwrite");
              store.put(mutateData);
            }
          }
        }
      }

      const mutate = mutateData => {
        if (typeof mutateData === "function") {
          mutateData = mutateData(data());
        }

        setData(mutateData);
      }

      const refetch = async () => {
        if (settings.type === "only-if-cached") {
          return setData(null);
        }
        const requestCopy = request;
        const data = await request.send();
        if (settings.expiresInSeconds) {
          const time = new Date();
          data.expires = time.setSeconds(time.getSeconds() + settings.expiresInSeconds);
        }

        if (requestCopy === request) {
          mutate(data);
          mutateCache(data);
        }
      }

      createEffect(() => {
        const options = fetchOptions.map(option => typeof option == "function" ? option() : option);
        request = fetchCallback(...options);
        if (options.some(option => option === undefined)) {
          return; // Don't fetch if you have undefined values
        };

        if (DEBUG) {
          console.log("Fetching");
        }

        const data = localFetchCacheStorage.get(request.cacheKey);
        if (data && data.expires > new Date()) {
          setData({ ...data, fromCache: true });
          if (settings.type === "fetch-once") { 
            return;
          }
        } else if (settings.type !== "no-store" && settings.storeName) {
          const cacheReq = IndexedDB.fetchCache();
          cacheReq.onerror = refetch;
          cacheReq.onsuccess = evt => {
            const db = evt.target.result;
            const store = IndexedDB.store(db, settings.storeName, "readonly");
            const getReg = store.get(request.cacheKey);
            getReg.onerror = refetch;
            getReg.onsuccess = evt => {
              if (evt.target.result) {
                assert(evt.target.result.expires, "Cache should have a expiration date");
                assert(evt.target.result.data, "Cache should always have data");

                if (evt.target.result.expires > new Date()) {
                  return setData({ ...evt.target.result, fromCache: true });
                }
              } 

              if (fetchOnStart == false) {
                refetch();
              }
            };
          }
        } else if (fetchOnStart == false) {
          refetch();
        } 

        if (fetchOnStart) {
          refetch();
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
    const request = indexedDB.open("legendary-octo-barnacle-cache", 2);
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
