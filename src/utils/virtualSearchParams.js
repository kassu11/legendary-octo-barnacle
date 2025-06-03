import { useLocation, useNavigate, useParams, useSearchParams } from "@solidjs/router";

const obj = {
  trending: { order: "trending" },
  novel: { format: "lightnovel" },
  ani: {
    manhwa: { country: "KR" },
    "finished-manga": { order: "end_date_filtered", status: "complete" },
    anime: {
    },
    manga: {
    },
    media: {
    }
  },
  mal: {
    manhwa: { format: "manhwa" },
  }
};

const animeSearch = {
  type: "anime",
  header: ["finished", "this-season", "new", "next-season", "trending", "popular", "top-100"],
}
const mangaSearch = {
  type: "manga",
  header: ["finished", "finished-manga", "finished-novel", "novel", "new", "manhwa", "trending", "popular", "top-100"],
}

const bothSearch = {
  type: "media",
  header: ["finished", "trending", "popular", "top-100"],
}




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
    const engine = searchParams.malSearch === "true" ? "mal" : "ani";
    return obj[params.header] || obj[engine]?.[params.header] || obj[engine]?.[params.type]?.[params.header] || {};
  }


  function setVirtualSearchParams(p, options) {
    for (const [key, value] of Object.entries(p)) {
      if (key in getVirtualObject()) {
        // User is trying to change search results that is part of the virtual url
        // The results is coming from params.header, so lets redirect the user to a page without the current header
        return navigate(`/search/${params.type}${searchQueryStringFromObject(p)}`);
      }
    }

    // No need to redirect, set search params normally
    setSearchParams(p, options);
  }


  function searchQueryStringFromObject(obj) {
    const originalSearchParams = [...new URLSearchParams(location.search)]
    .filter(([key]) => (key in obj) === false)
    .map(([key, val]) => `${key}=${val}`);

    const originalVirtualSearchParams = Object.entries(getVirtualObject())
    .filter(([key]) => (key in obj) === false)
    .map(([key, val]) => `${key}=${val}`);

    const newSearchParams = Object.entries(obj)
    .filter(([, val ]) => searchValueIsNotNullish(val))
    .map(([key, val]) => {
      if (Array.isArray(val)) {
        return val.map(v => `${key}=${v}`).join("&");
      }
      return `${key}=${val}`
    });

    console.log(
      obj,
    originalVirtualSearchParams,
    originalSearchParams,
    newSearchParams,
    )

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
