import { asserts } from "../collections/collections";

export const titleToUrl = (title) => {
  asserts.assertTrue(title != null, "No title given");
  return encodeURI(title.toLowerCase().replace(/[#%?]+/g, "").replace(/[/\\\-\u2010-\u2015_{}[\]]+/g, " ").trim().replace(/ +/g, "-"));
}
