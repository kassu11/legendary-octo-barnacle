import { createEffect, createSignal, ErrorBoundary, For, mergeProps, Show } from "solid-js";
import "./Characters.scoped.css";
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
  const merged = mergeProps({characters: [], countryOfOrigin: "JP"}, props);
  const [language, setLanguage] = createSignal(countryOfOriginToLanguage(merged.characters, merged.countryOfOrigin));

  createEffect(() => {
    setLanguage(countryOfOriginToLanguage(merged.characters, merged.countryOfOrigin));
  });

  return (
    <ErrorBoundary fallback="Characters error">
      <Show when={merged.characters.length}>
        <div class="character-container">
          <A href="characters">
            <h2>Characters</h2>
          </A>
          <ol class="grid-column-auto-fill">
            <For each={merged.characters}>{char => (
              <li class="character">
                <A scoped href={"/ani/character/" + char.node.id + "/" + formatTitleToUrl(char.node.name.userPreferred)} class="character-left">
                  <img src={char.node.image.large} alt="Character" />
                  <div class="content">
                    <p class="line-clamp">{char.node.name.userPreferred}</p>
                    <p>{char.role}</p>
                  </div>
                </A>
                <Show when={char.voiceActors.find(actor => actor.language === language())}>{actor => (
                  <A scoped href={"/ani/staff/" + actor().id + "/" + formatTitleToUrl(actor().name.userPreferred)} class="character-right">
                    <div class="content">
                      <p class="line-clamp">{actor().name.userPreferred}</p>
                      <p>{actor().language}</p>
                    </div>
                    <img src={actor().image.large} alt="Voice actor" />
                  </A>
                )}</Show>
              </li>
            )}</For>
          </ol>
        </div>
      </Show>
    </ErrorBoundary>
  );
}

export default Characters; 
