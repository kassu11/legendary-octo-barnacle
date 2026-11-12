import { Match, splitProps, Switch } from "solid-js";
import { CheckIcon, MinusIcon, PlusIcon } from "@/assets/icons.jsx";
import "./Checkbox.scoped.css";

export function Checkbox(props) {

  const [local, scoping] = splitProps(props, ["checked", "radio", "exclude", "include"]);

  return (
    <div {...scoping} classList={{ checkbox: true, ...local, [props.class]: !!props.class }}>
      <Switch>
        <Match when={local.exclude}>
          <MinusIcon scoped />
        </Match>
        <Match when={local.include}>
          <PlusIcon scoped />
        </Match>
        <Match when={local.checked}>
          <CheckIcon scoped />
        </Match>
      </Switch>
    </div>
  );

}

