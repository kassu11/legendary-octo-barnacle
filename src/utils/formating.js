import { assert } from "./assert";

export const capitalize = text => {
  if (!text?.length) return "";
  return text[0].toUpperCase() + text.substring(1).toLowerCase();
}


export const languageFromCountry = country => {
  if (!country?.length) {
    return "";
  }

  switch(country) {
    case "CN":
      return "Chinese";
    case "TW":
      return "Taiwanese";
    default:
      return "Japanese";
  }
}

export const formatMediaFormat = text => {
  if (!text?.length) {
    return "";
  }

  switch(text) {
    case "TV":
    case "ONA":
    case "OVA":
      return text;
    case "MANGA":
    case "MOVIE":
    case "MUSIC":
    case "NOVEL":
    case "SPECIAL":
    case "ONE_SHOT":
    case "TV_SHORT":
      return capitalize(text.replace("_", " "))
    default:
      console.error("Unknown media format");
      return text;
  }
}

export const numberCommas = num => {
  if (num == undefined) return;
  return Intl.NumberFormat("ja-JP").format(num)
}

export const formatTitleToUrl = (title) => {
  assert(title, "No title given");
  return encodeURI(title.toLowerCase().replace(/[#%?]+/g, "").replace(/[/\\\-\u2010-\u2015_{}[\]]+/g, " ").trim().replace(/ +/g, "-"));
}

export const formatAnilistDate = (dateObject) => {
  assert("year" in dateObject, "No year found");
  assert("month" in dateObject, "No month found");
  assert("day" in dateObject, "No day found");

  if (!dateObject.year && !dateObject.month && !dateObject.day) {
    return "";
  }

  if (dateObject.year && !dateObject.month && !dateObject.day) {
    return dateObject.year.toString();
  }

  const options = {};
  if(dateObject.year) { options["year"] = "numeric"; };
  if(dateObject.month) { options["month"] = "short"; };
  if(dateObject.day) { options["day"] = "numeric"; };

  const event = new Date(dateObject.year || 1970, dateObject.month - 1 || 1, dateObject.day || 1);

  return event.toLocaleDateString("us-US", options);
}
