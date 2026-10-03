import { useNavigate } from "@solidjs/router";
import { isTypeInteger, isTypeString } from "../collections/types";
import { arrayUtils, formatingUtils } from "./utils";
import { isTypeFunction } from "./functionUtils";

export const jikanMediaUrl= (type, card) => {
  return "/mal/" + type + "/" + card.mal_id + "/" + formatingUtils.titleToUrl(card.title);
}

export const jikanCharacterUrl= character => {
  return "/mal/character/" + character.mal_id + "/" + formatingUtils.titleToUrl(character.name);
}

export const anilistMediaUrl = media => {
  let base;

  if (isTypeInteger(media?.id) && isTypeString(media?.type)) {
    base = "/ani/" + media.type.toLowerCase() + "/" + media.id;
  } else {
    return "";
  }

  if (!media.title.userPreferred) {
    return base;
  }

  return base + "/" + formatingUtils.titleToUrl(media.title.userPreferred);
}

export const anilistClientId = () => {
  if (location.hostname === "kassu11.github.io") {
    return 24951;
  } else if (location.port == __PORT__) {
    return 7936;
  } else if (location.port == __DEBUG_PORT__) {
    return 31649;
  }

  return -1;
}

// Sometimes you need to navigate and change search params at the same time, so this helpers combines both
export function useNavigateAndSearch() {
  const navigate = useNavigate();

  return (url, query = {}, options) => {
    if (isTypeFunction(url)) url = url(window.location.pathname.split(__BASE__)[1]);
    url = url.replace(/\?.*$/, ""); // Remove search from url, if present
    url = url.replace(/\/$/, ""); // Trim trailing "/" at the end

    let search = window.location.search;
    Object.entries(query).forEach(([key, value]) => {
      // 1. Remove all old keys from search
      const re = new RegExp(`(\\?|&)${key}[^&]*`);
      search = search.replace(re, "");

      // 2. Make sure search starts with ?
      if (search[0] !== "?") {
        search = "?" + search.substring(1);
      }


      if (value == undefined) return;

      // 3. Make sure line ends with &
      if (search.length > 1 && search.at(-1) != "&") {
        search += "&";
      }

      search += arrayUtils.wrapToArray(value).map(v => `${key}=${v}`).join("&");

    });

    if (search.length > 1) navigate(url + search, options);
    else navigate(url, options);

  }
}
