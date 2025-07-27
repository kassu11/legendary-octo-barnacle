import api from "../utils/api";
import { Show, createSignal, createEffect, onMount, createResource, on, For, onCleanup, batch } from "solid-js";
import style from "./Home.module.scss";
import { ActivityCard } from "../components/Activity.jsx";
import { leadingAndTrailingDebounce } from "../utils/scheduled.js";
import { assert } from "../utils/assert.js";
import { formatTitleToUrl } from "../utils/formating.js";
import { A } from "@solidjs/router";
import { useAuthentication } from "../context/providers.js";
import { createAnilistPagelessSignalFetcher, createSignalFetcher } from "../utils/fetchers/fetcherUtils.js";
import { getActivity, searchMedia } from "../utils/fetchers/anilist.js";
import { send2 } from "../utils/fetchers/Fetcher.js";
import { createStore, produce, reconcile, unwrap } from "solid-js/store";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { binarySearchFindIndex } from "../utils/arrays.js";
import { setProperty } from "solid-js/web";

function Home() {
  const { accessToken, authUserData } = useAuthentication();

  document.title = "Home - LOB";

  return (
    <Show when={authUserData()}>
      <div class={style.container}>
        <CurrentWatchingMedia token={accessToken()} userId={authUserData().data.id} />
        <Activity token={accessToken()}/>
      </div>
    </Show>
  )
}

function Activity() {
  const loadMoreButton = <button>Load more</button>;
  const [activityType, setActivityType] = createSignal(undefined);
  const [isFollowing, setIsFollowing] = createSignal(true);
  const [hasReplies, setHasReplies] = createSignal(undefined);
  const [variables, setVariables] = createSignal({
    "isFollowing": true,
  });

  createEffect(() => {
    setVariables(current => {
      const base = {
        ...current,
        activityType: activityType(),
        isFollowing: isFollowing(),
        hasReplies: hasReplies(),
      };

      for (const key of Object.keys(base)) {
        if (base[key] !== current[key]) {
          return base;
        }
      }

      return current;
    });
  });

  // const [page, setPage] = createSignal(1);
  //
  // const fetcher = createSignalFetcher(searchMedia, null, [], page);
  // const [data] = send(fetcher, { storeName: "results", type: "default", expiresInSeconds: 60 * 60 * 24 * 365 });


  return (
    <>
      <h2>Activity</h2>
      <button onClick={() => setPage(v => v + 1)}>test</button>
      {/* {console.log(data())} */}
      <hr />
      <div>
        <button onClick={() => setActivityType(undefined)}>All</button>
        <button onClick={() => setActivityType("TEXT")}>Text Status</button>
        <button onClick={() => setActivityType("MEDIA_LIST")}>List Progress</button>
      </div>
      <button onClick={() => {
        batch(() => {
          setIsFollowing(true); 
          setHasReplies(undefined);
        });
      }}>Following</button>
      <button onClick={() => {
        batch(() => {
          setIsFollowing(false);
          setHasReplies(true);
        })
      }}>Global</button>
      <ol class="flex-space-between activity">
        <Show when={variables()} keyed>
          {/* <ActivityContent page={1} variables={variables()} loadMoreButton={loadMoreButton} /> */}
          <ActivityReel page={1} variables={variables()} loadMoreButton={loadMoreButton} />
        </Show>
      </ol>
      {loadMoreButton}
    </>
  );
}

function ActivityContent(props) {
  const { accessToken } = useAuthentication();
  const pagelessFetcher = createAnilistPagelessSignalFetcher(getActivity, accessToken, props.variables, props.page);
  const fetcher = createSignalFetcher(getActivity, accessToken, props.variables, props.page);
  // TODO: New api should be done
  // Just test that it works
  const [test, { mutate: mutateTest }] = send2(pagelessFetcher);
  const [activityData, { mutateCache }] = send2(fetcher);
  const [showMore, setShowMore] = createSignal(false);

  onMount(() => {
    props.loadMoreButton.addEventListener("click", () => setShowMore(true), { once: true });
  });

  return (
    <>
      <Show when={activityData()}>
        {console.log("test", test())}
        <For each={activityData().data.activities}>{activity => (
          <ActivityCard activity={activity} mutateCache={mutateCache} />
        )}</For>
        <Show when={activityData().data.pageInfo.hasNextPage && showMore()}>
          <ActivityContent page={props.page + 1} variables={props.variables} loadMoreButton={props.loadMoreButton} />
        </Show>
      </Show>
    </>
  );
}

