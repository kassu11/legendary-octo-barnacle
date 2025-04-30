import { A, useNavigate, useParams } from "@solidjs/router";
import api, { IndexedDB } from "../utils/api.js";
import { createContext, createEffect, createSignal, For, Show, useContext } from "solid-js";
import "./User.scss";
import { useAuthentication } from "../context/AuthenticationContext.jsx";
import { assert } from "../utils/assert.js";
import { formatTimeToDate, formatTitleToUrl, numberCommas } from "../utils/formating.js";
import { ActivityCard } from "../components/Activity.jsx";
import UserMediaListWorker from "../worker/user-media-list.js?worker";

const UserContext = createContext();

export function User(props) {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [userData] = api.anilist.userByName(() => params.name, accessToken);

  return (
    <UserContext.Provider value={{ user: () => userData().data}}>
      <Switch>
        <Match when={userData()?.data}>
          <Content>
            {props.children}
          </Content>
        </Match>
        <Match when={userData()?.error}>
          <div>Error user not found</div>
        </Match>
      </Switch>
    </UserContext.Provider>
  )
}

const useUser = () => useContext(UserContext);

function Content(props) {
  const { user } = useUser();

  return (
    <div class="user-page" style={{"--user-color": user().options.profileColor}}>
      {console.log(user())}
      <div class="profile-banner-container">
        <Show when={user().bannerImage} fallback={<div class="banner"></div>}>
          <img src={user().bannerImage} class="banner" alt="Banner" />
        </Show>
        <div class="user-profile-container">
          <img src={user().avatar.large} class="profile" alt="Profile" />
          <div class="content">
            <h2>
              <a href={"https://anilist.co/user/" + user().name} target="_blank">{user().name}</a>
              <Show when={user().isFollower}>
                <span class="user-profile-following-badge">Follows you</span>
              </Show>
            </h2>
            <p>Joined {formatTimeToDate(user().createdAt * 1000)} ({Math.floor((new Date() - (user().createdAt * 1000)) / 1000 / 60 / 60 / 24)} days)</p>
          </div>
        </div>
      </div>
      <nav class="profile-navigation">
        <ul>
          <li><A href="">Overview</A></li>
          <li><A href="anime">Anime list</A></li>
          <li><A href="manga">Manga list</A></li>
          <li><A href="favourites">Favourites</A></li>
          <li><A href="stats">Stats</A></li>
          <li><A href="socials">Socials</A></li>
        </ul>
      </nav>
      {props.children}
    </div>
  );
}

export function Overview() {
  const { user } = useUser();
  const { accessToken } = useAuthentication();
  const [activity, { mutateCache: mutateActivityCache }] = api.anilist.activityByUserId(() => user().id || undefined, accessToken);

  return (
    <div class="user-profile-overview-body">
      <div class="user-info-container">
        <Switch>
          <Match when={user().donatorTier === 1}>
            <p>{user().donatorBadge}</p>
          </Match>
          <Match when={user().donatorTier === 2}>
            <p>{user().donatorBadge} (fancy)</p>
          </Match>
          <Match when={user().donatorTier === 3}>
            <p>{user().donatorBadge} (extra fancy)</p>
          </Match>
        </Switch>
        <ActivityHistory history={user().stats?.activityHistory || []} />
        <Show when={user().favourites.anime.edges.length}>
          <div class="user-favourites">
            <h3>Favourite animes</h3>
            <ol>
              <For each={user().favourites.anime.edges}>{anime => (
                <li class="item">
                  <A href={"/anime/" + anime.node.id + "/" + formatTitleToUrl(anime.node.title.userPreferred)}>
                    <img src={anime.node.coverImage.large} alt="Cover" />
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={user().favourites.manga.edges.length}>
          <div class="user-favourites">
            <h3>Favourite manga</h3>
            <ol>
              <For each={user().favourites.manga.edges}>{manga => (
                <li class="item">
                  <A href={"/manga/" + manga.node.id + "/" + formatTitleToUrl(manga.node.title.userPreferred)}>
                    <img src={manga.node.coverImage.large} alt="Cover" />
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={user().favourites.characters.edges.length}>
          <div class="user-favourites">
            <h3>Favourite characters</h3>
            <ol>
              <For each={user().favourites.characters.edges}>{character => (
                <li class="item">
                  <A href={"/ani/character/" + character.node.id + "/" + formatTitleToUrl(character.node.name.userPreferred)}>
                    <img src={character.node.image.large} alt="Cover" />
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={user().favourites.staff.edges.length}>
          <div class="user-favourites">
            <h3>Favourite staff</h3>
            <ol>
              <For each={user().favourites.staff.edges}>{staff => (
                <li class="item">
                  <A href={"/ani/staff/" + staff.node.id + "/" + formatTitleToUrl(staff.node.name.userPreferred)}>
                    <img src={staff.node.image.large} alt="Cover" />
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={user().favourites.studios.edges.length}>
          <div class="user-favourites-studio">
            <h3>Favourite studio</h3>
            <ol>
              <For each={user().favourites.studios.edges}>{studio => (
                <li class="item">
                  <A href={"/ani/studio/" + studio.node.id + "/" + formatTitleToUrl(studio.node.name)}>
                    {studio.node.name}
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
      </div>
      <div class="user-activity-container">
        <div class="user-profile-progress">
          <Show when={user().statistics.anime.count}>
            <div class="container">
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.anime.count)}</p>
                <p>Total anime</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{(user().statistics.anime.minutesWatched / 60 / 24).toFixed(1)}</p>
                <p>Days watched</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.anime.episodesWatched)}</p>
                <p>Episodes watched</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{user().statistics.anime.meanScore}</p>
                <p>Mean score</p>
              </div>
            </div>
          </Show>
          <Show when={user().statistics.manga.count}>
            <div class="container">
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.manga.count)}</p>
                <p>Total manga</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.manga.chaptersRead)}</p>
                <p>Chapters read</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.manga.volumesRead)}</p>
                <p>Volumes read</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{user().statistics.manga.meanScore}</p>
                <p>Mean score</p>
              </div>
            </div>
          </Show>
        </div>
        <div class="user-profile-genres">
          <GenrePreview title="Anime genre overview" genres={user().statistics.anime.genrePreview} total={user().statistics.anime.count}/>
          <GenrePreview title="Manga genre overview" genres={user().statistics.manga.genrePreview} total={user().statistics.manga.count}/>
        </div>
        <div class="user-profile-activity">
          <For each={activity()?.data.data.Page.activities}>{activity => (
            <ActivityCard activity={activity} mutateCache={mutateActivityCache} hideProfile={true} small={true}/>
          )}</For>
        </div>
      </div>
    </div>
  );
}

