import { useParams } from "@solidjs/router";
import { Show, For, createRenderEffect } from "solid-js";
import { Markdown } from "../components/Markdown";
import "./Entity.scss";
import { FavouriteToggle } from "../components/FavouriteToggle";
import { fetchers, fetcherSenders } from "../collections/collections.js";
import { arrayUtils, fetcherSenderUtils } from "../utils/utils.js";
import { JikanMediaCard, MalStaffCard } from "../components/Cards.jsx";

export function Character() {
  const params = useParams();
  const fetcher = fetcherSenderUtils.createFetcher(fetchers.jikan.getCharacterById, () => params.id);
  const [characterData] = fetcherSenders.sendWithNullUpdates(fetcher);

  createRenderEffect(() => {
    const name = characterData().data.name;
    if (name) {
      document.title = name;
    }
  });

  return (
    <ErrorBoundary fallback="Jikan character error">
      <Show when={characterData()}>
        <div class="page-normal pg-jikan-character">
          <div class="pg-jikan-character-header">
            <img src={characterData().data.images.webp.image_url} alt="Character profile." />
            <div class="grid">
              <div>
                <h1>{characterData().data.name}</h1>
                <p>{arrayUtils.from(characterData().data.name_kanji, characterData().data.nicknames).join(", ")}</p>
              </div>
              <FavouriteToggle jikanValue={characterData().data.favorites} />
            </div>
            <div>
              <Markdown text={characterData().data.about} />
            </div>
          </div>
          <SummarySection title="Anime">
            <ol class="grid-column-auto-fill card">
              <For each={characterData().data.anime}>{entry => (
                <JikanMediaCard type="anime" media={entry.anime}></JikanMediaCard>
              )}</For>
            </ol>
          </SummarySection>
          <SummarySection title="Manga">
            <ol class="grid-column-auto-fill card">
              <For each={characterData().data.manga}>{entry => (
                <JikanMediaCard type="manga" media={entry.manga}></JikanMediaCard>
              )}</For>
            </ol>
          </SummarySection>
          <SummarySection title="Voice actors">
            <ol class="grid-column-auto-fill">
              <For each={characterData().data.voices}>{entry => (
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
    <details open class="pg-jikan-details-header">
      <summary>
        <h2>{props.title}</h2>
      </summary>
      {props.children}
    </details>
  );
}
