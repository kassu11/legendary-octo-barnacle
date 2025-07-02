import { IndexedDB } from "../utils/api";

onmessage = ({ data: { includeKeys, excludeKeys, type, ...filtering } }) => {
  const cacheReq = IndexedDB.fetchCache();
  cacheReq.onerror = error;
  cacheReq.onsuccess = evt => {
    const db = evt.target.result;
    const store = IndexedDB.store(db, "results", "readonly");

    const entries = {}
    let count = 0;
    function listFilteringComplate() {
      if (includeKeys.length + excludeKeys.length === ++count) {
        formatCompareList(entries, includeKeys.length, filtering);
      }
    }

    for (const includeKey of includeKeys) {
      const getReg = store.get(includeKey);
      getReg.onerror = error;
      getReg.onsuccess = evt => {
        if (evt.target.result) {
          includeCompareList(evt.target.result, entries, type, filtering, listFilteringComplate);
        } else {
          error();
        };
      };
    }

    for (const excludeKey of excludeKeys) {
      const getReg = store.get(excludeKey);
      getReg.onerror = error;
      getReg.onsuccess = evt => {
        if (evt.target.result) {
          excludeCompareList(evt.target.result, entries, listFilteringComplate);
        } else {
          error();
        };
      };
    }
  };
}

function includeCompareList(listData, entries, type, filterObject, filteringComplate) {
  if (filterObject.search) {
    filterObject.search = filterObject.search.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");
    if (filterObject.search.trim() === "") {
      filterObject.searchRegex = new RegExp(filterObject.search, "i");
    } else if(filterObject.search.match(/\W/)) {
      filterObject.searchRegex = new RegExp(filterObject.search.replace(/ +/g, "\\W"), "i");
    } else {
      filterObject.searchRegex = new RegExp(filterObject.search.split("").join("\\W?"), "i");
    }
  }

  listData.data.lists.forEach((list) => {
    list.entries.forEach((entry) => {
      if (filter(entry, filterObject)) {
        const id = entry.media.id;
        entries[id] ??= entry.media;
        entries[id].mediaEntries ??= {}
        delete entry.media;
        entry.name = listData.data.user.name;
        entries[id].mediaEntries[listData.data.user.name] ??= entry;
      }
    });
  });

  filteringComplate();
}

function excludeCompareList(listData, entries, filteringComplate) {
  listData.data.lists.forEach((list) => {
    list.entries.forEach((entry) => {
      entries[entry.media.id] ??= entry.media;
      entries[entry.media.id].exclude = true;
    });
  });

  filteringComplate();
}

function formatCompareList(entries, minUserCount, filterObject) {
  entries = Object.values(entries).filter(entry => {
    if (entry.exclude) {
      return false;
    }

    entry.mediaEntries = Object.values(entry.mediaEntries);
    entry.mediaEntries.sort((a, b) => b.score - a.score);
    let scoreCount = 0, scoreTotal = 0;
    let repeatTotal = 0;
    entry.mediaEntries.forEach(v => {
      if (v.score > 0) {
        scoreTotal += v.score;
        scoreCount++;
      }
      repeatTotal += v.repeat;


    });
    entry.score = scoreTotal / scoreCount;
    entry.users = entry.mediaEntries.length;
    entry.repeat = repeatTotal;

    if (filterObject.repeat && repeatTotal === 0) {
      return false;
    }

    return entry.mediaEntries.length >= minUserCount;
  });

  const sortFunction = generateSortFunction(filterObject.sort, filterObject.reverse ? -1 : 1);
  entries.sort(sortFunction);

  const cacheReq = IndexedDB.user();
  cacheReq.onerror = error;
  cacheReq.onsuccess = evt => {
    const db = evt.target.result;
    const store = IndexedDB.store(db, "data", "readwrite", error);
    store.onerror = error;
    const putReq = store.put(entries, "compare_list");
    putReq.onerror = error;
    putReq.onsuccess = () => {
      postMessage("success");
    }
  }
}

