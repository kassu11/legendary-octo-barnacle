import { A, useParams } from "@solidjs/router";
import { formatTitleToUrl, numberCommas, plural } from "../../../../utils/formating.js";
import { createEffect, createSignal, For, Match, on, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { useUser } from "../../../../context/providers.js";
import { localizations, queries } from "../../../../collections/collections.js";
import { SortHeaderButtons } from "../SortHeaderButtons.scoped.jsx";
import "./Tags.scoped.css";
import { createTimer, formatMSToString } from "../../../../utils/timeUtils.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../../../utils/fetcherUtils.js";

export function StatsMediaTags() {
  const params = useParams();

  const [userStatsTime, startUserStatsTimer, stopUserStatsTimer] = createTimer();
  const [userStatsData, setUserStatsData] = createSignal(undefined, { equals: false });
  let userStatsFetcher, userStatsController;
  createEffect(() => {
    userStatsController?.abort();
    userStatsController = new AbortController();
    const { type } = params;

    if (type === localizations.anime) userStatsFetcher = createAnilistFetcher(queries.anilistGetUserAnimeTags, { name: params.name }, userStatsController.signal);
    if (type === localizations.manga) userStatsFetcher = createAnilistFetcher(queries.anilistGetUserMangaTags, { name: params.name }, userStatsController.signal);

    sendAnilistFetcher(userStatsFetcher, {
      name: "Anilist user tag stats",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === userStatsFetcher.cacheKey) userStatsController = null;
      },
      onStart: startUserStatsTimer,
      onStop: stopUserStatsTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === userStatsFetcher.cacheKey) setUserStatsData(res.data.data.User.statistics[type].tags);
      }
    });
  });

  return (
    <>
      <p>{formatMSToString(userStatsTime())}</p>
      <Show when={userStatsData()}>
        <StatsTags genres={userStatsData()} />
      </Show>
    </>
  )
}

function StatsTags(props) {
  const params = useParams();
  const { user } = useUser();
  const [mediaIds, setMediaIds] = createSignal(new Set());
  const [state, setState] = createSignal("count");
  const [store, setStore] = createStore({});

  let mediaFetcher, mediaController;
  createEffect(() => {
    const ids = [...mediaIds()];
    if (!ids.length) return;
    mediaController?.abort();
    mediaController = new AbortController();

    mediaFetcher = createAnilistFetcher(queries.anilistGetMediasWithIds(ids.length), { id_in: ids }, mediaController.signal);

    sendAnilistFetcher(mediaFetcher, {
      name: "Anilist media ids",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === mediaFetcher.cacheKey) mediaController = null;
      },
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== mediaFetcher.cacheKey) return;
        Object.values(res.data.data).forEach(page => {
          page.media.forEach(m => {
            setStore(m.id, m);
          });
        });
      }
    });
  });

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
              <Cards store={store} setStore={setStore} mediaIds={genre.mediaIds} allMediaIds={mediaIds()} />
            </div>
          </li>
        )}</For>
      </ol>
    </section>
  );
}

function Cards(props) {
  const params = useParams();
  const [mediaIds, setMediaIds] = createSignal(new Set());

  let mediaFetcher, mediaController;
  createEffect(() => {
    const ids = [...mediaIds()];
    if (!ids.length) return;
    mediaController?.abort();
    mediaController = new AbortController();

    mediaFetcher = createAnilistFetcher(queries.anilistGetMediasWithIds(ids.length), { id_in: ids }, mediaController.signal);

    sendAnilistFetcher(mediaFetcher, {
      name: "Anilist media ids",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === mediaFetcher.cacheKey) mediaController = null;
      },
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== mediaFetcher.cacheKey) return;
        Object.values(res.data.data).forEach(page => {
          page.media.forEach(m => {
            props.setStore(m.id, m);
          });
        });
      }
    });
  });

  let fetchNewCards = false;
  createEffect(on(() => props.mediaIds, () => {
    fetchNewCards = true;
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
