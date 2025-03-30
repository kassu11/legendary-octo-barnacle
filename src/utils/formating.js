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
