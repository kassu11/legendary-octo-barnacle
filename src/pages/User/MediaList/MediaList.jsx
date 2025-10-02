import { A, useLocation, useNavigate, useParams, useSearchParams } from "@solidjs/router";
import api, { IndexedDB } from "../../../utils/api.js";
import { createEffect, createSignal, For, Match, on, onCleanup, onMount, Show } from "solid-js";
import "./MediaList.scss";
import { capitalize, formatTitleToUrl, mediaUrl } from "../../../utils/formating.js";
import UserMediaListWorker from "../../../worker/user-media-list.js?worker";
import Score from "../../../components/media/Score.jsx";
import { useAuthentication, useEditMediaEntries, UserMediaListContext, useUser, useUserMediaList } from "../../../context/providers.js";
import { leadingAndTrailingDebounce } from "../../../utils/scheduled.js";
import { createStore } from "solid-js/store";
import { MediaCardEpisodes } from "./MediaCardEpisodes.jsx";
import { asserts } from "../../../collections/collections.js";
import { QuickActionButton } from "../../../components/Buttons.jsx";
import Edit from "../../../assets/Edit.jsx";

const useListNavigation = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const params = useParams();

  return listName => {
    navigate(`/user/${user().name}/${params.type}${listName ? "/" + listName : ""}${location.search}`, { replace: true });
  }
}