function generateSortFunction(sort, direction = 1) {
  switch (sort) {
    case "score":
      return (a, b) => (sortFunctions.score(a, b) * direction) || sortFunctions.title(a, b);
    case "title":
      return (a, b) => (sortFunctions.title(a, b) * direction) || sortFunctions.score(a, b);
    case "episodes":
      return (a, b) => (sortFunctions.episodes(a, b) * direction) || sortFunctions.title(a, b);
    case "chapters":
      return (a, b) => (sortFunctions.chapters(a, b) * direction) || sortFunctions.title(a, b);
    case "volumes":
      return (a, b) => (sortFunctions.volumes(a, b) * direction) || sortFunctions.title(a, b);
    case "updatedAt":
      return (a, b) => (sortFunctions.updatedAt(a, b) * direction) || sortFunctions.title(a, b);
    case "startedAt":
      return (a, b) => (sortFunctions.startedAt(a, b) || sortFunctions.completedAt(a, b)) * direction || sortFunctions.title(a, b);
    case "completedAt":
      return (a, b) => (sortFunctions.completedAt(a, b) || sortFunctions.updatedAt(a, b)) * direction;
    case "releaseDate":
      return (a, b) => (sortFunctions.releaseDate(a, b) * direction) || sortFunctions.title(a, b);
    case "averageScore":
      return (a, b) => (sortFunctions.averageScore(a, b) * direction) || sortFunctions.title(a, b);
    case "popularity":
      return (a, b) => (sortFunctions.popularity(a, b) * direction) || sortFunctions.title(a, b);
    case "repeat":
      return (a, b) => ((sortFunctions.repeat(a, b) || sortFunctions.progress(a, b)) * direction) || sortFunctions.title(a, b);
    default:
      console.error("No sort given");
      return (a, b) => (sortFunctions.score(a, b) * direction) || sortFunctions.title(a, b);
  };
}

const sortFunctions = {
  "score": (a, b) => (b.score || 0) - (a.score || 0),
  "episodes": (a, b) => (b.episodes || 0) - (a.episodes || 0),
  "chapters": (a, b) => (b.chapters || 0) - (a.chapters || 0),
  "volumes": (a, b) => (b.volumes || 0) - (a.volumes || 0),
  "title": (a, b) => a.title.userPreferred.localeCompare(b.title.userPreferred),
  "progress": (a, b) => (b.progress || 0) - (a.progress || 0),
  "updatedAt": (a, b) => (a.updatedAt || 0) > (b.updatedAt || 0) ? -1 : 1,
  "startedAt": (a, b) => (b.startedAt?.year || 0) - (a.startedAt?.year || 0) || (b.startedAt?.month || 0) - (a.startedAt?.month || 0) || (b.startedAt?.day || 0) - (a.startedAt?.day || 0),
  "completedAt": (a, b) => (b.completedAt?.year || 0) - (a.completedAt?.year || 0) || (b.completedAt?.month || 0) - (a.completedAt?.month || 0) || (b.completedAt?.day || 0) - (a.completedAt?.day || 0),
  "releaseDate": (a, b) => (b.startDate?.year || 0) - (a.startDate?.year || 0) || (b.startDate?.month || 0) - (a.startDate?.month || 0) || (b.startDate?.day || 0) - (a.startDate?.day || 0),
  "averageScore": (a, b) => (b.averageScore || 0) - (a.averageScore || 0),
  "popularity": (a, b) => (b.popularity || 0) - (a.popularity || 0),
  "repeat": (a, b) => (b.repeat || 0) - (a.repeat || 0),
}

function filter(entry, filterObject) {
  if (filterObject.searchRegex) search: {
    if (entry.searchMatch = entry.media.title.userPreferred.match(filterObject.searchRegex)) { break search; }
    if (entry.searchMatch = entry.media.title.native?.match(filterObject.searchRegex)) { break search; }
    if (entry.searchMatch = entry.media.title.english?.match(filterObject.searchRegex)) { break search; }
    if (entry.searchMatch = entry.media.title.romaji?.match(filterObject.searchRegex)) { break search; }
    if (entry.searchMatch = entry.media.synonyms?.some(synonym => synonym.match(filterObject.searchRegex))) { break search; }
    return false;
  }

  if (filterObject.format && entry.media.format !== filterObject.format) {
    return false;
  }
  if (filterObject.status && entry.media.status !== filterObject.status) {
    return false;
  }
  if (filterObject.countryOfOrigin && entry.media.countryOfOrigin !== filterObject.countryOfOrigin) {
    return false;
  }
  if (filterObject.year && entry.media.startDate?.year !== filterObject.year) {
    return false;
  }
  if (typeof filterObject.isAdult === "boolean" && entry.media.isAdult !== filterObject.isAdult) {
    return false;
  }
  if (filterObject.genre && entry.media.genres.every(genre => genre !== filterObject.genre)) {
    return false;
  }
  if (filterObject.userStatus && entry.status !== filterObject.userStatus) {
    return false;
  }
  if (filterObject.missingScore === false && entry.score === 0) {
    return false;
  }

  return true;
}

function error(err) {
  console.trace(err);
  postMessage("error");
}
