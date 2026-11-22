import { createMemo, createSignal, Match, Show, Switch } from "solid-js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { LoaderCircle } from "@/components/LoaderCircle.scoped.jsx";
import { cachedUserInfos } from "@/components/search/inputs/MediaUsersSelect.scoped.jsx";
import { UserSearchIcon, UsersIcon } from "@/assets/icons.jsx";
import "./CompareUsersSelect.scoped.css";

/**
 * @param {Object} props
 * @param {string[]} props.users Names of the compared users
 * @param {string[]} props.excludedUsers Names of the users whose lists are filtered out
 * @param {string} props.type
 * @param {(params: Object) => void} props.setSearchParams
 */
export function CompareUsersSelect(props) {
  const [input, setInput] = createSignal("");

  const usersOptions = createMemo(() => {
    const optionsMap = new Map();
    for (const user of Object.values(cachedUserInfos())) optionsMap.set(user.name.toLowerCase(), { description: user.name, avatar: user.avatar });
    for (const name of props.users) optionsMap.set(name.toLowerCase(), { avatar: optionsMap.get(name.toLowerCase())?.avatar, description: name });
    for (const name of props.excludedUsers) optionsMap.set(name.toLowerCase(), { avatar: optionsMap.get(name.toLowerCase())?.avatar, description: name });

    const options = [];
    optionsMap.forEach((option, id) => {
      option.id = id;
      options.push(option);
    });
    options.sort((a, b) => a.id.localeCompare(b.id));

    if (input().length && !optionsMap.has(input().toLowerCase())) options.push({ id: input().toLowerCase(), description: input(), internalSearch: true });

    return options;
  });

  const usersValues = createMemo(() => [...props.users.map(name => name.toLowerCase()), ...props.excludedUsers.map(name => "-" + name.toLowerCase())]);

  const handleUsersChange = ({ user }) => {
    const nameOf = id => usersOptions().find(option => option.id === id)?.description ?? id;
    const users = [], excludedUsers = [];
    for (const token of user) {
      if (token[0] === "-") excludedUsers.push(nameOf(token.slice(1)));
      else users.push(nameOf(token));
    }
    props.setSearchParams({ user: users, exclude: excludedUsers });
  };

  return (
    <FilterSelect
      param="user"
      excludable
      noPreview
      noEscapeCancel
      tooltip={`Users whose lists are compared. Click once to compare a user, twice to filter out every ${props.type} on their list`}
      each={usersOptions()}
      value={usersValues()}
      setSearchParams={handleUsersChange}
      onQueryChange={setInput}
      icon={<UsersIcon />}
      button="Users"
      emptyText="Type a username to search for it"
      rowIcon={row => (
        <Switch>
          <Match when={row.internalSearch}>
            <UserSearchIcon scoped class="user-search" />
          </Match>
          <Match when={true}>
            <div class="profile-wrapper">
              <Show when={row.avatar} fallback={<LoaderCircle scoped class="loader-circle" />}>
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
