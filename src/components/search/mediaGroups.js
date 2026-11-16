import { formatMediaFormat } from "@/utils/formatUtils";

const SEASONS = ["WINTER", "WINTER", "SPRING", "SPRING", "SPRING", "SUMMER", "SUMMER", "SUMMER", "FALL", "FALL", "FALL", "WINTER"];

// Results are sorted by start date, so the season is read from the start date too.
// AniList's own season field can disagree with the start date, which would split a season into many groups
function seasonOf(media) {
  const { year, month } = media.startDate || {};
  if (year && month) return `${SEASONS[month - 1]} ${month === 12 ? year + 1 : year}`;
  if (year) return `${year}`;
  if (media.season && media.seasonYear) return `${media.season} ${media.seasonYear}`;
  return null;
}

const capitalize = text => text.charAt(0) + text.slice(1).toLowerCase();

/**
 * Results are grouped by runs of media that share the same key, so the results have to be sorted by the group first
 * sort: Sorts to add before the selected sorts, or nothing when the first selected sort already orders the groups
 */
export const MEDIA_GROUPS = {
  format: {
    sort: () => ["format"],
    key: media => media.format,
    title: key => key ? formatMediaFormat(key) : "Format TBA",
  },
  season: {
    sort: sorts => sorts[0]?.startsWith("start_date") ? [] : ["start_date_desc"],
    key: seasonOf,
    title: key => key ? key.split(" ").map(capitalize).join(" ") : "Release Date TBA",
  },
  year: {
    sort: sorts => sorts[0]?.startsWith("start_date") ? [] : ["start_date_desc"],
    key: media => media.startDate?.year,
    title: key => key ? `${key}` : "Release Year TBA",
  },
};

export const mediaGroupSort = (groupBy, sorts) => MEDIA_GROUPS[groupBy]?.sort(sorts) || [];
