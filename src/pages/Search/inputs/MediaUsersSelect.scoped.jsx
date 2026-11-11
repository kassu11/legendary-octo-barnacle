import { useSearchParams } from "@solidjs/router";
import { batch, createEffect, createMemo, createSignal, Match, Show, Switch } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { UserSearchIcon, UsersIcon } from "@/assets/icons.jsx";
import "./MediaUsersSelect.scoped.css"
import { createCleanUpAbortController } from "@/utils/abortUtils.js";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { queries } from "@/api/api.js";
import { LoaderCircle } from "@/components/LoaderCircle.scoped.jsx";
import { createLocalStorageJsonSignal } from "@/utils/localStorageUtils.js";
import { setFetcherValueToStorage } from "@/utils/storageUtils.js";
import { addApplicationNotification } from "@/state/notifications";
import { arrayUtils } from "@/utils/utils.js";

export const [usersData, setUsersData] = createSignal({}, { equals: false });
const [cachedUserInfos, setCachedUserInfos] = createLocalStorageJsonSignal("LOB-media-search-user-cache", {}, { equals: false });

export function MediaUsersSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
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
      // TODO: Change erros better
      onError: async res => {
        if (!res) return;
        if (Error.isError(res)) {
          console.error(res);
          return;
        }
        try {
          const { errors } = await res.json();
          for (const { message, status } of errors) {
            // Token has expired so lets log out the user
            if (status === 404 && message === "User not found") {
              addApplicationNotification({ type: "info", message: `Anilist did not find a valid user with a name: "${userName}".`, duration: 10_000 });
              setSearchParams({ user: arrayUtils.wrapToArray(searchParams.user).filter(name => name.toLowerCase() !== "in-" + userName && name.toLowerCase() !== "ex-" + userName) }, { replace: true });
              return;
            }
          }
        } catch (err) {
          console.error(err);
          addApplicationNotification({ type: "error", message: `Anilist errored with a status code: ${res.status || "404"}.`, duration: 10_000 });
        }
      },
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

    options.sort((a, b) => a.id.localeCompare(b.id));

    if (input().length && !optionsMap.has(input().toLowerCase())) options.push({ id: input().toLowerCase(), description: input(), internalSearch: true });

    return options;

  });

  const usersValues = createMemo(() => {
    const { users, excludedUsers } = parsedSearchParams();
    return [...users.map(name => name.toLowerCase()), ...excludedUsers.map(name => "-" + name.toLowerCase())];
  });

  const handleUsersChange = ({ user }) => {
    const nameOf = id => usersOptions().find(option => option.id === id)?.description ?? id;
    setSearchParams({ user: user.map(token => token[0] === "-" ? "ex-" + nameOf(token.slice(1)) : "in-" + nameOf(token)) }, { replace: true });
  };

  return (
    <FilterSelect
      param="user"
      excludable
      noPreview
      noEscapeCancel
      tooltip="Filter by the lists of other users. Click once to include, twice to exclude"
      each={usersOptions()}
      value={usersValues()}
      setSearchParams={handleUsersChange}
      onQueryChange={setInput}
      icon={<UsersIcon />}
      button="User List"
      emptyText="Type a username to search for it"
      rowIcon={row => (
        <Switch>
          <Match when={row.internalSearch}>
            <UserSearchIcon scoped class="user-search" />
          </Match>
          <Match when={true}>
            <div class="profile-wrapper">
              <Show when={row.avatar} fallback={<LoaderCircle scoped class="spinner" />}>
                <img src={row.avatar} alt="Profile picture" />
              </Show>
            </div>
          </Match>
        </Switch>
      )}
      rowLabel={row => row.internalSearch ? `Search for: ${row.description}` : row.description}
    />
  );
}
