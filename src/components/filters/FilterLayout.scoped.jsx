import { Show } from "solid-js";
import { CloseIcon, FiltersIcon, SearchIcon } from "@/assets/icons.jsx";
import "./FilterLayout.scoped.css";

export function FilterGroups(props) {
  return (
    <div class="filter-groups">
      {props.children}
    </div>
  );
}

export function FilterGroup(props) {
  return (
    <section class="filter-group" classList={{ [props.class]: !!props.class }}>
      <h3>{props.title}</h3>
      <div class="filters">
        {props.children}
      </div>
    </section>
  );
}

export function FilterSearchInput(props) {
  return (
    <label class="search-input">
      <SearchIcon scoped />
      <input type="search" placeholder="Search..." onInput={props.onInput} value={props.value} enterkeyhint="search" />
    </label>
  );
}

/**
 * Search bar fixed to the bottom of the screen, with a button that opens the filters inside a modal
 *
 * @param {Object} props
 * @param {import("solid-js").JSX.Element} props.search
 * @param {number} props.filterCount Shown on top of the filters button
 * @param {import("solid-js").JSX.Element} [props.action] Absolutely positioned against the bottom bar
 * @param {import("solid-js").JSX.Element} props.children Content of the modal
 */
export function MobileFilters(props) {
  let dialog, closing = false;
  const SLIDE_DURATION = 250;
  const slide = (from, to, easing, fill) => dialog.animate({ translate: [from, to] }, { duration: SLIDE_DURATION, easing, fill });
  const fadeBackdrop = (from, to, fill) => dialog.animate({ opacity: [from, to] }, { duration: SLIDE_DURATION, pseudoElement: "::backdrop", fill });

  const openFilters = () => {
    dialog.showModal();
    slide("0 100%", "0 0", "ease-out");
    fadeBackdrop(0, 1);
  };
  const closeFilters = async () => {
    if (closing || !dialog.open) return;
    closing = true;
    const from = dialog.style.translate || "0 0";
    dialog.style.translate = "";
    // Fill keeps the modal hidden until it's closed, the animations are removed after closing
    const animations = [fadeBackdrop(1, 0, "forwards"), slide(from, "0 100%", "ease-in", "forwards")];
    await animations[1].finished.catch(() => {});
    dialog.close();
    animations.forEach(animation => animation.cancel());
    closing = false;
  };
  const handleDialogClick = e => {
    // Clicked the backdrop
    if (e.target === dialog && !dragged) closeFilters();
    dragged = false;
  };
  const handleDialogCancel = e => {
    // Escape key, play the closing animation instead of closing instantly
    e.preventDefault();
    closeFilters();
  };

  // Drag the modal header down to close the modal. Pointer events work for both touch and mouse
  let dragStartY, dragged = false;
  const dragDistance = e => Math.max(0, e.clientY - dragStartY);
  const handleDragStart = e => {
    // Don't start dragging from the close button
    if (e.button !== 0 || e.target.closest("button")) return;
    e.preventDefault(); // Prevents text selection with mouse
    dragStartY = e.clientY;
    dragged = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handleDragMove = e => {
    if (dragStartY === undefined) return;
    if (dragDistance(e) > 5) dragged = true;
    dialog.style.translate = `0 ${dragDistance(e)}px`;
  };
  const handleDragEnd = e => {
    if (dragStartY === undefined) return;
    const distance = dragDistance(e);
    dragStartY = undefined;
    if (distance > 100) return closeFilters();
    // Not dragged far enough, snap back
    dialog.style.translate = "";
    slide(`0 ${distance}px`, "0 0", "ease-out");
  };

  return (
    <>
      <div class="bottom-bar">
        {props.action}
        {props.search}
        <button class="filters-button" onClick={openFilters} aria-label="Open filters">
          <FiltersIcon scoped />
          <Show when={props.filterCount}>
            <span class="count">{props.filterCount}</span>
          </Show>
        </button>
      </div>
      <dialog class="filters-modal" ref={elem => dialog = elem} onClick={handleDialogClick} onCancel={handleDialogCancel}>
        <div class="modal-header" onPointerDown={handleDragStart} onPointerMove={handleDragMove} onPointerUp={handleDragEnd} onPointerCancel={handleDragEnd}>
          <h2>Filters</h2>
          <button class="close-button" onClick={closeFilters} aria-label="Close filters">
            <CloseIcon scoped />
          </button>
        </div>
        <div class="modal-content">
          {props.children}
        </div>
        <div class="modal-footer">
          <button class="show-results" onClick={closeFilters}>Show results</button>
        </div>
      </dialog>
    </>
  );
}
