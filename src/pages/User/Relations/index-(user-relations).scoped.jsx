import { useParams, useSearchParams } from "@solidjs/router";
import { useParsedSearchParams, useUser } from "../../../context/providers";
import { createEffect, createMemo, createRenderEffect, createSignal, For, onCleanup, Show } from "solid-js";
import { createTimer, formatMSToString } from "../../../utils/timeUtils";
import { createCleanUpAbortController } from "../../../utils/abortUtils";
import { createAnilistFetcher, sendAnilistFetcher } from "../../../utils/fetcherUtils";
import { queries } from "../../../collections/collections";
import { capitalize  } from "../../../utils/formating";
import UserMediaRelationsWorker from "../../../worker/user-media-relations.js?worker";
import { debounce } from "@solid-primitives/scheduled";
import { AnilistMediaCard } from "../../../components/Cards/Cards.scoped";
import "./index-(user-relations).scoped.css";
import { safeStringifyJson } from "../../../utils/jsonUtils";
import { hashKeyFNV32 } from "../../../utils/hashUtils";
import { createStore, reconcile } from "solid-js/store";
import { MediaCard } from "./MediaCard.scoped";
import { tabTime } from "../../../core/globalState";
import { useIntersectionVisible } from "./useIntersectionVisible";

const mediaIds = new Set();
const [store, setStore] = createStore({});

