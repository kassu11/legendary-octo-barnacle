import { useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import "./MainNavigation.scoped.css";
import { createStore, reconcile } from "solid-js/store";
import { wrapToSet } from "../../utils/arrays";
import { ParsedSearchParamsContext } from "../../context/providers";

const [searchStore, setSearchStore] = createStore({});
export function ParseSearchParams(props) {
  const [searchParams] = useSearchParams();

  const searchObject = createMemo(() => {
    const include = wrapToSet(searchParams.genre);
    const exclude = wrapToSet(searchParams.excludeGenre);

    const newObject = {}
    include.forEach(v => newObject[v] = "inc");
    exclude.forEach(v => newObject[v] = "exc");

    return {
      genres: newObject,
      q: decodeURIComponent(searchParams.q || ""),
      isAdult: false,
    }
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
