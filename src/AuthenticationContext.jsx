import { A, Navigate, redirect, useLocation, useSearchParams } from "@solidjs/router";
import api, { IndexedDB } from "./api";
import { createSignal, createContext, useContext, createResource, Switch, Match, Show } from "solid-js";

const AuthenticationContext = createContext();

export function AuthenticationProvider(props) {
  const [accessToken, setToken] = createSignal(null);
  const dbReq = IndexedDB.user();
  dbReq.onsuccess = evt => {
    const db = evt.target.result;
    const store = IndexedDB.store(db, "data", "readonly");
    const getReg = store.get("access_token");
    getReg.onsuccess = evt => {
      if(evt.target.result == null) return;
      setToken(evt.target.result);
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

  const deleteAccessToken = () => {
    const dbReq = IndexedDB.user();
    dbReq.onsuccess = evt => {
      const db = evt.target.result;
      const store = IndexedDB.store(db, "data", "readwrite");
      store.delete("access_token");
      setToken(null);
    };
  };

  return (
    <AuthenticationContext.Provider value={{ accessToken, setAccessToken, deleteAccessToken }}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export function useAuthentication() { return useContext(AuthenticationContext); }