function ActivityReel(props) {
  const { accessToken } = useAuthentication();
  const pagelessFetcher = createAnilistPagelessSignalFetcher(getActivity, accessToken, props.variables, props.page);
  const [pagelessCacheData, { mutateCache }] = send2(pagelessFetcher);
  const [store, setStore] = createStore([]);

  const updateCache = apiResponse => {
    if (!apiResponse?.data?.activities?.length) {
      return;
    }

    const length = Math.min(store.length, apiResponse.data.activities.length);
    if (apiResponse.data.pageInfo.currentPage === 1) {
      const lastNewId = apiResponse.data.activities.at(-1).id;
      const isLargest = hasLargestId(store, lastNewId, 0, length);

      if (isLargest) {
        setStore(reconcile(apiResponse.data.activities, []));
        mutateCache(api => {
          api.data ??= [];
          api.data.unshift(apiResponse.data.activities);
          api.data.length = Math.min(api.data.length, 5);
          return api;
        });
      } else {
        setStore(produce(arr => {
          const lastNewIdsCacheIndex = arr.findIndex(activity => activity.id <= lastNewId);
          arr.splice(0, lastNewIdsCacheIndex + 1, ...apiResponse.data.activities);
        }));
        mutateCache(api => {
          api.data[0] = unwrap(store);
          return api;
        });
      }
    } else {
      mutateCache(api => {
        const firstId = apiResponse.data.activities[0].id;
        const startIndex = binarySearchFindIndex(store, activity => activity.id - firstId);

        setStore(produce(arr => {
          if (startIndex === -1) {
            if (firstId < store.at(-1).id) {
              arr.push(...apiResponse.data.activities);
            } else {
              api.data.unshift(apiResponse.data.activities);
              api.data.length = Math.min(api.data.length, 5);
            }
          } else {
            const lastId = apiResponse.data.activities.at(-1).id;
            const endIndex = binarySearchFindIndex(store, activity => activity.id - lastId);
            if (endIndex === -1) {
              arr.splice(startIndex, arr.length, ...apiResponse.data.activities);
            } else {
              arr.splice(startIndex, endIndex - startIndex + 1, ...apiResponse.data.activities);
            }
          }

          if (api.data.length > 1) {
            const lastId = apiResponse.data.activities.at(-1).id;
            const lastIdIndexInOldBuffer = binarySearchFindIndex(api.data[1], activity => activity.id - lastId) + 1;
            if (lastIdIndexInOldBuffer !== -1) {
              for (let i = lastIdIndexInOldBuffer; i < api.data[1].length; i++) {
                arr.push(api.data[1][i]);
              }
              api.data.splice(1, 1);
            }
          }
        }));

        api.data[0] = unwrap(store);
        return api;
      });
    }
  }

  const hasLargestId = (array, id, start, end) => {
    for (let i = start; i < end; i++) {
      if (array[i].id >= id) {
        return false;
      }
    }

    return true;
  }

  console.warn("Rendering reel again");


  createEffect(on(pagelessCacheData, apiRes => {
    if (apiRes?.data) {
      setStore(apiRes.data[0]);
    }
  }));

  return (
    <ActivityPage cache={store} updateCache={updateCache} mutateCache={mutateCache} {...props} />
  );
}

