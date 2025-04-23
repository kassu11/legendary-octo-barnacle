import { createEffect, createSignal, For, Show } from "solid-js";
import style from "./Characters.module.scss";
import { A } from "@solidjs/router";
import { formatTitleToUrl, languageFromCountry } from "../../utils/formating";

const countryOfOriginToLanguage = (characters, country) => {
  const language = languageFromCountry(country);

  if (language !== "Japanese" && characters.some(char => char.voiceActors.some(actor => actor.language === language))) {
    return language;
  }

  return "Japanese";
}

function Characters(props) {
  const [language, setLanguage] = createSignal(countryOfOriginToLanguage(props.characters, props.countryOfOrigin));

  createEffect(() => {
    setLanguage(countryOfOriginToLanguage(props.characters, props.countryOfOrigin));
  });

  return (
    <div class={style.characterContainer}>
      <A href="characters">
        <h2>Characters</h2>
      </A>
      <ol>
        <For each={props.characters}>{char => (
          <li class={style.character}>
            <A href={"/ani/character/" + char.node.id + "/" + formatTitleToUrl(char.node.name.userPreferred)} class={style.characterLeft}>
              <img src={char.node.image.large} alt="Character" />
              <div class={style.content}>
                <p class={style.lineClamp}>{char.node.name.userPreferred}</p>
                <p>{char.role}</p>
              </div>
            </A>
            <Show when={char.voiceActors.find(actor => actor.language === language())}>{actor => (
              <A href={"/ani/staff/" + actor().id + "/" + formatTitleToUrl(actor().name.userPreferred)} class={style.characterRight}>
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
