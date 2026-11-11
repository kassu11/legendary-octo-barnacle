import { useSearchParams, useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { arrayUtils } from "@/utils/utils.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { StatusIcon } from "@/assets/icons.jsx";
import { useNavigateAndSearch } from "@/utils/urlUtils.js";

export function MediaStatusSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigateAndSearch();

  const statusOptions = createMemo(() => {
    const { type } = params;

    const options = [
      { description: "Cancelled",        id: "cancelled",        tooltip: "Ended before it was completed and will not continue" },
      { description: "Complete",         id: "complete",         tooltip: "Finished releasing"                                  },
      { description: "Not Yet Released", id: "not_yet_released", tooltip: "Announced, but not released yet"                     },
      { description: "Releasing",        id: "releasing",        tooltip: "Currently airing or being published"                 },
    ];

    if (type === "manga") {
      options.push({ description: "Hiatus", id: "HIATUS", tooltip: "Publishing is paused, but may continue later" });
    }

    return options.sort((a, b) => a.description.localeCompare(b.description));

  });

  const statusValues = createMemo(() => {
    return [...arrayUtils.wrapToArray(parsedSearchParams().status)];
  });

  const handleChange = ({ status }) => {

    const header = params.header || "";
    // 1. Remove a header that adds a status, but keep all other header values
    if (/\/novel|finished-manga|finished-novel/.test(header)) {
      const { sort, format } = parsedSearchParams();
      navigate(path => path.replace("/" + header, ""), { sort, format, status }, { replace: true });
    }
    // 2. Normal just change the status
    else {
      setSearchParams(                                 {               status }, { replace: true });
    }

  };

  return (
    <FilterSelect param="status" noEscapeCancel tooltip="Current release status of the media" each={statusOptions()} value={statusValues()} setSearchParams={handleChange} icon={<StatusIcon />} button="Status" />
  );
}
