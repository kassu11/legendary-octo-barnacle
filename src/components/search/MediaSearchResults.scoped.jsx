import { createEffect, createMemo, createRenderEffect, createSignal, For, Match, onCleanup, Show, Switch, untrack } from "solid-js";
import { createStore, produce, reconcile, unwrap } from "solid-js/store";
import { debounce } from "@solid-primitives/scheduled";
import "./MediaSearchResults.scoped.css";
import { queries } from "@/api/api";
import { createAnilistFetcher, createJsonGetFetcher, sendAnilistFetcher, sendFetcher } from "@/api/fetcherUtils";
import { getFetcherValueFromStorage, setFetcherValueToStorage } from "@/utils/storageUtils";
import { searchPageCardStyle, tabTime } from "@/state/globalState";
import { useParsedSearchParams } from "@/state/providers";
import { assertTruthy } from "@/utils/asserts";
import { createCleanUpAbortController } from "@/utils/abortUtils";
import { MediaCard } from "@/components/media/MediaCard.scoped";
import { MediaRowCard } from "@/components/media/MediaRowCard.scoped";
import { VirtualGrid } from "@/components/VirtualGrid.scoped";
import { VirtualList } from "@/components/VirtualList.scoped";
import { MEDIA_GROUPS } from "./mediaGroups";

const cachedResults = new Set();
// Keeps track of the cards and group headers the search results contained.
// This is used when we go back in history, so we can prerender the right amount of skeleton cards under the right headers.
// This prevent the browser from scrolling back to the top of the page, or to a wrong position
const searchPageLayouts = {};

const LOADER = 0;
// Sometimes anilist or jikan can return a page that has a next page, but the current page is not "full"
// The page can have 1 or 2 missing entries, and if these add up, they will make the index to page ratio broken
// In there cases, we add the padding media, to make sure every page is the full expected page size
// These elements are never to be rendered
const MEDIA_PADDING_SPACE = 1;
// Only high to low orders are ranked, because a "#1" on the lowest scored media would read as the best one
const RANKED_SORTS = new Set(["popularity_desc", "score_desc", "score_desc_plus"]);

/**
 * Infinitely scrolling AniList media search results, cached as one pageless list
 * @param {object} props
 * @param {object} props.variables AniList search variables, null while they are not ready
 * @param {object} [props.jikanVariables] Jikan search variables, used to search with jikan when AniList finds nothing
 * @param {string} props.type Media type of the row cards
 * @param {boolean} [props.ranked] Show ranks on the cards, when the sort is a high to low order
 * @param {boolean} [props.debounceInitialFetch] Debounce also the first fetch, for example when the user is still typing
 * @param {Map<number, Object>} [props.characterRoles] Character media edges by the media id, shows the character role and voice actors on the cards
 * @param {string[]} [props.voiceActorLanguages] Languages of the voice actors shown with the character roles
 * @param {Map<number, Object>} [props.staffRoles] Roles of a staff member by the media id, shows the voiced characters and staff roles on the cards
 */
