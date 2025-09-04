import { fetcherTemplates, queries } from "../../collections/collections.js";
import { asserts } from "../../collections/collections.js";
import { localizations } from "../../collections/collections.js";

export const getMediaById = (type, id) => {
  asserts.assertTrue(id);
  switch (type) {
    case localizations.anime: return fetcherTemplates.getJSON(queries.myAnimeListAnimeById(id), res => res.data);
    case localizations.manga: return fetcherTemplates.getJSON(queries.myAnimeListMangaById(id), res => res.data);
  }
};
