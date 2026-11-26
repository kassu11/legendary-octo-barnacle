import { useParams, useSearchParams } from "@solidjs/router";
import { useUser } from "@/state/providers";
import { createEffect, createMemo, createRenderEffect, createSignal, onCleanup, Show } from "solid-js";
import { createCleanUpAbortController } from "@/utils/abortUtils";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils";
import { queries } from "@/api/api";
import { capitalize  } from "@/utils/formatUtils";
import UserMediaRelationsWorker from "@/workers/user-media-relations.js?worker";
import { debounce } from "@solid-primitives/scheduled";
import "./UserRelationsIndex.scoped.css";
import { safeStringifyJson } from "@/utils/jsonUtils";
import { hashKeyFNV32 } from "@/utils/hashUtils";
import { createStore, reconcile } from "solid-js/store";
import { MediaCard } from "@/components/media/MediaCard.scoped";
import { MediaRowCard } from "@/components/media/MediaRowCard.scoped.jsx";
import { VirtualGrid } from "@/components/VirtualGrid.scoped.jsx";
import { VirtualList } from "@/components/VirtualList.scoped.jsx";
import { CardStyleToggle } from "@/components/search/CardStyleToggle.scoped.jsx";
import { setUserMediaListCardStyle, tabTime, userMediaListCardStyle } from "@/state/globalState";
import { arrayUtils } from "@/utils/utils.js";
import { RelationSearchControls } from "./RelationSearchControls.scoped.jsx";

const mediaIds = new Set();
const [store, setStore] = createStore({});

// Number of results by the filters, so going back in history renders as many skeleton cards and keeps the scroll position
const relationPageSizes = {}
export function UserRelations() {
  const { user } = useUser();
  const params = useParams();
  const name = createMemo(() => user().name?.toLowerCase());
  const [searchParams, _setSearchParams] = useSearchParams();
  const [previousHistoryDataCount, setPreviousHistoryDataCount] = createSignal();

  const [userRelationsLoading, setUserRelationsLoading] = createSignal(false);
  const [userRelationsData, setUserRelationsData] = createSignal(undefined, { equals: false });
  const [listData, setListData] = createStore({});
  const setListDataDebounced = debounce(setListData, 100);
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
      onStart: () => setUserRelationsLoading(true),
      onStop: () => setUserRelationsLoading(false),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== userRelationsFetcher.cacheKey) return;
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

  const setSearchParams = options => {
    _setSearchParams(options, { replace: true });
  };
  const multiParam = name => () => arrayUtils.wrapToArray(searchParams[name]).filter(Boolean);
  const search = () => decodeURIComponent(arrayUtils.wrapToArray(searchParams.q).at(-1) || "");
  const sortParam = multiParam("sort");
  const sort = () => sortParam().length ? sortParam() : ["averageScore"];
  const relationType = multiParam("relationType");
  const userStatus = multiParam("userStatus");
  const matchFormat = () => searchParams.matchFormat;
  const format = multiParam("format");
  const status = multiParam("status");
  const countryOfOrigin = multiParam("countryOfOrigin");
  const year = multiParam("year");
  const genre = multiParam("genre");
  const isAdult = () => searchParams.isAdult;

  let worker;
  const updateListInfo = () => {
    const postObject = {
      search: search(),
      sort: sort(),
      relationType: relationType(),
      userStatus: userStatus(),
      matchFormat: matchFormat(),
      format: format(),
      status: status(),
      countryOfOrigin: countryOfOrigin(),
      year: year(),
      genre: genre(),
      isAdult: isAdult(),
    };

    const key = hashKeyFNV32(safeStringifyJson(postObject) + userRelationsFetcher?.cacheKey);
    setPreviousHistoryDataCount(relationPageSizes[key]);

    if (!window.Worker) return;
    if (!userRelationsData()) return;

    worker = worker instanceof Worker ? worker : new UserMediaRelationsWorker();

    postObject.data = userRelationsData()?.data.data.MediaListCollection;

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

  const [relationsBody, setRelationsBody] = createSignal();
  const skeletons = createMemo(() => Array(previousHistoryDataCount() ?? 0).fill(null));
  const loading = media => listData.loading || !store[media.id]?.loaded;

  return (
    <div ref={setRelationsBody} class="relations">
      <RelationSearchControls
        scrollTarget={relationsBody()}
        setSearchParams={setSearchParams}
        sort={sort}
        relationType={relationType}
        userStatus={userStatus}
        matchFormat={matchFormat}
        format={format}
        status={status}
        countryOfOrigin={countryOfOrigin}
        year={year}
        genre={genre}
        isAdult={isAdult}
      />
      <section class="relations-content">
        <div class="list-header">
          <h2>Relations <Show when={listData.data}><span class="count">{listData.data.length}</span></Show></h2>
          <CardStyleToggle cardStyle={userMediaListCardStyle()} setCardStyle={setUserMediaListCardStyle} />
        </div>
        <Show when={listData.data} fallback={
          <Show when={userMediaListCardStyle() === "rows"} fallback={
            <VirtualGrid each={skeletons()}>{() => <MediaCard />}</VirtualGrid>
          }>
            <VirtualList each={skeletons()}>{() => <MediaRowCard />}</VirtualList>
          </Show>
        }>
          <Show when={userMediaListCardStyle() === "rows"} fallback={
            <VirtualGrid each={listData.data}>{media => (
              <MediaCard showScore showStatus quickActions hoverCard loading={loading(media)} media={store[media.id] ?? media} />
            )}</VirtualGrid>
          }>
            <VirtualList cacheKey={`relations-${name()}-${params.type}`} each={listData.data}>{media => (
              <MediaRowCard type={params.type} showStatus loading={loading(media)} media={store[media.id]} />
            )}</VirtualList>
          </Show>
        </Show>
      </section>
    </div>
  );
}
