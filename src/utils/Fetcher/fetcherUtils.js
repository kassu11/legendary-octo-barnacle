import { FetchSettings } from "./FetchSettings";
import { asserts, localizations } from "../../collections/collections.js";
import { requestUtils } from "../utils.js";

export class Fetcher {
  constructor(url, options, formatResponse) {
    asserts.assertTrue(url, "URL is missing");

    this.url = url;
    this.options = options;
    this.formatResponse = formatResponse;
    this.settings = new FetchSettings({ storeName: "results", type: "fetch-once", expiresInSeconds: 60 * 60 * 24 * 365 });
  }

  get cacheKey() {
    return `${this.url}${JSON.stringify(this.options)?.replaceAll("\"", "") || ""}${this.formatResponse || ""}`;
  }
}


export const changeCacheType = (fetcher, type) => {
  if (fetcher) {
    fetcher.settings.type = type;
  }

  return fetcher;
}

export const sendFetcher = (fetcher, signal) => {
  requestUtils.addPendingRequestToUrl(fetcher.url);
  const request = fetcherToFetch(fetcher, signal).finally(() => requestUtils.removePendingRequestToUrl(fetcher.url));
  return request;
}

export const fetcherToFetch = (fetcher, signal) => {
  const options = {
    ...(fetcher.options || {}),
    signal
  };
  options.body &&= JSON.stringify(fetcher.options.body);
  options.cache ??= "default";

  if (Math.random() > 1) {
    console.log("Error route")
    switch (Math.ceil(Math.random() * 3)) {
      case 1: return fetch("https://http.codes/429", options);
      case 2: return fetch("https://http.codes/500", options);
      case 3: return fetch("https://http.codes/cors", options);
    }
  } else if (fetcher.delay) {
    return new Promise((res, rej) => {
      fetch(fetcher.url, options)
        .then(data => setTimeout(() => res(data), fetcher.delay))
        .catch(rej);
    });
  } else {
    return fetch(fetcher.url, options);
  }
}


const fetchRequests = {};
const fetchResponses = {};

let invalidTokenErrorsInARow = 0;

/** @param {Fetcher} fetcher */
export const fetchData = async (fetcher, signal) => {
  try {
    const { resolve, promise } = Promise.withResolvers();
    for (let i = 0; i < 3 && !signal.aborted; i++) {
      if (requestUtils.hasWaitingQueueForUrl(fetcher.url)) {
        requestUtils.initializeOrAddToWaitingQueueForUrl(fetcher.url, resolve);
        await promise;
      }

      try {
        const fetchRequest = fetchRequests[fetcher.cacheKey] ??= sendFetcher(fetcher, signal);
        var response = await fetchRequest;
      } catch (e) {
        if (signal.aborted) {
          return null;
        }
      } finally {
        delete fetchRequests[fetcher.cacheKey];
      }

      const delay = requestUtils.getDelayByStatusCodeAndUrl(fetcher.url, response?.status || "cors");
      if (response?.status === 429 && response.headers.get("Retry-After")) {
        requestUtils.initializeOrAddToWaitingQueueForUrl(fetcher.url, resolve);
        const time = parseInt(response.headers.get("Retry-After"));
        await new Promise(res => setTimeout(res, time * 1000));
        continue;
      } else if (response?.status === 400 && invalidTokenErrorsInARow < 3) {
        // Anilist sometimes sends invalid token errors when the token is infact valid
        requestUtils.initializeOrAddToWaitingQueueForUrl(fetcher.url, resolve);
        const json = await response.json();
        if (json.errors.some(error => error.message === "Invalid token")) {
          invalidTokenErrorsInARow++;
          await new Promise(res => setTimeout(res, 3_000));
          continue;
        }
      } else if (delay) {
        requestUtils.initializeOrAddToWaitingQueueForUrl(fetcher.url, resolve);
        await new Promise(res => setTimeout(res, delay));
        continue;
      } else if (!response?.ok) {
        return null;
      }

      if (fetcher.url.includes(localizations.anilist)) {
        invalidTokenErrorsInARow = 0;
      }

      try {
        const jsonRequest = fetchResponses[fetcher.cacheKey] ??= response.json();
        var json = await jsonRequest;
      } catch(e) {
        console.error(e);
        return null;
      } finally {
        delete fetchResponses[fetcher.cacheKey];
      }

      return fetcher.formatResponse?.(json) || json;
    }
  } catch (e) {
  } finally {
    requestUtils.removeFromWaitingQueueWithUrl(fetcher.url);
  }

  return null;
}
