import { createEffect, createMemo, createSignal, For, onCleanup, onMount, splitProps } from "solid-js";
import "./VirtualList.scoped.css";

// Average height of the last measured list items. This gives new lists close to their full height on the first render, so the scroll position is kept when navigating back
let lastEstimate = 0;

// Only renders the items near the viewport, the height of the other items is filled with padding
// Items can have different heights. Rendered items are measured, and items that haven't been rendered yet use the average measured height
// When an item above the viewport turns out to have a different height, browser scroll anchoring keeps the visible items in place
// Children get the entry and its index in the whole each list. Every child has to render exactly one element without margins
export function VirtualList(props) {
  const [local, scoping] = splitProps(props, ["each", "children", "class", "overScan"]);
  let ref;
  // Measured border box heights by the entry index
  const heights = [];
  let measuredTotal = 0, measuredCount = 0;
  const [estimate, setEstimate] = createSignal(lastEstimate);
  const [gap, setGap] = createSignal(0);
  const [measured, setMeasured] = createSignal(undefined, { equals: false });
  const [viewport, setViewport] = createSignal({ top: 0, bottom: 0 });

  // offsets[i] is the top of the item i, and offsets[length] is the full height plus one gap
  const offsets = createMemo(() => {
    measured();
    const length = local.each.length;
    const offsets = new Float64Array(length + 1);
    for (let i = 0; i < length; i++) {
      offsets[i + 1] = offsets[i] + (heights[i] ?? estimate()) + gap();
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
  // The rendered items don't have a gap after the last item. When no items are rendered, that gap is removed from the padding instead
  const paddingTop = () => firstIndex() < endIndex() ? offsets()[firstIndex()] : 0;
  const paddingBottom = () => firstIndex() < endIndex()
    ? offsets()[local.each.length] - offsets()[endIndex()]
    : Math.max(offsets()[local.each.length] - gap(), 0);
  const visibleEntries = createMemo(() => local.each.slice(firstIndex(), endIndex()));

  // Rendered elements by the entry index they belong to
  let indexByElement = new Map();

  const itemObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const index = indexByElement.get(entry.target);
      if (index === undefined) continue;

      const height = entry.borderBoxSize[0].blockSize;
      if (height === heights[index]) continue;

      if (heights[index] === undefined) measuredCount++;
      else measuredTotal -= heights[index];
      measuredTotal += height;
      heights[index] = height;
    }

    lastEstimate = measuredTotal / measuredCount || lastEstimate;
    setEstimate(lastEstimate);
    setMeasured();
  });

  // Rendered children are matched to their entries by their order
  createEffect(() => {
    const first = firstIndex();
    visibleEntries();
    indexByElement = new Map();
    itemObserver.disconnect();
    // Observing again also measures the elements again, because an element can move to another index without resizing
    [...ref.children].forEach((element, i) => {
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
    const listObserver = new ResizeObserver(() => setGap(parseFloat(getComputedStyle(ref).rowGap) || 0));
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
    <div {...scoping} ref={elem => ref = elem} classList={{ "virtual-list": true, [local.class]: !!local.class }} style={{
      "padding-top": `${paddingTop()}px`,
      "padding-bottom": `${paddingBottom()}px`,
    }}>
      <For each={visibleEntries()}>{(entry, i) => local.children(entry, () => firstIndex() + i())}</For>
    </div>
  );
}
