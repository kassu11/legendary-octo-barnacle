import { leadingAndTrailingDebounce } from "../utils/scheduled.js";
import "./FavouriteToggle.scss";
import { compactNumber } from "../utils/formating.js";
import { asserts, queries } from "../collections/collections.js";
import { Match, Show, Switch, untrack } from "solid-js";
import Heart from "../assets/Heart.jsx";
import Anilist from "../assets/Anilist.jsx";
import MyAnimeList from "../assets/MyAnimeList.jsx";
import { createAnilistFetcher, fetcherToFetch } from "../utils/fetcherUtils.js";
import { addApplicationNotification } from "../pages/App/ApplicationNotifications.scoped.jsx";

export function FavouriteToggle(props) {
  let localChecked = null;
  const triggerLikeToggle = leadingAndTrailingDebounce(async (variables, checked) => {
    if (checked !== localChecked) {
      const fetcher = createAnilistFetcher(queries.anilistMutateToggleFavourite, variables, AbortSignal.timeout(30_000));
      const res = await fetcherToFetch(fetcher);
      if (res.status === 200) {
        props.mutateCache(checked, variables);
      } else {
        if (checked) addApplicationNotification({ type: "error", message: "Adding to favourites has failed", duration: 30_000 });
        else addApplicationNotification({ type: "error", message: "Removing from favourites has failed", duration: 30_000 });
      }
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
        asserts.assertTrueOLD(type === "MANGA" || type === "ANIME" || type === "STAFF" || type === "CHARACTER" || type === "STUDIO" , "Missing idType");

        props.onChange(e.target.checked);
        triggerLikeToggle({[props.idType]: props.variableId}, e.target.checked);
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
