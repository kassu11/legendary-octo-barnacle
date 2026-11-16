import { createMemo } from "solid-js";
import { arrayUtils } from "@/utils/utils.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { TypeIcon } from "@/assets/icons.jsx";
import { useNavigateAndSearch } from "@/utils/urlUtils.js";
import { useParams } from "@solidjs/router";
import { useParsedSearchParams } from "@/state/providers.js";

export function MediaTypeSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const navigate = useNavigateAndSearch();
  const params = useParams();

  const typeOptions = [
    { description: "Anime", id: "anime" },
    { description: "Manga", id: "manga" },
    { description: "Any",   id: "media" },
  ];

  const typeValues = createMemo(() => {
    return arrayUtils.wrapToArray(params.type);
  });

  const handlePick = id => {

    const { header, type } = params;
    if (type == id) return;

    // 1. No header, or the header works with every media type. Just change the type
    if (!header || /\/finished|trending|popular|top|tba/.test(header)) {
      navigate(path => path.replace(type,                id), {}, { replace: true });
    }
    // 2. User has a header, that would break if media type changes. Remove header, but keep querys
    else if (header) {
      const { year, season, sort, status, format, country } = parsedSearchParams();
      navigate(path => path.replace(`${type}/${header}`, id), { year, season, sort, status, format, country }, { replace: true });
    }

  };

  return (
    <FilterSelect radio param="type" noEscapeCancel tooltip="Search anime, manga or both at the same time" each={typeOptions} value={typeValues()} onPick={handlePick} icon={<TypeIcon />} button="Type" />
  );
}
