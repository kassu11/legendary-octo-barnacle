export const translateInternalSearchParams = {

  sort: {
    id:                   { ani: { sort: "ID"                              } },
    id_desc:              { ani: { sort: "ID_DESC"                         } },
    title_romaji:         { ani: { sort: "TITLE_ROMAJI"                    } },
    title_romaji_desc:    { ani: { sort: "TITLE_ROMAJI_DESC"               } },
    title_english:        { ani: { sort: "TITLE_ENGLISH"                   } },
    title_english_desc:   { ani: { sort: "TITLE_ENGLISH_DESC"              } },
    title_native:         { ani: { sort: "TITLE_NATIVE"                    } },
    title_native_desc:    { ani: { sort: "TITLE_NATIVE_DESC"               } },
    type:                 { ani: { sort: "TYPE"                            } },
    type_desc:            { ani: { sort: "TYPE_DESC"                       } },
    format:               { ani: { sort: "FORMAT"                          } },
    format_desc:          { ani: { sort: "FORMAT_DESC"                     } },
    start_date:           { ani: { sort: "START_DATE"                      } },
    start_date_desc:      { ani: { sort: "START_DATE_DESC"                 } },
    end_date:             { ani: { sort: "END_DATE"                        } },
    end_date_desc:        { ani: { sort: "END_DATE_DESC"                   } },
    score:                { ani: { sort: "SCORE"                           } },
    score_desc:           { ani: { sort: "SCORE_DESC"                      } },
    popularity:           { ani: { sort: "POPULARITY"                      } },
    popularity_desc:      { ani: { sort: "POPULARITY_DESC"                 } },
    trending:             { ani: { sort: "TRENDING"                        } },
    trending_desc:        { ani: { sort: "TRENDING_DESC"                   } },
    episodes:             { ani: { sort: "EPISODES"                        } },
    episodes_desc:        { ani: { sort: "EPISODES_DESC"                   } },
    duration:             { ani: { sort: "DURATION"                        } },
    duration_desc:        { ani: { sort: "DURATION_DESC"                   } },
    status:               { ani: { sort: "STATUS"                          } },
    status_desc:          { ani: { sort: "STATUS_DESC"                     } },
    chapters:             { ani: { sort: "CHAPTERS"                        } },
    chapters_desc:        { ani: { sort: "CHAPTERS_DESC"                   } },
    volumes:              { ani: { sort: "VOLUMES"                         } },
    volumes_desc:         { ani: { sort: "VOLUMES_DESC"                    } },
    updated_at:           { ani: { sort: "UPDATED_AT"                      } },
    updated_at_desc:      { ani: { sort: "UPDATED_AT_DESC"                 } },
    search_match:         { ani: { sort: "SEARCH_MATCH"                    } },
    favourites:           { ani: { sort: "FAVOURITES"                      } },
    favourites_desc:      { ani: { sort: "FAVOURITES_DESC"                 } },

    // Custom sorts
    popularity_plus_desc: { ani: { sort: ["POPULARITY_DESC", "SCORE_DESC"] } },
    score_plus:           { ani: { sort: "SCORE", averageScoreGreater: 0   } },
  },

  onList: {
    false: { ani: { onList: false } },
    true: { ani: { onList: true  } },
  },

  status: {
    complete:         { ani: { status: "FINISHED"         }, },
    not_yet_released: { ani: { status: "NOT_YET_RELEASED" }, },
  },

  format: {
    light_novel: { ani: { format: "NOVEL"    } },
    manga:       { ani: { format: "MANGA"    } },
    manhwa:      { ani: { format: "manhwa"   } },
    movie:       { ani: { format: "MOVIE"    } },
    music:       { ani: { format: "MUSIC"    } },
    novel:       { ani: { format: "NOVEL"    } },
    ona:         { ani: { format: "ONA"      } },
    one_shot:    { ani: { format: "ONE_SHOT" } },
    ova:         { ani: { format: "OVA"      } },
    special:     { ani: { format: "SPECIAL"  } },
    tv:          { ani: { format: "TV"       } },
    tv_short:    { ani: { format: "TV_SHORT" } },
  },

  source: {
    anime:              { ani: { source: "ANIME"              } },
    comic:              { ani: { source: "COMIC"              } },
    doujinshi:          { ani: { source: "DOUJINSHI"          } },
    game:               { ani: { source: "GAME"               } },
    light_novel:        { ani: { source: "LIGHT_NOVEL"        } },
    live_action:        { ani: { source: "LIVE_ACTION"        } },
    manga:              { ani: { source: "MANGA"              } },
    multimedia_project: { ani: { source: "MULTIMEDIA_PROJECT" } },
    novel:              { ani: { source: "NOVEL"              } },
    original:           { ani: { source: "ORIGINAL"           } },
    other:              { ani: { source: "OTHER"              } },
    picture_book:       { ani: { source: "PICTURE_BOOK"       } },
    video_game:         { ani: { source: "VIDEO_GAME"         } },
    visual_novel:       { ani: { source: "VISUAL_NOVEL"       } },
    web_novel:          { ani: { source: "WEB_NOVEL"          } },
  },

  season: {
    WINTER: { ani: { season: "WINTER" } },
    SPRING: { ani: { season: "SPRING" } },
    SUMMER: { ani: { season: "SUMMER" } },
    FALL:   { ani: { season: "FALL"   } },
    [null]: { ani: { season: null     } },
  },

  endDateGreater: {
    _default: (api, value) => {
      if (value === undefined) return;
      if (api === "ani") return { endDateGreater: value };
    },
  },

  countryOfOrigin: {
    _default: (api, value) => {
      if (value === undefined) return;
      if (api === "ani") return { countryOfOrigin: value };
    },
  }

};
