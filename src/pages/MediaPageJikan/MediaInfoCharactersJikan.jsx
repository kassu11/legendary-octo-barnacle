import { useParams } from "@solidjs/router";
import { useMediaInfo } from "../../context/providers.js";
import { fetchers, fetcherSenders, localizations, requests, signals } from "../../collections/collections.js";
import { fetcherSenderUtils } from "../../utils/utils.js";
import { createMemo, ErrorBoundary } from "solid-js";
import { MalCharacterCard } from "../../components/Cards/Cards.scoped.jsx";

export function MediaInfoCharactersJikan() {
  const params = useParams();
  const { jikanData } = useMediaInfo();

  const jikanFetcher = fetcherSenderUtils.createFetcher(fetchers.jikan.getCharactersByMediaId, () => params.type, () => params.id);
  const cacheType = fetcherSenderUtils.createDynamicCacheType({ "only-if-cached": () => requests.jikan.inOneSeconds() || jikanData.loading })
  const [jikanCharactersData] = fetcherSenders.sendWithCacheTypeWithoutNullUpdates(cacheType, jikanFetcher);

  const [language, setLanguage] = signals.localStorageString(localizations.Japanese);
  const languages = createMemo(() => {
    const uniqueLanguages = new Set();
    const characters = jikanCharactersData()?.data;
    if (!characters?.length) {
      return [];
    }

    characters.forEach(char => {
      char.voice_actors?.forEach(actor => uniqueLanguages.add(actor.language));
    });

    const returnValues = [...uniqueLanguages].sort();

    setLanguage(lang => uniqueLanguages.has(lang) ? lang : returnValues[0]);

    return returnValues;
  });

  return (
    <ErrorBoundary fallback="MAL characters error">
      <Show when={jikanData()}>
        <Show when={jikanCharactersData()}>
          <div>
            <Show when={languages().length}>
              <select onChange={e => setLanguage(e.target.value)} value={language()}>
                <For each={languages()}>{lang => (
                  <option value={lang}>{lang}</option>
                )}</For>
              </select>
            </Show>
            <ol className="grid-column-auto-fill" class={params.type}>
              <For each={jikanCharactersData().data}>{({voice_actors, ...rest}) => (
                <MalCharacterCard
                  voiceActor={voice_actors?.find(actor => (actor.language === language()))}
                  language={language()}
                  {...rest}
                />
              )}</For>
            </ol>
          </div>
        </Show>
      </Show>
    </ErrorBoundary>
  );
}
