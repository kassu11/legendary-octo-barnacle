import { useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { arrayUtils } from "@/utils/utils.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { AgeIcon } from "@/assets/SearchFilterIcons.jsx";

export function MediaAgeSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();

  const ageOptions = [
    { description: "Any Rating",                               id: "any" },
    { description: "R+ - (violence, profanity & mild nudity)", id: "r",  toast: "R+" },
    { description: "Rx - Hentai",                              id: "rx", toast: "Rx" },
  ];

  const ageValues = createMemo(() => {
    const listOfAges = arrayUtils.wrapToArray(parsedSearchParams().age);
    const firstValidAge = listOfAges.find(age => ageOptions.some(({id}) => id === age));
    const id = firstValidAge || "r";

    return [id];
  });

  const handlePick = id => {

    if (id === "r") setSearchParams({ age: undefined }, { replace: true });
    else setSearchParams({ age: id }, { replace: true });

  };

  return (
    <FilterSelect radio param="age" defaultValue="r" noEscapeCancel tooltip="Include adult content in the results" each={ageOptions} value={ageValues()} onPick={handlePick} onClear={() => handlePick("r")} icon={<AgeIcon />} button="Age" />
  );
}
