import { useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../context/providers";
import { Checkbox } from "./Checkbox.scoped";
import "./TwoStateToggle.scoped.css";

export function TwoStateToggle(props) {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const value = createMemo(() => parsedSearchParams()[props.name]);

  const handleClick = e => {
    e.preventDefault();
    const v = value();
    if (v === "true") setSearchParams({ [props.name]: "false" });
    else if (v === "false") setSearchParams({ [props.name]: undefined });
    else setSearchParams({ [props.name]: "true" });
  };

  return (
    <button onClick={handleClick}>
      <Checkbox include={value() === "true"} exclude={value() === "false"} />
      <p>{props.label}</p>
    </button>
  );
}
