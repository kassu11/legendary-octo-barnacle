import { useParams, useSearchParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, ErrorBoundary, Match, Show, Switch } from "solid-js";
import "./StaffIndex.scoped.css";
import { OldMarkdownComponent } from "@/components/Markdown.scoped.jsx";
import { FavouriteToggle } from "@/components/FavouriteToggle.scoped.jsx";
import { queries } from "@/api/api.js";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { formatAnilistDate } from "@/utils/formatUtils.js";
import { setFetcherValueToStorage } from "@/utils/storageUtils.js";
import { wrapToArray } from "@/utils/arrayUtils.js";
import { createCleanUpAbortController } from "@/utils/abortUtils.js";
import { ParsedSearchParamsContext, useResponsive } from "@/state/providers";
import { SearchBar } from "@/components/search/SearchBar.scoped";
import { SearchActiveQueries } from "@/components/search/SearchActiveQueries.scoped";
import { CardStyleToggle } from "@/components/search/CardStyleToggle.scoped";
import { searchPageCardStyle, setSearchPageCardStyle } from "@/state/globalState";
import { MediaSearchResults } from "@/components/search/MediaSearchResults.scoped";
import { createAnilistMediaQueryVariables } from "@/components/search/mediaSearchVariables";
import { createParsedSearchParams } from "@/components/search/parsedSearchParams";
import { MediaStatusProgress } from "@/components/media/MediaStatusProgress.scoped";

// Character fields make the voice acting pages heavier, so fewer pages fit under the AniList query complexity limit
const VOICE_ACTING_PAGES_PER_FETCH = 20;
const STAFF_MEDIA_PAGES_PER_FETCH = 40;
const MEDIA_PAGE_SIZE = 25;
const VOICE_ACTING_ROLE = "Voice Acting";
const MEDIA_TYPES = ["anime", "manga"];

const sameValues = (a, b) => a?.length === b?.length && !!a?.every((value, i) => value === b[i]);

