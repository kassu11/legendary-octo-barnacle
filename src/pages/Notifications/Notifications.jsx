import { A } from "@solidjs/router";
import { createEffect, createRenderEffect, createSignal, For, Match, onCleanup, onMount, Show, Switch, untrack } from "solid-js";
import "./Notifications.scss";
import { mediaUrl } from "../../utils/formating.js";
import { CreatedAt } from "../../components/CreatedAt.jsx";
import { arrayUtils, scheduleUtils } from "../../utils/utils.js";
import { asserts, modes, signals, queries } from "../../collections/collections.js";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { LoaderCircle } from "../../components/LoaderCircle.jsx";
import { Tooltip } from "../../components/Tooltips.jsx";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils";
import { getFetcherValueFromStorage, setFetcherValueToStorage } from "../../utils/storageUtils";
import { isTypeFunction } from "../../utils/functionUtils";

export function typeToTypes(type) {
  if (type === "airing") return [ "AIRING" ];
  if (type === "activity") return [ "ACTIVITY_MESSAGE", "ACTIVITY_MENTION", "ACTIVITY_REPLY", "ACTIVITY_LIKE", "ACTIVITY_REPLY_LIKE" ];
  if (type === "forum") return [ "THREAD_COMMENT_REPLY", "THREAD_SUBSCRIBED", "THREAD_COMMENT_MENTION", "THREAD_LIKE", "THREAD_COMMENT_LIKE" ];
  if (type === "follows") return [ "FOLLOWING" ];
  if (type === "media") return [ "RELATED_MEDIA_ADDITION", "MEDIA_DATA_CHANGE", "MEDIA_MERGE", "MEDIA_DELETION" ];
  if (type === "all") return undefined;
  return null;
}


export default function Notifications() {
  const [type, setType] = createSignal("all");

  document.title = "Notifications - LOB";

  return (
    <div class="notification-page">
      <ol class="flex-space-between">
        <li><button onClick={() => setType("all")}>All</button></li>
        <li><button onClick={() => setType("airing")}>Airing</button></li>
        <li><button onClick={() => setType("activity")}>Activity</button></li>
        <li><button onClick={() => setType("forum")}>Forum</button></li>
        <li><button onClick={() => setType("follows")}>Follows</button></li>
        <li><button onClick={() => setType("media")}>Media</button></li>
      </ol>
      <NotificationsReel type={type()} />
    </div>
  )
}

