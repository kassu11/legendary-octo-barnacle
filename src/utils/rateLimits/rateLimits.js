import * as requests from "./requests";

export const getDelayByStatusCodeAndUrl = (url, status) => {
  if (url.includes("anilist")) {
    switch (status) {
      case 429: return 25_000;
      case 500: return 3_000;
      case "cors": return 40_000;
    }
  }
  if (url.includes("jikan")) {
    switch (status) {
      case 429: return 1_000;
    }
  }
  if (url.includes("animethemes")) {
    switch (status) {
      case 429: return 25_000;
    }
  }
}

export const addPendingRequestToUrl = url => {
  if (url.includes("anilist")) {
    requests.anilist.addPendingRequest();
  } if (url.includes("jikan")) {
    requests.anilist.addPendingRequest();
  }
}

export const removePendingRequestToUrl = url => {
  if (url.includes("anilist")) {
    requests.anilist.removePendingRequest();
  } if (url.includes("jikan")) {
    requests.anilist.removePendingRequest();
  }
}
