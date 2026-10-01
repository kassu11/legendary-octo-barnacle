import { useSearchParams, useNavigate } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { useParsedSearchParams } from "../../context/providers";
import { arrayUtils } from "../../utils/utils";
import { MultiSelect } from "./MultiSelect.scoped";
import "./MediaAgeSelect.scoped.css"
import { CheckMarkIcon } from "../../assets/CheckMarkIcon";

export function MediaAgeSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
      return;
    }

    if (e.target === "r") setSearchParams({ age: undefined }, { replace: true });
    else setSearchParams({ age: e.target }, { replace: true });

  };

  return (
    <MultiSelect each={ageOptions} value={ageValues()} onChange={handleChange} button="Age">{entry => {
      return (
        <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <div class="checkbox" classList={{ checked: entry.value }}>
            <Show when={entry.value}>
              <CheckMarkIcon scoped />
            </Show>
          </div>

          <p>{entry.description}</p>
        </div>
      );
    }}</MultiSelect>
  );
}

