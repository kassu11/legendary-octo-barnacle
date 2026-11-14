import { Navigate, useLocation, useParams, useSearchParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, onCleanup, Show, untrack } from "solid-js";
import "./UserMediaListIndex.scoped.css";
import { capitalize } from "@/utils/formatUtils.js";
import UserMediaListWorker from "@/workers/user-media-list.js?worker";
import { UserMediaListContext, useUser } from "@/state/providers.js";
import { debouncer } from "@/utils/scheduleUtils.js";
import { queries } from "@/api/api.js";
import { MediaListContainerScoped } from "./MediaListContainer.scoped.jsx";
import { SearchControlsScoped } from "./SearchControls.scoped.jsx";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { createTimer } from "@/hooks/createTimer.js";
import { formatMSToString } from "@/utils/timeUtils.js";
import { isTypeFunction } from "@/utils/functionUtils.js";
import { asserts, arrayUtils } from "@/utils/utils.js";
import { setFetcherValueToStorage } from "@/utils/storageUtils.js";
import { authUserData } from "@/state/globalState";
import { createCleanUpAbortController } from "@/utils/abortUtils";
import { ALL_LISTS, COMBINED_LIST } from "@/constants/mediaLists.js";

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
  const search = () => decodeURIComponent(arrayUtils.wrapToArray(searchParams.q).at(-1) || "");
  const listParam = multiParam("list");
  const list = () => listParam().length ? listParam() : [ALL_LISTS];
  // Combined list has the same entries as the other lists, so it is only shown when it is selected
  const isListVisible = name => listParam().length ? listParam().includes(name) : name !== COMBINED_LIST;
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
    <UserMediaListContext.Provider value={{ isOwnProfile }}>
      <Show when={params.list}>
        <Navigate href={legacyListUrl()} />
      </Show>
      <div ref={elem => listBody = elem} class="user-profile-media-list-body">
        <SearchControlsScoped
          listData={listData}
          listStartY={listStartY}
          setSearchParams={setSearchParams}
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

