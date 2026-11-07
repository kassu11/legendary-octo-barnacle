import { localizations, mediaStatuses } from "@/constants/constants";

export const jikanEnumToFlavorText = status => {
  if (!status?.length) {
    return "";
  }

  switch(status) {
    case mediaStatuses.jikan.FinishedAiring:
    case mediaStatuses.jikan.Finished:
      return localizations.Finished;
    case mediaStatuses.jikan.NotYetAired:
      return "Not yet released"
    case mediaStatuses.jikan.CurrentlyAiring:
    case mediaStatuses.jikan.Publishing:
      return "Releasing"
    case mediaStatuses.jikan.Discontinued:
      return "Cancelled"
    case mediaStatuses.jikan.OnHiatus:
      return "On hiatus"
    default:
      console.error("Unknown media format");
      return status;
  }
}
