import {useAuthentication} from "../../context/providers.js";
import {Show} from "solid-js";
import {ActivityPage} from "./ActivityPage.jsx";

export function ActivityReel(props) {
  const {accessToken} = useAuthentication();
  const pagelessFetcher = fetcherSenderUtils.createFetcher(fetchers.anilist.activityPageless, accessToken, props.variables);
  const [pagelessCacheData, {mutateCache, mutateBoth}] = fetcherSenders.sendWithNullUpdates(pagelessFetcher);

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

  const [isDebug, setIsDebug] = signals.debug();

  return (
    <Show when={!pagelessCacheData.loading}>
      <Show when={modes.debug}>
        <button onClick={() => setIsDebug(s => !s)}>debug: {"" + isDebug()}</button>
      </Show>
      <ActivityPage cache={pagelessCacheData()?.data?.[0] || []} isDebug={isDebug} updateCache={updateCache}
                    mutateCache={mutateCache} {...props} />
    </Show>
  );
}