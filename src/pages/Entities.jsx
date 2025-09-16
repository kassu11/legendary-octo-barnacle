import { A, useParams } from "@solidjs/router";
import api from "../utils/api";
import { createEffect, createMemo, createRenderEffect, createSignal, Match, on, onCleanup, onMount, Show, untrack } from "solid-js";
import "./Entities.scss";
import { capitalize, languageFromCountry } from "../utils/formating";
import { DoomScroll } from "../components/utils/DoomScroll";
import { useAuthentication } from "../context/providers";
import { asserts, fetchers, fetcherSenders, modes, signals } from "../collections/collections";
import { arrayUtils, fetcherSenderUtils } from "../utils/utils";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { LoaderCircle } from "../components/LoaderCircle";
import { Tooltip } from "../components/Tooltips";

export function AnimeCharacters() {
  const [idMal, setIdMal] = createSignal();
  const [malCharacters] = api.myAnimeList.animeCharactersById(idMal);

  return (
    <Entities type="CHARACTER" setIdMal={setIdMal} malData={malCharacters} />
  );
}

export function MangaCharacters() {
  const [idMal, setIdMal] = createSignal();
  const [malCharacters] = api.myAnimeList.mangaCharactersById(idMal);

  return (
    <Entities type="CHARACTER" setIdMal={setIdMal} malData={malCharacters} />
  );
}

export function AnimeStaff() {
  const [idMal, setIdMal] = createSignal();
  const [malStaff] = api.myAnimeList.animeStaffById(idMal);

  return (
    <Entities type="STAFF" setIdMal={setIdMal} malData={malStaff} />
  );
}

export function MangaStaff() {
  const [idMal, setIdMal] = createSignal();
  const [malStaff] = api.myAnimeList.mangaStaffById(idMal);

  return (
    <Entities type="STAFF" setIdMal={setIdMal} malData={malStaff} />
  );
}


