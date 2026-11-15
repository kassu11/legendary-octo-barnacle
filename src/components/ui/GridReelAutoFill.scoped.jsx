import { onCleanup, onMount, splitProps } from "solid-js";
import "./GridReelAutoFill.scoped.css";

// Distance in px a pointer has to move before a press turns into a drag
const DRAG_THRESHOLD = 10;
// How far a fling travels before snapping: release velocity (px/ms) * FLING_TRAVEL
const FLING_TRAVEL = 400;
// Duration limits in ms of the momentum and snap animation
const MIN_DURATION = 200;
const MAX_DURATION = 500;
// Duration in ms of a snap that has no fling velocity
const SNAP_DURATION = 300;
// Only pointer movement from this many ms before release counts towards the fling velocity
const VELOCITY_WINDOW = 60;
// Fling velocity in px/ms that always moves at least one column in the direction of the fling
const FLING_VELOCITY = 0.2;
// Wait after the last native scroll event (wheel, trackpad, keyboard, scrollbar) before snapping
const SCROLL_END_DELAY = 150;

// Horizontally scrolling reel. Columns are at least --column-width wide and grow to fill the reel (like minmax(x, 1fr)),
// leaving --spill-ratio of the next column visible before the right padding. A spill of 0 ends the last column on the padding.
// Inputs, set on the reel itself (they aren't inherited): --column-width, --max-column-count (visible columns including the spill),
// --spill-ratio, --gap, --padding-inline, --padding-left and --padding-right
// The reel is dragged with mouse or touch, flings with momentum and snaps the columns to the left padding.
// Snapping is done here instead of CSS scroll snap, which kills the momentum.
export function GridReelAutoFill(props) {
  const [local, others] = splitProps(props, ["ref"]);

  const controller = new AbortController();
  const { signal } = controller;

  let reel;
  let pointerId = null, pointerType, startX, startScrollX, dragging = false, samples = [];
  let preventClick = false;
  let animationFrame = null, animationTarget;
  let scrollEndTimeout;

  const maxScroll = () => reel.scrollWidth - reel.clientWidth;
  const isScrollable = () => maxScroll() > 0;
  const updateScrollable = () => reel.classList.toggle("scrollable", isScrollable());
  // Pressing the scrollbar must not start a drag
  const isOnScrollbar = e => e.target === reel && e.offsetY >= reel.clientHeight;

  // Scroll positions that put a column's start on the left padding, plus both ends of the reel
  const snapPoints = () => {
    const max = maxScroll();
    const origin = reel.getBoundingClientRect().left + reel.clientLeft + parseFloat(getComputedStyle(reel).paddingLeft) - reel.scrollLeft;
    const points = [...reel.children].map(child => Math.min(max, Math.max(0, child.getBoundingClientRect().left - origin)));
    return [0, ...points, max];
  };

  const snapTarget = (position, velocity = 0) => {
    const points = snapPoints();
    const current = reel.scrollLeft;
    let target = points.reduce((best, point) => Math.abs(point - position) < Math.abs(best - position) ? point : best);

    // A quick flick that wouldn't reach the next column on its own still moves one column
    if (Math.abs(velocity) > FLING_VELOCITY && (target - current) * velocity <= 0) {
      const ahead = points.filter(point => (point - current) * velocity > 1);
      if (ahead.length) {
        target = ahead.reduce((best, point) => Math.abs(point - current) < Math.abs(best - current) ? point : best);
      }
    }
    return target;
  };

  const stopAnimation = () => {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  };

  // Cubic ease out. With a fling velocity, the duration is the one that starts at the release speed (3 * distance / velocity),
  // limited to MIN_DURATION-MAX_DURATION, so long flings start faster than released to keep the animation short
  const animateTo = (target, velocity = 0) => {
    stopAnimation();
    const start = reel.scrollLeft;
    const distance = target - start;
    if (Math.abs(distance) < 1) {
      reel.scrollLeft = target;
      return;
    }

    const duration = velocity ? Math.min(MAX_DURATION, Math.max(MIN_DURATION, 3 * Math.abs(distance / velocity))) : SNAP_DURATION;
    animationTarget = target;
    const startTime = performance.now();
    const step = now => {
      const progress = Math.min(1, (now - startTime) / duration);
      reel.scrollLeft = start + distance * (1 - (1 - progress) ** 3);
      animationFrame = progress < 1 ? requestAnimationFrame(step) : null;
    };
    animationFrame = requestAnimationFrame(step);
  };

  // Scroll velocity in px/ms. Positive scrolls right, which is the pointer moving left
  const releaseVelocity = timeStamp => {
    const recent = samples.filter(sample => timeStamp - sample.time <= VELOCITY_WINDOW);
    if (recent.length < 2) return 0;
    const first = recent[0], last = recent.at(-1);
    if (last.time === first.time) return 0;
    return -(last.x - first.x) / (last.time - first.time);
  };

  const handlePointerDown = e => {
    if (pointerId != null || e.button !== 0 || !isScrollable() || isOnScrollbar(e)) return;

    // Catching a moving reel stops it without clicking whatever is under the pointer
    preventClick = animationFrame != null && Math.abs(animationTarget - reel.scrollLeft) > DRAG_THRESHOLD;
    stopAnimation();
    clearTimeout(scrollEndTimeout);

    pointerId = e.pointerId;
    pointerType = e.pointerType;
    startX = e.clientX;
    startScrollX = reel.scrollLeft;
    dragging = false;
    samples = [{ time: e.timeStamp, x: e.clientX }];
  };

  // Stops text selection and native dragging of links and images
  const handleMouseDown = e => {
    if (e.button === 0 && isScrollable() && !isOnScrollbar(e)) e.preventDefault();
  };

  const handlePointerMove = e => {
    if (e.pointerId !== pointerId) return;
    if (pointerType === "mouse" && e.buttons !== 1) return handlePointerUp(e);

    const deltaX = e.clientX - startX;
    if (!dragging) {
      if (Math.abs(deltaX) < DRAG_THRESHOLD) return;
      dragging = true;
      preventClick = true;
      reel.classList.add("dragging");
    }

    samples.push({ time: e.timeStamp, x: e.clientX });
    samples = samples.filter(sample => e.timeStamp - sample.time <= VELOCITY_WINDOW);
    reel.scrollLeft = startScrollX - deltaX;
  };

  const handlePointerUp = e => {
    if (e.pointerId !== pointerId) return;
    pointerId = null;
    // The click from this release has been dispatched by the time the timeout runs
    setTimeout(() => preventClick = false);
    if (!dragging) return;

    dragging = false;
    reel.classList.remove("dragging");
    // A cancelled touch was taken over by the browser, so it has no fling
    const velocity = e.type === "pointercancel" ? 0 : releaseVelocity(e.timeStamp);
    animateTo(snapTarget(reel.scrollLeft + velocity * FLING_TRAVEL, velocity), velocity);
  };

  const handleClick = e => {
    if (!preventClick) return;

    preventClick = false;
    e.preventDefault();
    e.stopPropagation(); // Make sure that child clicks are cancelled
  };

  const scheduleSnap = () => {
    clearTimeout(scrollEndTimeout);
    scrollEndTimeout = setTimeout(() => {
      if (pointerId == null && animationFrame == null) animateTo(snapTarget(reel.scrollLeft));
    }, SCROLL_END_DELAY);
  };

  // Snap after scrolling that didn't come from this component
  const handleScroll = () => {
    if (pointerId != null || animationFrame != null) return;
    scheduleSnap();
  };

  // The wheel takes over from a running animation right away instead of fighting it
  const handleWheel = () => {
    if (pointerId != null) return;
    stopAnimation();
    scheduleSnap();
  };

  const handleResize = () => {
    updateScrollable();
    if (pointerId != null || animationFrame != null) return;
    reel.scrollLeft = snapTarget(reel.scrollLeft);
  };

  const handleRef = elem => {
    reel = elem;
    elem.addEventListener("pointerdown", handlePointerDown, { signal });
    elem.addEventListener("mousedown", handleMouseDown, { signal });
    elem.addEventListener("click", handleClick, { capture: true, signal });
    elem.addEventListener("scroll", handleScroll, { passive: true, signal });
    elem.addEventListener("wheel", handleWheel, { passive: true, signal });
    elem.addEventListener("mouseenter", updateScrollable, { signal });
    window.addEventListener("pointermove", handlePointerMove, { signal });
    window.addEventListener("pointerup", handlePointerUp, { signal });
    window.addEventListener("pointercancel", handlePointerUp, { signal });
    local.ref?.(elem);
  };

  onMount(() => {
    const observer = new ResizeObserver(handleResize);
    observer.observe(reel);
    onCleanup(() => observer.disconnect());
  });
  onCleanup(() => {
    controller.abort();
    stopAnimation();
    clearTimeout(scrollEndTimeout);
  });

  return (
    <div {...others} ref={handleRef} />
  );
}
