import { Match, splitProps, Switch } from "solid-js";
import "./EmojiByScore.scoped.css";
import { asserts } from "@/utils/utils.js";
import { HappyFaceIcon, NeutralFaceIcon, SadFaceIcon } from "@/assets/icons.jsx";

export default function EmojiByScoreScoped(props) {
  asserts.assertTruthy("score" in props, "Score is missing");

  const [local, scoping] = splitProps(props, ["score"]);

  return (
    <Switch>
      <Match when={local.score >= 75}>
        <HappyFaceIcon scoped {...scoping} classList={{ good: true, [props.class]: !!props.class }} />
      </Match>
      <Match when={local.score >= 60}>
        <NeutralFaceIcon scoped {...scoping} classList={{ average: true, [props.class]: !!props.class }} />
      </Match>
      <Match when={local.score >= 0}>
        <SadFaceIcon scoped {...scoping} classList={{ bad: true, [props.class]: !!props.class }} />
      </Match>
    </Switch>
  );
}
