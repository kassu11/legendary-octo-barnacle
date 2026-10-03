import { useSearchParams, useNavigate } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "../../../context/providers.js";
import { arrayUtils } from "../../../utils/utils.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import "./MediaSourceSelect.scoped.css"
import { Checkbox } from "../Checkbox.scoped.jsx";

export function MediaSourceSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const sourceOptions = [
    { description: "Anime",              id: "anime"              },
    { description: "Comic",              id: "comic"              },
    { description: "Doujinshi",          id: "doujinshi"          },
    { description: "Game",               id: "game"               },
    { description: "Light Novel",        id: "light_novel"        },
    { description: "Live Action",        id: "live_action"        },
    { description: "Manga",              id: "manga"              },
    { description: "Multimedia Project", id: "multimedia_project" },
    { description: "Novel",              id: "novel"              },
    { description: "Original",           id: "original"           },
    { description: "Other",              id: "other"              },
    { description: "Picture Book",       id: "picture_book"       },
    { description: "Video Game",         id: "video_game"         },
    { description: "Visual Novel",       id: "visual_novel"       },
    { description: "Web Novel",          id: "web_novel"          },
  ];

  const sourceValues = createMemo(() => {
    return arrayUtils.wrapToArray(parsedSearchParams().source).map(id => ({ id, value: true }));
  });

  const handleChange = e => {
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
      return;
    }

    const newActiveValues = [...sourceValues()];
    const index = newActiveValues.findIndex(val => val.id === e.target);

    if (index == -1) {
      newActiveValues.push({ id: e.target, value: true });
    } else {
      newActiveValues.splice(index, 1);
    }

    setSearchParams({ source: newActiveValues.map(e => e.id) }, { replace: true });

  };

  return (
    <MultiSelect each={sourceOptions} value={sourceValues()} onChange={handleChange} button="Source">{entry => {
      return (
        <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
          <Checkbox checked={entry.value} />
          <p>{entry.description}</p>
        </div>
      );
    }}</MultiSelect>
  );
}

