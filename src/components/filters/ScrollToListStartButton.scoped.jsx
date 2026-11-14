import { createSignal, onCleanup, onMount } from "solid-js";
import { ArrowUpIcon } from "@/assets/icons.jsx";
import "./ScrollToListStartButton.scoped.css";

const SCROLL_BACK_UP_DISTANCE = 200;

// Meant for the action slot of MobileFilters. Shows up when the user scrolls back up, after scrolling down past the list start
export function ScrollToListStartButton(props) {
  const [isVisible, setIsVisible] = createSignal(false);
  let previousY = window.scrollY;
  let scrollUpStartY = previousY;

  const updateVisibility = () => {
    const y = window.scrollY;
    if (y > previousY) scrollUpStartY = y;
    previousY = y;
    setIsVisible(y > props.listStartY() + window.innerHeight && scrollUpStartY - y >= SCROLL_BACK_UP_DISTANCE);
  };

  onMount(() => {
    window.addEventListener("scroll", updateVisibility, { passive: true });
    onCleanup(() => window.removeEventListener("scroll", updateVisibility));
  });

  return (
    <button class="scroll-to-list-start" classList={{ visible: isVisible() }} onClick={() => window.scrollTo({ top: props.listStartY(), behavior: "smooth" })} aria-label="Scroll to the start of the list">
      <ArrowUpIcon scoped />
    </button>
  );
}
