import { createEffect, createSignal, For, on, Show } from "solid-js";
import style from "./Tags.module.scss";

const Tags = (props) => {
  const [showSpoilers, setShowSpoilers] = createSignal(false);

  createEffect(on(() => props.tags, () => {
    setShowSpoilers(false);
  }));

  return (
    <Show when={props.tags.length}>
      <div class={style.tagContainer}>
        <h2>Tags</h2>
        <ol>
          <For each={props.tags}>{tag => (
            <li 
              classList={{
                [style.tag]: true, 
                [style.spoiler]: tag.isMediaSpoiler || tag.isGeneralSpoiler,
                hidden: (tag.isMediaSpoiler || tag.isGeneralSpoiler) && !showSpoilers()
              }} 
              title={tag.description}
            >
              {tag.name} <span>{tag.rank}%</span>
            </li>
          )}</For>
          <Show when={props.tags.some(tag => tag.isMediaSpoiler || tag.isGeneralSpoiler)}>
            <button onClick={() => setShowSpoilers(state => !state)}>
              <Show when={!showSpoilers()} fallback="Hide spoilers">Show spoilers</Show>
            </button>
          </Show>
        </ol>
      </div>
    </Show>
  );
};

export default Tags; 
