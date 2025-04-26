import { createEffect, createSignal, untrack } from "solid-js";
import * as querys from "./querys";
import { assert } from "./assert";
import { getDates } from "./dates";
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
    animeCharactersById: fetchOnce(id => {
      return Fetch.getJson(querys.myAnimeListAnimeCharactersById(id));
    }),
    mangaCharactersById: fetchOnce(id => {
      return Fetch.getJson(querys.myAnimeListMangaCharactersById(id));
    }),
  },
  anilist: {
    mediaId: fetchOnce((id, token) => {
      return Fetch.authAnilist(token, querys.anilistMediaById, { id, perPage: 6 });
    }),
    userByName: fetchOnce((name, token) => {
      assert(name, "Name is missing");
      return Fetch.authAnilist(token, querys.getUserByName, { name });
    }),
    activityByUserId: fetchOnce((id, token) => {
      assert(id, "Id is missing");
      return Fetch.authAnilist(token, querys.profileActivity, { id });
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
    staffInfoById: fetchOnce(id => {
      return Fetch.anilist(querys.anilistStaffById, { id }, (response) => response.data.Staff);
    }),
    staffCharactersById: fetchOnce((token, id, variables) => {
      return Fetch.authAnilist(token, querys.anilistStaffById, { 
        "characterPage": 1,
        "sort": "START_DATE_DESC",
        "onList": null,
        "withCharacterRoles": true,
        ...variables, 
        id,
      });
    }),
    staffMediaById: fetchOnce((token, id, type, variables) => {
      return Fetch.authAnilist(token, querys.anilistStaffById, { 
        "staffPage": 1,
        "sort": "START_DATE_DESC",
        "onList": null,
        "withStaffRoles": true,
        ...variables, 
        id,
        type,
      });
    }),
    genresAndTags: fetchOnce(() => {
      return Fetch.anilist(querys.anilistGenresAndTags);
    }),
    externalSources: fetchOnce(type => {
      return Fetch.anilist(querys.anilistExternalSources, { type: type || undefined });
    }),
    characters: fetchOnce((id, page = 1) => {
      return Fetch.anilist(querys.anilistCharacters, { id, page });
    }),
    trendingMedia: fetchOnce((token) => {
      const dates = getDates();
      return Fetch.authAnilist(token, querys.trendingMedia, {
        "season": dates.season,
        "seasonYear": dates.seasonYear,
        "nextSeason": dates.nextSeason,
        "nextYear": dates.nextYear,
      });
    }),
    trendingAnime: fetchOnce((token) => {
      const dates = getDates();
      return Fetch.authAnilist(token, querys.trendingAnime, {
        "type": "ANIME",
        "season": dates.season,
        "seasonYear": dates.seasonYear,
        "nextSeason": dates.nextSeason,
        "nextYear": dates.nextYear,
      });
    }),
    trendingManga: fetchOnce((token) => {
      const dates = getDates();
      return Fetch.authAnilist(token, querys.trendingManga, {
        "type": "MANGA",
        "season": dates.season,
        "seasonYear": dates.seasonYear,
        "nextSeason": dates.nextSeason,
        "nextYear": dates.nextYear,
      });
    }),
    mediaListEntry: async (token, mediaId) => {
      assert(mediaId, "MediaId missing");
      assert(typeof token !== "function", "This specific api doesnt support signals");
      const request = Fetch.authAnilist(token, querys.mediaListEntry, { mediaId });
      return await request.send();
    },
    getAuthUserData: reloadCache(token => {
      return Fetch.authAnilist(token, querys.currentUser, {}, (response) => response.data.Viewer);
    }),
    getActivity: fetchOnce((token, variables) => {
      return Fetch.authAnilist(token, querys.anilistActivity, variables);
    }),
    searchMedia: fetchOnce((token, variables) => {
      return Fetch.authAnilist(token, querys.searchMedia, variables, (response) => response.data.Page);
    }),
    searchMediaCache: onlyIfCache((token, variables) => {
      return Fetch.authAnilist(token, querys.searchMedia, variables, (response) => response.data.Page);
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
  /** @type {undefined|(object) => any} - Formatthe response data if needed */
  #formatResponse;
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

  async send() {
    const opt = {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      cache: "default",
    }

    try {
      const response = await fetch(this.url, opt);
      this.status = response.status;
      // console.log("headers Retry-After:", response.headers.get("Retry-After"));
      // console.log("headers X-RateLimit-Limit:", response.headers.get("X-RateLimit-Limit"));
      // console.log("headers X-RateLimit-Remaining:", response.headers.get("X-RateLimit-Remaining"));
      // console.log("headers X-RateLimit-Reset:", response.headers.get("X-RateLimit-Reset"));
      // for(const [key, val] of response.headers.entries()) {
      //   console.log(`Header "${key}" value:`, val);
      // }
      if (!response.ok) {
        if (DEBUG && response.url === "https://graphql.anilist.co/") {
          const data = await response.json();
          console.error(...data.errors);
        }
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      if (this.#formatResponse) {
        this.data = this.#formatResponse(json);
      } else {
        this.data = json;
      }
      this.fromCache = false;
    }
    catch(err) {
      this.error = true;
      console.assert(!DEBUG, err);
    }
    return this;
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
      const [error, setError] = createSignal(false);
      const [loading, setLoading] = createSignal(false);

      let request = null;
      const checkCacheBeforeFetch = settings.type == "default" || settings.type == "only-if-cached";
      const fetchOnStart = (DEBUG == false || settings.fetchOnDebug || settings.type == "no-store" || !settings.storeName) && checkCacheBeforeFetch == false;

      const mutateCache = mutateData => {
        if (typeof mutateData === "function") {
          mutateData = mutateData(untrack(data));
        }

        assert(untrack(data) !== null || settings.type !== "only-if-cached", "Can't mutate null data");
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

      const saveMutate = mutateData => {
        if (mutateData.cacheKey === request.cacheKey) {
          setData(mutateData);
        }
      }

      const mutate = mutateData => {
        if (typeof mutateData === "function") {
          mutateData = mutateData(untrack(data));
        }

        setData(mutateData);
      }

      const refetch = async () => {
        if (settings.type === "only-if-cached") {
          setLoading(false);
          return setData(null);
        }

        const data = await request.send();
        if (settings.expiresInSeconds) {
          const time = new Date();
          data.expires = time.setSeconds(time.getSeconds() + settings.expiresInSeconds);
        }

        setLoading(false);
        saveMutate(data);

        if (!data.error) {
          mutateCache(data);
        } else {
          setError(true);
          console.assert(!DEBUG, "Fetch error, not saving data to cache");
        }
      }

      createEffect(() => {
        const options = fetchOptions.map(option => typeof option == "function" ? option() : option);
        request = fetchCallback(...options);
        if (options.some(option => option === undefined)) {
          return; // Don't fetch if you have undefined values
        };

        if (DEBUG) {
          console.log("Fetching", settings.type, request.body);
        }

        setLoading(true);
        setError(false);

        const data = localFetchCacheStorage.get(request.cacheKey);
        if (data && data.expires > new Date()) {
          saveMutate({ ...data, fromCache: true });
          if (settings.type === "fetch-once") { 
            setLoading(false);
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
                  setLoading(false);
                  return saveMutate({ ...evt.target.result, fromCache: true });
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

      Object.defineProperties(data, {
        error: { get: () => error() },
        loading: { get: () => loading() },
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
