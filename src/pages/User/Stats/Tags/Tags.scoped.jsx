import { A, useParams } from "@solidjs/router";
import api from "../../../../utils/api.js";
import { formatTitleToUrl, numberCommas, plural } from "../../../../utils/formating.js";
import {createEffect, createSignal, For, Match, on, Show, Switch} from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { useAuthentication, useUser } from "../../../../context/providers.js";
import { fetcherSenderUtils, fetcherUtils } from "../../../../utils/utils.js";
import { fetchers, fetcherSenders } from "../../../../collections/collections.js";
import {GenresCardStats} from "../Genres/GenresCardStats.scoped.jsx";
import {SortHeaderButtons} from "../SortHeaderButtons.scoped.jsx";

export function StatsAnimeTags() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [userStats] = api.anilist.userAnimeTags(() => params.name, accessToken);

  return (
    <Show when={userStats()}>
      <StatsTags genres={userStats().data} />
    </Show>
  )
}
export function StatsMangaTags() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [userStats] = api.anilist.userMangaTags(() => params.name, accessToken);

  return (
    <Show when={userStats()}>
      <StatsTags genres={userStats().data} />
    </Show>
  )
}

function StatsTags(props) {
  const params = useParams();
  const { user } = useUser();
  const { accessToken } = useAuthentication();
  const [mediaIds, setMediaIds] = createSignal(new Set());
  const [state, setState] = createSignal("count");
  const fetcher = fetcherSenderUtils.createFetcher(fetchers.anilist.getMediasWithIds, accessToken, () => ({ id_in: [...mediaIds()] }));
  const [mediaById, { mutate }] = fetcherSenders.sendWithNullUpdates(fetcher);
  const [store, setStore] = createStore({});

  createEffect(on(() => props.genres, genres => {
    setMediaIds(current => {
      const newSet = new Set(genres.map(genre => genre.mediaIds.slice(0, 6)).flat())
      // This works basically as a store
      // When props.genres update check if the new set has anything that the old set did not have
      // If so update, otherwise don't
      // This is a quick fix https://github.com/kassu11/legendary-octo-barnacle/issues/235
      // Remake this whole component when you have time :P
      if (newSet.difference(current).size) {
        return newSet;
      }

      return current;
    });
  }));

  createEffect(on(mediaById, medias => {
    medias?.data.forEach(media => setStore(media.id, media));
  }));

  return (
    <section class="user-profile-stats-genres">
      <div class="flex-space-between">
        <h2>Tags</h2>
        <SortHeaderButtons setState={ setState } />
      </div>
      <ol class="grid-column-auto-fill">
        <For each={props.genres.sort((a, b) => b[state()] - a[state()] || a.tag.name.localeCompare(b.tag.name))}>{(genre, i) => (
          <li class="item">
            <div class="header">
              <div class="flex-space-between">
                <h2>
                  <A href={"/search/" + params.type + "?onList=false&tag=" + genre.tag.name}>
                    {genre.tag.name}
                  </A>
                </h2>
                <p class="ranking">#{i() + 1}</p>
              </div>
              <ol class="flex-space-between">
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
            </div>
            <div class="wrapper tags">
              <div className="flex-space-between">
                <p>User {params.type}</p>
                <A href={"/user/" + user().name + "/" + params.type + "?tag=" + genre.tag.name}>Show all</A>
              </div>
              <Cards store={store} setStore={setStore} mediaIds={genre.mediaIds} allMediaIds={mediaIds()} mutate={mutate}/>
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
  const fetcher = fetcherSenderUtils.createFetcher(fetchers.anilist.getMediasWithIds, accessToken, () => ({ id_in: [...mediaIds()] }));
  const [mediaById] = fetcherSenders.sendWithNullUpdates(fetcher);

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
            <A href={"/ani/" + params.type + "/" + mediaId + "/" + formatTitleToUrl(props.store[mediaId]?.title.userPreferred || "")}>
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
