import { leadingAndTrailingDebounce } from "../utils/scheduled.js";
import api from "../utils/api";
import "./FavouriteToggle.scss";
import { compactNumber } from "../utils/formating.js";
import { useAuthentication } from "../context/providers.js";
import { asserts } from "../collections/collections.js";
import { untrack } from "solid-js";
import Heart from "../assets/Heart.jsx";
import Anilist from "../assets/Anilist.jsx";
import MyAnimeList from "../assets/MyAnimeList.jsx";

export function FavouriteToggle(props) {
  const { accessToken } = useAuthentication();

  let localChecked = null;
  const triggerLikeToggle = leadingAndTrailingDebounce(async (token, variables, checked) => {
    if (checked !== localChecked) {
      const data = await api.anilist.toggleFavourite(token, variables);
      asserts.assertFalse(data.fromCache, "Mutation should never be cached");
      props.mutateCache(checked, variables);
    }
    localChecked = checked
  }, 500);

  const disabled = () => !props.idType || !props.onChange || !props.variableId || !props.mutateCache || !props.idType;

  return (
    <label class="cp-toggle-favourite-button flex-no-shrink" classList={{ disabled: disabled() }}>
      <input disabled={disabled()} type="checkbox" id="favourite-toggle" name="favourite-toggle" checked={props.checked} onChange={(e) => {
        if (untrack(disabled)) {
          return;
        }
        const type = props.idType;
        asserts.assertTrue(type === "MANGA" || type === "ANIME" || type === "STAFF" || type === "CHARACTER" || type === "STUDIO" , "Missing idType");

        props.onChange(e.target.checked);
        triggerLikeToggle(accessToken(), {[props.idType]: props.variableId}, e.target.checked);
      }}/>
      <Heart />
      <Scores />
    </label>
  );

  function Scores() {
    const jikan = () => "jikanValue" in props || props.jikanLoading;
    const anilist = () => "anilistValue" in props || props.anilistLoading;

    return (
      <Show when={jikan() || anilist()}>
        <div class="flex-no-shrink">
          <Show when={anilist()}>
            <div class="grid-center">
              <span class="visually-hidden">Anilist favourites: </span>
              <Anilist />
              <Switch>
                <Match when={props.anilistLoading}>...</Match>
                <Match when={props.anilistValue != null}>{compactNumber(props.anilistValue)}</Match>
                <Match when={props.anilistValue == null}>N/A</Match>
              </Switch>
            </div>
          </Show>
          <Show when={jikan()}>
            <div class="grid-center">
              <span class="visually-hidden">MyAnimeList favourites: </span>
              <MyAnimeList />
              <Switch>
                <Match when={props.jikanLoading}>...</Match>
                <Match when={props.jikanValue != null}>{compactNumber(props.jikanValue)}</Match>
                <Match when={props.jikanValue == null}>N/A</Match>
              </Switch>
            </div>
          </Show>
        </div>
      </Show>
    );
  }
}
