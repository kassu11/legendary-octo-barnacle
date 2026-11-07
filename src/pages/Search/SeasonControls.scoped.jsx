import { useParams, useLocation, A } from "@solidjs/router";
import { createMemo, For, Show } from "solid-js";
import { useParsedSearchParams } from "@/state/providers";
import { capitalize } from "@/utils/formatUtils";
import { arrayUtils } from "@/utils/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/SearchFilterIcons.jsx";
import { Checkbox } from "@/components/ui/Checkbox.scoped";
import "./SeasonControls.scoped.css";

export function SeasonControls(props) {
  const params = useParams();
  const location = useLocation();
  const parsedSearchParams = useParsedSearchParams();

  const seasons = ["winter", "spring", "summer", "fall"];
  const index = createMemo(() => seasons.indexOf(parsedSearchParams().season));
  const yearOrCurrentYear = createMemo(() => parsedSearchParams().year || new Date().getFullYear());

  const searchWithoutSeasonsOrYear = createMemo(() => {
    let search = location.search || "";
    if (search.length < 2) return "";

    search = search.replace(/[?&]((season=winter|spring|summer|fall)|(year=\d+))/gi, "");

    return search.length < 2 ? "" : "?" + search.substring(1);
  });

  const seasonHeader = (delta) => {
    const i = index();
    const y = yearOrCurrentYear();

    const yearDelta = Math.floor((i + delta) / seasons.length);
    const year = y + yearDelta;
    const season = arrayUtils.at(seasons, i + delta);

    return `${season.toLowerCase()}-${year}`;
  };

  const headerUrl = header => `/${params.api}/${params.mode}/${params.type}/${header}${searchWithoutSeasonsOrYear()}`;

  return (
    <div class="season-controls">
      <Show when={params.type === "anime"}>
        <nav class="season-nav" aria-label="Seasons">
          <A scoped class="arrow" href={headerUrl(seasonHeader(-1))} aria-label="Previous season">
            <ChevronLeftIcon scoped />
          </A>
          <For each={seasons}>{season => (
            <A scoped class="season" href={headerUrl(`${season}-${yearOrCurrentYear()}`)} classList={{ selected: season === parsedSearchParams().season }}>
              <span class="name">{capitalize(season)}</span>
              <span class="year">{yearOrCurrentYear()}</span>
            </A>
          )}</For>
          <A scoped class="arrow" href={headerUrl(seasonHeader(1))} aria-label="Next season">
            <ChevronRightIcon scoped />
          </A>
        </nav>
      </Show>
      <Show when={params.type === "anime" || props.groupByFormat !== undefined}>
        <div class="right-side">
          <Show when={params.type === "anime"}>
            <nav class="quick-links" aria-label="Season shortcuts">
              <A scoped href="/ani/search/anime/this-season" end>This Season</A>
              <A scoped href="/ani/search/anime/next-season" end>Next Season</A>
              <A scoped href="/ani/search/anime/tba" end>TBA</A>
            </nav>
          </Show>
          <Show when={props.groupByFormat !== undefined}>
            <button class="group-toggle" classList={{ active: props.groupByFormat }} aria-pressed={props.groupByFormat} onClick={() => props.onGroupByFormatChange()}>
              <p>Group by Format</p>
              <Checkbox scoped class="checkbox" checked={props.groupByFormat} />
            </button>
          </Show>
        </div>
      </Show>
    </div>
  );
}
