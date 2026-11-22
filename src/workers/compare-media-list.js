import { fuse } from "@/utils/stringUtils.js";

onmessage = ({ data: { includedLists, excludedLists, usersNeeded, ...filtering } }) => {
  compareMediaLists(includedLists, excludedLists, Math.min(+usersNeeded || includedLists.length, includedLists.length), filtering);
};

const tokenFilters = ["format", "status", "countryOfOrigin", "year", "startedYear", "completedYear", "genre", "userStatus", "studio", "tag"];

// Excluded values have a "-" prefix
function parseTokens(tokens) {
  const parsed = { include: [], exclude: [] };
  for (const token of tokens) {
    if (token[0] === "-") parsed.exclude.push(token.slice(1));
    else parsed.include.push(token);
  }
  return parsed;
}

const matchesAny = ({ include, exclude }, test) => (!include.length || include.some(test)) && !exclude.some(test);
const matchesAll = ({ include, exclude }, test) => include.every(test) && !exclude.some(test);
// "true" keeps the entries that match, "false" keeps the ones that don't and any other value doesn't filter
const matchesToggle = (value, matches) => (value !== "true" && value !== "false") || matches === (value === "true");

const maxScores = { POINT_100: 100, POINT_10_DECIMAL: 10, POINT_10: 10, POINT_5: 5, POINT_3: 3 };

const compareDates = (a, b) => (b?.year || 0) - (a?.year || 0) || (b?.month || 0) - (a?.month || 0) || (b?.day || 0) - (a?.day || 0);
const laterDate = (a, b) => compareDates(a, b) > 0 ? b : a;

function compareMediaLists(includedLists, excludedLists, usersNeeded, options) {
  options.searchRegex = fuse(options.search);
  for (const name of tokenFilters) {
    options[name] = parseTokens(options[name]);
  }

  const excludedIds = new Set();
  for (const listData of excludedLists) {
    for (const list of listData.lists) {
      for (const entry of list.entries) {
        if (entry.media) excludedIds.add(entry.media.id);
      }
    }
  }

  const mediaById = {};
  const tagsSet = new Set();
  const studiosSet = new Set();
  const startedYears = new Set();
  const completedYears = new Set();
  for (const listData of includedLists) {
    const userName = listData.user.name;
    const maxScore = maxScores[listData.user.mediaListOptions.scoreFormat] ?? 10;

    for (const list of listData.lists) {
      for (const entry of list.entries) {
        if (!entry.media) continue;
        if (entry.startedAt?.year) startedYears.add(entry.startedAt.year);
        if (entry.completedAt?.year) completedYears.add(entry.completedAt.year);
        for (const studio of entry.media.studios.edges) {
          if (!studio.isMain) break;
          studiosSet.add(studio.node.name);
        }
        for (const tag of entry.media.tags) {
          if (tag.rank <= 50) break;
          tagsSet.add(tag.name);
        }

        const id = entry.media.id;
        if (excludedIds.has(id) || mediaById[id]?.mediaEntries[userName] || !filter(entry, options)) continue;

        const media = mediaById[id] ??= { ...entry.media, mediaEntries: {} };
        delete entry.media;
        entry.name = userName;
        entry.scoreDelta = entry.score && media.averageScore ? entry.score * 100 / maxScore - media.averageScore : null;
        media.mediaEntries[userName] = entry;
      }
    }
  }

  const entries = [];
  for (const media of Object.values(mediaById)) {
    media.mediaEntries = Object.values(media.mediaEntries);
    if (media.mediaEntries.length < usersNeeded) continue;

    media.mediaEntries.sort((a, b) => b.score - a.score);
    let scoreCount = 0, scoreTotal = 0, scoreDeltaCount = 0, scoreDeltaTotal = 0, repeatTotal = 0;
    for (const entry of media.mediaEntries) {
      if (entry.score > 0) {
        scoreTotal += entry.score;
        scoreCount++;
      }
      if (entry.scoreDelta !== null) {
        scoreDeltaTotal += entry.scoreDelta;
        scoreDeltaCount++;
      }
      repeatTotal += entry.repeat;
      media.updatedAt = Math.max(media.updatedAt ?? entry.updatedAt, entry.updatedAt);
      media.startedAt = laterDate(media.startedAt, entry.startedAt);
      media.completedAt = laterDate(media.completedAt, entry.completedAt);
    }

    media.score = scoreTotal / scoreCount;
    media.scoreDelta = scoreDeltaCount ? scoreDeltaTotal / scoreDeltaCount : null;
    media.users = media.mediaEntries.length;
    media.repeat = repeatTotal;
    entries.push(media);
  }

  entries.sort(generateSortFunction(options.sort));

  postMessage({
    entries,
    tags: Array.from(tagsSet).sort(),
    studios: Array.from(studiosSet).sort(),
    startedYears: Array.from(startedYears).sort((a, b) => b - a).map(String),
    completedYears: Array.from(completedYears).sort((a, b) => b - a).map(String),
  });
}

