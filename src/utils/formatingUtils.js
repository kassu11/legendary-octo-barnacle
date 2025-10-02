import { asserts } from "../collections/collections";

export const titleToUrl = (title) => {
  asserts.isTypeString(title, "title");

  return encodeURI(title.toLowerCase().replace(/[#%?]+/g, "").replace(/[/\\\-\u2010-\u2015_{}[\]]+/g, " ").trim().replace(/ +/g, "-"));
}

export const plural = num => num !== 1 ? "s" : "";

export const capitalize = text => {
  if (!text?.length) return "";
  return text[0].toUpperCase() + text.substring(1).toLowerCase();
}
