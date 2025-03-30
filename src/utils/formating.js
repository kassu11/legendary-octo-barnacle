import { assert } from "./assert";

export const capitalize = text => {
  if (!text?.length) return "";
  return text[0].toUpperCase() + text.substring(1).toLowerCase();
}

export const numberCommas = num => {
  if (num == undefined) return;
  return Intl.NumberFormat("ja-JP").format(num)
}

export const formatTitleToUrl = (title) => {
  assert(title, "No title given");
  return encodeURI(title.toLowerCase().replace(/[#%?]+/g, "").replace(/[/\\\-_{}[\]]+/g, " ").trim().replace(/ +/g, "-"));
}

export const formatAnilistDate = (dateObject) => {
  assert(dateObject.year, "No year found");
  assert(dateObject.month, "No month found");
  assert(dateObject.day, "No day found");

  const event = new Date(dateObject.year, dateObject.month, dateObject.day);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return event.toLocaleDateString("us-US", options);
}
