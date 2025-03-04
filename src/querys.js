export const anilistAnime = format`query Media($mediaId: Int, $perPage: Int) {
  Media(id: $mediaId) {
    id
    idMal
    title {
      romaji
      english
      native
      userPreferred
    }
    type
    format
    status
    description
    startDate {
      year
      month
      day
    }
    season
    endDate {
      year
      month
      day
    }
    seasonYear
    episodes
    duration
    chapters
    volumes
    popularity
    meanScore
    averageScore
    genres
    synonyms
    bannerImage
    coverImage {
      large
    }
    trailer {
      site
      thumbnail
    }
    isAdult
    characters(perPage: $perPage) {
      nodes {
        name {
          native
          full
        }
        image {
          medium
        }
      }
    }
    stats {
      statusDistribution {
        status
        amount
      }
      scoreDistribution {
        score
        amount
      }
    }
    airingSchedule {
      nodes {
        airingAt
        episode
      }
    }
  }
}`


export const trendingAnime = format`query (
  $season: MediaSeason
  $seasonYear: Int
  $nextSeason: MediaSeason
  $nextYear: Int
) {
  trending: Page(page: 1, perPage: 6) {
    media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
      ...media
    }
  }
  season: Page(page: 1, perPage: 6) {
    media(
      season: $season
      seasonYear: $seasonYear
      sort: POPULARITY_DESC
      type: ANIME
      isAdult: false
    ) {
      ...media
    }
  }
  nextSeason: Page(page: 1, perPage: 6) {
    media(
      season: $nextSeason
      seasonYear: $nextYear
      sort: POPULARITY_DESC
      type: ANIME
      isAdult: false
    ) {
      ...media
    }
  }
  popular: Page(page: 1, perPage: 6) {
    media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
      ...media
    }
  }
  top: Page(page: 1, perPage: 10) {
    media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
      ...media
    }
  }
}
fragment media on Media {
  id
  title {
    userPreferred
  }
  coverImage {
    extraLarge
    large
    color
  }
  startDate {
    year
    month
    day
  }
  endDate {
    year
    month
    day
  }
  bannerImage
  season
  seasonYear
  description
  type
  format
  status(version: 2)
  episodes
  duration
  chapters
  volumes
  genres
  isAdult
  averageScore
  popularity
  mediaListEntry {
    id
    status
  }
  nextAiringEpisode {
    airingAt
    timeUntilAiring
    episode
  }
  studios(isMain: true) {
    edges {
      isMain
      node {
        id
        name
      }
    }
  }
}`

function format(strings, ...templates) {
  const array = [];
  for (let i = 0; i < strings.length; i++) {
    const string = strings[i].replace(/\n|\t|\r/gm, "").replace(/\s+/gm, " ");
    array.push(string, templates[i] || "");
  }

  return array.join("");
}
