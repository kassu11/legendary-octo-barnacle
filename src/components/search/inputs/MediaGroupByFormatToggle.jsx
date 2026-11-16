import { useParams } from "@solidjs/router";
import { useParsedSearchParams } from "@/state/providers";
import { setSearchPageGroupEntriesByFormat, setSearchPageGroupSeasonalEntriesByFormat, setSearchPageGroupTBAEntriesByFormat } from "@/state/globalState";
import { ToggleButton } from "@/components/filters/TwoStateToggle.scoped";
import { FormatIcon } from "@/assets/icons.jsx";

export function MediaGroupByFormatToggle() {
  const params = useParams();
  const parsedSearchParams = useParsedSearchParams();

  // Seasonal and TBA pages have their own default, so they toggle their own value
  const toggle = () => {
    if (params.header === "tba") setSearchPageGroupTBAEntriesByFormat(v => !v);
    else if (parsedSearchParams().seasonPage) setSearchPageGroupSeasonalEntriesByFormat(v => !v);
    else setSearchPageGroupEntriesByFormat(v => !v);
  };

  return (
    <ToggleButton checked={parsedSearchParams().groupEntriesByFormat} label="Group Formats" icon={<FormatIcon />} onChange={toggle} />
  );
}
