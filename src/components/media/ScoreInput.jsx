import Star from "../../assets/Star";
import { Switch, Match, mergeProps, splitProps } from "solid-js";
import style from "./ScoreInput.module.scss";
import { assert } from "../../utils/assert.js";

function ScoreInput(props) {
  assert(props.format, "Score format is missing");
  assert(props.onChange, "onChange is missing (give signal)");
  const prosDefaults = mergeProps({name: "score", id: "score", value: 0}, props);
  const [info] = splitProps(prosDefaults, ["id", "name", "value"]);

  const updateValue = {
    onBeforeInput: e => {
      if (e.data?.toLowerCase().includes("e")) {
        e.preventDefault();
      }
    },
    onBlur: e => e.target.value = info.value 
  };

  return (
    <div class={style.scoreInput}>
      <Switch>
        <Match when={props.format === "POINT_10"}>
          <input type="number" inputMode="numeric" min="0" max="10" {...info} {...updateValue} onChange={e => {
            const num = Math.floor(Number(e.target.value) || 0);
            props.onChange(Math.max(0, Math.min(num, 10)));
          }} />
        </Match>
        <Match when={props.format === "POINT_100"}>
          <input type="number" inputMode="numeric" min="0" max="100" {...info} {...updateValue} onChange={e => {
            const num = Math.floor(Number(e.target.value) || 0);
            props.onChange(Math.max(0, Math.min(num, 100)));
          }} />
        </Match>
        <Match when={props.format === "POINT_10_DECIMAL"}>
          <input type="number" inputMode="decimal" min="0" max="10" step=".1" {...info} {...updateValue} onChange={e => {
            const num = Number((Number(e.target.value) || 0).toFixed(1));
            props.onChange(Math.max(0, Math.min(num, 10)));
          }} />
        </Match>
        <Match when={props.format === "POINT_5"}>
          <StarRadioRange {...info} onChange={props.onChange} />
        </Match>
        <Match when={props.format === "POINT_3"}>
          <EmojiRadioRange {...info} onChange={props.onChange} />
        </Match>
      </Switch>
    </div>
  );
}

function StarRadioRange(props) {
  return (
    <For each={[0,1,2,3,4,5]}>{i => (
      <label classList={{[style.radioContainer]: true, [style.selected]: i <= props.value}} hidden={i === 0}>
        <input 
          type="radio" 
          class={style.radio}
          onClick={e => {
            if (props.value === e.target.value && i !== 0) {
              e.target.checked = false;
              props.onChange("0");
            } else {
              props.onChange(e.target.value);
            }
          }}
          name={props.name} id={props.id} value={i} checked={props.value == i}/>
        <Star class={style.scoreStar} />
      </label>
    )}</For>
  );
}

function EmojiRadioRange(props) {
  const values = ["", "😟", "😐", "😁"];
  return (
    <For each={[0,1,2,3]}>{i => (
      <label classList={{[style.radioContainer]: true, [style.selected]: i == props.value}} hidden={i === 0}>
        <input 
          type="radio" 
          class={style.radio}
          onClick={e => {
            if (props.value === e.target.value && i !== 0) {
              e.target.checked = false;
              props.onChange("0");
            } else {
              props.onChange(e.target.value);
            }
          }}
          name={props.name} id={props.id} value={i} checked={props.value == i}/>
        <span class={style.emoji}>{values[i]}</span>
      </label>
    )}</For>
  );
}

export default ScoreInput; 
