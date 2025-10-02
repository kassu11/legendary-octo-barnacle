import { asserts } from "../collections/collections";
import { formatingUtils } from "./utils";

export const jikanMediaUrl= (type, card) => {
  return "/mal/" + type + "/" + card.mal_id + "/" + formatingUtils.titleToUrl(card.title);
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
