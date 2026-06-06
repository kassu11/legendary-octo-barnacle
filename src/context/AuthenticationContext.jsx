import { Show, untrack } from "solid-js";
import { AuthenticationContext } from "./providers";
import { authUserData, logoutUser, authedUserId, token2, allActiveTokens, setToken2, setAllActiveTokens } from "../core/globalState.js";
import { getAllIndexedDBValues } from "../utils/indexedDButils.js";

export function AuthenticationProvider(props) {
  loadTokens();

  return (
    <AuthenticationContext.Provider value={{ accessToken: token2, authUserData, logoutUser }}>
      <Show when={token2() !== undefined}>
        {props.children}
      </Show>
    </AuthenticationContext.Provider>
  )
}

async function loadTokens() {
  const id = +untrack(authedUserId);
  const tokens = await getAllIndexedDBValues("tokens");
  setAllActiveTokens(active => {
    for (const key in active) {
      delete active[key];
    }

    for (const key in tokens) {
      active[key] = tokens[key].data;
      active[tokens[key].data] = key;
    }

    return active;
  })

  const token = allActiveTokens()[`anilist-${id}`];
  if (!token && id) logoutUser();
  else setToken2(token || null);
}
