import { A, useParams, useSearchParams } from "@solidjs/router";
import api from "../utils/api";
import { Switch, Match, Show, createSignal, createEffect, on, For, createRenderEffect } from "solid-js";
import { Markdown, OldMarkdownComponent } from "../components/Markdown";
import "./Entity.scss";
import { capitalize, formatAnilistDate, formatTitleToUrl, mediaUrl } from "../utils/formating";
import { FavouriteToggle } from "../components/FavouriteToggle";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { DoomScroll } from "../components/utils/DoomScroll";
import { useAuthentication } from "../context/providers";
import { wrapToArray } from "../utils/arrays.js";
import { asserts, fetchers, fetcherSenders } from "../collections/collections.js";
import { arrayUtils, fetcherSenderUtils } from "../utils/utils.js";
import { JikanMediaCard, MalStaffCard } from "../components/Cards.jsx";

export function Character() {
  const params = useParams();
  const fetcher = fetcherSenderUtils.createFetcher(fetchers.jikan.getCharacterById, () => params.id);
  const [characterData] = fetcherSenders.sendWithNullUpdates(fetcher);
  document.title = "Character";

  createRenderEffect(() => {
    console.log(characterData());
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
