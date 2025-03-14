import api, { IndexedDB } from "../api";
import { createContext, useContext, createResource, Show } from "solid-js";

const AuthenticationContext = createContext();

export function AuthenticationProvider(props) {
  const [accessToken, { mutate: setToken }] = createResource(async () => {
    return new Promise((resolve) => {
      const error = () => resolve(null);
      const dbReq = IndexedDB.user(error);
      dbReq.onsuccess = (evt) => {
        const db = evt.target.result;
        const store = IndexedDB.store(db, "data", "readonly", error);
        const getTokenReq = store.get("access_token");

        getTokenReq.onsuccess = (evt) => resolve(evt.target.result || null);
        getTokenReq.onerror = error;
      };
    });
  });
  const [authUserData, { mutate: setAuthUserData }] = createResource(accessToken, api.anilist.getAuthUserData);

  const dbReq = IndexedDB.user();
  dbReq.onsuccess = evt => {
    const db = evt.target.result;
    const store = IndexedDB.store(db, "data", "readonly");
    const getProfileReq = store.get("auth_profile_info");

    getProfileReq.onsuccess = evt => {
      if(evt.target.result == null) return;
      setAuthUserData(evt.target.result);
    };
  }

  const setAccessToken = token => {
    const dbReq = IndexedDB.user();
    dbReq.onsuccess = evt => {
      const db = evt.target.result;
      const store = IndexedDB.store(db, "data", "readwrite");
      const getReg = store.put(token, "access_token");
      getReg.onsuccess = () => setToken(token);
    };
  };

  const logoutUser = () => {
    const dbReq = IndexedDB.user();
    dbReq.onsuccess = evt => {
      const db = evt.target.result;
      const store = IndexedDB.store(db, "data", "readwrite");
      store.delete("access_token");
      store.delete("auth_profile_info");
      setToken(null);
      setAuthUserData(null);
    };
  };

  return (
    <AuthenticationContext.Provider value={{ accessToken, setAccessToken, authUserData, logoutUser }}>
      <Show when={!accessToken.loading}>
        {props.children}
      </Show>
    </AuthenticationContext.Provider>
  )
}

export function useAuthentication() { return useContext(AuthenticationContext); }
