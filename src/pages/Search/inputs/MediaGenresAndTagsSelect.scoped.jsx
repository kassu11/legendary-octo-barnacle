import { useSearchParams, useParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, Match, Show, Switch } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import { createCleanUpAbortController } from "../../../utils/abortUtils.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../../utils/fetcherUtils.js";
import { queries } from "../../../collections/collections.js";
import { tabTime } from "../../../core/globalState.js";
import { timeStringToMs } from "../../../utils/timeUtils.js";
import { Checkbox } from "../Checkbox.scoped.jsx";
import { useNavigateAndSearch } from "../../../utils/urlUtils.js";
import { MediaSelectItem } from "./MediaSelectItem.scoped.jsx";
import { LoaderCircle } from "../../../components/LoaderCircle.scoped.jsx";
import "./MediaGenresAndTagsSelect.scoped.css";

export const [anilistGenresAndTagsData, setAnilistGenresAndTagsData] = createSignal(undefined, { equals: false });

export function MediaGenresAndTagsSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigateAndSearch();

  const genresAndTagsController = createCleanUpAbortController();
  const [genresAndTagsLoading, setGenresAndTagsLoading] = createSignal(false);
  createEffect(() => {
    const signal = genresAndTagsController.abortAndRenew();

    if (params.api === "mal") return;

    const genresAndTagsFetcher = createAnilistFetcher(queries.anilistGenresAndTags, {}, signal);

    sendAnilistFetcher(genresAndTagsFetcher, {
      name: "Anilist genres and tags",
      active: (res, settings) => {
        if (!res) return true;
        if (settings.debug) return false;
        // Only update external sources once a day
        return (tabTime - res.modified) > timeStringToMs("1d");
      },
      onStart: () => setGenresAndTagsLoading(true),
      onStop: () => setGenresAndTagsLoading(false),
      onFetch: () => genresAndTagsController.disable(),
      setValue: res => {
        const genreObject = {
          entries: [
            ...res.data.data.genres.map((id)         => ({ description: id, id: id.toLowerCase() })),
            ...res.data.data.tags.map(({ name: id }) => ({ description: id, id: id.toLowerCase() })),
          ],
          genres: res.data.data.genres,
          tags: res.data.data.tags,
          validGenres: new Set(res.data.data.genres.map(g => g.toLowerCase())),
          validTags: new Set(res.data.data.tags.map(t => t.name.toLowerCase())),
        };
        setAnilistGenresAndTagsData(genreObject);
      }
    });
  });

  const genresAndTagsOptions = createMemo(() => {
    const genresAndTags = anilistGenresAndTagsData();
    const loading = genresAndTagsLoading();
    if (!genresAndTags?.entries?.length && loading) return [{ id: "internal_loading", description: "Loading list" }];

    return genresAndTags?.entries || [{ id: "internal_error", description: "Failed to fetch Anilist genres and tags" }];
  });

  const genresAndTagsValues = createMemo(() => {
    const values = [];
    const { themes, excludedThemes } = parsedSearchParams();
    themes.forEach(id => values.push(({ id, value: "+", include: true })));
    excludedThemes.forEach(id => values.push(({ id, value: "-", exclude: true })));

    return values;
  });

  const handleChange = e => {

    if (e.oldUrl) return navigate(e.oldUrl);
    if (!e.target || e.target === "internal_loading" || e.target === "internal_error") return;

    const newActiveValues = [...genresAndTagsValues()];
    const index = newActiveValues.findIndex(val => val.id == e.target);

    if (index == -1) {
      newActiveValues.push({ id: e.target, value: "+" });
    } else if (newActiveValues[index].value === "+") {
      newActiveValues[index].value = "-";
    } else {
      newActiveValues.splice(index, 1);
    }

    setSearchParams({ theme: newActiveValues.map(e => e.value === "+" ? e.id : "-" + e.id) }, { replace: true });

  };

  return (
    <Show when={params.type !== "media"}>
      <MultiSelect each={genresAndTagsOptions()} value={genresAndTagsValues()} onChange={handleChange} button="Genres and Tags">{entry => {
        return (
          <MediaSelectItem classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
            <Switch>

              <Match when={entry.id === "internal_loading"}>
                <div class="spinner-wrapper">
                  <LoaderCircle scoped class="spinner" />
                </div>
                <p>{entry.description}</p>
              </Match>

              <Match when={entry.id === "internal_error"}>
                <p>{entry.description}</p>
              </Match>

              <Match when={true}>
                <Checkbox include={entry.include} exclude={entry.exclude} />
                <p>{entry.description}</p>
              </Match>

            </Switch>
          </MediaSelectItem>
        );
      }}</MultiSelect>
    </Show>
  );
}
