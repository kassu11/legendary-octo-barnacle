import { useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { YearIcon } from "@/assets/SearchFilterIcons.jsx";
import { useNavigateAndSearch } from "@/utils/urlUtils.js";

export function MediaYearSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const params = useParams();
  const navigate = useNavigateAndSearch();
  const startYear = 1930;
  const endYear = new Date().getFullYear() + 2;

  const yearOptions = createMemo(() => {
    const options = [];
    for (let i = endYear; i >= startYear; i--) {
      options.push({ description: "" + i, id: "" + i });
    }

    return options;

  });

  const yearValues = createMemo(() => {
    const { year, yearLesser, yearGreater } = parsedSearchParams();

    if (year)                      return [                                                                    { id: year,               value: true                                                }];
    if (yearLesser && yearGreater) return [...Array(Math.max(yearLesser - yearGreater - 1, 0))].map((_, i) => ({ id: yearLesser - i - 1, value: true, toast: `${yearLesser - 1}-${yearGreater + 1}` }));
    if (yearLesser)                return [...Array(Math.max(yearLesser - startYear, 0))].map((_, i) => (      { id: startYear + i,      value: true, toast: `<${yearLesser}`                       }));
    if (yearGreater)               return [...Array(Math.max(endYear - yearGreater, 0))].map((_, i) => (       { id: endYear - i,        value: true, toast: `>${yearGreater}`                      }));
    return [];
  });

  const headerRegex = /\/this-season|next-season|winter-\d+|spring-\d+|summer-\d+|fall-\d+/;

  const validSeason = () => {
    const { season } = parsedSearchParams();
    return season === "tba" ? undefined : season; // Hacky way to make sure /tba?season=tba does not happen :D (just a visual thing)
  };

  const clearYear = () => navigate(path => path.replace(headerRegex, ""), { season: validSeason(), year: undefined, yearLesser: undefined, yearGreater: undefined }, { replace: true });

  let lastYearSelection = null;
  const handlePick = id => {
    const target = +id;

    const header = params.header;
    const hasSpecialSeasonControlsOpen = parsedSearchParams().seasonPage;
    const { year, yearLesser, yearGreater } = parsedSearchParams();
    const season = validSeason();

    // Last year is invalid, probably old click, and history has changed parameters, discard old value
    if (lastYearSelection != yearGreater && lastYearSelection != yearLesser) lastYearSelection = null;

    // 1. Radio selection, select year, clear all other year filters, and keep season state, but remove season headers (these headers add year filtering)
    if (year != target && !yearGreater && !yearLesser || target <= yearGreater || target >= yearLesser) {
      // 1.2 We have season page open, don't add year to query, but change the header
      if (hasSpecialSeasonControlsOpen && header !== "tba") {
        navigate(path => path.replace(header, `${season}-${target}`),   { season: undefined, year: undefined, yearLesser: undefined,    yearGreater: undefined    }, { replace: true });
      }
      // 1.3 Just update the year to query
      else {
        navigate(path => path.replace(headerRegex, ""),                 { season,            year: target,    yearLesser: undefined,    yearGreater: undefined    }, { replace: true });
      }
    }
    // 2. Clicked again at the same year selection, change selection to lesser - 1
    else if (year == target) {
      navigate(path =>   path.replace(headerRegex, ""),                 { season,            year: undefined, yearLesser: target + 1,   yearGreater: undefined    }, { replace: true });
    }
    // 3. Clicked again at the same year selection, change selection to greater - 1
    else if (yearLesser == target + 1 && !yearGreater) {
      navigate(path =>   path.replace(headerRegex, ""),                 { season,            year: undefined, yearLesser: undefined,    yearGreater: target - 1   }, { replace: true });
    }
    // 4. Clicked again at the same year selection, remove all year filters
    else if (yearGreater == target - 1 || yearLesser == target + 1) {
      clearYear();
    }
    // 5. User clicked inside the year range, lets make the selection smaller
    else {
      // Last clicked missing, fallback to something
      const last = lastYearSelection || yearGreater || yearLesser;
      if (target > last) {
        navigate(path => path.replace(headerRegex, ""),                 { season,            year: undefined, yearLesser: target + 1,   yearGreater: last         }, { replace: true });
        lastYearSelection = target + 1;
      }
      else {
        navigate(path => path.replace(headerRegex, ""),                 { season,            year: undefined, yearLesser: last,         yearGreater: target - 1   }, { replace: true });
        lastYearSelection = target - 1;
      }
    }

  };

  return (
    <FilterSelect radio param="year" noEscapeCancel tooltip="Year the media started releasing" each={yearOptions()} value={yearValues().map(value => "" + value.id)} valueLabel={yearValues()[0]?.toast} onPick={handlePick} onClear={clearYear} icon={<YearIcon />} button="Year" />
  );
}
