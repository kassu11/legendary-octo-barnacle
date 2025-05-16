import { batch, createEffect, createSignal, untrack } from "solid-js";
import * as querys from "./querys";
import { assert } from "./assert";
import { getDates } from "./dates";
const DEBUG = location.origin.includes("localhost");

const reloadCache = cacheBuilder({ storeName: "results", type:"reload", expiresInSeconds: 60 * 60 * 24 * 365 });
const fastReload = cacheBuilder({ storeName: "results", type:"reload", expiresInSeconds: 60 * 60 * 7 });
const fetchOnce = cacheBuilder({ storeName: "results", type: "fetch-once", expiresInSeconds: 60 * 60 * 24 * 365 });
const onlyIfCache = cacheBuilder({ storeName: "results", type: "only-if-cached", expiresInSeconds: 60 * 60 * 24 * 365 });
// const noCache = cacheBuilder({ type: "no-store" });
// const debugCache = cacheBuilder({ storeName: "debug", fetchOnDebug: true, type: "fetch-once", expiresInSeconds: 60 });

const fetchRateLimits = {
  anilist: {
    retry: null,
    limit: 60,
    remaining: 60,
    pending: 0,
    burstLimit: 5,
    burstTime: 1200,
    burstBus: [],
  }
}

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
      return Fetch.getJson(querys.myAnimeListAnimeById(id), res => res.data);
    }),
    mangaById: fetchOnce(id => {
      return Fetch.getJson(querys.myAnimeListMangaById(id), res => res.data);
    }),
    animeCharactersById: fetchOnce(id => {
      return Fetch.getJson(querys.myAnimeListAnimeCharactersById(id), res => res.data);
    }),
    mangaCharactersById: fetchOnce(id => {
      return Fetch.getJson(querys.myAnimeListMangaCharactersById(id), res => res.data);
    }),
    animeStaffById: fetchOnce(id => {
      return Fetch.getJson(querys.myAnimeListAnimeStaffById(id));
    }),
    mangaStaffById: fetchOnce(id => {
      return Fetch.getJson(querys.myAnimeListMangaStaffById(id));
    }),
  },
  anilist: {
    mediaId: reloadCache((id, token) => {
      return Fetch.authAnilist(token, querys.anilistMediaById, { id, perPage: 6 });
    }),
    userByName: reloadCache((name, token) => {
      assert(name, "Name is missing");
      return Fetch.authAnilist(token, querys.getUserByName, { name }, res => res.data.User);
    }),
    toggleFollow: async (token, id) => {
      assert(id, "id is missing");
      const request = Fetch.authAnilist(token, querys.anilistToggleFollow, { id }, res => res.data.ToggleFollow);
      return await request.send();
    },
    userFollowing: reloadCache((id, page = 1, token) => {
      assert(id, "id is missing");
      return Fetch.authAnilist(token, querys.anilistGetUserFollowing, { id, page }, res => res.data.Page);
    }),
    userAnimeStats: reloadCache((name, token) => {
      return Fetch.authAnilist(token, querys.anilistGetUserAnimeStats, { name }, res => res.data.User.statistics.anime);
    }),
    userMangaStats: reloadCache((name, token) => {
      return Fetch.authAnilist(token, querys.anilistGetUserMangaStats, { name }, res => res.data.User.statistics.manga);
    }),
    userAnimeGenres: reloadCache((name, token) => {
      return Fetch.authAnilist(token, querys.anilistGetUserAnimeGenres, { name }, res => res.data.User.statistics.anime.genres);
    }),
    userMangaGenres: reloadCache((name, token) => {
      return Fetch.authAnilist(token, querys.anilistGetUserMangaGenres, { name }, res => res.data.User.statistics.manga.genres);
    }),
    userAnimeTags: reloadCache((name, token) => {
      return Fetch.authAnilist(token, querys.anilistGetUserAnimeTags, { name }, res => res.data.User.statistics.anime.tags);
    }),
    userMangaTags: reloadCache((name, token) => {
      return Fetch.authAnilist(token, querys.anilistGetUserMangaTags, { name }, res => res.data.User.statistics.manga.tags);
    }),
    userAnimeStudios: reloadCache((name, token) => {
      return Fetch.authAnilist(token, querys.anilistGetUserAnimeStudios, { name }, res => res.data.User.statistics.anime.studios);
    }),
    userMangaStudios: reloadCache((name, token) => {
      return Fetch.authAnilist(token, querys.anilistGetUserMangaStudios, { name }, res => res.data.User.statistics.manga.studios);
    }),
    userAnimeStaff: reloadCache((name, token) => {
      return Fetch.authAnilist(token, querys.anilistGetUserAnimeStaff, { name }, res => res.data.User.statistics.anime.staff);
    }),
    userMangaStaff: reloadCache((name, token) => {
      return Fetch.authAnilist(token, querys.anilistGetUserMangaStaff, { name }, res => res.data.User.statistics.manga.staff);
    }),
    mediaIds: fetchOnce((ids, token) => {
      return Fetch.authAnilist(token, querys.anilistGetMediaIds(ids), { ids }, res => Object.values(res.data).map(page => page.media).flat());
    }),
    userFollowers: reloadCache((id, page = 1, token) => {
      assert(id, "id is missing");
      return Fetch.authAnilist(token, querys.anilistGetUserFollowers, { id, page }, res => res.data.Page);
    }),
    activityByUserId: reloadCache((id, token) => {
      assert(id, "Id is missing");
      return Fetch.authAnilist(token, querys.profileActivity, { id });
    }),
    activityById: reloadCache((id, token) => {
      assert(id, "Id is missing");
      return Fetch.authAnilist(token, querys.anilistActivityById, { id }, res => res.data.Activity);
    }),
    activityRepliesById: reloadCache((id, page, token) => {
      assert(id, "Id is missing");
      return Fetch.authAnilist(token, querys.anilistActivityRepliedById, { id, page }, res => res.data.Page);
    }),
    notifications: fastReload((token, type, page = 1) => {
      switch(type) {
        case "airing": return Fetch.authAnilist(token, querys.anilistUserNotifications, {
          page,
          "types": [
            "AIRING"
          ]
        }, res => res.data.Page); 
        case "activity": return Fetch.authAnilist(token, querys.anilistUserNotifications, {
          page,
          "types": [
            "ACTIVITY_MESSAGE",
            "ACTIVITY_MENTION",
            "ACTIVITY_REPLY",
            "ACTIVITY_LIKE",
            "ACTIVITY_REPLY_LIKE"
          ]
        }, res => res.data.Page); 
        case "forum": return Fetch.authAnilist(token, querys.anilistUserNotifications, {
          page,
          "types": [
            "THREAD_COMMENT_REPLY",
            "THREAD_SUBSCRIBED",
            "THREAD_COMMENT_MENTION",
            "THREAD_LIKE",
            "THREAD_COMMENT_LIKE"
          ]
        }, res => res.data.Page); 
        case "follows": return Fetch.authAnilist(token, querys.anilistUserNotifications, {
          page,
          "types": [
            "FOLLOWING"
          ]
        }, res => res.data.Page); 
        case "media": return Fetch.authAnilist(token, querys.anilistUserNotifications, {
          page,
          "types": [
            "RELATED_MEDIA_ADDITION",
            "MEDIA_DATA_CHANGE",
            "MEDIA_MERGE",
            "MEDIA_DELETION"
          ]
        }, res => res.data.Page); 
        case "all": 
        default: return Fetch.authAnilist(token, querys.anilistUserNotifications, { page }, res => res.data.Page);  
      }
    }),
    mediaListByUserId: reloadCache((id, type, token) => {
      assert(id, "Id is missing");
      return Fetch.authAnilist(token, querys.anilistUserMediaList, {
        "userId": id,
        "type": type,
      }, res => res.data.MediaListCollection);
    }),
    favouritesByUserId: reloadCache((id, page, token) => {
      assert(id, "Id is missing");
      assert(page, "Page is missing");
      return Fetch.authAnilist(token, querys.anilistUserFavouriteById, { id, page }, res => res.data.User.favourites);
    }),
    mutateFavourites: async (token, variables) => {
      const request = Fetch.authAnilist(token, querys.anilistUserMutateFavourites, variables);
      return await request.send();
    },
    characterInfoById: reloadCache((id, token) => {
      return Fetch.authAnilist(token, querys.anilistCharacterById, { id }, response => response.data.Character);
    }),
    characterMediaById: reloadCache((token, id, variables = {}) => { 
      return Fetch.authAnilist(token, querys.anilistCharacterById, {
        ...variables, 
        "page": variables.page || 1,
        "sort": variables.sort || "POPULARITY_DESC",
        "onList": variables.onList || null,
        "withRoles": variables.withRoles || true,
        id,
      }, response => response.data.Character.media);
    }),
    staffInfoById: reloadCache((id, token) => {
      return Fetch.authAnilist(token, querys.anilistStaffById, { id }, (response) => response.data.Staff);
    }),
    staffCharactersById: reloadCache((token, id, variables = {}) => {
      return Fetch.authAnilist(token, querys.anilistStaffById, { 
        ...variables, 
        "characterPage": variables.characterPage || 1,
        "sort": variables.sort || "START_DATE_DESC",
        "onList": variables.onList || null,
        "withCharacterRoles": true,
        id,
      }, (response) => response.data.Staff.characterMedia);
    }),
    staffMediaById: reloadCache((token, id, type, variables) => {
      return Fetch.authAnilist(token, querys.anilistStaffById, { 
        ...variables, 
        "staffPage": variables.staffPage || 1,
        "sort": variables.sort || "START_DATE_DESC",
        "onList": variables.onList || null,
        "withStaffRoles": true,
        id,
        type,
      }, (response) => response.data.Staff.staffMedia);
    }),
    genresAndTags: reloadCache(() => {
      return Fetch.anilist(querys.anilistGenresAndTags);
    }),
    externalSources: reloadCache(type => {
      return Fetch.anilist(querys.anilistExternalSources, { type: type || undefined });
    }),
    characters: reloadCache((id, page = 1, token) => {
      return Fetch.authAnilist(token, querys.anilistCharacters, { id, page }, response => response.data.Media);
    }),
    allMediaStaff: reloadCache((id, page = 1, token) => {
      return Fetch.authAnilist(token, querys.anilistStaff, { id, page }, res => res.data.Media);
    }),
    trendingMedia: reloadCache((token) => {
      const dates = getDates();
      return Fetch.authAnilist(token, querys.trendingMedia, {
        "season": dates.season,
        "seasonYear": dates.seasonYear,
        "nextSeason": dates.nextSeason,
        "nextYear": dates.nextYear,
      });
    }),
    trendingAnime: reloadCache((token) => {
      const dates = getDates();
      return Fetch.authAnilist(token, querys.trendingAnime, {
        "type": "ANIME",
        "season": dates.season,
        "seasonYear": dates.seasonYear,
        "nextSeason": dates.nextSeason,
        "nextYear": dates.nextYear,
      });
    }),
    trendingManga: reloadCache((token) => {
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
    getActivity: reloadCache((token, variables) => {
      return Fetch.authAnilist(token, querys.anilistActivity, variables);
    }),
    searchMedia: fetchOnce((token, variables) => {
      return Fetch.authAnilist(token, querys.searchMedia, variables, (response) => response.data.Page);
    }),
    searchMediaCache: onlyIfCache((token, variables) => {
      return Fetch.authAnilist(token, querys.searchMedia, variables, (response) => response.data.Page);
    }),
    friendsMediaScore: reloadCache((token, id, variables) => {
      return Fetch.authAnilist(token, querys.anilistGetFriendMediaScore, {id, ...variables});
    }),
    mutateMedia: async (token, variables) => {
      assert(token, "Token is missing");
      assert(typeof token !== "function", "This specific api doesnt support signals");
      assert(variables, "Variables missing");
      assert(variables.id || variables.mediaId, "No mutation id given");
      const request = Fetch.authAnilist(token, querys.anilistMutateMedia, variables, res => res.data.SaveMediaListEntry);
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
    wachingAnime: reloadCache((id, token) => {
      return Fetch.authAnilist(token, querys.currentWachingMedia, {
        "userId": id, "type": "ANIME", "perPage": 40
      });
    }),
    readingManga: reloadCache((id, token) => {
      return Fetch.authAnilist(token, querys.currentWachingMedia, {
        "userId": id, "type": "MANGA", "perPage": 40
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

    if (this.url === "https://graphql.anilist.co") {
      const now = performance.now();
      const times = fetchRateLimits.anilist.burstBus.filter(time => (now - time) < fetchRateLimits.anilist.burstTime);
      if (times.length >= fetchRateLimits.anilist.burstLimit) {
        const newTime = times.at(-fetchRateLimits.anilist.burstLimit) + fetchRateLimits.anilist.burstTime + 100;
        const delta = newTime - now;
        assert(delta >= 0, "Delta is negative");
        times.push(now + delta);
        fetchRateLimits.anilist.burstBus = times;
        await new Promise(res => setTimeout(res, delta));
      } else {
        times.push(now);
        fetchRateLimits.anilist.burstBus = times;
      }
    }

    try {
      const response = await fetch(this.url, opt);
      this.status = response.status;
      if (DEBUG && this.url === "https://graphql.anilist.co" && Number(response.headers.get("X-RateLimit-Remaining")) < 5) {
        console.log("headers Retry-After:", response.headers.get("Retry-After"));
        console.log("headers X-RateLimit-Limit:", response.headers.get("X-RateLimit-Limit"));
        console.log("headers X-RateLimit-Remaining:", response.headers.get("X-RateLimit-Remaining"));
        console.log("headers X-RateLimit-Reset:", response.headers.get("X-RateLimit-Reset"));
        }
      // for(const [key, val] of response.headers.entries()) {
      //   console.log(`Header "${key}" value:`, val);
      // }
      if (!response.ok) {
        if (DEBUG && this.url === "https://graphql.anilist.co") {
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

  static getJson(url, formatResponse) {
    return new Fetch(url, {
      method: "GET",
      cache: "default",
      headers: { "Content-Type": "application/json" },
    }, formatResponse);
  }
}

const localFetchCacheStorage = new Map();
const currentlyFetching = new Map();

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

      const mutateCache = (mutateData, callback) => {
        if (typeof mutateData === "function") {
          mutateData = mutateData(untrack(data));
        }
        // Create a deepcopy because onsuccess events are not instant so mutations could leak into cache.
        mutateData = structuredClone(mutateData);

        assert(untrack(data) !== null || settings.type !== "only-if-cached", "Can't mutate null data");
        assert(typeof mutateData === "object", "Data should always be JSON object data");


        if (settings.type !== "no-store") {
          localFetchCacheStorage.set(request.cacheKey, mutateData);

          if (settings.storeName) {
            const cacheReq = IndexedDB.fetchCache();
            cacheReq.onsuccess = evt => {
              const db = evt.target.result;
              const store = IndexedDB.store(db, settings.storeName, "readwrite");
              const putReq = store.put(mutateData);
              if (callback) {
                putReq.onsuccess = callback;
              }
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

        if (!currentlyFetching.has(request.cacheKey)) {
          currentlyFetching.set(request.cacheKey, request.send());
        }
        const data = await currentlyFetching.get(request.cacheKey);
        currentlyFetching.delete(request.cacheKey);
        if (settings.expiresInSeconds) {
          const time = new Date();
          data.expires = time.setSeconds(time.getSeconds() + settings.expiresInSeconds);
        }

        batch(() => {
          if (!data.error) {
            mutateCache(data);
          } else {
            setError(true);
            console.assert(!DEBUG, "Fetch error, not saving data to cache");
          }

          setLoading(false);
          saveMutate(data);
        });
      }

      createEffect(() => {
        const options = fetchOptions.map(option => typeof option == "function" ? option() : option);
        if (options.some(option => option === undefined)) {
          return; // Don't fetch if you have undefined values
        };

        request = fetchCallback(...options);
        if (DEBUG) {
          console.log("Fetching", settings.type, request.body || request.url);
        }

        setLoading(true);
        setError(false);

        const localCacheData = localFetchCacheStorage.get(request.cacheKey);
        if (localCacheData && localCacheData.expires > new Date()) {
          saveMutate({ ...localCacheData, fromCache: true });
          if (settings.type === "fetch-once") { 
            setLoading(false);
            return;
          } else if(fetchOnStart === false) {
            setLoading(false);
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
                  if (fetchOnStart == false) {
                    setLoading(false);
                  }
                  const cacheData = { ...evt.target.result, fromCache: true };
                  localFetchCacheStorage.set(cacheData.cacheKey, cacheData);
                  return saveMutate(cacheData);
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
