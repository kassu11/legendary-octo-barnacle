import { useSearchParams, useNavigate } from "@solidjs/router";
import { createEffect, createMemo, createSignal, Show, untrack } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import "./MediaUsersSelect.scoped.css"
import { createCleanUpAbortController } from "../../../utils/abortUtils.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../../utils/fetcherUtils.js";
import { queries } from "../../../collections/collections.js";
import { Checkbox } from "../Checkbox.scoped.jsx";
import { LoaderCircle } from "../../../components/LoaderCircle.scoped.jsx";

export const [usersData, setUsersData] = createSignal({}, { equals: false });

export function MediaUsersSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchUser, setSearchUser] = createSignal(undefined);
  const [input, setInput] = createSignal("");

  const anilistUserSearchController = createCleanUpAbortController();
  let anilistUserSearchFetcher;

  createEffect(() => {
    const userName = searchUser();
    if (userName) return;
    const users = parsedSearchParams().users;
    const data = usersData();

    for (const name of users) {
      if (name in data || !name) continue;
      setSearchUser(name);
      return;
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
        const result = {
          name, avatar,
          anime: new Set(entries.anime.lists.flatMap(list => list.entries.map(entry => entry.mediaId))),
          manga: new Set(entries.manga.lists.flatMap(list => list.entries.map(entry => entry.mediaId))),
        }

        setUsersData(obj => {
          obj[userName] = result;
          return obj;
        });

        setSearchUser(undefined);
      }
    });
  });

  const usersOptions = createMemo(() => {
    if (input().length) return [];

    const allUserInfo = usersData();
    return parsedSearchParams().users.map(name => {
      return {
        id: name,
        description: allUserInfo[name]?.name || name,
        avatar: allUserInfo[name]?.avatar
      }
    });

  });

  const usersValues = createMemo(() => {
    return parsedSearchParams().users.map(id => ({ id, value: true }));
  });

  const handleChange = e => {
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
      return;
    }

    setInput(e.input || "");
    if (!e.target && !e.search) return;

    const curUser = untrack(searchUser);

    const newActiveValues = [...usersValues()];
    const name = (e.search || e.target).toLowerCase();
    if (e.search) {

      if (!newActiveValues.includes(name)) newActiveValues.push({ id: name, value: true });
      setSearchParams({ user: newActiveValues.map(e => e.id) }, { replace: true });
      if (!curUser) {
        setSearchUser(name);
      }

      return;
    }

    const index = newActiveValues.findIndex(val => val.id == e.target);

    if (index == -1) {
      newActiveValues.push({ id: e.target, value: true });
    } else {
      newActiveValues.splice(index, 1);
    }

    setSearchParams({ user: newActiveValues.map(e => e.id) }, { replace: true });

  };

  return (
    <MultiSelect each={usersOptions()} value={usersValues()} onChange={handleChange} button="User Filtering">{entry => {
      return (
        <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <div class="profile-wrapper">
            <Show when={entry.avatar} fallback={<LoaderCircle scoped class="spinner" />}>
              <img src={entry.avatar} alt="Profile picture" />
            </Show>
          </div>
          <p>{entry.description}</p>

          <Checkbox scoped checked={entry.value} class="checkbox" />

        </div>
      );
    }}</MultiSelect>
  );
}