function NotificationsReel(props) {
  const [pagelessCacheLoading, setPagelessCacheLoading] = createSignal(false);
  const [pagelessCacheData, setPagelessCacheData] = createSignal(undefined, { equals: false });

  createRenderEffect(async () => {
    const types = typeToTypes(props.type);
    if (types === null) return;

    setPagelessCacheLoading(true);
    const pagelessFetcher = createAnilistFetcher(queries.anilistUserNotifications, { types, page: "pageless" });
    const data = await getFetcherValueFromStorage(pagelessFetcher);

    if (data) setPagelessCacheData(data);
    else {
      setPagelessCacheData({
        data: null,
        name: "Anilist notifications pageless",
        expires: new Date().setHours(24 * 356),
        modified: new Date(),
        cacheKey: pagelessFetcher.cacheKey
      });
    }
    setPagelessCacheLoading(false);
  });

  const mutateCache = mutate => {
    if (isTypeFunction(mutate)) mutate = mutate(untrack(pagelessCacheData));
    setFetcherValueToStorage(mutate);
  };

  const updateCache = (onePageRes, pagelessFetcher) => {
    if (!onePageRes.data.data.Page.notifications.length) return;
    if (pagelessFetcher.cacheKey !== pagelessCacheData().cacheKey) return;

    setPagelessCacheData(pagelessRes => {
      try {
        if (!pagelessRes?.data?.length) {
          pagelessRes.data = [onePageRes.data.data.Page.notifications];
          return pagelessRes;
        }

        const lastId = onePageRes.data.data.Page.notifications.at(-1).id;
        const lastIdIndex = arrayUtils.binarySearchFindAlwaysIndex(pagelessRes.data[0], activity => activity.id - lastId);
        const lastIdFound = pagelessRes.data[0][lastIdIndex]?.id === lastId;

        if (onePageRes.data.data.Page.pageInfo.currentPage === 1) {
          if (!lastIdFound) {
            pagelessRes.data.unshift(onePageRes.data.data.Page.notifications);
            pagelessRes.data.length = Math.min(pagelessRes.data.length, 5);
            return pagelessRes;
          }

          pagelessRes.data[0].splice(0, lastIdIndex + 1, ...onePageRes.data.data.Page.notifications);
          return pagelessRes;
        }

        const firstId = onePageRes.data.data.Page.notifications[0].id;
        const firstIdIndex = arrayUtils.binarySearchFindAlwaysIndex(pagelessRes.data[0], activity => activity.id - firstId);
        // Check that current page does not have higher id than the first page
        const firstIdIsHigherThanFirstResults = firstIdIndex === 0 && pagelessRes.data[0][firstIdIndex].id !== firstId;

        // If the current apiResponse has the highest id return, because the page is not one and we don't wan't the content to jump
        if (firstIdIsHigherThanFirstResults) {
          return pagelessRes;
        }

        pagelessRes.data[0].splice(firstIdIndex, (lastIdIndex - firstIdIndex) + lastIdFound, ...onePageRes.data.data.Page.notifications);

        if (lastIdFound || pagelessRes.data.length === 1) {
          return pagelessRes;
        }

        const lastIdIndexInSecondBuffer = arrayUtils.binarySearchFindAlwaysIndex(pagelessRes.data[1], activity => activity.id - lastId);
        const lastIdNotFoundInSecondBuffer = pagelessRes.data[1][lastIdIndexInSecondBuffer]?.id !== lastId;


        if (lastIdNotFoundInSecondBuffer) {
          return pagelessRes;
        }

        const [secondBuffer] = pagelessRes.data.splice(1, 1);
        secondBuffer.splice(0, lastIdIndexInSecondBuffer + 1);
        pagelessRes.data[0].push(...secondBuffer);

        return pagelessRes;
      } finally {
        mutateCache(pagelessRes);
      }
    });
  }

  const [isDebug, setIsDebug] = signals.debug();

  return (
    <Show when={!pagelessCacheLoading()}>
      <Show when={modes.debug}>
        <button onClick={() => setIsDebug(s => !s)}>debug: {"" + isDebug()}</button>
      </Show>
      <NotificationsPage cache={pagelessCacheData()?.data?.[0] || []} updateCache={updateCache} isDebug={isDebug} {...props} />
    </Show>
  );
}

