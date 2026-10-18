import { createMemo, For } from "solid-js";
import "./SearchActiveQueries.scoped.css";
import { useParsedSearchParams } from "../../context/providers";
import { useParams, useSearchParams } from "@solidjs/router";
import { useNavigateAndSearch } from "../../utils/urlUtils";
import { arrayUtils, formatingUtils } from "../../utils/utils";
import { localizeInternalSearchParams } from "../../core/apiTranslations";
import { externalSourcesData } from "./inputs/MediaExternalSourcesSelect.scoped";

const invalidateHeader = [
  { header: "finished",                          params: ["status"] },
  { header: "finished-manga",                    params: ["status", "format"] },
  { header: "finished-novel",                    params: ["status", "format"] },
  { header: "manhwa",                            params: ["format", "country"] },
  { header: "new",                               params: [] },
  { header: "next-season",                       params: ["season", "year"] },
  { header: "novel",                             params: ["format"] },
  { header: "popular",                           params: [] },
  { header: "tba",                               params: [] },
  { header: "this-season",                       params: ["season", "year"] },
  { header: "top",                               params: [] },
  { header: "trending",                          params: [] },
  { header: /^(summer|fall|spring|winter)-\d+$/, params: ["season", "year"] },
]

export function SearchActiveQueries() {
  const parsedSearchParams = useParsedSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigateAndSearch();

  const queryButtons = createMemo(() => {

    const returnValue = [];

    const { q, sort, format, themes, excludedThemes, country, status, age, season, year, yearLesser, yearGreater, source, externalSources } = parsedSearchParams();

    const sortObject = arrayUtils.objectFromArrayEntries(sort);
    if (sortObject["score_plus"     ] || sortObject["score_desc_plus"     ]) returnValue.push({ type: "misc", description: "Must have a score",             query: { sort: sort.map(e => e.includes("score"     ) ? e.replace("_plus", "") : e) } });
    if (sortObject["progress_plus"  ] || sortObject["progress_desc_plus"  ]) returnValue.push({ type: "misc", description: "Must have known episode count", query: { sort: sort.map(e => e.includes("progress"  ) ? e.replace("_plus", "") : e) } });
    if (sortObject["duration_plus"  ] || sortObject["duration_desc_plus"  ]) returnValue.push({ type: "misc", description: "Must have known duration",      query: { sort: sort.map(e => e.includes("duration"  ) ? e.replace("_plus", "") : e) } });
    if (sortObject["end_date_plus"  ] || sortObject["end_date_desc_plus"  ]) returnValue.push({ type: "misc", description: "Must have known end date",      query: { sort: sort.map(e => e.includes("end_date"  ) ? e.replace("_plus", "") : e) } });
    if (sortObject["start_date_plus"] || sortObject["start_date_desc_plus"]) returnValue.push({ type: "misc", description: "Must have known start date",    query: { sort: sort.map(e => e.includes("start_date") ? e.replace("_plus", "") : e) } });
    if (sortObject["volumes_plus"   ] || sortObject["volumes_desc_plus"   ]) returnValue.push({ type: "misc", description: "Must have known volume count",  query: { sort: sort.map(e => e.includes("volumes"   ) ? e.replace("_plus", "") : e) } });

    for (const v of format) {
      if (v in localizeInternalSearchParams) returnValue.push({ type: "format", description: "Format: " + localizeInternalSearchParams[v], query: { format: format.filter(v2 => v2 !== v) } });
    }

    for (const v of source) {
      if (v in localizeInternalSearchParams) returnValue.push({ type: "source", description: "Source: " + localizeInternalSearchParams[v], query: { source: source.filter(v2 => v2 !== v) } });
    }

    for (const v of country) {
      if (v in localizeInternalSearchParams) returnValue.push({ type: "country", description: "Country: " + localizeInternalSearchParams[v], query: { country: country.filter(v2 => v2 !== v) } });
    }

    for (const v of externalSources) {
      const target = externalSourcesData()?.sources.find(v2 => v2.id === v);
      if (target) returnValue.push({ type: "externalSources", description: "ExternalSources: " + target.site, query: { externalSources: externalSources.filter(v2 => v2 !== v) } });
    }

    const rawThemes = arrayUtils.wrapToArray(searchParams.theme);
    for (const v of themes) {
      returnValue.push({ type: "themes", description: "Theme: " + formatingUtils.capitalize(v), query: { theme: rawThemes.filter(v2 => v2 !== v) } });
    }

    for (const v of excludedThemes) {
      returnValue.push({ type: "themes", description: "Theme: " + formatingUtils.capitalize(v), query: { theme: rawThemes.filter(v2 => v2 !== "-" + v) } });
    }

    for (const v of age) {
      if (v in localizeInternalSearchParams) returnValue.push({ type: "age", description: "Age: " + localizeInternalSearchParams[v], query: { age: age.filter(v2 => v2 !== v) } });
    }

    for (const v of status) {
      if (v in localizeInternalSearchParams) returnValue.push({ type: "status", description: "Status: " + localizeInternalSearchParams[v], query: { status: status.filter(v2 => v2 !== v) } });
    }

    if (q?.length) {
      returnValue.push({ type: "01.search", description: `Searching "${q}"`, query: { q: undefined } });
    }

    if (year) {
      returnValue.push({ type: "year", description: year, query: { year: undefined, season } });
    }

    if (yearLesser) {
      returnValue.push({ type: "yearLesser", description: "<" + yearLesser, query: { yearLesser: undefined } });
    }

    if (yearGreater) {
      returnValue.push({ type: "yearGreater", description: ">" + yearGreater, query: { yearGreater: undefined } });
    }

    if (season) {
      returnValue.push({ type: "season", description: formatingUtils.capitalize(season), query: { season: undefined, year } });
    }

    return returnValue.sort((a, b) => a.type.localeCompare(b.type) || a.description.localeCompare(b.description));

  });

  return (
    <div>
      <For each={queryButtons()}>{entry => (
        <button onClick={() => {
          const header = params.header;
          const headerThatCouldNeedInvalidating = invalidateHeader.find(h => h.header === header || h.header.test?.(header));
          if (headerThatCouldNeedInvalidating) {
            for (const param of Object.keys(entry.query)) {
              if (headerThatCouldNeedInvalidating.params.includes(param)) {
                // Invalidate header and update query
                return navigate(path => path.replace("/" + header, ""), entry.query);
              }
            }
          }

          // Normal set search params
          setSearchParams(entry.query);
        }}>{entry.description}</button>
      )}</For>
    </div>
  );
}

