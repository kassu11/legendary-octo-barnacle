import Star from "../../assets/Star";
import { Show, Switch, Match } from "solid-js";
import style from "./Score.module.scss";

function Score(props) {
  return (
    <Show when={props.score !== 0}>
      <div class={style.scoreContainer}>
        <Switch>
          <Match when={props.format === "POINT_10"}>{props.score}/10</Match>
          <Match when={props.format === "POINT_100"}>{props.score}/100</Match>
          <Match when={props.format === "POINT_10_DECIMAL"}>{props.score}/10</Match>
          <Match when={props.format === "POINT_5"}>{props.score}/5 <Star class={style.scoreStar} /></Match>
          <Match when={props.format === "POINT_3"}>
            <Switch>
              <Match when={props.score === 1}>😟</Match>
              <Match when={props.score === 2}>😐</Match>
              <Match when={props.score === 3}>😁</Match>
            </Switch>
          </Match>
        </Switch>
      </div>
    </Show>
  );
}

export default Score; 