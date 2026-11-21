import { A, useLocation, useParams, useSearchParams } from "@solidjs/router";
import { useAuthentication, useResponsive, useUser, useUserMediaList } from "@/state/providers.js";
import { createMemo, mapArray, Match, Show, Switch } from "solid-js";
import { ALL_LISTS, COMBINED_LIST } from "@/constants/mediaLists.js";
import { TwoStateToggleButton } from "@/components/filters/TwoStateToggle.scoped.jsx";
import { DesktopFilters, FilterGroup, FilterGroups, FilterSearchInput, MobileFilters } from "@/components/filters/FilterLayout.scoped.jsx";
import { ScrollToListStartButton } from "@/components/filters/ScrollToListStartButton.scoped.jsx";
import { ActiveQueries } from "@/components/filters/ActiveQueries.scoped.jsx";
import { addClearAllActiveQuery, createActiveQuery, createToggleActiveQueries, createValueActiveQueries, excludableValueActiveQuery } from "@/utils/activeQueryUtils.js";
import { FilterSelect, SORT_REVERSE_SUFFIX } from "@/components/filters/FilterSelect.scoped.jsx";
import { arrayUtils } from "@/utils/utils.js";
import { scrollYBelowNavigation } from "@/utils/scrollUtils.js";
import { AgeIcon, CloseIcon, CountryIcon, FormatIcon, GenreIcon, ListIcon, MissingDateIcon, NotesIcon, OnListIcon, PrivateIcon, ProgressIcon as TagIcon, RepeatOutlineIcon, ScoreIcon, SearchIcon, SortIcon, StatusIcon, StudioIcon, TagsIcon, YearIcon } from "@/assets/icons.jsx";
import "./SearchControls.scoped.css";

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