function GenrePreview(props) {
  assert(props.genres, "Genres missing");
  assert(props.title, "Title missing");

  return (
    <Show when={props.total}>
      <div class="user-genres-overview">
        <h3>{props.title}</h3>
        <ol>
          <For each={props.genres}>{genre => (
            <li class="item">{genre.genre} <span>{Math.round(genre.count / props.total * 100)}%</span></li>
          )}</For>
        </ol>
      </div>
    </Show>
  );
}

function ActivityHistory(props) {
  const amount = Math.round(365 / 2 + 3);
  const _now = new Date();
  let start = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate());
  const end = start.getTime() / 1000;
  start.setDate(start.getDate() - amount);
  start /= 1000;

  return (
    <Show when={props.history.at(-1).date > start}>
      <div>
        <h3>Activity</h3>
        <ol class="activity-history-container">
          <For each={props.history}>{(activity, i) => (
            <Show when={activity.date > start}>
              <For each={Array(Math.max(0, Math.round((activity.date - (props.history[i() - 1]?.date || start)) / 3600 / 24) - 1)).fill(0)}>{_ => (
                <li class="activity-item" />
              )}</For>
              <li class="activity-item" attr:data-level={activity.level} />
            </Show>
          )}</For>
          <For each={Array(Math.max(0, Math.round((end - (props.history.at(-1)?.date || start)) / 3600 / 24) - 1)).fill(0)}>{_ => (
            <li class="activity-item" />
          )}</For>
        </ol>
      </div>
    </Show>
  );
}




