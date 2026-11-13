import { createSignal, onCleanup } from "solid-js";
import { Portal } from "solid-js/web";

/**
 * @typedef {"top" | "bottom" | "left" | "right"} HoverSide
 * @typedef {"start" | "center" | "end"} HoverAlign
 * @typedef {HoverSide | `${HoverSide}-${HoverAlign}`} HoverPlacement
 *
 * @typedef {Object} HoverOptions
 * @property {HoverPlacement[]} [placements] Placements tried in order, the first one that fits is used. The last one is the fallback.
 * @property {number} [offset] Gap between the trigger and the floating element
 * @property {number} [alignOffset] Inset from the aligned edge for "start" and "end" alignments, e.g. "right-start" with 25 moves the floating element 25px down
 * @property {(trigger: HTMLElement, floating: HTMLElement) => void} [place] Custom positioning, replaces placements. placeFirstFit can be used inside it
 *
 * @typedef {Object} Hover
 * @property {(elem: HTMLElement) => void} triggerRef Ref for the element that opens the hover
 * @property {(elem: HTMLElement) => void} floatingRef Ref for the element that gets positioned next to the trigger
 * @property {import("solid-js").Accessor<boolean>} isOpen
 */

const HOVER_SELECTOR = ":hover, :focus-visible, :has(:focus-visible)";
const FOCUS_SELECTOR = ":focus-visible, :has(:focus-visible)";
// How long a touch has to stay still on a trigger before it starts drag hovering
const LONG_PRESS_DELAY = 300;
// How far the finger can move before the touch counts as scrolling
const TOUCH_MOVE_TOLERANCE = 10;
// Height of the zones at the top and bottom of the viewport that scroll the page while drag hovering
const EDGE_SCROLL_SIZE = 80;
// Scroll speed in pixels per millisecond when the finger is at the very edge of the viewport
const EDGE_SCROLL_MAX_SPEED = 1.5;

/**
 * @typedef {Object} HoverEntry
 * @property {HTMLElement} [trigger]
 * @property {HTMLElement} [floating]
 * @property {(open: boolean) => void} setOpen
 * @property {(trigger: HTMLElement, floating: HTMLElement) => void} [place]
 * @property {boolean} [disposed]
 */

/** @type {WeakMap<Element, Set<HoverEntry>>} */
const entriesByTrigger = new WeakMap();
/** @type {Set<HoverEntry>} */
const openEntries = new Set();
let entryCount = 0;
let frame;
let pointerTarget;
// Touch devices keep :hover stuck on the last tapped element, so touch input opens hovers based on touchTarget instead
let touchInput = false;
let touchTarget;
/** @type {{ id: number, x: number, y: number, target: Element, onTrigger: boolean, dragging: boolean, timer?: number } | undefined} */
let touch;
/** @type {{ x: number, y: number, frame: number, time?: number, remainder: number } | undefined} */
let edgeScroll;

// Touch events are always dispatched to the element the touch started on.
// Virtualized lists can remove that element while edge scrolling, and then the events no longer reach window,
// so these are listened to on the element itself for the duration of the touch.
const touchTargetListeners = [
  ["touchmove", handleTouchMove, { passive: false }],
  ["touchend", handleTouchEnd, { passive: false }],
  ["touchcancel", handleTouchCancel, { passive: true }],
];

// Holding a finger still on a trigger starts drag hovering.
// While dragging, the page doesn't scroll and the hovers follow the element under the finger,
// so multiple hovers can be checked in one press. The last one stays open after lifting the finger.
// Holding the finger near the top or bottom edge scrolls the page. Lifting it there keeps scrolling until the next tap.
function handleTouchStart(e) {
  stopEdgeScroll();
  cancelTouch();
  if (e.touches.length !== 1) {
    return;
  }

  const { identifier, clientX, clientY } = e.touches[0];
  const onTrigger = isInsideTrigger(e.target);
  touch = { id: identifier, x: clientX, y: clientY, target: e.target, onTrigger, dragging: false };
  if (onTrigger) {
    touch.timer = setTimeout(startTouchDrag, LONG_PRESS_DELAY);
  }
  for (const [type, listener, options] of touchTargetListeners) {
    touch.target.addEventListener(type, listener, options);
  }
}

