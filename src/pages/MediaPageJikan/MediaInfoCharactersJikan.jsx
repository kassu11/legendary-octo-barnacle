import { useParams } from "@solidjs/router";
import { useMediaInfo } from "../../context/providers.js";
import { localizations, signals, queries } from "../../collections/collections.js";
import { createEffect, createMemo, createSignal, ErrorBoundary, For, Show } from "solid-js";
import { MalCharacterCard } from "../../components/Cards/Cards.scoped.jsx";
import { createTimer, formatMSToString } from "../../utils/timeUtils.js";
import { createJsonGetFetcher, sendFetcher } from "../../utils/fetcherUtils.js";

export function MediaInfoCharactersJikan() {
  const params = useParams();
  const { jikanData } = useMediaInfo();

  const [charTime, startCharTimer, stopCharTimer] = createTimer();
  const [jikanCharactersData, setCharData] = createSignal(undefined, { equals: false });
  let charFetcher, charController;
  createEffect(() => {
    charController?.abort();
    charController = new AbortController();

    charFetcher = createJsonGetFetcher(queries.myAnimeListMediaCharactersById, { id: params.id, type: params.type }, charController.signal);

    sendFetcher(charFetcher, {
      name: "Jikan characters",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === charFetcher.cacheKey) charController = null;
      },
      onStart: startCharTimer,
      onStop: stopCharTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === charFetcher.cacheKey) setCharData(res);
      }
    });
  });

  const [language, setLanguage] = signals.localStorageString(localizations.Japanese);
  const languages = createMemo(() => {
    const uniqueLanguages = new Set();
    const characters = jikanCharactersData()?.data.data;
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
            <p>{formatMSToString(charTime())}</p>
            <Show when={languages().length}>
              <select onChange={e => setLanguage(e.target.value)} value={language()}>
                <For each={languages()}>{lang => (
                  <option value={lang}>{lang}</option>
                )}</For>
              </select>
            </Show>
            <ol className="grid-column-auto-fill" class={params.type}>
              <For each={jikanCharactersData().data.data}>{({voice_actors, ...rest}) => (
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
