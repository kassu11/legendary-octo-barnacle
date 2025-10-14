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
import { fetcherSenderUtils } from "../utils/utils.js";
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
        <div>
          <h1>{characterData().data.name} {characterData().data.name_kanji}</h1>
          <Markdown text={characterData().data.about} />
          <img src={characterData().data.images.webp.image_url} alt="Character profile." />
          <FavouriteToggle 
            jikanValue={characterData().data.favorites}
          />
          <h2>Anime</h2>
          <ol class="grid-column-auto-fill">
            <For each={characterData().data.anime}>{entry => (
              <JikanMediaCard type="anime" media={entry.anime}></JikanMediaCard>
            )}</For>
          </ol>
          <h2>Manga</h2>
          <ol class="grid-column-auto-fill">
            <For each={characterData().data.manga}>{entry => (
              <JikanMediaCard type="manga" media={entry.manga}></JikanMediaCard>
            )}</For>
          </ol>
          <h2>Voice actors</h2>
          <ol class="grid-column-auto-fill">
            <For each={characterData().data.voices}>{entry => (
              <MalStaffCard staff={entry.person} positions={[entry.language]} />
            )}</For>
          </ol>
        </div>
      </Show>
    </ErrorBoundary>
  );
}
