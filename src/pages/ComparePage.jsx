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
import { formatMediaStatus, formatTitleToUrl, formatUsersMediaStatus } from "../utils/formating.js";
import "./ComparePage.scss";
import Score from "../components/media/Score.jsx";
import Star from "../assets/Star.jsx";

export default function ComparePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const [names, storeNames] = createStore([]);
  const [users, storeUsers] = createStore({});
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
    <CompareMediaListContext.Provider value={{ compareMediaList, setIncludeKeys, setExcludeKeys, users, storeUsers }}>
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
  const { setIncludeKeys, setExcludeKeys, users, storeUsers } = useCompareMediaList();
  const { accessToken } = useAuthentication();
  const [enabled, setEnabled] = createSignal(true);
  const [exclude, setExclude] = createSignal(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [mediaList, { mutateCache: mutateMediaListCache }] = api.anilist.mediaListByUserName(() => props.name, () => params.type.toUpperCase(), accessToken);

  console.log("name", props.name);

  function setKeys(keys, excludedValue) {
    if (enabled() && exclude() === excludedValue) {
      return [...new Set([...keys, mediaList().cacheKey])];
    } else {
      return keys.filter(val => val !== mediaList().cacheKey);
    }
  }

  createEffect(() => {
    if (mediaList()) {
      console.log(mediaList().data.user.name, mediaList().data.user);
      storeUsers(mediaList().data.user.name, mediaList().data.user);

      if (mediaList.indexedDBClosed) {
        setIncludeKeys(keys => setKeys(keys, false));
        setExcludeKeys(keys => setKeys(keys, true));
      }
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
          <label>
            <input type="checkbox" name="enable" checked={exclude()} onChange={e => setExclude(e.target.checked)} /> Hide {params.type} from this user
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
  const { compareMediaList, users } = useCompareMediaList();
  const params = useParams();

  return (
    <ol class="pg-compare-content grid-column-auto-fill">
      <For each={compareMediaList()}>{media => (
        <li class="pg-compare-media-card" style={{"--color": media.coverImage.color}}>
          <Show when={media.bannerImage}>
            <img src={media.bannerImage} class="bg" inert alt="Background banner" />
          </Show>
          <A class="cover-wrapper" href={"/" + params.type + "/" + media.id + "/" + formatTitleToUrl(media.title.userPreferred)}>
            <div class="header flex-space-between">
              <Show when={media.repeat}>
                <div class="cp-card-repeat">
                  <Tooltip tipPosition="right">Compined {params.type === "anime" ? "rewatches" : "rereads"} {media.repeat}</Tooltip>
                  {media.repeat}
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"></path></svg>
                </div>
              </Show>
              <div class="score">
                <Tooltip tipPosition="right">Global average score</Tooltip>
                <Star /> {(media.averageScore / 10) || "N/A"}
              </div>
            </div>
            <img class="cover" src={media.coverImage.large} alt="Media cover" />
            <Show when={media.episodes || media.chapters || media.volumes || media.score}>
              <div class="footer flex-space-between">
                <span>
                  <Switch>
                    <Match when={params.type === "anime"}>
                      <Show when={media.episodes}>Ep {media.episodes}</Show>
                    </Match>
                    <Match when={params.type === "manga"}>
                      <Show when={media.chapters}>Ch {media.chapters}</Show><br />
                      <Show when={media.volumes}>Vol {media.volumes}</Show>
                    </Match>
                  </Switch>
                </span>
                <Show when={media.score}>
                  <span>
                    {Math.round(media.score * 100) / 100}/10
                    <Tooltip tipPosition="right">Users average score</Tooltip>
                  </span>
                </Show>
              </div>
            </Show>
          </A>
          <div>
            <p class="title">{media.title.userPreferred}</p>
            <ol class="pg-compare-media-users">
              <For each={media.mediaEntries}>{user => (
                <li>
                  <img class="profile" src={users[user.name].avatar.large} alt="Profile picture" />
                  <span class="name">{user.name}</span>
                  <Show when={user.status !== "COMPLETED"}>
                    <span class="status">{formatUsersMediaStatus(user.status, params.type)}</span>
                  </Show>
                  <Show when={user.repeat}>
                    <div class="cp-card-repeat">
                      <Tooltip tipPosition="top">{params.type === "anime" ? "Rewatched" : "Reread"} {user.repeat} times</Tooltip>
                      {user.repeat}
                      <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"></path></svg>
                    </div>
                  </Show>
                  <Score score={user.score} format={users[user.name].mediaListOptions.scoreFormat || "POINT_10_DECIMAL"} />
                </li>
              )}</For>
            </ol>
          </div>
        </li>
      )}</For>
    </ol>
  );
}
