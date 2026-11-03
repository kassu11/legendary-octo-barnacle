import Star from "../../assets/Star";
import { Switch, Match, mergeProps, splitProps, Show, For } from "solid-js";
import "./ScoreInput.scoped.css";
import EmojiByScoreScoped from "../EmojiByScore.scoped.jsx";
import { asserts } from "../../collections/collections.js";

function ScoreInput(props) {
  asserts.assertTrueOLD(props.format, "Score format is missing");
  asserts.assertTrueOLD(props.onChange, "onChange is missing (give signal)");
  props = mergeProps({name: "score", id: "score", value: 0}, props);
  const [local, scoping] = splitProps(props, ["label", "format", "onChange"]);
  const [info] = splitProps(props, ["id", "name", "value"]);

  const updateValue = {
    onBeforeInput: e => {
      if (e.data?.toLowerCase().includes("e")) {
        e.preventDefault();
      }
    },
    onBlur: e => e.target.value = info.value 
  };

  return (
    <>
      <Show when={local.label}>
        <Switch>
          <Match when={local.format === "POINT_10" || local.format === "POINT_100" || local.format === "POINT_10_DECIMAL"}>
            <label htmlFor={info.id}>{local.label}</label>
          </Match>
          <Match when={local.format === "POINT_5" || local.format === "POINT_3"}>
            <p>{local.label}</p>
          </Match>
        </Switch>
      </Show>
      <Switch>
        <Match when={local.format === "POINT_10"}>
          <input type="number" inputMode="numeric" min="0" max="10" {...info} {...updateValue} onChange={e => {
            const num = Math.floor(Number(e.target.value) || 0);
            local.onChange(Math.max(0, Math.min(num, 10)));
          }} />
        </Match>
        <Match when={local.format === "POINT_100"}>
          <input type="number" inputMode="numeric" min="0" max="100" {...info} {...updateValue} onChange={e => {
            const num = Math.floor(Number(e.target.value) || 0);
            local.onChange(Math.max(0, Math.min(num, 100)));
          }} />
        </Match>
        <Match when={local.format === "POINT_10_DECIMAL"}>
          <input type="number" inputMode="decimal" min="0" max="10" step=".1" {...info} {...updateValue} onChange={e => {
            const num = Number((Number(e.target.value) || 0).toFixed(1));
            local.onChange(Math.max(0, Math.min(num, 10)));
          }} />
        </Match>
        <Match when={local.format === "POINT_5"}>
          <div {...scoping} class="cp-score-star-input">
            <StarRadioRange {...info} onChange={local.onChange} />
          </div>
        </Match>
        <Match when={local.format === "POINT_3"}>
          <div {...scoping} class="cp-score-emoji-input">
            <EmojiRadioRange {...info} onChange={local.onChange} />
          </div>
        </Match>
      </Switch>
    </>
  );
}

function StarRadioRange(props) {
  return (
    <For each={[1,2,3,4,5]}>{i => (
      <label classList={{"radio-container": true, selected: i <= props.value}}>
        <input 
          type="radio" 
          class="radio"
          onClick={e => {
            if (props.value == e.target.value) {
              e.target.checked = false;
              props.onChange(0);
            } else {
              props.onChange(+e.target.value);
            }
          }}
          name={props.name} id={props.id} value={i} checked={props.value == i}/>
        <Star scoped class="score-star" />
      </label>
    )}</For>
  );
}

function EmojiRadioRange(props) {
  const values = ["", 0, 60, 80];
  return (
    <For each={[1,2,3]}>{i => (
      <label classList={{"radio-container": true, selected: i == props.value}}>
        <input type="radio" class="radio" name={props.name} id={props.id} value={i} checked={props.value == i} onClick={e => {
          if (props.value == e.target.value) {
            e.target.checked = false;
            props.onChange(0);
          } else {
            props.onChange(+e.target.value);
          }
        }} />
        <EmojiByScoreScoped scoped score={values[i]} />
      </label>
    )}</For>
  );
}

export default ScoreInput; 
