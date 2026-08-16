import { onCleanup } from "solid-js";
import { createStore } from "solid-js/store";


export function useIntersectionVisible() {
  const [isVisible, storeVisibilities] = createStore([]);

  const intersectionCallback = entries => {
    for (const entry of entries) {
      storeVisibilities(entry.target.dataset.id, entry.isIntersecting);
    }
  };

  const intersectionObserver = new IntersectionObserver(intersectionCallback, { rootMargin: "500px" });
  onCleanup(() => intersectionObserver.disconnect());

  return {
    isVisible,
    generateVisibilityRef: () => {
      let ref;

      onCleanup(() => ref && intersectionObserver.unobserve(ref));

      return elem => {
        if (ref) {
          intersectionObserver.unobserve(ref);
        }

        ref = elem;
        intersectionObserver.observe(elem);
      };
    }
  };
}

