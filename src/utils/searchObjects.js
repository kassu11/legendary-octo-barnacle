export const sortOrders = {
  mal: {
    anime: {
      end_date: { api: "end_date", flavorText: "End date", alternative_key: "end_date_filtered" },
      episodes: { api: "episodes", flavorText: "Episodes", alternative_key: "episodes_filtered" },
      favorites: { api: "favorites", flavorText: "Favorites" },
      id: { api: "mal_id", flavorText: "ID" },
      popularity: { api: "popularity", flavorText: "Popularity", reverse: true },
      rank: { api: "rank", flavorText: "Rank" },
      scored_by: { api: "scored_by", flavorText: "Ratings" },
      score: { api: "score", flavorText: "Score" },
      start_date: { api: "start_date", flavorText: "Start date", alternative_key: "start_date_filtered" },
      title: { api: "title", flavorText: "Title" },
    },
    manga: {
      episodes: { api: "chapters", flavorText: "Chapters", alternative_key: "episodes_filtered" },
      end_date: { api: "end_date", flavorText: "End date", alternative_key: "end_date_filtered" },
      favorites: { api: "favorites", flavorText: "Favorites" },
      id: { api: "mal_id", flavorText: "ID" },
      popularity: { api: "popularity", flavorText: "Popularity", reverse: true },
      rank: { api: "rank", flavorText: "Rank" },
      scored_by: { api: "scored_by", flavorText: "Ratings" },
      score: { api: "score", flavorText: "Score" },
      start_date: { api: "start_date", flavorText: "Start date", alternative_key: "start_date_filtered" },
      title: { api: "title", flavorText: "Title" },
      volumes: { api: "volumes", flavorText: "Volumes", alternative_key: "volumes_filtered" },
    },
  },
  ani: {
    anime: {
      duration: { api: "DURATION", flavorText: "Duration", alternative_key: "duration_filtered" },
      end_date: { api: "END_DATE", flavorText: "End date", alternative_key: "end_date_filtered" },
      episodes: { api: "CHAPTERS", flavorText: "Episodes", alternative_key: "episodes_filtered" },
      favorites: { api: "FAVOURITES", flavorText: "Favorites" },
      id: { api: "ID", flavorText: "ID" },
      popularity: { api: "POPULARITY", flavorText: "Popularity" },
      score: { api: "SCORE", flavorText: "Score" },
      start_date: { api: "START_DATE", flavorText: "Start date", alternative_key: "start_date_filtered" },
      title_english: { api: "TITLE_ENGLISH", flavorText: "Title (English)" },
      title: { api: "TITLE_NATIVE", flavorText: "Title (Native)" },
      title_romaji: { api: "TITLE_ROMAJI", flavorText: "Title (Romaji)" },
      trending: { api: "TRENDING", flavorText: "Trending" },
      updated_at: { api: "UPDATED_AT", flavorText: "Updated" },
    },
    manga: {
      episodes: { api: "CHAPTERS", flavorText: "Chapters", alternative_key: "episodes_filtered" },
      end_date: { api: "END_DATE", flavorText: "End date", alternative_key: "end_date_filtered" },
      favorites: { api: "FAVOURITES", flavorText: "Favorites" },
      id: { api: "ID", flavorText: "ID" },
      popularity: { api: "POPULARITY", flavorText: "Popularity" },
      score: { api: "SCORE", flavorText: "Score" },
      start_date: { api: "START_DATE", flavorText: "Start date", alternative_key: "start_date_filtered" },
      title_english: { api: "TITLE_ENGLISH", flavorText: "Title (English)" },
      title: { api: "TITLE_NATIVE", flavorText: "Title (Native)" },
      title_romaji: { api: "TITLE_ROMAJI", flavorText: "Title (Romaji)" },
      trending: { api: "TRENDING", flavorText: "Trending" },
      updated_at: { api: "UPDATED_AT", flavorText: "Updated" },
      volumes: { api: "DURATION", flavorText: "Volumes", alternative_key: "volumes_filtered" },
    },
    media: {
      duration: { api: "DURATION", flavorText: "Duration / Volumes", alternative_key: "duration_filtered" },
      end_date: { api: "END_DATE", flavorText: "End date", alternative_key: "end_date_filtered" },
      episodes: { api: "CHAPTERS", flavorText: "Episodes / Chapters", alternative_key: "episodes_filtered" },
      favorites: { api: "FAVOURITES", flavorText: "Favorites" },
      id: { api: "ID", flavorText: "ID" },
      popularity: { api: "POPULARITY", flavorText: "Popularity" },
      score: { api: "SCORE", flavorText: "Score" },
      start_date: { api: "START_DATE", flavorText: "Start date", alternative_key: "start_date_filtered" },
      title: { api: "TITLE_NATIVE", flavorText: "Title (Native)" },
      title_english: { api: "TITLE_ENGLISH", flavorText: "Title (English)" },
      title_romaji: { api: "TITLE_ROMAJI", flavorText: "Title (Romaji)" },
      trending: { api: "TRENDING", flavorText: "Trending" },
      updated_at: { api: "UPDATED_AT", flavorText: "Updated" },
    }
  }
};
sortOrders.flavorTexts = extractFlavorTexts(sortOrders);


