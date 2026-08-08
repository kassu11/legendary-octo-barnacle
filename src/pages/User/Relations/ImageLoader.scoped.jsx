import { batch, createRenderEffect, createSignal, onCleanup, Show, } from "solid-js";

export function ImageLoader(props) {
  const [showCover, setShowCover] = createSignal();
  const [fadeIn, setFadeIn] = createSignal();

  const controller = new AbortController();

  onCleanup(() => {
    controller.abort();
    img.src = "";
  });

  let fade = false;
  const img = new Image();
  img.addEventListener("load", () => {
    batch(() => {
      setFadeIn(fade);
      setShowCover(true);
    });
  }, { signal: controller.signal });

  createRenderEffect(() => {

    const src = props.src;

    if (img.src == src) {
      return;
    }

    setShowCover(false);
    img.src = src;

    const fadeIn = props.fadeIn;
    const wait = props.waitBeforeFade;

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
      <div {...props} classList={{ "fade-in": fadeIn() }} style={{ "background-image": `url("${props.src}")` }} />
    </Show>
  );
}