// Keeps track of how many cards search results contained.
// This is used when we go back in history, so we can prerender the right amount of skeleton cards.
// This prevent the browser from scrolling back to the top of the page
const relationPageSizes = {}
export function UserRelations() {
  const { user } = useUser();
  const params = useParams();
  const name = createMemo(() => user().name?.toLowerCase());
  const parsedSearchParams = useParsedSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [previousHistoryDataCount, setPreviousHistoryDataCount] = createSignal();

  const [userRelationsTime, startUserRelationsTimer, stopUserRelationsTimer] = createTimer();
  const [userRelationsLoading, setUserRelationsLoading] = createSignal(false);
  const [userRelationsData, setUserRelationsData] = createSignal(undefined, { equals: false });
  const [listData, setListData] = createStore({});
  const setListDataDebounced = debounce(setListData, 300);
  const userRelationsController = createCleanUpAbortController();
  let userRelationsFetcher;
  createRenderEffect(() => {
    const signal = userRelationsController.abortAndRenew();

    const userName = name();
    const type = params.type.toUpperCase();

    if (!userName || !type) return;

    userRelationsFetcher = createAnilistFetcher(queries.anilistUserMediaRelations, { userName, type }, signal);

    sendAnilistFetcher(userRelationsFetcher, {
      name: "Anilist user media relations",
      // debug: false,
      onFetch: () => userRelationsController.disable(),
      onStart: t => {
        startUserRelationsTimer(t);
        setUserRelationsLoading(true);
      },
      onStop: t => {
        stopUserRelationsTimer(t);
        setUserRelationsLoading(false);
      },
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== userRelationsFetcher.cacheKey) return;
        // console.log(res);
        setUserRelationsData(res);
        document.title = `${userName} ${capitalize(type)} relations - LOB`;
      }
    });
  });

  const [mediaIdLoading, setMediaIdLoading] = createSignal(false);
  const mediaIdController = createCleanUpAbortController();
  let mediaIdFetcher;
  createEffect(() => {
    // Allow retriggering of the fetcher, untill all ids are fetched
    if (mediaIdLoading()) {
      return;
    }
    const signal = mediaIdController.abortAndRenew();

    const data = listData.data;
    if (!data?.length) return;

    const newIds = new Set();
    for (const entry of data) {
      if (mediaIds.has(entry.id)) continue;
      // Limit how many ids we send at one time to api
      if (newIds.size == 500) {
        break;
      }
      mediaIds.add(entry.id);
      newIds.add(entry.id);
    }

    if (newIds.size == 0) return;

    mediaIdFetcher = createAnilistFetcher(queries.anilistGetMediasWithIds(newIds.size), { id_in: [...newIds] }, signal);

    sendAnilistFetcher(mediaIdFetcher, {
      name: "Anilist mediaId",
      // debug: false,
      onStart: () => setMediaIdLoading(true),
      onStop: () => setMediaIdLoading(false),
      onFetch: () => mediaIdController.disable(),
      setValue: (res, { settings }) => {
        const ids = {};
        for (const entries of Object.values(res.data.data)) {
          for (const entry of entries.media) {
            ids[entry.id] = entry;
            entry.loaded = settings.debug ? true : res.modified >= tabTime;
          }
        }

        setStore(ids);
      }
    });
  });

  const preventZoomIn = new Set();
  let worker;
  const updateListInfo = () => {
    const postObject = {
      search: parsedSearchParams().q,
      matchFormat: searchParams.matchFormat === "true",
      allowCompleted: searchParams.allowCompleted === "true",
      allowDropped: searchParams.allowDropped === "true",
      allowPlanning: searchParams.allowPlanning === "true",
      allowCurrent: searchParams.allowCurrent === "true",
      allowPaused: searchParams.allowPaused === "true",
      allowNotYetReleased: searchParams.allowNotYetReleased === "true",
    };

    const key = hashKeyFNV32(safeStringifyJson(postObject) + userRelationsFetcher?.cacheKey);
    setPreviousHistoryDataCount(relationPageSizes[key]);

    if (!window.Worker) return;
    if (!userRelationsData()) return;

    worker = worker instanceof Worker ? worker : new UserMediaRelationsWorker();

    postObject.data = userRelationsData()?.data.data.MediaListCollection;

    // Animate all cards again
    preventZoomIn.clear();

    worker.postMessage(postObject);
    worker.onmessage = ({ data }) => {
      relationPageSizes[key] = data.length;
      const dataDiff = reconcile({ data, loading: userRelationsLoading() });
      listData.data ? setListDataDebounced(dataDiff) : setListData(dataDiff)
    };
  }

  createRenderEffect(updateListInfo);

  onCleanup(() => {
    if (worker instanceof Worker) worker.terminate();
  });

  const handleInput = e => {
    setSearchParams({ q: encodeURIComponent(e.target.value) || undefined, skipSortByMatch: undefined }, { replace: true });
  };


  const { isVisible, generateVisibilityRef } = useIntersectionVisible();
  return (
    <div class="relations">
      <p>{formatMSToString(userRelationsTime())}</p>
      <input type="search" onInput={handleInput} value={parsedSearchParams().q} />
      <br />
      <Checkbox label="Match Format" name="matchFormat" /><br />
      <Checkbox label="Allow Completed" name="allowCompleted" /><br />
      <Checkbox label="Allow Dropped" name="allowDropped" /><br />
      <Checkbox label="Allow Planning" name="allowPlanning" /><br />
      <Checkbox label="Allow Paused" name="allowPaused" /><br />
      <Checkbox label="Allow Watching/Reading" name="allowCurrent" /><br />
      <Checkbox label="Show not yeat released" name="allowNotYetReleased" /><br />

      <h1>Relations {listData.data?.length}</h1>
      <div class="grid" classList={{ "grid-loading": listData.loading }}>
        <For each={listData.data} fallback={<FallbackCardsTokeepScrollPosition />}>{media => {

          const handleVisibilityRef = generateVisibilityRef();

          return (
            <div class="wrapper" data-id={media.id} ref={handleVisibilityRef}>
              <Show when={isVisible[media.id]}>
                <MediaCard cardZoomIn={!preventZoomIn.has(media.id)} coverFadeIn={!preventZoomIn.has(media.id)} loading={listData.loading || !store[media.id]?.loaded} media={store[media.id] ?? media} />
                { /* Animate card zoom in once, per query. When you search or change filters, we will reanimate cards again */ }
                {preventZoomIn.add(media.id) && true} 
              </Show>
            </div>
          )
        }}</For>
      </div>
      <Show when={false}>
        <AnilistMediaCard />
      </Show>
    </div>
  );

  function FallbackCardsTokeepScrollPosition() {
    return (
      <For each={Array(previousHistoryDataCount())}>{() => (
        <div class="wrapper" />
      )}</For>
    );
  }

  function Checkbox(props) {
    return (
      <label>
        <input type="checkbox" name={props.name} id={props.name} checked={searchParams[props.name] === "true"} onChange={e => setSearchParams({ [props.name]: e.target.checked })} />
        {" "}{props.label}
      </label>
    );
  }
}


