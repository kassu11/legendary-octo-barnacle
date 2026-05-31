import { fetcherTemplates, localizations, queries } from "../collections.js";
import { fetcherUtils } from "../../utils/utils.js";

export const charactersPage = (token, id, page = 1) => {
  return fetcherTemplates.anilistAuthNoStore(token, queries.anilistCharacters, { id, page }, res => res.data.Media);
};

export const charactersPageless = (token, id) => {
  const fetcher = charactersPage(token, id, "pageless");
  return fetcherUtils.changeCacheType(fetcher, localizations.onlyIfCached);
};

