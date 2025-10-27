import { A } from "@solidjs/router";
import {createEffect, createSignal, For, Match, on, onCleanup, onMount, Show, Switch, untrack} from "solid-js";
import "./Notifications.scss";
import { mediaUrl } from "../../utils/formating.js";
import { useAuthentication } from "../../context/providers.js";
import { CreatedAt } from "../../components/CreatedAt.jsx";
import { arrayUtils, fetcherSenderUtils, fetcherUtils, scheduleUtils } from "../../utils/utils.js";
import { asserts, fetchers, fetcherSenders, modes, signals } from "../../collections/collections.js";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { LoaderCircle } from "../../components/LoaderCircle.jsx";
import { Tooltip } from "../../components/Tooltips.jsx";

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
      <NotificationsReel type={type} />
    </div>
  )
}

function NotificationsReel(props) {
  const { accessToken } = useAuthentication();
  const pagelessFetcher = fetcherSenderUtils.createFetcher(fetchers.anilist.notificationPageless, accessToken, props.type);
  const [pagelessCacheData, { mutateBoth }] = fetcherSenders.sendWithNullUpdates(pagelessFetcher);

  const updateCache = apiResponse => {
    if (!apiResponse?.data?.notifications?.length) {
      return;
    }

    mutateBoth(api => {
      if (!api?.data?.length) {
        api.data = [apiResponse.data.notifications];
        return api;
      }

      const lastId = apiResponse.data.notifications.at(-1).id;
      const lastIdIndex = arrayUtils.binarySearchFindAlwaysIndex(api.data[0], activity => activity.id - lastId);
      const lastIdFound = api.data[0][lastIdIndex]?.id === lastId;

      if (apiResponse.data.pageInfo.currentPage === 1) {
        if (!lastIdFound) {
          api.data.unshift(apiResponse.data.notifications);
          api.data.length = Math.min(api.data.length, 5);
          return api;
        } 

        api.data[0].splice(0, lastIdIndex + 1, ...apiResponse.data.notifications);
        return api;
      }

      const firstId = apiResponse.data.notifications[0].id;
      const firstIdIndex = arrayUtils.binarySearchFindAlwaysIndex(api.data[0], activity => activity.id - firstId);
      // Check that current page does not have higher id than the first page
      const firstIdIsHigherThanFirstResults = firstIdIndex === 0 && api.data[0][firstIdIndex].id !== firstId;

      // If the current apiResponse has the highest id return, because the page is not one and we don't wan't the content to jump
      if (firstIdIsHigherThanFirstResults) {
        return api;
      }

      api.data[0].splice(firstIdIndex, (lastIdIndex - firstIdIndex) + lastIdFound, ...apiResponse.data.notifications);

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

  const [isDebug, setIsDebug] = signals.debug();

  return (
    <Show when={!pagelessCacheData.loading}>
      <Show when={modes.debug}>
        <button onClick={() => setIsDebug(s => !s)}>debug: {"" + isDebug()}</button>
      </Show>
      <NotificationsPage cache={pagelessCacheData()?.data?.[0] || []} updateCache={updateCache} isDebug={isDebug} {...props} />
    </Show>
  );
}

function NotificationsPage(props) {
  const { accessToken } = useAuthentication();
  const [page, setPage] = createSignal(props.cache.length ? undefined : 1);
  const fetcher = fetcherSenderUtils.createFetcher(fetchers.anilist.notificationPage, accessToken, props.type, page);
  const [notificationsData] = fetcherSenders.sendWithDisabledSignal(props.isDebug, fetcher);


  let maxPage = 0;
  const [allowPageFetches, setAllowPageFetches] = createSignal(false);
  const [firstPageIsStale, setFirstPageIsStale] = createSignal(true);
  const triggerFirstPageIsStale = scheduleUtils.debouncer(setFirstPageIsStale);
  const freshActivityIDs = new Set();
  const triggerPage = leadingAndTrailing(debounce, num => !notificationsData.loading && setPage(num), 1000);

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
  createEffect(on(notificationsData, apiResponse => {
    if (!apiResponse?.data?.notifications.length) {
      return;
    }

    apiResponse.data.notifications.forEach(activity => {
      freshActivityIDs.add(activity.id);
    });

    const timeA = apiResponse.data.notifications[0]?.createdAt || 0;
    const timeB = arrayUtils.atPercent(apiResponse.data.notifications, .5)?.createdAt || timeA;
    const time = Math.min(1000 * 60 * 5, Math.max((timeA - timeB) * 1000, 15_000));
    maxPage = Math.max(maxPage, apiResponse.data.pageInfo.currentPage);

    if (apiResponse.data.pageInfo.currentPage === 1) {
      setFirstPageIsStale(false);
      setAllowPageFetches(true);
      triggerFirstPageIsStale(time, true);
      maxPage = 1;
    } else if (apiResponse.data.pageInfo.currentPage > props.cache.length / 15) {
      if (apiResponse.data.notifications.at(-1)?.id > props.cache.at(-1)?.id) {
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
      <Show when={notificationsData.loading && page() === 1}>
        <LoaderCircle class="refresh">
          <Tooltip tipPosition="bottom">
            <Show when={props.cache.length === 0} fallback="Fetching fresh notifications">
              Loading notifications
            </Show>
          </Tooltip>
        </LoaderCircle>
      </Show>
      <ol class="notifications-container" classList={{loading: notificationsData.loading && page() === 1}}>
        <For each={props.cache}>{notification =>  {
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
        <Match when={notificationsData.loading && page() > maxPage && props.cache.length}>
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
