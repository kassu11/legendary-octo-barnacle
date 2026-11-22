import { useParams, useSearchParams } from "@solidjs/router";
import { createMemo, mapArray, Show } from "solid-js";
import { useAuthentication, useResponsive } from "@/state/providers.js";
import { TwoStateToggleButton } from "@/components/filters/TwoStateToggle.scoped.jsx";
import { DesktopFilters, FilterGroup, FilterGroups, FilterSearchInput, MobileFilters } from "@/components/filters/FilterLayout.scoped.jsx";
import { ScrollToListStartButton } from "@/components/filters/ScrollToListStartButton.scoped.jsx";
import { ActiveQueries } from "@/components/filters/ActiveQueries.scoped.jsx";
import { FilterSelect, SORT_REVERSE_SUFFIX } from "@/components/filters/FilterSelect.scoped.jsx";
import { cachedUserInfos } from "@/state/globalState.js";
import { addClearAllActiveQuery, createActiveQuery, createToggleActiveQueries, createValueActiveQueries, excludableValueActiveQuery } from "@/utils/activeQueryUtils.js";
import { arrayUtils } from "@/utils/utils.js";
import { scrollYBelowNavigation } from "@/utils/scrollUtils.js";
import { useNavigateAndSearch } from "@/utils/urlUtils.js";
import { AgeIcon, CalendarIcon, CountryIcon, FormatIcon, GenreIcon, NotesIcon, OnListIcon, PrivateIcon, ProgressIcon as TagIcon, RepeatOutlineIcon, ScoreIcon, SearchIcon, SortIcon, StatusIcon, StudioIcon, TagsIcon, TypeIcon, UsersIcon, YearIcon } from "@/assets/icons.jsx";
import { CompareUsersSelect } from "./CompareUsersSelect.scoped.jsx";
import "./CompareSearchControls.scoped.css";

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

const typeOptions = [
  { description: "Anime",            id: "anime" },
  { description: "Manga",            id: "manga" },
];

// Values of these only exist for one of the types
const typeSpecificSorts = new Set(["episodes", "chapters", "volumes"]);

const yearOptions = [];
for (let year = new Date().getFullYear() + 2; year >= 1930; year--) yearOptions.push(toOption("" + year));

function toOption(name) {
  return { description: name, id: name };
}

