import { batch, createSignal } from "solid-js";
import { IndexedDB } from "../utils/api-OLD";
import { createLocalStorageJsonSignal } from "../utils/localStorageUtils";

export const [authUserData, setAuthUserData] = createLocalStorageJsonSignal("LOB-authed-used-data");
export const [token2, setToken2] = createSignal();
export const [authedUserId, setAuthedUserId] = createSignal();

export const logoutUser = () => {
  const dbReq = IndexedDB.user();
  dbReq.onsuccess = evt => {
    const db = evt.target.result;
    const store = IndexedDB.store(db, "data", "readwrite");
    store.delete("access_token");
    store.delete("auth_profile_info");
    batch(() => {
      setToken2(null);
      setAuthedUserId(null);
      setAuthUserData(null);
    });
  };
};
