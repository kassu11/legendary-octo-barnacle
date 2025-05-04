import { A, useLocation, useNavigate, useParams, useSearchParams } from "@solidjs/router";
import api, { IndexedDB } from "../utils/api.js";
import { createContext, createEffect, createMemo, createSignal, For, Match, onCleanup, Show, useContext } from "solid-js";
import "./User.scss";
import { useAuthentication } from "../context/AuthenticationContext.jsx";
import { assert } from "../utils/assert.js";
import { formatTimeToDate, formatTitleToUrl, numberCommas } from "../utils/formating.js";
import { ActivityCard } from "../components/Activity.jsx";
import UserMediaListWorker from "../worker/user-media-list.js?worker";
import { useEditMediaEntries } from "../context/EditMediaEntriesContext.jsx";
import { createStore } from "solid-js/store";
import { DoomScroll } from "../components/utils/DoomScroll.jsx";
import Score from "../components/media/Score.jsx";

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
  const _now = new Date();
  let start = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate());
  const end = start.getTime() / 1000;
  start.setDate(start.getDate() - 7 * 25 + (6 - start.getDay()) - 5);
  start /= 1000;

  return (
    <Show when={props.history.at(-1).date > start}>
      <div>
        <h3>Activity</h3>
        <div class="activity-history-container">
          <ol class="activity-history-header-list">
            <li class="activity-history-header">Mon</li>
            <li class="activity-history-header">Tue</li>
            <li class="activity-history-header">Wed</li>
            <li class="activity-history-header">Thu</li>
            <li class="activity-history-header">Fri</li>
            <li class="activity-history-header">Sat</li>
            <li class="activity-history-header">Sun</li>
          </ol>
          <ol class="activity-history-list">
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
      </div>
    </Show>
  );
}


export function AnimeList() {
  return <MediaList type="anime" />
}
export function MangaList() {
  return <MediaList type="manga" />
}


