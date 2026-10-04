import { useSearchParams } from "@solidjs/router";
import { useParsedSearchParams } from "../../context/providers";
import { SEARCH_DEBOUNCE } from "./index(search2).scoped";
import "./SearchBar.scoped.css";
import { MediaSortSelect } from "./inputs/MediaSortSelect.scoped.jsx";
import { SearchActiveQueries } from "./SearchActiveQueries.scoped";
import { MediaFormatSelect } from "./inputs/MediaFormatSelect.scoped.jsx";
import { MediaSourceSelect } from "./inputs/MediaSourceSelect.scoped.jsx";
import { MediaCountrySelect } from "./inputs/MediaCountrySelect.scoped.jsx";
import { MediaStatusSelect } from "./inputs/MediaStatusSelect.scoped.jsx";
import { MediaExternalSourcesSelect } from "./inputs/MediaExternalSourcesSelect.scoped.jsx";
import { MediaAgeSelect } from "./inputs/MediaAgeSelect.scoped.jsx";
import { MediaSeasonSelect } from "./inputs/MediaSeasonSelect.scoped";
import { MediaGenresAndTagsSelect } from "./inputs/MediaGenresAndTagsSelect.scoped";
import { TwoStateToggle } from "./TwoStateToggle.scoped";
import { MediaYearSelect } from "./inputs/MediaYearSelect.scoped";

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
        <MediaSeasonSelect />
        <MediaExternalSourcesSelect />
        <MediaGenresAndTagsSelect />
        <MediaYearSelect />
        <TwoStateToggle name="onList" label="On My List" />
        <TwoStateToggle name="licensed" label="Licensed" />
      </div>
      queries: <SearchActiveQueries />
    </div>
  );
}
