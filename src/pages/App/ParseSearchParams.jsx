import { useParams, useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import "./MainNavigation.scoped.css";
import { createStore, reconcile } from "solid-js/store";
import { removeDuplicateIgnoreCaseSensitivity, wrapToArray, wrapToSet } from "../../utils/arrays";
import { ParsedSearchParamsContext } from "../../context/providers";
import { translateInternalSearchParams } from "../../core/apiTranslations";
import { getDates } from "../../utils/dates";
import { searchPageGroupSeasonalEntriesByFormat } from "../../core/globalState";

const [searchStore, setSearchStore] = createStore({});

export function ParseSearchParams(props) {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const searchObject = createMemo(() => {
    const { type, header } = params;

    const obj = {
      q: decodeURIComponent(wrapToArray(searchParams.q).at(-1) || ""),
      onList: wrapToArray(searchParams.onList).at(-1),
      rank: +wrapToArray(searchParams.rank).at(-1),
      source: wrapToArray(searchParams.source).at(-1),
      isAdult: false,
      type,
    };

    const filteredSorts = removeDuplicateIgnoreCaseSensitivity(wrapToArray(searchParams.sort).filter(val => translateInternalSearchParams.sort[val]));

    const groupSeasonalEntriesByFormat = searchPageGroupSeasonalEntriesByFormat();

    if (header === "trending") obj.sort = "trending_desc";
    else if (header === "popular") obj.sort = ["popularity_desc", "score_desc"];
    else if (header === "novel") Object.assign(obj, { sort: "popularity_desc", format: "light_novel" });
    else if (header === "manhwa") Object.assign(obj, { sort: "popularity_desc", countryOfOrigin: "KR" });
    else if (header === "finished") Object.assign(obj, { sort: "end_date_desc", status: "complete", endDateGreater: 0 });
    else if (header === "new") Object.assign(obj, { sort: "id_desc" });
    else if (header === "top") Object.assign(obj, { sort: "score_desc" });
    else if (header === "finished-manga") Object.assign(obj, { sort: "end_date_desc", status: "complete", endDateGreater: 0, format: "manga" });
    else if (header === "finished-novel") Object.assign(obj, { sort: "end_date_desc", status: "complete", endDateGreater: 0, format: "light_novel" });

    else if (header === "this-season") {
      const dates = getDates();
      Object.assign(obj, { year: dates.seasonYear, season: dates.season, seasonPage: true });
    } else if (header === "next-season") {
      const dates = getDates();
      Object.assign(obj, { year: dates.nextYear, season: dates.nextSeason, seasonPage: true });
    } else if (header === "tba") {
      Object.assign(obj, { season: null, status: "not_yet_released", seasonPage: true });
    } else if (/winter|spring|summer|fall/.test(header)) {
      const [season, year] = header.toUpperCase().split("-");
      Object.assign(obj, { year: +year, season, seasonPage: true });
    }

    if (obj.q) obj.sortBySearchMatch = searchParams.skipSortByMatch !== "true";

    if (filteredSorts.length) obj.sort = filteredSorts;
    else if (!obj.sort?.length) obj.sort = ["popularity_desc", "score_desc"];

    obj.genres = wrapToSet(wrapToArray(searchParams.genre).map(name => name.toLowerCase()));
    obj.excludedGenres = wrapToSet(wrapToArray(searchParams.excludedGenre).map(name => name.toLowerCase()));
    obj.format = wrapToArray(obj.format).concat(wrapToArray(searchParams.format));
    obj.countryOfOrigin = wrapToArray(searchParams.country).at(-1);
    if (searchParams.year) obj.year = +wrapToArray(searchParams.year).at(-1);

    if (/this-season|next-season|winter|spring|summer|fall/.test(header)) {
      if (groupSeasonalEntriesByFormat) obj.sort = ["format", ...obj.sort];
      obj.groupSeasonalEntriesByFormat = groupSeasonalEntriesByFormat;
    }

    ["sort", "format", "status"].forEach(key => {
      if (key in obj) obj[key] = wrapToArray(obj[key]);
    });

    if (!(obj.year > 0)) delete obj.year;
    if (!(obj.rank > 0)) delete obj.rank;

    return obj;
  });

  const parsedSearchParams = createMemo(() => {
    setSearchStore(reconcile(searchObject()));
    return searchStore;
  });

  return (
    <ParsedSearchParamsContext.Provider value={parsedSearchParams}>
      {props.children}
    </ParsedSearchParamsContext.Provider>
  )
}

// const animeSearch = {
//   type: "anime",
//   header: (string) => {
//     if (string.match(/^(summer|fall|spring|winter)-\d+$/)) {
//       return true;
//     }
//
//     return ["finished", "this-season", "new", "tba", "next-season", "trending", "popular", "top"].includes(string);
//   }
// }
// const mangaSearch = {
//   type: "manga",
//   header: ["finished", "finished-manga", "tba", "finished-novel", "novel", "new", "manhwa", "trending", "popular", "top"],
// }
//
// const bothSearch = {
//   type: "media",
//   header: ["finished", "trending", "popular", "top", "tba"],
// }
