import { fetcherTemplates, localizations, queries } from "../utils.js";

const formatThemes = res => res.anime?.[0]?.animethemes ?? [];

export const getThemesByIdAndApi = (id, api) => {
  switch (api) {
    case localizations.ani: return fetcherTemplates.getJSON(queries.animeThemesByAnilistId(id), formatThemes);
    case localizations.mal: return fetcherTemplates.getJSON(queries.animeThemesByMyAnimeListId(id), formatThemes);
  }
};
