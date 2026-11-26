import { useParams, useSearchParams } from "@solidjs/router";
import { useNavigateAndSearch } from "@/utils/urlUtils.js";
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
import { AgeIcon, CountryIcon, FormatIcon, GenreIcon, ListIcon, OnListIcon, SearchIcon, SortIcon, StatusIcon, TypeIcon, YearIcon } from "@/assets/icons.jsx";
import "./SequelSearchControls.scoped.css";

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

// Status of the entry on the list that the sequel or prequel is related to.
// Sequels are for the entries the user has finished, prequels for every entry the user hasn't given up on
export const SEQUEL_STATUS_DEFAULT = ["COMPLETED", "REPEATING"];
export const PREQUEL_STATUS_DEFAULT = ["COMPLETED", "CURRENT", "PAUSED", "PLANNING", "REPEATING"];
// The status params use the defaults when they are empty, so this token is used for showing every status
export const ANY_STATUS = "ANY";

const typeOptions = [
  { description: "Anime",            id: "anime" },
  { description: "Manga",            id: "manga" },
];

// In the order the lists are shown. "All" is the default and can't be selected together with the other lists
export const ALL_RELATIONS = "ALL";
export const relationListOptions = [
  { description: "All",              id: ALL_RELATIONS, title: "Sequels and prequels", tooltip: "Sequels and prequels as one list" },
  { description: "Sequels",          id: "SEQUEL",      title: "Sequels"              },
  { description: "Prequels",         id: "PREQUEL",     title: "Prequels"             },
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

export function SequelSearchControls(props) {
  const { isMobilLarge } = useResponsive();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigateAndSearch();

  const setSearchParams = options => {
    props.setSearchParams(options);
    // The mobile search and filters are reachable from anywhere on the page, so the results could be off the screen
    if (isMobilLarge()) window.scrollTo(0, scrollYBelowNavigation(props.scrollTarget));
  };

  const changeType = type => {
    if (type !== params.type) navigate(`/user/${params.name}/${type}/sequels`, { format: undefined });
  };

  // Selecting the defaults removes the param, and an empty selection shows every status
  const setStatusParam = (param, defaults) => query => {
    const tokens = query[param];
    const isDefault = tokens.length === defaults.length && defaults.every(token => tokens.includes(token));
    setSearchParams({ [param]: !tokens.length ? ANY_STATUS : isDefault ? undefined : tokens });
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

    const search = decodeURIComponent(arrayUtils.wrapToArray(searchParams.q).at(-1) || "");
    if (search) queries.push(createActiveQuery({ description: `Searching "${search}"`, icon: SearchIcon, query: { q: undefined }, clearable: false }, setSearchParams));

    queries.push(...createValueActiveQueries("sort", arrayUtils.wrapToArray(searchParams.sort).filter(Boolean), value => {
      const reversed = value.endsWith(SORT_REVERSE_SUFFIX);
      const id = reversed ? value.slice(0, -SORT_REVERSE_SUFFIX.length) : value;
      return { description: "Sort: " + optionDescription(sortOptions)(id) + (reversed ? " (reversed)" : ""), icon: SortIcon };
    }, setSearchParams));

    queries.push(...createValueActiveQueries ("list",            props.list().filter(id => id !== ALL_RELATIONS), id => ({ description: "List: " + optionDescription(relationListOptions)(id), icon: ListIcon }), setSearchParams));
    // One query per status filter, removing it returns the filter to its defaults
    const statusQuery = (param, label, tokens) => {
      if (!arrayUtils.wrapToArray(searchParams[param]).filter(Boolean).length) return;
      const statuses = tokens.map(token => token[0] === "-" ? "not " + optionDescription(userStatusOptions())(token.slice(1)) : optionDescription(userStatusOptions())(token));
      queries.push(createActiveQuery({ description: label + ": " + (statuses.join(", ") || "Any status"), icon: OnListIcon, query: { [param]: undefined } }, setSearchParams));
    };
    statusQuery("sequelStatus", "Sequels of", props.sequelStatus());
    statusQuery("prequelStatus", "Prequels of", props.prequelStatus());
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
      <div class="sequel-filters">
        <FilterGroups>
          <FilterGroup title="General">
            <FilterSelect radio param="type" noEscapeCancel each={typeOptions} value={[params.type]} onPick={changeType} icon={<TypeIcon />} button="Type" tooltip="Sequels of the user's anime or manga list" />
            <FilterSelect param="list" radio defaultValue={ALL_RELATIONS} each={relationListOptions} countOf={props.listCount} value={props.list()} icon={<ListIcon />} button="List" tooltip="Which lists to show, sequels and prequels as one list by default. Hold Ctrl to show sequels and prequels as separate lists" setSearchParams={setSearchParams} />
            <FilterSelect param="sort" sort defaultValue="averageScore" each={sortOptions} value={props.sort()} icon={<SortIcon />} button="Sort" tooltip="Order of the media. Click a sort again to reverse it, hold Ctrl to sort by multiple fields, hold Shift to add every field in between" setSearchParams={setSearchParams} />
          </FilterGroup>
          <FilterGroup title="Relation">
            <Show when={props.list().includes(ALL_RELATIONS) || props.list().includes("SEQUEL")}>
              <FilterSelect param="sequelStatus" excludable each={userStatusOptions()} value={props.sequelStatus()} icon={<OnListIcon />} button="Sequels of" tooltip={`Show sequels of the entries with these statuses on the list, completed and ${params.type === "anime" ? "rewatching" : "rereading"} entries by default. Click once to include, twice to exclude`} setSearchParams={setStatusParam("sequelStatus", SEQUEL_STATUS_DEFAULT)} />
            </Show>
            <Show when={props.list().includes(ALL_RELATIONS) || props.list().includes("PREQUEL")}>
              <FilterSelect param="prequelStatus" excludable each={userStatusOptions()} value={props.prequelStatus()} icon={<OnListIcon />} button="Prequels of" tooltip="Show prequels of the entries with these statuses on the list, every status except dropped by default. Click once to include, twice to exclude" setSearchParams={setStatusParam("prequelStatus", PREQUEL_STATUS_DEFAULT)} />
            </Show>
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