function MediaList(props) {
  assert(props.type, "Type missing");
  const { user } = useUser();
  const params = useParams();
  const location = useLocation();
  const { accessToken, authUserData } = useAuthentication();
  const { openEditor } = useEditMediaEntries();
  const [mediaList, { mutateCache: mutateMediaListCache }] = api.anilist.mediaListByUserId(() => user().id || undefined, () => props.type.toUpperCase(), accessToken);
  const [searchParams, _setSearchParams] = useSearchParams();
  const [listData, setListData] = createSignal({});
  const _navigate = useNavigate();
  let worker;

  const navigate = (listName) => {
    _navigate(`/user/${user().name}/${props.type}${listName ? "/" + listName : ""}${location.search}`, { replace: true });
  }
  const setSearchParams = (options) => {
    _setSearchParams(options, { replace: true });
  }
  const search = () => searchParams.search || "";
  const format = () => searchParams.format || "";
  const status = () => searchParams.status || "";
  const genre = () => searchParams.genre || "";
  const countryOfOrigin = () => searchParams.countryOfOrigin || "";
  const isAdult = () => {
    if (searchParams.isAdult === "true") return true;
    if (searchParams.isAdult === "false") return false;
    return undefined;
  };
  const year = () => searchParams.year || "";
  const privateFilter = () => searchParams.private === "true";
  const notesFilter = () => searchParams.notes === "true";
  const rewatchedFilter = () => searchParams.rewatched === "true";
  const sort = () => searchParams.sort || "score";

  const updateListInfo = () => {
    if (window.Worker && mediaList()) {
      worker = worker instanceof Worker ? worker : new UserMediaListWorker();

      const postObject = {
        cacheKey: mediaList().cacheKey,
        search: search(),
        format: format(),
        status: status(),
        genre: genre(),
        countryOfOrigin: countryOfOrigin(),
        isAdult: isAdult(),
        year: +year() || undefined,
        private: privateFilter(),
        notes: notesFilter(),
        rewatched: rewatchedFilter(),
        sort: sort(),
        type: props.type,
      };

      worker.postMessage(postObject);

      worker.onmessage = message => {
        if (message.data === "success") {
          const cacheReq = IndexedDB.user();
          cacheReq.onsuccess = evt => {
            const db = evt.target.result;
            const store = IndexedDB.store(db, "data", "readonly");
            const getReq = store.get("media_list");
            getReq.onsuccess = (evt) => {
              setListData(evt.target.result || {});
            }
          }
        } else {
          console.error("Error");
        }
      }
    }
  }

  createEffect(updateListInfo);

  onCleanup(() => {
    if (worker instanceof Worker) worker.terminate();
  });

  return (
    <div class="user-profile-media-list-body">
      <div class="user-profile-media-list-search">
        <input type="text" placeholder="Search" onInput={e => setSearchParams({ search: e.target.value || undefined })} value={search()} />
        <Show when={listData()?.data}>
          <ol>
            <li>
              <button onClick={() => navigate("")}>
                <Show when={params.list === undefined}>{"> "}</Show>
                All {listData().data.total}
              </button>
            </li>
            <For each={listData().data.lists}>{list => (
              <li>
                <button onClick={() => navigate(list.name)}>
                  <Show when={decodeURI(params.list) === list.name}>{"> "}</Show>
                  {list.name} {list.entries.length}
                </button>
              </li>
            )}
            </For>
          </ol>
        </Show>
        <select name="format" onChange={e => setSearchParams({ format: e.target.value || undefined })} value={format() || ""}>
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
        <select name="status" onChange={e => setSearchParams({ status: e.target.value || undefined })} value={status() || ""}>
          <option value="" hidden>Status</option>
          <Show when={status()}>
            <option value="">Any Status</option>
          </Show>
          <option value="RELEASING">Releasing</option>
          <option value="FINISHED">Finished</option>
          <option value="NOT_YET_RELEASED">Not Yet Released</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <select name="genre" onChange={e => setSearchParams({ genre: e.target.value || undefined })} value={genre() || ""}>
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
        <select name="countryOfOrigin" onChange={e => setSearchParams({ countryOfOrigin: e.target.value || undefined })} value={countryOfOrigin() || ""}>
          <option value="" hidden>Country</option>
          <Show when={countryOfOrigin()}>
            <option value="">All countries</option>
          </Show>
          <option value="CN">China</option>
          <option value="JP">Japan</option>
          <option value="KR">South Korea</option>
          <option value="TW">Taiwan</option>
        </select>
        <select name="isAdult" onChange={e => setSearchParams({ isAdult: e.target.value || undefined })} value={isAdult() === undefined ? "" : String(isAdult())}>
          <option value="" hidden>Age</option>
          <Show when={isAdult() !== undefined}>
            <option value="">All ratings</option>
          </Show>
          <option value="false">R-17+</option>
          <option value="true">R-18</option>
        </select>
        <input type="number" placeholder="Release year" max="9999" min="0" value={year()} onInput={e => setSearchParams({ year: e.target.value || undefined })} />
        <Show when={authUserData().data.id === user().id}>
          <label htmlFor="private">
            <input type="checkbox" name="private" id="private" checked={privateFilter()} onChange={e => setSearchParams({ private: e.target.checked ? "true" : undefined })} />
            {" "}Private
          </label>
        </Show>
        <label htmlFor="notes">
          <input type="checkbox" name="notes" id="notes" checked={notesFilter()} onChange={e => setSearchParams({ notes: e.target.checked ? "true" : undefined })} />
          {" "}Notes
        </label>
        <label htmlFor="rewatched">
          <input type="checkbox" name="rewatched" id="rewatched" checked={rewatchedFilter()} onChange={e => setSearchParams({ rewatched: e.target.checked ? "true" : undefined })} />
          {" "}Rewatched
        </label>
        <select name="sort" value={sort()} onChange={e => setSearchParams({ sort: e.target.value === "score" ? undefined : e.target.value })}>
          <option value="score">Score</option>
          <option value="title">Title</option>
          <option value="progress">Progress</option>
          <option value="updatedAt">Last Updated</option>
          <option value="startedAt">Start Date</option>
          <option value="completedAt">Completed Date</option>
          <option value="releaseDate">Release Date</option>
          <option value="averageScore">Average Score</option>
          <option value="popularity">Popularity</option>
        </select>
        <button onClick={() => {
          setSearchParams({
            search: undefined,
            format: undefined,
            status: undefined,
            genre: undefined,
            countryOfOrigin: undefined,
            isAdult: undefined,
            year: undefined,
            private: undefined,
            notes: undefined,
            rewatched: undefined,
            sort: undefined
          });
        }}>clear</button>
      </div>
      <div class="user-profile-media-list-container">
        <Show when={listData()?.data}>
          <For each={listData().data.lists}>{list => (
            <Show when={list.entries.length && (!params.list || decodeURI(params.list) === list.name)}>
              <h2>{list.name}</h2>
              <ol class="user-profile-media-list-grid">
                <For each={list.entries}>{entry => (
                  <li class="horizontal-search-card">
                    <A href={"/" + entry.media.type.toLowerCase() +  "/" + entry.media.id + "/" + formatTitleToUrl(entry.media.title.userPreferred)}>
                      <div class="container">
                        <img src={entry.media.coverImage.large} class="cover" alt="Cover." />
                        <div class="user-media-card-header">
                          <Show when={entry.repeat}>
                            <div class="user-profile-media-repeat" label={"Rewatched " + entry.repeat + " times"}>
                              {entry.repeat}
                              <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"></path></svg>
                            </div>
                          </Show>
                          <Show when={entry.notes}>
                            <div class="user-profile-media-notes" label={entry.notes}>
                              <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"></path></svg>
                            </div>
                          </Show>
                        </div>
                        <div class="user-media-card-footer">
                          <p>
                            {entry.media.title.userPreferred}
                          </p>
                          <div>
                            <p>
                              <Switch>
                                <Match when={entry.media.type === "ANIME"}>
                                  Ep {entry.progress}
                                  <Show when={entry.progress < entry.media.episodes}>/{entry.media.episodes}</Show>
                                </Match>
                                <Match when={entry.media.type === "MANGA"}>
                                  Ch {entry.progress}
                                  <Show when={entry.progress < entry.media.chapters}>/{entry.media.chapters}</Show>
                                  <Show when={entry.progressVolumes > 0}><br />Vol {entry.progressVolumes}
                                    <Show when={entry.progressVolumes < entry.media.volumes}>/{entry.media.volumes}</Show>
                                  </Show>
                                </Match>
                              </Switch>
                            </p>
                            <Score score={entry.score} format={user().mediaListOptions.scoreFormat || "POINT_10_DECIMAL"} />
                          </div>
                        </div>
                        <Show when={user().id === authUserData().data.id}>
                          <div class="search-card-quick-action">
                            <ul class="search-card-quick-action-items">
                              <li class="item" label="Edit media">
                                <button onClick={e => {
                                  e.preventDefault();
                                  openEditor({ ...entry.media, mediaListEntry: entry }, {
                                    mutateMedia: responseEntry => {
                                      mutateMediaListCache(res => {
                                        listData().indecies[entry.media.id].forEach(([listIndex, entryIndex]) => {
                                          res.data.lists[listIndex].entries[entryIndex] = responseEntry;
                                        });
                                        return res;
                                      });
                                      updateListInfo();
                                    },
                                    deleteMedia: () => {
                                      mutateMediaListCache(res => {
                                        listData().indecies[entry.media.id].forEach(([listIndex, entryIndex]) => {
                                          res.data.lists[listIndex].entries.splice(entryIndex, 1);
                                        });
                                        return res;
                                      });
                                      updateListInfo();
                                    }
                                  });
                                }}>
                                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </Show>
                      </div>
                    </A> 
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

export function FavouriteContainer() {
  return (
    <div class="user-profile-favourites">
      <FavouriteSection title="Favourite animes" type="anime" />
      <FavouriteSection title="Favourite characters" type="characters" />
      <FavouriteSection title="Favourite manga" type="manga" />
      <FavouriteSection title="Favourite staff" type="staff" />
      <FavouriteSection title="Favourite studios" type="studios" />
    </div>
  );
}

function FavouriteSection(props) {
  assert(props.title, "title missing");
  assert(props.type, "type missing");
  const [visible, setVisible] = createSignal(false);
  const [reorder, setReorder] = createSignal(false);
  const [order, setOrder] = createSignal([]);
  const { accessToken, authUserData } = useAuthentication();
  const { user } = useUser();

  let ol, dragging, offsetX,offsetY;

  const resetOrder = () => {
    setReorder(false);
    order().forEach(id => {
      const elem = ol.querySelector(`li[data-id="${id}"]`);
      if (elem) {
        ol.append(elem);
      }
    });
  }

  const dragStart = e => {
    if (!reorder()) {
      return;
    }
    const dragged = e.target.closest("li");
    if (!dragged) {
      return
    }

    dragged.classList.add("dragging");
    const rect = dragged.getBoundingClientRect();
    if (e.type === "touchstart") {
      const touch = e.touches[0];
      offsetX = touch.clientX - rect.x;
      offsetY = touch.clientY - rect.y;
    } else {
      offsetX = e.clientX - rect.x;
      offsetY = e.clientY - rect.y;
    }
    dragging = dragged;
  }

  const dragMove = e => {
    if (!reorder()) {
      return;
    }

    if (dragging && e.type === "touchmove") {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY)?.closest("li");
      if (target) { 
        if (dragging.nextElementSibling === target) { target.after(dragging); } 
        else { target.before(dragging); } 
      }
      translateMove();
    }
    else if (dragging && e.buttons === 1 && e.target?.tagName === "LI") {
      if (dragging.nextElementSibling === e.target) { e.target.after(dragging); } 
      else { e.target.before(dragging); } 
    } else if(e.buttons !== 1) {
      dragEnd();
    }

    if (e.buttons === 1) {
      translateMove();
    }

    function translateMove() {
      const rect = dragging.getBoundingClientRect();
      let curX = 0, curY = 0, x = e.clientX, y = e.clientY;
      if (e.type === "touchmove") {
        const touch = e.touches[0];
        x = touch.clientX;
        y = touch.clientY;
      }
      if (dragging.style.transform) {
        const numbers = dragging.style.transform.match(/-?[\d.]+(?=px)/g).map(Number);
        [curX, curY] = numbers;
      }
      dragging.style.transform = `translate(${curX + (x - (rect.x + offsetX))}px, ${curY + (y - (rect.y + offsetY))}px)`;
    }
  }

  const dragEnd = () => {
    if (dragging) {
      dragging.style.transform = null;
      dragging.classList.remove("dragging");
    }
    dragging = null;
  }

  return (
    <details class="user-profile-favourites-details" classList={{hidden: !visible()}} open>
      <summary>
        <h3>{props.title}</h3>
        <Show when={user().id === authUserData()?.data.id}>
          <Switch>
            <Match when={reorder()}>
              <button onClick={async () => {
                const newIds = [...ol.childNodes].map(elem => +elem.dataset.id);
                const newOrder = newIds.map((_, i) => i + 1);

                let response;
                if (props.type="anime") {
                  response = await api.anilist.mutateFavourites(accessToken(), {animeIds: newIds, animeOrder: newOrder});
                } else if (props.type="manga") {
                  response = await api.anilist.mutateFavourites(accessToken(), {mangaIds: newIds, mangaOrder: newOrder});
                } else if (props.type="studios") {
                  response = await api.anilist.mutateFavourites(accessToken(), {studioIds: newIds, studioOrder: newOrder});
                } else if (props.type="staff") {
                  response = await api.anilist.mutateFavourites(accessToken(), {staffIds: newIds, staffOrder: newOrder});
                } else if (props.type="characters") {
                  response = await api.anilist.mutateFavourites(accessToken(), {characterIds: newIds, characterOrder: newOrder});
                } 

                if (response.status === 200) {
                  setOrder(newIds);
                  setReorder(false);
                } else {
                  resetOrder();
                  console.error("mutation failed");
                }
              }}>Save</button>
              <button onClick={resetOrder}>Cancel</button>
            </Match>
            <Match when={!reorder()}>
              <button onClick={() => setReorder(v => !v)}>Reorder</button>
            </Match>
          </Switch>
        </Show>
      </summary>
      <ol 
        ref={ol} 
        classList={{reorder: reorder(), grid: props.type !== "studios", flex: props.type === "studios"}} 
        onMouseMove={dragMove} 
        onTouchMove={dragMove} 
        onTouchEnd={dragEnd} 
        onMouseDown={dragStart} 
        onTouchStart={dragStart}
      >
        <FavouritesPage page={1} type={props.type} setOrder={setOrder} setVisible={setVisible}/>
      </ol>
    </details>
  );
}

function FavouritesPage(props) {
  assert(props.type, "Type is missing");
  const { user } = useUser();
  const { accessToken } = useAuthentication();
  const [page, setPage] = createSignal(undefined);
  const [favourites] = api.anilist.favouritesByUserId(() => user().id || undefined, props.page === 1 ? () => props.page : page, accessToken); 

  createEffect(() => {
    if (favourites()?.data[props.type]?.edges.length > 0) {
      props.setOrder(order => {
        order.splice((props.page - 1) * 25, 25, ...favourites()?.data[props.type]?.edges.map(edge => edge.node.id));
        return [...order];
      });
    }
    if (props.page === 1) {
      props.setVisible(favourites()?.data[props.type]?.edges.length > 0)
    }
  });
  
  return (
    <DoomScroll rootMargin="100px" onIntersection={() => setPage(props.page)} loading={props.loading} fetchResponse={favourites}>{fetchCooldown => (
      <>
        <FavouritePageItems type={props.type} edges={favourites()?.data[props.type].edges} />
        <Show when={favourites().data[props.type].pageInfo.hasNextPage}>
          <Show when={favourites()?.data[props.type].edges} keyed={props.page === 1}>
            <Show when={fetchCooldown === false} fallback="Fetch cooldown">
              <FavouritesPage
                page={props.page + 1} 
                type={props.type}
                setOrder={props.setOrder}
                loading={favourites.loading} 
              /> 
            </Show>
          </Show>
        </Show>
      </>
    )}</DoomScroll>
  );
}

function FavouritePageItems(props) {
  return (
    <For each={props.edges}>{edge => (
      <li class="item" attr:data-id={edge.node.id}>
        <Switch>
          <Match when={props.type === "anime"}>
            <A href={"/anime/" + edge.node.id + "/" + formatTitleToUrl(edge.node.title.userPreferred)}>
              <img src={edge.node.coverImage.large} alt="Cover" />
            </A>
          </Match>
          <Match when={props.type === "manga"}>
            <A href={"/manga/" + edge.node.id + "/" + formatTitleToUrl(edge.node.title.userPreferred)}>
              <img src={edge.node.coverImage.large} alt="Cover" />
            </A>
          </Match>
          <Match when={props.type === "characters"}>
            <A href={"/ani/character/" + edge.node.id + "/" + formatTitleToUrl(edge.node.name.userPreferred)}>
              <img src={edge.node.image.large} alt="Cover" />
            </A>
          </Match>
          <Match when={props.type === "staff"}>
            <A href={"/ani/staff/" + edge.node.id + "/" + formatTitleToUrl(edge.node.name.userPreferred)}>
              <img src={edge.node.image.large} alt="Cover" />
            </A>
          </Match>
          <Match when={props.type === "studios"}>
            <A href={"/ani/studio/" + edge.node.id + "/" + formatTitleToUrl(edge.node.name)}>
              {edge.node.name}
            </A>
          </Match>
        </Switch>
      </li>
    )}</For>
  );
}
