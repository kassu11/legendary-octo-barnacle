import { createMemo } from "solid-js";
import { useParams } from "@solidjs/router";
import { useParsedSearchParams } from "@/state/providers";
import { setSearchPageGroupBy, setSearchPageGroupSeasonalBy, setSearchPageGroupTBABy } from "@/state/globalState";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { GroupIcon } from "@/assets/icons.jsx";

export function MediaGroupBySelect() {
  const params = useParams();
  const parsedSearchParams = useParsedSearchParams();

  // Only anime have seasons
  const groupOptions = createMemo(() => [
    { description: "Format",       id: "format" },
    ...(parsedSearchParams().type === "anime" ? [{ description: "Season", id: "season" }] : []),
    { description: "Release Year", id: "year"   },
  ]);

  const groupValues = createMemo(() => {
    const groupBy = parsedSearchParams().groupBy;
    return groupBy ? [groupBy] : [];
  });

  // Seasonal and TBA pages have their own default, so they change their own value
  const setGroupBy = value => {
    if (params.header === "tba") setSearchPageGroupTBABy(value);
    else if (parsedSearchParams().seasonPage) setSearchPageGroupSeasonalBy(value);
    else setSearchPageGroupBy(value);
  };

  // Picking the active grouping again removes it
  const handlePick = id => setGroupBy(id === parsedSearchParams().groupBy ? "none" : id);

  return (
    <FilterSelect radio param="groupBy" noEscapeCancel tooltip="Split the results into sections. The results are sorted by the group first and then by the selected sort" each={groupOptions()} value={groupValues()} onPick={handlePick} onClear={() => setGroupBy("none")} icon={<GroupIcon />} button="Group By" />
  );
}
