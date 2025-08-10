import { splitProps } from "solid-js";
import "./LoaderCircle.scss";

export function LoaderCircle(props) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <span class={"cp-loader-circle " + local.class || ""} {...others}></span>
  );
}
