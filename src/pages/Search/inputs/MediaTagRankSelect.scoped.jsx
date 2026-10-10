import { useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import "./MediaTagRankSelect.scoped.css"
import { Checkbox } from "../Checkbox.scoped.jsx";
import { useNavigateAndSearch } from "../../../utils/urlUtils.js";

export function MediaTagRankSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigateAndSearch();
  const startTagRank = 1;
  const endTagRank = 100;

  const tagRankOptions = createMemo(() => {
    const options = [];
    for (let i = endTagRank; i >= startTagRank; i--) {
      options.push({ description: "" + i, id: i });
    }

    return options;

  });

  const tagRankValues = createMemo(() => {
    const { rank } = parsedSearchParams();

    if (rank) return [...Array(Math.max(endTagRank - rank + 1, 0))].map((_, i) => ({ id: endTagRank - i, value: true }));
  });

  const handleChange = e => {
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
      return;
    }

    let { rank } = parsedSearchParams();
    if (rank != e.target) {
      setSearchParams({ rank: e.target }, { replace: true });
    } else {
      setSearchParams({ rank: undefined }, { replace: true });
    }

  };

  return (
    <MultiSelect each={tagRankOptions()} value={tagRankValues()} onChange={handleChange} button="Tag Rank">{entry => {
      return (
        <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <Checkbox radio={!entry.value} checked={entry.value} />

          <p>{entry.description}%</p>
        </div>
      );
    }}</MultiSelect>
  );
}
