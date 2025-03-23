import { createSignal, onCleanup } from "solid-js";

function useMediaQuery(query) {
  const [matches, setMatches] = createSignal(window.matchMedia(query).matches);

  const mediaQueryList = window.matchMedia(query);
  const updateMatches = e => setMatches(e.matches);

  mediaQueryList.addEventListener("change", updateMatches);
  onCleanup(() => mediaQueryList.removeEventListener("change", updateMatches));

  return matches;
}

export default useMediaQuery; 