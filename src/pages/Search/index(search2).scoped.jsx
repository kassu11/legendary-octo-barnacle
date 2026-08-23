import { A, Navigate, useLocation, useParams } from "@solidjs/router";
import { batch, createEffect, createMemo, createRenderEffect, createSignal, ErrorBoundary, For, Match, onCleanup, Show, Switch, untrack } from "solid-js";
import { getDates } from "../../utils/dates";
import { queries } from "../../collections/collections";
import { createTimer, formatMSToString, timeStringToMs } from "../../utils/timeUtils";
import { createAnilistFetcher, createJsonGetFetcher, sendAnilistFetcher, sendFetcher } from "../../utils/fetcherUtils";
import { createStore, produce, reconcile, unwrap } from "solid-js/store";
import "./index(search2).scoped.css";
import { getFetcherValueFromStorage, setFetcherValueToStorage } from "../../utils/storageUtils";
import { setSearchPageGroupSeasonalEntriesByFormat, tabTime } from "../../core/globalState";
import { useParsedSearchParams } from "../../context/providers";
import { assertThruthy } from "../../collections/asserts";
import { translateInternalSearchParams } from "../../core/apiTranslations";
import { concatMergeObjects } from "../../utils/objectUtils";
import { isTypeArray } from "../../utils/arrays";
import { capitalize, formatMediaFormat } from "../../utils/formating";
import { SearchBar } from "./SearchBar.scoped";
import { SeasonControls } from "./SeasonControls.scoped";
import { createCleanUpAbortController } from "../../utils/abortUtils";
import { useIntersectionVisible } from "../User/Relations/useIntersectionVisible";
import { MediaCard } from "../User/Relations/MediaCard.scoped";
import { debounce } from "@solid-primitives/scheduled";
import { useDataElement } from "./useDataElement";
import { BrowsePage } from "./BrowsePage.scoped";

const [anilistGenresAndTagsData, setAnilistGenresAndTagsData] = createSignal(undefined, { equals: false });

function createAnilistMediaQueryVariables() {
  const parsedSearchParams = useParsedSearchParams();
  const params = useParams();
  const { api, type, mode } = params;

  if (mode === "browse") return null;

  const { q, isAdult = false, year, rank, genres, tags, excludedGenres, sortBySearchMatch, ...rest } = parsedSearchParams();
  const tagsAndGenres = genres.union(tags);

  const obj = {
    sort: [],
    format: [],
    genres: [],
    tags: [],
    minimumTagRank: rank,
    excludedGenres: [...excludedGenres],
    search: q?.toLowerCase().trim() || undefined,
    type: type === "media" ? undefined : type.toUpperCase(),
    isAdult
  };

  if (sortBySearchMatch) mergeVariables(api, "sort", obj, { sort: ["search_match"] });
  else mergeVariables(api, "sort", obj, rest);

  if (failedToMergeGenresAndTags(tagsAndGenres, obj)) return null;

  mergeVariables(api, "endDateGreater", obj, rest);
  mergeVariables(api, "status", obj, rest);
  mergeVariables(api, "season", obj, rest);
  mergeVariables(api, "format", obj, rest);
  mergeVariables(api, "countryOfOrigin", obj, rest);
  mergeVariables(api, "onList", obj, rest);
  mergeVariables(api, "source", obj, rest);

  if (year) {
    if (obj.season) obj.seasonYear = year;
    else obj.year = year + "%";
  }

  for (const key in obj) {
    if (obj[key] === undefined || obj[key]?.length === 0) delete obj[key];
  }

  return obj;
}

function failedToMergeGenresAndTags(tagsAndGenres, obj) {
  const genresObject = tagsAndGenres.size ? anilistGenresAndTagsData() : null;
  for (const g of tagsAndGenres) {
    // Missing genres and tags list
    if (!genresObject) {
      return true;
    }

    if (genresObject.validGenres.has(g)) {
      obj.genres.push(g);
      continue;
    }
    if (genresObject.validTags.has(g)) {
      obj.tags.push(g);
      continue;
    }
  }
}

