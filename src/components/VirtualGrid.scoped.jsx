import { createMemo, createSignal, For, onCleanup, onMount, splitProps } from "solid-js";
import "./VirtualGrid.scoped.css";

// Last measured grid size per layout. This gives new grids their full height on the first render, so the scroll position is kept when navigating back
const lastGrids = {
  cards: {columns: 1, rowHeight: 0, rowGap: 0},
  rows: {columns: 1, rowHeight: 0, rowGap: 0},
};

// Only renders the rows near the viewport, the height of the other rows is filled with padding
// Grids outside the viewport render no rows at all, so pages with many grids (like the user media lists) only render the visible ones
// Children get the entry and its index in the whole each list
// By default the children are cover sized cards. With the rows prop every child is its own row, and all the rows have to be the same height
export function VirtualGrid(props) {
  const [local, scoping] = splitProps(props, ["each", "children", "class", "rows"]);
  // Not reactive, the layout of a mounted grid doesn't change
  const layout = local.rows ? "rows" : "cards";
  let ref;
  // The padding only changes the grid height, so the grid can measure its own columns and row height
  const [grid, setGrid] = createSignal(lastGrids[layout], { equals: (a, b) => a.columns === b.columns && a.rowHeight === b.rowHeight && a.rowGap === b.rowGap });
  const [viewport, setViewport] = createSignal({ top: 0, bottom: 0 });
  const rowCount = () => Math.ceil(local.each.length / grid().columns);
  const rowAt = y => Math.max(y / (grid().rowHeight || Infinity), 0);
  const firstRow = createMemo(() => Math.min(Math.floor(rowAt(viewport().top)), rowCount()));
  // Row height is measured from a rendered row, so the first row is rendered until the height is known
  const lastRow = createMemo(() => {
    if (!grid().rowHeight) return Math.min(1, rowCount());
    return Math.max(Math.min(Math.ceil(rowAt(viewport().bottom)), rowCount()), firstRow());
  });
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
    const rowHeight = layout === "rows" ? ref.firstElementChild?.getBoundingClientRect().height : parseFloat(tracks[0]) * 8 / 5.5;
    if (!rowHeight) return;
    lastGrids[layout] = {columns: tracks.length, rowHeight: rowHeight + rowGap, rowGap};
    setGrid(lastGrids[layout]);
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
    <div {...scoping} ref={elem => ref = elem} classList={{ "virtual-grid": true, rows: layout === "rows", [local.class]: !!local.class }} style={{
      "padding-top": `${paddingTop()}px`,
      "padding-bottom": `${paddingBottom()}px`,
    }}>
      <For each={visibleEntries()}>{(entry, i) => local.children(entry, () => firstIndex() + i())}</For>
    </div>
  );
}
