import { useSearchParams, useParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, Match, Show, Switch } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { arrayUtils } from "@/utils/utils.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { AvailableIcon } from "@/assets/SearchFilterIcons.jsx";
import "./MediaExternalSourcesSelect.scoped.css"
import { createCleanUpAbortController } from "@/utils/abortUtils.js";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { queries } from "@/api/api.js";
import { tabTime } from "@/state/globalState.js";
import { timeStringToMs } from "@/utils/timeUtils.js";

export const [externalSourcesData, setExternalSourcesData] = createSignal(undefined, { equals: false });

export function MediaExternalSourcesSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();

  const externalSourcesController = createCleanUpAbortController();
  const [externalSourcesLoading, setExternalSourcesLoading] = createSignal(false);
  let externalSourcesFetcher;
  createEffect(() => {
    const signal = externalSourcesController.abortAndRenew();

    const { type, api } = params;
    if (api === "mal" || type === "media") return;

    externalSourcesFetcher = createAnilistFetcher(queries.anilistExternalSources, { type: type.toUpperCase() }, signal);

    sendAnilistFetcher(externalSourcesFetcher, {
      name: "Anilist external sources",
      active: (res, settings) => {
        if (!res) return true;
        if (settings.debug) return false;
        // Only update external sources once a day
        return (tabTime - res.modified) > timeStringToMs("1d");
      },
      onStart: () => setExternalSourcesLoading(true),
      onStop: () => setExternalSourcesLoading(false),
      onFetch: () => externalSourcesController.disable(),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== externalSourcesFetcher.cacheKey) return;

        const sourceObject = {
          sources: res.data.data.ExternalLinkSourceCollection,
          validIds: new Set(res.data.data.ExternalLinkSourceCollection.map(e => e.id)),
          type,
        };

        setExternalSourcesData(sourceObject);
      }
    });
  });

  const isLoadingSources = () => params.type !== externalSourcesData()?.type && externalSourcesLoading();

  const externalSourcesOptions = createMemo(() => {
    if (isLoadingSources()) return [];

    return externalSourcesData()?.sources?.map(({ site, id, ...rest }) => ({ description: site, id: "" + id, ...rest })) || [];
  });

  const externalSourcesValues = createMemo(() => {
    return arrayUtils.wrapToArray(parsedSearchParams().externalSources).map(String);
  });

  return (
    <Show when={params.type !== "media"}>
      <FilterSelect
        param="externalSources"
        tooltip={params.type === "anime" ? "Show only media available on these streaming services" : "Show only media readable on these sites"}
        each={externalSourcesOptions()}
        value={externalSourcesValues()}
        setSearchParams={query => setSearchParams(query, { replace: true })}
        icon={<AvailableIcon />}
        button="Available"
        loading={isLoadingSources()}
        emptyText={isLoadingSources() ? "Loading sources" : "Failed to fetch Anilist media sources"}
        rowIcon={row => (
          <Show when={row.icon}>
            <img src={row.icon} alt="External source icon" style={{ "background-color": row.color }} />
          </Show>
        )}
        rowLabel={row => (
          <>
            {row.description}{" "}
            <Show when={row.language}>
              <sup>
                <Switch fallback={row.language}>
                  <Match when={row.language === "Chinese"}>ZH</Match>
                  <Match when={row.language === "English"}>EN</Match>
                  <Match when={row.language === "French"}>FR</Match>
                  <Match when={row.language === "German"}>DE</Match>
                  <Match when={row.language === "Indonesian"}>ID</Match>
                  <Match when={row.language === "Japanese"}>JA</Match>
                  <Match when={row.language === "Korean"}>KO</Match>
                  <Match when={row.language === "Portuguese"}>PT</Match>
                  <Match when={row.language === "Spanish"}>ES</Match>
                  <Match when={row.language === "Thai"}>TH</Match>
                </Switch>
              </sup>
            </Show>
          </>
        )}
      />
    </Show>
  );
}