function startTouchDrag() {
  touch.dragging = true;
  touchTarget = touch.target;
  edgeScroll = { x: touch.x, y: touch.y, remainder: 0, frame: requestAnimationFrame(updateEdgeScroll) };
}

function handleTouchMove(e) {
  const point = touch && findTouch(e.changedTouches, touch.id);
  if (!point) {
    return;
  }

  if (touch.dragging) {
    if (e.cancelable) {
      e.preventDefault();
    }
    edgeScroll.x = point.clientX;
    edgeScroll.y = point.clientY;
    // Floating elements in #hovers have pointer-events: none, so they are skipped
    touchTarget = document.elementFromPoint(point.clientX, point.clientY);
  } else if (Math.hypot(point.clientX - touch.x, point.clientY - touch.y) > TOUCH_MOVE_TOLERANCE) {
    // Scrolling closes the touch hovers
    cancelTouch();
    touchTarget = undefined;
  }
}

function handleTouchEnd(e) {
  if (!touch || !findTouch(e.changedTouches, touch.id)) {
    return;
  }

  if (touch.dragging) {
    // Lifting the finger shouldn't click the element under it
    if (e.cancelable) {
      e.preventDefault();
    }
    // Lifting the finger inside an edge zone keeps the page scrolling
    if (!edgeScrollSpeed(edgeScroll.y)) {
      stopEdgeScroll();
    }
  } else {
    // A tap moves the hover like :hover does
    touchTarget = touch.target;
  }
  cancelTouch();
}

function handleTouchCancel() {
  stopEdgeScroll();
  cancelTouch();
}

function cancelTouch() {
  if (!touch) {
    return;
  }

  clearTimeout(touch.timer);
  for (const [type, listener, options] of touchTargetListeners) {
    touch.target.removeEventListener(type, listener, options);
  }
  touch = undefined;
}

function updateEdgeScroll(time) {
  // Long frames are capped, so the page doesn't jump after the tab was in the background
  const elapsed = Math.min(time - (edgeScroll.time ?? time), 50);
  edgeScroll.time = time;

  // Sub-pixel amounts are carried over, because scrollBy can round them away
  edgeScroll.remainder += edgeScrollSpeed(edgeScroll.y) * elapsed;
  const amount = Math.trunc(edgeScroll.remainder);
  if (amount) {
    edgeScroll.remainder -= amount;
    window.scrollBy({ top: amount, behavior: "instant" });
    // The page moved under the finger. After the finger is lifted, the page only keeps scrolling
    if (touch?.dragging) {
      touchTarget = document.elementFromPoint(edgeScroll.x, edgeScroll.y);
    }
  }

  edgeScroll.frame = requestAnimationFrame(updateEdgeScroll);
}

function stopEdgeScroll() {
  if (edgeScroll) {
    cancelAnimationFrame(edgeScroll.frame);
    edgeScroll = undefined;
  }
}

/**
 * @param {number} y Finger position in the viewport
 * @returns {number} Scroll speed in pixels per millisecond, negative scrolls up and 0 is outside the edge zones
 */
function edgeScrollSpeed(y) {
  const viewportHeight = window.innerHeight;
  const size = Math.min(EDGE_SCROLL_SIZE, viewportHeight / 4);
  const topDepth = size - y;
  const bottomDepth = y - (viewportHeight - size);
  const depth = Math.max(topDepth, bottomDepth);
  if (depth <= 0) {
    return 0;
  }

  // Speed eases in, so the scrolling starts slow at the inner edge of the zone
  const speed = Math.min(depth / size, 1) ** 2 * EDGE_SCROLL_MAX_SPEED;
  return topDepth > 0 ? -speed : speed;
}

// Long pressing a trigger shouldn't open the browser's context menu, select text or start dragging a link
function preventTouchDefault(e) {
  if (touch?.onTrigger) {
    e.preventDefault();
  }
}

function findTouch(touches, id) {
  return Array.prototype.find.call(touches, t => t.identifier === id);
}

