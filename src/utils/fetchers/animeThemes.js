import { fetcherTemplates, queries } from "../utils.js";
import { localizations } from "../../collections/collections.js";

const formatThemes = res => res.anime?.[0]?.animethemes ?? [];

export const getThemesByIdAndApi = (id, api, type) => {
  if (type !== localizations.anime) {
    return;
  }

  switch (api) {
    case localizations.ani: return fetcherTemplates.getJSON(queries.animeThemesByAnilistId(id), formatThemes);
    case localizations.mal: return fetcherTemplates.getJSON(queries.animeThemesByMyAnimeListId(id), formatThemes);
  }
};
