import { Navigate, useLocation, useParams, useSearchParams } from "@solidjs/router";
import { batch, createEffect, createMemo, createRenderEffect, createSignal, For, Match, Show, Switch, untrack } from "solid-js";
import { getDates } from "../../utils/dates";
import { queries } from "../../collections/collections";
import { createTimer, formatMSToString } from "../../utils/timeUtils";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils";
import { HorizontalCardRowScoped } from "../Browse/HorizontalCardRow.scoped";
import { VerticalCardRowScoped } from "../Browse/VerticalCardRow.scoped";
import { createStore, produce, reconcile, unwrap } from "solid-js/store";
import "./index(search2).scoped.css";
import { searchParamsObject } from "../App/ParseSearchParams";
import { getFetcherValueFromStorage, setFetcherValueToStorage } from "../../utils/storageUtils";
import { assertThruthy } from "../../collections/asserts";
import { AnilistMediaCard } from "../../components/Cards/Cards.scoped";
import { tabTime } from "../../core/globalState";

function createAnilistMediaQueryVariables() {
  const params = useParams();
  const { type, mode } = params;

  if (mode === "browse") return null;

  const { q, isAdult = false} = searchParamsObject;

  return {
    search: q?.toLowerCase().trim() || undefined,
    type: type === "media" ? undefined : type.toUpperCase(),
    isAdult
  };
}

const SEARCH_DEBOUNCE = 400;
const cachedResults = new Set();

export function SearchPage() {
  const params = useParams();
  const location = useLocation();

  const anilistVariables = createMemo(createAnilistMediaQueryVariables);
  const [pagelessCacheLoading, setPagelessCacheLoading] = createSignal(false);
  const [pagelessCacheData, setPagelessCacheData] = createStore({});
  const pagelessCacheKey = createMemo(() => pagelessCacheData?.cacheKey);

  let pagelessFetcher;
  createRenderEffect(async () => {
    const variables = anilistVariables();
    if (!variables) return;

    setPagelessCacheLoading(true);

    pagelessFetcher = createAnilistFetcher(queries.searchMedia, { ...variables, page: "pageless"});
    let curKey = pagelessFetcher.cacheKey;
    const data = await getFetcherValueFromStorage(pagelessFetcher);

    if (curKey !== pagelessFetcher.cacheKey) return;

    // TODO: Make a function to check went we can use long time cache
    // For example when results are smaller than page size or when searching using years etc.
    if (data) setPagelessCacheData(reconcile(data));
    else {
      setPagelessCacheData(reconcile({
        data: null,
        name: "Anilist media pageless",
        // Keep cache for a week and on rare cases we will keep the cache for longer
        expires: new Date().setHours(24 * 7),
        modified: new Date(),
        cacheKey: pagelessFetcher.cacheKey
      }));
    }
  });

  const mutatePageless = (media, { currentPage, perPage }, cacheKey) => {
    const key = untrack(pagelessCacheKey);
    if (key !== cacheKey) return

    setPagelessCacheData(produce(pageless => {
      pageless.data ??= [];
      const start = (currentPage - 1) * perPage;

      assertThruthy(start <= pageless.data.length);
      pageless.data.splice(start, perPage, ...media);
      setFetcherValueToStorage(unwrap(pageless));
    }));
  };

  const [anilistSearchTime, startAnilistSearchTimer, stopAnilistSearchTimer] = createTimer();
  const [anilistSearchLoading, setAnilistSearchLoading] = createSignal(false);
  const [anilistBrowseData, setAnilistBrowseData] = createStore({});
  let anilistSearchFetcher, anilistSearchController;
  createEffect(() => {
    anilistSearchController?.abort();
    anilistSearchController = new AbortController();
    let debounce = 0;

    const { mode, type } = params;
    if (mode === "browse") {
      const dates = getDates();
      if (type === "anime") anilistSearchFetcher = createAnilistFetcher(queries.anilistBrowseAnime, { ...dates }, anilistSearchController.signal)
      else if (type === "manga") anilistSearchFetcher = createAnilistFetcher(queries.anilistBrowseManga, {}, anilistSearchController.signal);
      else if (type === "media") anilistSearchFetcher = createAnilistFetcher(queries.anilistBrowseMedia, {}, anilistSearchController.signal);
      else return;
    }

    else if (mode === "search") {
      const variables = anilistVariables();
      if (!variables) return;

      const key = pagelessCacheKey();
      var currentPagelessFetcher = createAnilistFetcher(queries.searchMedia, { ...variables, page: "pageless"});
      if (currentPagelessFetcher.cacheKey !== key) return; // Pageless fetcher might load slower, so cancel fetcher if pagelessCacheKey is missing/different

      if (anilistSearchFetcher) debounce = SEARCH_DEBOUNCE; // Don't debounce on first page load
      anilistSearchFetcher = createAnilistFetcher(queries.searchMedia, variables, anilistSearchController.signal);
      if (cachedResults.has(anilistSearchFetcher.cacheKey)) debounce = 0; // We have already fetched this, so we don't need to debounce
    }

    const expires = mode === "search" ? new Date().setHours(24 * 7) : undefined; // 1 week

    sendAnilistFetcher(anilistSearchFetcher, {
      name: "Anilist media search",
      delay: debounce,
      // debug: false,
      expires,
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey !== anilistSearchFetcher.cacheKey) return;
        anilistSearchController = null;
        if (mode === "search") setPagelessCacheLoading(false);
      },
      onStart: time => {
        batch(() => {
          setAnilistSearchLoading(true);
          startAnilistSearchTimer(time);
        });
      },
      onStop: time => {
        batch(() => {
          setAnilistSearchLoading(false);
          stopAnilistSearchTimer(time);
        });
      },
      setValue: (res, { fetcher: f, settings }) => {
        // TODO: There is a slight bug, where tabTime can be fooled, by using another tab
        // This updated the modified time inside cache, and simple tabTime check would seems like this data was fetched in this instant
        if (f.cacheKey !== anilistSearchFetcher.cacheKey) return;
        if (mode === "browse") {
          setAnilistBrowseData(reconcile(res.data.data));
        } else if (mode === "search") {
          if (currentPagelessFetcher.cacheKey === untrack(pagelessCacheKey)) setPagelessCacheLoading(false);
          // TODO: Make a function to check when we can use long time cache
          // For example when results are smaller than page size or when searching using years etc.
          // Now we will only allow fetches one time per tab
          if (res.modified < tabTime && !settings.debug) return;
          cachedResults.add(res.cacheKey);
          mutatePageless(res.data.data.Page.media, res.data.data.Page.pageInfo, currentPagelessFetcher.cacheKey);
        }
      }
    });
  });

  return (
    <>
      <SearchBar />
      <Switch>
        {/* Data is type browse, so display all the fields */}
        <Match when={params.mode === "browse"}>
          <Show when={location.search}>
            <Navigate href={"/search/" + params.type + location.search} />
          </Show>
          <BrowsePage cards={anilistBrowseData} loading={anilistSearchLoading()} time={formatMSToString(anilistSearchTime())} />
        </Match>
        <Match when={params.mode === "search"}>
          <div class="search-page">
            <ol class="cards">
              <For each={!pagelessCacheLoading() && (pagelessCacheData?.data || Array(20).fill(null))}>{media => (
                <AnilistMediaCard media={media} skeleton={!media} loading={anilistSearchLoading()} />
              )}</For>
            </ol>
          </div>
        </Match>
      </Switch>
    </>
  );
}

