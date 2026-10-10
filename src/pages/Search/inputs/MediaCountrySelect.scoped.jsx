import { useSearchParams, useParams, useNavigate } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { arrayUtils } from "../../../utils/utils.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import "./MediaCountrySelect.scoped.css"
import { Checkbox } from "../Checkbox.scoped.jsx";

export function MediaCountrySelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

  const countryOptions = [
    { description: "China",       id: "CN" },
    { description: "Japan",       id: "JP" },
    { description: "South Korea", id: "KR" },
    { description: "Taiwan",      id: "TW" },
  ];

  const countryValues = createMemo(() => {
    return arrayUtils.wrapToArray(parsedSearchParams().country).map(id => ({ id, value: true }));
  });

  const handleChange = e => {
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
    }
    if (e.oldUrl || !e.target) return;

    const newActiveValues = [...countryValues()];
    const index = newActiveValues.findIndex(val => val.id === e.target);

    if (index == -1) {
      newActiveValues.push({ id: e.target, value: true });
    } else {
      newActiveValues.splice(index, 1);
    }

    setSearchParams({ country: newActiveValues.map(e => e.id) }, { replace: true });

    if (newActiveValues.length === 0) {
      const header = params.header;
      // Remove headers that add country
      if (header === "manhwa") {
        const path = window.location.href.split(__BASE__)[1].replace("/manhwa", "");
        navigate(path);
      }
    }

  };

  return (
    <MultiSelect each={countryOptions} value={countryValues()} onChange={handleChange} button="Country">{entry => {
      return (
        <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <Checkbox checked={entry.value} />


          <p>{entry.description}</p>
        </div>
      );
    }}</MultiSelect>
  );
}
