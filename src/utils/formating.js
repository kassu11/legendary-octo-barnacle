import { asserts } from "../collections/collections.js";

export const plural = num => num !== 1 ? "s" : "";

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
    case "KR":
      return "Korean";
    default:
      return "Japanese";
  }
}

export const countryNameFromCountryCode = country => {
  if (!country?.length) {
    return "";
  }

  switch(country) {
    case "CN":
      return "China";
    case "TW":
      return "Taiwan";
    case "KR":
      return "South Korea";
    default:
      return "Japan";
  }
}

export const formatMediaSource = source => {
  if (!source?.length) {
    return "";
  }

  switch(source) {
    case "ANIME":
    case "COMIC":
    case "DOUJINSHI":
    case "GAME":
    case "MANGA":
    case "NOVEL":
    case "ORIGINAL":
    case "OTHER":
      return capitalize(source);
    case "LIGHT_NOVEL":
    case "LIVE_ACTION":
    case "MULTIMEDIA_PROJECT":
    case "PICTURE_BOOK":
    case "VISUAL_NOVEL":
    case "VIDEO_GAME":
    case "WEB_NOVEL":
      return capitalize(source.replace("_", " "))
    default:
      console.error("Unknown media format");
      return source;
  }
}

export const formatMediaFormat = text => {
  if (!text?.length) {
    return "";
  }

  switch(text) {
    case "CM":
    case "ONA":
    case "OVA":
    case "PV":
    case "TV":
      return text;
    case "DOUJIN":
    case "LIGHTNOVEL":
    case "MANGA":
    case "MANHUA":
    case "MANHWA":
    case "MOVIE":
    case "MUSIC":
    case "NOVEL":
    case "ONE-SHOT":
    case "SPECIAL":
      return capitalize(text);
    case "ONE_SHOT":
      return "One-shot"
    case "TV_SHORT":
      return "TV short";
    case "TV_SPECIAL":
      return "TV special";
    default:
      console.error("Unknown media format");
      return text;
  }
}

export function formatUsersMediaStatus(status, type) {
  switch(status) {
    case "COMPLETED":
    case "DROPPED":
    case "PAUSED":
    case "PLANNING":
      return capitalize(status);
    case "CURRENT":
      return type === "anime" ? "Watching" : "Reading";
    case "REPEATING":
      return type === "anime" ? "Rewatching" : "Rereading";
    default:
      console.error("Unknown status");
      return status;
  }
}

export const formatMediaStatus = status => {
  if (!status?.length) {
    return "";
  }

  switch(status) {
    case "CANCELLED": 
    case "FINISHED": 
    case "HIATUS": 
    case "NOT_YET_RELEASED": 
    case "RELEASING": 
      return capitalize(status.replaceAll("_", " "))
    default:
      console.error("Unknown media format");
      return status;
  }
}

export const numberCommas = num => {
  if (num == undefined) return;
  return Intl.NumberFormat("ja-JP").format(num)
}

export const compactNumber = num => {
  if (num == undefined) return;
  asserts.assertTrue(typeof num === "number", "Number is not typeof number");

  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(num);
}

export const formatTitleToUrl = (title) => {
  asserts.assertTrue(title != null, "No title given");
  return encodeURI(title.toLowerCase().replace(/[#%?]+/g, "").replace(/[/\\\-\u2010-\u2015_{}[\]]+/g, " ").trim().replace(/ +/g, "-"));
}

export const mediaUrl = (media) => {
  asserts.assertTrue(media.type, "type is missing");
  asserts.assertTrue("id" in media, "id is missing");

  return "/ani/" + media.type.toLowerCase() + "/" + media.id + "/" + formatTitleToUrl(media.title.userPreferred);
}

export const formatAnilistDate = (dateObject) => {
  asserts.assertTrue("year" in dateObject, "No year found");
  asserts.assertTrue("month" in dateObject, "No month found");
  asserts.assertTrue("day" in dateObject, "No day found");

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

  const event = new Date(dateObject.year || 1970, dateObject.month - 1 || 0, dateObject.day || 1);

  return event.toLocaleDateString("us-US", options);
}

export const formatTimeToDate = (time) => {
  const date = new Date(time);
  const options = { "year" : "numeric", "month" : "short", "day" : "numeric" };
  return date.toLocaleDateString("us-US", options);
}
