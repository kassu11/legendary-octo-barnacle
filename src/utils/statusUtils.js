import { mediaStatuses } from "../collections/collections";

export const anilistEnumToFlavorText = status => {
  if (!status?.length) {
    return "";
  }

  switch(status) {
    case mediaStatuses.anilist.CANCELLED:
    case mediaStatuses.anilist.FINISHED:
    case mediaStatuses.anilist.HIATUS:
    case mediaStatuses.anilist.NOT_YET_RELEASED:
    case mediaStatuses.anilist.RELEASING:
      return capitalize(status.replaceAll("_", " "))
    default:
      console.error("Unknown media format");
      return status;
  }
}

export const jikanEnumToFlavorText = status => {
  if (!status?.length) {
    return "";
  }

  switch(status) {
    case mediaStatuses.jikan.FinishedAiring:
      return "Finished"
    case mediaStatuses.jikan.NotYetAired:
      return "Not yet released"
    case mediaStatuses.jikan.CurrentlyAiring:
      return "Releasing"
    default:
      console.error("Unknown media format");
      return status;
  }
}