let initialPageLoad = true;
function ActivityPage(props) {
  const [page, setPage] = createSignal(initialPageLoad ? 1 : undefined);
  const [pageSuggestion, setPageSuggestion] = createSignal(undefined);

  let minIndex = null;
  let maxIndex = null;
  let maxPage = null;
  let firstPageIsFresh = false;
  let isMounted = false;
  const observerList = [];
  const freshActivityIDs = new Set();
  const visibleIndices = new Set();

  function observe(target) {
    if (isMounted) {
      intersectionObserver.observe(target);
    } else {
      observerList.push(target);
    }
  }

  onMount(() => {
    observerList.forEach(elem => intersectionObserver.observe(elem));
    isMounted = true;
  });

  onMount(() => {
    props.loadMoreButton.addEventListener("click", () => setPage(p => Math.max(p + 1, Math.ceil(props.cache.length / 25) + 1)));
  });

  onCleanup(() => {
    intersectionObserver.disconnect();
  });

  const options = { rootMargin: "500px" }
  const callback = (entries) => {
    for (const entry of entries) {
      const index = parseInt(entry.target.dataset.index)
      if (entry.isIntersecting) {
        visibleIndices.add(index);
      } else {
        visibleIndices.delete(index);
      }
    }
    minIndex = null;
    maxIndex = null;

    visibleIndices.forEach(value => {
      minIndex = Math.min(value, minIndex ?? value);
      maxIndex = Math.max(value, maxIndex ?? value);
    });

    const halfInnerHeight = window.innerHeight / 2;
    const scrollCenter = document.body.parentElement.scrollTop + halfInnerHeight;
    const halfScrollHeight = document.body.parentElement.scrollHeight / 2;
    minIndex ??= scrollCenter < halfScrollHeight ? 0 : props.cache.length;
    maxIndex ??= scrollCenter < halfScrollHeight ? 0 : props.cache.length;

    sendNewPageSuggestion();
  };

  createEffect(on(pageSuggestion, p => {
    triggerFetcherSend(p);
  }));

  const intersectionObserver = new IntersectionObserver(callback, options);

  const { accessToken } = useAuthentication();
  const fetcher = createSignalFetcher(getActivity, accessToken, props.variables, page);
  const [activityData] = send2(fetcher, { type: "no-store" });

  const triggerFetcherSend = leadingAndTrailing(debounce, (num) => {
    if (num && !activityData.loading) {
      setPage(num);
    }
  }, 1000);

  createEffect(on(activityData, apiResponse => {
    console.log(apiResponse);
    if (apiResponse?.data) {
      apiResponse.data.activities.forEach(activity => {
        freshActivityIDs.add(activity.id);
      });
      props.updateCache(apiResponse);
    }
  }));

  createEffect(on(() => activityData.loading, loading => {
    if (loading) {
      return;
    }

    sendNewPageSuggestion();
  }));

  function sendNewPageSuggestion() {
    if (maxIndex === props.cache.length) {
      if (props.cache.length % 25 === 0) {
        maxPage = Math.max(maxPage + 1, Math.round(props.cache.length / 25) + 1);
      } else {
        maxPage = Math.max(maxPage + 1, Math.ceil(props.cache.length / 25));
      }

      setPageSuggestion(maxPage);
    } else if (minIndex === 0) {
      setPageSuggestion(1);
    } else {
      const oldIndices = [];
      for (let i = minIndex; i < maxIndex; i++) {
        if (!freshActivityIDs.has(props.cache[i].id)) {
          oldIndices.push(i);
        }
      }

      if (oldIndices.length) {
        setPageSuggestion(Math.ceil((oldIndices[Math.floor(oldIndices.length / 2)] + 1) / 25));
      }
    }
  }

  return (
    <>
      <For each={props.cache}>{(activity, i) => (
        <ActivityCard activity={activity} mutateCache={props.mutateCache} wrapper={props => (
          <li use:observe attr:data-index={i()} {...props} />
        )}/>
      )}</For>
    </>
  )
}



function CurrentWatchingMedia(props) {
  const [animeData, { mutateCache: mutateAnimeCache }] = api.anilist.wachingAnime(props.userId, props.token);
  const [mangaData, { mutateCache: mutateMangaCache }] = api.anilist.readingManga(props.userId, props.token);

  const sortAiringTime = (a, b) => {
    const [aTime, bTime] = [a.media.nextAiringEpisode?.airingAt, b.media.nextAiringEpisode?.airingAt];
    if (aTime && bTime) { return aTime - bTime; } 
    else if (aTime == bTime) { return 0; } 
    else if (aTime == null) { return 1; } 
    return -1;
  };

  return (
    <div class={style.header}>
      <Show when={animeData()}>
        <CurrentCards 
          cards={animeData().data.data.Page.mediaList.filter(anime => anime.media.status !== "FINISHED").toSorted(sortAiringTime)} 
          mutateCache={mutateAnimeCache} 
        />
        <CurrentCards 
          cards={animeData().data.data.Page.mediaList.filter(anime => anime.media.status === "FINISHED")} 
          mutateCache={mutateAnimeCache} 
        />
      </Show>
      <Show when={mangaData()}>
        <CurrentCards cards={mangaData().data.data.Page.mediaList} mutateCache={mutateMangaCache} />
      </Show>
    </div>
  );
}

function CurrentCards(props) {
  return (
    <Show when={props.cards.length}>
      <div class="grid-column-auto-fill current">
        <For each={props.cards}>{cardData => (
          <CurrentCard data={cardData} mutateCache={props.mutateCache} />
        )}</For>
      </div>
    </Show>
  );
}

