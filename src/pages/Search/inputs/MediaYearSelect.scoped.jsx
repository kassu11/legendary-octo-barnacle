import { useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import "./MediaYearSelect.scoped.css"
import { Checkbox } from "../Checkbox.scoped.jsx";
import { useNavigateAndSearch } from "../../../utils/urlUtils.js";

export function MediaYearSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const params = useParams();
  const navigate = useNavigateAndSearch();
  const startYear = 1930;
  const endYear = new Date().getFullYear() + 2;

  const yearOptions = createMemo(() => {
    const options = [];
    for (let i = endYear; i >= startYear; i--) {
      options.push({ description: "" + i, id: i });
    }

    return options;

  });

  const yearValues = createMemo(() => {
    const { year, yearLesser, yearGreater } = parsedSearchParams();

    if (year) return [{ id: year, value: true }];
    if (yearLesser && yearGreater) return [...Array(Math.max(yearLesser - yearGreater - 1, 0))].map((_, i) => ({ id: yearLesser - i - 1, value: true }));
    if (yearLesser) return [...Array(Math.max(yearLesser - startYear, 0))].map((_, i) => ({ id: startYear + i, value: true }));
    if (yearGreater) return [...Array(Math.max(endYear - yearGreater, 0))].map((_, i) => ({ id: endYear - i, value: true }));
  });

  let lastYearSelection = null;
  const handleChange = e => {
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
    }
    if (e.oldUrl || !e.target) return;

    const header = params.header;
    const hasSpecialSeasonControlsOpen = parsedSearchParams().seasonPage;
    let { year, yearLesser, yearGreater, season } = parsedSearchParams();
    if (season === "tba") season = undefined; // Hacky way to make sure /tba?season=tba does not happen :D (just a visual thing)

    // Last year is invalid, probably old click, and history has changed parameters, discard old value
    if (lastYearSelection != yearGreater && lastYearSelection != yearLesser) lastYearSelection = null;

    const headerRegex = /\/this-season|next-season|winter-\d+|spring-\d+|summer-\d+|fall-\d+/;

    // 1. Radio selection, select year, clear all other year filters, and keep season state, but remove season headers (these headers add year filtering)
    if (year != e.target && !yearGreater && !yearLesser || e.target <= yearGreater || e.target >= yearLesser) {
      // 1.2 We have season page open, don't add year to query, but change the header
      if (hasSpecialSeasonControlsOpen && header !== "tba") {
        navigate(path => path.replace(header, `${season}-${e.target}`), { season: undefined, year: undefined, yearLesser: undefined,    yearGreater: undefined    }, { replace: true });
      }
      // 1.3 Just update the year to query
      else {
        navigate(path => path.replace(headerRegex, ""),                 { season,            year: e.target,  yearLesser: undefined,    yearGreater: undefined    }, { replace: true });
      }
    }
    // 2. Clicked again at the same year selection, change selection to lesser - 1
    else if (year == e.target) {
      navigate(path =>   path.replace(headerRegex, ""),                 { season,            year: undefined, yearLesser: e.target + 1, yearGreater: undefined    }, { replace: true });
    }
    // 3. Clicked again at the same year selection, change selection to greater - 1
    else if (yearLesser == e.target + 1 && !yearGreater) {
      navigate(path =>   path.replace(headerRegex, ""),                 { season,            year: undefined, yearLesser: undefined,    yearGreater: e.target - 1 }, { replace: true });
    }
    // 4. Clicked again at the same year selection, remove all year filters
    else if (yearGreater == e.target - 1 || yearLesser == e.target + 1) {
      navigate(path =>   path.replace(headerRegex, ""),                 { season,            year: undefined, yearLesser: undefined,    yearGreater: undefined    }, { replace: true });
    }
    // 5. User clicked inside the year range, lets make the selection smaller
    else {
      // Last clicked missing, fallback to something
      const last = lastYearSelection || yearGreater || yearLesser;
      if (e.target > last) {
        navigate(path => path.replace(headerRegex, ""),                 { season,            year: undefined, yearLesser: e.target + 1, yearGreater: last         }, { replace: true });
        lastYearSelection = e.target + 1;
      }
      else {
        navigate(path => path.replace(headerRegex, ""),                 { season,            year: undefined, yearLesser: last,         yearGreater: e.target - 1 }, { replace: true });
        lastYearSelection = e.target - 1;
      }
    }

  };

  return (
    <MultiSelect each={yearOptions()} value={yearValues()} onChange={handleChange} button="Year">{entry => {
      return (
        <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <Checkbox radio={!entry.value} checked={entry.value} />

          <p>{entry.description}</p>
        </div>
      );
    }}</MultiSelect>
  );
}
