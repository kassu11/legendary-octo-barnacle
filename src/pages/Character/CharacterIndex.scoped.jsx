import { useParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, ErrorBoundary, For, Show } from "solid-js";
import "./CharacterIndex.scoped.css";
import { OldMarkdownComponent } from "@/components/Markdown.scoped.jsx";
import { FavouriteToggle } from "@/components/FavouriteToggle.scoped.jsx";
import { queries } from "@/api/api.js";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { formatAnilistDate, formatUsersMediaStatus } from "@/utils/formatUtils.js";
import { setFetcherValueToStorage } from "@/utils/storageUtils.js";
import { createCleanUpAbortController } from "@/utils/abortUtils.js";
import { useParsedSearchParams, useResponsive } from "@/state/providers";
import { SearchBar } from "@/components/search/SearchBar.scoped";
import { SearchActiveQueries } from "@/components/search/SearchActiveQueries.scoped";
import { CardStyleToggle } from "@/components/search/CardStyleToggle.scoped";
import { MediaSearchResults } from "@/components/search/MediaSearchResults.scoped";
import { createAnilistMediaQueryVariables } from "@/components/search/mediaSearchVariables";
import { MediaStatusIcon } from "@/components/media/MediaStatusIcon.scoped";
import { Tooltip } from "@/components/Tooltip.scoped";

// Voice actor fields make the pages heavy, so fewer pages fit under the AniList query complexity limit
const CHARACTER_MEDIA_PAGES_PER_FETCH = 20;
const CHARACTER_MEDIA_PAGE_SIZE = 25;
const LIST_STATUSES = ["CURRENT", "REPEATING", "COMPLETED", "PAUSED", "DROPPED", "PLANNING"];

const sameIds = (a, b) => a?.length === b?.length && !!a?.every((id, i) => id === b[i]);

