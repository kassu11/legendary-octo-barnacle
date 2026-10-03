import { Show, splitProps } from "solid-js";
import { CheckMarkIcon } from "../../assets/CheckMarkIcon";

export function Checkbox(props) {

  const [local, scoping] = splitProps(props, ["checked", "radio"]);

  return (
    <div {...scoping} classList={{ checked: local.checked, radio: local.radio, [props.class]: !!props.class }}>
      <Show when={props.checked}>
        <CheckMarkIcon scoped {...scoping} />
      </Show>
    </div>
  );

}

