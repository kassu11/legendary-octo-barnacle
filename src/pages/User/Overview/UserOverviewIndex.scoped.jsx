import { A } from "@solidjs/router";
import { batch, createEffect, createMemo, createRenderEffect, createSignal, For, Match, onCleanup, onMount, Show, Switch, untrack } from "solid-js";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { useUser } from "@/state/providers.js";
import { formatTitleToUrl, mediaUrl, numberCommas } from "@/utils/formatUtils.js";
import { ActivityCard } from "@/components/Activity.scoped.jsx";
import { LoaderCircle } from "@/components/LoaderCircle.scoped.jsx";
import { Tooltip } from "@/components/Tooltip.scoped";
import "./UserOverviewIndex.scoped.css";
import { queries } from "@/api/api.js";
import { asserts, arrayUtils } from "@/utils/utils.js";
import { ActivityHistoryScoped } from "./ActivityHistory.scoped.jsx";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { isTypeFunction } from "@/utils/functionUtils.js";
import { getFetcherValueFromStorage, setFetcherValueToStorage } from "@/utils/storageUtils.js";
import { deletedActivityIds } from "@/state/globalState.js";
import { createCleanUpAbortController } from "@/utils/abortUtils.js";

export function Overview() {
  const { user } = useUser();
  const userId = createMemo(() => user().id);

  return (
    <div class="user-profile-overview-body">
      <div class="user-info-container">
        <Switch>
          <Match when={user().donatorTier === 1}>
            <p>{user().donatorBadge}</p>
          </Match>
          <Match when={user().donatorTier === 2}>
            <p>{user().donatorBadge} (fancy)</p>
          </Match>
          <Match when={user().donatorTier === 3}>
            <p>{user().donatorBadge} (extra fancy)</p>
          </Match>
        </Switch>
        <ActivityHistoryScoped history={user().stats?.activityHistory || []} />
        <Show when={user().favourites.anime.edges.length}>
          <div class="user-favourites">
            <h3>Favourite animes</h3>
            <ol class="grid-reel-auto-fill">
              <For each={user().favourites.anime.edges}>{anime => (
                <li class="item">
                  <A href={mediaUrl(anime.node)}>
                    <img src={anime.node.coverImage.large} alt="Cover" />
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={user().favourites.manga.edges.length}>
          <div class="user-favourites">
            <h3>Favourite manga</h3>
            <ol class="grid-reel-auto-fill">
              <For each={user().favourites.manga.edges}>{manga => (
                <li class="item">
                  <A href={mediaUrl(manga.node)}>
                    <img src={manga.node.coverImage.large} alt="Cover" />
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={user().favourites.characters.edges.length}>
          <div class="user-favourites">
            <h3>Favourite characters</h3>
            <ol class="grid-reel-auto-fill">
              <For each={user().favourites.characters.edges}>{character => (
                <li class="item">
                  <A href={"/ani/character/" + character.node.id + "/" + formatTitleToUrl(character.node.name.userPreferred)}>
                    <img src={character.node.image.large} alt="Cover" />
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={user().favourites.staff.edges.length}>
          <div class="user-favourites">
            <h3>Favourite staff</h3>
            <ol class="grid-reel-auto-fill">
              <For each={user().favourites.staff.edges}>{staff => (
                <li class="item">
                  <A href={"/ani/staff/" + staff.node.id + "/" + formatTitleToUrl(staff.node.name.userPreferred)}>
                    <img src={staff.node.image.large} alt="Cover" />
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={user().favourites.studios.edges.length}>
          <div class="user-favourites-studio">
            <h3>Favourite studio</h3>
            <ol>
              <For each={user().favourites.studios.edges}>{studio => (
                <li class="item">
                  <A href={"/ani/studio/" + studio.node.id + "/" + formatTitleToUrl(studio.node.name)}>
                    {studio.node.name}
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
      </div>
      <div class="user-activity-container">
        <div class="user-profile-progress">
          <Show when={user().statistics.anime.count}>
            <div class="container">
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.anime.count)}</p>
                <p>Total anime</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{(user().statistics.anime.minutesWatched / 60 / 24).toFixed(1)}</p>
                <p>Days watched</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.anime.episodesWatched)}</p>
                <p>Episodes watched</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{user().statistics.anime.meanScore}</p>
                <p>Mean score</p>
              </div>
            </div>
          </Show>
          <Show when={user().statistics.manga.count}>
            <div class="container">
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.manga.count)}</p>
                <p>Total manga</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.manga.chaptersRead)}</p>
                <p>Chapters read</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.manga.volumesRead)}</p>
                <p>Volumes read</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{user().statistics.manga.meanScore}</p>
                <p>Mean score</p>
              </div>
            </div>
          </Show>
        </div>
        <div class="user-profile-genres">
          <GenrePreview title="Anime genre overview" type="anime" genres={user().statistics.anime.genrePreview} total={user().statistics.anime.count}/>
          <GenrePreview title="Manga genre overview" type="manga" genres={user().statistics.manga.genrePreview} total={user().statistics.manga.count}/>
        </div>
        <Show when={userId()} keyed>
          <UserActivityReel userId={userId()} />
        </Show>
      </div>
    </div>
  );
}

