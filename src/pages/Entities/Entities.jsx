import { A, useParams } from "@solidjs/router";
import { createEffect, createMemo, createRenderEffect, createSignal, For, Match, onCleanup, onMount, Show, Switch, untrack } from "solid-js";
import "./Entities.scss";
import { capitalize, languageFromCountry } from "../../utils/formating.js";
import { asserts, modes, signals, queries } from "../../collections/collections.js";
import { arrayUtils } from "../../utils/utils.js";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { LoaderCircle } from "../../components/LoaderCircle.jsx";
import { Tooltip } from "../../components/Tooltips.jsx";
import { Intersection } from "../../components/utils/Intersection.scoped.jsx";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils.js";
import { getFetcherValueFromStorage, setFetcherValueToStorage } from "../../utils/storageUtils";
import { isTypeFunction } from "../../utils/functionUtils";

export function AnimeCharacters() {
  return (
    <Entities type="CHARACTER" />
  );
}

export function MangaCharacters() {
  return (
    <Entities type="CHARACTER" />
  );
}

export function AnimeStaff() {
  return (
    <Entities type="STAFF" />
  );
}

export function MangaStaff() {
  return (
    <Entities type="STAFF" />
  );
}


function Entities(props) {
  const params = useParams();

  return (
    <div class="entities-page">
      <Switch>
        <Match when={props.type === "CHARACTER"}>
          <CharactersReel />
        </Match>
        <Match when={props.type === "STAFF"}>
          <ol class="grid-column-auto-fill">
            <StaffPage
              id={params.id}
              page={1}
            />
          </ol>
        </Match>
      </Switch>
    </div>
  )
}

function updateCacheMap(start, end, cacheMap, entries) {
  for (let i = start; i <= end; i++) {
    cacheMap[entries[i].id] = i;
  }

  return cacheMap;
}

function CharactersReel(props) {
  const params = useParams();
  const [pagelessCacheLoading, setPagelessCacheLoading] = createSignal(false);
  const [pagelessCacheData, setPagelessCacheData] = createSignal(undefined, { equals: false });

  createRenderEffect(async () => {
    setPagelessCacheLoading(true);
    const pagelessFetcher = createAnilistFetcher(queries.anilistCharacters, { id: params.id, page: "pageless"});
    const data = await getFetcherValueFromStorage(pagelessFetcher);

    if (data) setPagelessCacheData(data);
    else {
      setPagelessCacheData({
        data: null,
        name: "Anilist characters pageless",
        expires: new Date().setHours(24 * 356),
        modified: new Date(),
        cacheKey: pagelessFetcher.cacheKey
      });
    }
    setPagelessCacheLoading(false);
  });

  const mutateCache = mutate => {
    if (isTypeFunction(mutate)) mutate = mutate(untrack(pagelessCacheData));
    setFetcherValueToStorage(mutate);
  };

  const updateCache = (onePageRes, voiceActorRoles, pagelessFetcher) => {
    if (!onePageRes.data.data.Media.characters.edges?.length) return;;
    if (pagelessFetcher.cacheKey !== pagelessCacheData().cacheKey) return;

    setPagelessCacheData(pagelessRes => {
      try {
        if (!pagelessRes?.data?.items?.length) {
          pagelessRes.data = {
            items: onePageRes.data.data.Media.characters.edges,
            indices: updateCacheMap(0, onePageRes.data.data.Media.characters.edges.length - 1, {}, onePageRes.data.data.Media.characters.edges),
            roles: voiceActorRoles,
          };
          return pagelessRes;
        }

        for (let i = 0; i < onePageRes.data.data.Media.characters.edges.length; i++) {
          const character = onePageRes.data.data.Media.characters.edges[i];
          const newIndex = i + (onePageRes.data.data.Media.characters.pageInfo.currentPage - 1) * onePageRes.data.data.Media.characters.pageInfo.perPage;
          const cacheIndex = pagelessRes.data.indices[character.id];
          if (character.id in pagelessRes.data.indices) {
            if (cacheIndex < newIndex) {
              for (let j = cacheIndex; j < newIndex; j++) {
                pagelessRes.data.items[j] = pagelessRes.data.items[j + 1];
              }
            } else if (cacheIndex > newIndex) {
              for (let j = newIndex; j > cacheIndex; j--) {
                pagelessRes.data.items[j] = pagelessRes.data.items[j - 1];
              }
            }

            pagelessRes.data.items[newIndex] = character;
            updateCacheMap(Math.min(newIndex, cacheIndex), Math.max(newIndex, cacheIndex), pagelessRes.data.indices, pagelessRes.data.items);
          } else {
            // New id added
            pagelessRes.data.items.splice(newIndex, 0, character);
            updateCacheMap(newIndex, pagelessRes.data.items.length - 1, pagelessRes.data.indices, pagelessRes.data.items);
          }
        }

        pagelessRes.data.roles = voiceActorRoles;
        return pagelessRes;
      } finally {
        mutateCache(pagelessRes);
      }
    });
  }

  const [isDebug, setIsDebug] = signals.debug();

  return (
    <Show when={!pagelessCacheLoading()}>
      <Show when={modes.debug}>
        <button onClick={() => setIsDebug(s => !s)}>debug: {"" + isDebug()}</button>
      </Show>
      <CharactersPage cache={pagelessCacheData()?.data?.items || []} roles={pagelessCacheData()?.data?.roles || []} updateCache={updateCache} isDebug={isDebug()} {...props} />
    </Show>
  );
}

