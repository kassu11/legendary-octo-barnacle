import { For, Show } from "solid-js";
import { A } from "../CustomA";
import style from "./Characters.module.scss";

function Characters(props) {
  return (
    <div class={style.characterContainer}>
      <h2>Characters</h2>
      <ol>
        <For each={props.characters}>{char => (
          <li class={style.character}>
            <A href={"/ani/character/" + char.node.id} class={style.characterLeft}>
              <img src={char.node.image.large} alt="Character" />
              <div class={style.content}>
                <p class={style.lineClamp}>{char.node.name.userPreferred}</p>
                <p>{char.role}</p>
              </div>
            </A>
            <Show when={char.voiceActors[0]}>{actor => (
              <A href={"/ani/staff/" + actor().id} class={style.characterRight}>
                <div class={style.content}>
                  <p class={style.lineClamp}>{actor().name.userPreferred}</p>
                  <p>{actor().language}</p>
                </div>
                <img src={actor().image.large} alt="Voice actor" />
              </A>
            )}</Show>
          </li>
        )}</For>
      </ol>
    </div>
  );
}

export default Characters; 
