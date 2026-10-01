import { useSearchParams } from "@solidjs/router";
import { useParsedSearchParams } from "../../context/providers";
import { SEARCH_DEBOUNCE } from "./index(search2).scoped";
import "./SearchBar.scoped.css";
import { MediaSortSelect } from "./MediaSortSelect.scoped";
import { SearchActiveQueries } from "./SearchActiveQueries.scoped";
import { MediaFormatSelect } from "./MediaFormatSelect.scoped";
import { MediaSourceSelect } from "./MediaSourceSelect.scoped";
import { MediaCountrySelect } from "./MediaCountrySelect.scoped";
import { MediaStatusSelect } from "./MediaStatusSelect.scoped";
import { MediaExternalSourcesSelect } from "./MediaExternalSourcesSelect.scoped";
import { MediaAgeSelect } from "./MediaAgeSelect.scoped";

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
    <div class="page">
      <div class="flex">
        <input type="search" placeholder="Search..." onInput={handleInput} value={parsedSearchParams().q} />
        <MediaSortSelect />
        <MediaFormatSelect />
        <MediaSourceSelect />
        <MediaCountrySelect />
        <MediaStatusSelect />
        <MediaAgeSelect />
        <MediaExternalSourcesSelect />
      </div>
      queries: <SearchActiveQueries />
    </div>
  );
}

