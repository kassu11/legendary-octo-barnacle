import { useSearchParams, useParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { GenreIcon, TagsIcon } from "@/assets/icons.jsx";
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
        setAnilistGenresAndTagsData({
          genres: res.data.data.genres.map(id => ({ description: id, id: id.toLowerCase(), tooltipTitle: "Genre", tooltip: genreDescriptions[id], isAdult: id === "Hentai" })),
          tags: res.data.data.tags.map(tag => ({ description: tag.name, id: tag.name.toLowerCase(), tooltipTitle: tag.category + (tag.isAdult ? " (18+)" : ""), tooltip: tag.description, isAdult: tag.isAdult })),
          validGenres: new Set(res.data.data.genres.map(g => g.toLowerCase())),
          validTags: new Set(res.data.data.tags.map(t => t.name.toLowerCase())),
        });
      }
    });
  });

  const showAdult = () => {
    const { age } = parsedSearchParams();
    return age === "any" || age === "rx";
  };

  const genreOptions = createMemo(() => {
    const genres = anilistGenresAndTagsData()?.genres || [];
    return showAdult() ? genres : genres.filter(genre => !genre.isAdult);
  });

  const tagOptions = createMemo(() => {
    const tags = anilistGenresAndTagsData()?.tags || [];
    return showAdult() ? tags : tags.filter(tag => !tag.isAdult);
  });

  const genreValues = createMemo(() => {
    const { genres, excludedGenres } = parsedSearchParams();
    return [...genres, ...excludedGenres.map(id => "-" + id)];
  });

  const tagValues = createMemo(() => {
    const { tags, excludedTags } = parsedSearchParams();
    return [...tags, ...excludedTags.map(id => "-" + id)];
  });

  return (
    <>
      <FilterSelect
        param="genre"
        excludable
        noEscapeCancel
        tooltip="Broad categories of the story. Click once to include, twice to exclude. Hover a genre to see its description"
        each={genreOptions()}
        value={genreValues()}
        setSearchParams={query => setSearchParams(query, { replace: true })}
        icon={<GenreIcon />}
        button="Genre"
        loading={genresAndTagsLoading()}
        emptyText={genresAndTagsLoading() ? "Loading list" : "Failed to fetch Anilist genres"}
      />
      <FilterSelect
        param="tag"
        excludable
        noEscapeCancel
        tooltip="Specific themes, settings and character traits. Click once to include, twice to exclude. Hover a tag to see its description"
        each={tagOptions()}
        value={tagValues()}
        setSearchParams={query => setSearchParams(query, { replace: true })}
        icon={<TagsIcon />}
        button="Tag"
        loading={genresAndTagsLoading()}
        emptyText={genresAndTagsLoading() ? "Loading list" : "Failed to fetch Anilist tags"}
      />
    </>
  );
}
