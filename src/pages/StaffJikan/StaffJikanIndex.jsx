import { useParams } from "@solidjs/router";
import { createEffect, createRenderEffect, createSignal, ErrorBoundary, For, Show } from "solid-js";
import { Markdown } from "@/components/Markdown.scoped.jsx";
import { MalStaffMediaCard, MalVoiceRoleCard } from "@/components/Cards/Cards.scoped.jsx";
import { JikanEntityHeader, SummarySection } from "@/components/JikanEntity.scoped.jsx";
import { queries } from "@/api/api.js";
import { createJsonGetFetcher, sendFetcher } from "@/api/fetcherUtils.js";
import { createTimer } from "@/hooks/createTimer.js";
import { formatAnilistDate } from "@/utils/formatUtils.js";
import { formatMSToString } from "@/utils/timeUtils.js";
import { createCleanUpAbortController } from "@/utils/abortUtils.js";

// Birthday is always at UTC midnight, so parsing it to a local Date could show the wrong day
function formatBirthday(birthday) {
  const [year, month, day] = birthday.split("T")[0].split("-").map(Number);
  return formatAnilistDate({ year, month, day });
}

export function StaffJikan() {
  const params = useParams();

  const [staffTime, startStaffTimer, stopStaffTimer] = createTimer();
  const [staffData, setStaffData] = createSignal(undefined, { equals: false });
  const staffController = createCleanUpAbortController();
  let staffFetcher;
  createEffect(() => {
    const signal = staffController.abortAndRenew();

    staffFetcher = createJsonGetFetcher(queries.myAnimeListStaffById, { id: params.id }, signal);

    sendFetcher(staffFetcher, {
      name: "Jikan staff info",
      onFetch: () => staffController.disable(),
      onStart: startStaffTimer,
      onStop: stopStaffTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === staffFetcher.cacheKey) setStaffData(res);
      }
    });
  });

  const staff = () => staffData()?.data.data;

  createRenderEffect(() => {
    const name = staff()?.name;
    if (name) {
      document.title = `Staff - ${name} - LOB`;
    }
  });

  return (
    <ErrorBoundary fallback="Jikan staff error">
      <Show when={staff()}>
        <div class="page-normal">
          <JikanEntityHeader
            image={staff().images.jpg.image_url}
            alt="Staff profile."
            time={formatMSToString(staffTime())}
            name={staff().name}
            alternativeNames={staff().alternate_names}
            favorites={staff().favorites}
          >
            <div>
              <Show when={staff().given_name}>
                <p><strong>Given name:</strong> {staff().given_name}</p>
              </Show>
              <Show when={staff().family_name}>
                <p><strong>Family name:</strong> {staff().family_name}</p>
              </Show>
              <Show when={staff().birthday}>
                <p><strong>Birth:</strong> {formatBirthday(staff().birthday)}</p>
              </Show>
              <Show when={staff().website_url}>
                <p><strong>Website:</strong> <a href={staff().website_url} target="_blank">{staff().website_url}</a></p>
              </Show>
            </div>
            <Markdown text={staff().about} singleLineBreaks={true} />
          </JikanEntityHeader>
          <Show when={staff().voices.length}>
            <SummarySection title="Voice roles">
              <ol class="grid-column-auto-fill">
                <For each={staff().voices}>{entry => (
                  <MalVoiceRoleCard character={entry.character} anime={entry.anime} role={entry.role} />
                )}</For>
              </ol>
            </SummarySection>
          </Show>
          <Show when={staff().anime.length}>
            <SummarySection title="Anime staff roles">
              <ol class="grid-column-auto-fill">
                <For each={staff().anime}>{entry => (
                  <MalStaffMediaCard type="anime" media={entry.anime} position={entry.position} />
                )}</For>
              </ol>
            </SummarySection>
          </Show>
          <Show when={staff().manga.length}>
            <SummarySection title="Manga staff roles">
              <ol class="grid-column-auto-fill">
                <For each={staff().manga}>{entry => (
                  <MalStaffMediaCard type="manga" media={entry.manga} position={entry.position} />
                )}</For>
              </ol>
            </SummarySection>
          </Show>
        </div>
      </Show>
    </ErrorBoundary>
  );
}
