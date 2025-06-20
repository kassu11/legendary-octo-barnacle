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
    countryOfOrigin: options.countryOfOrigin,
    missingStart: options.missingStart,
    missingScore: options.missingScore,
    isAdult: options.isAdult,
    year: options.year,
    private: options.private,
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
  listData.indecies = {};
  listData.data.lists.forEach((list, i) => {
    let tail = 0;
    list.entries.forEach((entry, j, arr) => {
      listData.indecies[entry.media.id] ??= []
      listData.indecies[entry.media.id].push([i, j]);
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
  const sortFunction = (() => {
    switch (options.sort) {
      case "score":
        return (a, b) => (b.score || 0) - (a.score || 0);
      case "title":
        return (a, b) => a.media.title.userPreferred.localeCompare(b.media.title.userPreferred);
      case "progress":
        return (a, b) => (b.progress || 0) - (a.progress || 0);
      case "updatedAt":
        return (a, b) => (a.updatedAt || 0) > (b.updatedAt || 0) ? -1 : 1;
      case "startedAt":
        return (a, b) => (b.startedAt?.year || 0) - (a.startedAt?.year || 0) || (b.startedAt?.month || 0) - (a.startedAt?.month || 0) || (b.startedAt?.day || 0) - (a.startedAt?.day || 0);
      case "completedAt":
        return (a, b) => (b.completedAt?.year || 0) - (a.completedAt?.year || 0) || (b.completedAt?.month || 0) - (a.completedAt?.month || 0) || (b.completedAt?.day || 0) - (a.completedAt?.day || 0);
      case "releaseDate":
        return (a, b) => (b.media.startDate?.year || 0) - (a.media.startDate?.year || 0) || (b.media.startDate?.month || 0) - (a.media.startDate?.month || 0) || (b.media.startDate?.day || 0) - (a.media.startDate?.day || 0);
      case "averageScore":
        return (a, b) => (b.media.averageScore || 0) - (a.media.averageScore || 0);
      case "popularity":
        return (a, b) => (b.media.popularity || 0) - (a.media.popularity || 0);
      default:
        console.error("No sort given");
    }
  })();
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

  return true;
}

function error(err) {
  console.warn(err);
  postMessage("error");
}
