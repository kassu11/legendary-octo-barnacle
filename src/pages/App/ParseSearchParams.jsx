import { useParams, useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import "./MainNavigation.scoped.css";
import { createStore, reconcile } from "solid-js/store";
import { removeDuplicateIgnoreCaseSensitivity, wrapToArray, wrapToSet } from "../../utils/arrays";
import { ParsedSearchParamsContext } from "../../context/providers";
import { translateInternalSearchParams } from "../../core/apiTranslations";

const [searchStore, setSearchStore] = createStore({});

export function ParseSearchParams(props) {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const searchObject = createMemo(() => {
    const { type, header } = params;

    const obj = {
      q: decodeURIComponent(searchParams.q || ""),
      isAdult: false,
      type,
    };

    if (header === "trending") obj.sort = ["trending_desc"];
    else if (header === "popular") obj.sort = ["popularity_desc", "score_desc"];
    else if (header === "novel") obj.format = "light_novel";
    else if (header === "finished") Object.assign(obj, { sort: ["end_date_desc"], status: "complete", endDateGreater: 0 });
    else if (header === "new") Object.assign(obj, { sort: ["id"] });
    else if (header === "top") Object.assign(obj, { sort: ["score_desc"] });
    else if (header === "finished-manga") Object.assign(obj, { sort: ["end_date_desc"], status: "complete", format: "manga" });
    else if (header === "finished-novel") Object.assign(obj, { sort: ["end_date_desc"], status: "complete", format: "light_novel" });

    const include = wrapToSet(searchParams.genre);
    const exclude = wrapToSet(searchParams.excludeGenre);

    obj.genres = {}
    include.forEach(v => obj.genres[v] = "inc");
    exclude.forEach(v => obj.genres[v] = "exc");

    const filteredSorts = wrapToArray(searchParams.sort).filter(val => translateInternalSearchParams.sort[val]);
    if (filteredSorts.length) obj.sort = removeDuplicateIgnoreCaseSensitivity(filteredSorts);

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
