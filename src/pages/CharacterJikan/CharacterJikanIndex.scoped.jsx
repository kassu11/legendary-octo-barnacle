import { useParams } from "@solidjs/router";
import { Show, For, createRenderEffect, ErrorBoundary, createEffect, createSignal } from "solid-js";
import { Markdown } from "@/components/Markdown.scoped.jsx";
import { JikanEntityHeader, SummarySection } from "@/components/JikanEntity.scoped.jsx";
import { queries } from "@/api/api.js";
import { arrayUtils } from "@/utils/utils.js";
import { JikanMediaCard, MalStaffCard } from "@/components/Cards/Cards.scoped.jsx";
import { createJsonGetFetcher, sendFetcher } from "@/api/fetcherUtils.js";
import { createTimer } from "@/hooks/createTimer.js";
import { formatMSToString } from "@/utils/timeUtils.js";
import { createCleanUpAbortController } from "@/utils/abortUtils.js";

export function CharacterJikanScoped() {
  const params = useParams();

  const [charTime, startCharTimer, stopCharTimer] = createTimer();
  const [characterData, setCharData] = createSignal(undefined, { equals: false });
  const charController = createCleanUpAbortController();
  let charFetcher;
  createEffect(() => {
    const signal = charController.abortAndRenew();

    charFetcher = createJsonGetFetcher(queries.myAnimeListCharacterById, { id: params.id }, signal);

    sendFetcher(charFetcher, {
      name: "Jikan characters",
      onFetch: () => charController.disable(),
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
          <JikanEntityHeader
            image={characterData().data.data.images.webp.image_url}
            alt="Character profile."
            time={formatMSToString(charTime())}
            name={characterData().data.data.name}
            alternativeNames={arrayUtils.from(characterData().data.data.name_kanji, characterData().data.data.nicknames)}
            favorites={characterData().data.data.favorites}
          >
            <Markdown text={characterData().data.data.about} singleLineBreaks={true} />
          </JikanEntityHeader>
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
