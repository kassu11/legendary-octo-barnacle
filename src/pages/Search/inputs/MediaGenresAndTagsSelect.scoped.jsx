import { useSearchParams, useParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, Match, Show, Switch } from "solid-js";
import { useParsedSearchParams } from "@/context/providers.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import { GenreIcon } from "@/assets/SearchFilterIcons.jsx";
import { createCleanUpAbortController } from "@/utils/abortUtils.js";
import { createAnilistFetcher, sendAnilistFetcher } from "@/utils/fetcherUtils.js";
import { queries } from "@/collections/collections.js";
import { tabTime } from "@/core/globalState.js";
import { timeStringToMs } from "@/utils/timeUtils.js";
import { Checkbox } from "@/components/ui/Checkbox.scoped.jsx";
import { useNavigateAndSearch } from "@/utils/urlUtils.js";
import { MediaSelectItem } from "./MediaSelectItem.scoped.jsx";
import { LoaderCircle } from "@/components/LoaderCircle.scoped.jsx";
import "./MediaGenresAndTagsSelect.scoped.css";

// Anilist doesn't provide descriptions for genres, only for tags
const genreDescriptions = {
  "Action":        "Exciting fights, chases and physical conflict drive the story.",
  "Adventure":     "Characters travel or explore, often on a journey or quest.",
  "Comedy":        "Focuses on humor and making the audience laugh.",
  "Drama":         "Emotional, character-driven stories with serious conflicts.",
  "Ecchi":         "Contains sexual humor and suggestive fan service, without explicit content.",
  "Fantasy":       "Set in worlds with magic, supernatural creatures or other fantastical elements.",
  "Hentai":        "Sexually explicit adult content.",
  "Horror":        "Aims to frighten, disturb or unsettle the audience.",
  "Mahou Shoujo":  "Magical girls who transform and use their powers, often to fight evil.",
  "Mecha":         "Features giant robots or mechanical suits piloted by people.",
  "Music":         "Music or musicians are central to the story.",
  "Mystery":       "Revolves around solving a crime, puzzle or unexplained event.",
  "Psychological": "Explores the minds, emotions and mental states of the characters.",
  "Romance":       "Focuses on romantic relationships between characters.",
  "Sci-Fi":        "Based on imagined science and technology, such as space travel or the future.",
  "Slice of Life": "Depicts the everyday lives of the characters.",
  "Sports":        "Centers around a sport and its competitions.",
  "Supernatural":  "Includes ghosts, spirits, powers or other phenomena beyond the natural world.",
  "Thriller":      "Tense and suspenseful, keeping the audience on edge.",
};

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
            ...res.data.data.genres.map(id => ({ description: id, id: id.toLowerCase(), tooltipTitle: "Genre", tooltip: genreDescriptions[id] })),
            ...res.data.data.tags.map(tag  => ({ description: tag.name, id: tag.name.toLowerCase(), tooltipTitle: tag.category + (tag.isAdult ? " (18+)" : ""), tooltip: tag.description })),
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
      <MultiSelect tooltip="Genres and tags. Click once to include, twice to exclude. Hover a theme to see its description" each={genresAndTagsOptions()} value={genresAndTagsValues()} onChange={handleChange} icon={<GenreIcon />} button="Theme">{entry => {
        return (
          <MediaSelectItem classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }} tooltip={entry.tooltip} tooltipTitle={entry.tooltipTitle}>
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
