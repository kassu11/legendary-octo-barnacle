import { createMemo } from "solid-js";
import { arrayUtils } from "../../../utils/utils.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import { Checkbox } from "../Checkbox.scoped.jsx";
import { useNavigateAndSearch } from "../../../utils/urlUtils.js";
import { useParams } from "@solidjs/router";
import { useParsedSearchParams } from "../../../context/providers.js";
import { MediaSelectItem } from "./MediaSelectItem.scoped.jsx";

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
    return arrayUtils.wrapToArray(params.type).map(id => ({ id, value: true }));
  });

  const handleChange = e => {

    if (e.oldUrl) return navigate(e.oldUrl);
    if (!e.target) return;

    const { header, type } = params;
    if (type == e.target) return;

    // 1. No header, or the header works with every media type. Just change the type
    if (!header || /\/finished|trending|popular|top|tba/.test(header)) {
      navigate(path => path.replace(type,                e.target), {}, { replace: true });
    }
    // 2. User has a header, that would break if media type changes. Remove header, but keep querys
    else if (header) {
      const { year, season, sort, status, format, country } = parsedSearchParams();
      navigate(path => path.replace(`${type}/${header}`, e.target), { year, season, sort, status, format, country }, { replace: true });
    }

  };

  return (
    <MultiSelect each={typeOptions} value={typeValues()} onChange={handleChange} button="Type">{entry => {
      return (
        <MediaSelectItem classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <Checkbox checked={entry.value} radio />
          <p>{entry.description}</p>
        </MediaSelectItem>
      );
    }}</MultiSelect>
  );
}
