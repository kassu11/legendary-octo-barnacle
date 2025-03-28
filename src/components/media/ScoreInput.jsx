import Star from "../../assets/Star";
import { Show, Switch, Match, mergeProps, createSignal } from "solid-js";
import style from "./ScoreInput.module.scss";
import { assert } from "../../utils/assert.js";

function ScoreInput(props) {
  assert(props.format, "Score format is missing");

  const merged = mergeProps({name: "score", id: "score", value: 0}, props);
  return (
    <div class={style.scoreInput}>
      <Switch>
        <Match when={props.format === "POINT_10"}>
          <input type="number" value={merged.value} min="0" max="10" name={merged.name} id={merged.id} />
        </Match>
        <Match when={props.format === "POINT_100"}>
          <input type="number" value={merged.value} min="0" max="100" name={merged.name} id={merged.id} />
        </Match>
        <Match when={props.format === "POINT_10_DECIMAL"}>
          <input type="number" value={merged.value} min="0" max="10" step=".1" name={merged.name} id={merged.id} />
        </Match>
        <Match when={props.format === "POINT_5"}>
          <StarRadioRange name={merged.name} id={merged.id} value={merged.value} />
        </Match>
        <Match when={props.format === "POINT_3"}>
          <EmojiRadioRange name={merged.name} id={merged.id} value={merged.value} />
        </Match>
      </Switch>
    </div>
  );
}

function StarRadioRange(props) {
  const [val, setVal] = createSignal(props.value);
  return (
    <For each={[0,1,2,3,4,5]}>{i => (
      <label classList={{[style.radioContainer]: true, [style.selected]: i <= val()}} hidden={i === 0}>
        <input 
          type="radio" 
          class={style.radio}
          onClick={e => {
            if (val() === e.target.value && i !== 0) {
              e.target.checked = false;
              setVal("0");
            } else {
              setVal(e.target.value);
            }
          }}
          name={props.name} id={props.id} value={i} checked={val() == i}/>
        <Star class={style.scoreStar} />
      </label>
    )}</For>
  );
}

function EmojiRadioRange(props) {
  const [val, setVal] = createSignal(props.value);
  const values = ["", "😟", "😐", "😁"];
  return (
    <For each={[0,1,2,3]}>{i => (
      <label classList={{[style.radioContainer]: true, [style.selected]: i == val()}} hidden={i === 0}>
        <input 
          type="radio" 
          class={style.radio}
          onClick={e => {
            if (val() === e.target.value && i !== 0) {
              e.target.checked = false;
              setVal("0");
            } else {
              setVal(e.target.value);
            }
          }}
          name={props.name} id={props.id} value={i} checked={val() == i}/>
        <span class={style.emoji}>{values[i]}</span>
      </label>
    )}</For>
  );
}

export default ScoreInput; 
