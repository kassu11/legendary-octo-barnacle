import { useSearchParams, useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { arrayUtils } from "../../../utils/utils.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import { Checkbox } from "../Checkbox.scoped.jsx";
import { useNavigateAndSearch } from "../../../utils/urlUtils.js";
import { MediaSelectItem } from "./MediaSelectItem.scoped.jsx";

export function MediaFormatSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigateAndSearch();

  const formatOptions = createMemo(() => {
    const { type } = params;

    const options = [];

    if (type === "anime" || type === "media") {
      options.push({ description: "Movie",       id: "movie",       });
      options.push({ description: "Music",       id: "music",       });
      options.push({ description: "ONA",         id: "ona",         });
      options.push({ description: "OVA",         id: "ova",         });
      options.push({ description: "Special",     id: "special",     });
      options.push({ description: "TV",          id: "tv",          });
      options.push({ description: "TV Short",    id: "tv_short",    });
    }
    if (type === "manga" || type === "media") {
      options.push({ description: "Light Novel", id: "light_novel", });
      options.push({ description: "Manga",       id: "manga",       });
      options.push({ description: "One-Shot",    id: "one_shot",    });
    }

    return options.sort((a, b) => a.description.localeCompare(b.description));

  });

  const formatValues = createMemo(() => {
    return arrayUtils.wrapToArray(parsedSearchParams().format).map(id => ({ id, value: true }));
  });

  const handleChange = e => {

    if (e.oldUrl) return navigate(e.oldUrl);
    if (!e.target) return;

    const newActiveValues = [...formatValues()];
    const index = newActiveValues.findIndex(val => val.id === e.target);

    if (index == -1) {
      newActiveValues.push({ id: e.target, value: true });
    } else {
      newActiveValues.splice(index, 1);
    }

    const header = params.header || "";
    // 1. Remove a header that adds a format, but keep all other header values
    if (/\/novel|finished-manga|finished-novel/.test(header)) {
      const { sort, status } = parsedSearchParams();
      navigate(path => path.replace("/" + header, ""), { sort, status, format: newActiveValues.map(e => e.id) }, { replace: true });
    }
    // 2. Normal just change the format
    else {
      setSearchParams(                                 {               format: newActiveValues.map(e => e.id) }, { replace: true });
    }

  };

  return (
    <MultiSelect each={formatOptions()} value={formatValues()} onChange={handleChange} button="Format">{entry => {
      return (
        <MediaSelectItem classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <Checkbox checked={entry.value} />
          <p>{entry.description}</p>
        </MediaSelectItem>
      );
    }}</MultiSelect>
  );
}
