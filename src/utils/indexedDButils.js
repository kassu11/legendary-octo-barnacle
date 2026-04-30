import { assertThruthy } from "../collections/asserts";

const createDbStore = (db, storeName, key) => {
  if (!db.objectStoreNames.contains(storeName)) {
    return db.createObjectStore(storeName, key);
  }
};

export const openIndexDBStore = (storeName, mode) => {
  const request = indexedDB.open("legendary-octo-barnacle-cache2", 1);

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
      }
    }
  };

  return new Promise((res, rej) => {
    request.onerror = rej;
    request.onsuccess = (evt) => {
      const db = evt.target.result;
      assertThruthy(
        db.objectStoreNames.contains(storeName),
        `Unknown store name "${storeName}"`,
      );
      const transaction = db.transaction(storeName, mode);

      res(transaction.objectStore(storeName));
    };
  });
};

export const setIndexedDBValue = async (storeName, value, key) => {
  const { promise, resolve, reject } = Promise.withResolvers();
  const store = await openIndexDBStore(storeName, "readwrite");
  const putReq = store.put(value, key);
  putReq.onerror = reject;
  putReq.onsuccess = resolve;

  return await promise;
};

export const getIndexedDBValue = async (storeName, key) => {
  const store = await openIndexDBStore(storeName, "readonly");
  return await storeGet(store, key);
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

    getRequest.onsuccess = (evt) => res(evt.target.result);
    getRequest.onerror = rej;
  });
};
