import { A, useLocation, useParams, useSearchParams } from "@solidjs/router";
import { batch, createSignal, For, Match, on, onCleanup, onMount, Show, Switch } from "solid-js";
import { createEffect } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { removeDuplicateIgnoreCaseSensitivity, wrapToArray, wrapToSet } from "../utils/arrays";
import { CompareMediaListContext, useAuthentication, useCompareMediaList } from "../context/providers";
import api, { IndexedDB } from "../utils/api";
import { LoaderCircle } from "../components/LoaderCircle.jsx";
import { Tooltip } from "../components/Tooltips.jsx";
import CompareMediaListWorker from "../worker/compare-media-list.js?worker";
import { capitalize, formatMediaFormat, formatTitleToUrl, formatUsersMediaStatus, languageFromCountry, mediaUrl } from "../utils/formating.js";
import "./ComparePage.scss";
import Score from "../components/media/Score.jsx";
import Star from "../assets/Star.jsx";
import { searchFormats } from "../utils/searchObjects.js";
import { debounce } from "@solid-primitives/scheduled";
import { asserts } from "../utils/utils.js";

export default function ComparePage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const [names, storeNames] = createStore([]);
  const [users, storeUsers] = createStore({});
  const [compareMediaList, setCompareMediaList] = createSignal([]);
  const [includeKeys, setIncludeKeys] = createSignal([]);
  const [excludeKeys, setExcludeKeys] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  createEffect(on(() => searchParams.user, user => {
    const names = wrapToSet(user);
    storeNames(reconcile([...names], []));
  }));

  const search = () => searchParams.search || "";
  const format = () => searchParams.format || "";
  const reviewsNeeded = () => searchParams.reviewsNeeded || includeKeys().length;
  const status = () => searchParams.status || "";
  const genre = () => searchParams.genre || "";
  const countryOfOrigin = () => searchParams.countryOfOrigin || "";
  const year = () => searchParams.year || "";
  const privateFilter = () => searchParams.private === "true";
  const notesFilter = () => searchParams.notes === "true";
  const rewatchedFilter = () => searchParams.repeat === "true";
  const missingStartFilter = () => searchParams.missingStart === "true";
  const missingScoreFilter = () => searchParams.missingScore !== "false";
  const reverse = () => searchParams.reverse === "true";
  const sort = () => searchParams.sort || "score";
  const userStatus = () => searchParams.userStatus || "";
  const isAdult = () => {
    if (searchParams.isAdult === "true") return true;
    if (searchParams.isAdult === "false") return false;
    return undefined;
  };

  let worker;
  function updateCompareScores() {
    if (window.Worker) {
      worker = worker instanceof Worker ? worker : new CompareMediaListWorker();

      const postObject = {
        includeKeys: includeKeys(),
        excludeKeys: excludeKeys(),
        search: search(),
        format: format(),
        status: status(),
        genre: genre(),
        reverse: reverse(),
        countryOfOrigin: countryOfOrigin(),
        missingStart: missingStartFilter(),
        missingScore: missingScoreFilter(),
        isAdult: isAdult(),
        year: +year() || undefined,
        private: privateFilter(),
        notes: notesFilter(),
        repeat: rewatchedFilter(),
        reviewsNeeded: reviewsNeeded(),
        sort: sort(),
        type: params.type,
        userStatus: userStatus(),
      };

      if (postObject.includeKeys.length === 0) {
        setCompareMediaList([]);
        return;
      }

      worker.postMessage(postObject);
      setLoading(true);

      worker.onmessage = message => {
        if (message.data === "success") {
          const cacheReq = IndexedDB.user();
          cacheReq.onsuccess = evt => {
            const db = evt.target.result;
            const store = IndexedDB.store(db, "data", "readonly");
            const getReq = store.get("compare_list");
            getReq.onerror = () => setLoading(false);
            getReq.onsuccess = (evt) => {
              setLoading(false);
              setCompareMediaList(evt.target.result || []);
            }
          }
        } else {
          setLoading(false);
          console.error("Error");
        }
      }
    }
  }

  createEffect(updateCompareScores);
  document.title = `Compare ${params.type} - LOB`;

  return (
    <CompareMediaListContext.Provider value={{ compareMediaList, includeKeys, setIncludeKeys, setExcludeKeys, users, storeUsers, loading }}>
      <div class="pg-compare">
        <UserSearch />
        <div>
          <ul class="pg-compare-users">
            <For each={names}>{name => (
              <UserRow name={name} />
            )}</For>
          </ul>
        </div>
        <div class="pg-compare-filter-panel">
          <input type="text" placeholder="Search" onInput={e => setSearchParams({ search: e.target.value || undefined })} value={search()} />
          <Show when={null?.data}>
            <ol>
              <li>
                <button onClick={() => navigate("")}>
                  <Show when={params.list === undefined}>{"> "}</Show>
                  All {null.data.total}
                </button>
              </li>
              <For each={null.data.lists}>{list => (
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
          <select name="userStatus" onChange={e => setSearchParams({ userStatus: e.target.value || undefined })} value={userStatus() || ""}>
            <option value="" hidden>User Status</option>
            <Show when={userStatus()}>
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
            <option value="" hidden>Age rating</option>
            <Show when={isAdult() !== undefined}>
              <option value="">All ratings</option>
            </Show>
            <option value="false">R-17+</option>
            <option value="true">R-18</option>
          </select>
          <input type="number" name="year" placeholder="Release year" max="9999" min="0" value={year()} onInput={e => setSearchParams({ year: e.target.value || undefined })} />
          <label htmlFor="repeat">
            <input type="checkbox" name="repeat" id="repeat" checked={rewatchedFilter()} onChange={e => setSearchParams({ repeat: e.target.checked ? "true" : undefined })} />
            {" "}
            <Switch>
              <Match when={params.type === "anime"}>Rewatched</Match>
              <Match when={params.type === "manga"}>Reread</Match>
            </Switch>
          </label>
          <label htmlFor="missingScore">
            <input type="checkbox" name="missingScore" id="missingScore" checked={missingScoreFilter()} onChange={e => setSearchParams({ missingScore: e.target.checked ? undefined : "false" })} />
            {" "}Allow missing scores
          </label>
          <label htmlFor="reverse">
            <input type="checkbox" name="reverse" id="reverse" checked={reverse()} onChange={e => setSearchParams({ reverse: e.target.checked ? "true" : undefined })} />
            {" "}Reverse order
          </label>
          <select name="sort" value={sort()} onChange={e => setSearchParams({ sort: e.target.value === "score" ? undefined : e.target.value })}>
            <option value="averageScore">Global Score</option>
            <Show when={params.type === "manga"}>
              <option value="chapters">Chapters</option>
            </Show>
            <Show when={params.type === "anime"}>
              <option value="episodes">Episodes</option>
            </Show>
            <option value="popularity">Popularity</option>
            <option value="releaseDate">Release Date</option>
            <option value="repeat">
              <Switch>
                <Match when={params.type === "anime"}>Rewatches</Match>
                <Match when={params.type === "manga"}>Rereads</Match>
              </Switch>
            </option>
            <option value="score">User score</option>
            <option value="title">Title</option>
            <Show when={params.type === "manga"}>
              <option value="volumes">Volumes</option>
            </Show>
          </select>
          <label htmlFor="reviewsNeeded">Reviews needed: 
            <input 
              type="number" 
              inputMode="numeric" 
              onBlur={e => setSearchParams({ reviewsNeeded: Number(e.target.value) >= includeKeys().length ? undefined : +e.target.value || "" })} 
              onBeforeInput={e => {
                if (e.data?.toLowerCase().includes("e")) {
                  e.preventDefault();
                }
              }}
              min="1" 
              max={includeKeys().length} 
              placeholder={includeKeys().length + " (All)"}
              value={reviewsNeeded()} 
              onInput={e => setSearchParams({ reviewsNeeded: e.target.value == includeKeys().length ? undefined : e.target.value })} 
              name="reviewsNeeded" 
              id="reviewsNeeded"  
            />
            <button class="help">?
              <Tooltip tipPosition="bottom">
                Count of how many users need to have the {params.type} on their list <i>(default is all users)</i>
              </Tooltip>
            </button>
          </label>
          <Switch>
            <Match when={new URLSearchParams(location.search).keys().some(key => key !== "user")}>
              <button style={{background: "var(--crimson-400)"}} onClick={() => {
                setSearchParams({
                  search: undefined,
                  format: undefined,
                  status: undefined,
                  genre: undefined,
                  countryOfOrigin: undefined,
                  reviewsNeeded: undefined,
                  missingStart: undefined,
                  missingScore: undefined,
                  isAdult: undefined,
                  year: undefined,
                  private: undefined,
                  notes: undefined,
                  repeat: undefined,
                  sort: undefined,
                  userStatus: undefined
                });
              }}>Reset filters</button>
            </Match>
          </Switch>
        </div>
        <CompareMediaListContent />
      </div>
    </CompareMediaListContext.Provider>
  );
}

function UserSearch() {
  const [search, setSearch] = createSignal("");
  const [index, setIndex] = createSignal(0);
  const [searchVar, setSearchVar] = createSignal(undefined);
  const { accessToken } = useAuthentication();
  const [searchedUsers, { mutate: mutateSearchUsers }] = api.anilist.searchUsers(searchVar, 1, accessToken);
  const triggerSetSearchVar = debounce(setSearchVar, 300);
  const [searchParams, setSearchParams] = useSearchParams();
  let form;

  createEffect(on(index, i => {
    const target = form?.querySelectorAll("li")[i];
    const wrapper = form?.querySelector("ol");
    if (!target || !wrapper) {
      return;
    }

    const { height, top: wrapperTop } = wrapper.getBoundingClientRect();
    const { top, bottom } = target.getBoundingClientRect();
    const scrollDown = bottom - wrapperTop - height
    if (scrollDown > 0) {
      wrapper.scrollTop += scrollDown;
    }
    const scrollUp = top - wrapperTop;
    if (scrollUp < 0) {
      wrapper.scrollTop += scrollUp;
    }
  }));

  function addUserToSearch(user) {
    user = user?.trim() || "";
    if (user) {
      setSearchParams({user: removeDuplicateIgnoreCaseSensitivity([...wrapToSet(searchParams.user).add(user)])});
    }
    batch(() => {
      triggerSetSearchVar(undefined);
      mutateSearchUsers(undefined);
      setIndex(0);
      setSearch("");
    });
  }

  return (
    <form class="pg-compare-user-search" ref={form} onKeyDown={e => {
      const userCount = searchedUsers()?.data?.users?.length || 0;
      if (!userCount) {
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex(i => (i + 1) % userCount);
      } else if (e.key === "ArrowUp"){
        e.preventDefault();
        setIndex(i => (userCount + i - 1) % userCount);
      }
    }} onSubmit={e => {
        e.preventDefault();
        addUserToSearch(searchedUsers()?.data.users?.[index()]?.name || search());
      }}>
      <input type="search" name="user" id="user" value={search()} placeholder="Search users" onInput={e => {
        batch(() => {
          setSearch(e.target.value);
          setIndex(0);
          triggerSetSearchVar(e.target.value.trim() || undefined);
          mutateSearchUsers(undefined);
        });
      }} />
      <Show when={search()}>
        <ol>
          <For each={searchedUsers()?.data.users}>{(user, i) => (
            <li 
              classList={{selected: index() === i()}} 
              onClick={() => addUserToSearch(user.name) } 
              onMouseEnter={() => setIndex(i())}
            >
              <img src={user.avatar.large} alt="Profile picture" />
              {user.name}
            </li>
          )}</For>
        </ol>
      </Show>
    </form>
  );
}

function UserRow(props) {
  asserts.assertTrue(props.name, "Name is missing");
  const params = useParams();
  const { setIncludeKeys, setExcludeKeys, storeUsers } = useCompareMediaList();
  const [searchParams, setSearchParams] = useSearchParams();
  const { accessToken } = useAuthentication();
  const [enabled, setEnabled] = createSignal(true);
  const [exclude, setExclude] = createSignal(false);
  const [mediaList, { mutateCache: mutateMediaListCache }] = api.anilist.mediaListByUserName(() => props.name, () => params.type.toUpperCase(), accessToken);

  function setKeys(keys, excludedValue) {
    if (enabled() && exclude() === excludedValue) {
      return [...new Set([...keys, mediaList().cacheKey])];
    } else {
      return keys.filter(val => val !== mediaList().cacheKey);
    }
  }

  function remove() {
    setIncludeKeys(keys => keys.filter(key => key !== mediaList()?.cacheKey));
    setExcludeKeys(keys => keys.filter(key => key !== mediaList()?.cacheKey));

    setSearchParams({ user: wrapToArray(searchParams.user).filter(name => name !== props.name) });
  }

  createEffect(() => {
    if (mediaList()) {
      storeUsers(mediaList().data.user.name, mediaList().data.user);

      if (mediaList.indexedDBClosed) {
        setIncludeKeys(keys => setKeys(keys, false));
        setExcludeKeys(keys => setKeys(keys, true));
      }
    }
  });

  return (
    <li classList={{disabled: !enabled(), exclude: exclude()}}>
      <Switch>
        <Match when={mediaList.error}>
          <p class="error">No user found with name: "{props.name}"</p>
        </Match>
        <Match when={mediaList() || mediaList.loading}>
          <Show when={mediaList()} fallback={
            <LoaderCircle>
              <Tooltip tipPosition="right">
                <p>Loading user data</p>
              </Tooltip>
            </LoaderCircle>
          }>
            <img src={mediaList().data.user.avatar.large} alt={mediaList().data.user.name + " profile picture"} />
          </Show>
          <p>
            <Show when={mediaList()} fallback={props.name}>
              {mediaList().data.user.name}
            </Show>
          </p>
          <label>
            <input type="checkbox" name="enable" checked={!enabled()} onChange={e => setEnabled(!e.target.checked)} /> Disable <button>?
              <Tooltip tipPosition="bottom">
                Disabling a user removes them from search and filtering, just like removing them.
              </Tooltip>
            </button>
          </label>
          <label>
            <input type="checkbox" name="enable" checked={exclude()} onChange={e => setExclude(e.target.checked)} /> Filter out <button>?
              <Tooltip tipPosition="bottom">
                Filters out all {params.type} from user {mediaList()?.data?.user?.name || props.name}
              </Tooltip>
            </button>
          </label>
        </Match>
      </Switch>
      <button onClick={() => remove(mediaList()?.cacheKey)}>Remove</button>
    </li>
  );
}

function CompareMediaListContent() {
  const { compareMediaList, loading, includeKeys } = useCompareMediaList();
  const [searchParams] = useSearchParams();
  const params = useParams();

  return (
    <>
      <h1>Total {params.type} {compareMediaList().length}</h1>
      <ol class="pg-compare-content grid-column-auto-fill" classList={{loading: loading()}}>
        <LoaderCircle />
        <Show when={compareMediaList()} keyed>
          <ContentPage />
        </Show>
      </ol>
      <Show when={compareMediaList().length === 0}>
        <Switch fallback="No content">
          <Match when={loading()}>Loading content</Match>
          <Match when={!searchParams.user}>No users selected</Match>
          <Match when={includeKeys().length === 0}>All users are disabled</Match>
        </Switch>
      </Show>
    </>
  );
}

const [cardsVisibility, storeCardsVisibility] = createStore([]);
function ContentPage() {
  const { compareMediaList, users } = useCompareMediaList();
  const params = useParams();
  const observerList = [];

  function observe(target) {
    observerList.push(target);
  }

  onMount(() => {
    observerList.forEach(elem => intersectionObserver.observe(elem));
  });

  onCleanup(() => {
    intersectionObserver.disconnect();
  });

  const options = { rootMargin: "500px" }
  const callback = (entries) => {
    for (const entry of entries) {
      storeCardsVisibility(entry.target.dataset.index, entry.isIntersecting);
    }
  };

  const intersectionObserver = new IntersectionObserver(callback, options);

  return (
    <For each={compareMediaList()}>{(media, i) => (
      <li use:observe attr:data-index={i()} class="pg-compare-media-card inline-container" style={{"--color": media.coverImage.color}}>
        <div class="wrapper">
          <Show when={cardsVisibility[i()]}>
            <Show when={media.bannerImage}>
              <img src={media.bannerImage} loading="lazy" class="bg" inert alt="Background banner" />
            </Show>
            <div class="cover-wrapper" href={mediaUrl(media)}>
              <div class="header flex-space-between">
                <Show when={media.repeat}>
                  <div class="cp-card-repeat">
                    <Tooltip tipPosition="right">Compined {params.type === "anime" ? "rewatches" : "rereads"} {media.repeat}</Tooltip>
                    {media.repeat}
                    <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"></path></svg>
                  </div>
                </Show>
                <div class="score">
                  <Tooltip tipPosition="right">Global average score</Tooltip>
                  <Star /> {(media.averageScore / 10) || "N/A"}
                </div>
              </div>
              <A class="cover-link" href={mediaUrl(media)}>
                <img class="cover" loading="lazy" src={media.coverImage.large} alt="Media cover" />
              </A>
              <Show when={media.episodes || media.chapters || media.volumes || media.score}>
                <div class="footer flex-space-between">
                  <span>
                    <Switch>
                      <Match when={params.type === "anime"}>
                        <Show when={media.episodes}>Ep {media.episodes}</Show>
                      </Match>
                      <Match when={params.type === "manga"}>
                        <Show when={media.chapters}>Ch {media.chapters}</Show><br />
                        <Show when={media.volumes}>Vol {media.volumes}</Show>
                      </Match>
                    </Switch>
                  </span>
                  <Show when={media.score}>
                    <span>
                      {Math.round(media.score * 100) / 100}
                      <Tooltip tipPosition="right">Users average score</Tooltip>
                    </span>
                  </Show>
                </div>
              </Show>
            </div>
            <div class="pg-compare-card-content">
              <p class="title">{media.title.userPreferred}</p>
              <ol class="pg-compare-media-users">
                <For each={media.mediaEntries}>{user => (
                  <li>
                    <A href={ "/user/" + user.name } class="name">
                      <img class="profile" src={users[user.name].avatar.large} alt="Profile picture" />
                      {user.name}
                    </A>
                    <Show when={user.status !== "COMPLETED"}>
                      <span class="status">{formatUsersMediaStatus(user.status, params.type)}</span>
                    </Show>
                    <Show when={user.repeat}>
                      <div class="cp-card-repeat">
                        {user.repeat}
                        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"></path></svg>
                      </div>
                    </Show>
                    <Score score={user.score} format={users[user.name].mediaListOptions.scoreFormat || "POINT_10_DECIMAL"} />
                  </li>
                )}</For>
              </ol>
              <ul class="flex-bullet-separator">
                <Show when={Object.entries(searchFormats.ani.media).find(([, val]) => val.api === media.format)?.[0]}>{formatApiValue => (
                  <li>
                    <Switch>
                      <Match when={media.countryOfOrigin !== "JP"}> 
                        <A href={"/search/" + media.type.toLowerCase() + "?format=" + formatApiValue() + "&country=" + media.countryOfOrigin}>
                          {formatMediaFormat(media.format)} ({languageFromCountry(media.countryOfOrigin)})
                        </A>
                      </Match>
                      <Match when={media.countryOfOrigin === "JP"}> 
                        <A href={"/search/" + media.type.toLowerCase() + "?format=" + formatApiValue()}>
                          {formatMediaFormat(media.format)}
                        </A>
                      </Match>
                    </Switch>
                  </li>
                )}</Show>
                <Switch>
                  <Match when={params.type === "manga"}>
                    <Switch>
                      <Match when={media.startDate?.year}>
                        <A href={"/search/manga?year=" + media.startDate.year}>{media.startDate.year}</A>
                      </Match>
                      <Match when={media.startDate?.year == null}>
                        <A href="/search/manga/tba">TBA</A>
                      </Match>
                    </Switch>
                  </Match>
                  <Match when={params.type === "anime"}>
                    <Switch>
                      <Match when={media.seasonYear && media.season}>
                        <A href={"/search/anime/" + media.season.toLowerCase() + "-" + media.seasonYear}>{capitalize(media.season)} {media.seasonYear}</A>
                      </Match>
                      <Match when={media.startDate?.year}>
                        <A href={"/search/anime?year=" + media.startDate.year}>{media.startDate.year}</A>
                      </Match>
                      <Match when={media.startDate?.year == null}>
                        <A href="/search/anime/tba">TBA</A>
                      </Match>
                    </Switch>
                  </Match>
                </Switch>
              </ul>
            </div>
          </Show>
        </div>
      </li>
    )}</For>
  );
}