function updateCacheMap(start, end, cacheMap, entries) {
  for (let i = start; i <= end; i++) {
    cacheMap[entries[i].id] = i;
  }

  return cacheMap;
}

function UserActivityReel(props) {
  const [pagelessCacheLoading, setPagelessCacheLoading] = createSignal(false);
  const [pagelessCacheData, setPagelessCacheData] = createSignal(undefined, { equals: false });

  createRenderEffect(async () => {
    setPagelessCacheLoading(true);
    const pagelessFetcher = createAnilistFetcher(queries.profileActivity, { id: props.userId, page: "pageless" });
    const data = await getFetcherValueFromStorage(pagelessFetcher);

    batch(() => {
      if (data) setPagelessCacheData(data);
      else {
        setPagelessCacheData({
          data: null,
          name: "Anilist profile activities pageless",
          expires: new Date().setHours(24 * 356),
          modified: new Date(),
          cacheKey: pagelessFetcher.cacheKey
        });
      }
      setPagelessCacheLoading(false);
    });
  });

  const mutateCache = mutate => {
    if (isTypeFunction(mutate)) mutate = mutate(untrack(pagelessCacheData));
    setFetcherValueToStorage(mutate);
  };

  // Pinned activities are sorted first, so the activities are placed by their page index instead of their id
  const updateCache = (onePageRes, pagelessFetcher) => {
    if (pagelessFetcher.cacheKey !== pagelessCacheData().cacheKey) return;
    const { pageInfo } = onePageRes.data.data.Page;
    // Response could have been sent before the activity was deleted
    const activities = onePageRes.data.data.Page.activities.filter(activity => !deletedActivityIds.has(activity.id));

    setPagelessCacheData(pagelessRes => {
      try {
        if (!pagelessRes?.data?.items?.length) {
          pagelessRes.data = {
            items: activities,
            indices: updateCacheMap(0, activities.length - 1, {}, activities),
          };
          return pagelessRes;
        }

        const { items, indices } = pagelessRes.data;
        const start = (pageInfo.currentPage - 1) * pageInfo.perPage;
        for (let i = 0; i < activities.length; i++) {
          const activity = activities[i];
          if (activity.id in indices) {
            const cacheIndex = indices[activity.id];
            items.splice(cacheIndex, 1);
            const newIndex = Math.min(start + i, items.length);
            items.splice(newIndex, 0, activity);
            updateCacheMap(Math.min(newIndex, cacheIndex), Math.max(newIndex, cacheIndex), indices, items);
          } else {
            // New id added
            const newIndex = Math.min(start + i, items.length);
            items.splice(newIndex, 0, activity);
            updateCacheMap(newIndex, items.length - 1, indices, items);
          }
        }

        // Activities after the last page don't exist anymore
        if (!pageInfo.hasNextPage) {
          for (const activity of items.splice(start + activities.length)) {
            delete indices[activity.id];
          }
        }

        return pagelessRes;
      } finally {
        mutateCache(pagelessRes);
      }
    });
  };

  const deleteFromCache = id => {
    setPagelessCacheData(pagelessRes => {
      if (!(id in (pagelessRes.data?.indices || {}))) return pagelessRes;
      const items = pagelessRes.data.items.filter(activity => activity.id !== id);
      pagelessRes.data = { items, indices: updateCacheMap(0, items.length - 1, {}, items) };
      mutateCache(pagelessRes);
      return pagelessRes;
    });
  };

  return (
    <Show when={!pagelessCacheLoading()}>
      <UserActivityPage cache={pagelessCacheData()?.data?.items || []} updateCache={updateCache} mutateCache={mutateCache} deleteFromCache={deleteFromCache} {...props} />
    </Show>
  );
}

// Anilist gives an error when going over 5000 entries, but the last allowed page still claims to have a next page
const maxActivityPage = 5000 / 25;

