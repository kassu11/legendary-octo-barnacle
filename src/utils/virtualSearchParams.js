import { useLocation, useNavigate, useParams, useSearchParams } from "@solidjs/router";

const obj = {
  trending: { order: "trending" },
  novel: { format: "lightnovel" },
  ani: {
    manhwa: { country: "KR" },
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
    const engine = searchParams.malSearch === "true" ? "mal" : "ani";

    return searchParams[key] || obj[params.header]?.[key] || obj[engine]?.[params.header]?.[key] || obj[engine]?.[params.type]?.[params.header]?.[key];
  }


  function setVirtualSearchParams(p, options) {
    for (const [key, value] of Object.entries(p)) {
      if (searchValueIsNotNullish(value) === false && searchParams[key] == null && virtualSearchParams(key) != null) {
        // User is trying to remove search results that is not present inside the url
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

    const newSearchParams = Object.entries(obj)
    .filter(([, val ]) => searchValueIsNotNullish(val))
    .map((key, val) => {
      if (Array.isArray(val)) {
        return val.map(v => `${key}=${v}`).join("&");
      }
      return `${key}=${val}`
    })
    .concat(originalSearchParams)
    .join("&");

    if (newSearchParams.length) {
      return "?" + newSearchParams;
    }
    return "";
  }
}

function searchValueIsNotNullish(value) {
  return value != null && value.length != 0
}
