import { asserts } from "./utils";

const seasons = ["WINTER", "SPRING", "SUMMER", "FALL"];

export const getDates = (offsetDays = 7) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const season = getSeasonFromMonth(date.getMonth());

  asserts.assertTrue(Number.isInteger(offsetDays), "Offsetdays is not an integer");

  return {
    "season": season,
    "seasonYear": year,
    "nextSeason":moveSeasonObject(season, year, 1).season,
    "nextYear": moveSeasonObject(season, year, 1).year,
  };
}

export function moveSeasonObject(season, year, move = 0) {
  asserts.assertTrue(typeof year === "number", "year is not a number");
  asserts.assertTrue(typeof season === "string", "season is not a string");
  const seasonMove = move % 4;
  const yearMove = Math.trunc(move / 4);
  const seasonIndex = seasons.indexOf(season.toUpperCase());

  if (seasonIndex + seasonMove < 0 || seasonIndex + seasonMove > 3) {
    year += seasonMove / Math.abs(seasonMove);
  }

  return {
    year: year + yearMove,
    season: seasons[(4 + seasonIndex + seasonMove) % 4],
  }
}

export function getSeasonFromMonth(month) {
  return seasons[Math.floor(month / 3)];
}
