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
import { MediaGroupBySelect } from "./inputs/MediaGroupBySelect";
import { CharacterRoleSelect } from "./inputs/CharacterRoleSelect";
import { VoiceActorLanguageSelect } from "./inputs/VoiceActorLanguageSelect";
import { LicensedIcon, OnListIcon } from "@/assets/icons.jsx";
import { FilterGroup, FilterGroups, FilterSearchInput, MobileFilters } from "@/components/filters/FilterLayout.scoped.jsx";
import { ScrollToListStartButton } from "@/components/filters/ScrollToListStartButton.scoped.jsx";
import { createMemo, Show } from "solid-js";

/**
 * @param {Object} props
 * @param {boolean} [props.typeSelect] Media type select
 * @param {boolean} [props.typeSearchParam] Type select changes the type search param instead of the path
 * @param {boolean} [props.cardStyleToggle] Card style toggle next to the active queries
 * @param {boolean} [props.characterFilters] Role and voice actor language filters of a character page
 * @param {Map<number, Object>} [props.characterRoles] Character media edges by the media id, used by the character filters
 * @param {string[]} [props.voiceActorLanguages] Languages of the voice actors shown on the cards, used by the character filters
 */
export function SearchBar(props) {
  const { isMobilLarge } = useResponsive();
  const activeQueries = useActiveSearchQueries();
  const activeFilterCount = createMemo(() => activeQueries().filter(entry => entry.type !== "01.search").length);

  return (
    <Show when={isMobilLarge()} fallback={
      <div class="search-bar">
        <SearchFilters typeSelect={props.typeSelect} typeSearchParam={props.typeSearchParam} characterFilters={props.characterFilters} characterRoles={props.characterRoles} voiceActorLanguages={props.voiceActorLanguages}>
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
          <SearchFilters typeSelect={props.typeSelect} typeSearchParam={props.typeSearchParam} characterFilters={props.characterFilters} characterRoles={props.characterRoles} voiceActorLanguages={props.voiceActorLanguages} />
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
      <Show when={props.characterFilters}>
        <FilterGroup title="Roles">
          <CharacterRoleSelect characterRoles={props.characterRoles} />
        </FilterGroup>
        <FilterGroup title="Voice Actors">
          <VoiceActorLanguageSelect characterRoles={props.characterRoles} languages={props.voiceActorLanguages} />
        </FilterGroup>
      </Show>
      <FilterGroup title="General">
        <MediaSortSelect />
        <Show when={props.typeSelect}>
          <MediaTypeSelect searchParam={props.typeSearchParam} />
        </Show>
        <MediaFormatSelect />
        <MediaStatusSelect />
        <MediaGroupBySelect />
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
