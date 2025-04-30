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

function modifyMediaListData(listData, type, filtering) {
  const filterObject = {
    format: filtering.format,
    status: filtering.status,
    genre: filtering.genre,
    countryOfOrigin: filtering.countryOfOrigin,
    isAdult: filtering.isAdult,
    year: filtering.year,
  };

  if (filtering.search) {
    if (filtering.search.match(/\W/)) {
      filterObject.searchRegex = new RegExp(filtering.search, "i");
    } else {
      filterObject.searchRegex = new RegExp(filtering.search.split("").join("\\W?"), "i");
    }
  }

  const mediaSet = new Set();
  listData.data.lists.forEach(list => {
    let tail = 0;
    list.entries.forEach((entry, i, arr) => {
      if (filter(entry, filterObject)) {
        mediaSet.add(entry.media.id);

        if (tail++ < i) {
          arr[tail - 1] = entry;
        }
      }
    });

    list.entries.length = tail;
  });
  listData.data.total = mediaSet.size;

  listData.data.lists.forEach(list => {
    list.entries.sort((a, b) => (b.score - a.score) || (a.media.title.userPreferred > b.media.title.userPreferred ? 1 : -1))
  });
  const sectionOrder = listData.data.user.mediaListOptions[type === "ANIME" ? "animeList" : "mangaList"].sectionOrder;
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

  return true;
}



function error(err) {
  console.warn(err);
  postMessage("error");
}
