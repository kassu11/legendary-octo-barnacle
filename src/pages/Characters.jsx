import { A, useParams } from "@solidjs/router";
import api from "../utils/api";
import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
import "./Characters.scss";

function Characters() {
  const params = useParams();
  const [languages, setLanguages] = createSignal([]);
  const [language, setLanguage] = createSignal({language: "Japanese", dubGroup: null});
  
  createEffect(() => {
    console.log(languages());
  });

  return (
    <>
      <select onChange={e => setLanguage(languages()[e.target.value])}>
        <For each={languages()}>{(lang, i) => (
          <option value={i()}>
            {lang.language}
            <Show when={lang.dubGroup}> ({lang.dubGroup})</Show>
          </option>
        )}</For>
      </select>
      <ol class="character-container">
        <CharactersPage id={params.id} page={1} setLanguages={setLanguages} language={language().language} dubGroup={language().dubGroup} />
      </ol>
    </>
  )
}

function CharactersPage(props) {
  const [page, setPage] = createSignal(props.page === 1 ? 1 : undefined);
  const [characters] = api.anilist.characters(() => props.id, page);
  const [loadingAnimation, setLoadingAnimation] = createSignal(false);
  const newLanguages = new Map();
  let loading;

  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0) return;

    intersectionObserver.unobserve(entries[0].target);
    window.addEventListener("scroll", () => {
      setLoadingAnimation(true);
      setPage(props.page);
    }, {once: true});
  });

  onMount(() => {
    if (props.page > 1) {
      intersectionObserver.observe(loading);
    }
  });

  onCleanup(() => {
    intersectionObserver.disconnect();
  });

  return (
    <Switch fallback={<div ref={loading}>loading...</div>}>
      <Match when={characters()}>
        {console.log(characters())}
        <For each={characters().data.data.Media.characters.edges}>{edge => {
          let filterNotFound = true;
          return (
            <>
              <Show when={edge.voiceActorRoles.length}>
                <For each={edge.voiceActorRoles}>{actorRole => {
                  if (props.page === 1) {
                    const key = actorRole.voiceActor.language + actorRole.dubGroup;
                    if (newLanguages.has(key) === false) {
                      newLanguages.set(key, { language: actorRole.voiceActor.language, dubGroup: actorRole.dubGroup });
                    }
                  }
                  return (
                    <Show when={actorRole.voiceActor.language === props.language && actorRole.dubGroup === props.dubGroup}>
                      {filterNotFound = false}
                      <Card edge={edge} actorRole={actorRole} />
                    </Show>
                  )}}</For>
              </Show>
              <Show when={filterNotFound} children={<Card edge={edge} />} />
            </>
          )
        }}</For>
        {props.page === 1 && props.setLanguages([...newLanguages.values()]) && true}
        <Show when={characters().data.data.Media.characters.pageInfo.hasNextPage}>
          <CharactersPage id={props.id} page={props.page + 1} language={props.language} dubGroup={props.dubGroup} />
        </Show>
      </Match>
      <Match when={loadingAnimation()}>
        <For each={Array(3)}>{() => (
          <LoadingCard />
        )}</For>
      </Match>
    </Switch>
  );
}

function Card(props) {
  return (
    <li class="character">
      <A href={"/ani/character/" + props.edge.node.id} class="character-left">
        <img class="character-image" src={props.edge.node.image.large} alt="Character" />
        <div class="content">
          <p class="line-clamp">{props.edge.node.name.userPreferred}</p>
          <p>{props.edge.role}</p>
        </div>
      </A>
      <Show when={props.actorRole}>
        <A href={"/ani/staff/" + props.actorRole.voiceActor.id} class="character-right">
          <div class="content">
            <p class="line-clamp">{props.actorRole.voiceActor.name.userPreferred}</p>
            <p>{props.actorRole.voiceActor.language}</p>
          </div>
          <img class="character-image" src={props.actorRole.voiceActor.image.large} alt="Voice actor" />
        </A>
      </Show>
    </li>
  );
}

function LoadingCard() {
  return (
    <li class="character loading">
      <div class="character-left">
        <div class="character-image" />
        <div class="content">
          <p class="line-clamp" />
        </div>
      </div>
      <div class="character-right">
        <div class="content">
          <p class="line-clamp" />
        </div>
        <div class="character-image" />
      </div>
    </li>
  );
}

export default Characters
