import { Navigate, useLocation, useParams, useSearchParams } from "@solidjs/router";
import { batch, createEffect, createMemo, createRenderEffect, createSignal, ErrorBoundary, For, Match, onCleanup, Show, Switch, untrack } from "solid-js";
import { getDates } from "../../utils/dates";
import { queries } from "../../collections/collections";
import { createTimer, formatMSToString } from "../../utils/timeUtils";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils";
import { HorizontalCardRowScoped } from "../Browse/HorizontalCardRow.scoped";
import { VerticalCardRowScoped } from "../Browse/VerticalCardRow.scoped";
import { createStore, produce, reconcile, unwrap } from "solid-js/store";
import "./index(search2).scoped.css";
import { getFetcherValueFromStorage, setFetcherValueToStorage } from "../../utils/storageUtils";
import { AnilistMediaCard } from "../../components/Cards/Cards.scoped";
import { tabTime } from "../../core/globalState";
import { useParsedSearchParams } from "../../context/providers";
import { scheduleUtils } from "../../utils/utils";
import { assertThruthy } from "../../collections/asserts";
import { translateInternalSearchParams } from "../../core/apiTranslations";
import { concatMergeObjects } from "../../utils/objectUtils";
import { isTypeArray } from "../../utils/arrays";
import { capitalize } from "../../utils/formating";

function createAnilistMediaQueryVariables() {
  const parsedSearchParams = useParsedSearchParams();
  const params = useParams();
  const { api, type, mode } = params;

  if (mode === "browse") return null;

  const { q, isAdult = false, ...rest } = parsedSearchParams();

  const obj = {
    sort: [],
    search: q?.toLowerCase().trim() || undefined,
    type: type === "media" ? undefined : type.toUpperCase(),
    isAdult
  };

  console.log(rest);
  mergeVariables(api, "sort", obj, rest);
  mergeVariables(api, "endDateGreater", obj, rest);
  mergeVariables(api, "status", obj, rest);


  return obj;
}

function mergeVariables(api, key, to, from) {
  if (isTypeArray(from[key])) {
    from[key].forEach(value => mergeValue(api, key, to, value));
  } else {
    mergeValue(api, key, to, from[key]);
  }
}

function mergeValue(api, key, to, value) {
  let val;
  if (!(value in translateInternalSearchParams[key])) val = translateInternalSearchParams[key]._default?.(api, value);
  else val = translateInternalSearchParams[key][value]?.[api];

  concatMergeObjects(to, val);
}

const SEARCH_DEBOUNCE = 400;
const cachedResults = new Set();
const searchPageSizes = {} // keep that of how many elements url had, so when user navigates back in history, we can create the right amount of skeleton cards

