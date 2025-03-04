
const api = {
  anilist: {
    mediaId: anilistGetMediaById,
  }
};
export default api;


class Fetch {
  constructor(url, {method = "POST", headers, body, ...rest}, cache = true) {
    console.assert(url, "Url missing");
    console.assert(method, "Method missing");

    const defaultHeader = { "Content-Type": "application/json" }
    this.url = url;
    this.method = method;
    this.headers = headers || defaultHeader;
    this.body = body;
    this.rest = rest;
    this.cache = cache;

    console.assert(Object.keys(rest).length <= 1, "Too many unknown fetch values");

    this.cacheKey = this.#generateCacheKey();
  }

  #generateCacheKey() {
    if (this.body) {
      const body = JSON.stringify(this.body).replaceAll("\t", "").replaceAll("\n", "");
      return `${this.url}-${this.method}-${body}`;
    }
    else {
      return `${this.url}-${this.method}`;
    }
  }

  async send() {
    const opt = {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      mode: this.rest?.mode,
    }

    const response = await fetch(this.url, opt);
    this.data = await response.json();
    return this;
  }

  static anilist (query, variables) {
    return new Fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    const cacheReq = indexedDB.open("fetchCache", 1);
    cacheReq.onerror = rej

    cacheReq.onsuccess = evt => {
      const db = evt.target.result;

      const tx = db.transaction(STORE_NAME, "readonly");
      tx.onerror = rej

      const store = tx.objectStore(STORE_NAME);
      const getReg = store.get(fetchObject.cacheKey);
      getReg.onsuccess = async evt => {
        console.log("clicked user:", evt.target.result);
        if(evt.target.result == null) {

          const data = await fetchObject.send();

          const tx = db.transaction(STORE_NAME, "readwrite");
          tx.onerror = rej

          const store = tx.objectStore(STORE_NAME);
          store.add(data);
          res(data);
        } else {
          console.assert(evt.target.result.exspires, "Cache should have a expiration date");
          console.assert(evt.target.result.data, "Cache should always have data");
          res(evt.target.result.data);
        }
      };

      getReg.onerror = rej;
    }

    cacheReq.onupgradeneeded = evt => {
      const db = evt.target.result;
      let objectStore;
      switch(evt.oldVersion) {
        case 0: {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            objectStore = db.createObjectStore(STORE_NAME, { keyPath: "cacheKey" });
          }
        }
      }
    };
  });

  return await promise;
}


async function anilistGetMediaById(id) {
  console.assert(id, "No id given");
  const query = `query media($id:Int, $type:MediaType) {
  Media (id: $id, type: $type) {
    id
    genres
    siteUrl
    meanScore
    title {
      romaji
      english
      native
      userPreferred
    }
  }
}`;

  const request = Fetch.anilist(query, { id })
  return await cache(request);
}



