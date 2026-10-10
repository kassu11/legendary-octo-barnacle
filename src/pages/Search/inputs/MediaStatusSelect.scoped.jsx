import { useSearchParams, useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { arrayUtils } from "../../../utils/utils.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import "./MediaStatusSelect.scoped.css"
import { Checkbox } from "../Checkbox.scoped.jsx";
import { useNavigateAndSearch } from "../../../utils/urlUtils.js";

export function MediaStatusSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigateAndSearch();

  const statusOptions = createMemo(() => {
    const { type } = params;

    const options = [
      { description: "Cancelled",        id: "cancelled"        },
      { description: "Complete",         id: "complete"         },
      { description: "Not Yet Released", id: "not_yet_released" },
      { description: "Releasing",        id: "releasing"        },
    ];

    if (type === "manga") {
      options.push({ description: "Hiatus", id: "HIATUS" });
    }

    return options.sort((a, b) => a.description.localeCompare(b.description));

  });

  const statusValues = createMemo(() => {
    return arrayUtils.wrapToArray(parsedSearchParams().status).map(id => ({ id, value: true }));
  });

  const handleChange = e => {

    if (e.oldUrl) return navigate(e.oldUrl);
    if (!e.target) return;

    const newActiveValues = [...statusValues()];
    const index = newActiveValues.findIndex(val => val.id === e.target);

    if (index == -1) {
      newActiveValues.push({ id: e.target, value: true });
    } else {
      newActiveValues.splice(index, 1);
    }

    const header = params.header || "";
    // 1. Remove a header that adds a status, but keep all other header values
    if (/\/novel|finished-manga|finished-novel/.test(header)) {
      const { sort, format } = parsedSearchParams();
      navigate(path => path.replace("/" + header, ""), { sort, format, status: newActiveValues.map(e => e.id) }, { replace: true });
    }
    // 2. Normal just change the status
    else {
      setSearchParams(                                 {               status: newActiveValues.map(e => e.id) }, { replace: true });
    }

  };

  return (
    <MultiSelect each={statusOptions()} value={statusValues()} onChange={handleChange} button="Status">{entry => {
      return (
        <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <Checkbox checked={entry.value} />
          <p>{entry.description}</p>
        </div>
      );
    }}</MultiSelect>
  );
}