export function SearchPage() {
  const params = useParams();
  const location = useLocation();
  const parsedSearchParams = useParsedSearchParams();

  const anilistVariables = createMemo(createAnilistMediaQueryVariables);
  const [page, setPage] = createSignal(1);
  const [error, setError] = createSignal();
  const [pagelessCacheLoading, setPagelessCacheLoading] = createSignal(false);
  const [previousHistoryDummyData, setPreviousHistoryDummyData] = createSignal();
  const [pagelessCacheData, setPagelessCacheData] = createStore({});
  const pagelessCacheKey = createMemo(() => pagelessCacheData?.cacheKey);

  let pagelessFetcher;
  createRenderEffect(async () => {
    const variables = anilistVariables();
    if (!variables) return;

    setPagelessCacheLoading(true);
    setPage(1);

    pagelessFetcher = createAnilistFetcher(queries.searchMedia, { ...variables, page: "pageless"});
    if (untrack(previousHistoryDummyData) === undefined) setPreviousHistoryDummyData(Array(searchPageSizes[pagelessFetcher.cacheKey] || 20).fill(null));
    let curKey = pagelessFetcher.cacheKey;
    const data = await getFetcherValueFromStorage(pagelessFetcher);

    if (curKey !== pagelessFetcher.cacheKey) return;

    // TODO: Make a function to check when we can use long time cache
    // For example when results are smaller than page size or when searching using years etc.
    if (data) setPagelessCacheData(reconcile(data));
    else {
      setPagelessCacheData(reconcile({
        data: Array(20).fill(null),
        name: "Anilist media pageless",
        // Keep cache for a week and on rare cases we will keep the cache for longer
        expires: new Date().setHours(24 * 7),
        modified: new Date(),
        cacheKey: pagelessFetcher.cacheKey
      }));
    }
  });

  const mutatePageless = (media, { currentPage, perPage, hasNextPage }, cacheKey) => {
    const key = untrack(pagelessCacheKey);
    if (key !== cacheKey) return

    const start = (currentPage - 1) * perPage;
    assertThruthy(start <= pagelessCacheData.data.length);

    media.forEach((m, i) => {
      if (m.id === pagelessCacheData.data[start + i]?.id) setPagelessCacheData("data", start + i, m); // fine grained update
      else setPagelessCacheData("data", produce(data => data[start + i] = m)); // Not fine grained (Replays the @starting-style animations)
    });

    if (!hasNextPage) setPagelessCacheData("data", produce(data => data.splice(start + media.length))); // Delete old and null elements
    else if (pagelessCacheData.data.at(-1) !== null) setPagelessCacheData("data", produce(data => data.push(...Array(4).fill(null)))); // Insert loading elements

    setFetcherValueToStorage(unwrap(pagelessCacheData));

    // This would be ideal, but splice does not do fine grained updating
    // setPagelessCacheData(produce(pageless => {
    //   const start = (currentPage - 1) * perPage;
    //
    //   assertThruthy(start <= pageless.data.length);
    //   pageless.data.splice(start, perPage, ...media);
    //
    //   if (!hasNextPage) pageless.data.splice(start + media.length); // Delete old and null elements
    //   else if (pageless.data.at(-1) !== null) pageless.data.push(...Array(4).fill(null)); // Insert loading elements
    //
    //   setFetcherValueToStorage(unwrap(pageless));
    // }));
  };

  const [anilistSearchTime, startAnilistSearchTimer, stopAnilistSearchTimer] = createTimer();
  const [anilistSearchLoading, setAnilistSearchLoading] = createSignal(false);
  const [anilistBrowseData, setAnilistBrowseData] = createStore({});
  let anilistSearchFetcher, anilistSearchController;
  let previousMode = null;
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
      const p = page();
      if (!variables) return;

      const key = pagelessCacheKey();
      var currentPagelessFetcher = createAnilistFetcher(queries.searchMedia, { ...variables, page: "pageless"});
      if (currentPagelessFetcher.cacheKey !== key) return; // Pageless fetcher might load slower, so cancel fetcher if pagelessCacheKey is missing/different

      anilistSearchFetcher = createAnilistFetcher(queries.searchMedia, { ...variables, page: p }, anilistSearchController.signal);
      console.log("vars", variables);
      if (previousMode === "search" && mode === "search") debounce = SEARCH_DEBOUNCE; // Don't debounce on first page load or when switching between browse and search headers
      if (cachedResults.has(anilistSearchFetcher.cacheKey)) debounce = 0; // We have already fetched this, so we don't need to debounce
    }

    setError(null);
    previousMode = mode;

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
          setPreviousHistoryDummyData(null); // This value is used only ones the page load, then its cleared
          setAnilistSearchLoading(false);
          stopAnilistSearchTimer(time);
        });
      },
      onError: async (response, { fetcher: f }) => {
        if (f.cacheKey !== anilistSearchFetcher.cacheKey || response?.status !== 400) return;
        try {
          var json = await response.json();
        } finally {
          setError(json || response); // Returns anilists own error list
        }
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
          if (cachedResults.has(res.cacheKey)) return;
          cachedResults.add(res.cacheKey);
          for (const media of res.data.data.Page.media) {
            // we don't want the debug enviroment to always fetchs, so we pretend like the data is always fresh
            media.tabTime = settings.debug ? tabTime : res.modified;
            // media.tabTime = res.modified;
          }

          mutatePageless(res.data.data.Page.media, res.data.data.Page.pageInfo, currentPagelessFetcher.cacheKey);
        }
      }
    });
  });

  const [visibleCardIndices, setVisibleCardIndices] = createStore([]);
  const intersectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      setVisibleCardIndices(entry.target.dataset.index, entry.isIntersecting);
    }
  }, { rootMargin: "800px" });

  let deltaScrollDistance = 0, prevScrollTop;
  const updatePage = scheduleUtils.debouncer(() => {
    const elems = document.querySelectorAll(".cp-media-card:is(.loading,.skeleton)");
    if (!elems.length) return;
    const index = +elems[elems.length - 1].dataset.index;
    const p = Math.floor(index / 50) + 1;
    setPage(p);
    setTimeout(handleScroll, 300);
  });
  const handleScroll = () => {

    // Disable card opacity and scale animations if scrolling fast, to make the interface keep up
    const currentPos = document.body.parentElement.scrollTop;
    if (prevScrollTop) {
      var delta = Math.abs(prevScrollTop - currentPos);
      deltaScrollDistance += delta;
      setTimeout(() => {
        deltaScrollDistance -= delta;
        document.querySelector(".search-page")?.classList.toggle("prevent-animation", deltaScrollDistance > 1000);
      }, 1000);
    }
    prevScrollTop = currentPos;

    // If user is scrolling too fast start to debounce setPage
    updatePage(deltaScrollDistance > 500 ? 300 : 0);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  onCleanup(() => {
    window.removeEventListener("scroll", handleScroll, { passive: true });
    intersectionObserver.disconnect();
    searchPageSizes[pagelessCacheData?.cacheKey] = pagelessCacheData?.data?.length || 0;
  });

  return (
    <ErrorBoundary fallback="Search page has crashed">
      <SearchBar />
      <Switch>
        <Match when={error()?.errors}>
          <h2>Bad request error: </h2>
          <For each={error().errors}>{({ message }) => (
            <p>{message}</p>
          )}</For>
        </Match>
        <Match when={error()}>
          <h2>Internal error</h2>
          <p>{error()}</p>
        </Match>
        {/* Data is type browse, so display all the fields */}
        <Match when={params.mode === "browse"}>
          <Show when={location.search || params.header}>
            <Navigate href={"/" + params.api + "/search/" + params.type + (params.header ? ("/" + params.header) : "") +  location.search} />
          </Show>
          <BrowsePage cards={anilistBrowseData} loading={anilistSearchLoading()} time={formatMSToString(anilistSearchTime())} />
        </Match>
        <Match when={params.mode === "search"}>
          <div class="search-page">
            <Switch>
              <Match when={params.header === "top" && parsedSearchParams().sort?.[0] === "score_desc"}>
                <h1>Top {capitalize(params.type)}</h1>
              </Match>
              <Match when={params.header === "top" && parsedSearchParams().sort?.[0] === "score_plus"}>
                <h1>Worst {capitalize(params.type)}</h1>
              </Match>
              <Match when={params.header === "trending" && parsedSearchParams().sort?.[0] === "trending_desc"}>
                <h1>Trending {capitalize(params.type)}</h1>
              </Match>
            </Switch>
            <ol class="cards">
              <For each={(!pagelessCacheLoading() && pagelessCacheData?.data) || previousHistoryDummyData()}>{(media, i) => {
                let ref;

                const handleRef = elem => {
                  if (ref) intersectionObserver.unobserve(ref);
                  ref = elem;
                  intersectionObserver.observe(elem);
                };

                onCleanup(() => intersectionObserver.unobserve(ref));

                return (
                  <Show when={visibleCardIndices[i()]} fallback={<li class="skeleton-card" data-index={i()} ref={handleRef} /> }>
                    <AnilistMediaCard data-index={i()} ref={handleRef} media={media} skeleton={!media} loading={media?.tabTime < tabTime} />
                  </Show>
                )
              }}</For>
            </ol>
          </div>
        </Match>
      </Switch>
    </ErrorBoundary>
  );
}

