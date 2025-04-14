import { assert } from "./assert";

export const getDates = (offsetDays = 7) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const seasons = ["WINTER", "SPRING", "SUMMER", "FALL", "WINTER"];
  const years = [year, year, year, year, year + 1];
  const index = Math.floor(date.getMonth() / 3);

  assert(Number.isNaN(index) === false, "Index is NaN");
  assert(index > 0, "Negative index");
  assert(Number.isInteger(offsetDays), "Offsetdays is not an integer");

  return {
    "season": seasons[index],
    "seasonYear": years[index],
    "nextSeason":seasons[index + 1], 
    "nextYear": years[index + 1],
  };
}
