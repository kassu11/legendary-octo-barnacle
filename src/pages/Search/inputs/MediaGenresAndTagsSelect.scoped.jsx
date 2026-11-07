import { useSearchParams, useParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, Show } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { GenreIcon } from "@/assets/SearchFilterIcons.jsx";
import { createCleanUpAbortController } from "@/utils/abortUtils.js";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { queries } from "@/api/api.js";
import { tabTime } from "@/state/globalState.js";
import { timeStringToMs } from "@/utils/timeUtils.js";

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

  const genresAndTagsValues = createMemo(() => {
    const { themes, excludedThemes } = parsedSearchParams();
    return [...themes, ...excludedThemes.map(id => "-" + id)];
  });

  return (
    <Show when={params.type !== "media"}>
      <FilterSelect
        param="theme"
        excludable
        noEscapeCancel
        tooltip="Genres and tags. Click once to include, twice to exclude. Hover a theme to see its description"
        each={anilistGenresAndTagsData()?.entries || []}
        value={genresAndTagsValues()}
        setSearchParams={query => setSearchParams(query, { replace: true })}
        icon={<GenreIcon />}
        button="Theme"
        loading={genresAndTagsLoading()}
        emptyText={genresAndTagsLoading() ? "Loading list" : "Failed to fetch Anilist genres and tags"}
      />
    </Show>
  );
}
