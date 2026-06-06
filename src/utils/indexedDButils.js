import { assertThruthy } from "../collections/asserts";

const createDbStore = (db, storeName, key) => {
  if (!db.objectStoreNames.contains(storeName)) {
    return db.createObjectStore(storeName, key);
  }
};

// const deleteObjectStore = (db, storeName) => {
//   if (!db.objectStoreNames.contains(storeName)) {
//     return db.deleteObjectStore(storeName);
//   }
// }

export const openIndexDBStore = (storeName, mode) => {
  const request = indexedDB.open("legendary-octo-barnacle", 2);

  request.onupgradeneeded = (evt) => {
    const db = evt.target.result;
    switch (evt.oldVersion) {
      case 0: {
        const objectStore = createDbStore(db, "fetches", { keyPath: "cacheKey" });
        objectStore.createIndex("Cache key", "cacheKey", { unique: true });
        objectStore.createIndex("Name", "name", { unique: false });
        objectStore.createIndex("Data", "data", { unique: false });
        objectStore.createIndex("Expiration", "expires", { unique: false });
        objectStore.createIndex("Last modified", "modified", { unique: false });
      } // fallthrough
      case 1: {
        const objectStore = createDbStore(db, "tokens");
        objectStore.createIndex("Data", "data", { unique: false });
        objectStore.createIndex("Expiration", "expires", { unique: false });
        objectStore.createIndex("Last modified", "modified", { unique: false });
      }
    }
  };

  return new Promise((res, rej) => {
    request.onerror = rej;
    request.onsuccess = (evt) => {
      try {
        const db = evt.target.result;
        assertThruthy(db.objectStoreNames.contains(storeName), `Unknown store name "${storeName}"`);
        const transaction = db.transaction(storeName, mode);

        res(transaction.objectStore(storeName));
      } catch (e) {
        rej(e);
      }
    };
  });
};

export const setIndexedDBValue = async (storeName, value, key) => {
  const { promise, resolve, reject } = Promise.withResolvers();
  const store = await openIndexDBStore(storeName, "readwrite");
  if (value?.expires instanceof Date) value.expires = value.expires.getTime();
  if (value?.modified instanceof Date) value.modified = value.modified.getTime();
  const putReq = store.put(value, key);
  putReq.onerror = reject;
  putReq.onsuccess = resolve;

  return await promise;
};

export const getIndexedDBValue = async (storeName, key) => {
  const store = await openIndexDBStore(storeName, "readonly");
  return await storeGet(store, key);
};

export const getAllIndexedDBValues = async (storeName) => {
  const store = await openIndexDBStore(storeName, "readonly");
  const index = store.index("Expiration");

  const range = IDBKeyRange.lowerBound(curTime, true);
  const request = index.openCursor(range);
  const results = {};
  const { promise, resolve, reject } = Promise.withResolvers();
  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      results[cursor.primaryKey] = cursor.value;
      cursor.continue();   // move to next
    } else {
      resolve(results);
    }
  };

  request.onerror = reject;
  return promise;
};

export const deleteIndexDBValue = async (storeName, key) => {
  const store = await openIndexDBStore(storeName, "readwrite");
  store.delete(key);
};

export const mutateIndexDBValue = async (storeName, key, mutate) => {
  const { promise, resolve, reject } = Promise.withResolvers();
  const getStore = await openIndexDBStore(storeName, "readwrite");
  const value = await storeGet(getStore, key);

  const result = await mutate(value);
  const setStore = await openIndexDBStore(storeName, "readwrite");
  const setRequest = setStore.put(result, key);
  setRequest.onerror = reject;
  setRequest.onsuccess = () => resolve(result);

  return await promise;
};

const storeGet = (store, key) => {
  return new Promise((res, rej) => {
    const getRequest = store.get(key);

    getRequest.onsuccess = (evt) => {
      if (evt.target.result?.expires < curTime) res(null);
      else res(evt.target.result);
    }
    getRequest.onerror = rej;
  });
};

const curTime = new Date().getTime();
async function deleteExpired(storeName) {
  const store = await openIndexDBStore(storeName, "readwrite");
  const index = store.index("Expiration");

  const range = IDBKeyRange.bound(0, curTime);
  const request = index.openCursor(range);

  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      cursor.delete();     // delete current record
      cursor.continue();   // move to next
    }
  };
}

// Clean expired cache entries after 5 seconds of the page loading
// Expired values are also filtered out whithin the getter
setTimeout(() => {
  deleteExpired("fetches");
  deleteExpired("tokens");
}, 5_000);