function BrowsePage(props) {
  const params = useParams();

  return (
    <div class="browse-page">
      <p class="time">{props.time}</p>
      <Switch>
        <Match when={params.type === "anime"}>
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.trending?.media} loading={props.loading} href="/search/anime/trending" title="Trending now" />
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.season?.media} loading={props.loading} href="/search/anime/this-season?order=popularity" title="Popular this season" />
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.nextSeason?.media} loading={props.loading} href="/search/anime/next-season?order=popularity" title="Upcoming next season" />
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.finished?.media} loading={props.loading} href="/search/anime/finished" title="Recently finished" />
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.popular?.media} loading={props.loading} href="/search/anime/popular" title="All time popular" />
          <VerticalCardRowScoped data={props.cards?.season && props.cards?.top?.media} type="anime" href="/search/anime/top-100" title="Top 100 anime" />
        </Match>
        <Match when={params.type === "manga"}>
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.trending?.media} loading={props.loading} href="/search/manga/trending" title="Trending now" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.novel?.media} loading={props.loading} href="/search/manga/novel" title="Popular light novels" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.manhwa?.media} loading={props.loading} href="/search/manga/manhwa" title="Popular Manhwas" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.finishedManga?.media} loading={props.loading} href="/search/manga/finished-manga" title="Recently finished mangas" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.finishedNovel?.media} loading={props.loading} href="/search/manga/finished-novel" title="Recently finished light novels" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.popular?.media} loading={props.loading} href="/search/manga/popular" title="All time popular" />
          <VerticalCardRowScoped data={props.cards?.novel && props.cards?.top?.media} type="manga" href="/search/manga/top-100" title="Top 100 manga" />
        </Match>
        <Match when={params.type === "media"}>
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.trending?.media} loading={props.loading} href="/search/media/trending" title="Trending anime and manga" />
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.newAnime?.media} loading={props.loading} href="/search/anime/new" title="Newly added anime" />
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.newManga?.media} loading={props.loading} href="/search/manga/new" title="Newly added manga" />
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.finishedAnime?.media} loading={props.loading} href="/search/anime/finished" title="Recently finished anime" />
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.finishedManga?.media} loading={props.loading} href="/search/manga/finished" title="Recently finished manga" />
          <VerticalCardRowScoped data={props.cards?.newAnime && props.cards?.top?.media} type="media" href="/search/media/top-100" title="Top 100 anime and manga" />
        </Match>
      </Switch>
    </div>
  )
}

function SearchBar() {
  const [, setSearchParams] = useSearchParams();

  let replace = false, timeout;
  const handleInput = e => {
    setSearchParams({ q: encodeURIComponent(e.target.value) || undefined }, { replace });
    replace = true;
    clearTimeout(timeout);
    timeout = setTimeout(() => replace = false, SEARCH_DEBOUNCE);
  };

  return (
    <div>
      <input autofocus type="search" onInput={handleInput} value={searchParamsObject.q}/>
    </div>
  );
}
