import { useSearchParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { useParsedSearchParams, useResponsive } from "../../context/providers";
import { Tooltip } from "../../components/Tooltip.scoped.jsx";
import { Checkbox } from "./Checkbox.scoped";
import "./TwoStateToggle.scoped.css";

export function TwoStateToggle(props) {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const { isTouch } = useResponsive();
  const value = createMemo(() => parsedSearchParams()[props.name]);

  const handleClick = e => {
    e.preventDefault();
    const v = value();
    if (v === "true") setSearchParams({ [props.name]: "false" });
    else if (v === "false") setSearchParams({ [props.name]: undefined });
    else setSearchParams({ [props.name]: "true" });
  };

  return (
    <button onClick={handleClick} classList={{ active: value() === "true" || value() === "false" }}>
      <Show when={props.icon}>
        <span class="icon">{props.icon}</span>
      </Show>
      <p>{props.label}</p>
      <Checkbox scoped class="checkbox" include={value() === "true"} exclude={value() === "false"} />
      <Show when={props.tooltip && !isTouch()}>
        <Tooltip placements={["bottom", "top"]} delay={600}>{props.tooltip}</Tooltip>
      </Show>
    </button>
  );
}