export function MediaList() {
  const { user } = useUser();
  const params = useParams();
  const { accessToken, authUserData } = useAuthentication();
  const [mediaList, { mutateCache: mutateMediaListCache }] = api.anilist.mediaListByUserName(() => user().name || undefined, () => params.type.toUpperCase(), accessToken);
  const [searchParams, _setSearchParams] = useSearchParams();
  const [listData, setListData] = createSignal({});
  let worker;
  createEffect(on(user, (u) => {
    if (u) {
      document.title = `${u.name} ${params.type} - LOB`;
    }
  }))
  document.title = "Authentication - LOB";

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
  const rewatchedFilter = () => searchParams.repeat === "true";
  const missingStartFilter = () => searchParams.missingStart === "true";
  const missingScoreFilter = () => searchParams.missingScore === "true";
  const reverse = () => searchParams.reverse === "true";
  const sort = () => searchParams.sort || "score";
  const userStatus = () => searchParams.userStatus || "";
  const studio = () => searchParams.studio || "";
  const tag = () => searchParams.tag || "";

  const triggerProgressIncrease = leadingAndTrailingDebounce(async (mediaId, newProgress, progressKey) => {
    asserts.assertTrue(progressKey, "Progress key is undefined");

    const response = await api.anilist.mutateMedia(accessToken(), { mediaId, [progressKey]: newProgress });
    if (response.status !== 200) {
      return;
    }

    mutateMediaListCache(res => {
      function pushEntryToList(name, isCustomList) {
        const listIndex = res.data.lists.findIndex(list => list.name === name && list.isCustomList === isCustomList);
        if (listIndex === -1) {
          res.data.lists.push({ name, isCustomList: false, isCompletedList: false, entries: [] });
        }

        const list = res.data.lists.at(listIndex);
        list.entries.push(response.data);
        listData().data.indecies[mediaId].push([listIndex === -1 ? res.data.lists.length - 1 : listIndex, list.entries.length - 1]);
      }

      listData().data.indecies[mediaId].forEach(([listIndex, entryIndex]) => {
        res.data.lists[listIndex].entries.splice(entryIndex, 1);
      });
      listData().data.indecies[mediaId] = [];

      if (!response.data.hiddenFromStatusLists) {
        const name = converStatusToListName(response.data.status, params.type);
        pushEntryToList(name, false);
      }

      for (const [listName, enabled] of Object.entries(response.data.customLists ?? {})) {
        if (enabled) {
          pushEntryToList(listName, true);
        }
      }
      return res;
    });
  }, 250, 2);

  const updateListInfo = () => {
    if (window.Worker && mediaList()) {
      worker = worker instanceof Worker ? worker : new UserMediaListWorker();

      const postObject = {
        cacheKey: mediaList().cacheKey,
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
        sort: sort(),
        studio: studio(),
        type: params.type,
        userStatus: userStatus(),
        tag: tag(),
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

  function isOwnProfile() {
    return user().id === authUserData()?.data.id;
  }

  return (
    <UserMediaListContext.Provider value={{ triggerProgressIncrease, isOwnProfile }}>
      <div class="user-profile-media-list-body">
        <SearchControls
          listData={listData}
          setSearchParams={setSearchParams}
          search={search}
          format={format}
          status={status}
          genre={genre}
          countryOfOrigin={countryOfOrigin}
          isAdult={isAdult}
          year={year}
          privateFilter={privateFilter}
          notesFilter={notesFilter}
          rewatchedFilter={rewatchedFilter}
          missingStartFilter={missingStartFilter}
          missingScoreFilter={missingScoreFilter}
          reverse={reverse}
          sort={sort}
          userStatus={userStatus}
          studio={studio}
          tag={tag}
        />
        <MediaListContainer
          listData={listData}
          mutateMediaListCache={mutateMediaListCache}
          updateListInfo={updateListInfo}
        />
      </div>
    </UserMediaListContext.Provider>
  );
}

function converStatusToListName(status, type) {
  switch (status) {
    case "COMPLETED": case "DROPPED": case "PAUSED": case "PLANNING":
      return capitalize(status)
    case "CURRENT":
      return type === "anime" ? "Watching" : "Reading";
    case "REPEATING":
      return type === "anime" ? "Rewatching" : "Rereading";
    default:
      asserts.assertTrue(false, "Unkown status: " + status);
  }
}

function MediaListNames(props) {
  const navigate = useListNavigation();
  const params = useParams();

  return (
    <Show when={props.listData()?.data}>
      <ol>
        <li>
          <button onClick={() => navigate("")}>
            <Show when={params.list === undefined}>{"> "}</Show>
            All {props.listData().data.total}
          </button>
        </li>
        <For each={props.listData().data.lists}>{list => (
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
  )
}

function SearchControls(props) {
  const navigate = useListNavigation();
  const location = useLocation();
  const { authUserData } = useAuthentication();
  const { isOwnProfile } = useUserMediaList();
  const { user } = useUser();
  const params = useParams();

  return (
    <div class="user-profile-media-list-search">
      <input type="text" placeholder="Search" onInput={e => props.setSearchParams({ search: e.target.value || undefined })} value={props.search()} />
      <MediaListNames listData={props.listData} />
      <select name="format" onChange={e => props.setSearchParams({ format: e.target.value || undefined })} value={props.format() || ""}>
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
      <select name="userStatus" onChange={e => props.setSearchParams({ userStatus: e.target.value || undefined })} value={props.userStatus() || ""}>
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
      <select name="status" onChange={e => props.setSearchParams({ status: e.target.value || undefined })} value={props.status() || ""}>
        <option value="" hidden>Status</option>
        <Show when={props.status()}>
          <option value="">Any Status</option>
        </Show>
        <option value="RELEASING">Releasing</option>
        <option value="FINISHED">Finished</option>
        <option value="NOT_YET_RELEASED">Not Yet Released</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <select name="genre" onChange={e => props.setSearchParams({ genre: e.target.value || undefined })} value={props.genre()}>
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
      <select name="countryOfOrigin" onChange={e => props.setSearchParams({ countryOfOrigin: e.target.value || undefined })} value={props.countryOfOrigin() || ""}>
        <option value="" hidden>Country</option>
        <Show when={props.countryOfOrigin()}>
          <option value="">All countries</option>
        </Show>
        <option value="CN">China</option>
        <option value="JP">Japan</option>
        <option value="KR">South Korea</option>
        <option value="TW">Taiwan</option>
      </select>
      <select name="isAdult" onChange={e => props.setSearchParams({ isAdult: e.target.value || undefined })} value={props.isAdult() === undefined ? "" : String(props.isAdult())}>
        <option value="" hidden>Age rating</option>
        <Show when={props.isAdult() !== undefined}>
          <option value="">All ratings</option>
        </Show>
        <option value="false">R-17+</option>
        <option value="true">R-18</option>
      </select>
      <Show when={params.type === "anime"}>
        <select name="studio" onChange={e => props.setSearchParams({ studio: e.target.value || undefined })} value={props.studio()}>
          <option value="" hidden>Studio</option>
          <Show when={props.studio()}>
            <option value="">All studios</option>
          </Show>
          <For each={props.listData()?.data?.studios}>{studio => (
            <option value={studio} selected={studio == props.studio()}>{studio}</option>
          )}</For>
        </select>
      </Show>
      <select name="tag" onChange={e => props.setSearchParams({ tag: e.target.value || undefined })} value={props.tag()}>
        <option value="" hidden>Tag</option>
        <Show when={props.tag()}>
          <option value="">All tags</option>
        </Show>
        <For each={props.listData()?.data?.tags}>{tag => (
          <option value={tag} selected={tag == props.tag()}>{tag}</option>
        )}</For>
      </select>
      <input type="number" placeholder="Release year" max="9999" min="0" value={props.year()} onInput={e => props.setSearchParams({ year: e.target.value || undefined })} />
      <Show when={isOwnProfile()}>
        <label htmlFor="private">
          <input type="checkbox" name="private" id="private" checked={props.privateFilter()} onChange={e => props.setSearchParams({ private: e.target.checked ? "true" : undefined })} />
          {" "}Private
        </label>
      </Show>
      <label htmlFor="notes">
        <input type="checkbox" name="notes" id="notes" checked={props.notesFilter()} onChange={e => props.setSearchParams({ notes: e.target.checked ? "true" : undefined })} />
        {" "}Notes
      </label>
      <label htmlFor="repeat">
        <input type="checkbox" name="repeat" id="repeat" checked={props.rewatchedFilter()} onChange={e => props.setSearchParams({ repeat: e.target.checked ? "true" : undefined })} />
        {" "}
        <Switch>
          <Match when={params.type === "anime"}>Rewatched</Match>
          <Match when={params.type === "manga"}>Reread</Match>
        </Switch>
      </label>
      <label htmlFor="missingStart">
        <input type="checkbox" name="missingStart" id="missingStart" checked={props.missingStartFilter()} onChange={e => props.setSearchParams({ missingStart: e.target.checked ? "true" : undefined })} />
        {" "}Missing start date
      </label>
      <label htmlFor="missingScore">
        <input type="checkbox" name="missingScore" id="missingScore" checked={props.missingScoreFilter()} onChange={e => props.setSearchParams({ missingScore: e.target.checked ? "true" : undefined })} />
        {" "}Missing score
      </label>
      <label htmlFor="reverse">
        <input type="checkbox" name="reverse" id="reverse" checked={props.reverse()} onChange={e => props.setSearchParams({ reverse: e.target.checked ? "true" : undefined })} />
        {" "}Reverse order
      </label>
      <select name="sort" value={props.sort()} onChange={e => props.setSearchParams({ sort: e.target.value === "score" ? undefined : e.target.value })}>
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
          <A href={ "/compare/" + params.type + "?user=" + user().name + "&user=" + authUserData().data.name }>
            <button>Compare with your list</button>
          </A>
        </Match>
        <Match when={true}>
          <A href={ "/compare/" + params.type + "?user=" + user().name }>
            <button>Open in compare page</button>
          </A>
        </Match>
      </Switch>
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
          }}>Remove filters</button>
        </Match>
        <Match when={params.list}>
          <button style={{background: "lime"}} onClick={() => {
            navigate("");
          }}>Back to home</button>
        </Match>
      </Switch>
    </div>
  );
}

function MediaListContainer(props) {
  const [cardsVisibility, storeCardsVisibility] = createStore({});
  const params = useParams();
  const { user } = useUser();
  const { openEditor } = useEditMediaEntries();
  const { isOwnProfile } = useUserMediaList();

  const callback = (entries) => {
    for (const entry of entries) {
      storeCardsVisibility(entry.target.dataset.list, entry.target.dataset.index, entry.isIntersecting);
    }
  };

  const intersectionObserver = new IntersectionObserver(callback, { rootMargin: "500px" });
  onCleanup(() => {
    intersectionObserver.disconnect();
  });

  return (
    <div class="user-profile-media-list-container">
      <Show when={props.listData()?.data}>
        <For each={props.listData().data.lists}>{list => {
          storeCardsVisibility(list.name, {});
          return (
            <Show when={list.entries.length && (!params.list || decodeURI(params.list) === list.name)}>
              <h2>{list.name}</h2>
              <ol class="user-profile-media-list-grid">
                <For each={list.entries}>{(entry, i) => {
                  let ref;
                  onMount(() => intersectionObserver.observe(ref));
                  onCleanup(() => intersectionObserver.unobserve(ref));

                  return (
                    <li ref={ref} attr:data-index={i()} attr:data-list={list.name} class="horizontal-search-card">
                      <Show when={cardsVisibility[list.name][i()]}> 
                        <A href={mediaUrl(entry.media)}>
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
                              <Show when={entry.media.isAdult}>
                                <p class="user-profile-media-list-adult-warning">18+</p>
                              </Show>
                              <p>
                                {entry.media.title.userPreferred}
                              </p>
                              <div>
                                <MediaCardEpisodes entry={entry} />
                                <Score score={entry.score} format={user().mediaListOptions.scoreFormat || "POINT_10_DECIMAL"} />
                              </div>
                            </div>
                            <Show when={isOwnProfile()}>
                              <QuickActionButton
                                big
                                label="Edit media"
                                onClick={e => {
                                  e.preventDefault();
                                  openEditor({ ...entry.media, mediaListEntry: entry }, {
                                    mutateMedia: responseEntry => {
                                      props.mutateMediaListCache(res => {
                                        function pushEntryToList(name, isCustomList) {
                                          const listIndex = res.data.lists.findIndex(list => list.name === name && list.isCustomList === isCustomList);
                                          if (listIndex === -1) {
                                            res.data.lists.push({ name, isCustomList: false, isCompletedList: false, entries: [] });
                                          }

                                          const list = res.data.lists.at(listIndex);
                                          list.entries.push(responseEntry);
                                          props.listData().data.indecies[entry.media.id].push([listIndex === -1 ? res.data.lists.length - 1 : listIndex, list.entries.length - 1]);
                                        }

                                        props.listData().data.indecies[entry.media.id].forEach(([listIndex, entryIndex]) => {
                                          res.data.lists[listIndex].entries.splice(entryIndex, 1);
                                        });
                                        props.listData().data.indecies[entry.media.id] = [];

                                        if (!responseEntry.hiddenFromStatusLists) {
                                          const name = converStatusToListName(responseEntry.status, params.type);
                                          pushEntryToList(name, false);
                                        }

                                        for (const [listName, enabled] of Object.entries(responseEntry.customLists ?? {})) {
                                          if (enabled) {
                                            pushEntryToList(listName, true);
                                          }
                                        }
                                        return res;
                                      }, props.updateListInfo);
                                    },
                                    deleteMedia: () => {
                                      props.mutateMediaListCache(res => {
                                        props.listData().data.indecies[entry.media.id].forEach(([listIndex, entryIndex]) => {
                                          res.data.lists[listIndex].entries.splice(entryIndex, 1);
                                        });
                                        return res;
                                      }, props.updateListInfo);
                                    }
                                  });
                                }}>
                                <Edit />
                              </QuickActionButton>
                              {/* <ul class="cp-media-card-quick-action-items"> */}
                              {/*   <li class="item" label="Edit media"> */}
                              {/*     <button onClick={e => { */}
                              {/*       e.preventDefault(); */}
                              {/*       openEditor({ ...entry.media, mediaListEntry: entry }, { */}
                              {/*         mutateMedia: responseEntry => { */}
                              {/*           props.mutateMediaListCache(res => { */}
                              {/*             function pushEntryToList(name, isCustomList) { */}
                              {/*               const listIndex = res.data.lists.findIndex(list => list.name === name && list.isCustomList === isCustomList); */}
                              {/*               if (listIndex === -1) { */}
                              {/*                 res.data.lists.push({ name, isCustomList: false, isCompletedList: false, entries: [] }); */}
                              {/*               } */}
                              {/**/}
                              {/*               const list = res.data.lists.at(listIndex); */}
                              {/*               list.entries.push(responseEntry); */}
                              {/*               props.listData().data.indecies[entry.media.id].push([listIndex === -1 ? res.data.lists.length - 1 : listIndex, list.entries.length - 1]); */}
                              {/*             } */}
                              {/**/}
                              {/*             props.listData().data.indecies[entry.media.id].forEach(([listIndex, entryIndex]) => { */}
                              {/*               res.data.lists[listIndex].entries.splice(entryIndex, 1); */}
                              {/*             }); */}
                              {/*             props.listData().data.indecies[entry.media.id] = []; */}
                              {/**/}
                              {/*             if (!responseEntry.hiddenFromStatusLists) { */}
                              {/*               const name = converStatusToListName(responseEntry.status, params.type); */}
                              {/*               pushEntryToList(name, false); */}
                              {/*             } */}
                              {/**/}
                              {/*             for (const [listName, enabled] of Object.entries(responseEntry.customLists ?? {})) { */}
                              {/*               if (enabled) { */}
                              {/*                 pushEntryToList(listName, true); */}
                              {/*               } */}
                              {/*             } */}
                              {/*             return res; */}
                              {/*           }, props.updateListInfo); */}
                              {/*         }, */}
                              {/*         deleteMedia: () => { */}
                              {/*           props.mutateMediaListCache(res => { */}
                              {/*             props.listData().data.indecies[entry.media.id].forEach(([listIndex, entryIndex]) => { */}
                              {/*               res.data.lists[listIndex].entries.splice(entryIndex, 1); */}
                              {/*             }); */}
                              {/*             return res; */}
                              {/*           }, props.updateListInfo); */}
                              {/*         } */}
                              {/*       }); */}
                              {/*     }}> */}
                              {/*       <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg> */}
                              {/*     </button> */}
                              {/*   </li> */}
                              {/* </ul> */}
                            </Show>
                          </div>
                        </A>
                      </Show>
                    </li>
                  ) }}</For>
              </ol>
            </Show>
          ) }}
        </For>
      </Show>
    </div>
  );
}

