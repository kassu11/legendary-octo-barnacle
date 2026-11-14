import { createMemo, createSignal, For, onCleanup, onMount, splitProps } from "solid-js";
import "./VirtualGrid.scoped.css";

// Last measured grid size. This gives new grids their full height on the first render, so the scroll position is kept when navigating back
let lastGrid = {columns: 1, rowHeight: 0, rowGap: 0};

// Only renders the rows near the viewport, the height of the other rows is filled with padding
// Grids outside the viewport render no rows at all, so pages with many grids (like the user media lists) only render the visible ones
// Children get the entry and its index in the whole each list
export function VirtualGrid(props) {
  const [local, scoping] = splitProps(props, ["each", "children", "class"]);
  let ref;
  // The padding only changes the grid height, so the grid can measure its own columns and row height
  const [grid, setGrid] = createSignal(lastGrid, { equals: (a, b) => a.columns === b.columns && a.rowHeight === b.rowHeight && a.rowGap === b.rowGap });
  const [viewport, setViewport] = createSignal({ top: 0, bottom: 0 });
  const rowCount = () => Math.ceil(local.each.length / grid().columns);
  const rowAt = y => Math.max(y / (grid().rowHeight || Infinity), 0);
  const firstRow = createMemo(() => Math.min(Math.floor(rowAt(viewport().top)), rowCount()));
  const lastRow = createMemo(() => Math.max(Math.min(Math.ceil(rowAt(viewport().bottom)), rowCount()), firstRow()));
  // The rendered rows don't have a gap after the last row. When no rows are rendered, that gap is removed from the padding instead
  const paddingTop = () => firstRow() < lastRow() ? firstRow() * grid().rowHeight : 0;
  const paddingBottom = () => firstRow() < lastRow()
    ? (rowCount() - lastRow()) * grid().rowHeight
    : Math.max(rowCount() * grid().rowHeight - grid().rowGap, 0);
  const firstIndex = () => firstRow() * grid().columns;
  const visibleEntries = createMemo(() => local.each.slice(firstIndex(), lastRow() * grid().columns));

  const measureGrid = () => {
    const style = getComputedStyle(ref);
    const tracks = style.gridTemplateColumns.split(" ");
    const rowGap = parseFloat(style.rowGap);
    lastGrid = {columns: tracks.length, rowHeight: parseFloat(tracks[0]) * 8 / 5.5 + rowGap, rowGap};
    setGrid(lastGrid);
  };

  const updateViewport = () => {
    const { top } = ref.getBoundingClientRect();
    const overScan = props.overScan ?? 800;
    setViewport({ top: -top - overScan, bottom: window.innerHeight - top + overScan });
  };

  onMount(() => {
    const gridObserver = new ResizeObserver(measureGrid);
    gridObserver.observe(ref);
    // The body size changes also when something above the list changes its height
    const observer = new ResizeObserver(updateViewport);
    observer.observe(document.body);
    window.addEventListener("scroll", updateViewport, { passive: true });
    window.addEventListener("resize", updateViewport);
    onCleanup(() => {
      gridObserver.disconnect();
      observer.disconnect();
      window.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
    });
  });

  return (
    <div {...scoping} ref={elem => ref = elem} classList={{ "virtual-grid": true, [local.class]: !!local.class }} style={{
      "padding-top": `${paddingTop()}px`,
      "padding-bottom": `${paddingBottom()}px`,
    }}>
      <For each={visibleEntries()}>{(entry, i) => local.children(entry, () => firstIndex() + i())}</For>
    </div>
  );
}
