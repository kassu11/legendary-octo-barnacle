import { Match, splitProps, Switch } from "solid-js";
import { CheckMarkIcon, MinusIcon, PlusIcon } from "@/assets/icons.jsx";
import "./Checkbox.scoped.css";

export function Checkbox(props) {

  const [local, scoping] = splitProps(props, ["checked", "radio", "exclude", "include"]);

  return (
    <div {...scoping} classList={{ ...local, [props.class]: !!props.class }}>
      <Switch>
        <Match when={local.exclude}>
          <MinusIcon scoped {...scoping} />
        </Match>
        <Match when={local.include}>
          <PlusIcon scoped {...scoping} />
        </Match>
        <Match when={local.checked}>
          <CheckMarkIcon scoped {...scoping} />
        </Match>
      </Switch>
    </div>
  );

}

