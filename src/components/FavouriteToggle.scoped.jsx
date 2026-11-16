import { Match, Show, splitProps, Switch, untrack } from "solid-js";
import "./FavouriteToggle.scoped.css";
import { HeartIcon } from "@/assets/icons.jsx";
import { queries } from "@/api/api.js";
import { createAnilistFetcher, fetcherToFetch } from "@/api/fetcherUtils.js";
import { addApplicationNotification } from "@/state/notifications";
import { compactNumber } from "@/utils/formatUtils.js";
import { leadingAndTrailingDebounce } from "@/utils/scheduleUtils.js";
import { asserts } from "@/utils/utils.js";

/**
 * Favourite heart toggle. Every extra feature is opt-in and off by default.
 * The toggle is only interactive when idType, variableId, onChange and mutateCache are all given.
 *
 * @param {Object} props
 * @param {boolean} [props.checked] Viewer has favourited the entity
 * @param {"ANIME"|"MANGA"|"CHARACTER"|"STAFF"|"STUDIO"} [props.idType] Anilist favourite type
 * @param {number|string} [props.variableId] Anilist id of the entity
 * @param {Function} [props.onChange] Called with the new checked state right away, before the mutation is sent
 * @param {Function} [props.mutateCache] Called with the checked state and mutation variables after the mutation has succeeded
 * @param {boolean} [props.showAnilist] Anilist favourite count
 * @param {number} [props.anilistValue] Anilist favourite count value, N/A when missing
 * @param {boolean} [props.anilistLoading] Anilist favourite count is still loading
 */
export function FavouriteToggle(props) {
  const [local, scoping] = splitProps(props, ["checked", "idType", "variableId", "onChange", "mutateCache", "showAnilist", "anilistValue", "anilistLoading"]);

  let localChecked = null;
  const triggerLikeToggle = leadingAndTrailingDebounce(async (variables, checked) => {
    if (checked !== localChecked) {
      const fetcher = createAnilistFetcher(queries.anilistMutateToggleFavourite, variables, AbortSignal.timeout(30_000));
      const res = await fetcherToFetch(fetcher);
      if (res.status === 200) {
        local.mutateCache(checked, variables);
      } else if (checked) {
        addApplicationNotification({ type: "error", message: "Adding to favourites has failed", duration: 30_000 });
      } else {
        addApplicationNotification({ type: "error", message: "Removing from favourites has failed", duration: 30_000 });
      }
    }
    localChecked = checked;
  }, 500);

  const disabled = () => !local.idType || !local.variableId || !local.onChange || !local.mutateCache;

  const handleChange = e => {
    if (untrack(disabled)) {
      return;
    }

    const type = local.idType;
    asserts.assertTruthy(type === "MANGA" || type === "ANIME" || type === "STAFF" || type === "CHARACTER" || type === "STUDIO", "Missing idType");

    local.onChange(e.target.checked);
    triggerLikeToggle({ [type]: local.variableId }, e.target.checked);
  };

  return (
    <label {...scoping} classList={{ "favourite-toggle": true, disabled: disabled(), [scoping.class]: !!scoping.class }}>
      <input type="checkbox" disabled={disabled()} checked={local.checked} onChange={handleChange} />
      <span class="visually-hidden">Favourite</span>
      <HeartIcon scoped class="heart" />
      <Show when={local.showAnilist}>
        <span>
          <span class="visually-hidden">Anilist favourites: </span>
          <Count value={local.anilistValue} loading={local.anilistLoading} />
        </span>
      </Show>
    </label>
  );
}

function Count(props) {
  return (
    <Switch>
      <Match when={props.loading}>...</Match>
      <Match when={props.value != null}>{compactNumber(props.value)}</Match>
      <Match when={props.value == null}>N/A</Match>
    </Switch>
  );
}