export function CompareSearchControls(props) {
  const { authUserData } = useAuthentication();
  const { isMobilLarge } = useResponsive();
  const params = useParams();
  const navigate = useNavigateAndSearch();
  const [searchParams] = useSearchParams();

  const setSearchParams = options => {
    props.setSearchParams(options);
    // The mobile search and filters are reachable from anywhere on the page, so the results could be off the screen
    if (isMobilLarge()) window.scrollTo(0, scrollYBelowNavigation(props.scrollTarget));
  };

  const changeType = type => {
    if (type === params.type) return;
    const sort = arrayUtils.wrapToArray(searchParams.sort).filter(value => !typeSpecificSorts.has(value.endsWith(SORT_REVERSE_SUFFIX) ? value.slice(0, -SORT_REVERSE_SUFFIX.length) : value));
    navigate(`/compare/${type}`, { format: undefined, studio: undefined, sort });
  };

  const isAuthUserCompared = () => {
    const authName = authUserData()?.data?.name?.toLowerCase();
    return !!authName && props.users().some(name => name.toLowerCase() === authName);
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
    { description: "Score",                                           id: "score",        type: "numeric",   tooltip: "Average score of the compared users" },
    { description: "Title",                                           id: "title",        type: "alphabetic" },
    { description: "Users",                                           id: "users",        type: "numeric",   tooltip: `Number of users that have the ${params.type} on their list` },
    ...(params.type === "anime" ? [
      { description: "Episodes",                                      id: "episodes",     type: "numeric"    },
    ] : [
      { description: "Chapters",                                      id: "chapters",     type: "numeric"    },
      { description: "Volumes",                                       id: "volumes",      type: "numeric"    },
    ]),
    { description: "Last Updated",                                    id: "updatedAt",    type: "numeric"    },
    { description: "Start Date",                                      id: "startedAt",    type: "numeric",   tooltip: "Latest start date of the compared users" },
    { description: "Completed Date",                                  id: "completedAt",  type: "numeric",   tooltip: "Latest completed date of the compared users" },
    { description: "Release Date",                                    id: "releaseDate",  type: "numeric"    },
    { description: "Average Score",                                   id: "averageScore", type: "numeric"    },
    { description: "Popularity",                                      id: "popularity",   type: "numeric"    },
    { description: "Score Delta",                                     id: "scoreDelta",   type: "numeric",   tooltip: "Average difference between the users' scores and the average score" },
    { description: params.type === "anime" ? "Rewatches" : "Rereads", id: "repeat",       type: "numeric",   tooltip: "Combined count of the compared users" },
  ]);

  const usersNeededOptions = createMemo(() => props.users().map((_, i) => toOption("" + (i + 1))));

  // The worker sends new arrays after every filter change. mapArray keeps the same option objects
  // for the same names, so the open select doesn't rerender its items and lose the scroll position
  const studioOptions = createMemo(mapArray(() => props.listData()?.studios, toOption));
  const tagOptions = createMemo(mapArray(() => props.listData()?.tags, toOption));
  const startedYearOptions = createMemo(mapArray(() => props.listData()?.startedYears, toOption));
  const completedYearOptions = createMemo(mapArray(() => props.listData()?.completedYears, toOption));

  const activeQueries = createMemo(() => {
    const queries = [];
    const optionDescription = options => id => options.find(option => option.id === id)?.description ?? id;
    const watched = params.type === "anime" ? "Rewatched" : "Reread";
    const avatars = new Map();
    for (const user of Object.values(cachedUserInfos())) avatars.set(user.name.toLowerCase(), user.avatar);

    const search = arrayUtils.wrapToArray(searchParams.q).at(-1);
    if (search) queries.push(createActiveQuery({ description: `Searching "${search}"`, icon: SearchIcon, query: { q: undefined }, clearable: false }, setSearchParams));

    // Users aren't cleared with the filters, the page would be empty without them
    queries.push(...createValueActiveQueries("user",    props.users(),         name => ({ description: "User: " + name,            icon: UsersIcon, image: avatars.get(name.toLowerCase()), clearable: false }), setSearchParams));
    queries.push(...createValueActiveQueries("exclude", props.excludedUsers(), name => ({ description: "Filter out user: " + name, icon: UsersIcon, image: avatars.get(name.toLowerCase()), clearable: false }), setSearchParams));

    if (props.usersNeeded() < props.users().length) {
      queries.push(createActiveQuery({ description: `On ${props.usersNeeded()} or more lists`, icon: UsersIcon, query: { reviewsNeeded: undefined } }, setSearchParams));
    }

    queries.push(...createValueActiveQueries("sort", arrayUtils.wrapToArray(searchParams.sort).filter(Boolean), value => {
      const reversed = value.endsWith(SORT_REVERSE_SUFFIX);
      const id = reversed ? value.slice(0, -SORT_REVERSE_SUFFIX.length) : value;
      return { description: "Sort: " + optionDescription(sortOptions())(id) + (reversed ? " (reversed)" : ""), icon: SortIcon };
    }, setSearchParams));

    queries.push(...createValueActiveQueries ("format",          props.format(),          excludableValueActiveQuery("Format",      FormatIcon,  optionDescription(params.type === "anime" ? animeFormatOptions : mangaFormatOptions)), setSearchParams));
    queries.push(...createValueActiveQueries ("status",          props.status(),          excludableValueActiveQuery("Status",      StatusIcon,  optionDescription(statusOptions)),       setSearchParams));
    queries.push(...createValueActiveQueries ("countryOfOrigin", props.countryOfOrigin(), excludableValueActiveQuery("Country",     CountryIcon, optionDescription(countryOptions)),      setSearchParams));
    queries.push(...createValueActiveQueries ("year",            props.year(),            excludableValueActiveQuery("Year",        YearIcon),                                            setSearchParams));
    queries.push(...createValueActiveQueries ("studio",          props.studio(),          excludableValueActiveQuery("Studio",      StudioIcon),                                          setSearchParams));
    queries.push(...createValueActiveQueries ("genre",           props.genre(),           excludableValueActiveQuery("Genre",       GenreIcon),                                           setSearchParams));
    queries.push(...createValueActiveQueries ("tag",             props.tag(),             excludableValueActiveQuery("Tag",         TagsIcon),                                            setSearchParams));
    queries.push(...createToggleActiveQueries("isAdult",         props.isAdult(),         { included: "R-18", excluded: "Not R-18", icon: AgeIcon },                                      setSearchParams));
    queries.push(...createValueActiveQueries ("userStatus",      props.userStatus(),      excludableValueActiveQuery("User Status", OnListIcon,  optionDescription(userStatusOptions())), setSearchParams));
    queries.push(...createValueActiveQueries ("startedYear",     props.startedYear(),     excludableValueActiveQuery("Start Year",  YearIcon),                                            setSearchParams));
    queries.push(...createValueActiveQueries ("completedYear",   props.completedYear(),   excludableValueActiveQuery("End Year",    YearIcon),                                            setSearchParams));
    queries.push(...createToggleActiveQueries("score",           props.scoreFilter(),     { included: "Has score",          excluded: "Missing score",                  icon: ScoreIcon         }, setSearchParams));
    queries.push(...createToggleActiveQueries("startDate",       props.startDateFilter(), { included: "Has start date",     excluded: "Missing start date",             icon: CalendarIcon      }, setSearchParams));
    queries.push(...createToggleActiveQueries("endDate",         props.endDateFilter(),   { included: "Has end date",       excluded: "Missing end date",               icon: CalendarIcon      }, setSearchParams));
    queries.push(...createToggleActiveQueries("notes",           props.notesFilter(),     { included: "Has notes",          excluded: "No notes",                       icon: NotesIcon         }, setSearchParams));
    queries.push(...createToggleActiveQueries("repeat",          props.rewatchedFilter(), { included: watched,              excluded: "Not " + watched.toLowerCase(),   icon: RepeatOutlineIcon }, setSearchParams));
    queries.push(...createToggleActiveQueries("private",         props.privateFilter(),   { included: "Private",            excluded: "Not private",                    icon: PrivateIcon       }, setSearchParams));

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
      <div class="compare-filters">
        <FilterGroups>
          <FilterGroup title="General">
            <FilterSelect radio param="type" noEscapeCancel each={typeOptions} value={[params.type]} onPick={changeType} icon={<TypeIcon />} button="Type" tooltip="Compare the users' anime or manga lists" />
            <CompareUsersSelect users={props.users()} excludedUsers={props.excludedUsers()} type={params.type} setSearchParams={setSearchParams} />
            <FilterSelect param="sort" sort defaultValue="score" each={sortOptions()} value={props.sort()} icon={<SortIcon />} button="Sort" tooltip="Order of the list. Click a sort again to reverse it, hold Ctrl to sort by multiple fields, hold Shift to add every field in between" setSearchParams={setSearchParams} />
            <Show when={props.users().length > 1}>
              <FilterSelect
                param="reviewsNeeded"
                radio
                noEscapeCancel
                each={usersNeededOptions()}
                value={["" + props.usersNeeded()]}
                onPick={id => setSearchParams({ reviewsNeeded: +id === props.users().length ? undefined : id })}
                icon={<UsersIcon />}
                button="Users Needed"
                tooltip={`How many of the compared users need to have the ${params.type} on their list, every user by default`}
              />
            </Show>
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
            <ListToggle     param="isAdult"                                                 value={ props.isAdult()         } icon={ <AgeIcon />     } label="R-18"         tooltip="Click once to show only R-18 media, twice to hide R-18 media" />
          </FilterGroup>
          <FilterGroup title="List entry">
            <FilterSelect   param="userStatus"      excludable each={ userStatusOptions()    } value={ props.userStatus()    } icon={ <OnListIcon /> } button="User Status" tooltip="Status of the entries on the users' lists, every user needs to match. Click once to include, twice to exclude"            setSearchParams={ setSearchParams } />
            <FilterSelect   param="startedYear"     excludable each={ startedYearOptions()   } value={ props.startedYear()   } icon={ <YearIcon />   } button="Start Year"  tooltip="Year the users started the entry. Click once to include, twice to exclude"                                                 setSearchParams={ setSearchParams } />
            <FilterSelect   param="completedYear"   excludable each={ completedYearOptions() } value={ props.completedYear() } icon={ <YearIcon />   } button="End Year"    tooltip="Year the users completed the entry. Click once to include, twice to exclude"                                               setSearchParams={ setSearchParams } />
          </FilterGroup>
          <FilterGroup title="Entry details">
            <ListToggle param="score"     value={ props.scoreFilter() }     icon={ <ScoreIcon />         } label="Score"                                            tooltip="Click once to show only entries with a score, twice to show only entries without a score" />
            <ListToggle param="startDate" value={ props.startDateFilter() } icon={ <CalendarIcon />      } label="Start date"                                       tooltip="Click once to show only entries with a start date, twice to show only entries without a start date" />
            <ListToggle param="endDate"   value={ props.endDateFilter() }   icon={ <CalendarIcon />      } label="End date"                                         tooltip="Click once to show only entries with an end date, twice to show only entries without an end date" />
            <ListToggle param="notes"     value={ props.notesFilter() }     icon={ <NotesIcon />         } label="Notes"                                            tooltip="Click once to show only entries with notes, twice to show only entries without notes" />
            <ListToggle param="repeat"    value={ props.rewatchedFilter() } icon={ <RepeatOutlineIcon /> } label={params.type === "anime" ? "Rewatched" : "Reread"} tooltip={`Click once to show only ${params.type === "anime" ? "rewatched" : "reread"} entries, twice to hide them`} />
            <Show when={isAuthUserCompared()}>
              <ListToggle param="private" value={ props.privateFilter() }   icon={ <PrivateIcon />       } label="Private"                                          tooltip="Click once to show only private entries, twice to hide private entries. Only your own entries can be private" />
            </Show>
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
