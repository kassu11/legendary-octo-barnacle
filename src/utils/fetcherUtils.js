// const fetcher = ["url", {}];
// export function fetcherToFetchParams(fetcher) {
//
// }

import { assertTypeArray, assertTypeString } from "../collections/asserts";
import { localizations } from "../collections/collections";
import { addFetcherToRateLimit, getRateLimitFromFetcher } from "../core/fetchRateLimits";
import { hashKeyFNV32 } from "./hashUtils";
import { safeStringifyJson } from "./jsonUtils";
import { isTypeObject } from "./objectUtils";


// // Example usage:
// const query = "{ user(id: 5) { name, email, posts { title } } }";
// const key = `cache_${hashKey(query)}`; 
// // Result: cache_a1b2c3d4

export function createFetcher(url, params, encode = baseEncoding) {
  assertTypeString(url);

  if (isTypeObject(params?.body)) params.body = JSON.stringify(params.body);
  const res = [url, params];

  res.cacheKey = encode(url, params);

  return res;
};

function baseEncoding(url, params) {
  const paramsAsString = safeStringifyJson(params, "missing");
  return hashKeyFNV32(url) + hashKeyFNV32(paramsAsString) + hashKeyFNV32(url + paramsAsString);
}

export function fetcherToFetch(fetcher) {
  // For debugging you can enable random error end points
  if (Math.random() > 1) {
    console.log("Error route");
    switch (Math.ceil(Math.random() * 3)) {
      case 1: return fetch("https://http.codes/429", fetcher[1]);
      case 2: return fetch("https://http.codes/500", fetcher[1]);
      case 3: return fetch("https://http.codes/cors", fetcher[1]);
    }
  }

  return fetcherToFetchRetry(fetcher);
}

const fetchRequests = {};
async function fetcherToFetchRetry(fetcher) {
  const signal = fetcher?.[1]?.signal;
  for (let i = 0; i < 3 && !signal?.aborted; i++) {
    try {
      const fetchRequest = fetchRequests[fetcher.cacheKey] ??= fetchWrapper(fetcher);
      var response = await fetchRequest;
    } catch (e) {
      console.log(e);
      if (signal?.aborted) {
        return null;
      }
    } finally {
      delete fetchRequests[fetcher.cacheKey];
    }

    // Response was valid return response
    if (response?.ok) break;

    // Check if error status can be handled by just waiting it out
    const delay = await retryDelay(fetcher, response, i);
    // Response was error, but we don't know how to handle the error, so return response
    if (!delay) break;

    // Response was error, but we know that the error should be fixed after wayting the delay
    await new Promise(res => setTimeout(res, delay));
  }

  return response;
}

function fetchWrapper(fetcher) {
  addFetcherToRateLimit(fetcher);
  console.log("EVENT 6", fetcher);
  return fetch(...fetcher);
}

async function retryDelay(fetcher, response, iteration) {
  const status = response?.status || "cors";
  const retry = response?.headers?.get("Retry-After");
  if (retry) return parseInt(retry) * 1000;

  const [url] = fetcher;

  if (url.includes(localizations.anilist)) {
    switch (status) {
      // Anilist will sometimes give out Invalid Token errors when the token is in fact valid
      // This case will check if the error message is invalid token error and if the iteration is over 2, 
      // just return the error response, because it's probably a true error
      case 400: {
        if (iteration < 2) {
          const { errors } = await response.json();
          var invalidTokenError = errors.some(error => error.message === "Invalid token");
        }
        return invalidTokenError ? 3_000 : 0;
      }
      case 429: return 25_000; // Too Many Requests but Retry-After is missing?
      case 500: return 3_000; // Too Many Requests and missing Retry-After
      case "cors": return 60_000; // AniList CORS error should last one minute
    }
  }
  if (url.includes(localizations.jikan)) {
    switch (status) {
      case 429: return 1_000; // Too Many Requests and missing Retry-After
    }
  }
  if (url.includes(localizations.animethemes)) {
    switch (status) {
      case 429: return 25_000; // Too Many Requests and missing Retry-After
    }
  }
}


const requestQueue = [
  { url: "anilist", queue: [], timeout: null },
  { url: "jikan", queue: [], timeout: null },
  { url: "animeTheme", queue: [], timeout: null },
]

// const response = await fetch("/legendary-octo-barnacle/offline.json");
// const reader = response.body.getReader();
//
// try {
//   while (true) {
//     const { done, value } = await reader.read();
const baseSettings = {
  parse: res => res.json(),
  queue: true,
  cache: {
    get: () => null,
    set: () => { },
  },
  active: () => true,
  setValue: () => { },
  onStart: () => { },
  onError: () => { },
  onFetch: () => { },
};

// TODO: How to handle inactive windows
//  allowBlur: true
//  Mayme we add 500ms to every ms call extra if window is blurred
//  This way we can still fetch on every tab, but this should prioritize the main page
//  If the user does not do anything on the main page the other tabs are allowes to fetch
//  Maybe this will cause raise condition if multiple tabs are opened
// TODO: How to handle

export async function sendFetcher(fetcher, settings = {}) {
  if (!fetcher) return;

  assertTypeArray(fetcher);

  settings = Object.assign({}, baseSettings, settings);

  const start = performance.now();

  settings.onStart?.(performance.now() - start);
  const res = await settings.cache?.get?.(fetcher);
  const active = settings.active?.(res);

  if (res) settings.setValue(res);

  if (!active) {
    settings.onStop?.(performance.now() - start);
    return;
  }


  const [url, { signal }] = fetcher;
  const queueTarget = requestQueue.find(que => url.includes(que.url));

  async function event() {
    settings.onFetch?.(performance.now() - start);
    if (!signal?.aborded) {
      try {
        const response = await fetcherToFetch(fetcher);
        if (!response?.ok) throw response;

        const data = await settings.parse(response);
        settings.setValue({ data, cache: false });
        if (data) {
          const res = {
            cacheKey: fetcher.cacheKey,
            data,
            expires: settings.expires || new Date().getTime() * 1000 * 60 * 60 * 24 * 30, // 1kk
            modified: new Date().getTime(),
          };
          if (settings.name) res.name = settings.name;
          settings.cache?.set?.(res, fetcher);
        }
      } catch (err) {
        settings.onError?.(err);
      }
    }

    settings.onStop?.(performance.now() - start);

    clearTimeout(queueTarget.timeout);
    queueTarget.timeout = setTimeout(loop, 10);
  }

  if (settings.queue === false) {
    event();
    return;
  } else {
    queueTarget.queue.push({ event, fetcher });
    loop();
  }

  function loop() {
    if (!queueTarget.queue.length) return;
    const { event, fetcher } = queueTarget.queue.at(-1);
    const ms = getRateLimitFromFetcher(fetcher);
    if (ms === 0) {
      queueTarget.queue.pop();
      event();
    } else {
      clearTimeout(queueTarget.timeout);
      queueTarget.timeout = setTimeout(loop, ms);
    }
  }
}