function CharactersPage(props) {
  const params = useParams();
  const [page, setPage] = createSignal(props.cache.length ? undefined : 1);
  const [anilistCharactersLoading, setAnilistCharactersLoading] = createSignal(false);
  const [anilistCharactersData, setAnilistCharactersData] = createSignal(undefined, { equals: false });
  let anilistCharactersFetcher, anilistCharactersController;
  createEffect(() => {
    anilistCharactersController?.abort();
    anilistCharactersController = new AbortController();

    const { id } = params;
    const p = page();
    if (!id || !p) return;

    const pagelessFetcher = createAnilistFetcher(queries.anilistCharacters, { id, page: "pageless"});
    anilistCharactersFetcher = createAnilistFetcher(queries.anilistCharacters, { id, page: p }, anilistCharactersController.signal);

    sendAnilistFetcher(anilistCharactersFetcher, {
      name: "Anilist characters",
      cache: null,
      debug: props.isDebug,
      active: (_, settings) => !settings.debug,
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === anilistCharactersFetcher.cacheKey) anilistCharactersController = null;
      },
      onStart: () => setAnilistCharactersLoading(true),
      onStop: () => setAnilistCharactersLoading(false),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== anilistCharactersFetcher.cacheKey) return;
        setAnilistCharactersData(res.data.data.Media);

        if (!res.data.data.Media.characters.edges.length) return;
        asserts.assertThruthy(hardcodedPageCount === res.data.data.Media.characters.pageInfo.perPage, "Page count is wrong");
        freshPages.add(res.data.data.Media.characters.pageInfo.currentPage);

        props.updateCache(res, voiceActorRoles(), pagelessFetcher);
        updatePage();
      }
    });
  });

  const hasNextPage = createMemo(prev => prev && !(anilistCharactersData()?.characters.pageInfo.hasNextPage === false), true);
  const [voiceActorRole, setVoiceActorRole] = createSignal({ language: "Japanese", dubGroup: null });
  const countryOfOrigin = createMemo(() => anilistCharactersData()?.countryOfOrigin || "JP");
  const voiceActorRoles = createMemo(() => {
    if (anilistCharactersData()?.characters?.pageInfo.currentPage !== 1) {
      return props.roles;
    }

    const newLanguages = new Map();
    for (const edge of anilistCharactersData().characters.edges) {
      for (const actorRole of edge.voiceActorRoles) {
        const key = actorRole.voiceActor.language + actorRole.dubGroup;
        if (newLanguages.has(key) === false) {
          newLanguages.set(key, {
            language: actorRole.voiceActor.language,
            dubGroup: actorRole.dubGroup
          });
        }
      }
    }

    return [...newLanguages.values()];
  });

  createRenderEffect(() => {
    if (voiceActorRoles().length) {
      const language = languageFromCountry(countryOfOrigin());
      const countryOfOriginIndex = voiceActorRoles().findIndex(lang => lang.language === language);
      const defaultLanguage = countryOfOriginIndex !== -1 ? countryOfOriginIndex : voiceActorRoles().findIndex(lang => lang.language === "Japanese");
      setVoiceActorRole(voiceActorRoles()[defaultLanguage === -1 ? 0 : defaultLanguage]);
    }
  });


  const freshPages = new Set();
  const triggerPage = leadingAndTrailing(debounce, num => !anilistCharactersLoading() && setPage(num), 1000);

  function updatePage() {
    const nextPage = getPageNumberByScrollPosition();
    if (nextPage) {
      triggerPage(nextPage);
    }
  }

  const hardcodedPageCount = 25;

  function getPageNumberByScrollPosition() {
    const nextPage = untrack(hasNextPage);
    const pageCount = Math.ceil(props.cache.length / hardcodedPageCount)

    if (visiblePages.has(pageCount) && !freshPages.has(pageCount)) {
      return pageCount;
    } else if (visiblePages.has(pageCount) && nextPage && freshPages.has(pageCount)) {
      return pageCount + 1;
    } else {
      const notFreshPages = [...visiblePages.difference(freshPages)].sort((a, b) => b - a);

      if (!notFreshPages.length) {
        return;
      }

      return arrayUtils.atPercent(notFreshPages, .5);
    }
  }


  const visiblePages = new Set();
  const intersectionCallback = (entries) => {
    for (const entry of entries) {
      const page = parseInt(entry.target.dataset.page);
      asserts.assertTrueOLD(Number.isInteger(page));

      if (entry.isIntersecting) {
        visiblePages.add(page);
      } else {
        visiblePages.delete(page);
      }
    }

    updatePage();
  };

  const intersectionObserver = new IntersectionObserver(intersectionCallback, { rootMargin: "500px" });
  onCleanup(() => intersectionObserver.disconnect());

  return (
    <>
      <Show when={voiceActorRoles().length}>
        <select name="roles" id="roles" onChange={e => setVoiceActorRole(voiceActorRoles()[e.target.value])} value={voiceActorRoles().findIndex(v => v === voiceActorRole())}>
          <For each={voiceActorRoles()}>{(lang, i) => (
            <option value={i()}>
              {lang.language}
              <Show when={lang.dubGroup}> ({lang.dubGroup})</Show>
            </option>
          )}</For>
        </select>
      </Show>
      <ol class="grid-column-auto-fill">
        <For each={props.cache}>{(edge, i) => (
          <Show when={edge.voiceActorRoles.filter(role =>
            role.voiceActor.language === voiceActorRole().language && role.dubGroup === voiceActorRole().dubGroup
          )}>{voiceActorRoles => (
              <Show when={voiceActorRoles().length} fallback={<CharacterCard edge={edge} page={Math.ceil((i() + 1) / hardcodedPageCount)} intersectionObserver={intersectionObserver} />}>
                <For each={voiceActorRoles()}>{actorRole => (
                  <CharacterCard edge={edge} i={i()} actorRole={actorRole} page={Math.ceil((i() + 1) / hardcodedPageCount)} intersectionObserver={intersectionObserver} />
                )}</For>
              </Show>
            )}</Show>
        )}</For>
      </ol>
      <Show when={anilistCharactersLoading() &&  page() > Math.ceil(props.cache.length / hardcodedPageCount) && props.cache.length}>
        <LoaderCircle class="new">
          <Tooltip tipPosition="bottom">Loading characters</Tooltip>
        </LoaderCircle>
      </Show>
    </>
  );
}

