import { IndexedDB } from "../utils/api-OLD.js";
import { batch, createEffect, createMemo, createResource, createSignal, Show } from "solid-js";
import { AuthenticationContext } from "./providers";
import { createFetcher, sendFetcher } from "../utils/fetcherUtils.js";
import { queries } from "../collections/collections.js";
// import { createFetcher } from "../utils/fetcherSenderUtils.js";

export const [authUserData, setAuthUserData] = createSignal();
export const [token2, setToken2] = createSignal();

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

  // const [authUserData, { mutate: setAuthUserData }] = apiOLD.anilist.getAuthUserData(() => accessToken() ?? undefined);

  createEffect(() => {
    setToken2(accessToken());
  });

  const fetcher = createMemo(() => {
    const t = accessToken();
    if (t === undefined) return;

    const headers = { "Content-Type": "application/json" };
    if (t) headers.Authorization = `Bearer ${t}`;

    return createFetcher("https://graphql.anilist.co", {
      method: "POST",
      headers,
      body: {
        query: queries.currentUser,
        variables: {},
      },
      signal: new AbortController().signal
    });
  });

  createEffect(() => {
    const f = fetcher();
    console.log(f);
    sendFetcher(f, {
      active: () => false,
      onError: res => {
        console.error(res.status);
      }
    });
  });

  // sendFetcher(fetcher, {
  //   // active: () => false,
  //   onError: res => {
  //     console.log(res.status);
  //   }
  // });

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

  // This should only be used when feature is soft released
  const isDeveloper = createMemo(() => {
    return authUserData()?.data?.id === 5137809;
  });

  return (
    <AuthenticationContext.Provider value={{ accessToken: token2, setAccessToken, authUserData, logoutUser, isDeveloper }}>
      <Show when={!accessToken.loading}>
        {props.children}
      </Show>
    </AuthenticationContext.Provider>
  )
}
