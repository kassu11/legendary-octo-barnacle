import { useParams, useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { LengthIcon } from "@/assets/SearchFilterIcons.jsx";

export function MediaLengthSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const startLength = 1;
  const endLength = 220;

  const lengthOptions = createMemo(() => {
    const options = [];
    for (let i = startLength; i <= endLength; i++) {
      options.push({ description: "" + i, id: "" + i });
    }

    return options;

  });

  const lengthValues = createMemo(() => {
    const { length, lengthLesser, lengthGreater } = parsedSearchParams();

    if (length)                        return [                                                                        { id: length,               value: true                                                    }];
    if (lengthLesser && lengthGreater) return [...Array(Math.max(lengthLesser - lengthGreater - 1, 0))].map((_, i) => ({ id: lengthLesser - i - 1, value: true, toast: `${lengthGreater + 1}-${lengthLesser - 1}` }));
    if (lengthLesser)                  return [...Array(Math.max(lengthLesser - startLength, 0))].map((_, i) => (      { id: startLength + i,      value: true, toast: `<${lengthLesser}`                         }));
    if (lengthGreater)                 return [...Array(Math.max(endLength - lengthGreater, 0))].map((_, i) => (       { id: endLength - i,        value: true, toast: `>${lengthGreater}`                        }));
    return [];
  });

  let lastLengthSelection = null;
  const handlePick = id => {
    const target = +id;

    let { length, lengthLesser, lengthGreater } = parsedSearchParams();

    // Last length is invalid, probably old click, and history has changed parameters, discard old value
    if (lastLengthSelection != lengthGreater && lastLengthSelection != lengthLesser) lastLengthSelection = null;

    // 1. Radio selection, select length, clear all other length filters, and keep season state, but remove season headers (these headers add length filtering)
    if (length != target && !lengthGreater && !lengthLesser || target <= lengthGreater || target >= lengthLesser) {
      setSearchParams({ length: target, lengthLesser: undefined, lengthGreater: undefined }, { replace: true });
    }
    // 2. Clicked again at the same length selection, change selection to lesser - 1
    else if (length == target) {
      setSearchParams({ length: undefined, lengthLesser: target + 1, lengthGreater: undefined }, { replace: true });
    }
    // 3. Clicked again at the same length selection, change selection to greater - 1
    else if (lengthLesser == target + 1 && !lengthGreater) {
      setSearchParams({ length: undefined, lengthLesser: undefined, lengthGreater: target - 1 }, { replace: true });
    }
    // 4. Clicked again at the same length selection, remove all length filters
    else if (lengthGreater == target - 1 || lengthLesser == target + 1) {
      setSearchParams({ length: undefined, lengthLesser: undefined, lengthGreater: undefined }, { replace: true });
    }
    // 5. User clicked inside the length range, lets make the selection smaller
    else {
      // Last clicked missing, fallback to something
      const last = lastLengthSelection || lengthGreater || lengthLesser;
      if (target > last) {
        setSearchParams({ length: undefined, lengthLesser: target + 1, lengthGreater: last }, { replace: true });
        lastLengthSelection = target + 1;
      }
      else {
        setSearchParams({ length: undefined, lengthLesser: last, lengthGreater: target - 1 }, { replace: true });
        lastLengthSelection = target - 1;
      }
    }

  };

  const text = () => {
    if (params.type === "media") return "Duration / Volumes";
    if (params.type === "anime") return "Duration";
    if (params.type === "manga") return "Volumes";
  };

  return (
    <FilterSelect radio param="length" tooltip="Filter by episode length in minutes or by volume count. Click a number again to switch between exactly, less and more, or click two numbers to select a range" each={lengthOptions()} value={lengthValues().map(value => "" + value.id)} valueLabel={lengthValues()[0]?.toast} onPick={handlePick} onClear={() => setSearchParams({ length: undefined, lengthLesser: undefined, lengthGreater: undefined }, { replace: true })} icon={<LengthIcon />} button={text()} />
  );
}
