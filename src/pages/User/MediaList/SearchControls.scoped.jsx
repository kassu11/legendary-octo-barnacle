import { A, useLocation, useParams } from "@solidjs/router";
import { useAuthentication, useUser, useUserMediaList } from "../../../context/providers.js";
import { createMemo, mapArray, Match, Show, Switch } from "solid-js";
import { useListNavigation } from "./index(user-media-list).scoped.jsx";
import { MediaListNames } from "./MediaListNames.jsx";
import { ListFilterSelect } from "./ListFilterSelect.scoped.jsx";
import { TwoStateToggleButton } from "../../Search/TwoStateToggle.scoped.jsx";
import { AgeIcon, CountryIcon, FormatIcon, GenreIcon, MissingDateIcon, NotesIcon, OnListIcon, PrivateIcon, ProgressIcon as TagIcon, RepeatIcon, ScoreIcon, SortIcon, StatusIcon, StudioIcon, XIcon, YearIcon } from "../../../assets/SearchFilterIcons.jsx";
import "./SearchControls.scoped.css";

const formatOptions = [
  { description: "Movie",            id: "MOVIE"    },
  { description: "Music",            id: "MUSIC"    },
  { description: "ONA",              id: "ONA"      },
  { description: "OVA",              id: "OVA"      },
  { description: "Special",          id: "SPECIAL"  },
  { description: "TV",               id: "TV"       },
  { description: "TV Short",         id: "TV_SHORT" },
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

export function SearchControlsScoped(props) {
  const navigate = useListNavigation();
  const location = useLocation();
  const {authUserData} = useAuthentication();
  const {isOwnProfile} = useUserMediaList();
  const {user} = useUser();
  const params = useParams();

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

  return (
    <div class="user-profile-media-list-search">
      <input type="text" placeholder="Search" onInput={e => props.setSearchParams({search: e.target.value || undefined})} value={props.search()}/>

      <MediaListNames listData={props.listData}/>

      <ListFilterSelect   param="format"          excludable each={ formatOptions       } value={ props.format()          } icon={ <FormatIcon />  } button="Format"      tooltip="How the media was released, e.g. TV series or movie. Click once to include, twice to exclude"                               setSearchParams={ props.setSearchParams } />
      <ListFilterSelect   param="userStatus"      excludable each={ userStatusOptions() } value={ props.userStatus()      } icon={ <OnListIcon />  } button="User Status" tooltip="Status of the entry on this user's list. Click once to include, twice to exclude"                                           setSearchParams={ props.setSearchParams } />
      <ListFilterSelect   param="status"          excludable each={ statusOptions       } value={ props.status()          } icon={ <StatusIcon />  } button="Status"      tooltip="Current release status of the media. Click once to include, twice to exclude"                                               setSearchParams={ props.setSearchParams } />
      <ListFilterSelect   param="genre"           excludable each={ genreOptions        } value={ props.genre()           } icon={ <GenreIcon />   } button="Genre"       tooltip="Entries need to have all the included genres. Click once to include, twice to exclude"                                      setSearchParams={ props.setSearchParams } />
      <ListFilterSelect   param="countryOfOrigin" excludable each={ countryOptions      } value={ props.countryOfOrigin() } icon={ <CountryIcon /> } button="Country"     tooltip="Country of origin. Click once to include, twice to exclude"                                                                 setSearchParams={ props.setSearchParams } />
      <Show when={params.type === "anime"}>
        <ListFilterSelect param="studio"          excludable each={ studioOptions()     } value={ props.studio()          } icon={ <StudioIcon />  } button="Studio"      tooltip="Main studio of the media. Click once to include, twice to exclude"                                                          setSearchParams={ props.setSearchParams } />
      </Show>
      <ListFilterSelect   param="tag"             excludable each={ tagOptions()        } value={ props.tag()             } icon={ <TagIcon />     } button="Tag"         tooltip="Entries need to have all the included tags, only tags with a rank above 50% count. Click once to include, twice to exclude" setSearchParams={ props.setSearchParams } />
      <ListFilterSelect   param="year"            excludable each={ yearOptions         } value={ props.year()            } icon={ <YearIcon />    } button="Year"        tooltip="Year the media started releasing. Click once to include, twice to exclude"                                                  setSearchParams={ props.setSearchParams } />
      {/* Active filter stays visible even if the list doesn't have both ratings, so it can still be turned off */}
      <Show when={props.listData()?.data?.hasBothAgeRatings || props.isAdult()}>
        <ListToggle param="isAdult"    value={ props.isAdult()       }      icon={ <AgeIcon />         } label="R-18"                                                     tooltip="Click once to show only R-18 media, twice to hide R-18 media" />
      </Show>
      <Show when={isOwnProfile()}>
        <ListToggle param="private"    value={ props.privateFilter() }      icon={ <PrivateIcon />     } label="Private"                                                  tooltip="Click once to show only private entries, twice to hide private entries" />
      </Show>
      <ListToggle param="notes"        value={ props.notesFilter() }        icon={ <NotesIcon />       } label="Notes"                                                    tooltip="Click once to show only entries with notes, twice to hide entries with notes" />
      <ListToggle param="repeat"       value={ props.rewatchedFilter() }    icon={ <RepeatIcon />      } label={params.type === "anime" ? "Rewatched" : "Reread"}         tooltip={`Click once to show only ${params.type === "anime" ? "rewatched" : "reread"} entries, twice to hide them`} />
      <ListToggle param="missingStart" value={ props.missingStartFilter() } icon={ <MissingDateIcon /> } label="Missing start date"                                       tooltip="Click once to show only entries without a start date, twice to show only entries with a start date" />
      <ListToggle param="missingScore" value={ props.missingScoreFilter() } icon={ <ScoreIcon />       } label="Missing score"                                            tooltip="Click once to show only entries without a score, twice to show only entries with a score" />
      <ListFilterSelect param="sort" sort defaultValue="score" each={sortOptions()}       value={props.sort()}              icon={<SortIcon />}      button="Sort"        tooltip="Order of the list. Click a sort again to reverse it, hold Shift to sort by multiple fields"                                 setSearchParams={props.setSearchParams} />
      <Switch>
        <Match when={!isOwnProfile() && authUserData()?.data?.name}>
          <A href={"/compare/" + params.type + "?user=" + user().name + "&user=" + authUserData().data.name}>
            <button>Compare with your list</button>
          </A>
        </Match>
        <Match when={true}>
          <A href={"/compare/" + params.type + "?user=" + user().name}>
            <button>Open in compare page</button>
          </A>
        </Match>
      </Switch>
      <ClearFiltersButton />
    </div>
  );

  function ListToggle(toggleProps) {
    return (
      <TwoStateToggleButton
        value={toggleProps.value}
        icon={toggleProps.icon}
        label={toggleProps.label}
        tooltip={toggleProps.tooltip}
        tooltipPlacements={["right", "bottom", "top"]}
        onChange={value => props.setSearchParams({ [toggleProps.param]: value })}
      />
    );
  }

  function ClearFiltersButton() {
    return (
      <Switch>
        <Match when={location.search}>
          <button class="remove-filters" onClick={() => {
            props.setSearchParams({
              search: undefined,
              format: undefined,
              status: undefined,
              genre: undefined,
              countryOfOrigin: undefined,
              missingStart: undefined,
              missingScore: undefined,
              isAdult: undefined,
              year: undefined,
              private: undefined,
              notes: undefined,
              repeat: undefined,
              sort: undefined,
              userStatus: undefined,
              studio: undefined,
              tag: undefined,
            });
          }}>
            <XIcon />
            Remove filters
          </button>
        </Match>
        <Match when={params.list}>
          <button style={{background: "lime"}} onClick={() => {
            navigate("");
          }}>Back to home
          </button>
        </Match>
      </Switch>
    )
  }
}
