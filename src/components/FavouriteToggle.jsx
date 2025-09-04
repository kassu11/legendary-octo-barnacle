import { leadingAndTrailingDebounce } from "../utils/scheduled.js";
import api from "../utils/api";
import "./FavouriteToggle.scss";
import { compactNumber } from "../utils/formating.js";
import { useAuthentication } from "../context/providers.js";
import { asserts } from "../collections/collections.js";
import { createSignal } from "solid-js";

export function FavouriteToggle(props) {
  const { accessToken } = useAuthentication();
  asserts.assertTrue("checked" in props, "checked missing");
  asserts.assertTrue("variableId" in props, "variableId missing");
  asserts.assertTrue("onChange" in props, "onChange missing");
  asserts.assertTrue("mutateCache" in props, "mutateCache missing");
  asserts.assertTrue(props.idType === "MANGA" || props.idType === "ANIME" || props.idType === "STAFF" || props.idType === "CHARACTER" || props.idType === "STUDIO" , "Missing idType");


  let localChecked = null;
  const triggerLikeToggle = leadingAndTrailingDebounce(async (token, variables, checked) => {
    if (checked !== localChecked) {
      const data = await api.anilist.toggleFavourite(token, variables);
      asserts.assertFalse(data.fromCache, "Mutation should never be cached");
      props.mutateCache(checked, variables);
    }
    localChecked = checked
  }, 500);

  return (
    <label class="toggle-favourite-button">
      <input type="checkbox" checked={props.checked} onChange={(e) => {
        props.onChange(e.target.checked);
        triggerLikeToggle(accessToken(), {[props.idType]: props.variableId}, e.target.checked);
      }}/>
      <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
      <Show when={props.favourites != undefined}>
        {compactNumber(props.favourites)}
      </Show>
      <span class="visually-hidden">Favourite</span>
    </label>
  );
}
