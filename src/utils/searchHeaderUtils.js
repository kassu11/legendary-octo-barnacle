import { capitalize } from "./formatUtils.js";
import { getSeasonInfo } from "./seasonUtils.js";

const ALL_TYPES = ["anime", "manga", "media"];

const seasonTitle = ({ season, year }, typeName) => {
  if (season === "tba") return `TBA ${typeName}`;
  if (season) return `${capitalize(season)} ${year} Anime`;
};

// Search page headers (the "top" in "/ani/search/anime/top") are presets for the search params
// types:      media types the header route exists for
// seasonPage: header opens the season page (season controls and grouping entries by format)
// params:     search params the header sets, the url search params can override them
// title:      page title, returned only while the search params still match the header,
//             so the title doesn't describe the results wrong after the user has changed the filters
const searchHeaders = {
  "top": {
    types: ALL_TYPES,
    params: () => ({ sort: ["score_desc", "popularity_desc"] }),
    title: ({ sort }, typeName) => {
      if (sort?.[0] === "score_desc") return `Top ${typeName}`;
      if (sort?.[0] === "score_plus") return `Worst ${typeName}`;
    },
  },
  "popular": {
    types: ALL_TYPES,
    params: () => ({ sort: ["popularity_desc"] }),
    title: ({ sort }, typeName) => sort?.[0] === "popularity_desc" && `All Time Popular ${typeName}`,
  },
  "trending": {
    types: ALL_TYPES,
    params: () => ({ sort: ["trending_desc"] }),
    title: ({ sort }, typeName) => sort?.[0] === "trending_desc" && `Trending ${typeName}`,
  },
  "new": {
    types: ["anime", "manga"],
    params: () => ({ sort: ["id_desc"] }),
    title: ({ sort }, typeName) => sort?.[0] === "id_desc" && `Newly Added ${typeName}`,
  },
  "finished": {
    types: ALL_TYPES,
    params: () => ({ sort: ["end_date_desc_plus"], status: "complete" }),
    title: ({ sort }, typeName) => sort?.[0] === "end_date_desc_plus" && `Recently Finished ${typeName}`,
  },
  "finished-manga": {
    types: ["manga"],
    params: () => ({ sort: ["end_date_desc_plus"], status: "complete", format: "manga" }),
    title: ({ sort, status, format }) => sort?.[0] === "end_date_desc_plus" && status?.includes("complete") && format?.includes("manga") && "Recently Finished Mangas",
  },
  "finished-novel": {
    types: ["manga"],
    params: () => ({ sort: ["end_date_desc_plus"], status: "complete", format: "light_novel" }),
    title: ({ sort, status, format }) => sort?.[0] === "end_date_desc_plus" && status?.includes("complete") && format?.includes("light_novel") && "Recently Finished Light Novels",
  },
  "novel": {
    types: ["manga"],
    params: () => ({ sort: ["popularity_desc"], format: "light_novel" }),
    title: ({ sort, format }) => sort?.[0] === "popularity_desc" && format?.length === 1 && format[0] === "light_novel" && "All Time Popular Light Novels",
  },
  "manhwa": {
    types: ["manga"],
    params: () => ({ sort: ["popularity_desc"], country: "KR" }),
    title: ({ sort, country }) => sort?.[0] === "popularity_desc" && country?.length === 1 && country[0] === "KR" && "All Time Popular Manhwa",
  },
  "this-season": {
    types: ["anime"],
    seasonPage: true,
    params: () => {
      const { seasonYear, season } = getSeasonInfo();
      return { year: seasonYear, season: season.toLowerCase() };
    },
    title: seasonTitle,
  },
  "next-season": {
    types: ["anime"],
    seasonPage: true,
    params: () => {
      const { nextYear, nextSeason } = getSeasonInfo();
      return { year: nextYear, season: nextSeason.toLowerCase() };
    },
    title: seasonTitle,
  },
  "tba": {
    types: ALL_TYPES,
    seasonPage: true,
    params: () => ({ season: "tba" }),
    title: seasonTitle,
  },
};

// Headers like "summer-2024"
const SEASON_YEAR_HEADER = /^(winter|spring|summer|fall)-\d+$/;
const seasonYearHeader = {
  types: ["anime"],
  seasonPage: true,
  params: header => {
    const [season, year] = header.split("-");
    return { year: +year, season };
  },
  title: seasonTitle,
};

function getSearchHeader(header) {
  if (!header) return;
  if (Object.hasOwn(searchHeaders, header)) return searchHeaders[header];
  if (SEASON_YEAR_HEADER.test(header)) return seasonYearHeader;
}

export function isSearchHeaderForType(header, type) {
  return getSearchHeader(header)?.types.includes(type) ?? false;
}

export function isSeasonPageHeader(header) {
  return getSearchHeader(header)?.seasonPage ?? false;
}

export function getSearchHeaderParams(header) {
  const searchHeader = getSearchHeader(header);
  if (!searchHeader) return {};
  return { ...searchHeader.params(header), ...(searchHeader.seasonPage && { seasonPage: true }) };
}

export function getSearchHeaderTitle(header, type, searchParams) {
  return getSearchHeader(header)?.title(searchParams, capitalize(type)) || undefined;
}
