import { fuse } from "@/utils/stringUtils.js";

onmessage = ({ data: { data, ...filtering } }) => {
  postMessage(findSequels(data, filtering));
}

const tokenFilters = ["format", "status", "countryOfOrigin", "year", "genre", "sequelStatus", "prequelStatus"];

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

function findSequels(listData, options) {
  options.searchRegex = fuse(options.search);
  for (const name of tokenFilters) {
    options[name] = parseTokens(options[name]);
  }

  // Media that is already on the list, or is only a different version of media on the list
  const hiddenMedia = new Set();
  // Relation types of the media by its id, the same media can be a sequel of one entry and a prequel of another
  const relationTypes = new Map();
  const relatedMedia = [];
  for (const list of listData.lists) {
    for (const entry of list.entries) {
      hiddenMedia.add(entry.media.id);

      for (const edge of entry.media.relations.edges) {
        // Summaries and alternative versions retell the same story. For example:
        // https://anilist.co/anime/184694/Solo-Leveling-ReAwakening-/
        // https://anilist.co/anime/129874/Demon-Slayer-Kimetsu-no-Yaiba-Mugen-Train-Arc/
        if (edge.relationType === "SUMMARY" || edge.relationType === "ALTERNATIVE") {
          hiddenMedia.add(edge.node.id);
          continue;
        }

        if (edge.relationType !== "SEQUEL" && edge.relationType !== "PREQUEL") continue;
        if (!matchesAny(edge.relationType === "SEQUEL" ? options.sequelStatus : options.prequelStatus, status => status === entry.status)) continue;
        if (edge.node.status === "CANCELLED") continue;
        if (options.matchFormat === "true" && edge.node.format !== "MOVIE" && edge.node.format !== entry.media.format) continue;

        if (!relationTypes.has(edge.node.id)) {
          relationTypes.set(edge.node.id, new Set());
          relatedMedia.push(edge.node);
        }
        relationTypes.get(edge.node.id).add(edge.relationType);
      }
    }
  }

  const all = relatedMedia.filter(media => !hiddenMedia.has(media.id) && filter(media, options));
  all.sort(generateSortFunction(options.sort));

  const lists = { ALL: all, SEQUEL: [], PREQUEL: [] };
  for (const media of all) {
    for (const type of relationTypes.get(media.id)) lists[type].push(media);
  }
  return lists;
}

// Sort values are "field" or "field_reverse", later fields settle the ties of the earlier ones
function generateSortFunction(sort) {
  const comparators = sort.flatMap(value => {
    const reversed = value.endsWith("_reverse");
    const compare = sortFunctions[reversed ? value.slice(0, -"_reverse".length) : value];
    if (!compare) return [];
    return reversed ? (a, b) => compare(b, a) : compare;
  });
  comparators.push(sortFunctions.averageScore, sortFunctions.title);

  return (a, b) => {
    for (const compare of comparators) {
      const result = compare(a, b);
      if (result) return result;
    }
    return 0;
  };
}

const sortFunctions = {
  "averageScore": (a, b) => (b.averageScore || 0) - (a.averageScore || 0),
  "popularity": (a, b) => (b.popularity || 0) - (a.popularity || 0),
  "releaseDate": (a, b) => (b.startDate?.year || 0) - (a.startDate?.year || 0) || (b.startDate?.month || 0) - (a.startDate?.month || 0) || (b.startDate?.day || 0) - (a.startDate?.day || 0),
  "title": (a, b) => a.title.userPreferred.localeCompare(b.title.userPreferred),
}

function filter(media, filterObject) {
  if (filterObject.searchRegex) search: {
    if (media.title.userPreferred.match(filterObject.searchRegex)) { break search; }
    if (media.title.native?.match(filterObject.searchRegex)) { break search; }
    if (media.title.english?.match(filterObject.searchRegex)) { break search; }
    if (media.title.romaji?.match(filterObject.searchRegex)) { break search; }
    if (media.synonyms?.some(synonym => synonym.match(filterObject.searchRegex))) { break search; }
    return false;
  }

  if (!matchesAny(filterObject.format, format => format === media.format)) {
    return false;
  }
  if (!matchesAny(filterObject.status, status => status === media.status)) {
    return false;
  }
  if (!matchesAny(filterObject.countryOfOrigin, country => country === media.countryOfOrigin)) {
    return false;
  }
  if (!matchesAny(filterObject.year, year => year === String(media.startDate?.year))) {
    return false;
  }
  if (!matchesToggle(filterObject.isAdult, !!media.isAdult)) {
    return false;
  }
  // Media needs to have all the included genres
  if (!matchesAll(filterObject.genre, genre => media.genres?.includes(genre))) {
    return false;
  }

  return true;
}
