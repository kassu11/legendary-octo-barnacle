import { asserts, fetcherTemplates, localizations, queries } from "../collections.js";

export const getCharactersByMediaId = (type, id) => {
  asserts.isTypeStringOLD(type, "type");
  asserts.isInteger(id, "id");
  switch (type) {
    case localizations.anime: return fetcherTemplates.getJSON(queries.myAnimeListAnimeCharactersById(id), res => res.data);
    case localizations.manga: return fetcherTemplates.getJSON(queries.myAnimeListMangaCharactersById(id), res => res.data);
  }
};

export const getStaffByMediaId = (type, id) => {
  asserts.isTypeStringOLD(type, "type");
  asserts.isInteger(id, "id");

  if (type === localizations.anime) {
    return fetcherTemplates.getJSON(queries.myAnimeListAnimeStaffById(id), res => res.data);
  }
};

export const getCharacterById = id => {
  asserts.isInteger(id, "id");

  return fetcherTemplates.getJSON(queries.myAnimeListCharacterById(id), res => res.data);
};
