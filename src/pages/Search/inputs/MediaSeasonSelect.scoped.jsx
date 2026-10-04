import { useSearchParams, useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import "./MediaSeasonSelect.scoped.css"
import { Checkbox } from "../Checkbox.scoped.jsx";
import { useNavigateAndSearch } from "../../../utils/urlUtils.js";

export function MediaSeasonSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigateAndSearch();

  const seasonOptions = [
    { description: "Winter", id: "winter" },
    { description: "Spring", id: "spring" },
    { description: "Summer", id: "summer" },
    { description: "Fall",   id: "fall"   },
    { description: "TBA",    id: "tba"    },
  ];

  const seasonValues = createMemo(() => {
    const season = parsedSearchParams().season;
    if (season) {
      return [{ id: season, value: true }];
    }

    return [];
  });

  const handleChange = e => {
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
      return;
    }

    const [season] = seasonValues();
    const header = params.header;
    const hasSpecialSeasonControlsOpen = parsedSearchParams().seasonPage;
    const year = parsedSearchParams().year;

    // 1. Selected already active season, remove all seasons
    if (e.target === season?.id) {
      return navigate(path => path.replace(/\/this-season|next-season|winter-\d+|spring-\d+|summer-\d+|fall-\d+|tba/, ""), { season: undefined }, { replace: true });
    }
    // 2. Already in seasons header, update header
    else if (hasSpecialSeasonControlsOpen) {

      if (e.target === "tba") return navigate(path => path.replace(header, "tba"), { season: undefined }, { replace: true });
      if (!year) return navigate(path => path.replace(header, "this-season"), { season: e.target }, { replace: true });
      return navigate(path => path.replace(header, `${e.target}-${year}`), { year: undefined, season: undefined }, { replace: true });

    }

    // 3. User has no special headers. Lets open TBA header
    if (!header && e.target === "tba") {
      return navigate(path => path + "/tba", { year, season: undefined }, { replace: true });
    }

    // 4. User has no special headers, has not filtered season before, and has not selected year. Lets open current years season
    if (!header && !season && !year) {
      return navigate(path => path + "/this-season", { season: e.target }, { replace: true });
    }

    // 5. Standard change the season params
    else setSearchParams({ season: e.target }, { replace: true });
  };

  return (
    <MultiSelect each={seasonOptions} value={seasonValues()} onChange={handleChange} button="Season">{entry => {
      return (
        <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <Checkbox radio checked={entry.value} />
          <p>{entry.description}</p>
        </div>
      );
    }}</MultiSelect>
  );
}
