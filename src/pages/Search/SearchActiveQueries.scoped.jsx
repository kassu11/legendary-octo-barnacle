import { createMemo, For } from "solid-js";
import "./SearchBar.scoped.css";
import { useParsedSearchParams } from "../../context/providers";
import { useSearchParams } from "@solidjs/router";

export function SearchActiveQueries() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();

  const queryButtons = createMemo(() => {

    const returnValue = [];

    const sort = [...parsedSearchParams().sort];

    if (sort.includes("score_plus") || sort.includes("score_desc_plus")) {
      returnValue.push({ type: "misc", description: "Must have a score", query: { sort: sort.map(e => e.includes("score") ? e.replace("_plus", "") : e) } });
    }
    if (sort.includes("progress_plus") || sort.includes("progress_desc_plus")) {
      returnValue.push({ type: "misc", description: "Must have known episode count", query: { sort: sort.map(e => e.includes("progress") ? e.replace("_plus", "") : e) } });
    }
    if (sort.includes("duration_plus") || sort.includes("duration_desc_plus")) {
      returnValue.push({ type: "misc", description: "Must have known duration", query: { sort: sort.map(e => e.includes("duration") ? e.replace("_plus", "") : e) } });
    }
    if (sort.includes("end_date_plus") || sort.includes("end_date_desc_plus")) {
      returnValue.push({ type: "misc", description: "Must have known end date", query: { sort: sort.map(e => e.includes("end_date") ? e.replace("_plus", "") : e) } });
    }
    if (sort.includes("start_date_plus") || sort.includes("start_date_desc_plus")) {
      returnValue.push({ type: "misc", description: "Must have known start date", query: { sort: sort.map(e => e.includes("start_date") ? e.replace("_plus", "") : e) } });
    }
    if (sort.includes("volumes_plus") || sort.includes("volumes_desc_plus")) {
      returnValue.push({ type: "misc", description: "Must have known volume count", query: { sort: sort.map(e => e.includes("volumes") ? e.replace("_plus", "") : e) } });
    }

    return returnValue.sort((a, b) => a.type.localeCompare(b.type) || a.description.localeCompare(b.description));

  });

  return (
    <div>
      <For each={queryButtons()}>{entry => (
        <button onClick={() => {
          setSearchParams(entry.query);
        }}>{entry.description}</button>
      )}</For>
    </div>
  );
}

