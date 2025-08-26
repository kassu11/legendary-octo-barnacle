import { asserts, fetcherTemplates, localizations, queries } from "../utils";

export const getMediaById = (type, id) => {
  asserts.assertTrue(id);
  switch (type) {
    case localizations.anime: return fetcherTemplates.getJSON(queries.myAnimeListAnimeById(id), res => res.data);
    case localizations.manga: return fetcherTemplates.getJSON(queries.myAnimeListMangaById(id), res => res.data);
  }
};