function createJikanMediaQueryVariables() {
  const parsedSearchParams = useParsedSearchParams();
  const params = useParams();
  const { type, mode } = params;

  if (mode === "browse" || type === "media") return null;

  const { q, sfw = true } = parsedSearchParams();

  const obj = {
    q: q?.toLowerCase().trim() || undefined,
    type,
    sfw,
  };

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

export const SEARCH_DEBOUNCE = 400;
const cachedResults = new Set();
// Keeps track of how many cards search results contained.
// This is used when we go back in history, so we can prerender the right amount of skeleton cards.
// This prevent the browser from scrolling back to the top of the page
const searchPageSizes = {};

const LOADER = 0;
// Sometimes anilist or jikan can return a page that has a next page, but the current page is not "full"
// The page can have 1 or 2 missing entries, and if these add up, they will make the index to page ratio broken
// In there cases, we add the padding media, to make sure every page is the full expected page size
// These elements are never to be rendered
const MEDIA_PADDING_SPACE = 1;

export function SearchPage() {
  const params = useParams();
  const location = useLocation();
  const parsedSearchParams = useParsedSearchParams();

  createEffect(() => {
    document.title = `${capitalize(params.type)} search - LOB`;
  });

  const anilistVariables = createMemo(createAnilistMediaQueryVariables);
  const jikanVariables = createMemo(createJikanMediaQueryVariables);
  const [page, setPage] = createSignal(1);
  const setDebouncePage = debounce(setPage, 300);
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

    pagelessFetcher = createAnilistFetcher(queries.searchMedia, { ...variables, page: "pageless3"});
    if (untrack(previousHistoryDummyData) === undefined) setPreviousHistoryDummyData(Array(searchPageSizes[pagelessFetcher.cacheKey] || 20).fill(LOADER));
    let curKey = pagelessFetcher.cacheKey;
    const data = await getFetcherValueFromStorage(pagelessFetcher);


    if (curKey !== pagelessFetcher.cacheKey) return;
    if (data?.data.fallback) fallbackPagelessCacheKey = curKey;

    preventZoomIn.clear();

    // TODO: Make a function to check when we can use long time cache
    // For example when results are smaller than page size or when searching using years etc.
    if (data) setPagelessCacheData(reconcile(data));
    else {
      setPagelessCacheData(reconcile({
        data: { perPage: null, media: Array(20).fill(LOADER) },
        name: "Anilist media pageless",
        // Keep cache for a week and on rare cases we will keep the cache for longer
        expires: new Date().setHours(24 * 7),
        modified: new Date(),
        cacheKey: pagelessFetcher.cacheKey
      }));
    }
  });

  const mutatePageless = (media, { currentPage, perPage, hasNextPage }, groupSeasonalEntriesByFormat, isFallbackSearch) => {
    const start = (currentPage - 1) * perPage;
    assertThruthy(start <= pagelessCacheData.data.media.length);
    assertThruthy(media.length <= perPage);

    media.forEach((m, i) => {
      m.customSection = groupSeasonalEntriesByFormat && pagelessCacheData.data.media[start + i - 1]?.format !== m.format ? m.format || "Unknown format" : false;
      if (m.id === pagelessCacheData.data.media[start + i]?.id) setPagelessCacheData("data", "media", start + i, m); // fine grained update
      else setPagelessCacheData("data", "media", produce(data => data[start + i] = m)); // Not fine grained (Replays the @starting-style animations)
    });

    if (hasNextPage && media.length < perPage) setPagelessCacheData("data", "media", { from: start + media.length, to: start + perPage }, MEDIA_PADDING_SPACE);

    if (!hasNextPage) setPagelessCacheData("data", "media", produce(data => data.splice(start + media.length))); // Delete old and null elements
    else if (pagelessCacheData.data.media.at(-1) != LOADER) setPagelessCacheData("data", "media", produce(data => data.push(...Array(4).fill(LOADER)))); // Insert loading elements

    setPagelessCacheData("data", "perPage", perPage);
    setPagelessCacheData("data", "fallback", isFallbackSearch);

    setFetcherValueToStorage(unwrap(pagelessCacheData));
  };

  // This is only used when the anilist search returns no values
  // At least currently in 2026 AniList search is quite bad and for example when searching "shoshimi" you get no results
  // Jikan will find "shoshimin" without problems, so if anilist does not give results try to search with jikan
  // and convert the results to anilist results
  function jikanFallbackSearch(variables, cacheKey, debounce) {
    const signal = fallbackSearchController.abortAndRenew();
    fallbackPagelessCacheKey = cacheKey;

    const jiFetcher = createJsonGetFetcher(queries.myAnimeListMediaSearch, variables, signal);
    sendFetcher(jiFetcher, {
      name: "Jikan fallback search",
      delay: debounce,
      // debug: false,
      onFetch: () => fallbackSearchController.disable(),
      setValue: (jikanRes) => {
        if (fallbackPagelessCacheKey !== cacheKey) return;
        const signal = fallbackSearchAnilistController.abortAndRenew();

        const pageInfo = jikanPagenationToPageInfo(jikanRes.data.pagination);
        if (!jikanRes.data.data.length) {
          mutatePageless([], pageInfo, false, true);
          return;
        }

        const idMal_in = jikanRes.data.data.map(media => media.mal_id);
        const aniFetcher = createAnilistFetcher(queries.anilistGetMediasWithIds(idMal_in.length), { idMal_in, type: variables.type.toUpperCase() }, signal);
        sendFetcher(aniFetcher, {
          name: "Anilist fallback search with mal ids",
          onFetch: () => fallbackSearchAnilistController.disable(),
          setValue: (aniRes, { settings }) => {
            if (fallbackPagelessCacheKey !== cacheKey) return;
            const key = untrack(pagelessCacheKey);
            if (key !== cacheKey) return

            const order = Object.fromEntries(idMal_in.map((v, i) => ([v, i])))
            aniRes.data.data.page1.media.sort((a, b) => order[a.idMal] - order[b.idMal]);

            if (aniRes.modified < tabTime && !settings.debug) return;
            if (cachedResults.has(jikanRes.cacheKey)) return;
            cachedResults.add(jikanRes.cacheKey);

            aniRes.data.data.page1.media.forEach(media => {
              // we don't want the debug enviroment to always fetchs, so we pretend like the data is always fresh
              media.tabTime = settings.debug ? tabTime : aniRes.modified;
              // media.tabTime = res.modified;
            });

            mutatePageless(aniRes.data.data.page1.media, pageInfo, false, true);
          }
        });
      }
    });
  }

  const [anilistSearchTime, startAnilistSearchTimer, stopAnilistSearchTimer] = createTimer();
  const [anilistSearchLoading, setAnilistSearchLoading] = createSignal(false);
  const [anilistBrowseData, setAnilistBrowseData] = createStore({});

  const anilistSearchController = createCleanUpAbortController();
  const fallbackSearchController = createCleanUpAbortController(anilistSearchController);
  const fallbackSearchAnilistController = createCleanUpAbortController(fallbackSearchController);
  let anilistSearchFetcher, fallbackPagelessCacheKey;
  let previousMode = null;
  createEffect(() => {
    const signal = anilistSearchController.abortAndRenew();
    let aniVariables, jiVariables;
    let debounce = SEARCH_DEBOUNCE, currentPage;

    const { mode, type } = params;
    const groupSeasonalEntriesByFormat = parsedSearchParams().groupSeasonalEntriesByFormat;
    if (mode === "browse") {
      const dates = getDates();
      if (type === "anime") anilistSearchFetcher = createAnilistFetcher(queries.anilistBrowseAnime, { ...dates }, signal)
      else if (type === "manga") anilistSearchFetcher = createAnilistFetcher(queries.anilistBrowseManga, {}, signal);
      else if (type === "media") anilistSearchFetcher = createAnilistFetcher(queries.anilistBrowseMedia, {}, signal);
      else return;
    }

    else if (mode === "search") {
      aniVariables = anilistVariables();
      jiVariables = jikanVariables();
      currentPage = page();
      if (!aniVariables) return;

      var key = pagelessCacheKey();
      var currentPagelessFetcher = createAnilistFetcher(queries.searchMedia, { ...aniVariables, page: "pageless3"});
      if (currentPagelessFetcher.cacheKey !== key) return; // Pageless fetcher might load slower, so cancel fetcher if pagelessCacheKey is missing/different

      anilistSearchFetcher = createAnilistFetcher(queries.searchMedia, { ...aniVariables, page: currentPage }, signal);
    }

    if (mode === "browse") debounce = 0; // We don't debounce browse page
    else if (previousMode === "browse" && aniVariables?.search?.length !== 1) debounce = 0; // We just jumped from browse to search, without typing to search bar
    else if (cachedResults.has(anilistSearchFetcher.cacheKey)) debounce = 0; // We have already fetched this, so we don't need to debounce

    console.log("vars", aniVariables);

    if (mode === "search" && fallbackPagelessCacheKey === key && currentPage > 1) {
      jikanFallbackSearch({ ...jiVariables, page: currentPage }, key, debounce);
      return
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
        anilistSearchController.disable()
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

          if (res.data.data.Page.media.length === 0 && currentPage === 1) {
            return jikanFallbackSearch({ ...jiVariables, page: 1 }, currentPagelessFetcher.cacheKey, 0);
          }
          // TODO: Make a function to check when we can use long time cache
          // For example when results are smaller than page size or when searching using years etc.
          // Now we will only allow fetches one time per tab
          if (res.modified < tabTime && !settings.debug) return;
          if (cachedResults.has(res.cacheKey)) return;
          cachedResults.add(res.cacheKey);

          const pageInfo = res.data.data.Page.pageInfo;
          res.data.data.Page.media.forEach(media => {
            // we don't want the debug enviroment to always fetchs, so we pretend like the data is always fresh
            media.tabTime = settings.debug ? tabTime : res.modified;
            // media.tabTime = res.modified;
          });

          const key = untrack(pagelessCacheKey);
          if (key !== currentPagelessFetcher.cacheKey) return
          mutatePageless(res.data.data.Page.media, pageInfo, groupSeasonalEntriesByFormat, false);
        }
      }
    });
  });

  const anilistGenresAndTagsController = createCleanUpAbortController();
  createRenderEffect(() => {
    anilistGenresAndTagsController.abortAndRenew();

    const anilistGenresAndTagsFetcher = createAnilistFetcher(queries.anilistGenresAndTags, {}, anilistGenresAndTagsController.signal);

    sendAnilistFetcher(anilistGenresAndTagsFetcher, {
      name: "Anilist genres",
      active: (res, settings) => {
        if (!res) return true;
        if (settings.debug) return false;
        // Only update genres and tags once a day
        return (tabTime - res.modified) > timeStringToMs("1d");
      },
      onFetch: () => anilistGenresAndTagsController.disable(),
      setValue: (res) => {
        const genreObject = {
          genres: res.data.data.genres,
          tags: res.data.data.tags,
          validGenres: new Set(res.data.data.genres.map(g => g.toLowerCase())),
          validTags: new Set(res.data.data.tags.map(t => t.name.toLowerCase())),
        };
        setAnilistGenresAndTagsData(genreObject);
      }
    });
  });

  const generateVisibilityRef = useIntersectionVisible();
  const [pageIndexKey, DataElement] = useDataElement();

  const { signal } = createCleanUpAbortController();
  let lastScolledElement, fetchPageTimeout;
  window.addEventListener("scroll", handleScroll, { signal, passive: true });

  onCleanup(() => {
    searchPageSizes[pagelessCacheData?.cacheKey] = pagelessCacheData?.data?.media.length || 0;
  });

  function handleScroll() {
    const perPage = pagelessCacheData?.data?.perPage;
    if (!perPage) return;
    const targets = document.querySelectorAll(".fetch-trigger");

    if (!targets.length) return;
    if (lastScolledElement == targets[targets.length - 1]) {
      clearTimeout(fetchPageTimeout);
      fetchPageTimeout = setTimeout(handleScroll, 500);
      return;
    }
    lastScolledElement = targets[targets.length - 1];
    const index = lastScolledElement[pageIndexKey]();

    const page = Math.floor(index / perPage) + 1;
    // After the debounce retrigger page fetch, this should stop when no fetch triggers are left
    setDebouncePage(() => {
      handleScroll();
      return page;
    });
  }

  const preventZoomIn = new Set();

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
              <Match when={params.header === "popular" && parsedSearchParams().sort?.[0] === "popularity_desc"}>
                <h1>All Time Popular {capitalize(params.type)}</h1>
              </Match>
              <Match when={params.header === "trending" && parsedSearchParams().sort?.[0] === "trending_desc"}>
                <h1>Trending {capitalize(params.type)}</h1>
              </Match>
              <Match when={params.header === "finished" && parsedSearchParams().status?.includes("complete")}>
                <h1>Recently Finished {capitalize(params.type)}</h1>
              </Match>
              <Match when={params.header === "novel" && parsedSearchParams().sort?.[0] === "popularity_desc" && parsedSearchParams().format?.includes("light_novel")}>
                <h1>All Time Popular Light Novels</h1>
              </Match>
              <Match when={params.header === "manhwa" && parsedSearchParams().sort?.[0] === "popularity_desc" && parsedSearchParams().countryOfOrigin === "KR" }>
                <h1>All Time Popular Manhwa</h1>
              </Match>
              <Match when={params.header === "finished-manga" && parsedSearchParams().sort?.[0] === "end_date_desc" && parsedSearchParams().status?.includes("complete") &&  parsedSearchParams().format?.includes("manga")}>
                <h1>Recently Finished Mangas</h1>
              </Match>
              <Match when={params.header === "finished-novel" && parsedSearchParams().sort?.[0] === "end_date_desc" && parsedSearchParams().status?.includes("complete") &&  parsedSearchParams().format?.includes("light_novel")}>
                <h1>Recently Finished Light Novels</h1>
              </Match>
              <Match when={params.header === "new" && parsedSearchParams().sort?.[0] === "id_desc"}>
                <h1>Newly Added {capitalize(params.type)}</h1>
              </Match>
              <Match when={/winter|spring|summer|fall|this-season|next-season|tba/.test(params.header)}>
                <Switch>
                  <Match when={parsedSearchParams().season === null}>
                    <h1>TBA Anime</h1>
                  </Match>
                  <Match when={parsedSearchParams().season}>
                    <h1>{capitalize(parsedSearchParams().season)} {parsedSearchParams().year} Anime</h1>
                  </Match>
                </Switch>

                <A href="/ani/search/anime/this-season">Current</A>
                <A href="/ani/search/anime/next-season">Next</A>
                <A href="/ani/search/anime/tba">TBA</A>

                <SeasonControls />

                <Show when={parsedSearchParams().groupSeasonalEntriesByFormat != undefined}>
                  <button onClick={() => setSearchPageGroupSeasonalEntriesByFormat(v => !v)}>Group by Format</button>
                </Show>

              </Match>
            </Switch>

            <div class="cards">
              <For each={(!pagelessCacheLoading() && pagelessCacheData?.data?.media) || previousHistoryDummyData()}>{(media, i) => {

                const [handleVisibilityRef, isVisible] = generateVisibilityRef();

                return (
                  <Show when={media != MEDIA_PADDING_SPACE}>
                    <Show when={media?.customSection}>
                      <h2>{formatMediaFormat(media.customSection)}</h2>
                    </Show>
                    <div class="wrapper" ref={handleVisibilityRef}>
                      <Show when={isVisible()}>
                        <MediaCard scoped className="search-card" cardZoomIn={!preventZoomIn.has(media.id)} coverFadeIn={!preventZoomIn.has(media.id)} loading={media?.tabTime < tabTime} media={media} />
                        { /* Animate card zoom in once, per query. When you search or change filters, we will reanimate cards again */}
                        {preventZoomIn.add(media.id) && true}
                        <Show when={(media?.tabTime < tabTime || media === LOADER)}>
                          <DataElement class="fetch-trigger" data={i} />
                        </Show>
                      </Show>
                    </div>
                  </Show>
                )
              }}</For>
            </div>

          </div>
        </Match>
      </Switch>
    </ErrorBoundary>
  );
}

function jikanPagenationToPageInfo(pagination) {
  const { current_page, has_next_page, items: { per_page } } = pagination;
  return { currentPage: current_page, hasNextPage: has_next_page, perPage: per_page };
}

