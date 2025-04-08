import { A, useParams } from "@solidjs/router";
import api from "../utils/api";
import { createSignal, onCleanup, onMount, Show } from "solid-js";
import "./Characters.scss";

function Characters() {
  const params = useParams();

  return (
    <ol class="character-container">
      <CharactersPage id={params.id} page={1}/>
    </ol>
  )
}

function CharactersPage(props) {
  const [page, setPage] = createSignal(props.page === 1 ? 1 : undefined);
  const [characters] = api.anilist.characters(() => props.id, page);
  const [loadingAnimation, setLoadingAnimation] = createSignal(false);
  const language = "Japanese";
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
                <For each={edge.voiceActorRoles}>{actorRole => (
                  <>
                    <Show when={actorRole.voiceActor.language === language}>
                      {filterNotFound = false}
                      <Card edge={edge} actorRole={actorRole} />
                    </Show>
                  </>
                )}</For>
              </Show>
              <Show when={filterNotFound} children={<Card edge={edge} />} />
            </>
          )
        }}</For>
        <Show when={characters().data.data.Media.characters.pageInfo.hasNextPage}>
          <CharactersPage id={props.id} page={props.page + 1}/>
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
