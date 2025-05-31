import { A, useParams } from "@solidjs/router";
import { useAuthentication } from "../../../context/AuthenticationContext";
import api from "../../../utils/api";
import { formatTitleToUrl, numberCommas, plural } from "../../../utils/formating";
import { createEffect, createSignal, on } from "solid-js";
import "./Genres.scss";
import { createStore, reconcile } from "solid-js/store";

export function StatsAnimeVoiceActors() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [userStats] = api.anilist.userAnimeVoiceActors(() => params.name, accessToken);

  return (
    <Show when={userStats()}>
      <StatsVoiceActors genres={userStats().data} />
    </Show>
  )
}

function StatsVoiceActors(props) {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [mediaIds, setMediaIds] = createSignal(new Set());
  const [characterIds, setCharacterIds] = createSignal(new Set());
  const [state, setState] = createSignal("count");
  const [pageType, setPageType] = createSignal("media");
  const [mediaById] = api.anilist.mediaIds(() => mediaIds().size > 0 && pageType() === "media" ? [...mediaIds()] : undefined, accessToken);
  const [characterById] = api.anilist.characterIds(() => characterIds().size > 0 && pageType() === "characters" ? [...characterIds()] : undefined, accessToken);
  const [mediaStore, setMediaStore] = createStore({});
  const [characterStore, setCharacterStore] = createStore({});

  createEffect(on(() => props.genres, genres => {
    setMediaStore(reconcile({}));
    setCharacterStore(reconcile({}));
    setMediaIds(new Set(genres.map(genre => genre.mediaIds.slice(0, 6)).flat()));
    setCharacterIds(new Set(genres.map(genre => genre.characterIds.slice(0, 6)).flat()));
  }));

  createEffect(on(mediaById, medias => {
    medias?.data.forEach(media => setMediaStore(media.id, media));
  }));

  createEffect(on(characterById, characters => {
    characters?.data.forEach(character => setCharacterStore(character.id, character));
  }));

  return (
    <section class="user-profile-stats-genres">
      <div class="flex-space-between">
        <h2>Voice actors</h2>
        <div>
          <button onClick={() => setPageType("media")}>Anime</button>
          <button onClick={() => setPageType("characters")}>Characters</button>
        </div>
        <div>
          <button onClick={() => setState("count")}>Count</button>
          <Switch>
            <Match when={params.type === "anime"}>
              <button onClick={() => setState("minutesWatched")}>Time Watched</button>
            </Match>
            <Match when={params.type === "manga"}>
              <button onClick={() => setState("chaptersRead")}>Chapters Read</button>
            </Match>
          </Switch>
          <button onClick={() => setState("meanScore")}>Mean Score</button>
        </div>
      </div>
      <ol class="grid-column-auto-fill staff">
        <For each={props.genres.sort((a, b) => b[state()] - a[state()] || a.voiceActor.name.userPreferred.localeCompare(b.voiceActor.name.userPreferred))}>{(genre, i) => (
          <li class="item">
            <div class="flex-space-between staff-name-wrapper">
              <h2>
                <A href={"/ani/staff/" + genre.voiceActor.id + "/" + formatTitleToUrl(genre.voiceActor.name.userPreferred)}>
                  {genre.voiceActor.name.userPreferred}
                </A>
              </h2>
              <p class="ranking">#{i() + 1}</p>
            </div>
            <div class="inline-container">
              <div class="main-content">
                <img class="staff-cover" src={genre.voiceActor.image.large} alt="Staff profile cover" />
                <ol class="flex-space-between stats">
                  <li>
                    <p class="value">{numberCommas(genre.count || 0)}</p>
                    <p class="title">Count</p>
                  </li>
                  <li>
                    <p class="value">{(genre.meanScore || 0)}</p>
                    <p class="title">Mean score</p>
                  </li>
                  <li>
                    <Switch>
                      <Match when={params.type === "anime"}>
                        <p class="value">
                          <Show when={Math.floor(genre.minutesWatched / 60 / 24)}>{days => <>{numberCommas(days())} day{plural(days())} </>}</Show>
                          <Show when={Math.floor(genre.minutesWatched / 60 % 24)}>{hours => <>{numberCommas(hours())} hour{plural(hours())} </>}</Show>
                          <Show when={genre.minutesWatched < 60}>{genre.minutesWatched} minute{plural(genre.minutesWatched)}</Show>
                        </p>
                        <p class="title">Time watched</p>
                      </Match>
                      <Match when={params.type === "manga"}>
                        <p class="value">{numberCommas(genre.chaptersRead)}</p>
                        <p class="title">Chapters read</p>
                      </Match>
                    </Switch>
                  </li>
                </ol>
                <div class="wrapper">
                  <Cards
                    mediaStore={mediaStore}
                    setMediaStore={setMediaStore}
                    characterStore={characterStore}
                    setCharacterStore={setCharacterStore}
                    pageType={pageType()}
                    mediaIds={genre.mediaIds}
                    allMediaIds={mediaIds()}
                    characterIds={genre.characterIds}
                    allCharacterIds={characterIds()}
                  />
                </div>
              </div>
            </div>
          </li>
        )}</For>
      </ol>
    </section>
  );
}

