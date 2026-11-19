import { useParams, useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { removeDuplicateIgnoreCaseSensitivity, wrapToArray, wrapToSet } from "@/utils/arrayUtils";
import { translateInternalApiParams } from "@/api/apiTranslations";
import { getSearchHeaderParams } from "@/utils/searchHeaderUtils";
import { searchPageGroupBy, searchPageGroupSeasonalBy, searchPageGroupTBABy } from "@/state/globalState";
import { MEDIA_GROUPS } from "./mediaGroups";

/**
 * Search params parsed for the media filters and the search variables, provided with ParsedSearchParamsContext
 * @param {Object} options
 * @param {() => string} options.type Media type: anime, manga or media
 * @param {string} options.defaultSort Sort used when the url and the header don't have one
 */
export function createParsedSearchParams(options) {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const [searchStore, setSearchStore] = createStore({});

  const searchObject = createMemo(() => {
    const { header } = params;
    const type = options.type();

    const obj = {
      q: decodeURIComponent(wrapToArray(searchParams.q).at(-1) || ""),
      onList: wrapToArray(searchParams.onList).at(-1),
      licensed: wrapToArray(searchParams.licensed).at(-1),
      rank: +wrapToArray(searchParams.rank).at(-1),
      source: removeDuplicateIgnoreCaseSensitivity(wrapToArray(searchParams.source).filter(val => translateInternalApiParams.source[val])).sort(),
      externalSources: [...wrapToSet(searchParams.externalSources)].map(Number).sort(),
      type,
      defaultSort: options.defaultSort,
    };

    const filteredSorts = removeDuplicateIgnoreCaseSensitivity(wrapToArray(searchParams.sort).filter(val => translateInternalApiParams.sort[val]));
    const filteredCountry = removeDuplicateIgnoreCaseSensitivity(wrapToArray(searchParams.country)).sort();
    const filteredFormats = removeDuplicateIgnoreCaseSensitivity(wrapToArray(searchParams.format).filter(val => translateInternalApiParams.format[val])).sort();
    const filteredStatus = removeDuplicateIgnoreCaseSensitivity(wrapToArray(searchParams.status).filter(val => translateInternalApiParams.status[val])).sort();
    const filteredAge = removeDuplicateIgnoreCaseSensitivity(wrapToArray(searchParams.age).filter(val => translateInternalApiParams.age[val])).sort();
    const filteredSeason = wrapToArray(searchParams.season).findLast(val => val in translateInternalApiParams.season);

    const groupBy = searchPageGroupBy();
    const groupSeasonalBy = searchPageGroupSeasonalBy();
    const groupTBABy = searchPageGroupTBABy();

    Object.assign(obj, getSearchHeaderParams(header));

    if (obj.q) obj.sortBySearchMatch = searchParams.skipSortByMatch !== "true";

    if (filteredSorts.length) obj.sort = filteredSorts;
    else if (!obj.sort?.length) obj.sort = [options.defaultSort];
    if (filteredAge.length) obj.age = filteredAge;
    else obj.age = ["r"];

    if (filteredFormats.length) obj.format = filteredFormats;
    if (filteredCountry.length) obj.country = filteredCountry;
    if (filteredStatus.length) obj.status = filteredStatus;
    if (filteredSeason) obj.season = filteredSeason;

    const genres = wrapToArray(searchParams.genre).map(name => name.toLowerCase()).sort();
    obj.genres         = genres.filter(val => !val.startsWith("-"));
    obj.excludedGenres = genres.filter(val =>  val.startsWith("-")).map(val => val.substring(1));

    const tags = wrapToArray(searchParams.tag).map(name => name.toLowerCase()).sort();
    obj.tags         = tags.filter(val => !val.startsWith("-"));
    obj.excludedTags = tags.filter(val =>  val.startsWith("-")).map(val => val.substring(1));

    // Filter duplicate and conflicting states
    const usersMap = new Map();
    wrapToArray(searchParams.user).forEach(user => {
      if (user.startsWith("in-") || user.startsWith("ex-")) usersMap.set(user.substring(3).toLowerCase(), user);
    });
    obj.users         = [];
    obj.excludedUsers = [];
    usersMap.forEach(user => {
      if (user.startsWith("in-")) obj.users        .push(user.substring(3));
      if (user.startsWith("ex-")) obj.excludedUsers.push(user.substring(3));
    });
    obj.users.sort();
    obj.excludedUsers.sort();

    if (searchParams.yearLesser) obj.yearLesser = +wrapToArray(searchParams.yearLesser).at(-1);
    if (searchParams.yearGreater) obj.yearGreater = +wrapToArray(searchParams.yearGreater).at(-1);
    if (searchParams.year && !obj.yearLesser && !obj.yearGreater) obj.year = +wrapToArray(searchParams.year).at(-1);
    if (searchParams.progressLesser) obj.progressLesser = +wrapToArray(searchParams.progressLesser).at(-1);
    if (searchParams.progressGreater) obj.progressGreater = +wrapToArray(searchParams.progressGreater).at(-1);
    if (searchParams.progress && !obj.progressLesser && !obj.progressGreater) obj.progress = +wrapToArray(searchParams.progress).at(-1);
    if (searchParams.lengthLesser) obj.lengthLesser = +wrapToArray(searchParams.lengthLesser).at(-1);
    if (searchParams.lengthGreater) obj.lengthGreater = +wrapToArray(searchParams.lengthGreater).at(-1);
    if (searchParams.length && !obj.lengthLesser && !obj.lengthGreater) obj.length = +wrapToArray(searchParams.length).at(-1);

    // Seasonal and TBA pages remember their own grouping, other pages share one
    // The sort for the grouping is added to the search variables, so it doesn't end up in the url or in the sort select
    const pageGroupBy = header === "tba" ? groupTBABy : obj.seasonPage ? groupSeasonalBy : groupBy;
    // Only anime have seasons. The choice is kept, so it comes back when switching back to anime
    if (Object.hasOwn(MEDIA_GROUPS, pageGroupBy) && (pageGroupBy !== "season" || type === "anime")) obj.groupBy = pageGroupBy;

    ["format", "status", "country", "source"].forEach(key => {
      obj[key] = wrapToArray(obj[key]);
    });

    if (!(obj.year > 0)) delete obj.year;
    if (!(obj.rank > 0)) delete obj.rank;

    return obj;
  });

  return createMemo(() => {
    setSearchStore(reconcile(searchObject()));
    return searchStore;
  });
}