export const searchFormats = {
  mal: {
    anime: {
      cm: { api: "cm", flavorText: "CM" },
      movie: { api: "movie", flavorText: "Movie" },
      music: { api: "music", flavorText: "Music" },
      ona: { api: "ona", flavorText: "ONA" },
      ova: { api: "ova", flavorText: "OVA" },
      pv: { api: "pv", flavorText: "PV" },
      special: { api: "special", flavorText: "Special" },
      tv: { api: "tv", flavorText: "TV" },
      tv_special: { api: "tv_special", flavorText: "TV special" }
    },
    manga: {
      doujin: { api: "doujin", flavorText: "Doujin" },
      lightnovel: { api: "lightnovel", flavorText: "Light novel" },
      manga: { api: "manga", flavorText: "Manga" },
      manhua: { api: "manhua", flavorText: "Manhua" },
      manhwa: { api: "manhwa", flavorText: "Manhwa" },
      novel: { api: "novel", flavorText: "Novel" },
      one_shot: { api: "oneshot", flavorText: "One-shot" }
    }
  },
  ani: {
    anime: {
      movie: { api: "MOVIE", flavorText: "Movie" },
      music: { api: "MUSIC", flavorText: "Music" },
      ona: { api: "ONA", flavorText: "ONA" },
      ova: { api: "OVA", flavorText: "OVA" },
      special: { api: "SPECIAL", flavorText: "Special" },
      tv: { api: "TV", flavorText: "TV" },
      tv_short: { api: "TV_SHORT", flavorText: "TV short" }
    },
    manga: {
      manga: { api: "MANGA", flavorText: "Manga" },
      lightnovel: { api: "NOVEL", flavorText: "Light novel" },
      one_shot: { api: "ONE_SHOT", flavorText: "One-shot" }
    },
    media: {
      manga: { api: "MANGA", flavorText: "Manga" },
      movie: { api: "MOVIE", flavorText: "Movie" },
      music: { api: "MUSIC", flavorText: "Music" },
      lightnovel: { api: "NOVEL", flavorText: "Light novel" },
      ona: { api: "ONA", flavorText: "ONA" },
      one_shot: { api: "ONE_SHOT", flavorText: "One-shot" },
      ova: { api: "OVA", flavorText: "OVA" },
      special: { api: "SPECIAL", flavorText: "Special" },
      tv: { api: "TV", flavorText: "TV" },
      tv_short: { api: "TV_SHORT", flavorText: "TV short" }
    }
  },
}
searchFormats.flavorTexts = extractFlavorTexts(searchFormats);


