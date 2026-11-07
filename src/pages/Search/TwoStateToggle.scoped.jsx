import { useSearchParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { useParsedSearchParams, useResponsive } from "../../context/providers";
import { Tooltip } from "../../components/Tooltip.scoped.jsx";
import { Checkbox } from "./Checkbox.scoped";
import "./TwoStateToggle.scoped.css";

/**
 * @param {Object} props
 * @param {string} [props.value] "true" is included, "false" is excluded and everything else is unchecked
 * @param {(value: "true" | "false" | undefined) => void} props.onChange
 * @param {string} props.label
 */
export function TwoStateToggleButton(props) {
  const { isTouch } = useResponsive();

  const handleClick = e => {
    e.preventDefault();
    if (props.value === "true") props.onChange("false");
    else if (props.value === "false") props.onChange(undefined);
    else props.onChange("true");
  };

  return (
    <button onClick={handleClick} classList={{ active: props.value === "true" || props.value === "false" }}>
      <Show when={props.icon}>
        <span class="icon">{props.icon}</span>
      </Show>
      <p>{props.label}</p>
      <Checkbox scoped class="checkbox" include={props.value === "true"} exclude={props.value === "false"} />
      <Show when={props.tooltip && !isTouch()}>
        <Tooltip placements={["bottom", "top"]} delay={600}>{props.tooltip}</Tooltip>
      </Show>
    </button>
  );
}

export function TwoStateToggle(props) {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const value = createMemo(() => parsedSearchParams()[props.name]);

  return (
    <TwoStateToggleButton value={value()} label={props.label} icon={props.icon} tooltip={props.tooltip} onChange={newValue => setSearchParams({ [props.name]: newValue })} />
  );
}
