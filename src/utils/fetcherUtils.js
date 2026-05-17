import { assertTypeArray, assertTypeString } from "../collections/asserts";
import { localizations, modes } from "../collections/collections";
import { addFetcherToRateLimit, getRateLimitFromFetcher, setFetchResponseToRateLimit } from "../core/fetchRateLimits";
import { logoutUser, setMainLoadingCount, token2 } from "../core/globalState";
import { addApplicationNotification } from "../pages/App/ApplicationNotifications.scoped";
import { hashKeyFNV32 } from "./hashUtils";
import { getIndexedDBValue } from "./indexedDButils";
import { safeStringifyJson } from "./jsonUtils";
import { isTypeObject, mergeObjects } from "./objectUtils";
import { getSessionStorageJson } from "./sessionStorageUtils";
import { setFetcherValueToStorage } from "./storageUtils";

export function createFetcher(url, params, encode = baseEncoding) {
  assertTypeString(url);

  if (isTypeObject(params?.body)) params.body = JSON.stringify(params.body);
  const res = [url, params];

  res.cacheKey = encode(url, params);

  return res;
};

export function createAnilistFetcher(query, variables, signal) {
  assertTypeString(query);

  const t = token2();
  const headers = { "Content-Type": "application/json" };
  if (t) headers.Authorization = `Bearer ${t}`;

  return createFetcher("https://graphql.anilist.co", {
    method: "POST",
    headers,
    signal,
    body: {
      query: query,
      variables
    },
  });
}

function baseEncoding(url, params) {
  const paramsAsString = safeStringifyJson(params, "missing");
  return hashKeyFNV32(url) + hashKeyFNV32(paramsAsString) + hashKeyFNV32(url + paramsAsString);
}

export async function fetcherToFetch(fetcher) {
  try {
    setMainLoadingCount(v => v + 1);
    // For debugging you can enable random error end points
    if (Math.random() > 1) {
      console.log("Error route");
      switch (Math.ceil(Math.random() * 3)) {
        case 1: return await fetch("https://http.codes/429");
        case 2: return await fetch("https://http.codes/500");
        case 3: return await fetch("https://http.codes/cors");
      }
    }

    return await fetcherToFetchRetry(fetcher);
  } finally {
    setMainLoadingCount(v => v - 1);
  }
}

const fetchRequests = {};
async function fetcherToFetchRetry(fetcher) {
  const signal = fetcher?.[1]?.signal;
  for (let i = 0; i < 3 && !signal?.aborted; i++) {
    try {
      const fetchRequest = fetchRequests[fetcher.cacheKey] ??= fetchWrapper(fetcher);
      var response = await fetchRequest;
    } catch {
      if (signal?.aborted) {
        return null;
      }
    } finally {
      delete fetchRequests[fetcher.cacheKey];
    }

    // Response was valid return response
    if (response?.ok) break;

    // Check if error status can be handled by just waiting it out
    const { delay, message } = await retryDelay(fetcher, response, i);

    setFetchResponseToRateLimit(fetcher, response, delay);

    // Response was error, but we don't know how to handle the error, so return response
    if (!delay) break;

    // We can handle the error, but we still want to display a warning to the user
    if (message) addApplicationNotification({ type: "warning", message, duration: 3_000 });

    // Response was error, but we know that the error should be fixed after wayting the delay
    await new Promise(res => setTimeout(res, delay));
  }

  return response;
}

function fetchWrapper(fetcher) {
  addFetcherToRateLimit(fetcher);
  return fetch(...fetcher);
}

