import { useSearchParams, useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { SeasonIcon } from "@/assets/SearchFilterIcons.jsx";
import { useNavigateAndSearch } from "@/utils/urlUtils.js";

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
    return season ? [season] : [];
  });

  const handlePick = id => {

    const [season] = seasonValues();
    const header = params.header;
    const hasSpecialSeasonControlsOpen = parsedSearchParams().seasonPage;
    const year = parsedSearchParams().year;

    // 1. Selected already active season, remove all seasons
    if (id === season) {
      return navigate(path => path.replace(/\/this-season|next-season|winter-\d+|spring-\d+|summer-\d+|fall-\d+|tba/, ""), { season: undefined }, { replace: true });
    }
    // 2. Already in seasons header, update header
    else if (hasSpecialSeasonControlsOpen) {

      if (id === "tba") return navigate(path => path.replace(header, "tba"), { season: undefined }, { replace: true });
      if (!year) return navigate(path => path.replace(header, "this-season"), { season: id }, { replace: true });
      return navigate(path => path.replace(header, `${id}-${year}`), { year: undefined, season: undefined }, { replace: true });

    }

    // 3. User has no special headers. Lets open TBA header
    if (!header && id === "tba") {
      return navigate(path => path + "/tba", { year, season: undefined }, { replace: true });
    }

    // 4. User has no special headers, has not filtered season before, and has not selected year. Lets open current years season
    if (!header && !season && !year) {
      return navigate(path => path + "/this-season", { season: id }, { replace: true });
    }

    // 5. Standard change the season params
    else setSearchParams({ season: id }, { replace: true });
  };

  return (
    <FilterSelect radio param="season" noEscapeCancel tooltip="Anime airing season. Combine with year to browse a specific season" each={seasonOptions} value={seasonValues()} onPick={handlePick} onClear={() => handlePick(seasonValues()[0])} icon={<SeasonIcon />} button="Season" />
  );
}