function isInsideTrigger(elem) {
  for (; elem; elem = elem.parentElement) {
    if (entriesByTrigger.has(elem)) {
      return true;
    }
  }
  return false;
}

const listeners = [
  ["pointerover", e => {
    pointerTarget = e.target;
    touchInput = e.pointerType === "touch";
  }, { passive: true }],
  ["touchstart", handleTouchStart, { passive: true }],
  // Does nothing, the touch target listeners handle touchmove. Browsers decide whether touchmove can be prevented
  // when the touch starts, before those are added, so this non-passive listener lets drag hovering stop the page from scrolling.
  ["touchmove", () => {}, { passive: false }],
  ["contextmenu", preventTouchDefault, {}],
  ["selectstart", preventTouchDefault, {}],
  ["dragstart", preventTouchDefault, {}],
];
for (const [type, listener, options] of listeners) {
  window.addEventListener(type, listener, { ...options, capture: true });
}

// Hover state is polled every frame instead of using pointer events,
// because pointerleave is not reliable when elements move or get removed under the cursor.
// Only the triggers that are ancestors of the hovered or focused element can open,
// so we don't need to check every registered trigger.
function tick() {
  const candidates = new Set(openEntries);
  addAncestorEntries(candidates, pointerTarget);
  addAncestorEntries(candidates, touchTarget);
  addAncestorEntries(candidates, document.activeElement);

  for (const entry of candidates) {
    // Closing a hover can dispose nested hovers during this loop
    if (entry.disposed) {
      continue;
    }

    const open = !!entry.trigger?.isConnected && (touchInput
      ? entry.trigger.contains(touchTarget) || entry.trigger.matches(FOCUS_SELECTOR)
      : entry.trigger.matches(HOVER_SELECTOR));
    // setOpen renders the floating element synchronously, so it can be placed in the same frame
    entry.setOpen(open);

    if (open) {
      openEntries.add(entry);
      if (entry.place && entry.floating?.isConnected) {
        entry.place(entry.trigger, entry.floating);
      }
    } else {
      openEntries.delete(entry);
    }
  }

  frame = entryCount ? requestAnimationFrame(tick) : undefined;
}

function addAncestorEntries(candidates, elem) {
  for (; elem; elem = elem.parentElement) {
    entriesByTrigger.get(elem)?.forEach(entry => candidates.add(entry));
  }
}

function setTrigger(entry, elem) {
  if (entry.trigger === elem) {
    return;
  }

  removeTrigger(entry);
  entry.trigger = elem;
  if (elem) {
    if (!entriesByTrigger.has(elem)) {
      entriesByTrigger.set(elem, new Set());
      // Long press starts drag hovering, and iOS doesn't fire contextmenu for its link and image previews, so they can only be disabled with CSS
      elem.style.setProperty("-webkit-touch-callout", "none");
    }
    entriesByTrigger.get(elem).add(entry);
  }
}

function removeTrigger(entry) {
  const entries = entry.trigger && entriesByTrigger.get(entry.trigger);
  entries?.delete(entry);
  if (entries?.size === 0) {
    entriesByTrigger.delete(entry.trigger);
    entry.trigger.style.removeProperty("-webkit-touch-callout");
  }
}

function register() {
  entryCount++;
  frame ??= requestAnimationFrame(tick);
}

function unregister(entry) {
  entry.disposed = true;
  entryCount--;
  removeTrigger(entry);
  openEntries.delete(entry);
}

import.meta.hot?.dispose(() => {
  cancelAnimationFrame(frame);
  stopEdgeScroll();
  cancelTouch();
  for (const [type, listener] of listeners) {
    window.removeEventListener(type, listener, { capture: true });
  }
  entryCount = 0;
  openEntries.clear();
});

/**
 * Tracks if the trigger element is hovered or focused, and keeps the floating element positioned next to it.
 *
 * @example
 * const hover = createHover({ placements: ["top", "bottom"], offset: 8 });
 *
 * <button ref={hover.triggerRef}>...</button>
 * <Show when={hover.isOpen()}>
 *   <HoverPortal>
 *     <div class="tooltip" ref={hover.floatingRef}>...</div>
 *   </HoverPortal>
 * </Show>
 *
 * @param {HoverOptions} [options]
 * @returns {Hover}
 */
