import * as querys from "./querys.js";

const api = {
  anilist: {
    mediaId: anilistGetMediaById,
    trendingAnime: anilistTrendingAnime,
    getAuthUserData: anilistGetAuthUser,
    searchMedia: anilistSearchMedia,
    topAnime: async () => { 
      return anilistSearchMedia(null, { "page": 1, "type": "ANIME", "sort": "POPULARITY_DESC" });
    },
    topManga: async () => { 
      return anilistSearchMedia(null, { "page": 1, "type": "MANGA", "sort": "POPULARITY_DESC" });
    },
  }
};

export default api;


class Fetch {
  constructor(url, { method = "POST", headers, body }, cache = true) {
    console.assert(url, "Url missing");
    console.assert(method, "Method missing");
    if (method === "POST") console.assert(body, "Body is missing");

    const defaultHeader = { "Content-Type": "application/json" }
    this.url = url;
    this.method = method;
    this.headers = headers || defaultHeader;
    this.body = body;
    this.cache = cache;

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

/**
 * @param {Fetch} fetchObject
 */
async function cache(fetchObject) {
  console.assert(fetchObject.cacheKey, "Cache key is missing");
  const STORE_NAME = "results";
  const promise = new Promise((res, rej) => {
    const cacheReq = IndexedDB.fetchCache(rej)

    cacheReq.onsuccess = evt => {
      const db = evt.target.result;

      const store = IndexedDB.store(db, STORE_NAME, "readonly", rej);
      const getReg = store.get(fetchObject.cacheKey);
      getReg.onsuccess = async evt => {
        if(evt.target.result == null) {
          const data = await fetchObject.send();

          const store = IndexedDB.store(db, STORE_NAME, "readwrite");
          store.add(data);
          res(data);
        } else {
          console.assert(evt.target.result.exspires, "Cache should have a expiration date");
          console.assert(evt.target.result.data, "Cache should always have data");
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
    return await fetchObject.send();
  }
}


async function anilistGetMediaById(id) {
  console.assert(id, "No id given");
  const request = Fetch.anilist(querys.anilistMediaById, { mediaId: id, perPage: 6 })
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

async function anilistGetAuthUser(token) {
  if (token == null) return null;
  const request = Fetch.authAnilist(token, querys.currentUser);

  return await cache(request);
}

async function anilistSearchMedia(token, variables) {
  console.log(variables);
  const request = Fetch.authAnilist(token, querys.searchMedia, variables);
  return await cache(request);
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