function BrowsePage(props) {
  const params = useParams();

  return (
    <div class="browse-page">
      <p class="time">{props.time}</p>
      <Switch>
        <Match when={params.type === "anime"}>
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.trending?.media} loading={props.loading} href="/ani/search/anime/trending" title="Trending now" />
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.season?.media} loading={props.loading} href="/ani/search/anime/this-season?order=popularity" title="Popular this season" />
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.nextSeason?.media} loading={props.loading} href="/ani/search/anime/next-season?order=popularity" title="Upcoming next season" />
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.finished?.media} loading={props.loading} href="/ani/search/anime/finished" title="Recently finished" />
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.popular?.media} loading={props.loading} href="/ani/search/anime/popular" title="All time popular" />
          <VerticalCardRowScoped data={props.cards?.season && props.cards?.top?.media} type="anime" href="/ani/search/anime/top" title="Top 100 anime" />
        </Match>
        <Match when={params.type === "manga"}>
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.trending?.media} loading={props.loading} href="/ani/search/manga/trending" title="Trending now" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.novel?.media} loading={props.loading} href="/ani/search/manga/novel" title="Popular light novels" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.manhwa?.media} loading={props.loading} href="/ani/search/manga/manhwa" title="Popular Manhwas" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.finishedManga?.media} loading={props.loading} href="/ani/search/manga/finished-manga" title="Recently finished mangas" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.finishedNovel?.media} loading={props.loading} href="/ani/search/manga/finished-novel" title="Recently finished light novels" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.popular?.media} loading={props.loading} href="/ani/search/manga/popular" title="All time popular" />
          <VerticalCardRowScoped data={props.cards?.novel && props.cards?.top?.media} type="manga" href="/ani/search/manga/top" title="Top 100 manga" />
        </Match>
        <Match when={params.type === "media"}>
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.trending?.media} loading={props.loading} href="/ani/search/media/trending" title="Trending anime and manga" />
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.newAnime?.media} loading={props.loading} href="/ani/search/anime/new" title="Newly added anime" />
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.newManga?.media} loading={props.loading} href="/ani/search/manga/new" title="Newly added manga" />
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.finishedAnime?.media} loading={props.loading} href="/ani/search/anime/finished" title="Recently finished anime" />
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.finishedManga?.media} loading={props.loading} href="/ani/search/manga/finished" title="Recently finished manga" />
          <VerticalCardRowScoped data={props.cards?.newAnime && props.cards?.top?.media} type="media" href="/ani/search/media/top" title="Top 100 anime and manga" />
        </Match>
      </Switch>
    </div>
  )
}

function SearchBar() {
  const parsedSearchParams = useParsedSearchParams();
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
      <input autofocus type="search" onInput={handleInput} value={parsedSearchParams().q}/>
    </div>
  );
}
