import { asserts, fetcherTemplates, localizations, queries } from "../collections.js";

export const getMediaById = (type, id) => {
  asserts.isTypeString(type, "type");
  asserts.isInteger(id, "id");
  switch (type) {
    case localizations.anime: return fetcherTemplates.getJSON(queries.myAnimeListAnimeById(id), res => res.data);
    case localizations.manga: return fetcherTemplates.getJSON(queries.myAnimeListMangaById(id), res => res.data);
  }
};

export const getCharactersByMediaId = (type, id) => {
  asserts.isTypeString(type, "type");
  asserts.isInteger(id, "id");
  switch (type) {
    case localizations.anime: return fetcherTemplates.getJSON(queries.myAnimeListAnimeCharactersById(id), res => res.data);
    case localizations.manga: return fetcherTemplates.getJSON(queries.myAnimeListMangaCharactersById(id), res => res.data);
  }
};

export const getStaffByMediaId = (type, id) => {
  asserts.isTypeString(type, "type");
  asserts.isInteger(id, "id");

  if (type === localizations.anime) {
    return fetcherTemplates.getJSON(queries.myAnimeListAnimeStaffById(id), res => res.data);
  }
};
