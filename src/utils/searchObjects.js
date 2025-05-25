export const sortOrders = {
  mal: {
    anime: {
      end_date: { api: "end_date", flavorText: "End date" },
      episodes: { api: "episodes", flavorText: "Episodes" },
      favorites: { api: "favorites", flavorText: "Favorites" },
      id: { api: "mal_id", flavorText: "ID" },
      members: { api: "members", flavorText: "Members" },
      popularity: { api: "popularity", flavorText: "Popularity" },
      rank: { api: "rank", flavorText: "Rank" },
      scored_by: { api: "scored_by", flavorText: "Ratings" },
      score: { api: "score", flavorText: "Score" },
      start_date: { api: "start_date", flavorText: "Start date" },
      title: { api: "title", flavorText: "Title" },
    },
    manga: {
      episodes: { api: "chapters", flavorText: "Chapters" },
      end_date: { api: "end_date", flavorText: "End date" },
      favorites: { api: "favorites", flavorText: "Favorites" },
      id: { api: "mal_id", flavorText: "ID" },
      members: { api: "members", flavorText: "Members" },
      popularity: { api: "popularity", flavorText: "Popularity" },
      rank: { api: "rank", flavorText: "Rank" },
      scored_by: { api: "scored_by", flavorText: "Ratings" },
      score: { api: "score", flavorText: "Score" },
      start_date: { api: "start_date", flavorText: "Start date" },
      title: { api: "title", flavorText: "Title" },
      volumes: { api: "volumes", flavorText: "Volumes" },
    },
  },
  ani: {
    anime: {
      duration: { api: "DURATION", flavorText: "Duration" },
      end_date: { api: "END_DATE", flavorText: "End date" },
      episodes: { api: "CHAPTERS", flavorText: "Episodes" },
      favorites: { api: "FAVOURITES", flavorText: "Favorites" },
      id: { api: "ID", flavorText: "ID" },
      popularity: { api: "POPULARITY", flavorText: "Popularity" },
      score: { api: "SCORE", flavorText: "Score" },
      start_date: { api: "START_DATE", flavorText: "Start date" },
      title_english: { api: "TITLE_ENGLISH", flavorText: "Title (English)" },
      title: { api: "TITLE_NATIVE", flavorText: "Title (Native)" },
      title_romaji: { api: "TITLE_ROMAJI", flavorText: "Title (Romaji)" },
      trending: { api: "TRENDING", flavorText: "Trending" },
      updated_at: { api: "UPDATED_AT", flavorText: "Updated" },
    },
    manga: {
      episodes: { api: "CHAPTERS", flavorText: "Chapters" },
      end_date: { api: "END_DATE", flavorText: "End date" },
      favorites: { api: "FAVOURITES", flavorText: "Favorites" },
      id: { api: "ID", flavorText: "ID" },
      popularity: { api: "POPULARITY", flavorText: "Popularity" },
      score: { api: "SCORE", flavorText: "Score" },
      start_date: { api: "START_DATE", flavorText: "Start date" },
      title_english: { api: "TITLE_ENGLISH", flavorText: "Title (English)" },
      title: { api: "TITLE_NATIVE", flavorText: "Title (Native)" },
      title_romaji: { api: "TITLE_ROMAJI", flavorText: "Title (Romaji)" },
      trending: { api: "TRENDING", flavorText: "Trending" },
      updated_at: { api: "UPDATED_AT", flavorText: "Updated" },
      volumes: { api: "DURATION", flavorText: "Volumes" },
    },
    media: {
      duration: { api: "DURATION", flavorText: "Duration / Volumes" },
      end_date: { api: "END_DATE", flavorText: "End date" },
      episodes: { api: "CHAPTERS", flavorText: "Episodes / Chapters" },
      favorites: { api: "FAVOURITES", flavorText: "Favorites" },
      id: { api: "ID", flavorText: "ID" },
      popularity: { api: "POPULARITY", flavorText: "Popularity" },
      score: { api: "SCORE", flavorText: "Score" },
      start_date: { api: "START_DATE", flavorText: "Start date" },
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
searchFormats.flavorTexts = extractFlavorTexts(searchFormats);

function extractFlavorTexts(obj) {
  return Object.values(obj).reduce((acc, apis) => {
    return Object.values(apis).reduce((acc, medias) => {
      return Object.entries(medias).reduce((acc, [key, value]) => {
        return (acc[key] = value.flavorText, acc);
      }, acc);
    }, acc);
  }, {});
}
