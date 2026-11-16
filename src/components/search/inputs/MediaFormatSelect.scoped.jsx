import { useSearchParams, useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { arrayUtils } from "@/utils/utils.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { FormatIcon } from "@/assets/icons.jsx";
import { useNavigateAndSearch } from "@/utils/urlUtils.js";

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
    return [...arrayUtils.wrapToArray(parsedSearchParams().format)];
  });

  const handleChange = ({ format }) => {

    const header = params.header || "";
    // 1. Remove a header that adds a format, but keep all other header values
    if (/\/novel|finished-manga|finished-novel/.test(header)) {
      const { sort, status } = parsedSearchParams();
      navigate(path => path.replace("/" + header, ""), { sort, status, format }, { replace: true });
    }
    // 2. Normal just change the format
    else {
      setSearchParams(                                 {               format }, { replace: true });
    }

  };

  return (
    <FilterSelect param="format" noEscapeCancel tooltip="How the media was released, e.g. TV series, movie, manga or light novel" each={formatOptions()} value={formatValues()} setSearchParams={handleChange} icon={<FormatIcon />} button="Format" />
  );
}
