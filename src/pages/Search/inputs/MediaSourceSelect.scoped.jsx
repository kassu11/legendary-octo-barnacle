import { useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { useParsedSearchParams } from "@/state/providers.js";
import { arrayUtils } from "@/utils/utils.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { SourceIcon } from "@/assets/SearchFilterIcons.jsx";

export function MediaSourceSelect() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();

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
    return [...arrayUtils.wrapToArray(parsedSearchParams().source)];
  });

  return (
    <FilterSelect param="source" noEscapeCancel tooltip="The original material the media was adapted from" each={sourceOptions} value={sourceValues()} setSearchParams={query => setSearchParams(query, { replace: true })} icon={<SourceIcon />} button="Source" />
  );
}
