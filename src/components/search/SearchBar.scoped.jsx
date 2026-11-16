import { useParsedSearchParams, useResponsive } from "@/state/providers";
import "./SearchBar.scoped.css";
import { MediaSortSelect } from "./inputs/MediaSortSelect.scoped.jsx";
import { SearchActiveQueries, useActiveSearchQueries } from "./SearchActiveQueries.scoped";
import { MediaFormatSelect } from "./inputs/MediaFormatSelect.scoped.jsx";
import { MediaSourceSelect } from "./inputs/MediaSourceSelect.scoped.jsx";
import { MediaCountrySelect } from "./inputs/MediaCountrySelect.scoped.jsx";
import { MediaStatusSelect } from "./inputs/MediaStatusSelect.scoped.jsx";
import { MediaExternalSourcesSelect } from "./inputs/MediaExternalSourcesSelect.scoped.jsx";
import { MediaAgeSelect } from "./inputs/MediaAgeSelect.scoped.jsx";
import { MediaSeasonSelect } from "./inputs/MediaSeasonSelect.scoped";
import { MediaGenresAndTagsSelect } from "./inputs/MediaGenresAndTagsSelect.scoped";
import { TwoStateToggle } from "@/components/filters/TwoStateToggle.scoped";
import { MediaYearSelect } from "./inputs/MediaYearSelect.scoped";
import { MediaProgressSelect } from "./inputs/MediaProgressSelect.scoped";
import { MediaLengthSelect } from "./inputs/MediaLengthSelect.scoped";
import { MediaTagRankSelect } from "./inputs/MediaTagRankSelect.scoped";
import { MediaUsersSelect } from "./inputs/MediaUsersSelect.scoped";
import { MediaTypeSelect } from "./inputs/MediaTypeSelect.scoped";
import { MediaGroupByFormatToggle } from "./inputs/MediaGroupByFormatToggle";
import { LicensedIcon, OnListIcon } from "@/assets/icons.jsx";
import { FilterGroup, FilterGroups, FilterSearchInput, MobileFilters } from "@/components/filters/FilterLayout.scoped.jsx";
import { ScrollToListStartButton } from "@/components/filters/ScrollToListStartButton.scoped.jsx";
import { createMemo, Show } from "solid-js";

export function SearchBar(props) {
  const { isMobilLarge } = useResponsive();
  const activeQueries = useActiveSearchQueries();
  const activeFilterCount = createMemo(() => activeQueries().filter(entry => entry.type !== "01.search").length);

  return (
    <Show when={isMobilLarge()} fallback={
      <div class="search-bar">
        <SearchFilters typeSelect={props.typeSelect}>
          <FilterGroup title="Search" class="search">
            <FilterSearchInput />
          </FilterGroup>
        </SearchFilters>
        <SearchActiveQueries cardStyleToggle={props.cardStyleToggle} />
      </div>
    }>
      <div class="search-bar mobile">
        <MobileFilters search={<FilterSearchInput />} filterCount={activeFilterCount()} action={<ScrollToListStartButton />}>
          <SearchActiveQueries />
          <SearchFilters typeSelect={props.typeSelect} />
        </MobileFilters>
      </div>
    </Show>
  );
}

function SearchFilters(props) {
  const parsedSearchParams = useParsedSearchParams();

  return (
    <FilterGroups>
      {props.children}
      <FilterGroup title="General">
        <MediaSortSelect />
        <Show when={props.typeSelect}>
          <MediaTypeSelect />
        </Show>
        <MediaFormatSelect />
        <MediaStatusSelect />
        <MediaGroupByFormatToggle />
      </FilterGroup>
      <FilterGroup title="Release">
        <Show when={parsedSearchParams().type === "anime"}>
          <MediaSeasonSelect />
        </Show>
        <MediaYearSelect />
        <MediaSourceSelect />
        <MediaCountrySelect />
      </FilterGroup>
      <FilterGroup title="Availability & Lists">
        <MediaExternalSourcesSelect />
        <MediaUsersSelect />
        <TwoStateToggle name="onList" label="On My List" icon={<OnListIcon />} tooltip="Click once to show only media on your list, twice to hide media on your list" />
        <TwoStateToggle name="licensed" label="Licensed" icon={<LicensedIcon />} tooltip="Click once to show only officially licensed media, twice to show only unlicensed media" />
      </FilterGroup>
      <FilterGroup title="Content">
        <MediaGenresAndTagsSelect />
        <MediaTagRankSelect />
        <MediaAgeSelect />
      </FilterGroup>
      <FilterGroup title="Length">
        <MediaProgressSelect />
        <MediaLengthSelect />
      </FilterGroup>
    </FilterGroups>
  );
}
