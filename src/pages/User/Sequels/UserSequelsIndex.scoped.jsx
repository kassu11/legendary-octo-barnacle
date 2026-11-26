import { useParams, useSearchParams } from "@solidjs/router";
import { useUser } from "@/state/providers";
import { createEffect, createMemo, createRenderEffect, createSignal, For, onCleanup, Show } from "solid-js";
import { createCleanUpAbortController } from "@/utils/abortUtils";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils";
import { queries } from "@/api/api";
import { capitalize  } from "@/utils/formatUtils";
import UserMediaSequelsWorker from "@/workers/user-media-sequels.js?worker";
import { debounce } from "@solid-primitives/scheduled";
import "./UserSequelsIndex.scoped.css";
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
import { ALL_RELATIONS, ANY_STATUS, PREQUEL_STATUS_DEFAULT, relationListOptions, SEQUEL_STATUS_DEFAULT, SequelSearchControls } from "./SequelSearchControls.scoped.jsx";

const mediaIds = new Set();
const [store, setStore] = createStore({});

// Number of results in each list by the filters, so going back in history renders as many skeleton cards and keeps the scroll position
const sequelPageSizes = {}
export function UserSequels() {
  const { user } = useUser();
  const params = useParams();
  const name = createMemo(() => user().name?.toLowerCase());
  const [searchParams, _setSearchParams] = useSearchParams();
  const [previousHistoryCounts, setPreviousHistoryCounts] = createSignal();

  const [userSequelsLoading, setUserSequelsLoading] = createSignal(false);
  const [userSequelsData, setUserSequelsData] = createSignal(undefined, { equals: false });
  const [listData, setListData] = createStore({});
  const setListDataDebounced = debounce(setListData, 100);
  const userSequelsController = createCleanUpAbortController();
  let userSequelsFetcher;
  createRenderEffect(() => {
    const signal = userSequelsController.abortAndRenew();

    const userName = name();
    const type = params.type.toUpperCase();

    if (!userName || !type) return;

    userSequelsFetcher = createAnilistFetcher(queries.anilistUserMediaRelations, { userName, type }, signal);

    sendAnilistFetcher(userSequelsFetcher, {
      name: "Anilist user sequels",
      // debug: false,
      onFetch: () => userSequelsController.disable(),
      onStart: () => setUserSequelsLoading(true),
      onStop: () => setUserSequelsLoading(false),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== userSequelsFetcher.cacheKey) return;
        setUserSequelsData(res);
        document.title = `${userName} ${capitalize(type)} sequels - LOB`;
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

    const data = listData.data?.[ALL_RELATIONS];
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
  const listParam = multiParam("list");
  const list = () => listParam().length ? listParam() : [ALL_RELATIONS];
  // Without the param the defaults are used, so ANY_STATUS is the only way to show every status
  const statusParam = (name, defaults) => {
    const param = multiParam(name);
    return () => {
      if (!param().length) return defaults;
      return param().includes(ANY_STATUS) ? [] : param();
    };
  };
  const sequelStatus = statusParam("sequelStatus", SEQUEL_STATUS_DEFAULT);
  const prequelStatus = statusParam("prequelStatus", PREQUEL_STATUS_DEFAULT);
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
      sequelStatus: sequelStatus(),
      prequelStatus: prequelStatus(),
      matchFormat: matchFormat(),
      format: format(),
      status: status(),
      countryOfOrigin: countryOfOrigin(),
      year: year(),
      genre: genre(),
      isAdult: isAdult(),
    };

    const key = hashKeyFNV32(safeStringifyJson(postObject) + userSequelsFetcher?.cacheKey);
    setPreviousHistoryCounts(sequelPageSizes[key]);

    if (!window.Worker) return;
    if (!userSequelsData()) return;

    worker = worker instanceof Worker ? worker : new UserMediaSequelsWorker();

    postObject.data = userSequelsData()?.data.data.MediaListCollection;

    worker.postMessage(postObject);
    worker.onmessage = ({ data }) => {
      sequelPageSizes[key] = Object.fromEntries(Object.entries(data).map(([id, media]) => [id, media.length]));
      const dataDiff = reconcile({ data, loading: userSequelsLoading() });
      listData.data ? setListDataDebounced(dataDiff) : setListData(dataDiff)
    };
  }

  createRenderEffect(updateListInfo);

  onCleanup(() => {
    if (worker instanceof Worker) worker.terminate();
  });

  const [sequelsBody, setSequelsBody] = createSignal();
  // Sequels are shown above prequels, no matter the order they were selected in
  const shownLists = createMemo(() => relationListOptions.filter(option => list().includes(option.id)));
  const skeletons = id => Array(previousHistoryCounts()?.[id] ?? 0).fill(null);
  const loading = media => listData.loading || !store[media.id]?.loaded;

  return (
    <div ref={setSequelsBody} class="sequels">
      <SequelSearchControls
        scrollTarget={sequelsBody()}
        setSearchParams={setSearchParams}
        sort={sort}
        list={list}
        listCount={id => listData.data?.[id]?.length}
        sequelStatus={sequelStatus}
        prequelStatus={prequelStatus}
        matchFormat={matchFormat}
        format={format}
        status={status}
        countryOfOrigin={countryOfOrigin}
        year={year}
        genre={genre}
        isAdult={isAdult}
      />
      <div class="sequels-content">
        <For each={shownLists()}>{(relationList, index) => (
          <section>
            <div class="list-header">
              <h2>{relationList.title} <Show when={listData.data}><span class="count">{listData.data[relationList.id].length}</span></Show></h2>
              <Show when={index() === 0}>
                <CardStyleToggle cardStyle={userMediaListCardStyle()} setCardStyle={setUserMediaListCardStyle} />
              </Show>
            </div>
            <Show when={listData.data} fallback={
              <Show when={userMediaListCardStyle() === "rows"} fallback={
                <VirtualGrid each={skeletons(relationList.id)}>{() => <MediaCard />}</VirtualGrid>
              }>
                <VirtualList each={skeletons(relationList.id)}>{() => <MediaRowCard />}</VirtualList>
              </Show>
            }>
              <Show when={userMediaListCardStyle() === "rows"} fallback={
                <VirtualGrid each={listData.data[relationList.id]}>{media => (
                  <MediaCard showScore showStatus quickActions hoverCard loading={loading(media)} media={store[media.id] ?? media} />
                )}</VirtualGrid>
              }>
                <VirtualList cacheKey={`sequels-${name()}-${params.type}-${relationList.id}`} each={listData.data[relationList.id]}>{media => (
                  <MediaRowCard type={params.type} showStatus loading={loading(media)} media={store[media.id]} />
                )}</VirtualList>
              </Show>
            </Show>
          </section>
        )}</For>
      </div>
    </div>
  );
}
