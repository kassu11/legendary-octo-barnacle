export const sortOrder = {
  mal: {
    anime: {
      end_date: { api: "end_date", flavor: "End date" },
      episodes: { api: "episodes", flavor: "Episodes" },
      favorites: { api: "favorites", flavor: "Favorites" },
      id: { api: "mal_id", flavor: "ID" },
      members: { api: "members", flavor: "Members" },
      popularity: { api: "popularity", flavor: "Popularity" },
      rank: { api: "rank", flavor: "Rank" },
      scored_by: { api: "scored_by", flavor: "Ratings" },
      score: { api: "score", flavor: "Score" },
      start_date: { api: "start_date", flavor: "Start date" },
      title: { api: "title", flavor: "Title" },
    },
    manga: {
      episodes: { api: "chapters", flavor: "Chapters" },
      end_date: { api: "end_date", flavor: "End date" },
      favorites: { api: "favorites", flavor: "Favorites" },
      id: { api: "mal_id", flavor: "ID" },
      members: { api: "members", flavor: "Members" },
      popularity: { api: "popularity", flavor: "Popularity" },
      rank: { api: "rank", flavor: "Rank" },
      scored_by: { api: "scored_by", flavor: "Ratings" },
      score: { api: "score", flavor: "Score" },
      start_date: { api: "start_date", flavor: "Start date" },
      title: { api: "title", flavor: "Title" },
      volumes: { api: "volumes", flavor: "Volumes" },
    },
  },
  ani: {
    anime: {
      duration: { api: "DURATION", flavor: "Duration" },
      end_date: { api: "END_DATE", flavor: "End date" },
      episodes: { api: "CHAPTERS", flavor: "Episodes" },
      favorites: { api: "FAVOURITES", flavor: "Favorites" },
      id: { api: "ID", flavor: "ID" },
      popularity: { api: "POPULARITY", flavor: "Popularity" },
      score: { api: "SCORE", flavor: "Score" },
      start_date: { api: "START_DATE", flavor: "Start date" },
      title_english: { api: "TITLE_ENGLISH", flavor: "Title (English)" },
      title: { api: "TITLE_NATIVE", flavor: "Title (Native)" },
      title_romaji: { api: "TITLE_ROMAJI", flavor: "Title (Romaji)" },
      trending: { api: "TRENDING", flavor: "Trending" },
      updated_at: { api: "UPDATED_AT", flavor: "Updated" },
    },
    manga: {
      episodes: { api: "CHAPTERS", flavor: "Chapters" },
      end_date: { api: "END_DATE", flavor: "End date" },
      favorites: { api: "FAVOURITES", flavor: "Favorites" },
      id: { api: "ID", flavor: "ID" },
      popularity: { api: "POPULARITY", flavor: "Popularity" },
      score: { api: "SCORE", flavor: "Score" },
      start_date: { api: "START_DATE", flavor: "Start date" },
      title_english: { api: "TITLE_ENGLISH", flavor: "Title (English)" },
      title: { api: "TITLE_NATIVE", flavor: "Title (Native)" },
      title_romaji: { api: "TITLE_ROMAJI", flavor: "Title (Romaji)" },
      trending: { api: "TRENDING", flavor: "Trending" },
      updated_at: { api: "UPDATED_AT", flavor: "Updated" },
      volumes: { api: "DURATION", flavor: "Volumes" },
    },
    media: {
      duration: { api: "DURATION", flavor: "Duration / Volumes" },
      end_date: { api: "END_DATE", flavor: "End date" },
      episodes: { api: "CHAPTERS", flavor: "Episodes / Chapters" },
      favorites: { api: "FAVOURITES", flavor: "Favorites" },
      id: { api: "ID", flavor: "ID" },
      popularity: { api: "POPULARITY", flavor: "Popularity" },
      score: { api: "SCORE", flavor: "Score" },
      start_date: { api: "START_DATE", flavor: "Start date" },
      title: { api: "TITLE_NATIVE", flavor: "Title (Native)" },
      title_english: { api: "TITLE_ENGLISH", flavor: "Title (English)" },
      title_romaji: { api: "TITLE_ROMAJI", flavor: "Title (Romaji)" },
      trending: { api: "TRENDING", flavor: "Trending" },
      updated_at: { api: "UPDATED_AT", flavor: "Updated" },
    }
  }
};


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
      novel: { api: "NOVEL", flavorText: "Light novel" },
      one_shot: { api: "ONE_SHOT", flavorText: "One-shot" }
    },
    media: {
      manga: { api: "MANGA", flavorText: "Manga" },
      movie: { api: "MOVIE", flavorText: "Movie" },
      music: { api: "MUSIC", flavorText: "Music" },
      novel: { api: "NOVEL", flavorText: "Light novel" },
      ona: { api: "ONA", flavorText: "ONA" },
      one_shot: { api: "ONE_SHOT", flavorText: "One-shot" },
      ova: { api: "OVA", flavorText: "OVA" },
      special: { api: "SPECIAL", flavorText: "Special" },
      tv: { api: "TV", flavorText: "TV" },
      tv_short: { api: "TV_SHORT", flavorText: "TV short" }
    }
  },
}

searchFormats.flavorTexts = Object.values(searchFormats).reduce((acc, apis) => {
  return Object.values(apis).reduce((acc, medias) => {
    return Object.entries(medias).reduce((acc, [key, value]) => {
      return (acc[key] = value.flavorText, acc);
    }, acc);
  }, acc);
}, {});
