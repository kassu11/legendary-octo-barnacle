import { splitProps } from "solid-js";
import "./LoaderCircle.scoped.css";

export function LoaderCircle(props) {
  const [local, scoping] = splitProps(props, ["class"]);

  return (
    <span {...scoping} classList={{ "loader-circle": true, [local.class]: !!local.class }} />
  );
}
