import { A, useParams } from "@solidjs/router";
import { useAuthentication } from "../../../context/AuthenticationContext";
import api from "../../../utils/api";
import { formatTitleToUrl, numberCommas, plural } from "../../../utils/formating";
import { createEffect, createSignal, on } from "solid-js";
import "./Genres.scss";
import { createStore, reconcile } from "solid-js/store";

export function StatsAnimeStaff() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [userStats] = api.anilist.userAnimeStaff(() => params.name, accessToken);

  return (
    <Show when={userStats()}>
      <StatsStaff genres={userStats().data} />
    </Show>
  )
}
export function StatsMangaStaff() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [userStats] = api.anilist.userMangaStaff(() => params.name, accessToken);

  return (
    <Show when={userStats()}>
      <StatsStaff genres={userStats().data} />
    </Show>
  )
}

function StatsStaff(props) {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [mediaIds, setMediaIds] = createSignal(new Set());
  const [state, setState] = createSignal("count");
  const [mediaById, { mutate }] = api.anilist.mediaIds(() => mediaIds().size > 0 ? [...mediaIds()] : undefined, accessToken);
  const [store, setStore] = createStore({});

  createEffect(on(() => props.genres, genres => {
    setStore(reconcile({}));
    setMediaIds(new Set(genres.map(genre => genre.mediaIds.slice(0, 6)).flat()));
  }));

  createEffect(on(mediaById, medias => {
    medias?.data.forEach(media => setStore(media.id, media));
  }));

  return (
    <section class="user-profile-stats-genres">
      <div class="flex-space-between">
        <h2>Staff</h2>
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
        <For each={props.genres.sort((a, b) => b[state()] - a[state()] || a.staff.name.userPreferred.localeCompare(b.staff.name.userPreferred))}>{(genre, i) => (
          <li class="item">
            <div class="flex-space-between staff-name-wrapper">
              <h2>
                <A href={"/ani/staff/" + genre.staff.id + "/" + formatTitleToUrl(genre.staff.name.userPreferred)}>
                  {genre.staff.name.userPreferred}
                </A>
              </h2>
              <p class="ranking">#{i() + 1}</p>
            </div>
            <div class="inline-container">
              <div class="main-content">
                <img class="staff-cover" src={genre.staff.image.large} alt="Staff profile cover" />
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
                  <Cards store={store} setStore={setStore} mediaIds={genre.mediaIds} allMediaIds={mediaIds()} mutate={mutate}/>
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
  const [mediaById] = api.anilist.mediaIds(() => mediaIds().size > 0 ? [...mediaIds()] : undefined, accessToken);

  let fetchNewCards = false;
  createEffect(on(() => props.mediaIds, () => {
    fetchNewCards = true;
  }));

  createEffect(on(mediaById, medias => {
    medias?.data.forEach(media => props.setStore(media.id, media));
  }));

  return (
    <div class="inline-container">
      <ol class="grid-reel-auto-fill" onScroll={() => {
        if (!fetchNewCards) {
          return;
        }
        fetchNewCards = false;

        const set = new Set(props.mediaIds);
        const newFetchData = set.difference(props.allMediaIds);
        newFetchData.forEach(id => props.allMediaIds.add(id));
        setMediaIds(newFetchData);
      }}>
        <For each={props.mediaIds}>{mediaId => (
          <li>
            <A href={"/" + params.type + "/" + mediaId + "/" + formatTitleToUrl(props.store[mediaId]?.title.userPreferred || "")}>
              <Show when={props.store[mediaId]} fallback={<div class="cover-image"> </div>}>
                <img class="cover-image" src={props.store[mediaId].coverImage.large} alt="Media cover" />
              </Show>
            </A>
          </li>
        )}</For>
      </ol>
    </div>
  );
}