function StaffPage(props) {
  const [page, setPage] = createSignal(props.page === 1 ? 1 : undefined);
  const [anilistMediasStaffLoading, setAnilistMediasStaffLoading] = createSignal(undefined, { equals: false });
  const [anilistMediasStaffData, setAnilistMediasStaffData] = createSignal(undefined, { equals: false });
  let anilistMediasStaffFetcher, anilistMediasStaffController;
  createEffect(() => {
    anilistMediasStaffController?.abort();
    anilistMediasStaffController = new AbortController();
    const { id } = props;
    const p = page();

    if (!id || !p) return;

    anilistMediasStaffFetcher = createAnilistFetcher(queries.anilistStaff, { id, page: p }, anilistMediasStaffController.signal);

    sendAnilistFetcher(anilistMediasStaffFetcher, {
      name: "Anilist medias staff",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === anilistMediasStaffFetcher.cacheKey) anilistMediasStaffController = null;
      },
      onStart: () => setAnilistMediasStaffLoading(true),
      onStop: () => setAnilistMediasStaffLoading(false),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === anilistMediasStaffFetcher.cacheKey) setAnilistMediasStaffData(res.data.data.Media);
      }
    });
  });

  return (
    <>
      <Intersection onIntersection={() => setPage(props.page)}>
        <Show when={anilistMediasStaffData()?.staff.edges} fallback={<LoadingCard />}>
          <For each={anilistMediasStaffData().staff.edges}>{edge => (
            <StaffCard edge={edge}></StaffCard>
          )}</For>
        </Show>
      </Intersection>
      <Show when={!anilistMediasStaffLoading() && anilistMediasStaffData()?.staff.pageInfo.hasNextPage}>
        <StaffPage id={props.id} page={props.page + 1} />
      </Show>
    </>
  );
}