// Sort values are "field" or "field_reverse", later fields settle the ties of the earlier ones
function generateSortFunction(sort) {
  const comparators = sort.flatMap(value => {
    const reversed = value.endsWith("_reverse");
    const compare = sortFields[reversed ? value.slice(0, -"_reverse".length) : value];
    if (!compare) return [];
    return reversed ? (a, b) => compare(b, a) : compare;
  });
  if (!comparators.length) comparators.push(sortFunctions.score);
  comparators.push(sortFunctions.title, sortFunctions.score);

  return (a, b) => {
    for (const compare of comparators) {
      const result = compare(a, b);
      if (result) return result;
    }
    return 0;
  };
}

const sortFunctions = {
  "score": (a, b) => (b.score || 0) - (a.score || 0),
  "title": (a, b) => a.title.userPreferred.localeCompare(b.title.userPreferred),
  "users": (a, b) => b.users - a.users,
  "episodes": (a, b) => (b.episodes || 0) - (a.episodes || 0),
  "chapters": (a, b) => (b.chapters || 0) - (a.chapters || 0),
  "volumes": (a, b) => (b.volumes || 0) - (a.volumes || 0),
  "updatedAt": (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0),
  "startedAt": (a, b) => compareDates(a.startedAt, b.startedAt),
  "completedAt": (a, b) => compareDates(a.completedAt, b.completedAt),
  "releaseDate": (a, b) => compareDates(a.startDate, b.startDate),
  "averageScore": (a, b) => (b.averageScore || 0) - (a.averageScore || 0),
  "popularity": (a, b) => (b.popularity || 0) - (a.popularity || 0),
  "scoreDelta": (a, b) => a.scoreDelta === b.scoreDelta ? 0 : (b.scoreDelta ?? -Infinity) - (a.scoreDelta ?? -Infinity),
  "repeat": (a, b) => (b.repeat || 0) - (a.repeat || 0),
};

const sortFields = {
  ...sortFunctions,
  "startedAt": (a, b) => sortFunctions.startedAt(a, b) || sortFunctions.completedAt(a, b),
  "completedAt": (a, b) => sortFunctions.completedAt(a, b) || sortFunctions.updatedAt(a, b),
  "repeat": (a, b) => sortFunctions.repeat(a, b) || sortFunctions.episodes(a, b) || sortFunctions.chapters(a, b) || sortFunctions.volumes(a, b),
};

function filter(entry, filterObject) {
  if (filterObject.searchRegex) search: {
    if ((entry.searchMatch = entry.media.title.userPreferred.match(filterObject.searchRegex))) { break search; }
    if ((entry.searchMatch = entry.media.title.native?.match(filterObject.searchRegex))) { break search; }
    if ((entry.searchMatch = entry.media.title.english?.match(filterObject.searchRegex))) { break search; }
    if ((entry.searchMatch = entry.media.title.romaji?.match(filterObject.searchRegex))) { break search; }
    if ((entry.searchMatch = entry.media.synonyms?.some(synonym => synonym.match(filterObject.searchRegex)))) { break search; }
    return false;
  }

  if (!matchesAny(filterObject.format, format => format === entry.media.format)) {
    return false;
  }
  if (!matchesAny(filterObject.status, status => status === entry.media.status)) {
    return false;
  }
  if (!matchesAny(filterObject.countryOfOrigin, country => country === entry.media.countryOfOrigin)) {
    return false;
  }
  if (!matchesAny(filterObject.year, year => year === String(entry.media.startDate?.year))) {
    return false;
  }
  if (!matchesToggle(filterObject.isAdult, !!entry.media.isAdult)) {
    return false;
  }
  // Entry needs to have all the included genres and tags, other filters match any of the included values.
  // Entry can't have any of the excluded values
  if (!matchesAll(filterObject.genre, genre => entry.media.genres.includes(genre))) {
    return false;
  }
  if (!matchesAny(filterObject.userStatus, status => status === entry.status)) {
    return false;
  }
  if (!matchesAny(filterObject.startedYear, year => year === String(entry.startedAt?.year))) {
    return false;
  }
  if (!matchesAny(filterObject.completedYear, year => year === String(entry.completedAt?.year))) {
    return false;
  }
  if (!matchesToggle(filterObject.private, !!entry.private)) {
    return false;
  }
  if (!matchesToggle(filterObject.notes, !!entry.notes)) {
    return false;
  }
  if (!matchesToggle(filterObject.repeat, entry.repeat > 0)) {
    return false;
  }
  if (!matchesToggle(filterObject.startDate, !!entry.startedAt?.year)) {
    return false;
  }
  if (!matchesToggle(filterObject.endDate, !!entry.completedAt?.year)) {
    return false;
  }
  if (!matchesToggle(filterObject.score, entry.score > 0)) {
    return false;
  }
  if (!matchesAny(filterObject.studio, name => entry.media.studios.edges.some(studio => studio.isMain && studio.node.name === name))) {
    return false;
  }
  if (!matchesAll(filterObject.tag, name => entry.media.tags.some(tag => tag.rank > 50 && tag.name === name))) {
    return false;
  }

  return true;
}
