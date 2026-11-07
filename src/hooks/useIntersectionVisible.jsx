import { createSignal, onCleanup } from "solid-js";


const SET_VISIBILITY = Symbol("SET_VISIBILITY");
export function useIntersectionVisible() {
  const intersectionCallback = entries => {
    for (const entry of entries) {
      entry.target[SET_VISIBILITY](entry.isIntersecting);
    }
  };

  const intersectionObserver = new IntersectionObserver(intersectionCallback, { rootMargin: "500px" });
  onCleanup(() => intersectionObserver.disconnect());

  const generateVisibilityRef = () => {
    const [visible, setVisibility] = createSignal(false);
    let ref;

    onCleanup(() => ref && intersectionObserver.unobserve(ref));

    const handleRef = elem => {
      ref = elem;
      elem[SET_VISIBILITY] = setVisibility;
      intersectionObserver.observe(elem);
    };

    return [handleRef, visible];
  }

  return generateVisibilityRef;
}

