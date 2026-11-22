import { batch, createMemo, createRoot, createSignal, untrack } from "solid-js";
import { createLocalStorageBooleanSignal, createLocalStorageJsonSignal, createLocalStorageSignal } from "@/utils/localStorageUtils";
import { deleteIndexDBValue, setIndexedDBValue } from "@/utils/indexedDBUtils";
import { createOneTimeSessionStorageJsonSignal, createOneTimeSessionStorageSignal, getOrInsertSessionStorageInt } from "@/utils/sessionStorageUtils";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils";
import { queries } from "@/api/api";
import { setFetcherValueToStorage } from "@/utils/storageUtils";
import { createStore } from "solid-js/store";

export const tabTime = getOrInsertSessionStorageInt("LOB-session-time", new Date().getTime());

export const [mediaWithMalId, storeMediaWithMalId] = createStore({});

export const [authUserData, setAuthUserData] = createLocalStorageJsonSignal("LOB-authed-used-data");
export const [allActiveTokens, setAllActiveTokens] = createOneTimeSessionStorageJsonSignal("LOB-tokens", {});
export const [token2, setToken2] = createOneTimeSessionStorageSignal("LOB-token");

export const authedUserId = createRoot(() => createMemo(() => authUserData()?.data.id));
export const [mainLoadingCount, setMainLoadingCount] = createSignal(0);
export const [mediaPageAnilistData, setMediaPageAnilistData] = createSignal(undefined, { equals: false });

// "none", "format", "season" or "year"
export const [searchPageGroupBy, setSearchPageGroupBy] = createLocalStorageSignal("LOB-group-by", "none");
export const [searchPageGroupSeasonalBy, setSearchPageGroupSeasonalBy] = createLocalStorageSignal("LOB-group-seasons-by", "format");
export const [searchPageGroupTBABy, setSearchPageGroupTBABy] = createLocalStorageSignal("LOB-group-tba-by", "none");
// "cards" or "rows"
export const [searchPageCardStyle, setSearchPageCardStyle] = createLocalStorageSignal("LOB-search-card-style", "cards");
export const [userMediaListCardStyle, setUserMediaListCardStyle] = createLocalStorageSignal("LOB-user-media-list-card-style", "cards");
export const [userMediaListAutoSave, setUserMediaListAutoSave] = createLocalStorageBooleanSignal("LOB-user-media-list-auto-save", false);
export const [voiceActorLanguages, setVoiceActorLanguages] = createLocalStorageJsonSignal("LOB-voice-actor-languages", ["Japanese"]);
export const [cachedUserInfos, setCachedUserInfos] = createLocalStorageJsonSignal("LOB-media-search-user-cache", {}, { equals: false });
export const [settingsShowDevBranch, setSettingsShowDevBranch] = createLocalStorageBooleanSignal("LOB-settings-debug-branch");

export const logoutUser = () => {
  deleteIndexDBValue("tokens", `anilist-${untrack(authedUserId)}`);
  batch(() => {
    setToken2(null);
    setAuthUserData(null);
  });
};

export const [globalEditedMedia, storeGlobalEditedMedia] = createStore({});

// Home activity feeds that are not currently open can still have these activities inside their cache
export const deletedActivityIds = new Set();

export const storeAccessToken = async (token, expires) => {
  setToken2(token || null);
  const fetcher = createAnilistFetcher(queries.currentUser, {});
  sendAnilistFetcher(fetcher, {
    name: "AniList authed user",
    setValue: async (res) => {
      const id = res.data.data.Viewer.id;

      // Because we store what token the user uses, the fetcher can now swap the token to user id
      // This makes it possible to keep your cache, even when tokens update
      setAllActiveTokens(tokens => {
        tokens[`anilist-${id}`] = token;
        tokens[token] = `anilist-${id}`;
        return tokens;
      });

      // Because new token is now linked, if we generate the same fetcher, the token should be swapped with id
      // Store the user data to this tokenless cacheKey
      const fetcherWithoutToken = createAnilistFetcher(queries.currentUser, {});
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
