import { createEffect, createResource, createSignal } from "solid-js";
import * as querys from "./querys";
const DEBUG = location.origin.includes("localhost");

const api = {
  anilist: {
    mediaId: anilistGetMediaById,
    characterId: anilistGetCharacterById,
    trendingAnime: anilistTrendingAnime,
    getAuthUserData: anilistGetAuthUser,
    searchMedia: anilistSearchMedia,
    mutateMedia: anilistMutateMedia,
    wachingAnime: async (id, token) => {
      return anilistGetWatchingMedia(token, { "userId": id, "type": "ANIME", "perPage": 40 });
    },
    readingManga: async (id, token) => {
      return anilistGetWatchingMedia(token, { "userId": id, "type": "MANGA", "perPage": 40 });
    },
    topAnime: async () => { 
      return anilistSearchMedia(null, { "page": 1, "type": "ANIME", "sort": "POPULARITY_DESC" });
    },
    topManga: async () => { 
      return anilistSearchMedia(null, { "page": 1, "type": "MANGA", "sort": "POPULARITY_DESC" });
    },
  },
  createResource: (getQuery, fetchData) => {
    const data = createResource(getQuery, fetchData);
    createEffect(() => {
      if (!data[0].loading && data[0]?.()?.fromCache) {
        data[0]()["mutate"] = data[1].mutate;
      }
    });

    return data;
  }
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

  async send(saveToLocalCache = false) {
    const opt = {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
    }

    const response = await fetch(this.url, opt);
    this.data = await response.json();
    this.fromCache = false;
    if(saveToLocalCache) {
      localFetchCacheStorage.set(this.cacheKey, this);
    }
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
 * @param {Fetch} fetchObject
 */
async function cache(fetchObject, fetchOnce = false) {
  console.assert(fetchObject.cacheKey, "Cache key is missing");

  if (fetchOnce && localFetchCacheStorage.has(fetchObject.cacheKey)) {
    return localFetchCacheStorage.get(fetchObject.cacheKey);
  }

  const STORE_NAME = "results";
  const promise = new Promise((res, rej) => {
    const cacheReq = IndexedDB.fetchCache(rej)

    cacheReq.onsuccess = evt => {
      const db = evt.target.result;

      const store = IndexedDB.store(db, STORE_NAME, "readonly", rej);
      const getReg = store.get(fetchObject.cacheKey);
      getReg.onsuccess = async evt => {
        if(evt.target.result == null) {
          const data = await fetchObject.send(fetchOnce);

          const store = IndexedDB.store(db, STORE_NAME, "readwrite");
          store.add({ ...data, fromCache: true });
          res(data);
        } else {
          console.assert(evt.target.result.exspires, "Cache should have a expiration date");
          console.assert(evt.target.result.data, "Cache should always have data");

          if(fetchOnce) {
            localFetchCacheStorage.set(fetchObject.cacheKey, evt.target.result);
          }

          if(DEBUG == false) {
            fetchObject.send(fetchOnce).then(data => {
              const store = IndexedDB.store(db, STORE_NAME, "readwrite");
              store.put({ ...data, fromCache: true });
              console.assert(evt.target.result?.["mutate"], "Fetch cache mutation is missing, which means this fetch was useless, because it will not update anywhere");
              evt.target.result?.["mutate"]?.(data);
            });
          }

          res(evt.target.result);
        }
      };

      getReg.onerror = rej;
    }
  });

  try {
    return await promise;
  } catch(err) {
    console.error("Something went wrong with IndexedDB", err);
    return await fetchObject.send(fetchOnce);
  }
}


export const api2 = {
  // wachingAnime: (id, token) => {
  //   const [data, setData] = createSignal(undefined);
  //
  //   const request = Fetch.authAnilist(token, querys.currentWachingMedia, {
  //     "userId": id, "type": "ANIME", "perPage": 40
  //   });
  //
  //   const STORE_NAME = "results";
  //   const mutate = (data) => {
  //     // if(fetchOnce) {
  //     //   localFetchCacheStorage.set(fetchObject.cacheKey, evt.target.result);
  //     // }
  //
  //     const cacheReq = IndexedDB.fetchCache();
  //     cacheReq.onsuccess = evt => {
  //       const db = evt.target.result;
  //       const store = IndexedDB.store(db, STORE_NAME, "readwrite");
  //       store.put(data);
  //     }
  //
  //     setData(data);
  //   }
  //
  //
  //   const refetch = async () => {
  //     const data = await request.send();
  //     mutate(data);
  //   }
  //
  //   const cacheReq = IndexedDB.fetchCache();
  //   cacheReq.onsuccess = evt => {
  //     const db = evt.target.result;
  //     const store = IndexedDB.store(db, STORE_NAME, "readonly");
  //     const getReg = store.get(fetchObject.cacheKey);
  //     getReg.onsuccess = evt => {
  //       if(evt.target.result != null) {
  //         console.assert(evt.target.result.exspires, "Cache should have a expiration date");
  //         console.assert(evt.target.result.data, "Cache should always have data");
  //         setData(evt.target.result);
  //       } 
  //     };
  //   }
  //
  //   return [data, { mutate, refetch }];
  // },
  currentlyWaching: aniCache((id, token) => {
    return Fetch.authAnilist(token, querys.currentWachingMedia, {
      "userId": id, "type": "ANIME", "perPage": 40
    });
  }),
}

/**
 * @param {(fetchOptions: any[]) => Fetch} fetchCallback
 * @returns {(fetchOptions: any[]) => [any, { mutate: (data: any) => void, mutateCache: (data: any) => void, refetch: () => void }]}
 */
function aniCache(fetchCallback) {
  const STORE_NAME = "results";
  const fetchOnce = false;
  const fetchOnDebug = false;
  
  return (...fetchOptions) => {
    const [data, setData] = createSignal(undefined);
    const fetchOnStart = DEBUG == false || fetchOnDebug;
    const request = fetchCallback(...fetchOptions)

    const mutateCache = mutateData => {
      console.log("mutateCache");
      if (typeof mutateData === "function") {
        mutateData = mutateData(data());
      }
      if(fetchOnce) {
        localFetchCacheStorage.set(request.cacheKey, mutateData);
      }

      const cacheReq = IndexedDB.fetchCache();
      cacheReq.onsuccess = evt => {
        const db = evt.target.result;
        const store = IndexedDB.store(db, STORE_NAME, "readwrite");
        store.put(mutateData);
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

    if(fetchOnce) {
      setData({ ...localFetchCacheStorage.get(request.cacheKey), fromCache: true });
    }

    if (fetchOnStart) {
      refetch();
    }

    const cacheReq = IndexedDB.fetchCache();
    cacheReq.onsuccess = evt => {
      const db = evt.target.result;
      const store = IndexedDB.store(db, STORE_NAME, "readonly");
      const getReg = store.get(request.cacheKey);
      getReg.onsuccess = evt => {
        if(evt.target.result != null) {
          console.assert(evt.target.result.exspires, "Cache should have a expiration date");
          console.assert(evt.target.result.data, "Cache should always have data");
          setData({ ...evt.target.result, fromCache: true });
        } else if (fetchOnStart) {
          refetch();
        }
      };
    }

    return [data, { mutate, refetch, mutateCache }];
  }
}

/**
 * @param {Fetch} fetchObject
 */
async function cache2(fetchObject, mutate, refetch, fetchOnce = false) {
  console.assert(fetchObject.cacheKey, "Cache key is missing");

  if (fetchOnce && localFetchCacheStorage.has(fetchObject.cacheKey)) {
    return localFetchCacheStorage.get(fetchObject.cacheKey);
  }

  const STORE_NAME = "results";
  const promise = new Promise((res, rej) => {
    const cacheReq = IndexedDB.fetchCache(rej)

    cacheReq.onsuccess = evt => {
      const db = evt.target.result;

      const store = IndexedDB.store(db, STORE_NAME, "readonly", rej);
      const getReg = store.get(fetchObject.cacheKey);
      getReg.onsuccess = async evt => {
        if(evt.target.result == null) {
          const data = await fetchObject.send(fetchOnce);

          const store = IndexedDB.store(db, STORE_NAME, "readwrite");
          store.add({ ...data, fromCache: true });
          res(data);
        } else {
          console.assert(evt.target.result.exspires, "Cache should have a expiration date");
          console.assert(evt.target.result.data, "Cache should always have data");

          if(fetchOnce) {
            localFetchCacheStorage.set(fetchObject.cacheKey, evt.target.result);
          }

          if(DEBUG == false) {
            fetchObject.send(fetchOnce).then(data => {
              const store = IndexedDB.store(db, STORE_NAME, "readwrite");
              store.put({ ...data, fromCache: true });
              console.assert(evt.target.result?.["mutate"], "Fetch cache mutation is missing, which means this fetch was useless, because it will not update anywhere");
              evt.target.result?.["mutate"]?.(data);
            });
          }

          res(evt.target.result);
        }
      };

      getReg.onerror = rej;
    }
  });

  try {
    return await promise;
  } catch(err) {
    console.error("Something went wrong with IndexedDB", err);
    return await fetchObject.send(fetchOnce);
  }
}


async function anilistGetMediaById(id) {
  console.assert(id, "No id given");
  const request = Fetch.anilist(querys.anilistMediaById, { id, perPage: 6 })
  return await cache(request);
}

async function anilistGetCharacterById(id) {
  console.assert(id, "No id given");

  const request = Fetch.anilist(querys.anilistCharacterById, {
    id,
    "page": 1,
    "sort": "POPULARITY_DESC",
    "onList": null,
    "withRoles": true
  });

  return await cache(request);
}

async function anilistTrendingAnime() {
  const request = Fetch.anilist(querys.trendingAnime, {
    "type": "ANIME",
    "season": "WINTER",
    "seasonYear": 2025,
    "nextSeason": "SPRING",
    "nextYear": 2025
  });

  return await cache(request);
}

async function anilistGetWatchingMedia(token, variables) {
  const request = Fetch.authAnilist(token, querys.currentWachingMedia, {
    "perPage": 40,
    ...variables,
  });

  return await cache(request);
}

async function anilistMutateMedia(token, variables) {
  console.assert(variables.mediaId, "MediaId is missing from variables");
  const request = Fetch.authAnilist(token, querys.anilistMutateMedia, variables);

  return await request.send();
}

async function anilistGetAuthUser(token) {
  if (token == null) return null;
  const request = Fetch.authAnilist(token, querys.currentUser);

  return await cache(request);
}

async function anilistSearchMedia(token, variables) {
  console.log(variables);
  const request = Fetch.authAnilist(token, querys.searchMedia, variables);
  return await cache(request, true);
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
    const request = indexedDB.open("MyAniList-cache", 1);
    if (errorCallback) request.onerror = errorCallback;

    request.onupgradeneeded = evt => {
      const db = evt.target.result;
      switch(evt.oldVersion) {
        case 0: {
          IndexedDB.#createStore(db, "results", { keyPath: "cacheKey" });
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
