import { createRenderEffect, createSignal, Show } from "solid-js";
import { HomePageActivityReelContent } from "./ActivityPage.scoped.jsx";
import { modes, signals, queries } from "../../collections/collections.js";
import { arrayUtils } from "../../utils/utils.js";
import { createAnilistFetcher } from "../../utils/fetcherUtils.js";
import { getFetcherValueFromStorage, setFetcherValueToStorage } from "../../utils/storageUtils.js";
import { isTypeFunction } from "../../utils/functionUtils.js";

export function HomePageActivityReel(props) {
  const [pagelessCacheLoading, setPagelessCacheLoading] = createSignal(false);
  const [pagelessCacheData, setPagelessCacheData] = createSignal(undefined, { equals: false });

  createRenderEffect(async () => {
    setPagelessCacheLoading(true);
    const pagelessFetcher = createAnilistFetcher(queries.anilistActivity, { ...props.variables, page: "pageless" });
    const data = await getFetcherValueFromStorage(pagelessFetcher);

    if (data) setPagelessCacheData(data);
    else {
      setPagelessCacheData({
        data: null,
        name: "Home Activity",
        expires: new Date().setHours(24 * 356),
        modified: new Date(),
        cacheKey: pagelessFetcher.cacheKey
      });
    }
    setPagelessCacheLoading(false);
  });

  const updateCache = (apiResponse, pagelessFetcher) => {
    const { pageInfo, activities } = apiResponse.data.data.Page;
    if (!activities?.length || pagelessFetcher.cacheKey !== pagelessCacheData().cacheKey) {
      return;
    }

    setPagelessCacheData(api => {
      try {
        if (!api?.data?.length) {
          api.data = [activities];
          return api;
        }

        const lastId = activities.at(-1).id;
        const lastIdIndex = arrayUtils.binarySearchFindAlwaysIndex(api.data[0], activity => activity.id - lastId);
        const lastIdFound = api.data[0][lastIdIndex]?.id === lastId;

        if (pageInfo.currentPage === 1) {
          if (!lastIdFound) {
            api.data.unshift(activities);
            api.data.length = Math.min(api.data.length, 5);
            return api;
          }

          api.data[0].splice(0, lastIdIndex + 1, ...activities);
          return api;
        }

        const firstId = activities[0].id;
        const firstIdIndex = arrayUtils.binarySearchFindAlwaysIndex(api.data[0], activity => activity.id - firstId);
        // Check that current page does not have higher id than the first page
        const firstIdIsHigherThanFirstResults = firstIdIndex === 0 && api.data[0][firstIdIndex].id !== firstId;

        // If the current apiResponse has the highest id return, because the page is not one and we don't wan't the content to jump
        if (firstIdIsHigherThanFirstResults) {
          return api;
        }

        api.data[0].splice(firstIdIndex, (lastIdIndex - firstIdIndex) + lastIdFound, ...activities);

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
      } finally {
        setFetcherValueToStorage(api);
      }
    });
  }

  const mutateCache = mutate => {
    mutate = isTypeFunction(mutate) ? mutate(pagelessCacheData()) : mutate;
    setFetcherValueToStorage(mutate);
  };

  const [isDebug, setIsDebug] = signals.debug();

  return (
    <Show when={!pagelessCacheLoading()}>
      <Show when={modes.debug}>
        <button onClick={() => setIsDebug(s => !s)}>debug: {"" + isDebug()}</button>
      </Show>
      <HomePageActivityReelContent cache={pagelessCacheData()?.data?.[0] || []} isDebug={isDebug} updateCache={updateCache}
                                   mutateCache={mutateCache} {...props} />
    </Show>
  );
}
