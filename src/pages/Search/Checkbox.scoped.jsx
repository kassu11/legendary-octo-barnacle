import { Show, splitProps } from "solid-js";
import { CheckMarkIcon } from "../../assets/CheckMarkIcon";

export function Checkbox(props) {

  const [local, scoping] = splitProps(props, ["checked"]);

  return (
    <div {...scoping} classList={{ checked: local.checked }} class={props.class}>
      <Show when={props.checked}>
        <CheckMarkIcon scoped {...scoping} />
      </Show>
    </div>
  );

}