const statusOptions = [
  { description: "Releasing",        id: "RELEASING"        },
  { description: "Finished",         id: "FINISHED"         },
  { description: "Not Yet Released", id: "NOT_YET_RELEASED" },
  { description: "Cancelled",        id: "CANCELLED"        },
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

const yearOptions = [];
for (let year = new Date().getFullYear() + 2; year >= 1930; year--) yearOptions.push(toOption("" + year));

function toOption(name) {
  return { description: name, id: name };
}

const toListOption = name => {
  switch (name) {
    case COMBINED_LIST: return { description: listTitle(name), id: name, tooltip: "Every list as one list, entries that are in many lists are shown once" };
    default: return { description: name, id: name };
  }
};

export const listTitle = name => name === COMBINED_LIST ? "All" : name;

// Every search param that the remove filters button clears, together with q
const filterParams = ["list", "sort", "format", "status", "countryOfOrigin", "year", "studio", "genre", "tag", "isAdult", "userStatus", "startedYear", "completedYear", "notes", "repeat", "private", "missingStart", "missingEnd", "missingScore"];

export function SearchControlsScoped(props) {
  const location = useLocation();
  const {authUserData} = useAuthentication();
  const {isOwnProfile} = useUserMediaList();
  const {isMobilLarge} = useResponsive();
  const {user} = useUser();
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

  const sortOptions = createMemo(() => [
    { description: "Score",                                           id: "score",        type: "numeric"    },
    { description: "Title",                                           id: "title",        type: "alphabetic" },
    { description: "Progress",                                        id: "progress",     type: "numeric"    },
    { description: "Last Updated",                                    id: "updatedAt",    type: "numeric"    },
    { description: "Start Date",                                      id: "startedAt",    type: "numeric"    },
    { description: "Completed Date",                                  id: "completedAt",  type: "numeric"    },
    { description: "Release Date",                                    id: "releaseDate",  type: "numeric"    },
    { description: "Average Score",                                   id: "averageScore", type: "numeric"    },
    { description: "Popularity",                                      id: "popularity",   type: "numeric"    },
    { description: params.type === "anime" ? "Rewatches" : "Rereads", id: "repeat",       type: "numeric"    },
    { description: "List Order",                                      id: "list",         type: "order",     tooltip: "Sorts the \"All\" list by the order of the lists" },
  ]);

  // The worker sends new arrays after every filter change. mapArray keeps the same option objects
  // for the same names, so the open select doesn't rerender its items and lose the scroll position
  const studioOptions = createMemo(mapArray(() => props.listData()?.data?.studios, toOption));
  const tagOptions = createMemo(mapArray(() => props.listData()?.data?.tags, toOption));
  const startedYearOptions = createMemo(mapArray(() => props.listData()?.data?.startedYears, toOption));
  const completedYearOptions = createMemo(mapArray(() => props.listData()?.data?.completedYears, toOption));
  const listOptions = createMemo(mapArray(() => props.listData()?.data?.lists.map(list => list.name), toListOption));
  const listCounts = createMemo(() => new Map(props.listData()?.data?.lists.map(list => [list.name, list.entries.length])));

  const activeQueries = createMemo(() => {
    const queries = [];
    const optionDescription = options => id => options.find(option => option.id === id)?.description ?? id;
    const watched = params.type === "anime" ? "Rewatched" : "Reread";

    const search = arrayUtils.wrapToArray(searchParams.q).at(-1);
    if (search) queries.push(createActiveQuery({ description: `Searching "${search}"`, icon: SearchIcon, query: { q: undefined }, clearable: false }, setSearchParams));

    queries.push(...createValueActiveQueries("list", props.list(), name => ({ description: "List: " + listTitle(name), icon: ListIcon }), setSearchParams));

    queries.push(...createValueActiveQueries("sort", arrayUtils.wrapToArray(searchParams.sort).filter(Boolean), value => {
      const reversed = value.endsWith(SORT_REVERSE_SUFFIX);
      const id = reversed ? value.slice(0, -SORT_REVERSE_SUFFIX.length) : value;
      return { description: "Sort: " + optionDescription(sortOptions())(id) + (reversed ? " (reversed)" : ""), icon: SortIcon };
    }, setSearchParams));

    queries.push(...createValueActiveQueries ("format",          props.format(),             excludableValueActiveQuery("Format",      FormatIcon,  optionDescription(params.type === "anime" ? animeFormatOptions : mangaFormatOptions)), setSearchParams));
    queries.push(...createValueActiveQueries ("status",          props.status(),             excludableValueActiveQuery("Status",      StatusIcon,  optionDescription(statusOptions)),       setSearchParams));
    queries.push(...createValueActiveQueries ("countryOfOrigin", props.countryOfOrigin(),    excludableValueActiveQuery("Country",     CountryIcon, optionDescription(countryOptions)),      setSearchParams));
    queries.push(...createValueActiveQueries ("year",            props.year(),               excludableValueActiveQuery("Year",        YearIcon),                                            setSearchParams));
    queries.push(...createValueActiveQueries ("studio",          props.studio(),             excludableValueActiveQuery("Studio",      StudioIcon),                                          setSearchParams));
    queries.push(...createValueActiveQueries ("genre",           props.genre(),              excludableValueActiveQuery("Genre",       GenreIcon),                                           setSearchParams));
    queries.push(...createValueActiveQueries ("tag",             props.tag(),                excludableValueActiveQuery("Tag",         TagsIcon),                                            setSearchParams));
    queries.push(...createToggleActiveQueries("isAdult",         props.isAdult(),            { included: "R-18", excluded: "Not R-18", icon: AgeIcon },                                      setSearchParams));
    queries.push(...createValueActiveQueries ("userStatus",      props.userStatus(),         excludableValueActiveQuery("User Status", OnListIcon,  optionDescription(userStatusOptions())), setSearchParams));
    queries.push(...createValueActiveQueries ("startedYear",     props.startedYear(),        excludableValueActiveQuery("Start Year",  YearIcon),                                            setSearchParams));
    queries.push(...createValueActiveQueries ("completedYear",   props.completedYear(),      excludableValueActiveQuery("End Year",    YearIcon),                                            setSearchParams));
    queries.push(...createToggleActiveQueries("notes",           props.notesFilter(),        { included: "Has notes",          excluded: "No notes",                       icon: NotesIcon         }, setSearchParams));
    queries.push(...createToggleActiveQueries("repeat",          props.rewatchedFilter(),    { included: watched,              excluded: "Not " + watched.toLowerCase(),   icon: RepeatOutlineIcon }, setSearchParams));
    queries.push(...createToggleActiveQueries("private",         props.privateFilter(),      { included: "Private",            excluded: "Not private",                    icon: PrivateIcon       }, setSearchParams));
    queries.push(...createToggleActiveQueries("missingStart",    props.missingStartFilter(), { included: "Missing start date", excluded: "Has start date",                 icon: MissingDateIcon   }, setSearchParams));
    queries.push(...createToggleActiveQueries("missingEnd",      props.missingEndFilter(),   { included: "Missing end date",   excluded: "Has end date",                   icon: MissingDateIcon   }, setSearchParams));
    queries.push(...createToggleActiveQueries("missingScore",    props.missingScoreFilter(), { included: "Missing score",      excluded: "Has score",                      icon: ScoreIcon         }, setSearchParams));

    addClearAllActiveQuery(queries, setSearchParams);
    return queries;
  });

  const activeFilterCount = createMemo(() => activeQueries().filter(activeQuery => activeQuery.clearable).length);

  return (
    <Show when={isMobilLarge()} fallback={
      <>
        <DesktopFilters scrollTarget={props.scrollTarget} filterCount={activeFilterCount()}>
          <Filters />
        </DesktopFilters>
        <ActiveQueries activeQueries={activeQueries()} />
      </>
    }>
      <MobileFilters search={<FilterSearchInput scrollTarget={props.scrollTarget} />} filterCount={activeFilterCount()} action={<ScrollToListStartButton scrollTarget={props.scrollTarget} />}>
        <ActiveQueries activeQueries={activeQueries()} />
        <Filters />
      </MobileFilters>
      <ActiveQueries activeQueries={activeQueries()} singleRow />
    </Show>
  );

  function Filters() {
    return (
      <div class="user-list-filters">
        <FilterGroups>
          <FilterGroup title="General">
            <FilterSelect param="list" radio defaultValue={ALL_LISTS} each={listOptions()} countOf={id => listCounts().get(id)} value={props.list()} icon={<ListIcon />} button="List" tooltip="Which lists to show, every list separately when none is selected. Hold Ctrl to add a list to the selection, hold Shift or drag to select every list in between" setSearchParams={setSearchParams} />
            <FilterSelect param="sort" sort defaultValue="score" each={sortOptions()} value={props.sort()} icon={<SortIcon />} button="Sort" tooltip="Order of the list. Click a sort again to reverse it, hold Ctrl to sort by multiple fields, hold Shift to add every field in between" setSearchParams={setSearchParams} />
            <Switch>
              <Match when={!isOwnProfile() && authUserData()?.data?.name}>
                <A scoped class="action" href={"/compare/" + params.type + "?user=" + user().name + "&user=" + authUserData().data.name}>Compare with your list</A>
              </Match>
              <Match when={true}>
                <A scoped class="action" href={"/compare/" + params.type + "?user=" + user().name}>Open in compare page</A>
              </Match>
            </Switch>
            <button class="action remove-filters" disabled={!location.search} onClick={() => setSearchParams(Object.fromEntries(["q", ...filterParams].map(name => [name, undefined])))}>
              <CloseIcon />
              Remove filters
            </button>
          </FilterGroup>
          {/* Filters that depend on the page are last in their group, so the other filters are always in the same place */}
          <FilterGroup title="Media">
            <FilterSelect   param="format"          excludable each={ params.type === "anime" ? animeFormatOptions : mangaFormatOptions } value={ props.format() } icon={ <FormatIcon /> } button="Format" tooltip={`How the media was released, e.g. ${params.type === "anime" ? "TV series or movie" : "manga or light novel"}. Click once to include, twice to exclude`} setSearchParams={ setSearchParams } />
            <FilterSelect   param="status"          excludable each={ statusOptions       } value={ props.status()          } icon={ <StatusIcon />  } button="Status"      tooltip="Current release status of the media. Click once to include, twice to exclude"                                               setSearchParams={ setSearchParams } />
            <FilterSelect   param="countryOfOrigin" excludable each={ countryOptions      } value={ props.countryOfOrigin() } icon={ <CountryIcon /> } button="Country"     tooltip="Country of origin. Click once to include, twice to exclude"                                                                 setSearchParams={ setSearchParams } />
            <FilterSelect   param="year"            excludable each={ yearOptions         } value={ props.year()            } icon={ <YearIcon />    } button="Year"        tooltip="Year the media started releasing. Click once to include, twice to exclude"                                                  setSearchParams={ setSearchParams } />
            <Show when={params.type === "anime"}>
              <FilterSelect param="studio"          excludable each={ studioOptions()     } value={ props.studio()          } icon={ <StudioIcon />  } button="Studio"      tooltip="Main studio of the media. Click once to include, twice to exclude"                                                          setSearchParams={ setSearchParams } />
            </Show>
          </FilterGroup>
          <FilterGroup title="Content">
            <FilterSelect   param="genre"           excludable each={ genreOptions        } value={ props.genre()           } icon={ <GenreIcon />   } button="Genre"       tooltip="Entries need to have all the included genres. Click once to include, twice to exclude"                                      setSearchParams={ setSearchParams } />
            <FilterSelect   param="tag"             excludable each={ tagOptions()        } value={ props.tag()             } icon={ <TagIcon />     } button="Tag"         tooltip="Entries need to have all the included tags, only tags with a rank above 50% count. Click once to include, twice to exclude" setSearchParams={ setSearchParams } />
            <ListToggle param="isAdult"      value={ props.isAdult() }            icon={ <AgeIcon />         } label="R-18"                                             tooltip="Click once to show only R-18 media, twice to hide R-18 media" />
          </FilterGroup>
          <FilterGroup title="List entry">
            <FilterSelect   param="userStatus"      excludable each={ userStatusOptions() } value={ props.userStatus()      } icon={ <OnListIcon />  } button="User Status" tooltip="Status of the entry on this user's list. Click once to include, twice to exclude"                                           setSearchParams={ setSearchParams } />
            <FilterSelect   param="startedYear"     excludable each={ startedYearOptions()  } value={ props.startedYear()     } icon={ <YearIcon />    } button="Start Year"  tooltip="Year the user started the entry. Click once to include, twice to exclude"                                                  setSearchParams={ setSearchParams } />
            <FilterSelect   param="completedYear"   excludable each={ completedYearOptions()} value={ props.completedYear()   } icon={ <YearIcon />    } button="End Year"    tooltip="Year the user completed the entry. Click once to include, twice to exclude"                                                setSearchParams={ setSearchParams } />
            <ListToggle param="notes"        value={ props.notesFilter() }       icon={ <NotesIcon />       } label="Notes"                                            tooltip="Click once to show only entries with notes, twice to hide entries with notes" />
            <ListToggle param="repeat"       value={ props.rewatchedFilter() }    icon={ <RepeatOutlineIcon />      } label={params.type === "anime" ? "Rewatched" : "Reread"} tooltip={`Click once to show only ${params.type === "anime" ? "rewatched" : "reread"} entries, twice to hide them`} />
            <Show when={isOwnProfile()}>
              <ListToggle param="private"    value={ props.privateFilter() }      icon={ <PrivateIcon />     } label="Private"                                          tooltip="Click once to show only private entries, twice to hide private entries" />
            </Show>
          </FilterGroup>
          <FilterGroup title="Missing">
            <ListToggle param="missingStart" value={ props.missingStartFilter() } icon={ <MissingDateIcon /> } label="Start date"                                       tooltip="Click once to show only entries without a start date, twice to show only entries with a start date" />
            <ListToggle param="missingEnd"   value={ props.missingEndFilter() }   icon={ <MissingDateIcon /> } label="End date"                                         tooltip="Click once to show only entries without an end date, twice to show only entries with an end date" />
            <ListToggle param="missingScore" value={ props.missingScoreFilter() } icon={ <ScoreIcon />       } label="Score"                                            tooltip="Click once to show only entries without a score, twice to show only entries with a score" />
          </FilterGroup>
        </FilterGroups>
      </div>
    );
  }

  function ListToggle(toggleProps) {
    return (
      <TwoStateToggleButton
        value={toggleProps.value}
        icon={toggleProps.icon}
        label={toggleProps.label}
        tooltip={toggleProps.tooltip}
        onChange={value => setSearchParams({ [toggleProps.param]: value })}
      />
    );
  }
}