export function AnimeList() {
  const { user } = useUser();
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [mediaList, { mutateCache: mutateMediaListCache }] = api.anilist.mediaListByUserId(() => user().id || undefined, accessToken);
  const [listData, setListData] = createSignal({});
  const navigate = useNavigate();
  let worker;
  
  const [search, setSearch] = createSignal("");
  const [format, setFormat] = createSignal("");
  const [status, setStatus] = createSignal("");
  const [genre, setGenre] = createSignal("");
  const [countryOfOrigin, setCountryOfOrigin] = createSignal("");
  const [isAdult, setIsAdult] = createSignal(undefined);
  const [year, setYear] = createSignal("");
  const [privateFilter, setPrivateFilter] = createSignal(false);
  const [notesFilter, setNotesFilter] = createSignal(false);
  const [rewatchedFilter, setRewatchedFilter] = createSignal(false);

  createEffect(() => {
    if (window.Worker && mediaList()) {
      worker = worker instanceof Worker ? worker : new UserMediaListWorker();

      worker.postMessage({ 
        cacheKey: mediaList().cacheKey, 
        search: search(),
        format: format(),
        status: status(),
        genre: genre(),
        countryOfOrigin: countryOfOrigin(),
        isAdult: isAdult(),
        year: +year(),
        private: privateFilter(),
        notes: notesFilter(),
        rewatched: rewatchedFilter(),
        sort: "", 
        type: "ANIME",
      });

      worker.onmessage = message => {
        if (message.data === "success") {
          const cacheReq = IndexedDB.user();
          cacheReq.onsuccess = evt => {
            const db = evt.target.result;
            const store = IndexedDB.store(db, "data", "readonly");
            const getReq = store.get("media_list");
            getReq.onsuccess = (evt) => {
              console.log("worker data:", evt.target.result);
              setListData(evt.target.result || {});
            }
          }
        } else {
          console.error("Error");
        }
      }
    }
  });

  return (
    <div class="user-profile-media-list-body">
      <div class="user-profile-media-list-search">
        <input type="text" onInput={e => setSearch(e.target.value)} value={search()} />
        <Show when={listData()?.data}>
          <ol>
            <li>
              <button onClick={() => navigate("/user/" + user().name + "/anime/", { replace: true })}>
                <Show when={params.list === undefined}>{"> "}</Show>
                All {listData().data.total}
              </button>
            </li>
            <For each={listData().data.lists}>{list => (
              <li>
                <button onClick={() => navigate("/user/" + user().name + "/anime/" + list.name, { replace: true })}>
                  <Show when={params.list === list.name}>{"> "}</Show>
                  {list.name} {list.entries.length}
                </button>
              </li>
            )}
            </For>
          </ol>
        </Show>
        <select name="format" onChange={e => setFormat(e.target.value)} value={format() || ""}>
          <option value="" hidden>Format</option>
          <Show when={format()}>
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
        <select name="status" onChange={e => setStatus(e.target.value)} value={status() || ""}>
          <option value="" hidden>Status</option>
          <Show when={status()}>
            <option value="">Any Status</option>
          </Show>
          <option value="RELEASING">Releasing</option>
          <option value="FINISHED">Finished</option>
          <option value="NOT_YET_RELEASED">Not Yet Released</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <select name="genre" onChange={e => setGenre(e.target.value)} value={genre() || ""}>
          <option value="" hidden>Genre</option>
          <Show when={genre()}>
            <option value="">All genres</option>
          </Show>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Ecchi">Ecchi</option>
          <option value="Fantasy">Fantasy</option>
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
        <select name="countryOfOrigin" onChange={e => setCountryOfOrigin(e.target.value)} value={countryOfOrigin() || ""}>
          <option value="" hidden>Country</option>
          <Show when={countryOfOrigin()}>
            <option value="">All countries</option>
          </Show>
          <option value="CN">China</option>
          <option value="JP">Japan</option>
          <option value="KR">South Korea</option>
          <option value="TW">Taiwan</option>
        </select>
        <select name="isAdult" onChange={e => {
          if (e.target.value === "true") {
            setIsAdult(true);
          } else if (e.target.value === "false") {
            setIsAdult(false);
          } else {
            setIsAdult(undefined);
          }
        }} value={isAdult() || ""}>
          <option value="" hidden>Age</option>
          <Show when={isAdult() !== undefined}>
            <option value="">All ratings</option>
          </Show>
          <option value="false">R-17+</option>
          <option value="true">R-18</option>
        </select>
        <label htmlFor="year">Year</label>
        <input type="number" name="year" id="year" value={year()} onInput={e => {
          setYear(e.target.value);
        }} />
        <input type="checkbox" name="private" id="private" checked={privateFilter()} onChange={e => setPrivateFilter(e.target.checked)} />
        <label htmlFor="private"> Private</label>
        <input type="checkbox" name="notes" id="notes" checked={notesFilter()} onChange={e => setNotesFilter(e.target.checked)} />
        <label htmlFor="notes"> Notes</label>
        <input type="checkbox" name="rewatched" id="rewatched" checked={rewatchedFilter()} onChange={e => setRewatchedFilter(e.target.checked)} />
        <label htmlFor="rewatched"> Rewatched</label>
        <select name="sort">
          <option value="score">Score</option>
        </select>
        <button>clear</button>
      </div>
      <div class="user-profile-media-list-container">
        <Show when={listData()?.data}>
          <For each={listData().data.lists}>{list => (
            <Show when={list.entries.length && (!params.list || params.list === list.name)}>
              <h2>{list.name}</h2>
              <ol class="user-profile-media-list-grid">
                <For each={list.entries}>{entry => (
                  <li>
                    <img src={entry.media.coverImage.large} loading="lazy" alt="Cover" />
                  </li>
                )}</For>
              </ol>
            </Show>
          )}
          </For>
        </Show>
      </div>
    </div>
  );
}
