import { useParams, useSearchParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { useResponsive } from "@/state/providers.js";
import { ToggleButton, TwoStateToggleButton } from "@/components/filters/TwoStateToggle.scoped.jsx";
import { DesktopFilters, FilterGroup, FilterGroups, FilterSearchInput, MobileFilters } from "@/components/filters/FilterLayout.scoped.jsx";
import { ScrollToListStartButton } from "@/components/filters/ScrollToListStartButton.scoped.jsx";
import { ActiveQueries } from "@/components/filters/ActiveQueries.scoped.jsx";
import { addClearAllActiveQuery, createActiveQuery, createToggleActiveQueries, createValueActiveQueries, excludableValueActiveQuery } from "@/utils/activeQueryUtils.js";
import { FilterSelect, SORT_REVERSE_SUFFIX } from "@/components/filters/FilterSelect.scoped.jsx";
import { arrayUtils } from "@/utils/utils.js";
import { scrollYBelowNavigation } from "@/utils/scrollUtils.js";
import { AgeIcon, CountryIcon, FormatIcon, GenreIcon, GitBranchIcon, OnListIcon, SearchIcon, SortIcon, StatusIcon, YearIcon } from "@/assets/icons.jsx";
import "./RelationSearchControls.scoped.css";

const animeFormatOptions = [
  { description: "Movie",            id: "MOVIE"    },
  { description: "Music",            id: "MUSIC"    },
  { description: "ONA",              id: "ONA"      },
  { description: "OVA",              id: "OVA"      },
  { description: "Special",          id: "SPECIAL"  },
  { description: "TV",               id: "TV"       },
  { description: "TV Short",         id: "TV_SHORT" },
];

const mangaFormatOptions = [
  { description: "Light Novel",      id: "NOVEL"    },
  { description: "Manga",            id: "MANGA"    },
  { description: "One-shot",         id: "ONE_SHOT" },
];

// Cancelled relations are never shown
const statusOptions = [
  { description: "Releasing",        id: "RELEASING"        },
  { description: "Finished",         id: "FINISHED"         },
  { description: "Not Yet Released", id: "NOT_YET_RELEASED" },
];

const genreOptions = [
  "Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Hentai", "Horror", "Mahou Shoujo", "Mecha",
  "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller",
].map(toOption);

const countryOptions = [
  { description: "China",            id: "CN" },
  { description: "Japan",            id: "JP" },
  { description: "South Korea",      id: "KR" },
  { description: "Taiwan",           id: "TW" },
];

const relationTypeOptions = [
  { description: "Sequel",           id: "SEQUEL"  },
  { description: "Prequel",          id: "PREQUEL" },
];

const sortOptions = [
  { description: "Average Score",    id: "averageScore", type: "numeric"    },
  { description: "Popularity",       id: "popularity",   type: "numeric"    },
  { description: "Release Date",     id: "releaseDate",  type: "numeric"    },
  { description: "Title",            id: "title",        type: "alphabetic" },
];

const yearOptions = [];
for (let year = new Date().getFullYear() + 2; year >= 1930; year--) yearOptions.push(toOption("" + year));

function toOption(name) {
  return { description: name, id: name };
}

export function RelationSearchControls(props) {
  const { isMobilLarge } = useResponsive();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const setSearchParams = options => {
    props.setSearchParams(options);
    // The mobile search and filters are reachable from anywhere on the page, so the results could be off the screen
    if (isMobilLarge()) window.scrollTo(0, scrollYBelowNavigation(props.scrollTarget));
  };

  const userStatusOptions = createMemo(() => [
    { description: "Completed",                                          id: "COMPLETED" },
    { description: params.type === "anime" ? "Watching" : "Reading",     id: "CURRENT"   },
    { description: "Dropped",                                            id: "DROPPED"   },
    { description: "Paused",                                             id: "PAUSED"    },
    { description: "Planning",                                           id: "PLANNING"  },
    { description: params.type === "anime" ? "Rewatching" : "Rereading", id: "REPEATING" },
  ]);

  const activeQueries = createMemo(() => {
    const queries = [];
    const optionDescription = options => id => options.find(option => option.id === id)?.description ?? id;

    const search = arrayUtils.wrapToArray(searchParams.q).at(-1);
    if (search) queries.push(createActiveQuery({ description: `Searching "${search}"`, icon: SearchIcon, query: { q: undefined }, clearable: false }, setSearchParams));

    queries.push(...createValueActiveQueries("sort", arrayUtils.wrapToArray(searchParams.sort).filter(Boolean), value => {
      const reversed = value.endsWith(SORT_REVERSE_SUFFIX);
      const id = reversed ? value.slice(0, -SORT_REVERSE_SUFFIX.length) : value;
      return { description: "Sort: " + optionDescription(sortOptions)(id) + (reversed ? " (reversed)" : ""), icon: SortIcon };
    }, setSearchParams));

    queries.push(...createValueActiveQueries ("relationType",    props.relationType(),    id => ({ description: "Relation: " + optionDescription(relationTypeOptions)(id), icon: GitBranchIcon }), setSearchParams));
    queries.push(...createValueActiveQueries ("userStatus",      props.userStatus(),      excludableValueActiveQuery("User Status", OnListIcon,    optionDescription(userStatusOptions())), setSearchParams));
    if (props.matchFormat() === "true") queries.push(createActiveQuery({ description: "Same format", icon: FormatIcon, query: { matchFormat: undefined } }, setSearchParams));
    queries.push(...createValueActiveQueries ("format",          props.format(),          excludableValueActiveQuery("Format",      FormatIcon,    optionDescription(params.type === "anime" ? animeFormatOptions : mangaFormatOptions)), setSearchParams));
    queries.push(...createValueActiveQueries ("status",          props.status(),          excludableValueActiveQuery("Status",      StatusIcon,    optionDescription(statusOptions)),       setSearchParams));
    queries.push(...createValueActiveQueries ("countryOfOrigin", props.countryOfOrigin(), excludableValueActiveQuery("Country",     CountryIcon,   optionDescription(countryOptions)),      setSearchParams));
    queries.push(...createValueActiveQueries ("year",            props.year(),            excludableValueActiveQuery("Year",        YearIcon),                                              setSearchParams));
    queries.push(...createValueActiveQueries ("genre",           props.genre(),           excludableValueActiveQuery("Genre",       GenreIcon),                                             setSearchParams));
    queries.push(...createToggleActiveQueries("isAdult",         props.isAdult(),         { included: "R-18", excluded: "Not R-18", icon: AgeIcon },                                        setSearchParams));

    addClearAllActiveQuery(queries, setSearchParams);
    return queries;
  });

  const activeFilterCount = createMemo(() => activeQueries().filter(activeQuery => activeQuery.clearable).length);

  return (
    <Show when={isMobilLarge()} fallback={
      <>
        <DesktopFilters scrollTarget={props.scrollTarget} searchFocusShortcut filterCount={activeFilterCount()}>
          <Filters />
        </DesktopFilters>
        <ActiveQueries activeQueries={activeQueries()} />
      </>
    }>
      <MobileFilters search={<FilterSearchInput scrollTarget={props.scrollTarget} focusShortcut />} filterCount={activeFilterCount()} action={<ScrollToListStartButton scrollTarget={props.scrollTarget} />}>
        <ActiveQueries activeQueries={activeQueries()} />
        <Filters />
      </MobileFilters>
      <ActiveQueries activeQueries={activeQueries()} singleRow />
    </Show>
  );

  function Filters() {
    return (
      <div class="relation-filters">
        <FilterGroups>
          <FilterGroup title="General">
            <FilterSelect param="sort" sort defaultValue="averageScore" each={sortOptions} value={props.sort()} icon={<SortIcon />} button="Sort" tooltip="Order of the relations. Click a sort again to reverse it, hold Ctrl to sort by multiple fields, hold Shift to add every field in between" setSearchParams={setSearchParams} />
          </FilterGroup>
          <FilterGroup title="Relation">
            <FilterSelect param="relationType" radio defaultValue="" each={relationTypeOptions} value={props.relationType()} icon={<GitBranchIcon />} button="Relation" tooltip="How the media is related to the entry on the list, both when none is selected" setSearchParams={setSearchParams} />
            <FilterSelect param="userStatus" excludable each={userStatusOptions()} value={props.userStatus()} icon={<OnListIcon />} button="User Status" tooltip="Status of the related entry on this user's list. Click once to include, twice to exclude" setSearchParams={setSearchParams} />
            <ToggleButton checked={props.matchFormat() === "true"} icon={<FormatIcon />} label="Same format" tooltip="Show only relations with the same format as the entry on the list. Movies are always shown" onChange={() => setSearchParams({ matchFormat: props.matchFormat() === "true" ? undefined : "true" })} />
          </FilterGroup>
          <FilterGroup title="Media">
            <FilterSelect param="format"          excludable each={ params.type === "anime" ? animeFormatOptions : mangaFormatOptions } value={ props.format() } icon={ <FormatIcon /> } button="Format" tooltip={`How the media was released, e.g. ${params.type === "anime" ? "TV series or movie" : "manga or light novel"}. Click once to include, twice to exclude`} setSearchParams={ setSearchParams } />
            <FilterSelect param="status"          excludable each={ statusOptions  } value={ props.status()          } icon={ <StatusIcon />  } button="Status"  tooltip="Current release status of the media. Click once to include, twice to exclude" setSearchParams={ setSearchParams } />
            <FilterSelect param="countryOfOrigin" excludable each={ countryOptions } value={ props.countryOfOrigin() } icon={ <CountryIcon /> } button="Country" tooltip="Country of origin. Click once to include, twice to exclude"                   setSearchParams={ setSearchParams } />
            <FilterSelect param="year"            excludable each={ yearOptions    } value={ props.year()            } icon={ <YearIcon />    } button="Year"    tooltip="Year the media started releasing. Click once to include, twice to exclude"    setSearchParams={ setSearchParams } />
          </FilterGroup>
          <FilterGroup title="Content">
            <FilterSelect param="genre" excludable each={genreOptions} value={props.genre()} icon={<GenreIcon />} button="Genre" tooltip="Media needs to have all the included genres. Click once to include, twice to exclude" setSearchParams={setSearchParams} />
            <TwoStateToggleButton value={props.isAdult()} icon={<AgeIcon />} label="R-18" tooltip="Click once to show only R-18 media, twice to hide R-18 media" onChange={value => setSearchParams({ isAdult: value })} />
          </FilterGroup>
        </FilterGroups>
      </div>
    );
  }
}