function Cards(props) {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [mediaIds, setMediaIds] = createSignal(new Set());
  const [characterIds, setCharacterIds] = createSignal(new Set());
  const [mediaById] = api.anilist.mediaIds(() => mediaIds().size > 0 ? [...mediaIds()] : undefined, accessToken);
  const [characterById] = api.anilist.characterIds(() => characterIds().size > 0 ? [...characterIds()] : undefined, accessToken);
  let gridReel;

  let fetchNewCards = false;
  createEffect(() => {
    props.mediaIds;
    props.characterIds;
    fetchNewCards = true;
  });
  let preventScrolling = false;
  createEffect(() => {
    props.pageType;
    preventScrolling = true;
    fetchNewCards = true;
    gridReel.scrollLeft = 0;
  });

  createEffect(on(mediaById, medias => {
    medias?.data.forEach(media => props.setMediaStore(media.id, media));
  }));

  createEffect(on(characterById, characters => {
    characters?.data.forEach(character => props.setCharacterStore(character.id, character));
  }));

  return (
    <div class="inline-container">
      <ol class="grid-reel-auto-fill" ref={gridReel} onScroll={() => {
        if (!fetchNewCards) {
          return;
        }
        if (preventScrolling) {
          preventScrolling = false;
          return;
        }
        fetchNewCards = false;

        if (props.pageType === "media") {
          const set = new Set(props.mediaIds);
          const newFetchData = set.difference(props.allMediaIds);
          newFetchData.forEach(id => props.allMediaIds.add(id));
          setMediaIds(newFetchData);
        } else {
          const set = new Set(props.characterIds);
          const newFetchData = set.difference(props.allCharacterIds);
          newFetchData.forEach(id => props.allCharacterIds.add(id));
          setCharacterIds(newFetchData);
        }
      }}>
        <Switch>
          <Match when={props.pageType === "media"}>
            <For each={props.mediaIds}>{mediaId => (
              <li>
                <A href={"/" + params.type + "/" + mediaId + "/" + formatTitleToUrl(props.mediaStore[mediaId]?.title.userPreferred || "")}>
                  <Show when={props.mediaStore[mediaId]} fallback={<div class="cover-image"> </div>}>
                    <img class="cover-image" src={props.mediaStore[mediaId].coverImage.large} alt="Media cover" />
                  </Show>
                </A>
              </li>
            )}</For>
          </Match>
          <Match when={props.pageType === "characters"}>
            <For each={props.characterIds}>{characterId => (
              <li>
                <A href={"/ani/character/" + characterId + "/" + formatTitleToUrl(props.characterStore[characterId]?.name.userPreferred || "")}>
                  <Show when={props.characterStore[characterId]} fallback={<div class="cover-image"> </div>}>
                    <img class="cover-image" src={props.characterStore[characterId].image.large} alt="Character cover" />
                  </Show>
                </A>
              </li>
            )}</For>
          </Match>
        </Switch>
      </ol>
    </div>
  );
}
