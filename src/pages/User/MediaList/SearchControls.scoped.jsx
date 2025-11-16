import {A, useLocation, useParams} from "@solidjs/router";
import {useAuthentication, useUser, useUserMediaList} from "../../../context/providers.js";
import {For, Match, Show, Switch} from "solid-js";
import {useListNavigation} from "./index(user-media-list).scoped.jsx";
import {MediaListNames} from "./MediaListNames.jsx";
import "./SearchControls.scoped.css";

export function SearchControlsScoped(props) {
  const navigate = useListNavigation();
  const location = useLocation();
  const {authUserData} = useAuthentication();
  const {isOwnProfile} = useUserMediaList();
  const {user} = useUser();
  const params = useParams();

  return (
    <div class="user-profile-media-list-search">
      <input type="text" placeholder="Search"
             onInput={e => props.setSearchParams({search: e.target.value || undefined})} value={props.search()}/>
      <MediaListNames listData={props.listData}/>
      <select name="format" onChange={e => props.setSearchParams({format: e.target.value || undefined})}
              value={props.format() || ""}>
        <option value="" hidden>Format</option>
        <Show when={props.format()}>
          <option value="">All formats</option>
        </Show>
        <option value="MOVIE">Movie</option>
        <option value="MUSIC">Music</option>
        <option value="ONA">Ona</option>
        <option value="OVA">Ova</option>
        <option value="SPECIAL">Special</option>
        <option value="TV">TV</option>
        <option value="TV_SHORT">TV short</option>
      </select>
      <select name="userStatus" onChange={e => props.setSearchParams({userStatus: e.target.value || undefined})}
              value={props.userStatus() || ""}>
        <option value="" hidden>User Status</option>
        <Show when={props.userStatus()}>
          <option value="">Any User Status</option>
        </Show>
        <option value="COMPLETED">Completed</option>
        <option value="CURRENT">
          <Switch>
            <Match when={params.type === "anime"}>Watching</Match>
            <Match when={params.type === "manga"}>Reading</Match>
          </Switch>
        </option>
        <option value="DROPPED">Dropped</option>
        <option value="PAUSED">Paused</option>
        <option value="PLANNING">Planning</option>
        <option value="REPEATING">
          <Switch>
            <Match when={params.type === "anime"}>Rewatching</Match>
            <Match when={params.type === "manga"}>Rereading</Match>
          </Switch>
        </option>
      </select>
      <select name="status" onChange={e => props.setSearchParams({status: e.target.value || undefined})}
              value={props.status() || ""}>
        <option value="" hidden>Status</option>
        <Show when={props.status()}>
          <option value="">Any Status</option>
        </Show>
        <option value="RELEASING">Releasing</option>
        <option value="FINISHED">Finished</option>
        <option value="NOT_YET_RELEASED">Not Yet Released</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <select name="genre" onChange={e => props.setSearchParams({genre: e.target.value || undefined})}
              value={props.genre()}>
        <option value="" hidden>Genre</option>
        <Show when={props.genre()}>
          <option value="">All genres</option>
        </Show>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Ecchi">Ecchi</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Hentai">Hentai</option>
        <option value="Horror">Horror</option>
        <option value="Mahou Shoujo">Mahou Shoujo</option>
        <option value="Mecha">Mecha</option>
        <option value="Music">Music</option>
        <option value="Mystery">Mystery</option>
        <option value="Psychological">Psychological</option>
        <option value="Romance">Romance</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Slice of Life">Slice of Life</option>
        <option value="Sports">Sports</option>
        <option value="Supernatural">Supernatural</option>
        <option value="Thriller">Thriller</option>
      </select>
      <select name="countryOfOrigin"
              onChange={e => props.setSearchParams({countryOfOrigin: e.target.value || undefined})}
              value={props.countryOfOrigin() || ""}>
        <option value="" hidden>Country</option>
        <Show when={props.countryOfOrigin()}>
          <option value="">All countries</option>
        </Show>
        <option value="CN">China</option>
        <option value="JP">Japan</option>
        <option value="KR">South Korea</option>
        <option value="TW">Taiwan</option>
      </select>
      <select name="isAdult" onChange={e => props.setSearchParams({isAdult: e.target.value || undefined})}
              value={props.isAdult() === undefined ? "" : String(props.isAdult())}>
        <option value="" hidden>Age rating</option>
        <Show when={props.isAdult() !== undefined}>
          <option value="">All ratings</option>
        </Show>
        <option value="false">R-17+</option>
        <option value="true">R-18</option>
      </select>
      <Show when={params.type === "anime"}>
        <select name="studio" onChange={e => props.setSearchParams({studio: e.target.value || undefined})}
                value={props.studio()}>
          <option value="" hidden>Studio</option>
          <Show when={props.studio()}>
            <option value="">All studios</option>
          </Show>
          <For each={props.listData()?.data?.studios}>{studio => (
            <option value={studio} selected={studio == props.studio()}>{studio}</option>
          )}</For>
        </select>
      </Show>
      <select name="tag" onChange={e => props.setSearchParams({tag: e.target.value || undefined})} value={props.tag()}>
        <option value="" hidden>Tag</option>
        <Show when={props.tag()}>
          <option value="">All tags</option>
        </Show>
        <For each={props.listData()?.data?.tags}>{tag => (
          <option value={tag} selected={tag == props.tag()}>{tag}</option>
        )}</For>
      </select>
      <input type="number" placeholder="Release year" max="9999" min="0" value={props.year()}
             onInput={e => props.setSearchParams({year: e.target.value || undefined})}/>
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
      <label htmlFor="reverse">
        <input type="checkbox" name="reverse" id="reverse" checked={props.reverse()}
               onChange={e => props.setSearchParams({reverse: e.target.checked ? "true" : undefined})}/>
        {" "}Reverse order
      </label>
      <select name="sort" value={props.sort()}
              onChange={e => props.setSearchParams({sort: e.target.value === "score" ? undefined : e.target.value})}>
        <option value="score">Score</option>
        <option value="title">Title</option>
        <option value="progress">Progress</option>
        <option value="updatedAt">Last Updated</option>
        <option value="startedAt">Start Date</option>
        <option value="completedAt">Completed Date</option>
        <option value="releaseDate">Release Date</option>
        <option value="averageScore">Average Score</option>
        <option value="popularity">Popularity</option>
        <option value="repeat">
          <Switch>
            <Match when={params.type === "anime"}>Rewatches</Match>
            <Match when={params.type === "manga"}>Rereads</Match>
          </Switch>
        </option>
      </select>
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