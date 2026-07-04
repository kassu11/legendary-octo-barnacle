export const translateInternalSearchParams = {
  sort: {
    trending_desc: {
      ani: { sort: "TRENDING_DESC" },
    },
    end_date_desc: {
      ani: { sort: "END_DATE_DESC" },
    },
    popularity_plus_desc: {
      ani: { sort: ["POPULARITY_DESC", "SCORE_DESC"] },
    },
    popularity_desc: {
      ani: { sort: ["POPULARITY_DESC"] },
    },
    score_desc: {
      ani: { sort: ["SCORE_DESC"] },
    },
    score: {
      ani: { sort: ["SCORE"] },
    },
    score_plus: {
      ani: { sort: ["SCORE"], averageScoreGreater: 0 },
    },
    format: {
      ani: { sort: ["FORMAT"] },
    },
    title_romaji_desc: {
      ani: { sort: ["TITLE_ROMAJI_DESC"] },
    },
    search_match: {
      ani: { sort: ["SEARCH_MATCH"] },
    },
  },
  status: {
    complete: {
      ani: { status: "FINISHED" },
    },
    not_yet_released: {
      ani: { status: "NOT_YET_RELEASED" },
    },
  },
  season: {
    WINTER: {
      ani: { season: "WINTER" },
    },
    SPRINT: {
      ani: { season: "SPRINT" },
    },
    SUMMER: {
      ani: { season: "SUMMER" },
    },
    FALL: {
      ani: { season: "FALL" },
    },
    [null]: {
      ani: { season: null },
    }
  },
  endDateGreater: {
    _default: (api, value) => {
      if (value === undefined) return;
      if (api === "ani") return { endDateGreater: value };
    },
  },
};
