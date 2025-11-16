import {useParams} from "@solidjs/router";
import {For, Show} from "solid-js";
import {useListNavigation} from "./index(user-media-list).scoped.jsx";

export function MediaListNames(props) {
  const navigate = useListNavigation();
  const params = useParams();

  return (
    <Show when={props.listData()?.data}>
      <ol>
        <li>
          <button onClick={() => navigate("")}>
            <Show when={params.list === undefined}>{"> "}</Show>
            All {props.listData().data.total}
          </button>
        </li>
        <For each={props.listData().data.lists}>{list => (
          <li>
            <button onClick={() => navigate(list.name)}>
              <Show when={decodeURI(params.list) === list.name}>{"> "}</Show>
              {list.name} {list.entries.length}
            </button>
          </li>
        )}
        </For>
      </ol>
    </Show>
  )
}