function UserActivityPage(props) {
  const [page, setPage] = createSignal(props.cache.length ? undefined : 1);
  const [hasNextPage, setHasNextPage] = createSignal(true);
  const [anilistActivityLoading, setAnilistActivityLoading] = createSignal(false);
  const anilistActivityController = createCleanUpAbortController();
  let anilistActivityFetcher;
  createEffect(() => {
    const signal = anilistActivityController.abortAndRenew();
    const p = page();
    if (!p) return;

    const pagelessFetcher = createAnilistFetcher(queries.profileActivity, { id: props.userId, page: "pageless" });
    anilistActivityFetcher = createAnilistFetcher(queries.profileActivity, { id: props.userId, page: p }, signal);

    sendAnilistFetcher(anilistActivityFetcher, {
      name: "Anilist activities",
      cache: null,
      onFetch: () => anilistActivityController.disable(),
      onStart: () => setAnilistActivityLoading(true),
      onStop: () => setAnilistActivityLoading(false),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== anilistActivityFetcher.cacheKey) return;
        const { pageInfo, activities } = res.data.data.Page;
        asserts.assertTruthy(hardcodedPageCount === pageInfo.perPage, "Page count is wrong");
        freshPages.add(pageInfo.currentPage);
        // Anilist can say we have a next page, even when the current page is empty
        setHasNextPage(pageInfo.hasNextPage && activities.length > 0 && pageInfo.currentPage < maxActivityPage);

        props.updateCache(res, pagelessFetcher);
        updatePage();
      }
    });
  });

  const freshPages = new Set();
  const triggerPage = leadingAndTrailing(debounce, num => !anilistActivityLoading() && setPage(num), 1000);

  function updatePage() {
    const nextPage = getPageNumberByScrollPosition();
    if (nextPage) {
      triggerPage(nextPage);
    }
  }

  const hardcodedPageCount = 25;

  function getPageNumberByScrollPosition() {
    const nextPage = untrack(hasNextPage);
    const pageCount = Math.ceil(props.cache.length / hardcodedPageCount);

    if (visiblePages.has(pageCount) && !freshPages.has(pageCount)) {
      return pageCount;
    } else if (visiblePages.has(pageCount) && nextPage && freshPages.has(pageCount)) {
      return pageCount + 1;
    } else {
      const notFreshPages = [...visiblePages.difference(freshPages)].sort((a, b) => b - a);

      if (!notFreshPages.length) {
        return;
      }

      return arrayUtils.atPercent(notFreshPages, .5);
    }
  }

  const visiblePages = new Set();
  const intersectionCallback = (entries) => {
    for (const entry of entries) {
      const page = parseInt(entry.target.dataset.page);
      asserts.assertTruthy(Number.isInteger(page));

      if (entry.isIntersecting) {
        visiblePages.add(page);
      } else {
        visiblePages.delete(page);
      }
    }

    updatePage();
  };

  const intersectionObserver = new IntersectionObserver(intersectionCallback, { rootMargin: "500px" });
  onCleanup(() => intersectionObserver.disconnect());

  return (
    <>
      <div class="user-profile-activity">
        <For each={props.cache}>{(activity, i) => {
          let ref;
          onMount(() => intersectionObserver.observe(ref));

          return (
            <ActivityCard activity={activity} mutateCache={props.mutateCache} onDelete={props.deleteFromCache} hideProfile={true} small={true} wrapper={wrapperProps => (
              <div ref={elem => ref = elem} attr:data-page={Math.ceil((i() + 1) / hardcodedPageCount)} {...wrapperProps} />
            )}/>
          );
        }}</For>
      </div>
      <Show when={anilistActivityLoading() && page() > Math.ceil(props.cache.length / hardcodedPageCount)}>
        <LoaderCircle scoped class="spinner">
          <Tooltip placements={["bottom", "top"]}>Loading activities</Tooltip>
        </LoaderCircle>
      </Show>
    </>
  );
}

function GenrePreview(props) {
  asserts.assertTruthy(props.genres, "Genres missing");
  asserts.assertTruthy(props.title, "Title missing");

  const { user } = useUser();

  return (
    <Show when={props.total}>
      <div class="user-genres-overview">
        <h3>{props.title}</h3>
        <ol>
          <For each={props.genres}>{genre => (
            <li class="item">
              <A href={"/user/" + user().name + "/" + props.type + "/list?genre=" + genre.genre}>
                {genre.genre} <span>{Math.round(genre.count / props.total * 100)}%</span>
              </A>
            </li>
          )}</For>
        </ol>
      </div>
    </Show>
  );
}
