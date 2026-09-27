import { useSearchParams } from "@solidjs/router";
import { useParsedSearchParams } from "../../context/providers";
import { SEARCH_DEBOUNCE } from "./index(search2).scoped";
import "./SearchBar.scoped.css";
import { MediaSortSelect } from "./MediaSortSelect.scoped";

export function SearchBar() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();

  let replace = false, timeout;
  const handleInput = e => {
    setSearchParams({ q: encodeURIComponent(e.target.value) || undefined, skipSortByMatch: undefined }, { replace });
    replace = true;
    clearTimeout(timeout);
    timeout = setTimeout(() => replace = false, SEARCH_DEBOUNCE);
  };

  return (
    <div>
      <input type="search" onInput={handleInput} value={parsedSearchParams().q} />
      <MediaSortSelect />
    </div>
  );
}

