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

const handlePointerOver = e => pointerTarget = e.target;
window.addEventListener("pointerover", handlePointerOver, { passive: true, capture: true });

// Hover state is polled every frame instead of using pointer events,
// because pointerleave is not reliable when elements move or get removed under the cursor.
// Only the triggers that are ancestors of the hovered or focused element can open,
// so we don't need to check every registered trigger.
function tick() {
  const candidates = new Set(openEntries);
  addAncestorEntries(candidates, pointerTarget);
  addAncestorEntries(candidates, document.activeElement);

  for (const entry of candidates) {
    // Closing a hover can dispose nested hovers during this loop
    if (entry.disposed) {
      continue;
    }

    const open = !!entry.trigger?.isConnected && entry.trigger.matches(HOVER_SELECTOR);
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
    }
    entriesByTrigger.get(elem).add(entry);
  }
}

function removeTrigger(entry) {
  const entries = entry.trigger && entriesByTrigger.get(entry.trigger);
  entries?.delete(entry);
  if (entries?.size === 0) {
    entriesByTrigger.delete(entry.trigger);
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
  window.removeEventListener("pointerover", handlePointerOver, { capture: true });
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

    let position, index;
    for (index = 0; index < parsed.length; index++) {
      const placement = parsed[index];
      position = computePosition(rect, size, placement, offset, alignOffset);

      // Top and bottom placements are clamped horizontally, so they always fit sideways
      if (placement.side === "top" || placement.side === "bottom") {
        position.x = clamp(position.x, 0, maxX);
      }

      if (position.x >= 0 && position.x <= maxX && position.y >= 0) {
        break;
      }
    }

    const placement = placements[Math.min(index, placements.length - 1)];
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
