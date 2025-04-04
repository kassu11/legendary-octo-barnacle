import { leadingAndTrailingDebounce } from "../utils/scheduled.js";
import api from "../utils/api";
import style from "./FavouriteToggle.module.scss";
import { assert } from "../utils/assert";
import { useAuthentication } from "../context/AuthenticationContext";

export function FavouriteToggle(props) {
  const { accessToken } = useAuthentication();
  assert("checked" in props, "checked missing");
  assert("onChange" in props, "onChange missing");
  assert("mutateCache" in props, "mutateCache missing");
  assert("mangaId" in props || "animeId" in props, "Id missing");

  let localChecked = null;
  const triggerLikeToggle = leadingAndTrailingDebounce(async (token, variables, checked) => {
    if (checked !== localChecked) {
      const data = await api.anilist.toggleFavourite(token, variables);
      assert(!data.fromCache, "Mutation should never be cached");
      props.mutateCache(checked);
    }
    localChecked = checked 
  }, 500);

  return (
    <label class={style.favourite}>
      <input type="checkbox" checked={props.checked} onChange={(e) => {
        props.onChange(e.target.checked);
        if ("mangaId" in props) {
          triggerLikeToggle(accessToken(), {mangaId: props.mangaId}, e.target.checked);
        } else if ("animeId" in props) {
          triggerLikeToggle(accessToken(), {animeId: props.animeId}, e.target.checked);
        }
      }}/>
      <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
      <span class="visually-hidden">Favourite</span>
    </label>
  );
}
