import { useParams, useSearchParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, ErrorBoundary, For, Show } from "solid-js";
import "./CharacterIndex.scoped.css";
import { OldMarkdownComponent } from "@/components/Markdown.scoped.jsx";
import { FavouriteToggle } from "@/components/FavouriteToggle.scoped.jsx";
import { queries } from "@/api/api.js";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { formatAnilistDate, formatUsersMediaStatus } from "@/utils/formatUtils.js";
import { setFetcherValueToStorage } from "@/utils/storageUtils.js";
import { wrapToArray } from "@/utils/arrayUtils.js";
import { createCleanUpAbortController } from "@/utils/abortUtils.js";
import { ParsedSearchParamsContext, useResponsive } from "@/state/providers";
import { voiceActorLanguages } from "@/state/globalState";
import { SearchBar } from "@/components/search/SearchBar.scoped";
import { SearchActiveQueries } from "@/components/search/SearchActiveQueries.scoped";
import { CardStyleToggle } from "@/components/search/CardStyleToggle.scoped";
import { MediaSearchResults } from "@/components/search/MediaSearchResults.scoped";
import { createAnilistMediaQueryVariables } from "@/components/search/mediaSearchVariables";
import { createParsedSearchParams } from "@/components/search/parsedSearchParams";
import { MediaStatusIcon } from "@/components/media/MediaStatusIcon.scoped";
import { Tooltip } from "@/components/Tooltip.scoped";

// Voice actor fields make the pages heavy, so fewer pages fit under the AniList query complexity limit
const CHARACTER_MEDIA_PAGES_PER_FETCH = 20;
const CHARACTER_MEDIA_PAGE_SIZE = 25;
const LIST_STATUSES = ["CURRENT", "REPEATING", "COMPLETED", "PAUSED", "DROPPED", "PLANNING"];
const MEDIA_TYPES = ["anime", "manga"];

const sameValues = (a, b) => a?.length === b?.length && !!a?.every((value, i) => value === b[i]);

export function Character() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const mediaType = createMemo(() => {
    const type = wrapToArray(searchParams.type).at(-1);
    return MEDIA_TYPES.includes(type) ? type : "media";
  });
  const parsedSearchParams = createParsedSearchParams({ type: mediaType, defaultSort: "popularity_desc" });
  const { isMobilLarge } = useResponsive();
  const [characterData, setCharacterData] = createSignal(undefined, { equals: false });
  const [favourite, setFavourite] = createSignal(false);
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
        }
      });
    };

    fetchBatch(0);
  });

  const [characterMediaIds, setCharacterMediaIds] = createSignal(undefined);
  const [roleCounts, setRoleCounts] = createSignal(undefined);
  const [languageCounts, setLanguageCounts] = createSignal(undefined);
  const [statusCounts, setStatusCounts] = createSignal({ listed: 0, total: 0 });
  createEffect(() => {
    if (!characterRoles()) {
      setCharacterMediaIds(undefined);
      setRoleCounts(undefined);
      setLanguageCounts(undefined);
      setStatusCounts({ listed: 0, total: 0 });
      return;
    }

    const mediaTypeName = mediaType() === "media" ? undefined : mediaType().toUpperCase();
    const roleValues = wrapToArray(searchParams.role);
    const includedRoles = roleValues.filter(role => !role.startsWith("-"));
    const excludedRoles = roleValues.filter(role => role.startsWith("-")).map(role => role.substring(1));

    const ids = [];
    const roles = {};
    const languages = {};
    const statuses = { listed: 0, total: 0 };
    for (const [id, edge] of characterRoles()) {
      if (mediaTypeName && edge.node.type !== mediaTypeName) continue;
      statuses.total++;

      const role = edge.characterRole?.toLowerCase();
      roles[role] = (roles[role] || 0) + 1;

      const edgeLanguages = new Set();
      for (const voiceActorRole of edge.voiceActorRoles) edgeLanguages.add(voiceActorRole.voiceActor.language);
      for (const language of edgeLanguages) languages[language] = (languages[language] || 0) + 1;

      const status = edge.node.mediaListEntry?.status;
      if (status) {
        statuses[status] = (statuses[status] || 0) + 1;
        statuses.listed++;
      }

      if (includedRoles.length && !includedRoles.includes(role)) continue;
      if (excludedRoles.includes(role)) continue;
      ids.push(id);
    }
    ids.sort((a, b) => a - b);

    setCharacterMediaIds(current => sameValues(current, ids) ? current : ids);
    setRoleCounts(roles);
    setLanguageCounts(languages);
    setStatusCounts(statuses);
  });

  // Saved languages that the character doesn't have are skipped, so the selection isn't lost on characters without them
  const [shownVoiceActorLanguages, setShownVoiceActorLanguages] = createSignal([]);
  createEffect(() => {
    const counts = languageCounts() || {};
    let languages = voiceActorLanguages().filter(language => counts[language]);
    if (!languages.length) languages = counts.Japanese ? ["Japanese"] : Object.keys(counts).slice(0, 1);
    setShownVoiceActorLanguages(current => sameValues(current, languages) ? current : languages);
  });

  const anilistVariables = createMemo(() => {
    const ids = characterMediaIds();
    if (!ids) return null;
    return createAnilistMediaQueryVariables(parsedSearchParams(), { idIn: ids });
  });

  const alternativeNames = () => [character().name.native, ...character().name.alternative].filter(Boolean).join(", ");

  const mutateCache = isFavourite => {
    const res = characterData();
    res.data.data.Character.isFavourite = isFavourite;
    setFetcherValueToStorage(res);
  };

  return (
    <ErrorBoundary fallback="Character page has crashed">
      <ParsedSearchParamsContext.Provider value={parsedSearchParams}>
        <SearchBar typeSelect typeSearchParam characterFilters roleCounts={roleCounts()} languageCounts={languageCounts()} voiceActorLanguages={shownVoiceActorLanguages()} />
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
                      style={{ width: `${statusCounts()[status] / statusCounts().total * 100}%` }}
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
                <li class="total">{statusCounts().listed} / {statusCounts().total}</li>
              </ul>
            </div>
          </Show>

          <Show when={isMobilLarge()}>
            <div class="mobile-active-queries">
              <SearchActiveQueries singleRow />
            </div>
          </Show>

          <MediaSearchResults variables={anilistVariables()} type={mediaType()} characterRoles={characterRoles()} voiceActorLanguages={shownVoiceActorLanguages()} />
        </div>
      </ParsedSearchParamsContext.Provider>
    </ErrorBoundary>
  );
}
