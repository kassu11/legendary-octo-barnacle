import {useNavigate, useParams, useSearchParams} from "@solidjs/router";
import api, {IndexedDB} from "../../../utils/api.js";
import {createEffect, createSignal, on, onCleanup} from "solid-js";
import "./index(user-media-list).scoped.css";
import {capitalize} from "../../../utils/formating.js";
import UserMediaListWorker from "../../../worker/user-media-list.js?worker";
import {useAuthentication, UserMediaListContext, useUser} from "../../../context/providers.js";
import {leadingAndTrailingDebounce} from "../../../utils/scheduled.js";
import {asserts} from "../../../collections/collections.js";
import {MediaListContainerScoped} from "./MediaListContainer.scoped.jsx";
import {SearchControlsScoped} from "./SearchControls.scoped.jsx";

export const useListNavigation = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const params = useParams();

  return listName => {
    navigate(`/user/${user().name}/${params.type}${listName ? "/" + listName : ""}${location.search}`, { replace: true });
  }
}

export function UserMediaList() {
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
        <SearchControlsScoped
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
        <MediaListContainerScoped
          listData={listData}
          mutateMediaListCache={mutateMediaListCache}
          updateListInfo={updateListInfo}
        />
      </div>
    </UserMediaListContext.Provider>
  );
}

export function converStatusToListName(status, type) {
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

