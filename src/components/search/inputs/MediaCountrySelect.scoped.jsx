import { createMemo } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { arrayUtils } from "@/utils/utils.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { CountryIcon } from "@/assets/icons.jsx";
import { useNavigateAndSearch } from "@/utils/urlUtils.js";

export function MediaCountrySelect() {
  const parsedSearchParams = useParsedSearchParams();
  const navigate = useNavigateAndSearch();

  const countryOptions = [
    { description: "China",       id: "CN" },
    { description: "Japan",       id: "JP" },
    { description: "South Korea", id: "KR" },
    { description: "Taiwan",      id: "TW" },
  ];

  const countryValues = createMemo(() => {
    return [...arrayUtils.wrapToArray(parsedSearchParams().country)];
  });

  // Set new country value, and remove header, if present
  const handleChange = query => navigate(path => path.replace("/manhwa", ""), query, { replace: true });

  return (
    <FilterSelect param="country" noEscapeCancel tooltip="Country of origin" each={countryOptions} value={countryValues()} setSearchParams={handleChange} icon={<CountryIcon />} button="Country" />
  );
}
