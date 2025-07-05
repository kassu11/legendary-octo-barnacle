import { mediaUrl } from "./formating";

export function navigateToMediaPage(navigate, media) {
  if (media) {
    navigate(mediaUrl(media));
  }
}
