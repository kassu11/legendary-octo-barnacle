import { useLocation, useNavigate, useParams, useSearchParams } from "@solidjs/router";
import { getDates } from "./dates";

const dates = getDates();

const headers = {
  trending: { order: "trending" },
  popular: { order: "popularity" },
  novel: { format: "lightnovel" },
  finished: { order: "end_date_filtered", status: "complete" },
  new: { order: "id" },
  tba: { season: "tba", status: "upcoming" },
  "top-100": { order: "score" },
  "finished-manga": { order: "end_date_filtered", status: "complete", format: "manga" },
  "finished-novel": { order: "end_date_filtered", status: "complete", format: "lightnovel" },

  ani: {
    anime: {
      "this-season": { year: dates.seasonYear, season: dates.season.toLowerCase(), order: "title_romaji", sort: "ASC" },
      "next-season": { year: dates.nextYear, season: dates.nextSeason.toLowerCase(), order: "title_romaji", sort: "ASC" },
    },
    manhwa: { country: "KR" },
  },
  mal: {
    manhwa: { format: "manhwa" },
  }
};


function keyIsNullish(obj, ...keys) {
  return keys.some(key => key in obj && (obj[key] == null || obj[key].length === 0));
}


// Virtual search params are search options that are not part of the actual search query.
// params.header for example can sort of filter the media by setting default values to virtual params
// the search page than reads these as normal url search query values
export function useVirtualSearchParams() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  return [virtualSearchParams, setVirtualSearchParams];

  // Gives search results that are not present in the actual url, but all virtualSearchParams must be removable
  function virtualSearchParams(key) {
    return searchParams[key] || getVirtualObject()[key];
  }

  function getVirtualObject() {
    if (params.header?.match(/^(summer|fall|spring|winter)-\d+$/)) {
      const [season, year] = params.header.split("-");
      return { year, season, order: "title_romaji", sort: "ASC" }
    }

    const engine = searchParams.malSearch === "true" ? "mal" : "ani";
    return headers[params.header] || headers[engine]?.[params.header] || headers[engine]?.[params.type]?.[params.header] || {};
  }


  function setVirtualSearchParams(sParams, options) {
    const virtualObj = getVirtualObject();
    // The user is trying to remove search results that are part of the virtual url
    // The results are coming from params.header, so lets redirect the user to a page without the current header
    if (keyIsNullish(sParams, ...Object.keys(virtualObj))) {
      return navigate(`/search/${params.type}${searchQueryStringFromObject(sParams)}`, options);
    }

    if (params.header?.match(/^(summer|fall|spring|winter)-\d+$/)) {
      const { season, year, ...restParams } = sParams;
      return navigate(`/search/${params.type}/${season || virtualObj.season}-${year || virtualObj.year}${searchQueryStringFromObject(restParams, false)}`, options);
    }

    // Keep this-season in header if search has only year or season params, but if both are present switch the header to {season-year}
    if (params.header === "this-season" || params.header === "next-season") {
      const { season, year, ...restParams } = sParams;
      const seasonParam = season || searchParams.season;
      const yearParam = year || searchParams.year;
      if (seasonParam != null && yearParam != null) {
        return navigate(`/search/${params.type}/${seasonParam}-${yearParam}${searchQueryStringFromObject(restParams, false)}`, options);
      }
    }

    // No need to redirect, set search params normally
    setSearchParams(sParams, options);
  }


  function searchQueryStringFromObject(sParams, addVirtualParams = true) {
    const virtualObj = getVirtualObject();
    const searchObj = Object.fromEntries(new URLSearchParams(location.search));
    const originalSearchParams = [...new URLSearchParams(location.search)]
    .filter(([key]) => {
      if (key in sParams) {
        return false;
      }
      if (!addVirtualParams && key in virtualObj) {
        return false
      }
      return true;
    })
    .map(([key, val]) => `${key}=${val}`);

    const originalVirtualSearchParams = addVirtualParams === false ? [] : Object.entries(virtualObj)
    .filter(([key]) => {
      if (key in sParams) {
        return false;
      }
      if (key in searchObj) {
        return false
      }
      return true;
    })
    .map(([key, val]) => `${key}=${val}`);

    const newSearchParams = Object.entries(sParams)
    .filter(([, val ]) => searchValueIsNotNullish(val))
    .map(([key, val]) => {
      if (Array.isArray(val)) {
        return val.map(v => `${key}=${v}`).join("&");
      }
      return `${key}=${val}`
    });

    const query = originalVirtualSearchParams
    .concat(originalSearchParams)
    .concat(newSearchParams)
    .join("&");

    if (query.length) {
      return "?" + query;
    }
    return "";
  }
}

function searchValueIsNotNullish(value) {
  return value != null && value.length != 0
}