export const searchSeasons = {
  ani: {
    anime: {
      winter: { api: "WINTER", flavorText: "Winter" },
      spring: { api: "SPRING", flavorText: "Spring" },
      summer: { api: "SUMMER", flavorText: "Summer" },
      fall: { api: "FALL", flavorText: "Fall" },
      tba: { api: null, flavorText: "TBA" },
    },
  }
}
searchSeasons.flavorTexts = extractFlavorTexts(searchSeasons);



export const searchStatuses = {
  mal: {
    anime: {
      releasing: { api: "airing", flavorText: "Airing" },
      complete: { api: "complete", flavorText: "Complete" },
      upcoming: { api: "upcoming", flavorText: "Upcoming" },
    },
    manga: {
      cancelled: { api: "discontinued", flavorText: "Cancelled"},
      complete: { api: "complete", flavorText: "Complete"},
      hiatus: { api: "hiatus", flavorText: "Hiatus"},
      publishing: { api: "publishing", flavorText: "Publishing"},
      // upcoming: { api: "upcoming", flavorText: "Upcoming"}, // 30.5.2025 this is not supported, even though the docs says it is
    }
  },
  ani: {
    anime: {
      releasing: { api: "RELEASING", flavorText: "Airing"},
      cancelled: { api: "CANCELLED", flavorText: "Cancelled"},
      complete: { api: "FINISHED", flavorText: "Complete"},
      upcoming: { api: "NOT_YET_RELEASED", flavorText: "Upcoming"},
    },
    manga: {
      cancelled: { api: "CANCELLED", flavorText: "Cancelled"},
      complete: { api: "FINISHED", flavorText: "Complete"},
      hiatus: { api: "HIATUS", flavorText: "Hiatus"},
      upcoming: { api: "NOT_YET_RELEASED", flavorText: "Upcoming"},
      releasing: { api: "RELEASING", flavorText: "Releasing"},
    },
    media: {
      cancelled: { api: "CANCELLED", flavorText: "Cancelled"},
      complete: { api: "FINISHED", flavorText: "Complete"},
      hiatus: { api: "HIATUS", flavorText: "Hiatus"},
      upcoming: { api: "NOT_YET_RELEASED", flavorText: "Upcoming"},
      releasing: { api: "RELEASING", flavorText: "Releasing"},
    }
  },
}
searchStatuses.flavorTexts = extractFlavorTexts(searchStatuses);

export const searchCountries = {
  CN: { flavorText: "China" },
  JP: { flavorText: "Japan" },
  KR: { flavorText: "South Korea" },
  TW: { flavorText: "Taiwan" },
}

export const searchSources = {
  anime: { api: "ANIME", flavorText: "Anime"},
  comic: { api: "COMIC", flavorText: "Comic"},
  doujinshi: { api: "DOUJINSHI", flavorText: "Doujinshi"},
  game: { api: "GAME", flavorText: "Game"},
  light_novel: { api: "LIGHT_NOVEL", flavorText: "Light Novel"},
  live_action: { api: "LIVE_ACTION", flavorText: "Live Action"},
  manga: { api: "MANGA", flavorText: "Manga"},
  multimedia_project: { api: "MULTIMEDIA_PROJECT", flavorText: "Multimedia Project"},
  novel: { api: "NOVEL", flavorText: "Novel"},
  original: { api: "ORIGINAL", flavorText: "Original"},
  other: { api: "OTHER", flavorText: "Other"},
  picture_book: { api: "PICTURE_BOOK", flavorText: "Picture Book"},
  video_game: { api: "VIDEO_GAME", flavorText: "Video Game"},
  visual_novel: { api: "VISUAL_NOVEL", flavorText: "Visual Novel"},
  web_novel: { api: "WEB_NOVEL", flavorText: "Web Novel"},
}

function extractFlavorTexts(obj) {
  return Object.values(obj).reduce((acc, apis) => {
    return Object.values(apis).reduce((acc, medias) => {
      return Object.entries(medias).reduce((acc, [key, value]) => {
        return (acc[key] = value.flavorText, acc);
      }, acc);
    }, acc);
  }, {});
}
