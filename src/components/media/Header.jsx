import { Match, Show, Switch } from "solid-js";
import { capitalize, formatMediaFormat, numberCommas } from "../../utils/formating";
import style from "./Header.module.scss";

const Header = (props) => {
  return (
    <div class={style.header}>
      <div class={style.left}>
        <p class={style.leftHeader}>Scores</p>
        <div class={style.scores}>
          <div class={style.scoreBox}>
            <p class={style.scoreLabel}>Mean</p>
            <span class={style.scoreValue}>{((props.meanScore || 0) / 10).toFixed(1)}</span>
          </div>
          <div class={style.scoreBox}>
            <p class={style.scoreLabel}>Average</p>
            <span class={style.scoreValue}>{((props.averageScore || 0) / 10).toFixed(1)}</span>
          </div>
        </div>
        <p>{numberCommas(props.ratingUsers)} Users</p>
      </div>
      <div class={style.right}>
        <ul class={style.top}>
          <li>Source {capitalize(props.source)}</li>
          <li>Favourites {numberCommas(props.favourites)}</li>
          <li>Members {numberCommas(props.popularity)}</li>
        </ul>
        <ul class={style.bottom}>
          <li>{capitalize(props.season) || "TBA"} {props.seasonYear}</li>
          <li>
            {formatMediaFormat(props.format)}
            <Switch>
              <Match when={props.countryOfOrigin === "CN"}> (Chinese)</Match>
              <Match when={props.countryOfOrigin === "TW"}> (Taiwanese)</Match>
            </Switch>
          </li>
          <li>{capitalize(props.status)}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header; 
