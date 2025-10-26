import {createEffect, createSignal, on, onCleanup} from "solid-js";

export function useWidth(elem) {
  const [width, setWidth] = createSignal(elem()?.getBoundingClientRect().width || 0);
  const resize = () => {
    setWidth(elem()?.getBoundingClientRect().width || 0);
  }

  createEffect(on(elem, resize));

  window.addEventListener("resize", resize);

  onCleanup(() => {
    window.removeEventListener("resize", resize);
  });

  return width;
}