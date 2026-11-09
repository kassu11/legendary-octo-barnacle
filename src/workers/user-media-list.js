import { fuse } from "@/utils/stringUtils.js";
import { COMBINED_LIST } from "@/constants/mediaLists.js";

onmessage = ({ data: { data, type, ...filtering } }) => {
  modifyMediaListData(data, type, filtering);
}

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

function modifyMediaListData(listData, type, options) {
  options.searchRegex = fuse(options.search);
  for (const name of tokenFilters) {
    options[name] = parseTokens(options[name]);
  }

  const mediaSet = new Set();
  const tagsSet = new Set();
  const studiosSet = new Set();
  const startedYears = new Set();
  const completedYears = new Set();
  listData.indecies = {};
  listData.lists.forEach((list, i) => {
    let tail = 0;
    list.entries.forEach((entry, j, arr) => {
      if (entry.startedAt?.year) startedYears.add(entry.startedAt.year);
      if (entry.completedAt?.year) completedYears.add(entry.completedAt.year);
      listData.indecies[entry.media.id] ??= []
      listData.indecies[entry.media.id].push([i, j]);
      for (const studio of entry.media.studios.edges) {
        if (studio.isMain) {
          studiosSet.add(studio.node.name);
        } else {
          break;
        }
      }
      for (const tag of entry.media.tags) {
        if (tag.rank > 50) {
          tagsSet.add(tag.name);
        } else {
          break;
        }
      }

      if (filter(entry, options)) {
        mediaSet.add(entry.media.id);

        if (tail++ < j) {
          arr[tail - 1] = entry;
        }
      }
    });

    list.entries.length = tail;
  });
  listData.total = mediaSet.size;
  listData.studios = Array.from(studiosSet).sort();
  listData.tags = Array.from(tagsSet).sort();
  listData.startedYears = Array.from(startedYears).sort((a, b) => b - a).map(String);
  listData.completedYears = Array.from(completedYears).sort((a, b) => b - a).map(String);

  const sortFunction = generateSortFunction(options.sort);
  listData.lists.forEach(list => {
    list.entries.sort(sortFunction);
  });

  // Sorting the lists doesn't break the indecies, they point to the lists of the cached response that the edits mutate
  const sectionOrder = listData.user.mediaListOptions[type === "anime" ? "animeList" : "mangaList"].sectionOrder;
  const sectionSortOrder = Object.fromEntries(Object.entries(sectionOrder).map(([key, val]) => ([val, +key])));
  listData.lists.sort((a, b) => (sectionSortOrder[a.name] ?? sectionOrder.length) - (sectionSortOrder[b.name] ?? sectionOrder.length));

  // With the list order sort first, the sorted lists are already in the right order
  const [firstSort] = options.sort;
  const seenMedia = new Set();
  const combinedList = { name: COMBINED_LIST, isCustomList: false, isCompletedList: false, entries: [] };
  for (const list of firstSort === "list_reverse" ? listData.lists.toReversed() : listData.lists) {
    for (const entry of list.entries) {
      if (seenMedia.has(entry.media.id)) continue;
      seenMedia.add(entry.media.id);
      combinedList.entries.push(entry);
    }
  }
  if (firstSort !== "list" && firstSort !== "list_reverse") combinedList.entries.sort(sortFunction);
  listData.lists.unshift(combinedList);

  postMessage(listData);
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
  "title": (a, b) => a.media.title.userPreferred.localeCompare(b.media.title.userPreferred),
  "progress": (a, b) => (b.progress || 0) - (a.progress || 0),
  "updatedAt": (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0),
  "startedAt": (a, b) => (b.startedAt?.year || 0) - (a.startedAt?.year || 0) || (b.startedAt?.month || 0) - (a.startedAt?.month || 0) || (b.startedAt?.day || 0) - (a.startedAt?.day || 0),
  "completedAt": (a, b) => (b.completedAt?.year || 0) - (a.completedAt?.year || 0) || (b.completedAt?.month || 0) - (a.completedAt?.month || 0) || (b.completedAt?.day || 0) - (a.completedAt?.day || 0),
  "releaseDate": (a, b) => (b.media.startDate?.year || 0) - (a.media.startDate?.year || 0) || (b.media.startDate?.month || 0) - (a.media.startDate?.month || 0) || (b.media.startDate?.day || 0) - (a.media.startDate?.day || 0),
  "averageScore": (a, b) => (b.media.averageScore || 0) - (a.media.averageScore || 0),
  "popularity": (a, b) => (b.media.popularity || 0) - (a.media.popularity || 0),
  "repeat": (a, b) => (b.repeat || 0) - (a.repeat || 0),
}

const sortFields = {
  ...sortFunctions,
  "startedAt": (a, b) => sortFunctions.startedAt(a, b) || sortFunctions.completedAt(a, b),
  "completedAt": (a, b) => sortFunctions.completedAt(a, b) || sortFunctions.updatedAt(a, b),
  "repeat": (a, b) => sortFunctions.repeat(a, b) || sortFunctions.progress(a, b),
}

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
  if (!matchesToggle(filterObject.missingStart, !entry.startedAt?.year)) {
    return false;
  }
  if (!matchesToggle(filterObject.missingEnd, !entry.completedAt?.year)) {
    return false;
  }
  if (!matchesToggle(filterObject.missingScore, entry.score === 0)) {
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
