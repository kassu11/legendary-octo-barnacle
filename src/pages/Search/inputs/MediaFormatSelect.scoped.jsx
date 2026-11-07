import { useSearchParams, useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "@/context/providers.js";
import { arrayUtils } from "@/utils/utils.js";
import { MultiSelect } from "./MultiSelect.scoped.jsx";
import { FormatIcon } from "@/assets/SearchFilterIcons.jsx";
import { Checkbox } from "@/components/ui/Checkbox.scoped.jsx";
import { useNavigateAndSearch } from "@/utils/urlUtils.js";
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
      options.push({ description: "Movie",       id: "movie",    tooltip: "Feature length film, usually released in theaters"         });
      options.push({ description: "Music",       id: "music",    tooltip: "Short anime music video"                                   });
      options.push({ description: "ONA",         id: "ona",      tooltip: "Original Net Animation, released online"                   });
      options.push({ description: "OVA",         id: "ova",      tooltip: "Original Video Animation, released directly on home video" });
      options.push({ description: "Special",     id: "special",  tooltip: "Special episodes, often released alongside a TV series"    });
      options.push({ description: "TV",          id: "tv",       tooltip: "Anime series broadcast on television"                      });
      options.push({ description: "TV Short",    id: "tv_short", tooltip: "TV series with episodes shorter than 15 minutes"           });
    }
    if (type === "manga" || type === "media") {
      options.push({ description: "Light Novel", id: "light_novel", tooltip: "Japanese prose novels with illustrations"               });
      options.push({ description: "Manga",       id: "manga",       tooltip: "Japanese comics, also includes manhwa and manhua"       });
      options.push({ description: "One-Shot",    id: "one_shot",    tooltip: "Manga with a single chapter"                            });
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
    <MultiSelect tooltip="How the media was released, e.g. TV series, movie, manga or light novel" each={formatOptions()} value={formatValues()} onChange={handleChange} icon={<FormatIcon />} button="Format">{entry => {
      return (
        <MediaSelectItem classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }} tooltip={entry.tooltip}>
          <Checkbox checked={entry.value} />
          <p>{entry.description}</p>
        </MediaSelectItem>
      );
    }}</MultiSelect>
  );
}
