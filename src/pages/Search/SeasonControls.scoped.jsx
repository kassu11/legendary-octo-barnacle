import { useParams, useLocation, A } from "@solidjs/router";
import { createMemo, For } from "solid-js";
import { useParsedSearchParams } from "../../context/providers";
import { capitalize } from "../../utils/formating";
import { arrayUtils } from "../../utils/utils";
import "./SeasonControls.scoped.css";

export function SeasonControls() {
  const params = useParams();
  const location = useLocation();
  const parsedSearchParams = useParsedSearchParams();

  const seasons = ["WINTER", "SPRING", "SUMMER", "FALL"];
  const index = createMemo(() => seasons.indexOf(parsedSearchParams().season));
  const yearOrCurrentYear = createMemo(() => +parsedSearchParams().year || new Date().getFullYear());

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

  return (
    <div>
      <A href={`/${params.api}/${params.mode}/${params.type}/${seasonHeader(-1)}${searchWithoutSeasonsOrYear()}`}>{"<"}</A>
      <For each={seasons}>{season => (
        <A href={`/${params.api}/${params.mode}/${params.type}/${season.toLowerCase()}-${yearOrCurrentYear()}${searchWithoutSeasonsOrYear()}`} classList={{ selected: season === parsedSearchParams().season }}>
          <p>{capitalize(season)}</p>
          <p>{yearOrCurrentYear()}</p>
        </A>
      )}</For>
      <A href={`/${params.api}/${params.mode}/${params.type}/${seasonHeader(1)}${searchWithoutSeasonsOrYear()}`}>{">"}</A>
    </div>
  );
}

