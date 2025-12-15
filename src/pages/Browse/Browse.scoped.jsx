import {Navigate, useLocation, useParams} from "@solidjs/router";
import {Show} from "solid-js";

export function BrowseRedirect(props) {
  const params = useParams();
  const location = useLocation();

  return (
    <Show when={!location.search} fallback={<Navigate href={"/search/" + params.type + location.search} />}>
      {props.children}
    </Show>
  );
}