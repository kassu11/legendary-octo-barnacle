import { batch, createMemo, createRoot, createSignal, untrack } from "solid-js";
import { createLocalStorageJsonSignal } from "../utils/localStorageUtils";
import { deleteIndexDBValue, setIndexedDBValue } from "../utils/indexedDButils";
import { createOneTimeSessionStorageSignal } from "../utils/sessionStorageUtils";
import { createAnilistFetcher, sendAnilistFetcher } from "../utils/fetcherUtils";
import { queries } from "../collections/collections";
import { setFetcherValueToStorage } from "../utils/storageUtils";

export const [authUserData, setAuthUserData] = createLocalStorageJsonSignal("LOB-authed-used-data");
export const allActiveTokens = {};
export const [token2, setToken2] = createOneTimeSessionStorageSignal("LOB-token");

export const authedUserId = createRoot(() => createMemo(() => authUserData()?.data.id));
export const [mainLoadingCount, setMainLoadingCount] = createSignal(0);

export const logoutUser = () => {
  deleteIndexDBValue("tokens", `anilist-${untrack(authedUserId)}`);
  batch(() => {
    setToken2(null);
    setAuthUserData(null);
  });
};

export const setAccessToken = async (token, expires) => {
  setToken2(token || null);
  const fetcher = createAnilistFetcher(queries.currentUser, {}, new AbortController().signal);
  sendAnilistFetcher(fetcher, {
    name: "AniList authed user",
    setValue: async (res) => {
      const id = res.data.data.Viewer.id;

      // Because we store what token the user uses, the fetcher can now swap the token to user id
      // This makes it possible to keep your cache, even when tokens update
      allActiveTokens[`anilist-${id}`] = token;
      allActiveTokens[token] = `anilist-${id}`;

      // Because new token is now linked, if we generate the same fetcher, the token should be swapped with id
      // Store the user data to this tokenless cacheKey
      const fetcherWithoutToken = createAnilistFetcher(queries.currentUser, {}, new AbortController().signal);
      res.cacheKey = fetcherWithoutToken.cacheKey;
      setFetcherValueToStorage(res);

      setIndexedDBValue("tokens", {
        data: token,
        expires: new Date().getTime() + expires * 1000,
        modified: new Date(),
      }, `anilist-${id}`);

      batch(() => {
        setAuthUserData({ data: res.data.data.Viewer })
        setToken2(token);
      });
    }
  });
};
