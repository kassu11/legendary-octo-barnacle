import { useParams } from "@solidjs/router";
import { useMediaInfo } from "../../context/providers.js";
import { fetchersOLD, fetcherSendersOLD, localizations, requests } from "../../collections/collections.js";
import { fetcherSenderUtils } from "../../utils/utils.js";
import { MalStaffCard } from "../../components/Cards/Cards.scoped.jsx";
import { ErrorBoundary, For, Show } from "solid-js";

export function MediaInfoStaffJikan() {
  const params = useParams();
  const { jikanData } = useMediaInfo();

  const jikanFetcher = fetcherSenderUtils.createFetcherOLD(fetchersOLD.jikan.getStaffByMediaId, localizations.anime, () => params.id);
  const cacheType = fetcherSenderUtils.createDynamicCacheType({ "only-if-cached": () => requests.jikan.inOneSeconds() || jikanData.loading })
  const [jikanStaffData] = fetcherSendersOLD.sendWithCacheTypeWithoutNullUpdates(cacheType, jikanFetcher);

  return (
    <ErrorBoundary fallback="MAL staff page error">
      <Show when={jikanData()}>
        <Show when={jikanStaffData()}>
          <div>
            <ol class="grid-column-auto-fill">
              <For each={jikanStaffData().data}>{({person, positions}) => (
                <MalStaffCard staff={person} positions={positions} />
              )}</For>
            </ol>
          </div>
        </Show>
      </Show>
    </ErrorBoundary>
  );
}