export function createHover(options = {}) {
  const [isOpen, setOpen] = createSignal(false);

  /** @type {HoverEntry} */
  const entry = {
    setOpen,
    place: options.place ?? (options.placements && placeFirstFit(options)),
  };

  register();
  onCleanup(() => unregister(entry));

  return {
    triggerRef: elem => setTrigger(entry, elem),
    floatingRef: elem => entry.floating = elem,
    isOpen,
  };
}

/**
 * Renders children inside the global #hovers layer, so they are not clipped by overflow of the parent elements.
 * Remember to add position: absolute to the floating element.
 */
export function HoverPortal(props) {
  return (
    <Portal mount={document.getElementById("hovers")}>
      {props.children}
    </Portal>
  );
}

/**
 * Positions the floating element to the first placement that fits.
 * The chosen placement is returned and stored in floating.dataset.placement for styling.
 *
 * @param {HoverOptions} options
 * @returns {(trigger: HTMLElement, floating: HTMLElement) => HoverPlacement}
 */
export function placeFirstFit({ placements, offset = 0, alignOffset = 0 }) {
  const parsed = placements.map(placement => {
    const [side, align = "center"] = placement.split("-");
    return { side, align };
  });

  return (trigger, floating) => {
    // Coordinates are relative to the positioned container, for example #hovers
    const container = floating.offsetParent ?? document.documentElement;
    const containerRect = container.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();

    const rect = {
      x: triggerRect.left - containerRect.left,
      y: triggerRect.top - containerRect.top,
      width: triggerRect.width,
      height: triggerRect.height,
    };
    const size = { width: floating.offsetWidth, height: floating.offsetHeight };
    const maxX = container.clientWidth - size.width;
    // Visible area of the viewport in container coordinates
    const viewportTop = -containerRect.top;
    const viewportBottom = viewportTop + document.documentElement.clientHeight;

    const positions = parsed.map(placement => {
      const position = computePosition(rect, size, placement, offset, alignOffset);
      // Top and bottom placements are clamped horizontally, so they always fit sideways
      if (placement.side === "top" || placement.side === "bottom") {
        position.x = clamp(position.x, 0, maxX);
      }
      return position;
    });

    const fitsHorizontally = position => position.x >= 0 && position.x <= maxX && position.y >= 0;
    const fitsViewport = position => fitsHorizontally(position) && position.y >= viewportTop && position.y + size.height <= viewportBottom;

    // The current placement is kept while it still fits, so the floating element doesn't jump back while scrolling.
    // Otherwise prefer placements that are fully visible, e.g. "right-start" near the bottom of the viewport swaps to "right-end".
    // If none of them are, fall back to the first one that fits sideways.
    const current = placements.indexOf(floating.dataset.placement);
    const findFit = fits => current !== -1 && fits(positions[current]) ? current : positions.findIndex(fits);
    let index = findFit(fitsViewport);
    if (index === -1) index = findFit(fitsHorizontally);
    if (index === -1) index = placements.length - 1;

    const placement = placements[index];
    const position = positions[index];
    floating.style.left = position.x + "px";
    floating.style.top = position.y + "px";
    if (floating.dataset.placement !== placement) {
      floating.dataset.placement = placement;
    }
    return placement;
  };
}

function computePosition(rect, size, { side, align }, offset, alignOffset) {
  if (side === "left" || side === "right") {
    return {
      x: side === "left" ? rect.x - size.width - offset : rect.x + rect.width + offset,
      y: alignAxis(rect.y, rect.height, size.height, align, alignOffset),
    };
  }

  return {
    x: alignAxis(rect.x, rect.width, size.width, align, alignOffset),
    y: side === "top" ? rect.y - size.height - offset : rect.y + rect.height + offset,
  };
}

function alignAxis(start, triggerSize, floatingSize, align, inset) {
  if (align === "start") return start + inset;
  if (align === "end") return start + triggerSize - floatingSize - inset;
  return start + triggerSize / 2 - floatingSize / 2;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}
