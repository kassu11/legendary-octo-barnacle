import { useSearchParams, useParams, useNavigate } from "@solidjs/router";
import { createEffect, createMemo, createSignal, Show } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import "./MediaGenresAndTagsSelect.scoped.css"
import { createCleanUpAbortController } from "../../../utils/abortUtils.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../../utils/fetcherUtils.js";
import { queries } from "../../../collections/collections.js";
import { tabTime } from "../../../core/globalState.js";
import { timeStringToMs } from "../../../utils/timeUtils.js";
import { Checkbox } from "../Checkbox.scoped.jsx";

export const [anilistGenresAndTagsData, setAnilistGenresAndTagsData] = createSignal(undefined, { equals: false });

export function MediaGenresAndTagsSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

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
            ...res.data.data.genres.map((id)         => ({ description: id, id: id.toLowerCase(), values: ["+", "-"] })),
            ...res.data.data.tags.map(({ name: id }) => ({ description: id, id: id.toLowerCase(), values: ["+", "-"] })),
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
    if (!genresAndTags?.entries?.length && loading) return [{ id: "internal_loading" }];

    return genresAndTags;

  });

  const genresAndTagsValues = createMemo(() => {
    const values = [];
    const { themes, excludedThemes } = parsedSearchParams();
    themes.forEach(id => values.push(({ id, value: "+", include: true })));
    excludedThemes.forEach(id => values.push(({ id, value: "-", exclude: true })));

    return values;
  });

  const handleChange = e => {
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
      return;
    }

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
      <MultiSelect each={genresAndTagsOptions()?.entries} value={genresAndTagsValues()} onChange={handleChange} button="Genres and Tags">{entry => {
        return (
          <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
            <Checkbox include={entry.include} exclude={entry.exclude} />
            <p>{entry.description}</p>
          </div>
        );
      }}</MultiSelect>
    </Show>
  );
}
