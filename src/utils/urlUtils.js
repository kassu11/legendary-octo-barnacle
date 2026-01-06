import { asserts } from "../collections/collections";
import { formatingUtils } from "./utils";

export const jikanMediaUrl= (type, card) => {
  return "/mal/" + type + "/" + card.mal_id + "/" + formatingUtils.titleToUrl(card.title);
}

export const jikanCharacterUrl= character => {
  return "/mal/character/" + character.mal_id + "/" + formatingUtils.titleToUrl(character.name);
}

export const anilistMediaUrl = media => {
  asserts.isTypeString(media.type, "Media type");
  asserts.isTypeInteger(media.id, "Media id");

  const base = "/ani/" + media.type.toLowerCase() + "/" + media.id;

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
