import { createMemo, Show } from "solid-js";
import "./SearchActiveQueries.scoped.css";
import { useParsedSearchParams } from "@/state/providers";
import { useParams, useSearchParams } from "@solidjs/router";
import { useNavigateAndSearch } from "@/utils/urlUtils";
import { capitalize } from "@/utils/formatUtils.js";
import { arrayUtils } from "@/utils/utils";
import { addClearAllActiveQuery, createActiveQuery, createToggleActiveQueries, createValueActiveQueries, excludableValueActiveQuery } from "@/utils/activeQueryUtils.js";
import { localizeInternalSearchParams } from "@/api/apiTranslations";
import { AgeIcon, AvailableIcon, CountryIcon, FormatIcon, GenreIcon, LengthIcon, LicensedIcon, OnListIcon, ProgressIcon, SearchIcon, SeasonIcon, SortIcon, SourceIcon, StatusIcon, TagRankIcon, TagsIcon, TypeIcon, UserIcon, UsersIcon, YearIcon } from "@/assets/icons.jsx";
import { ActiveQueries } from "@/components/filters/ActiveQueries.scoped.jsx";
import { externalSourcesData } from "./inputs/MediaExternalSourcesSelect.scoped";
import { usersData } from "./inputs/MediaUsersSelect.scoped";
import { ROLE_OPTIONS } from "./inputs/CharacterRoleSelect";
import { CardStyleToggle } from "./CardStyleToggle.scoped";
import { searchPageCardStyle, setSearchPageCardStyle } from "@/state/globalState";

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
];

const requiredSortValues = [
  { sort: "score",      description: "Must have a score"             },
  { sort: "progress",   description: "Must have known episode count" },
  { sort: "duration",   description: "Must have known duration"      },
  { sort: "end_date",   description: "Must have known end date"      },
  { sort: "start_date", description: "Must have known start date"    },
  { sort: "volumes",    description: "Must have known volume count"  },
];

