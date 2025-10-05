import { localizations, requests } from "../collections/collections.js";

export const getDelayByStatusCodeAndUrl = (url, status) => {
  if (url.includes(localizations.anilist)) {
    switch (status) {
      case 429: return 25_000;
      case 500: return 3_000;
      case "cors": return 40_000;
    }
  }
  if (url.includes(localizations.jikan)) {
    switch (status) {
      case 429: return 1_000;
    }
  }
  if (url.includes(localizations.animethemes)) {
    switch (status) {
      case 429: return 25_000;
    }
  }
}

export const initializeOrAddToWaitingQueueForUrl = (url, resolve) => {
  if (url.includes(localizations.anilist)) {
    requests.anilist.initializeWaitingQueue(resolve);
  } else if (url.includes(localizations.jikan)) {
    requests.jikan.initializeWaitingQueue(resolve);
  }
}


export const removeFromWaitingQueueWithUrl = (url) => {
  if (url.includes(localizations.anilist)) {
    requests.anilist.removeFromWaitingQueue();
  } else if (url.includes(localizations.jikan)) {
    requests.jikan.removeFromWaitingQueue();
  }
}

export const hasWaitingQueueForUrl = url => {
  if (url.includes(localizations.anilist)) {
    return requests.anilist.waitingQueue !== null;
  } else if (url.includes(localizations.jikan)) {
    return requests.jikan.waitingQueue !== null;
  }
}

export const addPendingRequestToUrl = url => {
  if (url.includes(localizations.anilist)) {
    requests.anilist.addPendingRequest();
  } else if (url.includes(localizations.jikan)) {
    requests.jikan.addPendingRequest();
  }
}

export const removePendingRequestToUrl = url => {
  if (url.includes(localizations.anilist)) {
    requests.anilist.removePendingRequest();
  } else if (url.includes(localizations.jikan)) {
    requests.jikan.removePendingRequest();
  }
}
