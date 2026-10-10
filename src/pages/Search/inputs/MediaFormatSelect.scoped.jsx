import { useSearchParams, useParams, useNavigate } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { arrayUtils } from "../../../utils/utils.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import "./MediaFormatSelect.scoped.css"
import { Checkbox } from "../Checkbox.scoped.jsx";

export function MediaFormatSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

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
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
    }
    if (e.oldUrl || !e.target) return;

    const newActiveValues = [...formatValues()];
    const index = newActiveValues.findIndex(val => val.id === e.target);

    if (index == -1) {
      newActiveValues.push({ id: e.target, value: true });
    } else {
      newActiveValues.splice(index, 1);
    }

    setSearchParams({ format: newActiveValues.map(e => e.id) }, { replace: true });

    if (newActiveValues.length === 0) {
      const header = params.header;
      // Remove headers that add formats
      if (header === "novel" || header === "finished-manga" || header === "finished-novel") {
        const path = window.location.href.split(__BASE__)[1].replace(/\/novel|finished-manga|finished-novel/, "");
        navigate(path);
      }
    }

  };

  return (
    <MultiSelect each={formatOptions()} value={formatValues()} onChange={handleChange} button="Format">{entry => {
      return (
        <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <Checkbox checked={entry.value} />

          <p>{entry.description}</p>
        </div>
      );
    }}</MultiSelect>
  );
}
