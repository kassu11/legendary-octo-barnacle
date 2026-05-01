import { IndexedDB } from "../utils/api-OLD.js";
import { batch, createEffect, createResource, Show } from "solid-js";
import { AuthenticationContext } from "./providers";
import { authUserData, setAuthUserData, setToken2, token2 } from "../core/globalState.js";

export function AuthenticationProvider(props) {
  const [accessToken, { mutate: setTokenOld }] = createResource(async () => {
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

  const setToken = (data) => {
    batch(() => {
      setToken2(data);
      setTokenOld(data);
    });
  }

  createEffect(() => {
    const t = accessToken();
    if (t === undefined) return;
    setToken2(t);
  });

  window.addEventListener("beforeunload", () => {
    const t = token2();
    if (t) sessionStorage["LOB-token"] = t;
  });

  const dbReq = IndexedDB.user();
  dbReq.onsuccess = evt => {
    const db = evt.target.result;
    const store = IndexedDB.store(db, "data", "readonly");
    const getProfileReq = store.get("auth_profile_info");

    getProfileReq.onsuccess = evt => {
      if (evt.target.result == null) return;
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
    <AuthenticationContext.Provider value={{ accessToken: token2, setAccessToken, authUserData, logoutUser }}>
      <Show when={token2() !== undefined}>
        {props.children}
      </Show>
    </AuthenticationContext.Provider>
  )
}
