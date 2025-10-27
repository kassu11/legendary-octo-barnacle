import { useParams } from "@solidjs/router";
import { useMediaInfo } from "../../context/providers.js";
import { fetchers, fetcherSenders, localizations, requests } from "../../collections/collections.js";
import { fetcherSenderUtils } from "../../utils/utils.js";
import { MalStaffCard } from "../../components/Cards/Cards.scoped.jsx";
import { ErrorBoundary } from "solid-js";

export function MediaInfoStaffJikan() {
  const params = useParams();
  const { jikanData } = useMediaInfo();

  const jikanFetcher = fetcherSenderUtils.createFetcher(fetchers.jikan.getStaffByMediaId, localizations.anime, () => params.id);
  const cacheType = fetcherSenderUtils.createDynamicCacheType({ "only-if-cached": () => requests.jikan.inOneSeconds() || jikanData.loading })
  const [jikanStaffData] = fetcherSenders.sendWithCacheTypeWithoutNullUpdates(cacheType, jikanFetcher);

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
