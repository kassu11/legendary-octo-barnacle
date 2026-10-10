import { useParams, useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import "./MediaLengthSelect.scoped.css"
import { Checkbox } from "../Checkbox.scoped.jsx";
import { useNavigateAndSearch } from "../../../utils/urlUtils.js";

export function MediaLengthSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigateAndSearch();
  const startLength = 1;
  const endLength = 220;

  const lengthOptions = createMemo(() => {
    const options = [];
    for (let i = startLength; i <= endLength; i++) {
      options.push({ description: "" + i, id: i });
    }

    return options;

  });

  const lengthValues = createMemo(() => {
    const { length, lengthLesser, lengthGreater } = parsedSearchParams();

    if (length) return [{ id: length, value: true }];
    if (lengthLesser && lengthGreater) return [...Array(Math.max(lengthLesser - lengthGreater - 1, 0))].map((_, i) => ({ id: lengthLesser - i - 1, value: true }));
    if (lengthLesser) return [...Array(Math.max(lengthLesser - startLength, 0))].map((_, i) => ({ id: startLength + i, value: true }));
    if (lengthGreater) return [...Array(Math.max(endLength - lengthGreater, 0))].map((_, i) => ({ id: endLength - i, value: true }));
  });

  let lastLengthSelection = null;
  const handleChange = e => {
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
      return;
    }

    let { length, lengthLesser, lengthGreater } = parsedSearchParams();

    // Last length is invalid, probably old click, and history has changed parameters, discard old value
    if (lastLengthSelection != lengthGreater && lastLengthSelection != lengthLesser) lastLengthSelection = null;

    // 1. Radio selection, select length, clear all other length filters, and keep season state, but remove season headers (these headers add length filtering)
    if (length != e.target && !lengthGreater && !lengthLesser || e.target <= lengthGreater || e.target >= lengthLesser) {
      setSearchParams({ length: e.target, lengthLesser: undefined, lengthGreater: undefined }, { replace: true });
    }
    // 2. Clicked again at the same length selection, change selection to lesser - 1
    else if (length == e.target) {
      setSearchParams({ length: undefined, lengthLesser: e.target + 1, lengthGreater: undefined }, { replace: true });
    }
    // 3. Clicked again at the same length selection, change selection to greater - 1
    else if (lengthLesser == e.target + 1 && !lengthGreater) {
      setSearchParams({ length: undefined, lengthLesser: undefined, lengthGreater: e.target - 1 }, { replace: true });
    }
    // 4. Clicked again at the same length selection, remove all length filters
    else if (lengthGreater == e.target - 1 || lengthLesser == e.target + 1) {
      setSearchParams({ length: undefined, lengthLesser: undefined, lengthGreater: undefined }, { replace: true });
    }
    // 5. User clicked inside the length range, lets make the selection smaller
    else {
      // Last clicked missing, fallback to something
      const last = lastLengthSelection || lengthGreater || lengthLesser;
      if (e.target > last) {
        setSearchParams({ length: undefined, lengthLesser: e.target + 1, lengthGreater: last }, { replace: true });
        lastLengthSelection = e.target + 1;
      }
      else {
        setSearchParams({ length: undefined, lengthLesser: last, lengthGreater: e.target - 1 }, { replace: true });
        lastLengthSelection = e.target - 1;
      }
    }

  };

  const text = () => {
    if (params.type === "media") return "Duration / Volumes";
    if (params.type === "anime") return "Duration";
    if (params.type === "manga") return "Volumes";
  };

  return (
    <MultiSelect each={lengthOptions()} value={lengthValues()} onChange={handleChange} button={text()}>{entry => {
      return (
        <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <Checkbox radio={!entry.value} checked={entry.value} />

          <p>{entry.description}</p>
        </div>
      );
    }}</MultiSelect>
  );
}
