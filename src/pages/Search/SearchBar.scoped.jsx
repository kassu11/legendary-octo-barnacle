import { useParams, useSearchParams } from "@solidjs/router";
import { useParsedSearchParams, useResponsive } from "../../context/providers";
import { SEARCH_DEBOUNCE } from "./index(search2).scoped";
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
import { TwoStateToggle } from "./TwoStateToggle.scoped";
import { MediaYearSelect } from "./inputs/MediaYearSelect.scoped";
import { MediaProgressSelect } from "./inputs/MediaProgressSelect.scoped";
import { MediaLengthSelect } from "./inputs/MediaLengthSelect.scoped";
import { MediaTagRankSelect } from "./inputs/MediaTagRankSelect.scoped";
import { MediaUsersSelect } from "./inputs/MediaUsersSelect.scoped";
import { MediaTypeSelect } from "./inputs/MediaTypeSelect.scoped";
import { FiltersIcon, LicensedIcon, OnListIcon, SearchIcon, XIcon } from "../../assets/SearchFilterIcons.jsx";
import { createMemo, Show } from "solid-js";

export function SearchBar() {
  const { isMobilLarge } = useResponsive();
  const activeQueries = useActiveSearchQueries();
  const activeFilterCount = createMemo(() => activeQueries().filter(entry => entry.type !== "01.search").length);

  let dialog, closing = false;
  const SLIDE_DURATION = 250;
  const slide = (from, to, easing, fill) => dialog.animate({ translate: [from, to] }, { duration: SLIDE_DURATION, easing, fill });
  const fadeBackdrop = (from, to, fill) => dialog.animate({ opacity: [from, to] }, { duration: SLIDE_DURATION, pseudoElement: "::backdrop", fill });

  const openFilters = () => {
    dialog.showModal();
    slide("0 100%", "0 0", "ease-out");
    fadeBackdrop(0, 1);
  };
  const closeFilters = async () => {
    if (closing || !dialog.open) return;
    closing = true;
    const from = dialog.style.translate || "0 0";
    dialog.style.translate = "";
    // Fill keeps the modal hidden until it's closed, the animations are removed after closing
    const animations = [fadeBackdrop(1, 0, "forwards"), slide(from, "0 100%", "ease-in", "forwards")];
    await animations[1].finished.catch(() => {});
    dialog.close();
    animations.forEach(animation => animation.cancel());
    closing = false;
  };
  const handleDialogClick = e => {
    // Clicked the backdrop
    if (e.target === dialog && !dragged) closeFilters();
    dragged = false;
  };
  const handleDialogCancel = e => {
    // Escape key, play the closing animation instead of closing instantly
    e.preventDefault();
    closeFilters();
  };

  // Drag the modal header down to close the modal. Pointer events work for both touch and mouse
  let dragStartY, dragged = false;
  const dragDistance = e => Math.max(0, e.clientY - dragStartY);
  const handleDragStart = e => {
    // Don't start dragging from the close button
    if (e.button !== 0 || e.target.closest("button")) return;
    e.preventDefault(); // Prevents text selection with mouse
    dragStartY = e.clientY;
    dragged = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handleDragMove = e => {
    if (dragStartY === undefined) return;
    if (dragDistance(e) > 5) dragged = true;
    dialog.style.translate = `0 ${dragDistance(e)}px`;
  };
  const handleDragEnd = e => {
    if (dragStartY === undefined) return;
    const distance = dragDistance(e);
    dragStartY = undefined;
    if (distance > 100) return closeFilters();
    // Not dragged far enough, snap back
    dialog.style.translate = "";
    slide(`0 ${distance}px`, "0 0", "ease-out");
  };

  return (
    <Show when={isMobilLarge()} fallback={
      <div class="search-bar">
        <SearchFilters>
          <FilterGroup title="Search" class="search">
            <SearchInput />
          </FilterGroup>
        </SearchFilters>
        <SearchActiveQueries />
      </div>
    }>
      <div class="search-bar mobile">
        <SearchActiveQueries singleRow />
        <div class="bottom-bar">
          <SearchInput />
          <button class="filters-button" onClick={openFilters} aria-label="Open filters">
            <FiltersIcon scoped />
            <Show when={activeFilterCount()}>
              <span class="count">{activeFilterCount()}</span>
            </Show>
          </button>
        </div>
        <dialog class="filters-modal" ref={elem => dialog = elem} onClick={handleDialogClick} onCancel={handleDialogCancel}>
          <div class="modal-header" onPointerDown={handleDragStart} onPointerMove={handleDragMove} onPointerUp={handleDragEnd} onPointerCancel={handleDragEnd}>
            <h2>Filters</h2>
            <button class="close-button" onClick={closeFilters} aria-label="Close filters">
              <XIcon scoped />
            </button>
          </div>
          <div class="modal-content">
            <SearchActiveQueries />
            <SearchFilters />
          </div>
          <div class="modal-footer">
            <button class="show-results" onClick={closeFilters}>Show results</button>
          </div>
        </dialog>
      </div>
    </Show>
  );
}

function SearchInput() {
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
    <label class="search-input">
      <SearchIcon scoped />
      <input type="search" placeholder="Search..." onInput={handleInput} value={parsedSearchParams().q || ""} enterkeyhint="search" />
    </label>
  );
}

function SearchFilters(props) {
  const params = useParams();

  return (
    <div class="filter-groups">
      {props.children}
      <FilterGroup title="General">
        <MediaSortSelect />
        <MediaTypeSelect />
        <MediaFormatSelect />
        <MediaStatusSelect />
      </FilterGroup>
      <FilterGroup title="Release">
        <Show when={params.type === "anime"}>
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
    </div>
  );
}

function FilterGroup(props) {
  return (
    <section class="filter-group" classList={{ [props.class]: !!props.class }}>
      <h3>{props.title}</h3>
      <div class="filters">
        {props.children}
      </div>
    </section>
  );
}
