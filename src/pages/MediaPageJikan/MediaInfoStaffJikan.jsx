import { useParams } from "@solidjs/router";
import { useMediaInfo } from "../../context/providers.js";
import {  queries } from "../../collections/collections.js";
import { MalStaffCard } from "../../components/Cards/Cards.scoped.jsx";
import { createEffect, createSignal, ErrorBoundary, For, Show } from "solid-js";
import { createJsonGetFetcher, sendFetcher } from "../../utils/fetcherUtils.js";
import { createTimer, formatMSToString } from "../../utils/timeUtils.js";

export function MediaInfoStaffJikan() {
  const params = useParams();
  const { jikanData } = useMediaInfo();

  const [staffTime, startStaffTimer, stopStaffTimer] = createTimer();
  const [jikanStaffData, setStaffData] = createSignal(undefined, { equals: false });
  let staffFetcher, staffController;
  createEffect(() => {
    staffController?.abort();
    staffController = new AbortController();

    staffFetcher = createJsonGetFetcher(queries.myAnimeListAnimeStaffById, { id: params.id }, staffController.signal);

    sendFetcher(staffFetcher, {
      name: "Jikan staffacters",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === staffFetcher.cacheKey) staffController = null;
      },
      onStart: startStaffTimer,
      onStop: stopStaffTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === staffFetcher.cacheKey) setStaffData(res);
      }
    });
  });

  return (
    <ErrorBoundary fallback="MAL staff page error">
      <Show when={jikanData()}>
        <Show when={jikanStaffData()}>
          <div>
            <p>{formatMSToString(staffTime())}</p>
            <ol class="grid-column-auto-fill">
              <For each={jikanStaffData().data.data}>{({ person, positions }) => (
                <MalStaffCard staff={person} positions={positions} />
              )}</For>
            </ol>
          </div>
        </Show>
      </Show>
    </ErrorBoundary>
  );
}