export function useActiveSearchQueries() {
  const parsedSearchParams = useParsedSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigateAndSearch();

  const remove = query => {
    const header = params.header;
    const headerThatCouldNeedInvalidating = invalidateHeader.find(h => h.header === header || h.header.test?.(header));
    if (headerThatCouldNeedInvalidating && Object.keys(query).some(param => headerThatCouldNeedInvalidating.params.includes(param))) {
      return navigate(path => path.replace("/" + header, ""), query);
    }
    setSearchParams(query);
  };

  return createMemo(() => {
    const activeQueries = [];
    const { type, q, sort, format, country, status, age, season, year, yearLesser, yearGreater, source, externalSources, progress, progressLesser, progressGreater, length, lengthLesser, lengthGreater, rank, onList, licensed } = parsedSearchParams();

    if (q?.length) activeQueries.push(createActiveQuery({ description: `Searching "${q}"`, icon: SearchIcon, query: { q: undefined }, clearable: false }, remove));

    const rawType = arrayUtils.wrapToArray(searchParams.type).at(-1);
    if (rawType && rawType === type) activeQueries.push(createActiveQuery({ description: "Type: " + capitalize(rawType), icon: TypeIcon, query: { type: undefined } }, remove));

    const sortObject = arrayUtils.objectFromArrayEntries(sort);
    for (const required of requiredSortValues) {
      if (sortObject[required.sort + "_plus"] || sortObject[required.sort + "_desc_plus"]) {
        activeQueries.push(createActiveQuery({ description: required.description, icon: SortIcon, query: { sort: sort.map(e => e.includes(required.sort) ? e.replace("_plus", "") : e) } }, remove));
      }
    }

    activeQueries.push(...createValueActiveQueries("format",  format,  v => v in localizeInternalSearchParams && { description: "Format: "  + localizeInternalSearchParams[v], icon: FormatIcon  }, remove));
    activeQueries.push(...createValueActiveQueries("status",  status,  v => v in localizeInternalSearchParams && { description: "Status: "  + localizeInternalSearchParams[v], icon: StatusIcon  }, remove));
    activeQueries.push(...createValueActiveQueries("source",  source,  v => v in localizeInternalSearchParams && { description: "Source: "  + localizeInternalSearchParams[v], icon: SourceIcon  }, remove));
    activeQueries.push(...createValueActiveQueries("country", country, v => v in localizeInternalSearchParams && { description: "Country: " + localizeInternalSearchParams[v], icon: CountryIcon }, remove));

    if (season)      activeQueries.push(createActiveQuery({ description: season === "tba" ? "TBA" : capitalize(season), icon: SeasonIcon, query: { season: undefined, year } }, remove));
    if (year)        activeQueries.push(createActiveQuery({ description: "Year: " + year,                               icon: YearIcon,   query: { year: undefined, season } }, remove));
    if (yearLesser)  activeQueries.push(createActiveQuery({ description: "Year<" + yearLesser,                          icon: YearIcon,   query: { yearLesser: undefined } }, remove));
    if (yearGreater) activeQueries.push(createActiveQuery({ description: "Year>" + yearGreater,                         icon: YearIcon,   query: { yearGreater: undefined } }, remove));

    activeQueries.push(...createValueActiveQueries("genre", arrayUtils.wrapToArray(searchParams.genre), excludableValueActiveQuery("Genre", GenreIcon, genre => capitalize(genre.toLowerCase())), remove));
    activeQueries.push(...createValueActiveQueries("tag",   arrayUtils.wrapToArray(searchParams.tag),   excludableValueActiveQuery("Tag",   TagsIcon,  tag   => capitalize(tag.toLowerCase())),   remove));

    if (rank) activeQueries.push(createActiveQuery({ description: "Tag Rank: " + rank + "%+", icon: TagRankIcon, query: { rank: undefined } }, remove));

    if (age in localizeInternalSearchParams) activeQueries.push(createActiveQuery({ description: "Age: " + localizeInternalSearchParams[age], icon: AgeIcon, query: { age: undefined } }, remove));

    const progressLabel = type === "anime" ? "Episodes" : type === "manga" ? "Chapters" : "Ep/Ch";
    if (progress)        activeQueries.push(createActiveQuery({ description: progressLabel + ": " + progress,        icon: ProgressIcon, query: { progress: undefined }        }, remove));
    if (progressLesser)  activeQueries.push(createActiveQuery({ description: progressLabel + "<" + progressLesser,   icon: ProgressIcon, query: { progressLesser: undefined }  }, remove));
    if (progressGreater) activeQueries.push(createActiveQuery({ description: progressLabel + ">" + progressGreater,  icon: ProgressIcon, query: { progressGreater: undefined } }, remove));

    const lengthLabel = type === "anime" ? "Duration" : type === "manga" ? "Volumes" : "Duration / Volumes";
    if (length)        activeQueries.push(createActiveQuery({ description: lengthLabel + ": " + length,        icon: LengthIcon, query: { length: undefined        } }, remove));
    if (lengthLesser)  activeQueries.push(createActiveQuery({ description: lengthLabel + "<" + lengthLesser,   icon: LengthIcon, query: { lengthLesser: undefined  } }, remove));
    if (lengthGreater) activeQueries.push(createActiveQuery({ description: lengthLabel + ">" + lengthGreater,  icon: LengthIcon, query: { lengthGreater: undefined } }, remove));

    activeQueries.push(...createValueActiveQueries("externalSources", externalSources, v => {
      const target = externalSourcesData()?.sources.find(source => source.id === v);
      return target && { description: "ExternalSources: " + target.site, icon: AvailableIcon, image: target.icon, imageColor: target.color };
    }, remove));

    activeQueries.push(...createValueActiveQueries("user", arrayUtils.wrapToArray(searchParams.user), v => {
      const name = v.substring(3);
      if (v.startsWith("in-")) return { description: "Include User: " + name, icon: UsersIcon, image: usersData()[name.toLowerCase()]?.avatar };
      if (v.startsWith("ex-")) return { description: "Exclude User: " + name, icon: UsersIcon, image: usersData()[name.toLowerCase()]?.avatar };
    }, remove));

    activeQueries.push(...createToggleActiveQueries("onList",   onList,   { included: "On My List", excluded: "Not in My List", icon: OnListIcon   }, remove));
    activeQueries.push(...createToggleActiveQueries("licensed", licensed, { included: "Licensed",   excluded: "Not Licensed",   icon: LicensedIcon }, remove));

    activeQueries.push(...createValueActiveQueries("role", arrayUtils.wrapToArray(searchParams.role), excludableValueActiveQuery("Role", UserIcon, role => ROLE_OPTIONS.find(option => option.id === role)?.description || role), remove));

    addClearAllActiveQuery(activeQueries, remove);
    return activeQueries;
  });
}

export function SearchActiveQueries(props) {
  const params = useParams();
  const activeQueries = useActiveSearchQueries();

  // The card style toggle is shown on the same row as the active queries, when the search page doesn't have a header
  return (
    <Show when={props.cardStyleToggle} fallback={<ActiveQueries activeQueries={activeQueries()} singleRow={props.singleRow} />}>
      <div class="active-queries-row" classList={{ "single-row": props.singleRow }}>
        <div class="queries">
          <ActiveQueries activeQueries={activeQueries()} singleRow={props.singleRow} />
        </div>
        <Show when={params.mode === "search"}>
          <div class="toolbar">
            <CardStyleToggle cardStyle={searchPageCardStyle()} setCardStyle={setSearchPageCardStyle} />
          </div>
        </Show>
      </div>
    </Show>
  );
}
