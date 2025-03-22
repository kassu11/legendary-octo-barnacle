import { For } from "solid-js";
import style from "../../pages/AnimeInfo.module.scss";

export function Tags(props) {
  return (
    <div class={style.tagContainer}>
      <h2>Tags</h2>
      <ol>
        <For each={props.tags}>{tag => (
          <li 
            classList={{[style.tag]: true, [style.spoiler]: tag.isMediaSpoiler || tag.isGeneralSpoiler}} 
            title={tag.description}>{tag.name} <span>{tag.rank}%</span></li>
        )}</For>
      </ol>
    </div>
  );
} 