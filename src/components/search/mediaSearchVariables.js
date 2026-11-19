import { translateInternalApiParams } from "@/api/apiTranslations";
import { concatMergeObjects } from "@/utils/objectUtils";
import { isTypeArray } from "@/utils/arrayUtils";
import { anilistGenresAndTagsData } from "./inputs/MediaGenresAndTagsSelect.scoped";
import { usersData } from "./inputs/MediaUsersSelect.scoped";
import { mediaGroupSort } from "./mediaGroups";

/**
 * Builds the AniList search variables from the parsed search params.
 * Returns null while the data needed to validate the params is still loading.
 * @param {object} searchParams Parsed search params
 * @param {object} [options]
 * @param {Iterable<number>} [options.idIn] Search only inside these media ids, for example the media of a studio
 */
export function createAnilistMediaQueryVariables(searchParams, { idIn: restrictedIds } = {}) {
  const api = "ani";
  const { q, year, rank, genres, excludedGenres, tags, excludedTags, users, excludedUsers, sortBySearchMatch, externalSources, type, ...rest } = searchParams;

  const obj = {
    sort: [],
    format: [],
    sourceIn: [],
    countryOfOriginIn: [],
    licensedBy: [...externalSources],    // Anilist will work with invalid licenseIDs, so no need to validate
    statusIn: [],
    // Anilist will work with invalid exclusions, so no need to validate
    excludedGenres: [...excludedGenres],
    excludedTags: [...excludedTags],
    // Rank only filters tags, it doesn't do anything without them
    minimumTagRank: tags.length || excludedTags.length ? rank : undefined,
    search: q?.toLowerCase().trim() || undefined,
    type: type === "media" ? undefined : type.toUpperCase(),
    isAdult: false,
  };

  // Validate genres and tags
  const genresAndTagsData = genres.length || tags.length ? anilistGenresAndTagsData() : null;
  if ((genres.length || tags.length) && !genresAndTagsData) return null;

  obj.genres = genres.filter(g => genresAndTagsData.validGenres.has(g));
  obj.tags   = tags  .filter(t => genresAndTagsData.validTags  .has(t));

  // Grouping needs the results sorted by the group first, even when sorting by search match
  const sorts = sortBySearchMatch ? ["search_match"] : rest.sort;
  mergeVariables(api, "sort", obj, { sort: [...mediaGroupSort(rest.groupBy, sorts), ...sorts] });

  mergeVariables(api, "endDateGreater", obj, rest);
  mergeVariables(api, "status", obj, rest);
  mergeVariables(api, "season", obj, rest);
  mergeVariables(api, "format", obj, rest);
  mergeVariables(api, "country", obj, rest);
  mergeVariables(api, "onList", obj, rest);
  mergeVariables(api, "licensed", obj, rest);
  mergeVariables(api, "source", obj, rest);
  mergeVariables(api, "age", obj, rest);
  mergeVariables(api, "yearLesser", obj, rest);
  mergeVariables(api, "yearGreater", obj, rest);
  mergeVariables(api, "progressLesser", obj, rest);
  mergeVariables(api, "progressGreater", obj, rest);
  mergeVariables(api, "progress", obj, rest);
  mergeVariables(api, "lengthLesser", obj, rest);
  mergeVariables(api, "lengthGreater", obj, rest);
  mergeVariables(api, "length", obj, rest);

  const userMediaIds = (users?.length || excludedUsers?.length) && usersData();
  let idNotIn = new Set();
  for (let name of excludedUsers) {
    name = name.toLowerCase();
    if (!userMediaIds[name]) return null;
    if (type === "anime" || type === "media") idNotIn = idNotIn.union(userMediaIds[name].anime);
    if (type === "manga" || type === "media") idNotIn = idNotIn.union(userMediaIds[name].manga);
  }

  let idIn = new Set();
  for (let name of users) {
    name = name.toLowerCase();
    if (!userMediaIds[name]) return null;
    if (type === "anime" || type === "media") idIn = idIn.union(userMediaIds[name].anime);
    if (type === "manga" || type === "media") idIn = idIn.union(userMediaIds[name].manga);
  }

  if (restrictedIds) {
    const restrictedIdSet = new Set(restrictedIds);
    idIn = (users.length ? restrictedIdSet.intersection(idIn) : restrictedIdSet).difference(idNotIn);
    // Excluded ids are already removed from the restricted ids, so there is no need to send them
    idNotIn = new Set();
    // AniList would ignore an empty id list, so search with an id that no media has
    if (!idIn.size) idIn.add(0);
  }

  if (idNotIn.size) obj.idNotIn = [...idNotIn].sort((a, b) => a - b);
  if (idIn.size) obj.idIn = [...idIn.difference(idNotIn)].sort((a, b) => a - b);


  if (year) {
    if (obj.season) obj.seasonYear = year;
    else obj.year = year + "%";
  }

  for (const key in obj) {
    if (obj[key] === undefined || obj[key]?.length === 0) delete obj[key];
  }

  return obj;
}

export function createJikanMediaQueryVariables(searchParams) {
  const { q, sfw = true, type } = searchParams;

  if (type === "media") return null;

  const obj = {
    q: q?.toLowerCase().trim() || undefined,
    type,
    sfw,
  };

  return obj;
}

function mergeVariables(api, key, to, from) {
  if (isTypeArray(from[key])) {
    from[key].forEach(value => mergeValue(api, key, to, value));
  } else {
    mergeValue(api, key, to, from[key]);
  }
}

function mergeValue(api, key, to, value) {
  let val;
  if (!(value in translateInternalApiParams[key])) val = translateInternalApiParams[key]._default?.(api, value);
  else val = translateInternalApiParams[key][value]?.[api];

  concatMergeObjects(to, val);
}
