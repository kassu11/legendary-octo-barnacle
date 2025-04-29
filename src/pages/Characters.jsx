import { A, useParams } from "@solidjs/router";
import api from "../utils/api";
import { batch, createEffect, createSignal, Match, onCleanup, onMount, Show } from "solid-js";
import "./Characters.scss";
import { capitalize, languageFromCountry } from "../utils/formating";
import { DoomScroll } from "../components/utils/DoomScroll";

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
    createEffect(() => {
      if (languages().length) {
        const language = languageFromCountry(countryOfOrigin());
        const countryOfOriginIndex = languages().findIndex(lang => lang.language === language);
        const defaultLanguage = countryOfOriginIndex !== -1 ? countryOfOriginIndex : languages().findIndex(lang => lang.language === "Japanese");
        setLanguage(languages()[defaultLanguage === -1 ? 0 : defaultLanguage]);
      }
    });
  }

  createEffect(() => {
    console.log("malData:", props.malData());
  });
  
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
          <ol class="entities-page-grid">
            <CharactersPage 
              id={params.id} 
              page={1} 
              setLanguages={setLanguages} 
              setCountryOfOrigin={setCountryOfOrigin} 
              language={language().language} 
              dubGroup={language().dubGroup} 
              setIdMal={props.setIdMal} 
            />
          </ol>
        </Match>
        <Match when={props.type === "STAFF"}>
          <ol class="entities-page-grid">
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

function CharactersPage(props) {
  const [page, setPage] = createSignal(props.page === 1 ? 1 : undefined);
  const [characters] = api.anilist.characters(() => props.id, page);

  createEffect(() => {
    if (props.page !== 1 || characters() == null) {
      return;
    }

    const newLanguages = new Map();
    for(const edge of characters().data.characters.edges) {
      for(const actorRole of edge.voiceActorRoles) {
        const key = actorRole.voiceActor.language + actorRole.dubGroup;
        if (newLanguages.has(key) === false) {
          newLanguages.set(key, { 
            language: actorRole.voiceActor.language, 
            dubGroup: actorRole.dubGroup 
          });
        }
      }
    }

    batch(() => {
      props.setCountryOfOrigin(characters().data.countryOfOrigin || "JP");
      props.setLanguages([...newLanguages.values()]);
      props.setIdMal(characters().data.idMal ?? undefined);
    });
  });

  return (
    <DoomScroll onIntersection={() => setPage(props.page)} fetchResponse={characters} loadingElement={<LoadingCard />} loading={props.loading}>{fetchCooldown => (
      <>
        <For each={characters().data.characters.edges}>{edge => (
          <Show when={edge.voiceActorRoles.filter(role => 
            role.voiceActor.language === props.language && role.dubGroup === props.dubGroup
          )}>{voiceActorRoles => (
              <Show when={voiceActorRoles().length} fallback={<CharacterCard edge={edge}></CharacterCard>}>
                <For each={voiceActorRoles()}>{actorRole => (
                  <CharacterCard edge={edge} actorRole={actorRole} />
                )}</For>
              </Show>
            )}</Show>
        )}</For>
        <Show when={characters().data.characters.pageInfo.hasNextPage}>
          <Show when={fetchCooldown === false} fallback="Fetch cooldown">
            <CharactersPage 
              id={props.id} 
              page={props.page + 1} 
              language={props.language} 
              dubGroup={props.dubGroup} 
              loading={characters.loading} 
            />
          </Show>
        </Show>
      </>
    )}</DoomScroll>
  );
}

function StaffPage(props) {
  const [page, setPage] = createSignal(props.page === 1 ? 1 : undefined);
  const [staff] = api.anilist.allMediaStaff(() => props.id, page);

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
  return (
    <li class="entities-page-entity">
      <A href={"/ani/character/" + props.edge.node.id} class="entity-left">
        <img class="entity-image" src={props.edge.node.image.large} alt="Character" />
        <div class="content">
          <p class="line-clamp-3">{props.edge.node.name.userPreferred}</p>
          <p>{capitalize(props.edge.role)}</p>
        </div>
      </A>
      <Show when={props.actorRole}>
        <A href={"/ani/staff/" + props.actorRole.voiceActor.id} class="entity-right">
          <div class="content">
            <Show when={props.actorRole.roleNotes} fallback={
              <p class="line-clamp-3">{props.actorRole.voiceActor.name.userPreferred}</p>
            }>
              <p class="line-clamp-2">{props.actorRole.voiceActor.name.userPreferred}<br/></p>
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
          <p class="line-clamp-3">{props.edge.node.name.userPreferred}</p>
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
