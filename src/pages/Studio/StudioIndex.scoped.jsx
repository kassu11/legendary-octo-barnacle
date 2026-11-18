import { useParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, ErrorBoundary, For, Show } from "solid-js";
import "./StudioIndex.scoped.css";
import { FavouriteToggle } from "@/components/FavouriteToggle.scoped.jsx";
import { queries } from "@/api/api.js";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { setFetcherValueToStorage } from "@/utils/storageUtils.js";
import { createCleanUpAbortController } from "@/utils/abortUtils";
import { ParsedSearchParamsContext, useResponsive } from "@/state/providers";
import { SearchBar } from "@/components/search/SearchBar.scoped";
import { SearchActiveQueries } from "@/components/search/SearchActiveQueries.scoped";
import { CardStyleToggle } from "@/components/search/CardStyleToggle.scoped";
import { MediaSearchResults } from "@/components/search/MediaSearchResults.scoped";
import { createAnilistMediaQueryVariables } from "@/components/search/mediaSearchVariables";
import { createParsedSearchParams } from "@/components/search/parsedSearchParams";
import { MediaStatusIcon } from "@/components/media/MediaStatusIcon.scoped";
import { Tooltip } from "@/components/Tooltip.scoped";
import { formatUsersMediaStatus } from "@/utils/formatUtils.js";

// AniList has no studio filter for the media search, so all the media ids of the studio are fetched first and the search is done inside them.
// Studio media pages have only 25 entries and their lastPage is capped, so pages are fetched in batches until there is no next page
const STUDIO_MEDIA_PAGES_PER_FETCH = 40;
const STUDIO_MEDIA_PAGE_SIZE = 25;
// Order of the status bar segments
const LIST_STATUSES = ["CURRENT", "REPEATING", "COMPLETED", "PAUSED", "DROPPED", "PLANNING"];

const sameValues = (a, b) => a?.length === b?.length && !!a?.every((value, i) => value === b[i]);

export function Studio() {
  const params = useParams();
  const parsedSearchParams = createParsedSearchParams({ type: () => "anime", defaultSort: "start_date_desc" });
  const { isMobilLarge } = useResponsive();
  const [studioData, setStudioData] = createSignal(undefined, { equals: false });
  const [favourite, setFavourite] = createSignal(false);
  // Sorted ids of all the studio media, undefined until every batch has loaded
  const [studioMediaIds, setStudioMediaIds] = createSignal(undefined);
  // Users list status of each studio media id, set together with the ids
  const [studioMediaStatuses, setStudioMediaStatuses] = createSignal(undefined);

  createEffect(() => {
    document.title = `${studioData()?.data.data.Studio.name || "Studio"} - LOB`;
  });

  const studioMediaIdsController = createCleanUpAbortController();
  let currentStudioId;
  createEffect(() => {
    const signal = studioMediaIdsController.abortAndRenew();
    const studioId = currentStudioId = params.id;
    setStudioMediaIds(undefined);
    setStudioMediaStatuses(undefined);

    // Media nodes of each batch, the cached and the fetched response can both fill the same batch
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

          const studio = res.data.data.Studio;
          if (batchIndex === 0) {
            setStudioData(res);
            setFavourite(studio.isFavourite ?? false);
          }

          // Pages are aliased as page1, page2... and the pages after the last one are empty
          const nodes = [];
          let page;
          for (let i = firstPage; i < firstPage + STUDIO_MEDIA_PAGES_PER_FETCH; i++) {
            page = studio[`page${i}`];
            for (const node of page.nodes) nodes.push(node);
            if (!page.pageInfo.hasNextPage) break;
          }
          batches[batchIndex] = nodes;

          if (page.pageInfo.hasNextPage) {
            if (lastBatchIndex <= batchIndex) lastBatchIndex = undefined;
            fetchBatch(batchIndex + 1);
          } else {
            // Studio can have less media than before, so the batches after this are left out
            lastBatchIndex = batchIndex;
          }

          if (lastBatchIndex === undefined) return;
          const statuses = new Map();
          for (let i = 0; i <= lastBatchIndex; i++) {
            if (!batches[i]) return;
            for (const node of batches[i]) statuses.set(node.id, node.mediaListEntry?.status);
          }
          setStudioMediaStatuses(statuses);
          const ids = [...statuses.keys()].sort((a, b) => a - b);
          setStudioMediaIds(current => sameValues(current, ids) ? current : ids);
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

  const statusCounts = createMemo(() => {
    const counts = { listed: 0 };
    for (const status of studioMediaStatuses()?.values() || []) {
      if (!status) continue;
      counts[status] = (counts[status] || 0) + 1;
      counts.listed++;
    }
    return counts;
  });

  const mutateCache = isFavourite => {
    const res = studioData();
    res.data.data.Studio.isFavourite = isFavourite;
    setFetcherValueToStorage(res);
  };

  return (
    <ErrorBoundary fallback="Studio page has crashed">
      <ParsedSearchParamsContext.Provider value={parsedSearchParams}>
        <SearchBar />
        <div class="studio-page">
          <div class="page-header">
            <h1>{studioData()?.data.data.Studio.name}</h1>
            <div class="toolbar">
              <Show when={studioData()}>
                <FavouriteToggle
                  checked={favourite()}
                  variableId={params.id}
                  idType="STUDIO"
                  showAnilist
                  anilistValue={studioData().data.data.Studio.favourites}
                  onChange={setFavourite}
                  mutateCache={mutateCache}
                />
              </Show>
              <CardStyleToggle />
            </div>
          </div>

          <Show when={statusCounts().listed}>
            <div class="status-progress">
              <div class="bar">
                <For each={LIST_STATUSES}>{status => (
                  <Show when={statusCounts()[status]}>
                    <div
                      class="segment"
                      attr:data-status={status}
                      style={{ width: `${statusCounts()[status] / studioMediaStatuses().size * 100}%` }}
                    >
                      <Tooltip>{formatUsersMediaStatus(status, "anime")} {statusCounts()[status]}</Tooltip>
                    </div>
                  </Show>
                )}</For>
              </div>
              <ul class="legend">
                <For each={LIST_STATUSES}>{status => (
                  <Show when={statusCounts()[status]}>
                    <li>
                      <MediaStatusIcon status={status} />
                      <span class="status-label">
                        {formatUsersMediaStatus(status, "anime")}
                      </span>
                      {" "}{statusCounts()[status]}
                    </li>
                  </Show>
                )}</For>
                <li class="total">{statusCounts().listed} / {studioMediaStatuses().size}</li>
              </ul>
            </div>
          </Show>

          <Show when={isMobilLarge()}>
            <div class="mobile-active-queries">
              <SearchActiveQueries singleRow />
            </div>
          </Show>

          <MediaSearchResults variables={anilistVariables()} type="anime" />
        </div>
      </ParsedSearchParamsContext.Provider>
    </ErrorBoundary>
  );
}

