import { batch, createRenderEffect, createSignal, onCleanup, Show, splitProps, } from "solid-js";
import "./ImageLoader.scoped.css";

// We want to cancel the image loading, but img.src = "" causes problems: https://humanwhocodes.com/blog/2009/11/30/empty-image-src-can-destroy-your-site/
// Because of this, we will set the image to a real image, so the previous image fetching is stopped
const EMPTY_IMG = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>";

export function ImageLoader(props) {
  const [local, scoping] = splitProps(props, ["src", "fadeIn", "waitBeforeFade"]);
  const [showCover, setShowCover] = createSignal();
  const [fadeIn, setFadeIn] = createSignal();

  const controller = new AbortController();

  onCleanup(() => {
    controller.abort();
    img.src = EMPTY_IMG;
  });

  let fade = false;
  const img = new Image();
  img.addEventListener("load", async () => {
    if (img.src === EMPTY_IMG) {
      return;
    }
    batch(() => {
      setFadeIn(fade);
      setShowCover(true);
    });
  }, { signal: controller.signal });

  createRenderEffect(() => {

    const src = local.src;

    if (img.src == src) {
      return;
    }

    setShowCover(false);

    if (!src) {
      return;
    }

    img.src = src;

    const fadeIn = local.fadeIn;
    const wait = local.waitBeforeFade;

    if (wait) {

      fade = false;

      const updateIfSourceNotChanged = () => {
        if (src === img.src) {
          fade = fadeIn;
        }
      }

      setTimeout(updateIfSourceNotChanged, wait);

    } else {

      fade = fadeIn;

    }

  });

  return (
    <Show when={showCover()}>
      <div {...scoping} classList={{ "fade-in": fadeIn() }} style={{ "background-image": `url("${local.src}")` }} />
    </Show>
  );
}
