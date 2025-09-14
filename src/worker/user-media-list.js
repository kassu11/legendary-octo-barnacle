import { IndexedDB } from "../utils/api";

onmessage = ({ data: { cacheKey, type, ...filtering } }) => {
  const cacheReq = IndexedDB.fetchCache();
  cacheReq.onerror = error;
  cacheReq.onsuccess = evt => {
    const db = evt.target.result;
    const store = IndexedDB.store(db, "results", "readonly");
    const getReg = store.get(cacheKey);
    getReg.onerror = error;
    getReg.onsuccess = evt => {
      if (evt.target.result) {
        modifyMediaListData(evt.target.result, type, filtering);
      } else {
        error();
      };
    };
  };
}

function modifyMediaListData(listData, type, options) {
  const filterObject = {
    format: options.format,
    status: options.status,
    genre: options.genre,
    reverse: options.reverse,
    countryOfOrigin: options.countryOfOrigin,
    missingStart: options.missingStart,
    missingScore: options.missingScore,
    isAdult: options.isAdult,
    year: options.year,
    private: options.private,
    studio: options.studio,
    tag: options.tag,
    notes: options.notes,
    repeat: options.repeat,
    userStatus: options.userStatus,
  };

  if (options.search) {
    options.search = options.search.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");
    if (options.search.trim() === "") {
      filterObject.searchRegex = new RegExp(options.search, "i");
    } else if(options.search.match(/\W/)) {
      filterObject.searchRegex = new RegExp(options.search.replace(/ +/g, "\\W"), "i");
    } else {
      filterObject.searchRegex = new RegExp(options.search.split("").join("\\W?"), "i");
    }
  }

  const mediaSet = new Set();
  const tagsSet = new Set();
  const studiosSet = new Set();
  listData.data.indecies = {};
  listData.data.lists.forEach((list, i) => {
    let tail = 0;
    list.entries.forEach((entry, j, arr) => {
      listData.data.indecies[entry.media.id] ??= []
      listData.data.indecies[entry.media.id].push([i, j]);
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
      listData.data.indecies[entry.media.id].push([i, j]);
      if (filter(entry, filterObject)) {
        mediaSet.add(entry.media.id);

        if (tail++ < j) {
          arr[tail - 1] = entry;
        }
      }
    });

    list.entries.length = tail;
  });
  listData.data.total = mediaSet.size;
  listData.data.studios = Array.from(studiosSet).sort();
  listData.data.tags = Array.from(tagsSet).sort();
  const sortFunction = generateSortFunction(options.sort, options.reverse ? -1 : 1);
  listData.data.lists.forEach(list => {
    list.entries.sort(sortFunction);
  });

  const sectionOrder = listData.data.user.mediaListOptions[type === "anime" ? "animeList" : "mangaList"].sectionOrder;
  const sectionSortOrder = Object.fromEntries(Object.entries(sectionOrder).map(([key, val]) => ([val, +key + 1])));
  listData.data.lists.sort((a, b) => sectionSortOrder[a.name] - sectionSortOrder[b.name]);

  const cacheReq = IndexedDB.user();
  cacheReq.onerror = error;
  cacheReq.onsuccess = evt => {
    const db = evt.target.result;
    const store = IndexedDB.store(db, "data", "readwrite", error);
    store.onerror = error;
    const putReq = store.put(listData, "media_list");
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
    case "progress":
      return (a, b) => (sortFunctions.progress(a, b) * direction) || sortFunctions.title(a, b);
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
  "title": (a, b) => a.media.title.userPreferred.localeCompare(b.media.title.userPreferred),
  "progress": (a, b) => (b.progress || 0) - (a.progress || 0),
  "updatedAt": (a, b) => (a.updatedAt || 0) > (b.updatedAt || 0) ? -1 : 1,
  "startedAt": (a, b) => (b.startedAt?.year || 0) - (a.startedAt?.year || 0) || (b.startedAt?.month || 0) - (a.startedAt?.month || 0) || (b.startedAt?.day || 0) - (a.startedAt?.day || 0),
  "completedAt": (a, b) => (b.completedAt?.year || 0) - (a.completedAt?.year || 0) || (b.completedAt?.month || 0) - (a.completedAt?.month || 0) || (b.completedAt?.day || 0) - (a.completedAt?.day || 0),
  "releaseDate": (a, b) => (b.media.startDate?.year || 0) - (a.media.startDate?.year || 0) || (b.media.startDate?.month || 0) - (a.media.startDate?.month || 0) || (b.media.startDate?.day || 0) - (a.media.startDate?.day || 0),
  "averageScore": (a, b) => (b.media.averageScore || 0) - (a.media.averageScore || 0),
  "popularity": (a, b) => (b.media.popularity || 0) - (a.media.popularity || 0),
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
  if (filterObject.private && !entry.private) {
    return false;
  }
  if (filterObject.notes && !entry.notes) {
    return false;
  }
  if (filterObject.repeat && !(entry.repeat > 0)) {
    return false;
  }
  if (filterObject.missingStart && entry.startedAt?.year) {
    return false;
  }
  if (filterObject.missingScore && entry.score !== 0) {
    return false;
  }
  if (filterObject.studio) studio: {
    for (const studio of entry.media.studios.edges) {
      if (studio.isMain && studio.node.name === filterObject.studio) {
        break studio;
      }
    }
    return false;
  }
  if (filterObject.tag) tag: {
    for (const tag of entry.media.tags) {
      if (tag.rank > 50 && tag.name=== filterObject.tag) {
        break tag;
      }
    }
    return false;
  }

  return true;
}

function error(err) {
  console.warn(err);
  postMessage("error");
}
