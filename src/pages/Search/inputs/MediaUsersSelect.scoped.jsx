import { useSearchParams } from "@solidjs/router";
import { batch, createEffect, createMemo, createSignal, Match, Show, Switch } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import "./MediaUsersSelect.scoped.css"
import { createCleanUpAbortController } from "../../../utils/abortUtils.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../../utils/fetcherUtils.js";
import { queries } from "../../../collections/collections.js";
import { Checkbox } from "../Checkbox.scoped.jsx";
import { LoaderCircle } from "../../../components/LoaderCircle.scoped.jsx";
import { useNavigateAndSearch } from "../../../utils/urlUtils.js";
import { createLocalStorageJsonSignal } from "../../../utils/localStorageUtils.js";
import { setFetcherValueToStorage } from "../../../utils/storageUtils.js";
import { UserSearchIcon } from "../../../assets/UserSearchIcon.jsx";

export const [usersData, setUsersData] = createSignal({}, { equals: false });
const [cachedUserInfos, setCachedUserInfos] = createLocalStorageJsonSignal("LOB-media-search-user-cache", {}, { equals: false });

export function MediaUsersSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigateAndSearch();
  const [searchUser, setSearchUser] = createSignal(undefined);
  const [input, setInput] = createSignal("");

  const anilistUserSearchController = createCleanUpAbortController();
  let anilistUserSearchFetcher;

  createEffect(() => {
    const userName = searchUser();
    if (userName) return;

    const { users, excludedUsers } = parsedSearchParams();
    const data = usersData();

    for (let name of users) {
      name = name.toLowerCase();
      if (name && !data[name]) return setSearchUser(name);
    }

    for (let name of excludedUsers) {
      name = name.toLowerCase();
      if (name && !data[name]) return setSearchUser(name);
    }
  });

  createEffect(() => {
    const signal = anilistUserSearchController.abortAndRenew();
    const userName = searchUser();
    if (!userName) return;

    anilistUserSearchFetcher = createAnilistFetcher(queries.anilistAllUserMediaIds, { userName, statusNotIn: ["PLANNING"] }, signal);

    sendAnilistFetcher(anilistUserSearchFetcher, {
      name: "Anilist All User Media IDs",
      onFetch: () => anilistUserSearchController.disable(),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== anilistUserSearchFetcher.cacheKey) return;

        const entries = res.data.data;
        const name = entries.anime.user.name || entries.manga.user.name;
        const avatar = entries.anime.user.avatar.medium|| entries.manga.user.avatar.medium;
        const id = entries.anime.user.id || entries.manga.user.id;
        const result = {
          name, avatar, id,
          anime: new Set(entries.anime.lists.flatMap(list => list.entries.map(entry => entry.mediaId))),
          manga: new Set(entries.manga.lists.flatMap(list => list.entries.map(entry => entry.mediaId))),
        }

        if (name !== userName) {
          const alternativeCacheKey = createAnilistFetcher(queries.anilistAllUserMediaIds, { userName: name, statusNotIn: ["PLANNING"] }, signal).cacheKey;
          setFetcherValueToStorage({ ...res, cacheKey: alternativeCacheKey });
        }

        batch(() => {
          setUsersData(obj => {
            obj[userName] = result;
            return obj;
          });

          setCachedUserInfos(obj => {
            obj[id] = { name, avatar }
            return obj;
          });

          setSearchUser(undefined);
        });
      }
    });
  });

  const usersOptions = createMemo(() => {

    const { users, excludedUsers } = parsedSearchParams();
    const cachedUser = cachedUserInfos();
    const optionsMap = new Map();
    users                    .forEach(name => optionsMap.set(name.toLowerCase(),      { description: name                           }));
    excludedUsers            .forEach(name => optionsMap.set(name.toLowerCase(),      { description: name                           }));
    Object.values(cachedUser).forEach(user => optionsMap.set(user.name.toLowerCase(), { description: user.name, avatar: user.avatar }));

    const options = [];
    optionsMap.forEach((obj, id) => {
      obj.id = id;
      options.push(obj);
    });

    options.sort((a, b) => a.description.localeCompare(b.description));

    if (input().length && !optionsMap.has(input().toLowerCase())) options.push({ id: input().toLowerCase(), description: input(), internalSearch: true });

    return options;

  });

  const usersValues = createMemo(() => {

    const values = [];
    const { users, excludedUsers } = parsedSearchParams();
    users        .forEach(id => values.push(({ id: id.toLowerCase(), value: "in-", include: true, original: id })));
    excludedUsers.forEach(id => values.push(({ id: id.toLowerCase(), value: "ex-", exclude: true, original: id })));

    return values;
  });

  const handleChange = e => {

    if (e.oldUrl) return navigate(e.oldUrl);

    setInput(e.input || e.search || "");
    if (!e.target) return;

    const newActiveValues = [...usersValues()];
    const index = newActiveValues.findIndex(val => val.id == e.target);
    if (index == -1) {
      newActiveValues.push({ id: e.target, value: "in-", original: e.entry.description });
    } else if (e.entry.value === "in-") {
      newActiveValues[index].value = "ex-";
    } else {
      newActiveValues.splice(index, 1);
    }

    setSearchParams({ user: newActiveValues.map(e => e.value + e.original) }, { replace: true });

  };

  return (
    <MultiSelect each={usersOptions()} value={usersValues()} onChange={handleChange} button="User Filtering">{entry => {
      return (
        <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered, search: entry.internalSearch }}>
          <Switch>

            <Match when={entry.internalSearch}>
              <UserSearchIcon scoped class="user-search" />
              <p>Search for: {input()}</p>
            </Match>

            <Match when={true}>
              <div class="profile-wrapper">
                <Show when={entry.avatar} fallback={<LoaderCircle scoped class="spinner" />}>
                  <img src={entry.avatar} alt="Profile picture" />
                </Show>
              </div>
              <p>{entry.description}</p>

              <Checkbox scoped class="checkbox" include={entry.include} exclude={entry.exclude} />

            </Match>
          </Switch>

        </div>
      );
    }}</MultiSelect>
  );
}
