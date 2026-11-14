import { createEffect, createMemo, createSignal, For, onCleanup, onMount, Show, splitProps } from "solid-js";
import "./VirtualList.scoped.css";

// Average item height and gap of the last measured list. This gives new lists close to their full height on the first render
let lastEstimate = 0;
let lastGap = 0;
// Measured item heights by the cacheKey prop, so a list that is rendered again (like when navigating back) gets the same height and the scroll position is kept
const measurementCaches = new Map();

// Only renders the items near the viewport, the height of the other items is filled with spacer elements
// Items can have different heights. Rendered items are measured, and items that haven't been rendered yet use the average measured height
// When an item above the viewport turns out to have a different height, browser scroll anchoring keeps the visible items in place.
// Scroll anchoring is cancelled by padding changes on the ancestors of the anchor element, so spacer elements are used instead of padding
// Falsy entries are placeholders, their height is only used until the real item for the same index has been measured
// Children get the entry and its index in the whole each list. Every child has to render exactly one element without margins
export function VirtualList(props) {
  const [local, scoping] = splitProps(props, ["each", "children", "class", "overScan", "cacheKey"]);
  let ref;
  const [gap, setGap] = createSignal(lastGap);
  const [measured, setMeasured] = createSignal(undefined, { equals: false });
  const [viewport, setViewport] = createSignal({ top: 0, bottom: 0 });

  // Measured border box heights by the entry index
  const measurements = createMemo(() => {
    const newMeasurements = { heights: [], total: 0, count: 0 };
    if (local.cacheKey == null) return newMeasurements;
    if (!measurementCaches.has(local.cacheKey)) measurementCaches.set(local.cacheKey, newMeasurements);
    return measurementCaches.get(local.cacheKey);
  });
  const estimate = () => {
    measured();
    const { total, count } = measurements();
    return count ? total / count : lastEstimate;
  };

  // offsets[i] is the top of the item i, and offsets[length] is the full height plus one gap
  const offsets = createMemo(() => {
    measured();
    const { heights } = measurements();
    const length = local.each.length;
    const offsets = new Float64Array(length + 1);
    const estimatedHeight = estimate();
    for (let i = 0; i < length; i++) {
      offsets[i + 1] = offsets[i] + (heights[i] ?? estimatedHeight) + gap();
    }
    return offsets;
  });

  // Index of the first item that passes the check, the offsets only grow so binary search can be used
  const findIndex = check => {
    let low = 0, high = local.each.length;
    while (low < high) {
      const middle = (low + high) >> 1;
      if (check(middle)) high = middle;
      else low = middle + 1;
    }
    return low;
  };

  // First item whose bottom is below the viewport top
  const firstIndex = createMemo(() => findIndex(i => offsets()[i + 1] - gap() > viewport().top));
  // Item heights are unknown until the first item is measured, so only the first item is rendered until then
  const endIndex = createMemo(() => {
    if (!estimate()) return Math.min(1, local.each.length);
    return Math.max(findIndex(i => offsets()[i] >= viewport().bottom), firstIndex());
  });
  // The grid gap is also added between the spacers and the items, so it is removed from the spacer heights.
  // When no items are rendered, the bottom spacer fills the whole list
  const topSpace = () => firstIndex() < endIndex() && firstIndex() > 0 ? offsets()[firstIndex()] - gap() : 0;
  const bottomSpace = () => {
    const length = local.each.length;
    if (firstIndex() === endIndex()) return Math.max(offsets()[length] - gap(), 0);
    if (endIndex() === length) return 0;
    return offsets()[length] - offsets()[endIndex()] - gap();
  };
  const visibleEntries = createMemo(() => local.each.slice(firstIndex(), endIndex()));

  // Rendered elements by the entry index they belong to
  let indexByElement = new Map();

  const itemObserver = new ResizeObserver(entries => {
    const { heights } = measurements();
    let changed = false;
    for (const entry of entries) {
      const index = indexByElement.get(entry.target);
      if (index === undefined) continue;

      const height = entry.borderBoxSize[0].blockSize;
      if (height === heights[index]) continue;
      if (!local.each[index] && heights[index] !== undefined) continue;

      if (heights[index] === undefined) measurements().count++;
      else measurements().total -= heights[index];
      measurements().total += height;
      heights[index] = height;
      changed = true;
    }

    if (!changed) return;
    lastEstimate = measurements().total / measurements().count;
    setMeasured();
  });

  // Rendered children are matched to their entries by their order
  createEffect(() => {
    const first = firstIndex();
    visibleEntries();
    indexByElement = new Map();
    itemObserver.disconnect();
    // Observing again also measures the elements again, because an element can move to another index without resizing
    [...ref.children].filter(element => !element.hasAttribute("data-spacer")).forEach((element, i) => {
      indexByElement.set(element, first + i);
      itemObserver.observe(element);
    });
  });

  const updateViewport = () => {
    const { top } = ref.getBoundingClientRect();
    const overScan = local.overScan ?? 800;
    setViewport({ top: -top - overScan, bottom: window.innerHeight - top + overScan });
  };

  onMount(() => {
    // The gap can change with media queries
    const listObserver = new ResizeObserver(() => setGap(lastGap = parseFloat(getComputedStyle(ref).rowGap) || 0));
    listObserver.observe(ref);
    // The body size changes also when something above the list changes its height
    const observer = new ResizeObserver(updateViewport);
    observer.observe(document.body);
    window.addEventListener("scroll", updateViewport, { passive: true });
    window.addEventListener("resize", updateViewport);
    onCleanup(() => {
      listObserver.disconnect();
      observer.disconnect();
      window.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
    });
  });

  onCleanup(() => itemObserver.disconnect());

  return (
    <div {...scoping} ref={elem => ref = elem} classList={{ "virtual-list": true, [local.class]: !!local.class }}>
      <Show when={topSpace() > 0}>
        <div class="spacer" data-spacer style={{ height: `${topSpace()}px` }} />
      </Show>
      <For each={visibleEntries()}>{(entry, i) => local.children(entry, () => firstIndex() + i())}</For>
      <Show when={bottomSpace() > 0}>
        <div class="spacer" data-spacer style={{ height: `${bottomSpace()}px` }} />
      </Show>
    </div>
  );
}