function CurrentCard(props) {
  const { accessToken } = useAuthentication();
  const [progress, setProgress] = createSignal(props.data.progress);
  const [airingEpisode, setAiringEpisode] = createSignal(props.data.media.nextAiringEpisode?.episode);
  const [isBehind, setIsBehind] = createSignal(props.data.media.nextAiringEpisode?.episode > progress() + 1);

  const triggerProgressIncrease = leadingAndTrailingDebounce(async (token, mediaId, newProgress) => {
    const response = await api.anilist.mutateMedia(token, {mediaId, progress: newProgress});
    if (response.status !== 200) { return; }

    assert(response.data.progress, "No progress found");
    props.data.progress = response.data.progress;
    if (response.data.status === "COMPLETED") {
      props.mutateCache(request => {
        request.data.data.Page.mediaList = request.data.data.Page.mediaList.filter(media => media.id !== props.data.id);
        return request;
      });
    } else {
      props.mutateCache(data => data);
    }
  }, 250, 2);

  createEffect(() => {
    setIsBehind(airingEpisode() > progress() + 1);
  });

  return (
    <A href={"/" + props.data.media.type.toLowerCase() + "/" + props.data.media.id + "/" + formatTitleToUrl(props.data.media.title.userPreferred)} class={style.card} >
      <img src={props.data.media.coverImage.large} alt="Cover." />
      <Show when={props.data.media.nextAiringEpisode?.airingAt}>
        <div class={style.normalInfo}>
          <p>Ep {props.data.media.nextAiringEpisode?.episode}</p>
          <EpisodeTime airingAt={props.data.media.nextAiringEpisode.airingAt} setAiringEpisode={setAiringEpisode}/>
          <Show when={isBehind()}>
            <div class={style.isBehind}></div>
          </Show>
        </div>
      </Show>
      <Switch fallback={
        <div class={style.hoverInfo} onClick={e => {
          e.preventDefault();
          triggerProgressIncrease(accessToken(), props.data.media.id, progress() + 1);
          setProgress(val => val + 1);
        }}>
          <p>{progress} <span class={style.plus}>+</span></p>
        </div>
      }>
        <Match when={
          props.data.media.episodes === progress() || props.data.media.chapters === progress()
        }>
          <div class={style.hoverInfo + " " + style.normal} onClick={e => e.preventDefault()}>
            <p>Completed</p>
          </div>
        </Match>
      </Switch>
      <div class={style.cardRight}>
        <Switch>
          <Match when={props.data.media.nextAiringEpisode?.episode && isBehind()}>
            <p>{airingEpisode() - (progress() + 1)} episode
              <Show when={airingEpisode() - (progress() + 1) > 1}>s</Show> behind
            </p>
          </Match>
          <Match when={props.data.media.nextAiringEpisode?.episode == null && props.data.media.episodes - progress() > 0}>
            <p>{props.data.media.episodes - progress()} episode
              <Show when={props.data.media.episodes - progress() > 1}>s</Show> left
            </p>
          </Match>
          <Match when={props.data.media.chapters - progress() > 0}>
            <p>{props.data.media.chapters - progress()} chapter
              <Show when={props.data.media.chapters - progress() > 1}>s</Show> left
            </p>
          </Match>
        </Switch>
        <p>{props.data.media.title.userPreferred}</p>
        <p class={style.progressStatus}>
          Progress: {progress()}
          <Show when={props.data.media.episodes}>/{props.data.media.episodes}</Show>
          <Show when={props.data.media.chapters}>/{props.data.media.chapters}</Show>
        </p>
      </div>
    </A>
  )
}

const [currentTime, setCurentTime] = createSignal((new Date()) / 1000);

setInterval(() => setCurentTime((new Date()) / 1000), 1000 * 30);

function EpisodeTime(props) {
  const [time, setTime] = createSignal(Math.abs(props.airingAt - currentTime()));
  const [timeLimitReached, setTimeLimitReached] = createSignal(false);

  createEffect(() => {
    setTime(Math.abs(props.airingAt - currentTime()));
    if (props.airingAt < currentTime() && timeLimitReached() == false) {
      props.setAiringEpisode(ep => ep + 1);
      setTimeLimitReached(true);
    }
  });

  return (
    <>
      <Show when={timeLimitReached()}>aired in</Show>
      <p>
        <Show when={Math.floor(time() / 3600 / 24)} children={days => (<>{days}d </>)} />
        <Show when={Math.floor((time() / 3600) % 24)} children={hours => (<>{hours}h </>)} />
        <Show when={Math.floor((time() % 3600) / 60)} children={minutes => (<>{minutes}m </>)} />
      </p>
    </>
  )
}

export default Home
