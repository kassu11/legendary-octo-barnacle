import { onCleanup, onMount, splitProps } from "solid-js";
import "./GridReelAutoFill.scoped.css";

// Horizontally scrolling reel. Columns are at least --column-width wide and grow to fill the reel (like minmax(x, 1fr)),
// leaving --spill-ratio of the next column visible before the right padding. A spill of 0 ends the last column on the padding.
// Inputs, set on the reel itself (they aren't inherited): --column-width, --max-column-count (visible columns including the spill),
// --spill-ratio, --gap, --padding-inline, --padding-left and --padding-right
// The reel can also be scrolled by dragging it with the mouse.
export function GridReelAutoFill(props) {
  const [local, others] = splitProps(props, ["ref"]);

  const controller = new AbortController();
  const { signal } = controller;

  let reel, startX = null, startScrollX, momentumX = 0, preventClick = false;

  const isScrollable = () => reel.scrollWidth > reel.clientWidth;
  const updateScrollable = () => reel.classList.toggle("scrollable", isScrollable());

  const handleMouseDown = e => {
    preventClick = false;
    if (e.buttons !== 1 || !isScrollable()) return;

    e.preventDefault();
    startX = e.x;
    startScrollX = reel.scrollLeft;
    momentumX = 0;
    reel.classList.add("dragging");
  };

  const handleMouseMove = e => {
    if (startX == null) return;
    if (e.buttons !== 1) return handleMouseUp();
    if (Math.abs(startX - e.x) > 20) preventClick = true;

    // Only the movement of the last 50ms counts towards the momentum
    momentumX -= e.movementX;
    setTimeout(() => momentumX += e.movementX, 50);

    e.preventDefault();
    reel.scrollTo(startScrollX + (startX - e.x), 0);
  };

  const handleMouseUp = () => {
    if (startX == null) return;

    startX = null;
    reel.classList.remove("dragging");
    reel.scrollBy({ left: momentumX, behavior: "smooth" });
  };

  const handleClick = e => {
    if (!preventClick) return;

    preventClick = false;
    e.preventDefault();
    e.stopPropagation(); // Make sure that child clicks are cancelled
  };

  const handleRef = elem => {
    reel = elem;
    elem.addEventListener("mousedown", handleMouseDown, { signal });
    elem.addEventListener("click", handleClick, { capture: true, signal });
    elem.addEventListener("mouseenter", updateScrollable, { signal });
    window.addEventListener("mousemove", handleMouseMove, { signal });
    window.addEventListener("mouseup", handleMouseUp, { signal });
    local.ref?.(elem);
  };

  onMount(() => {
    updateScrollable();
    const observer = new ResizeObserver(updateScrollable);
    observer.observe(reel);
    onCleanup(() => observer.disconnect());
  });
  onCleanup(() => controller.abort());

  return (
    <div {...others} ref={handleRef} />
  );
}
