import { useSearchParams, useParams, useNavigate } from "@solidjs/router";
import { createEffect, createMemo, createSignal, Match, Show, Switch } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { arrayUtils } from "../../../utils/utils.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import "./MediaExternalSourcesSelect.scoped.css"
import { createCleanUpAbortController } from "../../../utils/abortUtils.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../../utils/fetcherUtils.js";
import { queries } from "../../../collections/collections.js";
import { tabTime } from "../../../core/globalState.js";
import { timeStringToMs } from "../../../utils/timeUtils.js";
import { Checkbox } from "../Checkbox.scoped.jsx";

export const [externalSourcesData, setExternalSourcesData] = createSignal(undefined, { equals: false });

export function MediaExternalSourcesSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

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

  const externalSourcesOptions = createMemo(() => {
    const externalValues = externalSourcesData();
    const loading = externalSourcesLoading();
    const { type } = params;
    if (type !== externalValues?.type && loading) return [{ id: "internal_loading" }];

    return externalValues?.sources?.map(({ site, ...rest }) => ({ description: site, ...rest }));


  });

  const externalSourcesValues = createMemo(() => {
    return arrayUtils.wrapToArray(parsedSearchParams().externalSources).map(id => ({ id, value: true }));
  });

  const handleChange = e => {
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
    }
    if (e.oldUrl || !e.target) return;

    const newActiveValues = [...externalSourcesValues()];
    const index = newActiveValues.findIndex(val => val.id == e.target);

    if (index == -1) {
      newActiveValues.push({ id: e.target, value: true });
    } else {
      newActiveValues.splice(index, 1);
    }

    setSearchParams({ externalSources: newActiveValues.map(e => e.id) }, { replace: true });

  };

  return (
    <Show when={params.type !== "media"}>
      <MultiSelect each={externalSourcesOptions()} value={externalSourcesValues()} onChange={handleChange} button={params.type === "anime" ? "Streaming On" : "Readable On"}>{entry => {
        return (
          <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
            <Show when={entry.icon}>
              <img src={entry.icon} alt="External source icon" style={{ "background-color": entry.color }} />
            </Show>
            <p>
              {entry.description}{" "}
              <Show when={entry.language}>
                <sup>
                  <Switch fallback={entry.language}>
                    <Match when={entry.language === "Chinese"}>ZH</Match>
                    <Match when={entry.language === "English"}>EN</Match>
                    <Match when={entry.language === "French"}>FR</Match>
                    <Match when={entry.language === "German"}>DE</Match>
                    <Match when={entry.language === "Indonesian"}>ID</Match>
                    <Match when={entry.language === "Japanese"}>JA</Match>
                    <Match when={entry.language === "Korean"}>KO</Match>
                    <Match when={entry.language === "Portuguese"}>PT</Match>
                    <Match when={entry.language === "Spanish"}>ES</Match>
                    <Match when={entry.language === "Thai"}>TH</Match>
                  </Switch>
                </sup>
              </Show>
            </p>

            <Checkbox scoped checked={entry.value} class="checkbox" />

          </div>
        );
      }}</MultiSelect>
    </Show>
  );
}