function NotificationsPage(props) {
  const [page, setPage] = createSignal(props.cache.length ? undefined : 1);
  const [anilistNotificationsLoading, setAnilistNotificationsLoading] = createSignal(false);
  let anilistNotificationsFetcher, anilistNotificationsController;
  createEffect(() => {
    anilistNotificationsController?.abort();
    anilistNotificationsController = new AbortController();

    const p = page();
    const types = typeToTypes(props.type);
    if (types === null || !p) return;

    anilistNotificationsFetcher = createAnilistFetcher(queries.anilistUserNotifications, { page: p, types}, anilistNotificationsController.signal);
    const pagelessFetcher = createAnilistFetcher(queries.anilistUserNotifications, { types, page: "pageless" });

    sendAnilistFetcher(anilistNotificationsFetcher, {
      name: "Anilist notifications",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === anilistNotificationsFetcher.cacheKey) anilistNotificationsController = null;
      },
      onStart: () => setAnilistNotificationsLoading(true),
      onStop: () => setAnilistNotificationsLoading(false),
      setValue: res => {
        const data = res.data.data.Page;
        if (!data?.notifications.length) return;

        data.notifications.forEach(activity => {
          freshActivityIDs.add(activity.id);
        });

        const timeA = data.notifications[0]?.createdAt || 0;
        const timeB = arrayUtils.atPercent(data.notifications, .5)?.createdAt || timeA;
        const time = Math.min(1000 * 60 * 5, Math.max((timeA - timeB) * 1000, 15_000));
        maxPage = Math.max(maxPage, data.pageInfo.currentPage);

        if (data.pageInfo.currentPage === 1) {
          setFirstPageIsStale(false);
          setAllowPageFetches(true);
          triggerFirstPageIsStale(time, true);
          maxPage = 1;
        } else if (data.pageInfo.currentPage > props.cache.length / 15) {
          if (data.notifications.at(-1)?.id > props.cache.at(-1)?.id) {
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

        props.updateCache(res, pagelessFetcher);
        updatePage();
      }
    });
  });

  let maxPage = 0;
  const [allowPageFetches, setAllowPageFetches] = createSignal(false);
  const [firstPageIsStale, setFirstPageIsStale] = createSignal(true);
  const triggerFirstPageIsStale = scheduleUtils.debouncer(setFirstPageIsStale);
  const freshActivityIDs = new Set();
  const triggerPage = leadingAndTrailing(debounce, num => !anilistNotificationsLoading() && setPage(num), 1000);

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
      return Math.max(Math.floor(props.cache.length / 15) + 1, maxPage + 1);
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

      return Math.ceil((index + 1) / 15);
    }
  }

  let missedNewPageFetches = 0;

  const visibleIds = new Set();
  const intersectionCallback = (entries) => {
    for (const entry of entries) {
      const id = parseInt(entry.target.dataset.id);
      asserts.assertTrueOLD(Number.isInteger(id));

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
      <Show when={anilistNotificationsLoading() && page() === 1}>
        <LoaderCircle class="refresh">
          <Tooltip tipPosition="bottom">
            <Show when={props.cache.length === 0} fallback="Fetching fresh notifications">
              Loading notifications
            </Show>
          </Tooltip>
        </LoaderCircle>
      </Show>
      <ol class="notifications-container" classList={{loading: anilistNotificationsLoading() && page() === 1}}>
        <For each={props.cache}>{notification =>  {
          // eslint-disable-next-line no-unassigned-vars
          let ref;
          onMount(() => intersectionObserver.observe(ref))

          return (
            <li ref={ref} attr:data-id={notification.id}>
              <Switch fallback={"Notification type \"" + notification.type + "\" not supported."}>
                <Match when={notification.type === "RELATED_MEDIA_ADDITION"}>
                  <A href={mediaUrl(notification.media)}>
                    <img src={notification.media.coverImage.large} alt="Media cover" />
                  </A>
                  <div class="content">
                    <p>
                      <A href={mediaUrl(notification.media)}>
                        {notification.media.title.userPreferred}
                      </A>
                      {notification.context}
                    </p>
                    <CreatedAt createdAt={notification.createdAt} />
                  </div>
                </Match>
                <Match when={notification.type === "AIRING"}>
                  <A href={mediaUrl(notification.media)}>
                    <img src={notification.media.coverImage.large} alt="Media cover" />
                  </A>
                  <div class="content">
                    <p>
                      {notification.contexts[0]}
                      {notification.episode}
                      {notification.contexts[1]}
                      <A href={mediaUrl(notification.media)}>
                        {notification.media.title.userPreferred}
                      </A>
                      {notification.contexts[2]}
                    </p>
                    <CreatedAt createdAt={notification.createdAt} />
                  </div>
                </Match>
                <Match when={notification.type === "ACTIVITY_REPLY_LIKE" || notification.type === "ACTIVITY_LIKE" || notification.type === "ACTIVITY_REPLY"}>
                  <A href={"/user/" + notification.user.name}>
                    <img src={notification.user.avatar.large} alt="Media cover" />
                  </A>
                  <div class="content">
                    <A href={"/activity/" + notification.activityId}>
                      {notification.user.name}
                      {notification.context}
                    </A>
                    <CreatedAt createdAt={notification.createdAt} />
                  </div>
                </Match>
                <Match when={notification.type === "FOLLOWING"}>
                  <A href={"/user/" + notification.user.name}>
                    <img src={notification.user.avatar.large} alt="Media cover" />
                  </A>
                  <div class="content">
                    <p>
                      <A href={"/user/" + notification.user.name}>
                        {notification.user.name}
                      </A>
                      {notification.context}
                    </p>
                    <CreatedAt createdAt={notification.createdAt} />
                  </div>
                </Match>
              </Switch>
            </li>
          )
        }}</For>
      </ol>
      <Switch>
        <Match when={anilistNotificationsLoading() && page() > maxPage && props.cache.length}>
          <LoaderCircle class="new">
            <Tooltip tipPosition="bottom">Loading notifications</Tooltip>
          </LoaderCircle>
        </Match>
        <Match when={!allowPageFetches() && props.cache.length}>
          Refresh notification feed to load more
          <button onClick={() => setPage(1)}>Refresh</button>
        </Match>
      </Switch>
    </>
  );
}
