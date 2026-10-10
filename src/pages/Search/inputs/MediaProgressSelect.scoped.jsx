import { useParams, useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import "./MediaProgressSelect.scoped.css"
import { Checkbox } from "../Checkbox.scoped.jsx";
import { useNavigateAndSearch } from "../../../utils/urlUtils.js";

export function MediaProgressSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigateAndSearch();
  const startProgress = 1;
  const endProgress = 220;

  const progressOptions = createMemo(() => {
    const options = [];
    for (let i = startProgress; i <= endProgress; i++) {
      options.push({ description: "" + i, id: i });
    }

    return options;

  });

  const progressValues = createMemo(() => {
    const { progress, progressLesser, progressGreater } = parsedSearchParams();

    if (progress) return [{ id: progress, value: true }];
    if (progressLesser && progressGreater) return [...Array(Math.max(progressLesser - progressGreater - 1, 0))].map((_, i) => ({ id: progressLesser - i - 1, value: true }));
    if (progressLesser) return [...Array(Math.max(progressLesser - startProgress, 0))].map((_, i) => ({ id: startProgress + i, value: true }));
    if (progressGreater) return [...Array(Math.max(endProgress - progressGreater, 0))].map((_, i) => ({ id: endProgress - i, value: true }));
  });

  let lastProgressSelection = null;
  const handleChange = e => {
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
    }
    if (e.oldUrl || !e.target) return;

    let { progress, progressLesser, progressGreater } = parsedSearchParams();

    // Last progress is invalid, probably old click, and history has changed parameters, discard old value
    if (lastProgressSelection != progressGreater && lastProgressSelection != progressLesser) lastProgressSelection = null;

    // 1. Radio selection, select progress, clear all other progress filters, and keep season state, but remove season headers (these headers add progress filtering)
    if (progress != e.target && !progressGreater && !progressLesser || e.target <= progressGreater || e.target >= progressLesser) {
      setSearchParams({ progress: e.target, progressLesser: undefined, progressGreater: undefined }, { replace: true });
    }
    // 2. Clicked again at the same progress selection, change selection to lesser - 1
    else if (progress == e.target) {
      setSearchParams({ progress: undefined, progressLesser: e.target + 1, progressGreater: undefined }, { replace: true });
    }
    // 3. Clicked again at the same progress selection, change selection to greater - 1
    else if (progressLesser == e.target + 1 && !progressGreater) {
      setSearchParams({ progress: undefined, progressLesser: undefined, progressGreater: e.target - 1 }, { replace: true });
    }
    // 4. Clicked again at the same progress selection, remove all progress filters
    else if (progressGreater == e.target - 1 || progressLesser == e.target + 1) {
      setSearchParams({ progress: undefined, progressLesser: undefined, progressGreater: undefined }, { replace: true });
    }
    // 5. User clicked inside the progress range, lets make the selection smaller
    else {
      // Last clicked missing, fallback to something
      const last = lastProgressSelection || progressGreater || progressLesser;
      if (e.target > last) {
        setSearchParams({ progress: undefined, progressLesser: e.target + 1, progressGreater: last }, { replace: true });
        lastProgressSelection = e.target + 1;
      }
      else {
        setSearchParams({ progress: undefined, progressLesser: last, progressGreater: e.target - 1 }, { replace: true });
        lastProgressSelection = e.target - 1;
      }
    }

  };

  const text = () => {
    if (params.type === "media") return "Chapter / Episodes";
    if (params.type === "anime") return "Episodes";
    if (params.type === "manga") return "Chapters";
  };

  return (
    <MultiSelect each={progressOptions()} value={progressValues()} onChange={handleChange} button={text()}>{entry => {
      return (
        <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <Checkbox radio={!entry.value} checked={entry.value} />

          <p>{entry.description}</p>
        </div>
      );
    }}</MultiSelect>
  );
}
