import { Navigate, useLocation, useParams, useSearchParams } from "@solidjs/router";
import { batch, createEffect, createMemo, createSignal, on, onCleanup, Show, untrack } from "solid-js";
import "./UserMediaListIndex.scoped.css";
import { capitalize } from "@/utils/formatUtils.js";
import UserMediaListWorker from "@/workers/user-media-list.js?worker";
import { UserMediaListContext, useUser } from "@/state/providers.js";
import { debouncer } from "@/utils/scheduleUtils.js";
import { queries } from "@/api/api.js";
import { MediaListContainerScoped } from "./MediaListContainer.scoped.jsx";
import { SearchControlsScoped } from "./SearchControls.scoped.jsx";
import { EditModeBar } from "./EditModeBar.scoped.jsx";
import { createAnilistFetcher, fetcherToFetch, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { addApplicationNotification } from "@/state/notifications.js";
import { createTimer } from "@/hooks/createTimer.js";
import { formatMSToString } from "@/utils/timeUtils.js";
import { isTypeFunction } from "@/utils/functionUtils.js";
import { asserts, arrayUtils } from "@/utils/utils.js";
import { setFetcherValueToStorage } from "@/utils/storageUtils.js";
import { authUserData, globalEditedMedia, setUserMediaListAutoSave, storeGlobalEditedMedia, userMediaListAutoSave } from "@/state/globalState";
import { createCleanUpAbortController } from "@/utils/abortUtils";
import { COMBINED_LIST } from "@/constants/mediaLists.js";
import { scrollYBelowNavigation } from "@/utils/scrollUtils.js";

// Every entry is its own aliased mutation, so big saves are split into many requests
const SCORE_SAVE_BATCH_SIZE = 50;
const AUTO_SAVE_DELAY = 15_000;

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
      sessionCache: false,
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
    setFetcherValueToStorage(mutate, { sessionCache: false });
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
  // "All" list has the same entries as the other lists, so it is only shown when it is selected
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
  const startDateFilter = () => searchParams.startDate;
  const endDateFilter = () => searchParams.endDate;
  const scoreFilter = () => searchParams.score;
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
        startDate: startDateFilter(),
        endDate: endDateFilter(),
        score: scoreFilter(),
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

  const [editMode, setEditMode] = createSignal(false);
  const [selectedIds, setSelectedIds] = createSignal(new Set());
  // Unsaved scores by media id, shown on the cards until they are saved
  const [pendingScores, setPendingScores] = createSignal(new Map());
  const [scoresSaving, setScoresSaving] = createSignal(false);

  const changeEditMode = enabled => {
    if (!enabled && pendingScores().size && !confirm(`Discard ${pendingScores().size} unsaved score changes?`)) return;
    setEditMode(enabled);
    setSelectedIds(new Set());
    setPendingScores(new Map());
  };
  createEffect(on([name, () => params.type], () => {
    setEditMode(false);
    setSelectedIds(new Set());
    setPendingScores(new Map());
  }, { defer: true }));

  const savedScore = mediaId => {
    const [listIndex, entryIndex] = listData().data?.indecies[mediaId]?.[0] ?? [];
    return userMediaData()?.data.data.MediaListCollection.lists[listIndex]?.entries[entryIndex]?.score;
  };

  // Score shown in the score input, empty when the selected entries have different scores
  const selectedScore = createMemo(() => {
    let score;
    for (const mediaId of selectedIds()) {
      const entryScore = pendingScores().get(mediaId) ?? savedScore(mediaId);
      if (score === undefined) score = entryScore;
      else if (score !== entryScore) return "";
    }
    return score ?? "";
  });

  const changeSelectedScores = score => {
    setPendingScores(current => {
      const scores = new Map(current);
      for (const mediaId of selectedIds()) {
        if (savedScore(mediaId) === score) scores.delete(mediaId);
        else scores.set(mediaId, score);
      }
      return scores;
    });
  };

  const saveScores = async () => {
    if (scoresSaving() || !pendingScores().size) return;
    setScoresSaving(true);
    const savingFetcher = userMediaFetcher;
    const changes = [...pendingScores()];
    try {
      for (let i = 0; i < changes.length; i += SCORE_SAVE_BATCH_SIZE) {
        const batchChanges = changes.slice(i, i + SCORE_SAVE_BATCH_SIZE);
        const mutation = `mutation{${batchChanges.map(([mediaId, score]) => `m${mediaId}:SaveMediaListEntry(mediaId:${mediaId},score:${score}){mediaId score}`).join(" ")}}`;
        const res = await fetcherToFetch(createAnilistFetcher(mutation, {}, AbortSignal.timeout(30_000)));
        if (res?.status !== 200) {
          addApplicationNotification({ type: "error", message: "Failed to save the scores", duration: 30_000 });
          return;
        }

        const json = await res.json();
        // The user list could have changed while saving
        if (savingFetcher !== userMediaFetcher) return;

        batch(() => {
          mutateMediaListCache(cache => {
            for (const entry of Object.values(json.data ?? {})) {
              if (!entry) continue;
              for (const [listIndex, entryIndex] of listData().data.indecies[entry.mediaId] ?? []) {
                cache.data.data.MediaListCollection.lists[listIndex].entries[entryIndex].score = entry.score;
              }
              if (globalEditedMedia[entry.mediaId]) storeGlobalEditedMedia(entry.mediaId, "score", entry.score);
            }
            return cache;
          }, updateListInfo);

          setPendingScores(current => {
            const scores = new Map(current);
            // Scores that were changed again during the save stay unsaved
            for (const [mediaId, score] of batchChanges) {
              if (scores.get(mediaId) === score) scores.delete(mediaId);
            }
            return scores;
          });
        });
      }
    } finally {
      setScoresSaving(false);
    }
  };

  const autoSaveScores = debouncer(() => {
    if (userMediaListAutoSave()) saveScores();
  });
  createEffect(() => {
    if (userMediaListAutoSave() && pendingScores().size && !scoresSaving()) autoSaveScores(AUTO_SAVE_DELAY);
  });

  const warnUnsavedScores = e => {
    if (pendingScores().size) e.preventDefault();
  };
  window.addEventListener("beforeunload", warnUnsavedScores);
  onCleanup(() => window.removeEventListener("beforeunload", warnUnsavedScores));

  const [listBody, setListBody] = createSignal();

  // Skip the profile banner when landing on the page. Waits for the list, so the page is tall enough to scroll
  let scrolledToList = false;
  createEffect(() => {
    const target = listBody();
    if (scrolledToList || !target) return;
    scrolledToList = true;
    const targetY = scrollYBelowNavigation(target);
    if (window.scrollY < targetY) window.scrollTo(0, targetY);
  });

  return (
    <UserMediaListContext.Provider value={{ isOwnProfile }}>
      <Show when={params.list}>
        <Navigate href={legacyListUrl()} />
      </Show>
      <Show when={editMode()}>
        <EditModeBar
          selectedCount={selectedIds().size}
          unsavedCount={pendingScores().size}
          score={selectedScore()}
          scoreFormat={user().mediaListOptions.scoreFormat}
          saving={scoresSaving()}
          autoSave={userMediaListAutoSave()}
          onScoreChange={changeSelectedScores}
          onSave={saveScores}
          onAutoSaveChange={setUserMediaListAutoSave}
          onClearSelection={() => setSelectedIds(new Set())}
          onExit={() => changeEditMode(false)}
        />
      </Show>
      <div ref={setListBody} class="user-profile-media-list-body">
        <SearchControlsScoped
          listData={listData}
          scrollTarget={listBody()}
          setSearchParams={setSearchParams}
          list={listParam}
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
          startDateFilter={startDateFilter}
          endDateFilter={endDateFilter}
          scoreFilter={scoreFilter}
          sort={sort}
          userStatus={userStatus}
          studio={studio}
          tag={tag}
          editMode={editMode}
          setEditMode={changeEditMode}
        />
        <MediaListContainerScoped
          listData={listData}
          isListVisible={isListVisible}
          mutateMediaListCache={mutateMediaListCache}
          updateListInfo={updateListInfo}
          timer={formatMSToString(userMediaTime())}
          editMode={editMode()}
          selectedIds={selectedIds()}
          setSelectedIds={setSelectedIds}
          pendingScores={pendingScores()}
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

