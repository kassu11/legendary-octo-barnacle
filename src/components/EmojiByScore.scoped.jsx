import { Match, splitProps, Switch } from "solid-js";
import "./EmojiByScore.scoped.css";
import { asserts } from "@/utils/utils.js";
import { HappyFaceIcon, NeutralFaceIcon, SadFaceIcon } from "@/assets/icons.jsx";

export default function EmojiByScore(props) {
  asserts.assertTruthy("score" in props, "Score is missing");

  const [local, scoping] = splitProps(props, ["score"]);

  return (
    <Switch>
      <Match when={local.score >= 75}>
        <HappyFaceIcon scoped {...scoping} classList={{ "emoji-by-score": true, good: true, [props.class]: !!props.class }} />
      </Match>
      <Match when={local.score >= 60}>
        <NeutralFaceIcon scoped {...scoping} classList={{ "emoji-by-score": true, average: true, [props.class]: !!props.class }} />
      </Match>
      <Match when={local.score >= 0}>
        <SadFaceIcon scoped {...scoping} classList={{ "emoji-by-score": true, bad: true, [props.class]: !!props.class }} />
      </Match>
    </Switch>
  );
}
