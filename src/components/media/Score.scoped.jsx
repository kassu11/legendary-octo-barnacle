import { StarIcon } from "@/assets/icons.jsx";
import { Show, Switch, Match, splitProps } from "solid-js";
import "./Score.scoped.css";
import EmojiByScore from "@/components/EmojiByScore.scoped.jsx";

const scoreMultipliers = { POINT_100: 1, POINT_10: 10, POINT_10_DECIMAL: 10, POINT_5: 20 };

function Score(props) {

  const [local, scoping] = splitProps(props, ["score", "format", "highlight", "children"]);

  const scoreOutOf100 = () => local.score * (scoreMultipliers[local.format] ?? 0);

  return (
    <Show when={local.score !== 0}>
      <div {...scoping} classList={{
        score: true,
        highlight: local.highlight,
        badge: local.highlight && local.format !== "POINT_5" && local.format !== "POINT_3",
        good: scoreOutOf100() >= 75,
        average: scoreOutOf100() >= 60 && scoreOutOf100() < 75,
        bad: scoreOutOf100() < 60,
        [props.class]: !!props.class,
      }}>
        <Switch>
          <Match when={local.format === "POINT_10"}>{local.score}/10</Match>
          <Match when={local.format === "POINT_100"}>{local.score}/100</Match>
          <Match when={local.format === "POINT_10_DECIMAL"}>{local.score}/10</Match>
          <Match when={local.format === "POINT_5"}>{local.score}/5 <StarIcon scoped class="score-star" /></Match>
          <Match when={local.format === "POINT_3"}>
            {local.score}/3
            <Switch>
              <Match when={local.score === 1}><EmojiByScore scoped class="emoji-by-score" score={0} /></Match>
              <Match when={local.score === 2}><EmojiByScore scoped class="emoji-by-score" score={70} /></Match>
              <Match when={local.score === 3}><EmojiByScore scoped class="emoji-by-score" score={80} /></Match>
            </Switch>
          </Match>
        </Switch>
        {local.children}
      </div>
    </Show>
  );
}

export default Score;
