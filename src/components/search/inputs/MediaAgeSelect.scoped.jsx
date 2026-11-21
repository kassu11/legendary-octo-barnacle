import { useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { TwoStateToggleButton } from "@/components/filters/TwoStateToggle.scoped.jsx";
import { AgeIcon } from "@/assets/icons.jsx";

export function MediaAgeSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();

  const toggleValue = createMemo(() => {
    const age = parsedSearchParams().age;
    if (age === "rx") return "true";
    if (age === "any") return undefined;
    return "false";
  });

  const handleChange = value => {
    if (value === "true") setSearchParams({ age: "rx" }, { replace: true });
    else if (value === "false") setSearchParams({ age: undefined }, { replace: true });
    else setSearchParams({ age: "any" }, { replace: true });
  };

  return (
    <TwoStateToggleButton value={toggleValue()} onChange={handleChange} icon={<AgeIcon />} label="R-18" tooltip="R-18 media is hidden by default. Click once to show all media, twice to show only R-18 media" />
  );
}
