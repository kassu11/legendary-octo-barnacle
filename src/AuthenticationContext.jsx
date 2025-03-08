import api, { IndexedDB } from "./api";
import { createSignal, createContext, useContext, createResource, Switch, Match, Show } from "solid-js";

const AuthenticationContext = createContext();

export function AuthenticationProvider(props) {
  const [accessToken, setToken] = createSignal(null);
  const [authUserData, setAuthUserData] = createResource(accessToken, api.anilist.getAuthUserData);

  const dbReq = IndexedDB.user();
  dbReq.onsuccess = evt => {
    const db = evt.target.result;
    const store = IndexedDB.store(db, "data", "readonly");
    const getTokenReq = store.get("access_token");
    const getProfileReq = store.get("auth_profile_info");
    getTokenReq.onsuccess = evt => {
      if(evt.target.result == null) return;
      setToken(evt.target.result);
    };
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
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export function useAuthentication() { return useContext(AuthenticationContext); }
