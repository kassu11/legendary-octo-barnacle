import { A, useLocation, useParams } from "@solidjs/router";
import { useAuthentication, useUser, useUserMediaList } from "../../../context/providers.js";
import { createMemo, mapArray, Match, Show, Switch } from "solid-js";
import { useListNavigation } from "./index(user-media-list).scoped.jsx";
import { MediaListNames } from "./MediaListNames.jsx";
import { ListFilterSelect } from "./ListFilterSelect.scoped.jsx";
import { AgeIcon, CountryIcon, FormatIcon, GenreIcon, OnListIcon, ProgressIcon as TagIcon, SortIcon, StatusIcon, StudioIcon, YearIcon } from "../../../assets/SearchFilterIcons.jsx";
import "./SearchControls.scoped.css";

const formatOptions = [
  { description: "Movie",    id: "MOVIE"    },
  { description: "Music",    id: "MUSIC"    },
  { description: "ONA",      id: "ONA"      },
  { description: "OVA",      id: "OVA"      },
  { description: "Special",  id: "SPECIAL"  },
  { description: "TV",       id: "TV"       },
  { description: "TV Short", id: "TV_SHORT" },
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
  { description: "China",       id: "CN" },
  { description: "Japan",       id: "JP" },
  { description: "South Korea", id: "KR" },
  { description: "Taiwan",      id: "TW" },
];

const ageOptions = [
  { description: "R-17+", id: "false" },
  { description: "R-18",  id: "true"  },
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
      <input type="text" placeholder="Search"
             onInput={e => props.setSearchParams({search: e.target.value || undefined})} value={props.search()}/>
      <MediaListNames listData={props.listData}/>
      <ListFilterSelect param="format" button="Format" icon={<FormatIcon />} tooltip="How the media was released, e.g. TV series or movie. Click once to include, twice to exclude" excludable
                        each={formatOptions} value={props.format()} setSearchParams={props.setSearchParams} />
      <ListFilterSelect param="userStatus" button="User Status" icon={<OnListIcon />} tooltip="Status of the entry on this user's list. Click once to include, twice to exclude" excludable
                        each={userStatusOptions()} value={props.userStatus()} setSearchParams={props.setSearchParams} />
      <ListFilterSelect param="status" button="Status" icon={<StatusIcon />} tooltip="Current release status of the media. Click once to include, twice to exclude" excludable
                        each={statusOptions} value={props.status()} setSearchParams={props.setSearchParams} />
      <ListFilterSelect param="genre" button="Genre" icon={<GenreIcon />} tooltip="Entries need to have all the included genres. Click once to include, twice to exclude" excludable
                        each={genreOptions} value={props.genre()} setSearchParams={props.setSearchParams} />
      <ListFilterSelect param="countryOfOrigin" button="Country" icon={<CountryIcon />} tooltip="Country of origin. Click once to include, twice to exclude" excludable
                        each={countryOptions} value={props.countryOfOrigin()} setSearchParams={props.setSearchParams} />
      <ListFilterSelect param="isAdult" button="Age" icon={<AgeIcon />} tooltip="Age rating of the media"
                        each={ageOptions} value={props.isAdult()} setSearchParams={props.setSearchParams} />
      <Show when={params.type === "anime"}>
        <ListFilterSelect param="studio" button="Studio" icon={<StudioIcon />} tooltip="Main studio of the media. Click once to include, twice to exclude" excludable
                          each={studioOptions()} value={props.studio()} setSearchParams={props.setSearchParams} />
      </Show>
      <ListFilterSelect param="tag" button="Tag" icon={<TagIcon />} tooltip="Entries need to have all the included tags, only tags with a rank above 50% count. Click once to include, twice to exclude" excludable
                        each={tagOptions()} value={props.tag()} setSearchParams={props.setSearchParams} />
      <ListFilterSelect param="year" button="Year" icon={<YearIcon />} tooltip="Year the media started releasing. Click once to include, twice to exclude" excludable
                        each={yearOptions} value={props.year()} setSearchParams={props.setSearchParams} />
      <Show when={isOwnProfile()}>
        <label htmlFor="private">
          <input type="checkbox" name="private" id="private" checked={props.privateFilter()}
                 onChange={e => props.setSearchParams({private: e.target.checked ? "true" : undefined})}/>
          {" "}Private
        </label>
      </Show>
      <label htmlFor="notes">
        <input type="checkbox" name="notes" id="notes" checked={props.notesFilter()}
               onChange={e => props.setSearchParams({notes: e.target.checked ? "true" : undefined})}/>
        {" "}Notes
      </label>
      <label htmlFor="repeat">
        <input type="checkbox" name="repeat" id="repeat" checked={props.rewatchedFilter()}
               onChange={e => props.setSearchParams({repeat: e.target.checked ? "true" : undefined})}/>
        {" "}
        <Switch>
          <Match when={params.type === "anime"}>Rewatched</Match>
          <Match when={params.type === "manga"}>Reread</Match>
        </Switch>
      </label>
      <label htmlFor="missingStart">
        <input type="checkbox" name="missingStart" id="missingStart" checked={props.missingStartFilter()}
               onChange={e => props.setSearchParams({missingStart: e.target.checked ? "true" : undefined})}/>
        {" "}Missing start date
      </label>
      <label htmlFor="missingScore">
        <input type="checkbox" name="missingScore" id="missingScore" checked={props.missingScoreFilter()}
               onChange={e => props.setSearchParams({missingScore: e.target.checked ? "true" : undefined})}/>
        {" "}Missing score
      </label>
      <ListFilterSelect param="sort" button="Sort" icon={<SortIcon />} tooltip="Order of the list. Click a sort again to reverse it, hold Shift to sort by multiple fields" sort defaultValue="score"
                        each={sortOptions()} value={props.sort()} setSearchParams={props.setSearchParams} />
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

  function ClearFiltersButton() {
    return (
      <Switch>
        <Match when={location.search}>
          <button style={{background: "skyblue"}} onClick={() => {
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
          }}>Remove filters
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
