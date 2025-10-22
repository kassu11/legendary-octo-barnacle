import {useAuthentication} from "../../context/providers.js";
import {createEffect, createSignal, For, Match, on, onCleanup, onMount, Show, Switch} from "solid-js";
import {debounce, leadingAndTrailing} from "@solid-primitives/scheduled";
import {untrack} from "solid-js/web";
import {LoaderCircle} from "../../components/LoaderCircle.jsx";
import {Tooltip} from "../../components/Tooltips.jsx";
import {ActivityCard} from "../../components/Activity.jsx";
import { fetchers } from "../../collections/collections.js";

export function HomePageActivityReelContent(props) {
  const {accessToken} = useAuthentication();
  const [page, setPage] = createSignal(props.cache.length ? undefined : 1);
  const fetcher = fetcherSenderUtils.createFetcher(fetchers.anilist.activityPage, accessToken, props.variables, page);
  const [activityData] = fetcherSenders.sendWithDisabledSignal(props.isDebug, fetcher);

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

  const intersectionObserver = new IntersectionObserver(intersectionCallback, {rootMargin: "500px"});
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
            )}/>
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
