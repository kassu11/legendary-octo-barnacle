import { useSearchParams, useParams, useNavigate } from "@solidjs/router";
import { createMemo, Show, Switch, Match } from "solid-js";
import SortAlphabetDescendingIcon from "../../assets/SortAlphaDown";
import SortAlphabetAscendingIcon from "../../assets/SortAlphaUp";
import SortNumericDescendingIcon from "../../assets/SortNumericDown";
import SortNumericAscendingIcon from "../../assets/SortNumericUp";
import { useParsedSearchParams } from "../../context/providers";
import { arrayUtils } from "../../utils/utils";
import { MultiSelect } from "./MultiSelect.scoped";
import "./MediaSortSelect.scoped.css"

export function MediaSortSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

  // Note: These sort options have been removed because they did not work: format, title_english_desc, title_native,
  const sortOptions = createMemo(() => {
    const { type } = params;

    const options = [
      { description: "Duration", id: "duration", type: "numeric", values: ["duration_desc_plus", "duration_plus",] },
      { description: "Favourites", id: "favourites", type: "numeric", values: ["favourites_desc", "favourites",] },
      { description: "Finished Date", id: "end_date", type: "numeric", values: ["end_date_desc_plus", "end_date_plus",] },
      { description: "ID", id: "id", type: "numeric", values: ["id_desc", "id",] },
      { description: "Last Updated", id: "updated_at", type: "numeric", values: ["updated_at_desc", "updated_at",] },
      { description: "Popularity", id: "popularity", type: "numeric", values: ["popularity_desc", "popularity",] },
      { description: "Score", id: "score", type: "numeric", values: ["score_desc_plus", "score_plus",] },
      { description: "Starting Date", id: "start_date", type: "numeric", values: ["start_date_desc_plus", "start_date_plus",] },
      { description: "Status", id: "status", type: "alphabetic", values: ["status_desc", "status",] },
      { description: "Title English", id: "title_english", type: "alphabetic", values: ["title_english",] },
      { description: "Title Romaji", id: "title_romaji", type: "alphabetic", values: ["title_romaji", "title_romaji_desc",] },
      { description: "Trending", id: "trending", type: "numeric", values: ["trending_desc", "trending",] },
    ];

    if (type === "media") {
      options.push({ description: "Chapters / Episodes", id: "progress", type: "numeric", values: ["progress_desc_plus", "progress_plus"] });
      options.push({ description: "Type", id: "type", type: "alphabetic", values: ["type_desc", "type"] });
    } else if (type === "anime") {
      options.push({ description: "Episodes", id: "progress", type: "numeric", values: ["progress_desc_plus", "progress_plus"] });
    } else if (type === "manga") {
      options.push({ description: "Chapters", id: "progress", type: "numeric", values: ["progress_desc_plus", "progress_plus"] });
      options.push({ description: "Volumes", id: "volumes", type: "numeric", values: ["volumes_desc_plus", "volumes_plus"] });
    }

    return options.sort((a, b) => a.description.localeCompare(b.description));

  });

  const sortValues = createMemo(() => {
    const values = [];
    const cache = {};
    const sort = parsedSearchParams().sort || [];
    sort.forEach(value => {
      const key = value.replace(/_desc|_plus/g, "");
      if (key === "format") return;

      const obj = cache[key] || {};
      obj.value = value;

      if (obj.id) return;

      values.push(obj);
      obj.id = key;
    });

    return values;
  });

  const handleChange = e => {
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
      return;
    }

    const newActiveValues = [...sortValues()];
    // No shift, so replace old items
    if (!e.shiftKey) newActiveValues.length = 0;

    const index = newActiveValues.findIndex(val => val.id === e.target);

    const valueIndex = e.entry.values.indexOf(e.entry.value);
    const nextValue = arrayUtils.at(e.entry.values, valueIndex + 1);

    // New item
    if (index == -1) {
      newActiveValues.push({ id: e.target, value: nextValue });
    } else {
      newActiveValues[index].value = nextValue;
    }

    setSearchParams({ sort: newActiveValues.map(e => e.value) }, { replace: true });

  };

  return (
    <MultiSelect each={sortOptions()} value={sortValues()} onChange={handleChange} button="Sort">{entry => {
      return (
        <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <div class="icon-wrapper">
            <Show when={entry.value}>

              <Switch>

                <Match when={entry.value.includes("_desc")}>
                  <Switch>
                    <Match when={entry.type === "numeric"}>
                      <SortNumericDescendingIcon scoped />
                    </Match>
                    <Match when={entry.type === "alphabetic"}>
                      <SortAlphabetDescendingIcon scoped />
                    </Match>
                  </Switch>
                </Match>

                <Match when={true}>
                  <Switch>
                    <Match when={entry.type === "numeric"}>
                      <SortNumericAscendingIcon scoped />
                    </Match>
                    <Match when={entry.type === "alphabetic"}>
                      <SortAlphabetAscendingIcon scoped />
                    </Match>
                  </Switch>
                </Match>

              </Switch>

            </Show>
          </div>

          <p>{entry.description}</p>
          <Show when={entry.order}>
            <div class="order">
              <span>{entry.order}</span>
            </div>
          </Show>
        </div>
      );
    }}</MultiSelect>
  );
}

