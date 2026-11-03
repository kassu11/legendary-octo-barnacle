import Star from "../../assets/Star";
import { Show, Switch, Match, splitProps } from "solid-js";
import "./Score.scoped.css";
import EmojiByScoreScoped from "../EmojiByScore.scoped.jsx";

function Score(props) {

  const [local, scoping] = splitProps(props, ["score", "format"]);

  return (
    <Show when={local.score !== 0}>
      <div {...scoping}>
        <Switch>
          <Match when={local.format === "POINT_10"}>{local.score}/10</Match>
          <Match when={local.format === "POINT_100"}>{local.score}/100</Match>
          <Match when={local.format === "POINT_10_DECIMAL"}>{local.score}/10</Match>
          <Match when={local.format === "POINT_5"}>{local.score}/5 <Star scoped class="score-star" /></Match>
          <Match when={local.format === "POINT_3"}>
            <Switch>
              <Match when={local.score === 1}><EmojiByScoreScoped scoped class="score-emoji" score={0} /></Match>
              <Match when={local.score === 2}><EmojiByScoreScoped scoped class="score-emoji" score={70} /></Match>
              <Match when={local.score === 3}><EmojiByScoreScoped scoped class="score-emoji" score={80} /></Match>
            </Switch>
          </Match>
        </Switch>
      </div>
    </Show>
  );
}

export default Score; 