export function MediaSearchResults(props) {
  const parsedSearchParams = useParsedSearchParams();

  const anilistVariables = () => props.variables;
  const [page, setPage] = createSignal(1);
  const setDebouncePage = debounce(setPage, 300);
  const [error, setError] = createSignal();
  const [pagelessCacheLoading, setPagelessCacheLoading] = createSignal(false);
  const [previousHistoryDummyData, setPreviousHistoryDummyData] = createSignal();
  const [pagelessCacheData, setPagelessCacheData] = createStore({});
  const pagelessCacheKey = createMemo(() => pagelessCacheData?.cacheKey);
  // Pageless data is loaded asynchronously, so this key is known before it, already on the first render.
  // Row lists use it to keep their item heights, so their height is right when navigating back
  const rowListCacheKey = createMemo(() => anilistVariables() && createAnilistFetcher(queries.searchMedia, { ...anilistVariables(), page: "pageless3" }).cacheKey);

  let highestPageMutated = 0;
  let pagelessFetcher;
  createRenderEffect(async () => {
    const variables = anilistVariables();
    if (!variables) return;

    setPagelessCacheLoading(true);
    setPage(1);

    pagelessFetcher = createAnilistFetcher(queries.searchMedia, { ...variables, page: "pageless3"});
    if (untrack(previousHistoryDummyData) === undefined) setPreviousHistoryDummyData(searchPageLayouts[pagelessFetcher.cacheKey] || { media: Array(20).fill(LOADER), sectionTitles: {} });
    let curKey = pagelessFetcher.cacheKey;
    const data = await getFetcherValueFromStorage(pagelessFetcher);


    if (curKey !== pagelessFetcher.cacheKey) return;
    if (data?.data.fallback) fallbackPagelessCacheKey = curKey;

    preventZoomIn.clear();

    // TODO: Make a function to check when we can use long time cache
    // For example when results are smaller than page size or when searching using years etc.
    highestPageMutated = 0;
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

  const mutatePageless = (media, { currentPage, perPage, hasNextPage }, isFallbackSearch) => {
    const start = (currentPage - 1) * perPage;
    assertTruthy(start <= pagelessCacheData.data.media.length);
    assertTruthy(media.length <= perPage);

    media.forEach((m, i) => {
      if (m.id === pagelessCacheData.data.media[start + i]?.id) setPagelessCacheData("data", "media", start + i, m); // fine grained update
      else setPagelessCacheData("data", "media", produce(data => data[start + i] = m)); // Not fine grained (Replays the @starting-style animations)
    });

    if (hasNextPage && media.length < perPage) setPagelessCacheData("data", "media", { from: start + media.length, to: start + perPage }, MEDIA_PADDING_SPACE);

    if (!hasNextPage) setPagelessCacheData("data", "media", produce(data => data.splice(start + media.length))); // Delete old and null elements
    else if (currentPage > highestPageMutated && pagelessCacheData.data.media.at(-1) != LOADER) setPagelessCacheData("data", "media", produce(data => data.push(...Array(4).fill(LOADER)))); // Insert loading elements

    setPagelessCacheData("data", "perPage", perPage);
    setPagelessCacheData("data", "fallback", isFallbackSearch);

    setFetcherValueToStorage(unwrap(pagelessCacheData));

    // This is dump, but anilist will sometimes say we have another page, when we don't. In these very specific and rare cases, the user can first fetch page 3
    // page 3 return 0 data, and tells nextPage is false
    // Then user then fetches page 2, return 50 entries, and tells there is nextPage
    // This will add loaders at the end, and because page 3 has already been fetched, the loaders will stay for ever
    highestPageMutated = Math.max(highestPageMutated, currentPage);
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
          mutatePageless([], pageInfo, true);
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

            mutatePageless(aniRes.data.data.page1.media, pageInfo, true);
          }
        });
      }
    });
  }

  const anilistSearchController = createCleanUpAbortController();
  const fallbackSearchController = createCleanUpAbortController(anilistSearchController);
  const fallbackSearchAnilistController = createCleanUpAbortController(fallbackSearchController);
  let anilistSearchFetcher, fallbackPagelessCacheKey;
  createEffect(() => {
    const signal = anilistSearchController.abortAndRenew();
    let debounce = 400;

    const aniVariables = anilistVariables();
    const jiVariables = props.jikanVariables;
    const currentPage = page();
    if (!aniVariables) return;

    const key = pagelessCacheKey();
    const currentPagelessFetcher = createAnilistFetcher(queries.searchMedia, { ...aniVariables, page: "pageless3"});
    if (currentPagelessFetcher.cacheKey !== key) return; // Pageless fetcher might load slower, so cancel fetcher if pagelessCacheKey is missing/different
    if (!anilistSearchFetcher && !untrack(() => props.debounceInitialFetch)) debounce = 0; // Dont debounce the first initial page load

    anilistSearchFetcher = createAnilistFetcher(queries.searchMedia, { ...aniVariables, page: currentPage }, signal);

    if (cachedResults.has(anilistSearchFetcher.cacheKey)) debounce = 0; // We have already fetched this, so we don't need to debounce

    if (fallbackPagelessCacheKey === key && currentPage > 1) {
      jikanFallbackSearch({ ...jiVariables, page: currentPage }, key, debounce);
      return
    }

    setError(null);

    sendAnilistFetcher(anilistSearchFetcher, {
      name: "Anilist media search",
      delay: debounce,
      // debug: false,
      expires: new Date().setHours(24 * 7), // 1 week
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey !== anilistSearchFetcher.cacheKey) return;
        anilistSearchController.disable()
        setPagelessCacheLoading(false);
      },
      onStop: () => setPreviousHistoryDummyData(null), // This value is used only ones the page load, then its cleared
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

        if (currentPagelessFetcher.cacheKey === untrack(pagelessCacheKey)) setPagelessCacheLoading(false);

        if (res.data.data.Page.media.length === 0 && currentPage === 1 && aniVariables.search?.length && jiVariables) {
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
        mutatePageless(res.data.data.Page.media, pageInfo, false);
      }
    });
  });

  const { signal } = createCleanUpAbortController();
  let lastScolledElement, fetchPageTimeout;
  window.addEventListener("scroll", handleScroll, { signal, passive: true });

  function handleScroll() {
    const perPage = pagelessCacheData?.data?.perPage;
    if (!perPage) return;
    const targets = document.querySelectorAll("[data-fetch-index]");

    if (!targets.length) return;
    if (lastScolledElement == targets[targets.length - 1]) {
      clearTimeout(fetchPageTimeout);
      fetchPageTimeout = setTimeout(handleScroll, 500);
      return;
    }
    lastScolledElement = targets[targets.length - 1];
    const index = Number(lastScolledElement.dataset.fetchIndex);

    const page = Math.floor(index / perPage) + 1;
    // After the debounce retrigger page fetch, this should stop when no fetch triggers are left
    setDebouncePage(() => {
      handleScroll();
      return page;
    });
  }

  const preventZoomIn = new Set();

  const mediaRanks = createMemo(() => {
    const { sort, sortBySearchMatch } = parsedSearchParams();
    const data = pagelessCacheData?.data;

    // The sort param is not the real order when results come from search match, from the jikan fallback or when they are grouped
    if (!data || sortBySearchMatch || data.fallback || parsedSearchParams().groupBy || !props.ranked || !RANKED_SORTS.has(sort?.[0])) return [];

    // Padding media are not real results, so they can't use up a rank. Loaders are counted because they hold the place of a real media
    let rank = 0;
    return data.media.map(media => media === MEDIA_PADDING_SPACE ? null : ++rank);
  });

  const showAdult = () => parsedSearchParams().age === "any";

  const searchMedia = () => (!pagelessCacheLoading() && pagelessCacheData?.data?.media) || previousHistoryDummyData()?.media || [];

  // Jikan fallback results are not sorted by the group, so they are not grouped
  const groupBy = () => !pagelessCacheData?.data?.fallback && parsedSearchParams().groupBy;

  // Reading a stale memo inside onCleanup makes Solid flush the update queue synchronously,
  // which can clean this owner again in the middle of its cleanups and crash Solid's cleanNode.
  // The search params change when navigating away, so the group is read here before the cleanup
  let latestGroupBy;
  createRenderEffect(() => latestGroupBy = groupBy());

  onCleanup(() => {
    const media = pagelessCacheData?.data?.media;
    if (!media?.length) return;
    // Padding media are kept, because they are not rendered
    searchPageLayouts[pagelessCacheData.cacheKey] = {
      media: media.map(m => m === MEDIA_PADDING_SPACE ? m : LOADER),
      sectionTitles: getSectionTitles(media, latestGroupBy),
    };
  });

  // Group header titles by the index of the media that starts the group
  // The dummy history data has only loaders, so its titles were saved when leaving the page
  const sectionTitles = createMemo(() => {
    const media = searchMedia();
    if (media === previousHistoryDummyData()?.media) return previousHistoryDummyData().sectionTitles;
    return getSectionTitles(media, groupBy());
  });

  // Each section starts from the first media or from a media that starts a group (group header)
  // Sections are keyed by their start index, so the section elements stay the same when more pages are loaded
  const mediaSectionStarts = createMemo(() => {
    if (!searchMedia().length) return [];
    return [0, ...Object.keys(sectionTitles()).map(Number).filter(i => i > 0).sort((a, b) => a - b)];
  });

  return (
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
      <Match when={true}>
        <div class="search-results">
          <For each={mediaSectionStarts()}>{(start, sectionIndex) => {
            const end = () => mediaSectionStarts()[sectionIndex() + 1] ?? searchMedia().length;
            const title = () => sectionTitles()[start] || (start === 0 && searchMedia()[0] === LOADER && groupBy() && "Loading");
            // Padding media are never rendered, so they are left out of the grid
            // Their indices are kept, because the index in the whole search result list is used to calculate the page to fetch
            const mediaIndices = createMemo(() => {
              const indices = [];
              for (let i = start; i < end(); i++) {
                if (searchMedia()[i] !== MEDIA_PADDING_SPACE) indices.push(i);
              }
              return indices;
            });
            const sectionMedia = createMemo(() => mediaIndices().map(i => searchMedia()[i]));

            return (
              <section>
                <Show when={title()}>
                  <h2>{title()}</h2>
                </Show>
                <Show when={searchPageCardStyle() === "rows"} fallback={
                  <VirtualGrid scoped class="virtual-grid" each={sectionMedia()}>{(media, i) => {
                    // Index in the whole search result list, not just inside this section
                    const index = () => mediaIndices()[i()];
                    // Animate card zoom in once, per query. When you search or change filters, we will reanimate cards again
                    const animate = !preventZoomIn.has(media.id);
                    preventZoomIn.add(media.id);

                    return (
                      <MediaCard scoped class="media-card" showScore showStatus showHaltedStatus showAdult={showAdult()} quickActions hoverCard cardZoomIn={animate} coverFadeIn={animate} loading={media?.tabTime < tabTime} media={media} rank={mediaRanks()[index()]} characterRole={media && props.characterRoles?.get(media.id)} voiceActorLanguages={props.voiceActorLanguages} staffRole={media && props.staffRoles?.get(media.id)} data-fetch-index={media?.tabTime < tabTime || media === LOADER ? index() : undefined} />
                    );
                  }}</VirtualGrid>
                }>
                  <VirtualList scoped class="virtual-list" cacheKey={rowListCacheKey() && `${rowListCacheKey()}-${start}`} each={sectionMedia()}>{(media, i) => {
                    const index = () => mediaIndices()[i()];

                    return (
                      <MediaRowCard scoped class="row-card" showStatus showType type={props.type} loading={media?.tabTime < tabTime} media={media} rank={mediaRanks()[index()]} characterRole={media && props.characterRoles?.get(media.id)} voiceActorLanguages={props.voiceActorLanguages} staffRole={media && props.staffRoles?.get(media.id)} data-fetch-index={media?.tabTime < tabTime || media === LOADER ? index() : undefined} />
                    );
                  }}</VirtualList>
                </Show>
              </section>
            );
          }}</For>
        </div>
      </Match>
    </Switch>
  );
}

// A group starts from every media whose group differs from the media before it
// After a loader the group is not known, so a new group is started there too
function getSectionTitles(media, groupBy) {
  const titles = {};
  const group = MEDIA_GROUPS[groupBy];
  if (!group) return titles;

  let previous;
  media.forEach((m, i) => {
    if (m === MEDIA_PADDING_SPACE) return;
    if (m) {
      const key = group.key(m);
      if (!previous || group.key(previous) !== key) titles[i] = group.title(key);
    }
    previous = m;
  });
  return titles;
}

function jikanPagenationToPageInfo(pagination) {
  const { current_page, has_next_page, items: { per_page } } = pagination;
  return { currentPage: current_page, hasNextPage: has_next_page, perPage: per_page };
}
