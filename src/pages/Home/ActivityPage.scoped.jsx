import {createEffect, createSignal, For, Match, onCleanup, onMount, Show, Switch} from "solid-js";
import {debounce, leadingAndTrailing} from "@solid-primitives/scheduled";
import {untrack} from "solid-js/web";
import {LoaderCircle} from "../../components/LoaderCircle.jsx";
import {Tooltip} from "../../components/Tooltips.jsx";
import {ActivityCard} from "../../components/Activity.jsx";
import { asserts, queries } from "../../collections/collections.js";
import "./ActivityPage.scoped.css";
import { arrayUtils, scheduleUtils } from "../../utils/utils.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils.js";
import { createTimer, formatMSToString } from "../../utils/timeUtils.js";

export function HomePageActivityReelContent(props) {
  const [loading, setLoading] = createSignal(false);
  const [time, startTimer, stopTimer] = createTimer();

  const [page, setPage] = createSignal(props.cache.length ? undefined : 1);

  let maxPage = 0;
  const [allowPageFetches, setAllowPageFetches] = createSignal(false);
  const [firstPageIsStale, setFirstPageIsStale] = createSignal(true);
  const triggerFirstPageIsStale = scheduleUtils.debouncer(setFirstPageIsStale);
  const freshActivityIDs = new Set();
  const triggerPage = leadingAndTrailing(debounce, num => !loading() && setPage(num), 1000);

  let controller;
  let missedNewPageFetches = 0;
  createEffect(() => {
    const p = page();
    if (!p || props.isDebug()) return;

    controller?.abort();
    controller = new AbortController();

    const pagelessFetcher = createAnilistFetcher(queries.anilistActivity, { ...props.variables, page: "pageless" });
    const fetcher = createAnilistFetcher(queries.anilistActivity, { ...props.variables, page: p }, controller.signal);

    sendAnilistFetcher(fetcher, {
      name: "Activity feed",
      cache: null,
      // file: "watching.json",
      onStart: time => {
        setLoading(true);
        startTimer(time);
      },
      onStop: time => {
        setLoading(false);
        stopTimer(time);
      },
      setValue: apiResponse => {
        const { pageInfo, activities } = apiResponse.data.data.Page;
        if (!activities?.length) {
          return;
        }

        activities.forEach(activity => {
          freshActivityIDs.add(activity.id);
        });

        const timeA = activities[0]?.createdAt || 0;
        const timeB = arrayUtils.atPercent(activities, .5)?.createdAt || timeA;
        const time = Math.min(1000 * 60 * 5, Math.max((timeA - timeB) * 1000, 15_000));
        maxPage = Math.max(maxPage, pageInfo.currentPage);

        if (pageInfo.currentPage === 1) {
          setFirstPageIsStale(false);
          setAllowPageFetches(true);
          triggerFirstPageIsStale(time, true);
          maxPage = 1;
        } else if (pageInfo.currentPage > props.cache.length / 25) {
          if (activities.at(-1)?.id > props.cache.at(-1)?.id) {
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

        props.updateCache(apiResponse, pagelessFetcher);
        updatePage();
      }
    });
  });

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

  const visibleIds = new Set();
  const intersectionCallback = (entries) => {
    for (const entry of entries) {
      const id = parseInt(entry.target.dataset.id);
      asserts.assertTypeInteger(id);

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
      <Show when={loading() && page() === 1}>
        <LoaderCircle class="refresh">
          <Tooltip tipPosition="bottom">
            <Show when={props.cache.length === 0} fallback="Fetching fresh activities">
              Loading activities
            </Show>
          </Tooltip>
        </LoaderCircle>
      </Show>
      <p>{formatMSToString(time())}</p>
      <ol class="flex-space-between activity" classList={{loading: loading() && page() === 1}}>
        <For each={props.cache}>{activity => {
          // eslint-disable-next-line no-unassigned-vars
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
        <Match when={loading() && page() > maxPage && props.cache.length}>
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
