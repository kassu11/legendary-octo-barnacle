import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { arrayUtils } from "../../../utils/utils.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import { Checkbox } from "../Checkbox.scoped.jsx";
import { useNavigateAndSearch } from "../../../utils/urlUtils.js";
import { MediaSelectItem } from "./MediaSelectItem.scoped.jsx";

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
    return arrayUtils.wrapToArray(parsedSearchParams().country).map(id => ({ id, value: true }));
  });

  const handleChange = e => {

    if (e.oldUrl) return navigate(e.oldUrl);
    if (!e.target) return;

    const newActiveValues = [...countryValues()];
    const index = newActiveValues.findIndex(val => val.id === e.target);

    if (index == -1) {
      newActiveValues.push({ id: e.target, value: true });
    } else {
      newActiveValues.splice(index, 1);
    }

    // Set new country value, and remove header, if present
    navigate(path => path.replace("/manhwa", ""), { country: newActiveValues.map(e => e.id) }, { replace: true });

  };

  return (
    <MultiSelect each={countryOptions} value={countryValues()} onChange={handleChange} button="Country">{entry => {
      return (
        <MediaSelectItem classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <Checkbox checked={entry.value} />
          <p>{entry.description}</p>
        </MediaSelectItem>
      );
    }}</MultiSelect>
  );
}
