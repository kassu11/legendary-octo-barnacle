import { useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { TagRankIcon } from "@/assets/SearchFilterIcons.jsx";

export function MediaTagRankSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const startTagRank = 1;
  const endTagRank = 100;

  const tagRankOptions = createMemo(() => {
    const options = [];
    for (let i = endTagRank; i >= startTagRank; i--) {
      options.push({ description: i + "%", id: "" + i });
    }

    return options;

  });

  const tagRankValues = createMemo(() => {
    const { rank } = parsedSearchParams();

    if (rank) return [...Array(Math.max(endTagRank - rank + 1, 0))].map((_, i) => "" + (endTagRank - i));
    return [];
  });

  const valueLabel = () => parsedSearchParams().rank ? `>${parsedSearchParams().rank - 1}` : undefined;

  const handlePick = id => {

    let { rank } = parsedSearchParams();
    if (rank != id) {
      setSearchParams({ rank: id }, { replace: true });
    } else {
      setSearchParams({ rank: undefined }, { replace: true });
    }

  };

  return (
    <FilterSelect radio param="rank" noEscapeCancel tooltip="Minimum tag relevance percentage. Higher values only match media where the selected tags are a major part of the story" each={tagRankOptions()} value={tagRankValues()} valueLabel={valueLabel()} onPick={handlePick} onClear={() => setSearchParams({ rank: undefined }, { replace: true })} icon={<TagRankIcon />} button="Tag Rank" />
  );
}
