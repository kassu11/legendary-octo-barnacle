import { apiRequestManager } from "../utils";
import { localizations } from "../../collections/collections.js";

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
    apiRequestManager.anilist.initializeWaitingQueue(resolve);
  } else if (url.includes(localizations.jikan)) {
    apiRequestManager.jikan.initializeWaitingQueue(resolve);
  }
}

export const removeFromWaitingQueueWithUrl = (url) => {
  if (url.includes(localizations.anilist)) {
    apiRequestManager.anilist.removeFromWaitingQueue();
  } else if (url.includes(localizations.jikan)) {
    apiRequestManager.jikan.removeFromWaitingQueue();
  }
}

export const hasWaitingQueueForUrl = url => {
  if (url.includes(localizations.anilist)) {
    return apiRequestManager.anilist.waitingQueue !== null;
  } else if (url.includes(localizations.jikan)) {
    return apiRequestManager.jikan.waitingQueue !== null;
  }
}

export const addPendingRequestToUrl = url => {
  if (url.includes(localizations.anilist)) {
    apiRequestManager.anilist.addPendingRequest();
  } else if (url.includes(localizations.jikan)) {
    apiRequestManager.anilist.addPendingRequest();
  }
}

export const removePendingRequestToUrl = url => {
  if (url.includes(localizations.anilist)) {
    apiRequestManager.anilist.removePendingRequest();
  } else if (url.includes(localizations.jikan)) {
    apiRequestManager.anilist.removePendingRequest();
  }
}
