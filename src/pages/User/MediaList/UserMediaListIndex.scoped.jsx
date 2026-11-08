import { Navigate, useLocation, useParams, useSearchParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, onCleanup, Show, untrack } from "solid-js";
import "./UserMediaListIndex.scoped.css";
import { capitalize } from "@/utils/formatUtils.js";
import UserMediaListWorker from "@/workers/user-media-list.js?worker";
import { UserMediaListContext, useUser } from "@/state/providers.js";
import { debouncer, leadingAndTrailingDebounce } from "@/utils/scheduleUtils.js";
import { queries } from "@/api/api.js";
import { MediaListContainerScoped } from "./MediaListContainer.scoped.jsx";
import { SearchControlsScoped } from "./SearchControls.scoped.jsx";
import { createAnilistFetcher, fetcherToFetch, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { createTimer } from "@/hooks/createTimer.js";
import { formatMSToString } from "@/utils/timeUtils.js";
import { isTypeFunction } from "@/utils/functionUtils.js";
import { asserts, arrayUtils } from "@/utils/utils.js";
import { setFetcherValueToStorage } from "@/utils/storageUtils.js";
import { addApplicationNotification } from "@/state/notifications";
import { authUserData } from "@/state/globalState";
import { createCleanUpAbortController } from "@/utils/abortUtils";
import { mergeObjects } from "@/utils/objectUtils.js";

// Value of the "All" row in the list filter. Lists can have any name, but they can't be empty
export const ALL_LISTS = "";

export function UserMediaList() {
  const { user } = useUser();
  const params = useParams();
  const location = useLocation();
  const name = createMemo(() => user().name);
  const [userMediaTime, startUserMediaTimer, stopUserMediaTimer] = createTimer();
  const [userMediaData, setUserMediaData] = createSignal(undefined, { equals: false });
  const userMediaController = createCleanUpAbortController();
  let userMediaFetcher;
  createEffect(() => {
    const signal = userMediaController.abortAndRenew();

    const userName = name();
    const type = params.type.toUpperCase();

    if (!userName || !type) return;

    userMediaFetcher = createAnilistFetcher(queries.anilistUserMediaList, { userName, type }, signal);

    sendAnilistFetcher(userMediaFetcher, {
      name: "Anilist user media page",
      onFetch: () => userMediaController.disable(),
      onStart: startUserMediaTimer,
      onStop: stopUserMediaTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== userMediaFetcher.cacheKey) return;
        setUserMediaData(res);
        document.title = `${userName} ${capitalize(type)} - LOB`;
      }
    });
  });

  const mutateMediaListCache = (mutate, afterCallBack) => {
    if (isTypeFunction(mutate)) mutate = mutate(untrack(userMediaData));
    setFetcherValueToStorage(mutate);
    afterCallBack?.();
  }

  const [searchParams, _setSearchParams] = useSearchParams();
  const [listData, setListData] = createSignal({});
  let worker;

  const setSearchParams = (options) => {
    _setSearchParams(options, { replace: true });
  }
  const multiParam = name => () => arrayUtils.wrapToArray(searchParams[name]).filter(Boolean);
  const search = () => searchParams.search || "";
  const listParam = multiParam("list");
  const list = () => listParam().length ? listParam() : [ALL_LISTS];
  const isListVisible = name => !listParam().length || listParam().includes(name);
  // Old links have the list name in the path
  const legacyListUrl = () => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.append("list", decodeURIComponent(params.list));
    return `/user/${name()}/${params.type}/list?${newSearchParams}`;
  };
  const format = multiParam("format");
  const status = multiParam("status");
  const genre = multiParam("genre");
  const countryOfOrigin = multiParam("countryOfOrigin");
  const isAdult = () => searchParams.isAdult;
  const year = multiParam("year");
  const startedYear = multiParam("startedYear");
  const completedYear = multiParam("completedYear");
  const privateFilter = () => searchParams.private;
  const notesFilter = () => searchParams.notes;
  const rewatchedFilter = () => searchParams.repeat;
  const missingStartFilter = () => searchParams.missingStart;
  const missingEndFilter = () => searchParams.missingEnd;
  const missingScoreFilter = () => searchParams.missingScore;
  const sortParam = multiParam("sort");
  const sort = () => sortParam().length ? sortParam() : ["score"];
  const userStatus = multiParam("userStatus");
  const studio = multiParam("studio");
  const tag = multiParam("tag");

  const triggerProgressIncrease = leadingAndTrailingDebounce(async (mediaId, newProgress, progressKey) => {
    asserts.assertTruthy(progressKey, "Progress key is undefined");
    const fetcher = createAnilistFetcher(queries.anilistMutateMedia, { mediaId, [progressKey]: newProgress }, AbortSignal.timeout(30_000));
    const res = await fetcherToFetch(fetcher);
    if (res.status !== 200) {
      addApplicationNotification({ type: "error", message: "Failed to save media changes", duration: 30_000 });
      return;
    }

    const json = await res.json();

    mutateMediaListCache(res => {
      // Mutation response only has a subset of the media fields (no studios, tags, genres...), so merge it into the cached entry
      const [cachedListIndex, cachedEntryIndex] = listData().data.indecies[mediaId][0];
      const cachedEntry = res.data.data.MediaListCollection.lists[cachedListIndex].entries[cachedEntryIndex];
      const responseEntry = mergeObjects(cachedEntry, json.data.SaveMediaListEntry);

      function pushEntryToList(name, isCustomList) {
        const listIndex = res.data.data.MediaListCollection.lists.findIndex(list => list.name === name && list.isCustomList === isCustomList);
        if (listIndex === -1) {
          res.data.data.MediaListCollection.lists.push({ name, isCustomList: false, isCompletedList: false, entries: [] });
        }

        const list = res.data.data.MediaListCollection.lists.at(listIndex);
        list.entries.push(responseEntry);
        listData().data.indecies[mediaId].push([listIndex === -1 ? res.data.data.MediaListCollection.lists.length - 1 : listIndex, list.entries.length - 1]);
      }

      listData().data.indecies[mediaId].forEach(([listIndex, entryIndex]) => {
        res.data.data.MediaListCollection.lists[listIndex].entries.splice(entryIndex, 1);
      });
      listData().data.indecies[mediaId] = [];

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
    });
  }, 250, 2);

  const postToWorker = debouncer(postObject => {
    worker = worker instanceof Worker ? worker : new UserMediaListWorker();
    worker.postMessage(postObject);
    worker.onmessage = setListData;
  });

  const updateListInfo = () => {
    if (window.Worker && userMediaData()) {
      const postObject = {
        data: userMediaData()?.data.data.MediaListCollection,
        search: search(),
        format: format(),
        status: status(),
        genre: genre(),
        countryOfOrigin: countryOfOrigin(),
        missingStart: missingStartFilter(),
        missingEnd: missingEndFilter(),
        missingScore: missingScoreFilter(),
        isAdult: isAdult(),
        year: year(),
        startedYear: startedYear(),
        completedYear: completedYear(),
        private: privateFilter(),
        notes: notesFilter(),
        repeat: rewatchedFilter(),
        sort: sort(),
        studio: studio(),
        type: params.type,
        userStatus: userStatus(),
        tag: tag(),
      };

      postToWorker(100, postObject);
    }
  }

  createEffect(updateListInfo);

  onCleanup(() => {
    if (worker instanceof Worker) worker.terminate();
  });

  function isOwnProfile() {
    return user().id === authUserData()?.data.id;
  }

  let listBody;
  // Scroll position that puts the start of the list right below the sticky main navigation
  const listStartY = () => listBody.getBoundingClientRect().top + window.scrollY - document.querySelector(".main-navigation").offsetHeight;

  return (
    <UserMediaListContext.Provider value={{ triggerProgressIncrease, isOwnProfile }}>
      <Show when={params.list}>
        <Navigate href={legacyListUrl()} />
      </Show>
      <div ref={elem => listBody = elem} class="user-profile-media-list-body">
        <SearchControlsScoped
          listData={listData}
          listStartY={listStartY}
          setSearchParams={setSearchParams}
          search={search}
          list={list}
          format={format}
          status={status}
          genre={genre}
          countryOfOrigin={countryOfOrigin}
          isAdult={isAdult}
          year={year}
          startedYear={startedYear}
          completedYear={completedYear}
          privateFilter={privateFilter}
          notesFilter={notesFilter}
          rewatchedFilter={rewatchedFilter}
          missingStartFilter={missingStartFilter}
          missingEndFilter={missingEndFilter}
          missingScoreFilter={missingScoreFilter}
          sort={sort}
          userStatus={userStatus}
          studio={studio}
          tag={tag}
        />
        <MediaListContainerScoped
          listData={listData}
          isListVisible={isListVisible}
          mutateMediaListCache={mutateMediaListCache}
          updateListInfo={updateListInfo}
          timer={formatMSToString(userMediaTime())}
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
      asserts.throwAssert("Unkown status: " + status);
  }
}

