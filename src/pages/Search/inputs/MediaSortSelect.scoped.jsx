import { useSearchParams, useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { FilterSelect, SORT_REVERSE_SUFFIX } from "@/components/filters/FilterSelect.scoped.jsx";
import { SortIcon } from "@/assets/icons.jsx";

const DEFAULT_SORT_ID = "popularity";
const DEFAULT_SORT_VALUE = "popularity_desc";

const sortIdOf = value => value.replace(/_desc|_plus/g, "");
const isDescending = value => value.includes("_desc");

export function MediaSortSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();

  // Note: These sort options have been removed because they did not work: format, title_english_desc, title_native,
  // First value is the default direction of the select: numbers are high to low and text is A to Z
  const sortOptions = createMemo(() => {
    const { type } = params;

    const options = [
      { description: "Duration", id: "duration", type: "numeric", values: ["duration_desc_plus", "duration_plus",] },
      { description: "Favourites", id: "favourites", type: "numeric", values: ["favourites_desc", "favourites",] },
      { description: "Finished Date", id: "end_date", type: "numeric", values: ["end_date_desc_plus", "end_date_plus",] },
      { description: "ID", id: "id", type: "numeric", values: ["id_desc", "id",] },
      { description: "Last Updated", id: "updated_at", type: "numeric", values: ["updated_at_desc", "updated_at",] },
      { description: "Popularity", id: "popularity", type: "numeric", values: ["popularity_desc", "popularity",] },
      { description: "Score", id: "score", type: "numeric", values: ["score_desc_plus", "score_plus",] },
      { description: "Starting Date", id: "start_date", type: "numeric", values: ["start_date_desc_plus", "start_date_plus",] },
      { description: "Status", id: "status", type: "alphabetic", values: ["status", "status_desc",] },
      { description: "Title English", id: "title_english", type: "alphabetic", values: ["title_english",] },
      { description: "Title Romaji", id: "title_romaji", type: "alphabetic", values: ["title_romaji", "title_romaji_desc",] },
      { description: "Trending", id: "trending", type: "numeric", values: ["trending_desc", "trending",] },
    ];

    if (type === "media") {
      options.push({ description: "Chapters / Episodes", id: "progress", type: "numeric", values: ["progress_desc_plus", "progress_plus"] });
      options.push({ description: "Type", id: "type", type: "alphabetic", values: ["type", "type_desc"] });
    } else if (type === "anime") {
      options.push({ description: "Episodes", id: "progress", type: "numeric", values: ["progress_desc_plus", "progress_plus"] });
    } else if (type === "manga") {
      options.push({ description: "Chapters", id: "progress", type: "numeric", values: ["progress_desc_plus", "progress_plus"] });
      options.push({ description: "Volumes", id: "volumes", type: "numeric", values: ["volumes_desc_plus", "volumes_plus"] });
    }

    return options.sort((a, b) => a.description.localeCompare(b.description));

  });

  const optionOf = id => sortOptions().find(option => option.id === id);

  const sortValues = createMemo(() => {
    const sort = parsedSearchParams().sort || [];
    return sort.map(sortIdOf).flatMap((id, i) => {
      if (id === "format") return [];

      const option = optionOf(id);
      const isReversed = !!option && isDescending(sort[i]) !== isDescending(option.values[0]);
      return [isReversed ? id + SORT_REVERSE_SUFFIX : id];
    });
  });

  const handleChange = ({ sort: tokens }) => {
    // Without a header the default is left out of the url, but a header has its own default sort that needs to be overridden
    if (!tokens.length) {
      setSearchParams({ sort: params.header ? DEFAULT_SORT_VALUE : undefined }, { replace: true });
      return;
    }

    const currentSort = parsedSearchParams().sort || [];
    const sort = tokens.map(token => {
      const isReversed = token.endsWith(SORT_REVERSE_SUFFIX);
      const id = isReversed ? token.slice(0, -SORT_REVERSE_SUFFIX.length) : token;
      const values = optionOf(id)?.values;
      const value = values && (values[isReversed ? 1 : 0] ?? values[0]);
      // Value in the url can differ from the option, for example when the active query for required score has been removed
      return currentSort.find(old => sortIdOf(old) === id && (!value || isDescending(old) === isDescending(value))) ?? value;
    });

    setSearchParams({ sort }, { replace: true });
  };

  return (
    <FilterSelect param="sort" sort defaultValue={DEFAULT_SORT_ID} noEscapeCancel tooltip="Order the results. Click a sort again to reverse it, hold Ctrl to sort by multiple fields, hold Shift to add every field in between" each={sortOptions()} value={sortValues()} setSearchParams={handleChange} icon={<SortIcon />} button="Sort" />
  );
}
