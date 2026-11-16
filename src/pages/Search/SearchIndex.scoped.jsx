import { Navigate, useLocation, useParams } from "@solidjs/router";
import { createEffect, createMemo, createRenderEffect, createSignal, ErrorBoundary, For, Match, on, Show, Switch } from "solid-js";
import { getSeasonInfo } from "@/utils/seasonUtils";
import { queries } from "@/api/api";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils";
import { createStore, reconcile } from "solid-js/store";
import "./SearchIndex.scoped.css";
import { useParsedSearchParams, useResponsive } from "@/state/providers";
import { capitalize } from "@/utils/formatUtils";
import { getSearchHeaderTitle, isSeasonPageHeader } from "@/utils/searchHeaderUtils";
import { SearchBar } from "@/components/search/SearchBar.scoped";
import { SearchActiveQueries } from "@/components/search/SearchActiveQueries.scoped";
import { CardStyleToggle } from "@/components/search/CardStyleToggle.scoped";
import { MediaSearchResults } from "@/components/search/MediaSearchResults.scoped";
import { createAnilistMediaQueryVariables, createJikanMediaQueryVariables } from "@/components/search/mediaSearchVariables";
import { SeasonControls } from "./SeasonControls.scoped";
import { createCleanUpAbortController } from "@/utils/abortUtils";
import { BrowsePage } from "./browse/BrowsePage.scoped";

export function SearchPage() {
  const params = useParams();
  const location = useLocation();
  const parsedSearchParams = useParsedSearchParams();
  const { isMobilLarge } = useResponsive();

  createEffect(() => {
    document.title = `${capitalize(params.type)} search - LOB`;
  });

  const anilistVariables = createMemo(() => params.mode === "search" ? createAnilistMediaQueryVariables(parsedSearchParams()) : null);
  const jikanVariables = createMemo(() => params.mode === "search" ? createJikanMediaQueryVariables(parsedSearchParams()) : null);

  // Typing to the search bar on the browse page opens the search page, so the first letter is debounced like the rest of them
  let cameFromBrowse = false;
  createRenderEffect(on(() => params.mode, (_, previousMode) => cameFromBrowse = previousMode === "browse"));

  const [error, setError] = createSignal();
  const [anilistBrowseLoading, setAnilistBrowseLoading] = createSignal(false);
  const [anilistBrowseData, setAnilistBrowseData] = createStore({});

  const anilistBrowseController = createCleanUpAbortController();
  let anilistBrowseFetcher;
  createEffect(() => {
    const signal = anilistBrowseController.abortAndRenew();

    const { mode, type } = params;
    if (mode !== "browse") return;

    const seasonInfo = getSeasonInfo();
    if (type === "anime") anilistBrowseFetcher = createAnilistFetcher(queries.anilistBrowseAnime, { ...seasonInfo }, signal)
    else if (type === "manga") anilistBrowseFetcher = createAnilistFetcher(queries.anilistBrowseManga, {}, signal);
    else if (type === "media") anilistBrowseFetcher = createAnilistFetcher(queries.anilistBrowseMedia, {}, signal);
    else return;

    setError(null);

    sendAnilistFetcher(anilistBrowseFetcher, {
      name: "Anilist media browse",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === anilistBrowseFetcher.cacheKey) anilistBrowseController.disable();
      },
      onStart: () => setAnilistBrowseLoading(true),
      onStop: () => setAnilistBrowseLoading(false),
      onError: async (response, { fetcher: f }) => {
        if (f.cacheKey !== anilistBrowseFetcher.cacheKey || response?.status !== 400) return;
        try {
          var json = await response.json();
        } finally {
          setError(json || response); // Returns anilists own error list
        }
      },
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === anilistBrowseFetcher.cacheKey) setAnilistBrowseData(reconcile(res.data.data));
      }
    });
  });

  const isSeasonHeader = () => isSeasonPageHeader(params.header);
  const pageTitle = createMemo(() => getSearchHeaderTitle(params.header, params.type, parsedSearchParams()));

  return (
    <ErrorBoundary fallback="Search page has crashed">
      <SearchBar typeSelect cardStyleToggle={!isMobilLarge() && !pageTitle()} />
      <Switch>
        <Match when={params.mode === "browse" && error()?.errors}>
          <h2>Bad request error: </h2>
          <For each={error().errors}>{({ message }) => (
            <p>{message}</p>
          )}</For>
        </Match>
        <Match when={params.mode === "browse" && error()}>
          <h2>Internal error</h2>
          <p>{error()}</p>
        </Match>
        {/* Data is type browse, so display all the fields */}
        <Match when={params.mode === "browse"}>
          <Show when={location.search || params.header}>
            <Navigate href={"/" + params.api + "/search/" + params.type + (params.header ? ("/" + params.header) : "") +  location.search} />
          </Show>
          <BrowsePage cards={anilistBrowseData} loading={anilistBrowseLoading()} />
        </Match>
        <Match when={params.mode === "search"}>
          <div class="search-page">
            <Show when={pageTitle()}>
              <div class="page-header">
                <h1>{pageTitle()}</h1>
                <div class="toolbar">
                  <CardStyleToggle />
                </div>
              </div>
            </Show>

            <Show when={isMobilLarge()}>
              <div class="mobile-active-queries">
                <SearchActiveQueries singleRow cardStyleToggle={!pageTitle()} />
              </div>
            </Show>

            <Show when={isSeasonHeader()}>
              <SeasonControls />
            </Show>

            <MediaSearchResults
              variables={anilistVariables()}
              jikanVariables={jikanVariables()}
              type={params.type}
              ranked={params.header === "top" || params.header === "popular"}
              debounceInitialFetch={cameFromBrowse && parsedSearchParams().q?.length === 1}
            />
          </div>
        </Match>
      </Switch>
    </ErrorBoundary>
  );
}
