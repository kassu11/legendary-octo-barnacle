import { A, useLocation, useParams, useSearchParams } from "@solidjs/router";
import { useAuthentication, useResponsive, useUser, useUserMediaList } from "@/state/providers.js";
import { createMemo, createSignal, mapArray, Match, onCleanup, onMount, Show, Switch } from "solid-js";
import { ALL_LISTS } from "./index(user-media-list).scoped.jsx";
import { ListFilterSelect } from "./ListFilterSelect.scoped.jsx";
import { TwoStateToggleButton } from "@/components/filters/TwoStateToggle.scoped.jsx";
import { FilterGroup, FilterGroups, FilterSearchInput, MobileFilters } from "@/components/filters/FilterLayout.scoped.jsx";
import { arrayUtils } from "@/utils/utils.js";
import { AgeIcon, ArrowUpIcon, CountryIcon, FormatIcon, GenreIcon, ListIcon, MissingDateIcon, NotesIcon, OnListIcon, PrivateIcon, ProgressIcon as TagIcon, RepeatIcon, ScoreIcon, SortIcon, StatusIcon, StudioIcon, XIcon, YearIcon } from "@/assets/SearchFilterIcons.jsx";
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

const toListOption = name => ({ description: name || "All", id: name });

// Every search param that the remove filters button clears, except search these are also counted as active filters
const filterParams = ["list", "sort", "format", "status", "countryOfOrigin", "year", "studio", "genre", "tag", "isAdult", "userStatus", "notes", "repeat", "private", "missingStart", "missingEnd", "missingScore"];

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
    if (isMobilLarge()) window.scrollTo(0, props.listStartY());
  };

  const activeFilterCount = createMemo(() => filterParams.reduce((count, name) => count + arrayUtils.wrapToArray(searchParams[name]).filter(Boolean).length, 0));

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
  ]);

  // The worker sends new arrays after every filter change. mapArray keeps the same option objects
  // for the same names, so the open select doesn't rerender its items and lose the scroll position
  const studioOptions = createMemo(mapArray(() => props.listData()?.data?.studios, toOption));
  const tagOptions = createMemo(mapArray(() => props.listData()?.data?.tags, toOption));
  const listOptions = createMemo(mapArray(() => [ALL_LISTS, ...(props.listData()?.data?.lists.map(list => list.name) ?? [])], toListOption));
  const listCounts = createMemo(() => {
    const data = props.listData()?.data;
    return new Map([[ALL_LISTS, data?.total], ...(data?.lists.map(list => [list.name, list.entries.length]) ?? [])]);
  });

  return (
    <Show when={isMobilLarge()} fallback={
      <Filters>
        <FilterGroup title="Search" class="search">
          <SearchInput />
        </FilterGroup>
      </Filters>
    }>
      <MobileFilters search={<SearchInput />} filterCount={activeFilterCount()} action={<ScrollToListStartButton listStartY={props.listStartY} />}>
        <Filters />
      </MobileFilters>
    </Show>
  );

  function SearchInput() {
    return <FilterSearchInput onInput={e => setSearchParams({search: e.target.value || undefined})} value={props.search()} />;
  }

  function Filters(filtersProps) {
    return (
      <div class="user-list-filters">
        <FilterGroups>
          {filtersProps.children}
          <FilterGroup title="General">
            <ListFilterSelect param="list" radio defaultValue={ALL_LISTS} each={listOptions()} countOf={id => listCounts().get(id)} value={props.list()} icon={<ListIcon />} button="List" tooltip="Which lists to show. Hold Ctrl to add a list to the selection, hold Shift or drag to select every list in between" setSearchParams={setSearchParams} />
            <ListFilterSelect param="sort" sort defaultValue="score" each={sortOptions()} value={props.sort()} icon={<SortIcon />} button="Sort" tooltip="Order of the list. Click a sort again to reverse it, hold Ctrl to sort by multiple fields, hold Shift to add every field in between" setSearchParams={setSearchParams} />
            <Switch>
              <Match when={!isOwnProfile() && authUserData()?.data?.name}>
                <A scoped class="action" href={"/compare/" + params.type + "?user=" + user().name + "&user=" + authUserData().data.name}>Compare with your list</A>
              </Match>
              <Match when={true}>
                <A scoped class="action" href={"/compare/" + params.type + "?user=" + user().name}>Open in compare page</A>
              </Match>
            </Switch>
            <button class="action remove-filters" disabled={!location.search} onClick={() => setSearchParams(Object.fromEntries(["search", ...filterParams].map(name => [name, undefined])))}>
              <XIcon />
              Remove filters
            </button>
          </FilterGroup>
          {/* Filters that depend on the page are last in their group, so the other filters are always in the same place */}
          <FilterGroup title="Media">
            <ListFilterSelect   param="format"          excludable each={ params.type === "anime" ? animeFormatOptions : mangaFormatOptions } value={ props.format() } icon={ <FormatIcon /> } button="Format" tooltip={`How the media was released, e.g. ${params.type === "anime" ? "TV series or movie" : "manga or light novel"}. Click once to include, twice to exclude`} setSearchParams={ setSearchParams } />
            <ListFilterSelect   param="status"          excludable each={ statusOptions       } value={ props.status()          } icon={ <StatusIcon />  } button="Status"      tooltip="Current release status of the media. Click once to include, twice to exclude"                                               setSearchParams={ setSearchParams } />
            <ListFilterSelect   param="countryOfOrigin" excludable each={ countryOptions      } value={ props.countryOfOrigin() } icon={ <CountryIcon /> } button="Country"     tooltip="Country of origin. Click once to include, twice to exclude"                                                                 setSearchParams={ setSearchParams } />
            <ListFilterSelect   param="year"            excludable each={ yearOptions         } value={ props.year()            } icon={ <YearIcon />    } button="Year"        tooltip="Year the media started releasing. Click once to include, twice to exclude"                                                  setSearchParams={ setSearchParams } />
            <Show when={params.type === "anime"}>
              <ListFilterSelect param="studio"          excludable each={ studioOptions()     } value={ props.studio()          } icon={ <StudioIcon />  } button="Studio"      tooltip="Main studio of the media. Click once to include, twice to exclude"                                                          setSearchParams={ setSearchParams } />
            </Show>
          </FilterGroup>
          <FilterGroup title="Content">
            <ListFilterSelect   param="genre"           excludable each={ genreOptions        } value={ props.genre()           } icon={ <GenreIcon />   } button="Genre"       tooltip="Entries need to have all the included genres. Click once to include, twice to exclude"                                      setSearchParams={ setSearchParams } />
            <ListFilterSelect   param="tag"             excludable each={ tagOptions()        } value={ props.tag()             } icon={ <TagIcon />     } button="Tag"         tooltip="Entries need to have all the included tags, only tags with a rank above 50% count. Click once to include, twice to exclude" setSearchParams={ setSearchParams } />
            <ListToggle param="isAdult"      value={ props.isAdult() }            icon={ <AgeIcon />         } label="R-18"                                             tooltip="Click once to show only R-18 media, twice to hide R-18 media" />
          </FilterGroup>
          <FilterGroup title="List entry">
            <ListFilterSelect   param="userStatus"      excludable each={ userStatusOptions() } value={ props.userStatus()      } icon={ <OnListIcon />  } button="User Status" tooltip="Status of the entry on this user's list. Click once to include, twice to exclude"                                           setSearchParams={ setSearchParams } />
            <ListToggle param="notes"        value={ props.notesFilter() }        icon={ <NotesIcon />       } label="Notes"                                            tooltip="Click once to show only entries with notes, twice to hide entries with notes" />
            <ListToggle param="repeat"       value={ props.rewatchedFilter() }    icon={ <RepeatIcon />      } label={params.type === "anime" ? "Rewatched" : "Reread"} tooltip={`Click once to show only ${params.type === "anime" ? "rewatched" : "reread"} entries, twice to hide them`} />
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

const SCROLL_BACK_UP_DISTANCE = 200;

function ScrollToListStartButton(props) {
  const [isVisible, setIsVisible] = createSignal(false);
  let previousY = window.scrollY;
  let scrollUpStartY = previousY;

  const updateVisibility = () => {
    const y = window.scrollY;
    if (y > previousY) scrollUpStartY = y;
    previousY = y;
    setIsVisible(y > props.listStartY() + window.innerHeight && scrollUpStartY - y >= SCROLL_BACK_UP_DISTANCE);
  };

  onMount(() => {
    window.addEventListener("scroll", updateVisibility, { passive: true });
    onCleanup(() => window.removeEventListener("scroll", updateVisibility));
  });

  return (
    <button class="scroll-to-list-start" classList={{ visible: isVisible() }} onClick={() => window.scrollTo({ top: props.listStartY(), behavior: "smooth" })} aria-label="Scroll to the start of the list">
      <ArrowUpIcon scoped />
    </button>
  );
}
