import { IndexedDB } from "../utils/api";

onmessage = ({ data: { cacheKey, search, sort } }) => {
  const cacheReq = IndexedDB.fetchCache();
  cacheReq.onerror = error;
  cacheReq.onsuccess = evt => {
    const db = evt.target.result;
    const store = IndexedDB.store(db, "results", "readonly");
    const getReg = store.get(cacheKey);
    getReg.onerror = error;
    getReg.onsuccess = evt => {
      if (evt.target.result) {
        modifyMediaListData(evt.target.result, search, sort);
      } else {
        error();
      };
    };
  };
}

function modifyMediaListData(listData, search = "", sort = "") {
  if (search.length) {
    let searchRegex = null;
    if (search.match(/\W/)) {
      searchRegex = new RegExp(search, "i");
    } else {
      searchRegex = new RegExp(search.split("").join("\\W?"), "i");
    }

    listData.data.lists.forEach(list => {
      let tail = 0;
      list.entries.forEach((entry, i, arr) => {
        if (filter(entry, searchRegex)) {
          if (tail++ < i) {
            arr[tail - 1] = entry;
          }
        }
      });
      list.entries.length = tail;
    });
  }

  function filter(entry, searchRegex) {
    if (entry.searchMatch = entry.media.title.userPreferred.match(searchRegex)) {
      return true;
    }
    if (entry.searchMatch = entry.media.title.native?.match(searchRegex)) {
      return true;
    }
    if (entry.searchMatch = entry.media.title.english?.match(searchRegex)) {
      return true;
    }
    if (entry.searchMatch = entry.media.title.romaji?.match(searchRegex)) {
      return true;
    }
    if (entry.searchMatch = entry.media.synonyms?.some(synonym => synonym.match(searchRegex))) {
      return true;
    }
    return false;
  }

  listData.data.lists.forEach(list => list.entries.sort((a, b) => (b.score - a.score) || (a.media.title.userPreferred > b.media.title.userPreferred ? 1 : -1)));

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



function error(err) {
  console.warn(err);
  postMessage("error");
}
