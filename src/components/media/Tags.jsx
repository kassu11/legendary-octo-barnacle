import { For } from "solid-js";
import style from "./Tags.module.scss";

const Tags = (props) => {
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
};

export default Tags; 
