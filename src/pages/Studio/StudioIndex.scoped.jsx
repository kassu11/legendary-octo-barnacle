import { useParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, ErrorBoundary, Show } from "solid-js";
import "./StudioIndex.scoped.css";
import { FavouriteToggle } from "@/components/FavouriteToggle.scoped.jsx";
import { queries } from "@/api/api.js";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { setFetcherValueToStorage } from "@/utils/storageUtils.js";
import { createCleanUpAbortController } from "@/utils/abortUtils";
import { useParsedSearchParams, useResponsive } from "@/state/providers";
import { SearchBar } from "@/components/search/SearchBar.scoped";
import { SearchActiveQueries } from "@/components/search/SearchActiveQueries.scoped";
import { CardStyleToggle } from "@/components/search/CardStyleToggle.scoped";
import { MediaSearchResults } from "@/components/search/MediaSearchResults.scoped";
import { createAnilistMediaQueryVariables } from "@/components/search/mediaSearchVariables";

// AniList has no studio filter for the media search, so all the media ids of the studio are fetched first and the search is done inside them.
// Studio media pages have only 25 entries and their lastPage is capped, so pages are fetched in batches until there is no next page
const STUDIO_MEDIA_PAGES_PER_FETCH = 40;
const STUDIO_MEDIA_PAGE_SIZE = 25;

const sameIds = (a, b) => a?.length === b?.length && !!a?.every((id, i) => id === b[i]);

export function Studio() {
  const params = useParams();
  const parsedSearchParams = useParsedSearchParams();
  const { isMobilLarge } = useResponsive();
  const [studio, setStudio] = createSignal(undefined, { equals: false });
  const [favourite, setFavourite] = createSignal(false);
  // Sorted ids of all the studio media, undefined until every batch has loaded
  const [studioMediaIds, setStudioMediaIds] = createSignal(undefined, { equals: sameIds });

  createEffect(() => {
    document.title = `${studio()?.data.data.Studio.name || "Studio"} - LOB`;
  });

  const studioMediaIdsController = createCleanUpAbortController();
  let currentStudioId;
  createEffect(() => {
    const signal = studioMediaIdsController.abortAndRenew();
    const studioId = currentStudioId = params.id;
    setStudioMediaIds(undefined);

    // Ids of each batch, the cached and the fetched response can both fill the same batch
    const batches = [];
    const requestedBatches = new Set();
    let lastBatchIndex;

    const fetchBatch = batchIndex => {
      if (requestedBatches.has(batchIndex)) return;
      requestedBatches.add(batchIndex);

      const firstPage = batchIndex * STUDIO_MEDIA_PAGES_PER_FETCH + 1;
      const fetcher = createAnilistFetcher(queries.anilistStudioMediaIds(STUDIO_MEDIA_PAGES_PER_FETCH * STUDIO_MEDIA_PAGE_SIZE, firstPage), { id: studioId }, signal);

      sendAnilistFetcher(fetcher, {
        name: "Anilist studio media ids",
        onFetch: () => studioMediaIdsController.disable(),
        setValue: res => {
          if (studioId !== currentStudioId) return;

          const { info, pages } = splitStudioResponse(res.data.data.Studio);
          if (batchIndex === 0) {
            setStudio(res);
            setFavourite(info.isFavourite ?? false);
          }

          batches[batchIndex] = pages.flatMap(page => page.nodes.map(node => node.id));

          if (pages.at(-1)?.pageInfo.hasNextPage) {
            if (lastBatchIndex <= batchIndex) lastBatchIndex = undefined;
            fetchBatch(batchIndex + 1);
          } else {
            // Studio can have less media than before, so the batches after this are left out
            lastBatchIndex = batchIndex;
          }

          if (lastBatchIndex === undefined) return;
          const loadedBatches = Array.from({ length: lastBatchIndex + 1 }, (_, i) => batches[i]);
          if (loadedBatches.includes(undefined)) return;
          setStudioMediaIds([...new Set(loadedBatches.flat())].sort((a, b) => a - b));
        }
      });
    };

    fetchBatch(0);
  });

  const anilistVariables = createMemo(() => {
    const ids = studioMediaIds();
    if (!ids) return null;
    return createAnilistMediaQueryVariables(parsedSearchParams(), { idIn: ids });
  });

  const studioInfo = () => studio() && splitStudioResponse(studio().data.data.Studio).info;

  const mutateCache = isFavourite => {
    const res = studio();
    res.data.data.Studio.isFavourite = isFavourite;
    setFetcherValueToStorage(res);
  };

  return (
    <ErrorBoundary fallback="Studio page has crashed">
      <SearchBar />
      <div class="studio-page">
        <div class="page-header">
          <h1>{studioInfo()?.name}</h1>
          <div class="toolbar">
            <Show when={studioInfo()}>
              <FavouriteToggle
                checked={favourite()}
                variableId={params.id}
                idType="STUDIO"
                anilistValue={studioInfo().favourites}
                onChange={setFavourite}
                mutateCache={mutateCache}
              />
            </Show>
            <CardStyleToggle />
          </div>
        </div>

        <Show when={isMobilLarge()}>
          <div class="mobile-active-queries">
            <SearchActiveQueries singleRow />
          </div>
        </Show>

        <MediaSearchResults variables={anilistVariables()} type="anime" />
      </div>
    </ErrorBoundary>
  );
}

// Separates the studio info from the aliased media pages (page1, page2...)
function splitStudioResponse(studio) {
  const info = {};
  const pages = [];
  for (const [key, value] of Object.entries(studio)) {
    if (/^page\d+$/.test(key)) pages[+key.slice(4)] = value;
    else info[key] = value;
  }
  return { info, pages: pages.filter(Boolean) };
}
