import { useSearchParams, useParams, useNavigate } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { arrayUtils } from "../../../utils/utils.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import "./MediaStatusSelect.scoped.css"
import { Checkbox } from "../Checkbox.scoped.jsx";

export function MediaStatusSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

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
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
      return;
    }

    const newActiveValues = [...statusValues()];
    const index = newActiveValues.findIndex(val => val.id === e.target);

    if (index == -1) {
      newActiveValues.push({ id: e.target, value: true });
    } else {
      newActiveValues.splice(index, 1);
    }

    setSearchParams({ status: newActiveValues.map(e => e.id) }, { replace: true });

    if (newActiveValues.length === 0) {
      const header = params.header;
      // Remove headers that add statuses
      if (header === "finished" || header === "finished-manga" || header === "finished-novel") {
        const path = window.location.href.split(__BASE__)[1].replace(/\/finished|finished-manga|finished-novel/, "");
        navigate(path);
      }
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
