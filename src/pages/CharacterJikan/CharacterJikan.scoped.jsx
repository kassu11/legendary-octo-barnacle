import { useParams } from "@solidjs/router";
import { Show, For, createRenderEffect, ErrorBoundary, createEffect, createSignal } from "solid-js";
import { Markdown } from "../../components/Markdown.jsx";
import "../Entity/Entity.scss";
import { FavouriteToggle } from "../../components/FavouriteToggle.jsx";
import { queries } from "../../collections/collections.js";
import { arrayUtils } from "../../utils/utils.js";
import { JikanMediaCard, MalStaffCard } from "../../components/Cards/Cards.scoped.jsx";
import "./CharacterJikan.scoped.css";
import { createJsonGetFetcher, sendFetcher } from "../../utils/fetcherUtils.js";
import { createTimer, formatMSToString } from "../../utils/timeUtils.js";

export function CharacterJikanScoped() {
  const params = useParams();

  const [charTime, startCharTimer, stopCharTimer] = createTimer();
  const [characterData, setCharData] = createSignal(undefined, { equals: false });
  let charFetcher, charController;
  createEffect(() => {
    charController?.abort();
    charController = new AbortController();

    charFetcher = createJsonGetFetcher(queries.myAnimeListCharacterById, { id: params.id }, charController.signal);

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

  createRenderEffect(() => {
    const name = characterData()?.data.data?.name;
    if (name) {
      document.title = name;
    }
  });

  return (
    <ErrorBoundary fallback="Jikan character error">
      <Show when={characterData()}>
        <div class="page-normal pg-jikan-character">
          <div class="header">
            <img src={characterData().data.data.images.webp.image_url} alt="Character profile." />
            <div class="grid">
              <div>
                <p>{formatMSToString(charTime())}</p>
                <h1>{characterData().data.data.name}</h1>
                <p>{arrayUtils.from(characterData().data.data.name_kanji, characterData().data.data.nicknames).join(", ")}</p>
              </div>
              <FavouriteToggle jikanValue={characterData().data.data.favorites} />
            </div>
            <div>
              <Markdown text={characterData().data.data.about} singleLineBreaks={true} />
            </div>
          </div>
          <SummarySection title="Anime">
            <ol class="grid-column-auto-fill card">
              <For each={characterData().data.data.anime}>{entry => (
                <JikanMediaCard type="anime" media={entry.anime}></JikanMediaCard>
              )}</For>
            </ol>
          </SummarySection>
          <SummarySection title="Manga">
            <ol class="grid-column-auto-fill card">
              <For each={characterData().data.data.manga}>{entry => (
                <JikanMediaCard type="manga" media={entry.manga}></JikanMediaCard>
              )}</For>
            </ol>
          </SummarySection>
          <SummarySection title="Voice actors">
            <ol class="grid-column-auto-fill">
              <For each={characterData().data.data.voices}>{entry => (
                <MalStaffCard staff={entry.person} positions={[entry.language]} />
              )}</For>
            </ol>
          </SummarySection>
        </div>
      </Show>
    </ErrorBoundary>
  );
}

function SummarySection(props) {
  return (
    <details open>
      <summary>
        <h2>{props.title}</h2>
      </summary>
      {props.children}
    </details>
  );
}
