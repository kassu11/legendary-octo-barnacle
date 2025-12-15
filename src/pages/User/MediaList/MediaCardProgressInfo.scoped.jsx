import { createSignal, createEffect, on, Show } from "solid-js";
import { useUserMediaList } from "../../../context/providers";
import "./MediaCardProgressInfo.scoped.css";

export function MediaCardProgressInfo(props) {
  const [count, setCount] = createSignal(props.entry[props.progressKey]);
  const { triggerProgressIncrease, isOwnProfile } = useUserMediaList();

  createEffect(on(() => props.entry, entry => setCount(entry[props.progressKey]), { defer: true }));

  return (
    <>
      {props.label} {count()}
      <Show when={count() < props.entry.media[props.maxProgressKey]}>
        /{props.entry.media[props.maxProgressKey]}
      </Show>
      <Show when={isOwnProfile()}>
        <Show when={props.entry.media[props.maxProgressKey] === null || count() < props.entry.media[props.maxProgressKey]}>
          <button onClick={(e) => {
            e.preventDefault();
            setCount(c => {
              const count = Math.min(props.entry.media[props.maxProgressKey] || c + 1, c + 1);
              triggerProgressIncrease(props.entry.media.id, count, props.progressKey);
              return count;
            });
          }}>+</button>
        </Show>
      </Show>
    </>
  );
}

