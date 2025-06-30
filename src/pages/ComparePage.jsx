import { A, useParams, useSearchParams } from "@solidjs/router";
import { createSignal, For, on } from "solid-js";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { wrapToArray, wrapToSet } from "../utils/arrays";
import { createTrigger } from "../utils/createTrigger";
import { assert } from "../utils/assert";
import { CompareMediaListContext, useAuthentication, useCompareMediaList } from "../context/providers";
import api, { IndexedDB } from "../utils/api";
import { LoaderCircle } from "../components/LoaderCircle.jsx";
import { Tooltip } from "../components/Tooltips.jsx";
import CompareMediaListWorker from "../worker/compare-media-list.js?worker";


export default function ComparePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const [names, storeNames] = createStore([]);
  const [compareMediaList, setCompareMediaList] = createSignal([]);
  const [includeKeys, setIncludeKeys] = createSignal([]);
  const [excludeKeys, setExcludeKeys] = createSignal([]);

  createEffect(on(() => searchParams.user, user => {
    const names = wrapToSet(user);
    storeNames([...names]);
  }));

  const search = () => searchParams.search || "";
  const format = () => searchParams.format || "";
  const status = () => searchParams.status || "";
  const genre = () => searchParams.genre || "";
  const countryOfOrigin = () => searchParams.countryOfOrigin || "";
  const year = () => searchParams.year || "";
  const privateFilter = () => searchParams.private === "true";
  const notesFilter = () => searchParams.notes === "true";
  const rewatchedFilter = () => searchParams.repeat === "true";
  const missingStartFilter = () => searchParams.missingStart === "true";
  const missingScoreFilter = () => searchParams.missingScore === "true";
  const reverse = () => searchParams.reverse === "true";
  const sort = () => searchParams.sort || "score";
  const userStatus = () => searchParams.userStatus || "";
  const isAdult = () => {
    if (searchParams.isAdult === "true") return true;
    if (searchParams.isAdult === "false") return false;
    return undefined;
  };

  let worker;
  function updateCompareScores() {
    if (window.Worker) {
      worker = worker instanceof Worker ? worker : new CompareMediaListWorker();

      const postObject = {
        includeKeys: includeKeys(),
        excludeKeys: excludeKeys(),
        search: search(),
        format: format(),
        status: status(),
        genre: genre(),
        reverse: reverse(),
        countryOfOrigin: countryOfOrigin(),
        missingStart: missingStartFilter(),
        missingScore: missingScoreFilter(),
        isAdult: isAdult(),
        year: +year() || undefined,
        private: privateFilter(),
        notes: notesFilter(),
        repeat: rewatchedFilter(),
        sort: sort(),
        type: params.type,
        userStatus: userStatus(),
      };

      if (postObject.includeKeys.length === 0 && postObject.excludeKeys.length === 0) {
        return;
      }

      console.log("Posted message");

      worker.postMessage(postObject);

      worker.onmessage = message => {
        if (message.data === "success") {
          console.log("success")
          const cacheReq = IndexedDB.user();
          cacheReq.onsuccess = evt => {
            const db = evt.target.result;
            const store = IndexedDB.store(db, "data", "readonly");
            const getReq = store.get("compare_list");
            getReq.onsuccess = (evt) => {
              console.log("Worker event", evt.target.result);
              setCompareMediaList(evt.target.result || {});
            }
          }
        } else {
          console.error("Error");
        }
      }
    }
  }

  createEffect(updateCompareScores);

  return (
    <CompareMediaListContext.Provider value={{ compareMediaList, setIncludeKeys, setExcludeKeys }}>
      <div>
        Compare
        <A href="?user=kassu11">kassu11</A>
        <A href="?user=MrMiika">MrMiika</A>
        <button onClick={() => {
          setSearchParams({ user: ["kassu11", "MrMiika"] });
        }}>
          Order 1
        </button>
        <button onClick={() => {
          setSearchParams({ user: ["MrMiika", "kassu11"] });
        }}>
          Order 2
        </button>
        <button onClick={() => {
          setSearchParams({ user: ["MrMiika", "lmnoo"] });
        }}>
          Order 3
        </button>
        <ul>
          <For each={names}>{name => (
            <UserRow name={name} />
          )}</For>
        </ul>
      </div>
      <CompareMediaListContent />
    </CompareMediaListContext.Provider>
  );
}

function UserRow(props) {
  assert(props.name, "Name is missing");
  const params = useParams();
  const { setIncludeKeys } = useCompareMediaList();
  const { accessToken } = useAuthentication();
  const [enabled, setEnabled] = createSignal(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [mediaList, { mutateCache: mutateMediaListCache }] = api.anilist.mediaListByUserName(() => props.name, () => params.type.toUpperCase(), accessToken);

  console.log("name", props.name);

  createEffect(() => {
    if (mediaList()?.data && mediaList.indexedDBClosed) {
      setIncludeKeys(arr => {
        if (enabled()) {
          return [...new Set([...arr, mediaList().cacheKey])];
        } else {
          return arr.filter(val => val !== mediaList().cacheKey);
        }
      });
    }
  });

  return (
    <li>
      {console.log(props.name, mediaList.indexedDBClosed)}
      <Switch>
        <Match when={mediaList.error}>
          <p>No user found with name: "{props.name}"</p>
        </Match>
        <Match when={mediaList() || mediaList.loading}>
          <label>
            <input type="checkbox" name="enable" checked={!enabled()} onChange={e => setEnabled(!e.target.checked)} /> Disable user
          </label>
          <Show when={mediaList()} fallback={
            <LoaderCircle>
              <Tooltip tipPosition="right">
                <p>Loading user data</p>
              </Tooltip>
            </LoaderCircle>
          }>
            <img src={mediaList().data.user.avatar.large} alt={mediaList().data.user.name + " profile picture"} />
          </Show>
          <p>
            <Show when={mediaList()} fallback={props.name}>
              {mediaList().data.user.name}
            </Show>
          </p>
        </Match>
      </Switch>
    </li>
  );
}

function CompareMediaListContent() {
  const { compareMediaList } = useCompareMediaList();
  return (
    <ol class="grid-column-auto-fill">
      <For each={compareMediaList()}>{media => (
        <li>
          {media.title.userPreferred}
          <img src={media.coverImage.large} alt="" />
          <ol>
            <For each={media.scores}>{user => (
              <li>
                {user.name} {user.score}
              </li>
            )}</For>
          </ol>
        </li>
      )}</For>
    </ol>
  );
}