function Entities(props) {
  const params = useParams();
  const [languages, setLanguages] = createSignal([]);
  const [language, setLanguage] = createSignal({language: "Japanese", dubGroup: null});
  const [countryOfOrigin, setCountryOfOrigin] = createSignal("JP");

  if (props.type === "CHARACTER") {
    createRenderEffect(() => {
      if (languages().length) {
        const language = languageFromCountry(countryOfOrigin());
        const countryOfOriginIndex = languages().findIndex(lang => lang.language === language);
        const defaultLanguage = countryOfOriginIndex !== -1 ? countryOfOriginIndex : languages().findIndex(lang => lang.language === "Japanese");
        setLanguage(languages()[defaultLanguage === -1 ? 0 : defaultLanguage]);
      }
    });
  }

  return (
    <div class="entities-page">
      <Show when={languages().length}>
        <select onChange={e => setLanguage(languages()[e.target.value])} value={languages().findIndex(v => v === language())}>
          <For each={languages()}>{(lang, i) => (
            <option value={i()}>
              {lang.language}
              <Show when={lang.dubGroup}> ({lang.dubGroup})</Show>
            </option>
          )}</For>
        </select>
      </Show>
      <Switch>
        <Match when={props.type === "CHARACTER"}>
          <CharactersReel
            id={params.id}
            page={1}
            setLanguages={setLanguages}
            setCountryOfOrigin={setCountryOfOrigin}
            language={language().language}
            dubGroup={language().dubGroup}
            setIdMal={props.setIdMal}
          />
        </Match>
        <Match when={props.type === "STAFF"}>
          <ol class="grid-column-auto-fill">
            <StaffPage
              id={params.id}
              page={1}
              setIdMal={props.setIdMal}
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
  const { accessToken } = useAuthentication();
  const pagelessFetcher = fetcherSenderUtils.createFetcher(fetchers.anilist.charactersPageless, accessToken, () => props.id);
  const [pagelessCacheData, { mutateBoth }] = fetcherSenders.sendWithNullUpdates(pagelessFetcher);

  const updateCache = (apiResponse, voiceActorRoles) => {
    if (!apiResponse?.data?.characters.edges?.length) {
      return;
    }

    mutateBoth(api => {
      if (!api?.data?.items?.length) {
        api.data = {
          items: apiResponse.data.characters.edges,
          indices: updateCacheMap(0, apiResponse.data.characters.edges.length - 1, {}, apiResponse.data.characters.edges),
          roles: voiceActorRoles,
        };
        return api;
      }

      for (let i = 0; i < apiResponse.data.characters.edges.length; i++) {
        const character = apiResponse.data.characters.edges[i];
        const newIndex = i + (apiResponse.data.characters.pageInfo.currentPage - 1) * apiResponse.data.characters.pageInfo.perPage;
        const cacheIndex = api.data.indices[character.id];
        if (character.id in api.data.indices) {
          if (cacheIndex < newIndex) {
            for (let j = cacheIndex; j < newIndex; j++) {
              api.data.items[j] = api.data.items[j + 1];
            }
          } else if (cacheIndex > newIndex) {
            for (let j = newIndex; j > cacheIndex; j--) {
              api.data.items[j] = api.data.items[j - 1];
            }
          }

          api.data.items[newIndex] = character;
          updateCacheMap(Math.min(newIndex, cacheIndex), Math.max(newIndex, cacheIndex), api.data.indices, api.data.items);
        } else {
          // New id added
          api.data.items.splice(newIndex, 0, character);
          updateCacheMap(newIndex, api.data.items.length - 1, api.data.indices, api.data.items);
        }
      }

      api.data.roles = voiceActorRoles;
      return api;
    });
  }

  const [isDebug, setIsDebug] = signals.debug();

  return (
    <Show when={!pagelessCacheData.loading}>
      <Show when={modes.debug}>
        <button onClick={() => setIsDebug(s => !s)}>debug: {"" + isDebug()}</button>
      </Show>
      <CharactersPage cache={pagelessCacheData()?.data?.items || []} roles={pagelessCacheData()?.data?.roles || []} updateCache={updateCache} isDebug={isDebug} {...props} />
    </Show>
  );
}

function CharactersPage(props) {
  const { accessToken } = useAuthentication();
  const [page, setPage] = createSignal(props.cache.length ? undefined : 1);
  const [hasNextPage, setHasNextPage] = createSignal(true);
  const fetcher = fetcherSenderUtils.createFetcher(fetchers.anilist.charactersPage, accessToken, props.id, page);
  const [charactersData] = fetcherSenders.sendWithDisabledSignal(props.isDebug, fetcher);

  const [voiceActorRole, setVoiceActorRole] = createSignal({ language: "Japanese", dubGroup: null });
  const countryOfOrigin = createMemo(() => charactersData()?.data?.countryOfOrigin || "JP");
  const voiceActorRoles = createMemo(() => {
    if (charactersData()?.data?.characters?.pageInfo.currentPage !== 1) {
      return props.roles;
    }

    const newLanguages = new Map();
    for (const edge of charactersData().data.characters.edges) {
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
  const triggerPage = leadingAndTrailing(debounce, num => !charactersData.loading && setPage(num), 1000);

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

    if (visiblePages.has(pageCount) && nextPage) {
      return pageCount + 1;
    } else {
      const notFreshPages = [...visiblePages.difference(freshPages)].sort((a, b) => b - a);

      if (!notFreshPages.length) {
        return;
      }

      return arrayUtils.atPercent(notFreshPages, .5);
    }
  }

  createEffect(on(charactersData, apiResponse => {
    if (!apiResponse?.data?.characters.edges.length) {
      return;
    }

    asserts.assertTrue(hardcodedPageCount === apiResponse.data.characters.pageInfo.perPage, "Page count is wrong");

    freshPages.add(apiResponse.data.characters.pageInfo.currentPage);
    setHasNextPage(apiResponse.data.characters.pageInfo.hasNextPage);


    props.updateCache(apiResponse, voiceActorRoles());
    updatePage();
  }));

  const visiblePages = new Set();
  const intersectionCallback = (entries) => {
    for (const entry of entries) {
      const page = parseInt(entry.target.dataset.page);
      asserts.assertTrue(Number.isInteger(page));

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
      <Show when={charactersData.loading && page() > props.cache.length / hardcodedPageCount && props.cache.length}>
        <LoaderCircle class="new">
          <Tooltip tipPosition="bottom">Loading characters</Tooltip>
        </LoaderCircle>
      </Show>
    </>
  );
}

function StaffPage(props) {
  const [page, setPage] = createSignal(props.page === 1 ? 1 : undefined);
  const { accessToken } = useAuthentication();
  const [staff] = api.anilist.allMediaStaff(() => props.id, page, accessToken);

  if (props.page === 1) {
    createEffect(() => {
      if (!staff()) {
        return;
      }

      props.setIdMal(staff().data.idMal ?? undefined);
    });
  }

  return (
    <DoomScroll onIntersection={() => setPage(props.page)} fetchResponse={staff} loadingElement={<LoadingCard />} loading={props.loading}>{fetchCooldown => (
      <>
        <For each={staff().data.staff.edges}>{edge => (
          <StaffCard edge={edge}></StaffCard>
        )}</For>
        <Show when={staff().data.staff.pageInfo.hasNextPage}>
          <Show when={fetchCooldown === false} fallback="Fetch cooldown">
            <StaffPage
              id={props.id}
              page={props.page + 1}
              loading={staff.loading}
             /> 
          </Show>
        </Show>
      </>
    )}</DoomScroll>
  );
}

function CharacterCard(props) {
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
