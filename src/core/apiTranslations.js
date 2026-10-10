export const translateInternalApiParams = {

  sort: {
    id:                 { ani: { sort: "ID"                                    } },
    id_desc:            { ani: { sort: "ID_DESC"                               } },
    title_romaji:       { ani: { sort: "TITLE_ROMAJI"                          } },
    title_romaji_desc:  { ani: { sort: "TITLE_ROMAJI_DESC"                     } },
    title_english:      { ani: { sort: "TITLE_ENGLISH"                         } },
    title_english_desc: { ani: { sort: "TITLE_ENGLISH_DESC"                    } },
    title_native:       { ani: { sort: "TITLE_NATIVE"                          } },
    title_native_desc:  { ani: { sort: "TITLE_NATIVE_DESC"                     } },
    type:               { ani: { sort: "TYPE"                                  } },
    type_desc:          { ani: { sort: "TYPE_DESC"                             } },
    format:             { ani: { sort: "FORMAT"                                } },
    format_desc:        { ani: { sort: "FORMAT_DESC"                           } },
    start_date:         { ani: { sort: "START_DATE"                            } },
    start_date_desc:    { ani: { sort: "START_DATE_DESC"                       } },
    end_date:           { ani: { sort: "END_DATE"                              } },
    end_date_desc:      { ani: { sort: "END_DATE_DESC"                         } },
    score:              { ani: { sort: "SCORE"                                 } },
    score_desc:         { ani: { sort: "SCORE_DESC"                            } },
    popularity:         { ani: { sort: "POPULARITY"                            } },
    popularity_desc:    { ani: { sort: "POPULARITY_DESC"                       } },
    trending:           { ani: { sort: "TRENDING"                              } },
    trending_desc:      { ani: { sort: "TRENDING_DESC"                         } },
    duration:           { ani: { sort: "DURATION"                              } },
    duration_desc:      { ani: { sort: "DURATION_DESC"                         } },
    status:             { ani: { sort: "STATUS"                                } },
    status_desc:        { ani: { sort: "STATUS_DESC"                           } },
    progress:           { ani: { sort: "EPISODES"                              } },
    progress_desc:      { ani: { sort: "EPISODES_DESC"                         } },
    volumes:            { ani: { sort: "VOLUMES"                               } },
    volumes_desc:       { ani: { sort: "VOLUMES_DESC"                          } },
    updated_at:         { ani: { sort: "UPDATED_AT"                            } },
    updated_at_desc:    { ani: { sort: "UPDATED_AT_DESC"                       } },
    search_match:       { ani: { sort: "SEARCH_MATCH"                          } },
    favourites:         { ani: { sort: "FAVOURITES"                            } },
    favourites_desc:    { ani: { sort: "FAVOURITES_DESC"                       } },

    // Custom sorts
    score_plus:         { ani: { sort: "SCORE",         averageScoreGreater: 0 } },
    score_desc_plus:    { ani: { sort: "SCORE_DESC",    averageScoreGreater: 0 } },

    progress_plus:      { ani: { sort: "EPISODES",      episodeGreater: 0      } },
    progress_desc_plus: { ani: { sort: "EPISODES_DESC", episodeGreater: 0      } },

    duration_plus:      { ani: { sort: "DURATION",      durationGreater: 0     } },
    duration_desc_plus: { ani: { sort: "DURATION_DESC", durationGreater: 0     } },

    end_date_plus:      { ani: { sort: "END_DATE",      endDateGreater: 0      } },
    end_date_desc_plus: { ani: { sort: "END_DATE_DESC", endDateGreater: 0      } },

    start_date_plus:      { ani: { sort: "START_DATE",      yearGreater: 0     } },
    start_date_desc_plus: { ani: { sort: "START_DATE_DESC", yearGreater: 0     } },

    volumes_plus:       { ani: { sort: "VOLUMES",      volumeGreater: 0        } },
    volumes_desc_plus:  { ani: { sort: "VOLUMES_DESC", volumeGreater: 0        } },
  },

  onList: {
    false: { ani: { onList: false } },
    true:  { ani: { onList: true  } },
  },

  licensed: {
    false: { ani: { isLicensed: false } },
    true:  { ani: { isLicensed: true  } },
  },

  status: {
    cancelled:        { ani: { statusIn: "CANCELLED"        }, },
    complete:         { ani: { statusIn: "FINISHED"         }, },
    hiatus:           { ani: { statusIn: "HIATUS"           }, },
    not_yet_released: { ani: { statusIn: "NOT_YET_RELEASED" }, },
    releasing:        { ani: { statusIn: "RELEASING"        }, },
  },

  format: {
    light_novel: { ani: { format: "NOVEL"    } },
    manga:       { ani: { format: "MANGA"    } },
    movie:       { ani: { format: "MOVIE"    } },
    music:       { ani: { format: "MUSIC"    } },
    ona:         { ani: { format: "ONA"      } },
    one_shot:    { ani: { format: "ONE_SHOT" } },
    ova:         { ani: { format: "OVA"      } },
    special:     { ani: { format: "SPECIAL"  } },
    tv:          { ani: { format: "TV"       } },
    tv_short:    { ani: { format: "TV_SHORT" } },
  },

  source: {
    anime:              { ani: { sourceIn: "ANIME"              } },
    comic:              { ani: { sourceIn: "COMIC"              } },
    doujinshi:          { ani: { sourceIn: "DOUJINSHI"          } },
    game:               { ani: { sourceIn: "GAME"               } },
    light_novel:        { ani: { sourceIn: "LIGHT_NOVEL"        } },
    live_action:        { ani: { sourceIn: "LIVE_ACTION"        } },
    manga:              { ani: { sourceIn: "MANGA"              } },
    multimedia_project: { ani: { sourceIn: "MULTIMEDIA_PROJECT" } },
    novel:              { ani: { sourceIn: "NOVEL"              } },
    original:           { ani: { sourceIn: "ORIGINAL"           } },
    other:              { ani: { sourceIn: "OTHER"              } },
    picture_book:       { ani: { sourceIn: "PICTURE_BOOK"       } },
    video_game:         { ani: { sourceIn: "VIDEO_GAME"         } },
    visual_novel:       { ani: { sourceIn: "VISUAL_NOVEL"       } },
    web_novel:          { ani: { sourceIn: "WEB_NOVEL"          } },
  },

  season: {
    winter: { ani: { season: "WINTER"                            } },
    spring: { ani: { season: "SPRING"                            } },
    summer: { ani: { season: "SUMMER"                            } },
    fall:   { ani: { season: "FALL"                              } },
    tba:    { ani: { season: null, statusIn: "NOT_YET_RELEASED", } },
  },

  age: {
    any:  { ani: { isAdult: undefined } }, // Any rating
    g:    {                             }, // G - All ages (jikan)
    pg:   {                             }, // PG - Children (jikan)
    pg13: {                             }, // PG-13 - Teen 13 or older (jikan)
    r17:  {                             }, // R - 17+ (violence & profanity) (jikan)
    r:    { ani: { isAdult: false     } }, // R+ - (violence, profanity & mild nudity)
    rx:   { ani: { isAdult: true      } }, // Rx - Hentai
  },

  endDateGreater: {
    _default: (api, value) => {
      if (value === undefined) return;
      if (api === "ani") return { endDateGreater: value };
    },
  },

  country: {
    _default: (api, value) => {
      if (value === undefined) return;
      if (api === "ani") return { countryOfOriginIn: value };
    },
  },

  yearGreater: {
    _default: (api, value) => {
      if (value === undefined) return;
      if (api === "ani") return { yearGreater: Number(`${value - 1}9999`)};
    },
  },

  yearLesser: {
    _default: (api, value) => {
      if (value === undefined) return;
      if (api === "ani") return { yearLesser: Number(`${value + 1}0000`)};
    },
  },

  progressGreater: {
    _default: (api, value) => {
      if (value === undefined) return;
      if (api === "ani") return { episodeGreater: value };
    },
  },

  progressLesser: {
    _default: (api, value) => {
      if (value === undefined) return;
      if (api === "ani") return { episodeLesser: value };
    },
  },

  progress: {
    _default: (api, value) => {
      if (value === undefined) return;
      if (api === "ani") return { episodeGreater: value - 1, episodeLesser: value + 1 };
    },
  },

  q: {
    _default: (api, value) => {
      value = value?.toLowerCase().trim() || undefined;
      if (api === "ani") return { search: value }
    },
  },

};

export const translateToInternalSearchParams = {

  format: {
    NOVEL: "light_novel",
    MANGA: "manga",
    manhwa: "manhwa",
    MOVIE: "movie",
    MUSIC: "music",
    ONA: "ona",
    ONE_SHOT: "one_shot",
    OVA: "ova",
    SPECIAL: "special",
    TV: "tv",
    TV_SHORT: "tv_short",
  },

  source: {
    ANIME: "anime",
    COMIC: "comic",
    DOUJINSHI: "doujinshi",
    GAME: "game",
    LIGHT_NOVEL: "light_novel",
    LIVE_ACTION: "live_action",
    MANGA: "manga",
    MULTIMEDIA_PROJECT: "multimedia_project",
    NOVEL: "novel",
    ORIGINAL: "original",
    OTHER: "other",
    PICTURE_BOOK: "picture_book",
    VIDEO_GAME: "video_game",
    VISUAL_NOVEL: "visual_novel",
    WEB_NOVEL: "web_novel",
  },

};