function CharacterCard(props) {
  // eslint-disable-next-line no-unassigned-vars
  let ref;
  onMount(() => props.intersectionObserver.observe(ref))

  return (
    <li ref={ref} attr:data-page={props.page} class="entities-page-entity">
      <A href={"/ani/character/" + props.edge.node.id} class="entity-left">
        <img class="entity-image" src={props.edge.node.image.large} alt="Character" />
        <div class="content">
          <p class="line-clamp">{props.edge.node.name.userPreferred}</p>
          <p>{capitalize(props.edge.role)}</p>
        </div>
      </A>
      <Show when={props.actorRole}>
        <A href={"/ani/staff/" + props.actorRole.voiceActor.id} class="entity-right">
          <div class="content">
            <Show when={props.actorRole.roleNotes} fallback={
              <p class="line-clamp">{props.actorRole.voiceActor.name.userPreferred}</p>
            }>
              <p class="line-clamp small">{props.actorRole.voiceActor.name.userPreferred}</p>
              <span class="role-notes">({props.actorRole.roleNotes})</span>
            </Show>
            <p class="voice-actor-language">{props.actorRole.voiceActor.language}</p>
          </div>
          <img class="entity-image" src={props.actorRole.voiceActor.image.large} alt="Voice actor" />
        </A>
      </Show>
    </li>
  );
}

function StaffCard(props) {
  return (
    <li class="entities-page-entity">
      <A href={"/ani/staff/" + props.edge.node.id} class="entity-left">
        <img class="entity-image" src={props.edge.node.image.large} alt="Staff" />
        <div class="content">
          <p class="line-clamp">{props.edge.node.name.userPreferred}</p>
          <p>{capitalize(props.edge.role)}</p>
        </div>
      </A>
    </li>
  );
}

function LoadingCard() {
  return (
    <For each={Array(3)}>{() => (
      <li class="entities-page-entity loading">
        <div class="entity-left">
          <div class="entity-image" />
          <div class="content">
            <p class="line-clamp" />
          </div>
        </div>
        <div class="entity-right">
          <div class="content">
            <p class="line-clamp" />
          </div>
          <div class="entity-image" />
        </div>
      </li>
    )}</For>
  );
}
