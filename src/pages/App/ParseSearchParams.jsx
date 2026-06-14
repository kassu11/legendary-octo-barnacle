import { useSearchParams } from "@solidjs/router";
import { createRenderEffect } from "solid-js";
import "./MainNavigation.scoped.css";
import { createStore, reconcile } from "solid-js/store";
import { wrapToSet } from "../../utils/arrays";

const [searchStore, setSearchStore] = createStore({});
export { searchStore as searchParamsObject };
export function ParseSearchParams() {
  const [searchParams] = useSearchParams();

  createRenderEffect(() => {
    const include = wrapToSet(searchParams.genre);
    const exclude = wrapToSet(searchParams.excludeGenre);

    const newObject = {}
    include.forEach(v => newObject[v] = "inc");
    exclude.forEach(v => newObject[v] = "exc");

    setSearchStore(reconcile({
      genres: newObject,
      q: decodeURIComponent(searchParams.q || ""),
      isAdult: false,
    }));
  });
}