export function Character() {
  const params = useParams();
  const parsedSearchParams = useParsedSearchParams();
  const { isMobilLarge } = useResponsive();
  const [characterData, setCharacterData] = createSignal(undefined, { equals: false });
  const [favourite, setFavourite] = createSignal(false);
  const [characterMediaIds, setCharacterMediaIds] = createSignal(undefined, { equals: sameIds });
  const [characterRoles, setCharacterRoles] = createSignal(undefined);

  const character = () => characterData()?.data.data.Character;

  createEffect(() => {
    document.title = `${character()?.name.userPreferred || "Character"} - LOB`;
  });

  const characterController = createCleanUpAbortController();
  let characterFetcher;
  createEffect(() => {
    const signal = characterController.abortAndRenew();
    characterFetcher = createAnilistFetcher(queries.anilistCharacterById, { id: params.id }, signal);

    sendAnilistFetcher(characterFetcher, {
      name: "Anilist character info",
      onFetch: () => characterController.disable(),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== characterFetcher.cacheKey) return;
        setCharacterData(res);
        setFavourite(res.data.data.Character.isFavourite ?? false);
      }
    });
  });

  const characterMediaIdsController = createCleanUpAbortController();
  let currentCharacterId;
  createEffect(() => {
    const signal = characterMediaIdsController.abortAndRenew();
    const characterId = currentCharacterId = params.id;
    setCharacterMediaIds(undefined);
    setCharacterRoles(undefined);

    // The cached and the fetched response can both fill the same batch
    const batches = [];
    const requestedBatches = new Set();
    let lastBatchIndex;

    const fetchBatch = batchIndex => {
      if (requestedBatches.has(batchIndex)) return;
      requestedBatches.add(batchIndex);

      const firstPage = batchIndex * CHARACTER_MEDIA_PAGES_PER_FETCH + 1;
      const fetcher = createAnilistFetcher(queries.anilistCharacterMediaIds(CHARACTER_MEDIA_PAGES_PER_FETCH * CHARACTER_MEDIA_PAGE_SIZE, firstPage), { id: characterId }, signal);

      sendAnilistFetcher(fetcher, {
        name: "Anilist character media ids",
        onFetch: () => characterMediaIdsController.disable(),
        setValue: res => {
          if (characterId !== currentCharacterId) return;

          const edges = [];
          let page;
          for (let i = firstPage; i < firstPage + CHARACTER_MEDIA_PAGES_PER_FETCH; i++) {
            page = res.data.data.Character[`page${i}`];
            for (const edge of page.edges) edges.push(edge);
            if (!page.pageInfo.hasNextPage) break;
          }
          batches[batchIndex] = edges;

          if (page.pageInfo.hasNextPage) {
            if (lastBatchIndex <= batchIndex) lastBatchIndex = undefined;
            fetchBatch(batchIndex + 1);
          } else {
            lastBatchIndex = batchIndex;
          }

          if (lastBatchIndex === undefined) return;
          const roles = new Map();
          for (let i = 0; i <= lastBatchIndex; i++) {
            if (!batches[i]) return;
            for (const edge of batches[i]) roles.set(edge.node.id, edge);
          }
          setCharacterRoles(roles);
          setCharacterMediaIds([...roles.keys()].sort((a, b) => a - b));
        }
      });
    };

    fetchBatch(0);
  });

  const anilistVariables = createMemo(() => {
    const ids = characterMediaIds();
    if (!ids) return null;
    return createAnilistMediaQueryVariables(parsedSearchParams(), { idIn: ids });
  });

  const statusCounts = createMemo(() => {
    const counts = { listed: 0 };
    for (const edge of characterRoles()?.values() || []) {
      const status = edge.node.mediaListEntry?.status;
      if (!status) continue;
      counts[status] = (counts[status] || 0) + 1;
      counts.listed++;
    }
    return counts;
  });

  const alternativeNames = () => [character().name.native, ...character().name.alternative].filter(Boolean).join(", ");

  const mutateCache = isFavourite => {
    const res = characterData();
    res.data.data.Character.isFavourite = isFavourite;
    setFetcherValueToStorage(res);
  };

  return (
    <ErrorBoundary fallback="Character page has crashed">
      <SearchBar />
      <div class="character-page">
        <Show when={character()}>
          <div class="page-header">
            <img src={character().image.large} class="cover" alt="Character profile" />
            <div class="details">
              <div class="title-row">
                <div class="names">
                  <h1>{character().name.userPreferred}</h1>
                  <Show when={alternativeNames()}>
                    <p class="alternative-names">{alternativeNames()}</p>
                  </Show>
                </div>
                <div class="toolbar">
                  <FavouriteToggle
                    checked={favourite()}
                    variableId={params.id}
                    idType="CHARACTER"
                    showAnilist
                    anilistValue={character().favourites}
                    onChange={setFavourite}
                    mutateCache={mutateCache}
                  />
                  <CardStyleToggle />
                </div>
              </div>
              <ul class="info">
                <Show when={formatAnilistDate(character().dateOfBirth)}>
                  <li><strong>Birth:</strong> {formatAnilistDate(character().dateOfBirth)}</li>
                </Show>
                <Show when={character().age}>
                  <li><strong>Age:</strong> {character().age}</li>
                </Show>
                <Show when={character().gender}>
                  <li><strong>Gender:</strong> {character().gender}</li>
                </Show>
                <Show when={character().bloodType}>
                  <li><strong>Blood type:</strong> {character().bloodType}</li>
                </Show>
              </ul>
              <Show when={character().description}>
                <div class="description">
                  <OldMarkdownComponent>{character().description}</OldMarkdownComponent>
                </div>
              </Show>
            </div>
          </div>
        </Show>

        <Show when={statusCounts().listed}>
          <div class="status-progress">
            <div class="bar">
              <For each={LIST_STATUSES}>{status => (
                <Show when={statusCounts()[status]}>
                  <div
                    class="segment"
                    attr:data-status={status}
                    style={{ width: `${statusCounts()[status] / characterRoles().size * 100}%` }}
                  >
                    <Tooltip>{formatUsersMediaStatus(status, "media")} {statusCounts()[status]}</Tooltip>
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
                      {formatUsersMediaStatus(status, "media")}
                    </span>
                    {" "}{statusCounts()[status]}
                  </li>
                </Show>
              )}</For>
              <li class="total">{statusCounts().listed} / {characterRoles().size}</li>
            </ul>
          </div>
        </Show>

        <Show when={isMobilLarge()}>
          <div class="mobile-active-queries">
            <SearchActiveQueries singleRow />
          </div>
        </Show>

        <MediaSearchResults variables={anilistVariables()} type="media" characterRoles={characterRoles()} voiceActorLanguage="Japanese" />
      </div>
    </ErrorBoundary>
  );
}
