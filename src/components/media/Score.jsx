import Star from "../../assets/Star";
import { Show, Switch, Match } from "solid-js";
import "./Score.scss";
import Emoji from "../../assets/Emoji";

function Score(props) {
  return (
    <Show when={props.score !== 0}>
      <div class="score-component-container">
        <Switch>
          <Match when={props.format === "POINT_10"}>{props.score}/10</Match>
          <Match when={props.format === "POINT_100"}>{props.score}/100</Match>
          <Match when={props.format === "POINT_10_DECIMAL"}>{props.score}/10</Match>
          <Match when={props.format === "POINT_5"}>{props.score}/5 <Star class="score-star" /></Match>
          <Match when={props.format === "POINT_3"}>
            <Switch>
              <Match when={props.score === 1}><Emoji class="score-emoji" score={80} /></Match>
              <Match when={props.score === 2}><Emoji class="score-emoji" score={70} /></Match>
              <Match when={props.score === 3}><Emoji class="score-emoji" score={0} /></Match>
            </Switch>
          </Match>
        </Switch>
      </div>
    </Show>
  );
}

export default Score; 
