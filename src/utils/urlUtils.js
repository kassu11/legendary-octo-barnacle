import { useNavigate } from "@solidjs/router";
import { isTypeInteger, isTypeString } from "@/utils/types";
import { formatTitleToUrl } from "./formatUtils";
import { arrayUtils } from "./utils";
import { isTypeFunction } from "./functionUtils";

export const jikanMediaUrl= (type, card) => {
  return "/mal/" + type + "/" + card.mal_id + "/" + formatTitleToUrl(card.title);
}

export const jikanCharacterUrl= character => {
  return "/mal/character/" + character.mal_id + "/" + formatTitleToUrl(character.name);
}

export const jikanStaffUrl = staff => {
  return "/mal/staff/" + staff.mal_id + "/" + formatTitleToUrl(staff.name);
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

  return base + "/" + formatTitleToUrl(media.title.userPreferred);
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

    // Add missing url
    url ??= window.location.pathname;
    // Modify the url to relative url, if not
    if (url.includes(__BASE__)) url = url.split(__BASE__)[1];

    url = url.replace(/\?.*$/, ""); // Remove search from url, if present
    url = url.replace(/\/$/, ""); // Trim trailing "/" at the end

    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(query)) {
      searchParams.delete(key);
      for (const item of arrayUtils.wrapToArray(value)) searchParams.append(key, item);
    }

    const search = searchParams.toString();
    navigate(search ? `${url}?${search}` : url, options);
  }
}