export function Staff() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const mediaType = createMemo(() => {
    const type = wrapToArray(searchParams.type).at(-1);
    return MEDIA_TYPES.includes(type) ? type : "media";
  });
  const parsedSearchParams = createParsedSearchParams({ type: mediaType, defaultSort: "start_date_desc" });
  const { isMobilLarge } = useResponsive();
  const [staffData, setStaffData] = createSignal(undefined, { equals: false });
  const [favourite, setFavourite] = createSignal(false);
  const [voiceActingEdges, setVoiceActingEdges] = createSignal(undefined);
  const [staffMediaEdges, setStaffMediaEdges] = createSignal(undefined);

  const staff = () => staffData()?.data.data.Staff;

  createEffect(() => {
    document.title = `${staff()?.name.userPreferred || "Staff"} - LOB`;
  });

  const staffController = createCleanUpAbortController();
  let staffFetcher;
  createEffect(() => {
    const signal = staffController.abortAndRenew();
    staffFetcher = createAnilistFetcher(queries.anilistStaffById, { id: params.id }, signal);

    sendAnilistFetcher(staffFetcher, {
      name: "Anilist staff info",
      onFetch: () => staffController.disable(),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== staffFetcher.cacheKey) return;
        setStaffData(res);
        setFavourite(res.data.data.Staff.isFavourite ?? false);
      }
    });
  });

  const staffMediaController = createCleanUpAbortController();
  let currentStaffId;
  createEffect(() => {
    const signal = staffMediaController.abortAndRenew();
    const staffId = currentStaffId = params.id;
    setVoiceActingEdges(undefined);
    setStaffMediaEdges(undefined);

    // Voice acting and staff roles are separate connections with their own page counts
    const fetchEdges = (query, pagesPerFetch, name, setEdges) => {
      // The cached and the fetched response can both fill the same batch
      const batches = [];
      const requestedBatches = new Set();
      let lastBatchIndex;

      const fetchBatch = batchIndex => {
        if (requestedBatches.has(batchIndex)) return;
        requestedBatches.add(batchIndex);

        const firstPage = batchIndex * pagesPerFetch + 1;
        const fetcher = createAnilistFetcher(query(pagesPerFetch * MEDIA_PAGE_SIZE, firstPage), { id: staffId }, signal);

        sendAnilistFetcher(fetcher, {
          name,
          onFetch: () => staffMediaController.disable(),
          setValue: res => {
            if (staffId !== currentStaffId) return;

            const edges = [];
            let page;
            for (let i = firstPage; i < firstPage + pagesPerFetch; i++) {
              page = res.data.data.Staff[`page${i}`];
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
            const allEdges = [];
            for (let i = 0; i <= lastBatchIndex; i++) {
              if (!batches[i]) return;
              for (const edge of batches[i]) allEdges.push(edge);
            }
            setEdges(allEdges);
          }
        });
      };

      fetchBatch(0);
    };

    fetchEdges(queries.anilistStaffCharacterMediaIds, VOICE_ACTING_PAGES_PER_FETCH, "Anilist staff character media ids", setVoiceActingEdges);
    fetchEdges(queries.anilistStaffMediaIds, STAFF_MEDIA_PAGES_PER_FETCH, "Anilist staff media ids", setStaffMediaEdges);
  });

  const staffRoles = createMemo(() => {
    if (!voiceActingEdges() || !staffMediaEdges()) return undefined;

    const roles = new Map();
    const roleOf = node => {
      if (!roles.has(node.id)) roles.set(node.id, { node, characterRole: undefined, characters: [], staffRoles: [], filterRoles: new Set() });
      return roles.get(node.id);
    };

    for (const edge of voiceActingEdges()) {
      const role = roleOf(edge.node);
      role.characterRole = edge.characterRole;
      role.filterRoles.add(VOICE_ACTING_ROLE);
      for (const character of edge.characters) {
        if (character && !role.characters.some(c => c.id === character.id)) role.characters.push(character);
      }
    }

    // Every staff role of a media is its own edge
    for (const edge of staffMediaEdges()) {
      const role = roleOf(edge.node);
      if (!edge.staffRole || role.staffRoles.includes(edge.staffRole)) continue;
      role.staffRoles.push(edge.staffRole);
      // Details in parentheses, like "Key Animation (eps 1, 3)", are left out of the filter
      role.filterRoles.add(edge.staffRole.replace(/\s*\(.*\)\s*$/, ""));
    }

    return roles;
  });

  const [staffMediaIds, setStaffMediaIds] = createSignal(undefined);
  const [roleCounts, setRoleCounts] = createSignal(undefined);
  const [statusCounts, setStatusCounts] = createSignal({ listed: 0, total: 0 });
  createEffect(() => {
    if (!staffRoles()) {
      setStaffMediaIds(undefined);
      setRoleCounts(undefined);
      setStatusCounts({ listed: 0, total: 0 });
      return;
    }

    const mediaTypeName = mediaType() === "media" ? undefined : mediaType().toUpperCase();
    const roleValues = wrapToArray(searchParams.role);
    const includedRoles = roleValues.filter(role => !role.startsWith("-"));
    const excludedRoles = roleValues.filter(role => role.startsWith("-")).map(role => role.substring(1));

    const ids = [];
    const roles = {};
    const statuses = { listed: 0, total: 0 };
    for (const [id, staffRole] of staffRoles()) {
      if (mediaTypeName && staffRole.node.type !== mediaTypeName) continue;
      statuses.total++;

      for (const role of staffRole.filterRoles) roles[role] = (roles[role] || 0) + 1;

      const status = staffRole.node.mediaListEntry?.status;
      if (status) {
        statuses[status] = (statuses[status] || 0) + 1;
        statuses.listed++;
      }

      if (includedRoles.length && !includedRoles.some(role => staffRole.filterRoles.has(role))) continue;
      if (excludedRoles.some(role => staffRole.filterRoles.has(role))) continue;
      ids.push(id);
    }
    ids.sort((a, b) => a - b);

    setStaffMediaIds(current => sameValues(current, ids) ? current : ids);
    setRoleCounts(roles);
    setStatusCounts(statuses);
  });

  const anilistVariables = createMemo(() => {
    const ids = staffMediaIds();
    if (!ids) return null;
    return createAnilistMediaQueryVariables(parsedSearchParams(), { idIn: ids });
  });

  const alternativeNames = () => [staff().name.native, ...staff().name.alternative].filter(Boolean).join(", ");

  const mutateCache = isFavourite => {
    const res = staffData();
    res.data.data.Staff.isFavourite = isFavourite;
    setFetcherValueToStorage(res);
  };

  return (
    <ErrorBoundary fallback="Staff page has crashed">
      <ParsedSearchParamsContext.Provider value={parsedSearchParams}>
        <SearchBar typeSelect typeSearchParam staffFilters roleCounts={roleCounts()} />
        <div class="staff-page">
          <Show when={staff()}>
            <div class="page-header">
              <img src={staff().image.large} class="cover" alt="Staff profile" />
              <div class="details">
                <div class="title-row">
                  <div class="names">
                    <h1>{staff().name.userPreferred}</h1>
                    <Show when={alternativeNames()}>
                      <p class="alternative-names">{alternativeNames()}</p>
                    </Show>
                  </div>
                  <div class="toolbar">
                    <FavouriteToggle
                      checked={favourite()}
                      variableId={params.id}
                      idType="STAFF"
                      showAnilist
                      anilistValue={staff().favourites}
                      onChange={setFavourite}
                      mutateCache={mutateCache}
                    />
                    <CardStyleToggle cardStyle={searchPageCardStyle()} setCardStyle={setSearchPageCardStyle} />
                  </div>
                </div>
                <ul class="info">
                  <Show when={formatAnilistDate(staff().dateOfBirth)}>
                    <li><strong>Birth:</strong> {formatAnilistDate(staff().dateOfBirth)}</li>
                  </Show>
                  <Show when={formatAnilistDate(staff().dateOfDeath)}>
                    <li><strong>Death:</strong> {formatAnilistDate(staff().dateOfDeath)}</li>
                  </Show>
                  <Show when={staff().age}>
                    <li><strong>Age:</strong> {staff().age}</li>
                  </Show>
                  <Show when={staff().gender}>
                    <li><strong>Gender:</strong> {staff().gender}</li>
                  </Show>
                  <Show when={staff().yearsActive?.length}>
                    <li>
                      <strong>Active years:</strong> {staff().yearsActive.join("-")}
                      <Switch>
                        <Match when={staff().dateOfDeath?.year && staff().yearsActive.at(-1) !== staff().dateOfDeath.year}>
                          -{staff().dateOfDeath.year}
                        </Match>
                        <Match when={staff().yearsActive.length === 1 && staff().dateOfDeath?.year == null}>
                          -Present
                        </Match>
                      </Switch>
                    </li>
                  </Show>
                  <Show when={staff().homeTown}>
                    <li><strong>Home town:</strong> {staff().homeTown}</li>
                  </Show>
                  <Show when={staff().bloodType}>
                    <li><strong>Blood type:</strong> {staff().bloodType}</li>
                  </Show>
                </ul>
                <Show when={staff().description}>
                  <div class="description">
                    <OldMarkdownComponent>{staff().description}</OldMarkdownComponent>
                  </div>
                </Show>
              </div>
            </div>
          </Show>

          <MediaStatusProgress counts={statusCounts()} type="media" />

          <Show when={isMobilLarge()}>
            <div class="mobile-active-queries">
              <SearchActiveQueries singleRow />
            </div>
          </Show>

          <MediaSearchResults variables={anilistVariables()} type={mediaType()} staffRoles={staffRoles()} />
        </div>
      </ParsedSearchParamsContext.Provider>
    </ErrorBoundary>
  );
}
