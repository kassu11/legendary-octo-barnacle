import { useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import { Checkbox } from "../Checkbox.scoped.jsx";
import { useNavigateAndSearch } from "../../../utils/urlUtils.js";
import { MediaSelectItem } from "./MediaSelectItem.scoped.jsx";

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

    if (e.oldUrl) return navigate(e.oldUrl);
    if (!e.target) return;

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
        <MediaSelectItem classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <Checkbox radio={!entry.value} checked={entry.value} />
          <p>{entry.description}%</p>
        </MediaSelectItem>
      );
    }}</MultiSelect>
  );
}
