import { useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { arrayUtils } from "../../../utils/utils.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import { Checkbox } from "../Checkbox.scoped.jsx";
import { useNavigateAndSearch } from "../../../utils/urlUtils.js";
import { MediaSelectItem } from "./MediaSelectItem.scoped.jsx";

export function MediaAgeSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigateAndSearch();

  const ageOptions = [
    { description: "Any Rating",                               id: "any" },
    { description: "R+ - (violence, profanity & mild nudity)", id: "r"   },
    { description: "Rx - Hentai",                              id: "rx"  },
  ];

  const ageValues = createMemo(() => {
    const listOfAges = arrayUtils.wrapToArray(parsedSearchParams().age);
    const firstValidAge = listOfAges.find(age => ageOptions.some(({id}) => id === age));
    const id = firstValidAge || "r";

    return [{ id, value: true }];
  });

  const handleChange = e => {

    if (e.oldUrl) return navigate(e.oldUrl);
    if (!e.target) return;

    if (e.target === "r") setSearchParams({ age: undefined }, { replace: true });
    else setSearchParams({ age: e.target }, { replace: true });

  };

  return (
    <MultiSelect each={ageOptions} value={ageValues()} onChange={handleChange} button="Age">{entry => {
      return (
        <MediaSelectItem classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <Checkbox radio checked={entry.value} />
          <p>{entry.description}</p>
        </MediaSelectItem>
      );
    }}</MultiSelect>
  );
}
