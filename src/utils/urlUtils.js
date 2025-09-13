import { formatingUtils } from "./utils";

export const jikanMediaUrl= (type, card) => {
  return "/mal/" + type + "/" + card.mal_id + "/" + formatingUtils.titleToUrl(card.title);
}