async function retryDelay(fetcher, response, iteration) {
  const status = response?.status || "cors";
  const retry = response?.headers?.get("Retry-After");
  if (retry) return { delay: parseInt(retry) * 1000, message: "Too Many Requests. Wait for: " + Math.ceil(retry / 1000) + " seconds" };

  const [url] = fetcher;

  if (url.includes(localizations.anilist)) {
    switch (status) {
      // Anilist will sometimes give out Invalid Token errors when the token is in fact valid
      // This case will check if the error message is invalid token error and if the iteration is over 2, 
      // just return the error response, because it's probably a true error
      case 400: {
        if (iteration < 2) {
          const { errors } = await response.json();
          response.json = () => ({ errors }); // Bandage fix to "body stream already read"
          var invalidTokenError = errors.some(error => error.message === "Invalid token");
        }
        return { delay: invalidTokenError ? 3_000 : 0 };
      }
      case 429: return { delay: 25_000, message: "Anilist Too Many Request. Wait for 25 seconds." }; // Too Many Requests but Retry-After is missing?
      case 500: return { delay: 3_000, message: "Anilist request failed. Retrying again in 3 seconds" }; // Anilist will sometimes randomly give 500 internal Sever Error, usually retry will fix
      case 502: return { delay: 15_000, message: "Anilist has Bad Gateway. Wait for 15 seconds" }; // Bad Gateway, retry after 15 seconds
      case "cors": return { delay: 60_000, message: "You have send too many Anilist requests. Wait for 1 minute" }; // AniList CORS error should last one minute
    }
  }
  if (url.includes(localizations.jikan)) {
    switch (status) {
      case 429: return { delay: 1_000, message: "Jikan API rate limit hit" }; // Too Many Requests and missing Retry-After
    }
  }
  if (url.includes(localizations.animethemes)) {
    switch (status) {
      case 429: return { delay: 25_000, message: "Animethemes API rate limit hit" }; // Too Many Requests and missing Retry-After
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
  active: (res, settings) => {
    if (!res) return true;
    else if (settings.debug) return false;
    return !cache.has(res.cacheKey);
  },
  debug: modes.debug,
  loadingBar: true,
  cache: {
    get: async (res, settings) => {
      // When debugging, we don't want to clear session storage all the time
      const session = !settings.debug && getSessionStorageJson(res.cacheKey, null);
      if (session) return session;

      const data = await getIndexedDBValue("fetches", res.cacheKey);
      return data;
    },
    set: async res => {
      cache.add(res.cacheKey);
      setFetcherValueToStorage(res);
    }
  },
  setValue: (res) => console.error("Missing setValue", res),
  parse: res => res.json(),
  queue: true,
  onStart: () => { },
  onError: res => {
    if (!res) return;
    addApplicationNotification({ type: "error", message: `Error status code: ${res.status}.`, duration: 10_000 });
  },
  onFetch: () => { },
};

// TODO: How to handle inactive windows
//  allowBlur: true
//  Mayme we add 500ms to every ms call extra if window is blurred
//  This way we can still fetch on every tab, but this should prioritize the main page
//  If the user does not do anything on the main page the other tabs are allowes to fetch
//  Maybe this will cause raise condition if multiple tabs are opened
// TODO: How to handle

/**
 * This is as close as normal fetch as you can get
 * The only difference is, that this function does not return anything
 * We will always pass values with setValue and cache.get hooks
 * We will also make sure that the fetch rate limits are not broken
 */
export async function sendFetcher(fetcher, settings = {}) {
  if (!fetcher) return;

  assertTypeArray(fetcher);

  settings = mergeObjects({ ...baseSettings, cache: { ...baseSettings.cache } }, settings);

  const start = performance.now();
  settings.onStart?.(performance.now() - start);

  var res = settings.file ? await (await fetch("/legendary-octo-barnacle/" + settings.file)).json() : await settings.cache?.get?.(fetcher, settings);
  const active = settings.active?.(res, settings);

  if (res) settings.setValue(res, { fetcher });

  if (!active) {
    settings.onStop?.(performance.now() - start);
    return;
  }

  if (settings.loadingBar) setMainLoadingCount(v => v + 1);

  const [url, { signal }] = fetcher;
  const queueTarget = requestQueue.find(que => url.includes(que.url));

  async function event() {
    settings.onFetch?.(performance.now() - start);
    if (signal?.aborded !== true) {
      try {
        const response = await fetcherToFetch(fetcher);

        setFetchResponseToRateLimit(fetcher, response);

        if (!response?.ok) throw response;

        const data = await settings.parse(response);
        const res = {
          cacheKey: fetcher.cacheKey,
          data,
          expires: settings.expires || (new Date().getTime() + 1000 * 60 * 60 * 24 * 30), // 1kk
          modified: new Date().getTime(),
        };

        if (settings.name) res.name = settings.name;

        settings.setValue({ ...res, cache: false });
        if (data) settings.cache?.set?.(res, { fetcher });
      } catch (err) {
        settings.onError?.(err);
      }
    }

    settings.onStop?.(performance.now() - start);
    if (settings.loadingBar) setMainLoadingCount(v => v - 1);

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

const cache = new Set();
const anilistBaseFetcherSettings = {
  name: "AniList fetch",
  onError: async res => {
    if (!res) return;
    try {
      const { errors } = await res.json();
      for (const { message, status } of errors) {
        // Token has expired so lets log out the user
        if (status === 400 && message === "Invalid token") {
          addApplicationNotification({ type: "info", message: "Anilist authentication token has expired. Sign in again", duration: 10_000 });
          logoutUser();
        } else {
          addApplicationNotification({ type: "error", message: `Anilist errored with a status code: ${status}. ${message}`, duration: 10_000 });
        }
      }
    } catch (err) {
      console.error(err);
      addApplicationNotification({ type: "error", message: `Anilist errored with a status code: ${res.status || "404"}.`, duration: 10_000 });
    }
  },
};

export function sendAnilistFetcher(fetcher, settings = anilistBaseFetcherSettings) {
  if (settings) {
    const { cache, ...rest } = anilistBaseFetcherSettings;
    settings = mergeObjects({ ...rest, cache: { ...cache } }, settings);
  }
  sendFetcher(fetcher, settings);
}

