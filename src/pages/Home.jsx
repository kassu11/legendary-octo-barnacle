import api from "../utils/api";
import { Show, createSignal, createEffect, onMount, on, For, onCleanup, batch, Match } from "solid-js";
import "./Home.scss";
import { ActivityCard } from "../components/Activity.jsx";
import { leadingAndTrailingDebounce } from "../utils/scheduled.js";
import { formatTitleToUrl } from "../utils/formating.js";
import { A } from "@solidjs/router";
import { useAuthentication } from "../context/providers.js";
import { arrayUtils, asserts, fetcherUtils, modes, scheduleUtils, signals } from "../utils/utils.js";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { untrack } from "solid-js/web";
import { LoaderCircle } from "../components/LoaderCircle.jsx";
import { Tooltip } from "../components/Tooltips.jsx";

function Home() {
  const { accessToken, authUserData } = useAuthentication();

  document.title = "Home - LOB";

  return (
    <Show when={authUserData()}>
      <div class="pg-home">
        <CurrentWatchingMedia token={accessToken()} userId={authUserData().data.id} />
        <Activity token={accessToken()}/>
      </div>
    </Show>
  )
}

function Activity() {
  const [activityType, setActivityType] = signals.localStorageString("LOB_ACTIVITY_TYPE", undefined);
  const [isFollowing, setIsFollowing] = signals.localStorageBoolean("LOB_ACTIVITY_IS_FOLLOWING", true);
  const [hasReplies, setHasReplies] = signals.localStorageBoolean("LOB_ACTIVITY_HAS_REPLIES", undefined);
  const [variables, setVariables] = signals.localStorageJSON("LOB_ACTIVITY_QUERY", {
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

  return (
    <div>
      <h2>Activity</h2>
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
      <Show when={variables()} keyed>
        <ActivityReel variables={variables()} />
      </Show>
    </div>
  );
}


function ActivityReel(props) {
  const { accessToken } = useAuthentication();
  const pagelessFetcher = fetcherUtils.createAnilistPagelessSignalFetcher(fetcherUtils.fetchers.anilist.getActivity, accessToken, props.variables, 1);
  const [pagelessCacheData, { mutateCache, mutateBoth }] = fetcherUtils.send(pagelessFetcher);

  const updateCache = apiResponse => {
    if (!apiResponse?.data?.activities?.length) {
      return;
    }

    mutateBoth(api => {
      if (!api?.data?.length) {
        api.data = [apiResponse.data.activities];
        return api;
      }

      const lastId = apiResponse.data.activities.at(-1).id;
      const lastIdIndex = arrayUtils.binarySearchFindAlwaysIndex(api.data[0], activity => activity.id - lastId);
      const lastIdFound = api.data[0][lastIdIndex]?.id === lastId;

      if (apiResponse.data.pageInfo.currentPage === 1) {
        if (!lastIdFound) {
          api.data.unshift(apiResponse.data.activities);
          api.data.length = Math.min(api.data.length, 5);
          return api;
        } 

        api.data[0].splice(0, lastIdIndex + 1, ...apiResponse.data.activities);
        return api;
      }

      const firstId = apiResponse.data.activities[0].id;
      const firstIdIndex = arrayUtils.binarySearchFindAlwaysIndex(api.data[0], activity => activity.id - firstId);
      // Check that current page does not have higher id than the first page
      const firstIdIsHigherThanFirstResults = firstIdIndex === 0 && api.data[0][firstIdIndex].id !== firstId;

      // If the current apiResponse has the highest id return, because the page is not one and we don't wan't the content to jump
      if (firstIdIsHigherThanFirstResults) {
        return api;
      }

      api.data[0].splice(firstIdIndex, (lastIdIndex - firstIdIndex) + lastIdFound, ...apiResponse.data.activities);

      if (lastIdFound || api.data.length === 1) {
        return api;
      }

      const lastIdIndexInSecondBuffer = arrayUtils.binarySearchFindAlwaysIndex(api.data[1], activity => activity.id - lastId);
      const lastIdNotFoundInSecondBuffer = api.data[1][lastIdIndexInSecondBuffer]?.id !== lastId;


      if (lastIdNotFoundInSecondBuffer) {
        return api;
      }

      const [secondBuffer] = api.data.splice(1, 1);
      secondBuffer.splice(0, lastIdIndexInSecondBuffer + 1);
      api.data[0].push(...secondBuffer);

      return api;
    });
  }

  const [notInDebug, setNotInDebug] = signals.debug(false);

  return (
    <Show when={!pagelessCacheData.loading}>
      <Show when={modes.debug}>
        <button onClick={() => setNotInDebug(s => !s)}>debug: {"" + !notInDebug()}</button>
      </Show>
      <ActivityPage cache={pagelessCacheData()?.data?.[0] || []} notInDebug={notInDebug} updateCache={updateCache} mutateCache={mutateCache} {...props} />
    </Show>
  );
}

function ActivityPage(props) {
  const { accessToken } = useAuthentication();
  const [page, setPage] = createSignal(props.cache.length ? undefined : 1);
  const fetcher = fetcherUtils.activationController(props.notInDebug, fetcherUtils.createSignalFetcher, fetcherUtils.fetchers.anilist.getActivity, accessToken, props.variables, page);
  const [activityData] = fetcherUtils.send(fetcher, { type: "no-store" });

  let maxPage = 0;
  const [allowPageFetches, setAllowPageFetches] = createSignal(false);
  const [firstPageIsStale, setFirstPageIsStale] = createSignal(true);
  const triggerFirstPageIsStale = scheduleUtils.debouncer(setFirstPageIsStale);
  const freshActivityIDs = new Set();
  const triggerPage = leadingAndTrailing(debounce, num => !activityData.loading && setPage(num), 1000);

  function updatePage() {
    const nextPage = getPageNumberByScrollPosition();
    if (nextPage) {
      triggerPage(nextPage);
    }
  }

  function getPageNumberByScrollPosition() {
    const allowPages = untrack(allowPageFetches);
    const firstStale = untrack(firstPageIsStale);

    if (visibleIds.has(props.cache.at(-1)?.id) && allowPages) {
      return Math.max(Math.floor(props.cache.length / 25) + 1, maxPage + 1);
    } else if (visibleIds.has(props.cache[0]?.id) && firstStale) {
      return 1;
    } else if (allowPages) {
      const notFreshIndices = [...visibleIds.difference(freshActivityIDs)].sort((a, b) => b - a);

      if (!notFreshIndices.length) {
        return;
      }

      const id = arrayUtils.atPercent(notFreshIndices, .5);
      const index = arrayUtils.binarySearchFindIndex(props.cache, activity => activity.id - id);
      if (index == -1) {
        return;
      }

      return Math.ceil((index + 1) / 25);
    }
  }

  let missedNewPageFetches = 0;
  createEffect(on(activityData, apiResponse => {
    if (!apiResponse?.data?.activities.length) {
      return;
    }

    apiResponse.data.activities.forEach(activity => {
      freshActivityIDs.add(activity.id);
    });

    const timeA = apiResponse.data.activities[0]?.createdAt || 0;
    const timeB = arrayUtils.atPercent(apiResponse.data.activities, .5)?.createdAt || timeA;
    const time = Math.min(1000 * 60 * 5, Math.max((timeA - timeB) * 1000, 15_000));
    maxPage = Math.max(maxPage, apiResponse.data.pageInfo.currentPage);

    if (apiResponse.data.pageInfo.currentPage === 1) {
      setFirstPageIsStale(false);
      setAllowPageFetches(true);
      triggerFirstPageIsStale(time, true);
      maxPage = 1;
    } else if (apiResponse.data.pageInfo.currentPage > props.cache.length / 25) {
      if (apiResponse.data.activities.at(-1)?.id > props.cache.at(-1)?.id) {
        missedNewPageFetches += 1;
      } else {
        missedNewPageFetches = 0;
      }

      if (missedNewPageFetches > 2) {
        setFirstPageIsStale(true);
        setAllowPageFetches(false);
        maxPage = 0;
        missedNewPageFetches = 0;
      }
    }

    props.updateCache(apiResponse);
    updatePage();
  }));

  const visibleIds = new Set();
  const intersectionCallback = (entries) => {
    for (const entry of entries) {
      const id = parseInt(entry.target.dataset.id);
      asserts.assertTrue(Number.isInteger(id));

      if (entry.isIntersecting) {
        visibleIds.add(id);
      } else {
        visibleIds.delete(id);
      }
    }

    updatePage();
  };

  const intersectionObserver = new IntersectionObserver(intersectionCallback, { rootMargin: "500px" });
  onCleanup(() => intersectionObserver.disconnect());

  return (
    <>
      <Show when={activityData.loading && page() === 1}>
        <LoaderCircle class="refresh">
          <Tooltip tipPosition="bottom">
            <Show when={props.cache.length === 0} fallback="Fetching fresh activities">
              Loading activities
            </Show>
          </Tooltip>
        </LoaderCircle>
      </Show>
      <ol class="flex-space-between activity" classList={{loading: activityData.loading && page() === 1}}>
        <For each={props.cache}>{activity => {
          let ref;
          onMount(() => intersectionObserver.observe(ref))

          return (
            <ActivityCard activity={activity} mutateCache={props.mutateCache} wrapper={wrapperProps => (
              <li ref={ref} attr:data-id={activity.id} {...wrapperProps} />
            )} />
          )
        }}</For>
      </ol>
      <Switch>
        <Match when={activityData.loading && page() > maxPage && props.cache.length}>
          <LoaderCircle class="new">
            <Tooltip tipPosition="bottom">Loading activities</Tooltip>
          </LoaderCircle>
        </Match>
        <Match when={!allowPageFetches() && props.cache.length}>
          Refresh activity feed to load more
          <button onClick={() => setPage(1)}>Refresh</button>
        </Match>
      </Switch>
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
    <div class="pg-home-current">
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

    asserts.assertTrue(response.data.progress, "No progress found");
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
    <A href={"/" + props.data.media.type.toLowerCase() + "/" + props.data.media.id + "/" + formatTitleToUrl(props.data.media.title.userPreferred)} class="cp-current-card" >
      <img src={props.data.media.coverImage.large} alt="Cover." />
      <Show when={props.data.media.nextAiringEpisode?.airingAt}>
        <div class="cp-current-card-info">
          <p>Ep {props.data.media.nextAiringEpisode?.episode}</p>
          <EpisodeTime airingAt={props.data.media.nextAiringEpisode.airingAt} setAiringEpisode={setAiringEpisode}/>
          <Show when={isBehind()}>
            <div class="is-behind"></div>
          </Show>
        </div>
      </Show>
      <Switch fallback={
        <div class="cp-current-card-hover-info" onClick={e => {
          e.preventDefault();
          triggerProgressIncrease(accessToken(), props.data.media.id, progress() + 1);
          setProgress(val => val + 1);
        }}>
          <p>{progress} <span class="plus">+</span></p>
        </div>
      }>
        <Match when={
          props.data.media.episodes === progress() || props.data.media.chapters === progress()
        }>
          <div class="cp-current-card-hover-info normal" onClick={e => e.preventDefault()}>
            <p>Completed</p>
          </div>
        </Match>
      </Switch>
      <div class="card-right">
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
        <p class="progress-status">
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
