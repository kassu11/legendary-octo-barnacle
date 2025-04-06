import Star from "../../assets/Star";
import { Switch, Match, mergeProps, splitProps } from "solid-js";
import "./ScoreInput.scss";
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
    <>
      <Show when={props.label}>
        <Switch>
          <Match when={props.format === "POINT_10" || props.format === "POINT_100" || props.format === "POINT_10_DECIMAL"}>
            <label htmlFor={info.id}>{props.label}</label>
          </Match>
          <Match when={props.format === "POINT_5" || props.format === "POINT_3"}>
            <p>{props.label}</p>
          </Match>
        </Switch>
      </Show>
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
          <div class="score-input">
            <StarRadioRange {...info} onChange={props.onChange} />
          </div>
        </Match>
        <Match when={props.format === "POINT_3"}>
          <div class="score-input">
            <EmojiRadioRange {...info} onChange={props.onChange} />
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
        <Star class="score-star" />
      </label>
    )}</For>
  );
}

function EmojiRadioRange(props) {
  const values = ["", "😟", "😐", "😁"];
  return (
    <For each={[1,2,3]}>{i => (
      <label classList={{"radio-container": true, selected: i == props.value}}>
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
        <span class="score-emoji">{values[i]}</span>
      </label>
    )}</For>
  );
}

export default ScoreInput; 
