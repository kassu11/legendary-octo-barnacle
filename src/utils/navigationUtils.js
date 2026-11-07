import { mediaUrl } from "./formatUtils";

export function navigateToMediaPage(navigate, media) {
  if (media) {
    navigate(mediaUrl(media));
  }
}
