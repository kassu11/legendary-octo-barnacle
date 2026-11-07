import { createEffect, createMemo, createSelector, createSignal, createUniqueId, For, Match, on, onCleanup, Show, Switch } from "solid-js";
import { useResponsive } from "@/context/providers.js";
import { Tooltip } from "@/components/Tooltip.scoped.jsx";
import { XIcon } from "@/assets/SearchFilterIcons.jsx";
import SortAlphabetDescendingIcon from "@/assets/SortAlphaDown.jsx";
import SortAlphabetAscendingIcon from "@/assets/SortAlphaUp.jsx";
import SortNumericDescendingIcon from "@/assets/SortNumericDown.jsx";
import SortNumericAscendingIcon from "@/assets/SortNumericUp.jsx";
import { Checkbox } from "@/pages/Search/Checkbox.scoped.jsx";
import "./ListFilterSelect.scoped.css";

// Holding an arrow key would otherwise update the url and run the list worker around 30 times per second
const WRITE_THROTTLE_MS = 100;
const PAGE_JUMP = 10;
const DRAG_SCROLL_ZONE = 20;
const TOUCH_DRAG_SCROLL_ZONE = 56;
const DRAG_SCROLL_SPEED = 8;
const DRAG_START_DISTANCE = 5;
const TOUCH_HOLD_MS = 300;
const TOUCH_HOLD_MOVE_LIMIT = 8;
const SHEET_CLOSE_DISTANCE = 100;
const SORT_REVERSE_SUFFIX = "_reverse";

const sameIds = (a, b) => a.length === b.length && a.every((id, i) => id === b[i]);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
// Cmd is the same key on macOS, where Ctrl click opens the context menu
const isAdditive = e => e.ctrlKey || e.metaKey;
// Numbers are high to low by default and text is A to Z
const isDescendingSort = (type, reversed) => (type === "alphabetic") === reversed;

function SortDirection(props) {
  return (
    <Switch>
      <Match when={props.type === "alphabetic" && isDescendingSort(props.type, props.reversed)}><SortAlphabetDescendingIcon scoped /></Match>
      <Match when={props.type === "alphabetic"}><SortAlphabetAscendingIcon scoped /></Match>
      <Match when={isDescendingSort(props.type, props.reversed)}><SortNumericDescendingIcon scoped /></Match>
      <Match when={true}><SortNumericAscendingIcon scoped /></Match>
    </Switch>
  );
}

/**
 * Values are written to the url as tokens. Filters use "id" and "-id" (excluded), sort uses "id" and "id_reverse", radio uses "id"
 *
 * Keyboard:
 * - Arrows, PageUp/Down, Home/End move the cursor, and the row under it filters the list right away (preview)
 * - Enter keeps the preview and cycles the row (include, exclude, remove), this also works in the search results
 * - Shift + arrows copy the state of the row under the cursor to every row they pass
 * - Delete removes the row under the cursor, Backspace removes the last selection
 * - Esc closes and drops the preview
 * - Sort and radio: arrows select the row, Ctrl + arrows only move the cursor, Ctrl + Enter adds the row and Shift + arrows or Shift + Enter fill from the previous selection
 * - Sort: Enter reverses the row
 * - Radio: Enter closes
 *
 * Mouse: click to cycle, shift click for a range, or drag over the rows to paint the same state to all of them.
 * Sort: click to sort by the row or reverse it, ctrl click to add it to the sort, shift click to add every row from the previous click
 * Radio: click to select only the row, ctrl click to add or remove it, shift click or drag to add every row from the previous click
 *
 * Range from a drag, shift click or Shift + arrows stays marked until the cursor moves without Shift or a row is clicked.
 * While it is marked, Enter cycles and Delete removes all of its rows
 *
 * Clicking the selected count moves the current selections to the top of the list
 *
 * Touch: opens as a bottom sheet, drag its header down to close it. Tap works like a click, hold a row and drag to paint (scrolling near the edges).
 * Sort and radio: hold a row to add it to the selection, and drag to add more
 *
 * @param {Object} props
 * @param {string} props.param Search param name
 * @param {string} props.button Label, also used as the placeholder of the input
 * @param {{ id: string, description: string, type?: "numeric" | "alphabetic" }[]} props.each
 * @param {string[]} props.value
 * @param {(params: Object) => void} props.setSearchParams
 * @param {boolean} [props.excludable] Rows can also be excluded
 * @param {boolean} [props.sort] Rows are sort fields, at least one is always selected
 * @param {boolean} [props.radio] Click selects only one row, but more can be added to it. At least one is always selected
 * @param {string} [props.defaultValue] Value that is left out of the url. With radio this row can't be selected together with other rows
 * @param {(id: string) => number} [props.countOf] Number shown at the end of the row
 */
export function ListFilterSelect(props) {
  const { isTouch } = useResponsive();
  const listboxId = createUniqueId();

  const [isOpen, setIsOpen] = createSignal(false);
  // Panel stays rendered until the closing transition has finished
  const [isClosing, setIsClosing] = createSignal(false);
  // Input keeps the focus when the mouse closes the panel and the modal returns it to the trigger button, but they should look like they don't until the keyboard is used
  const [isMouseClosed, setIsMouseClosed] = createSignal(false);
  const [query, setQuery] = createSignal("");
  const [cursor, setCursor] = createSignal(-1);
  const [preview, setPreview] = createSignal(null);
  const [marked, setMarked] = createSignal(new Set());
  // Ids of the rows sorted to the top. This is a copy of the selections, so rows don't move away from the pointer when they are toggled
  const [pinned, setPinned] = createSignal(null);
  // Url is updated with a delay, so this is the source of truth while the user is interacting with the select
  const [selected, setSelected] = createSignal(props.value, { equals: sameIds });

  // Row selects itself instead of cycling its state, and the selection is never empty
  const isSingle = () => props.sort || props.radio;

  const parseToken = token => {
    if (props.radio) return { id: token, alt: false };
    if (props.sort) {
      const reversed = token.endsWith(SORT_REVERSE_SUFFIX);
      return { id: reversed ? token.slice(0, -SORT_REVERSE_SUFFIX.length) : token, alt: reversed };
    }
    return token[0] === "-" ? { id: token.slice(1), alt: true } : { id: token, alt: false };
  };
  const toToken = (id, alt) => {
    if (!alt || props.radio) return id;
    return props.sort ? id + SORT_REVERSE_SUFFIX : "-" + id;
  };

  const entries = createMemo(() => new Map(selected().map((token, i) => {
    const { id, alt } = parseToken(token);
    return [id, { alt, order: i + 1 }];
  })));
  const isSelected = createSelector(entries, (id, map) => map.has(id));
  const isAlt = createSelector(entries, (id, map) => !!map.get(id)?.alt);
  const isPreview = createSelector(preview);
  const isMarked = createSelector(marked, (id, ids) => ids.has(id));

  const optionById = createMemo(() => new Map(props.each?.map(option => [option.id, option])));
  const labelOf = id => optionById().get(id)?.description ?? id;

  const matchingRows = createMemo(() => {
    const q = query().toLowerCase();
    return (props.each || []).filter(option => !q || option.description.toLowerCase().includes(q));
  });
  const pinnedRows = createMemo(() => {
    const ids = pinned() || [];
    return matchingRows().filter(row => ids.includes(row.id)).sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  });
  const rows = createMemo(() => {
    const top = new Set(pinnedRows());
    return [...pinnedRows(), ...matchingRows().filter(row => !top.has(row))];
  });
  const isCursor = createSelector(() => rows()[cursor()]?.id);

  const canClear = () => selected().length > 0 && !sameIds(selected(), [props.defaultValue]);

  const tokenLabel = token => {
    const { id, alt } = parseToken(token);
    if (props.sort) return `${labelOf(id)} ${isDescendingSort(optionById().get(id)?.type, alt) ? "↓" : "↑"}`;
    return (alt ? "−" : "") + labelOf(id);
  };
  const triggerLabel = () => selected().length ? `${props.button}: ${selected().map(tokenLabel).join(", ")}` : props.button;

  let root, input, openButton, panelRoot, scroller, list, dialog;

  let writeTimer;
  let hasPendingWrite = false;

  const flushWrite = () => {
    clearTimeout(writeTimer);
    writeTimer = undefined;
    if (!hasPendingWrite) return;

    hasPendingWrite = false;
    props.setSearchParams({ [props.param]: sameIds(selected(), [props.defaultValue]) ? [] : selected() });
    writeTimer = setTimeout(flushWrite, WRITE_THROTTLE_MS);
  };

  const updateSelected = tokens => {
    if (props.radio && tokens.length > 1) tokens = tokens.filter(token => token !== props.defaultValue);
    setSelected(isSingle() && !tokens.length ? [props.defaultValue] : tokens);
    hasPendingWrite = true;
    if (writeTimer === undefined) flushWrite();
  };

  createEffect(() => {
    const value = props.value;
    if (!hasPendingWrite) setSelected(value);
  });

  // Keeps the position of the token, so changing a state doesn't change the order of the selections
  const setToken = (tokens, id, token) => {
    const index = tokens.findIndex(val => parseToken(val).id === id);
    if (token === null) return index === -1 ? tokens : tokens.filter((_, i) => i !== index);
    return index === -1 ? [...tokens, token] : tokens.map((val, i) => i === index ? token : val);
  };

  // Paint is the state a row gets from a drag or a range: null removes, false includes, true excludes
  const paintOf = id => entries().get(id)?.alt ?? null;
  const nextPaint = paint => {
    if (paint === null) return false;
    return props.excludable && !paint ? true : null;
  };

  const toggleSingle = (id, additive) => {
    if (props.radio) {
      updateSelected(additive && id !== props.defaultValue ? setToken(selected(), id, entries().has(id) ? null : id) : [id]);
      return;
    }
    const token = toToken(id, entries().has(id) && !entries().get(id).alt);
    updateSelected(additive ? setToken(selected(), id, token) : [token]);
  };

  const remove = id => {
    if (preview() === id) setPreview(null);
    updateSelected(setToken(selected(), id, null));
  };

  // Every row between the anchor and the cursor. Rows are always painted on top of base, so the ones that drop out of the range get their old state back
  let range = null;

  const paintRange = () => {
    const { ids, paint, base } = range;
    setPreview(null);
    setMarked(new Set(ids.length > 1 && !isSingle() ? ids : []));
    updateSelected(ids.reduce((tokens, id) => {
      // Sort fields keep their direction when a drag passes them
      if (isSingle() && base.some(token => parseToken(token).id === id)) return tokens;
      return setToken(tokens, id, paint === null ? null : toToken(id, paint));
    }, base));
  };

  const startRange = (id, paint) => {
    range = { anchorId: id, ids: [id], paint, base: setToken(selected(), preview(), null) };
    paintRange();
  };

  // Next shift click or drag fills from this row, without changing the selections yet
  const setAnchor = id => {
    range = { anchorId: id, ids: [id], paint: false, base: selected() };
    setMarked(new Set());
  };

  // Row is already filtering the list, so selecting it means keeping it
  const startRangeWithNextState = id => startRange(id, preview() === id ? false : nextPaint(paintOf(id)));

  const extendRange = index => {
    const anchor = rows().findIndex(row => row.id === range.anchorId);
    if (anchor === -1) return;

    const ids = rows().slice(Math.min(anchor, index), Math.max(anchor, index) + 1).map(row => row.id);
    // Sort fields are added in the order they were passed
    range.ids = index < anchor ? ids.reverse() : ids;
    paintRange();
  };

  const repaintRange = paint => {
    range.paint = paint;
    paintRange();
  };

  const clearRange = () => {
    range = null;
    setMarked(new Set());
  };

  const scrollToCursor = () => list?.children[cursor()]?.scrollIntoView({ block: "nearest" });

  let snapshot = [];
  let outsideController;
  onCleanup(() => {
    clearTimeout(writeTimer);
    outsideController?.abort();
    stopDrag();
    cancelHold();
  });

  const open = () => {
    if (isOpen()) return;

    setIsMouseClosed(false);
    snapshot = selected();
    setCursor(isSingle() ? rows().findIndex(row => row.id === parseToken(selected()[0] ?? "").id) : -1);
    setIsOpen(true);
    setIsClosing(false);

    outsideController = new AbortController();
    window.addEventListener("pointerdown", e => {
      if (!root.contains(e.target)) close();
    }, { capture: true, signal: outsideController.signal });
  };

  const finishClosing = () => {
    if (!isClosing()) return;

    // Before the dialog is removed, this returns the focus to the trigger button
    if (dialog?.open) {
      dialog.close();
      setIsMouseClosed(true);
    }
    setIsClosing(false);
    // Reset only now, so the rows don't change while they are fading out
    setPinned(null);
    setQuery("");
  };

  const close = () => {
    outsideController?.abort();
    stopDrag();
    cancelHold();
    clearRange();
    setPreview(null);
    setCursor(-1);
    if (isOpen()) {
      // Keyboard closes with the sheet, so the focused input doesn't slide out of the screen while it is still open
      if (dialog?.open) input.blur();
      setIsClosing(true);
      setIsOpen(false);
      Promise.allSettled(panelRoot.getAnimations().map(animation => animation.finished)).then(finishClosing);
    }
    flushWrite();
  };

  const cancel = () => {
    if (!isOpen()) return;

    if (isSingle() || isTouch()) updateSelected(snapshot);
    else if (preview()) remove(preview());
    close();
  };

  createEffect(on(isTouch, () => {
    close();
    finishClosing();
    setIsMouseClosed(false);
  }, { defer: true }));

  const clearAll = () => {
    clearRange();
    setPreview(null);
    setPinned(null);
    updateSelected([]);
  };

  const selectedIdsWithoutPreview = () => selected().map(token => parseToken(token).id).filter(id => id !== preview());

  const togglePinned = e => {
    const ids = selectedIdsWithoutPreview();
    // Selections can change after sorting, then the next click sorts again instead of going back
    setPinned(pinned() && sameIds(pinned(), ids) ? null : ids);
    clearRange();
    setCursor(-1);
    scroller.scrollTop = 0;
    if (e.detail === 0) input.focus();
  };

  const handleCountKeyDown = e => {
    if (e.key !== "Escape") return;
    input.focus();
    handleKeyDown(e);
  };

  createEffect(on(isOpen, opened => {
    if (!opened) return;

    if (isTouch()) {
      // Without this the dialog focuses the first button. The input is still below the screen, so it can't be focused without preventScroll
      dialog.setAttribute("autofocus", "");
      // Typing in the search while the dialog is closing opens it again
      if (!dialog.open) dialog.showModal();
      input.focus({ preventScroll: true });
    }
    // Panel keeps its size while searching
    if (rows().length) scroller.style.height = scroller.offsetHeight + "px";
    scrollToCursor();
  }));

  const moveCursor = (delta, e) => {
    open();

    const from = cursor();
    const to = clamp(from + delta, 0, rows().length - 1);
    const target = rows()[to];
    if (!target || to === from) return;

    setCursor(to);
    scrollToCursor();

    if (isSingle() && isAdditive(e) && !e.shiftKey) return;
    if (e.shiftKey) {
      if (!range) {
        const anchorId = rows()[from === -1 ? to : from].id;
        startRange(anchorId, isSingle() ? false : paintOf(anchorId) ?? false);
      }
      return extendRange(to);
    }

    if (isSingle()) {
      updateSelected([toToken(target.id, entries().get(target.id)?.alt)]);
      return setAnchor(target.id);
    }

    clearRange();
    const withoutPreview = setToken(selected(), preview(), null);
    const hasTarget = withoutPreview.some(token => parseToken(token).id === target.id);
    setPreview(hasTarget ? null : target.id);
    updateSelected(hasTarget ? withoutPreview : [...withoutPreview, toToken(target.id, false)]);
  };

  const handleKeyDown = e => {
    setIsMouseClosed(false);
    switch (e.key) {
      case "ArrowDown": e.preventDefault(); return moveCursor(1, e);
      case "ArrowUp":   e.preventDefault(); return moveCursor(-1, e);
      case "PageDown":  e.preventDefault(); return moveCursor(PAGE_JUMP, e);
      case "PageUp":    e.preventDefault(); return moveCursor(-PAGE_JUMP, e);
      case "Home":
        if (query()) return;
        e.preventDefault();
        return moveCursor(-Infinity, e);
      case "End":
        if (query()) return;
        e.preventDefault();
        return moveCursor(Infinity, e);
      case " ":
        if (query()) return; // Multi word searches, like "slice of life"
        e.preventDefault();
        return open();
      case "Enter": {
        e.preventDefault();
        if (!isOpen()) return open();

        const row = rows()[cursor()];
        if (!row) {
          if (!query()) close();
          return;
        }

        if (props.radio && !e.shiftKey && !isAdditive(e)) {
          if (!entries().has(row.id)) toggleSingle(row.id, false);
          return close();
        }

        if (isSingle()) selectRow(row, e);
        else if (range) repaintRange(nextPaint(range.paint));
        else startRangeWithNextState(row.id);
        // Next Enter still cycles the same row, and typing replaces the search
        input.select();
        return;
      }
      case "Escape":
        if (!isOpen()) return setIsMouseClosed(true);
        e.preventDefault();
        return cancel();
      case "Backspace":
        if (query() || !selected().length) return;
        clearRange();
        return remove(parseToken(selected().at(-1)).id);
      case "Delete": {
        // Caret in the middle of the search is still normal text editing
        if (e.target.selectionEnd < e.target.value.length) return;

        const row = rows()[cursor()];
        if (!row) return;

        e.preventDefault();
        if (isSingle()) {
          clearRange();
          return remove(row.id);
        }
        if (!range) startRange(row.id, null);
        else repaintRange(null);
        return;
      }
    }
  };

  const handleInput = e => {
    open();
    clearRange();
    setPreview(null);
    setQuery(e.target.value);
    setCursor(e.target.value ? 0 : -1);
    if (scroller) scroller.scrollTop = 0;
  };

  const handleInputClick = () => {
    // Inside the modal the input is only for searching
    if (isTouch()) return;
    if (isOpen() && !query()) {
      close();
      setIsMouseClosed(true);
    } else {
      open();
    }
  };

  const handleFocusOut = e => {
    // Target is still the active element when only the window lost the focus
    if (document.activeElement !== e.target) setIsMouseClosed(false);
    // relatedTarget is null when focus left the page (dev tools, other window) or a click hit something unfocusable.
    // Clicks are handled by the outside pointerdown listener
    if (e.relatedTarget && !root.contains(e.relatedTarget)) close();
  };

  let drag = null;

  const dragTick = () => {
    if (!drag) return;

    // Click that didn't move is not a drag, no matter what ended up under the pointer
    if (drag.moved) {
      const rect = scroller.getBoundingClientRect();
      if (drag.y < rect.top + drag.scrollZone) scroller.scrollTop -= DRAG_SCROLL_SPEED;
      else if (drag.y > rect.bottom - drag.scrollZone) scroller.scrollTop += DRAG_SCROLL_SPEED;

      const element = document.elementFromPoint(rect.left + rect.width / 2, clamp(drag.y, rect.top + 1, rect.bottom - 1));
      const index = Array.prototype.indexOf.call(list.children, element?.closest("[role=option]"));
      if (index !== -1 && index !== drag.index) {
        extendRange(index);
        setCursor(index);
        drag.index = index;
      }
    }

    drag.frame = requestAnimationFrame(dragTick);
  };

  const startDrag = (row, y, scrollZone) => {
    drag = { y, startY: y, moved: false, index: rows().indexOf(row), scrollZone };
    drag.frame = requestAnimationFrame(dragTick);
  };

  const handleDragMove = e => {
    drag.moved ||= Math.abs(e.clientY - drag.startY) >= DRAG_START_DISTANCE;
    drag.y = e.clientY;
  };

  function stopDrag() {
    if (!drag) return;
    cancelAnimationFrame(drag.frame);
    drag.controller?.abort();
    drag = null;
  }

  const selectRow = (row, e) => {
    const index = rows().indexOf(row);
    const previousRow = rows()[cursor()];
    setCursor(index);

    if (e.shiftKey && (range || (isSingle() && previousRow))) {
      if (!range) setAnchor(previousRow.id);
      extendRange(index);
      return false;
    }

    if (isSingle()) {
      toggleSingle(row.id, isAdditive(e));
      setAnchor(row.id);
    } else {
      startRangeWithNextState(row.id);
    }
    return true;
  };

  let handledByMouse = false;

  const handleRowPointerDown = (e, row) => {
    handledByMouse = !props.sort && e.pointerType === "mouse";
    if (!handledByMouse || e.button !== 0) return;
    if (!selectRow(row, e)) return;

    startDrag(row, e.clientY, DRAG_SCROLL_ZONE);
    drag.controller = new AbortController();
    const { signal } = drag.controller;
    window.addEventListener("pointermove", handleDragMove, { signal });
    window.addEventListener("pointerup", stopDrag, { signal });
    window.addEventListener("pointercancel", stopDrag, { signal });
  };

  // Hold is what separates selecting from scrolling. Finger that moves before the timer is left for the browser to scroll with
  let hold = null;
  let ignoreNextClick = false;

  function cancelHold() {
    clearTimeout(hold?.timer);
    hold = null;
  }

  const startHold = (row, y) => {
    hold = null;
    ignoreNextClick = true;
    navigator.vibrate?.(10);
    setCursor(rows().indexOf(row));

    if (isSingle()) {
      toggleSingle(row.id, true);
      startRange(row.id, false);
    } else {
      startRangeWithNextState(row.id);
    }
    startDrag(row, y, TOUCH_DRAG_SCROLL_ZONE);
  };

  const handleTouchStart = e => {
    ignoreNextClick = false;
    cancelHold();

    const row = rows()[Array.prototype.indexOf.call(list.children, e.target.closest?.("[role=option]"))];
    if (!row || e.touches.length > 1) return;

    const { clientX, clientY } = e.touches[0];
    hold = { x: clientX, y: clientY, timer: setTimeout(() => startHold(row, clientY), TOUCH_HOLD_MS) };
  };

  const handleTouchMove = e => {
    const touch = e.touches[0];
    if (drag) {
      // Stops the browser from scrolling the list, only works in a non passive listener
      if (e.cancelable) e.preventDefault();
      return handleDragMove(touch);
    }
    if (hold && Math.hypot(touch.clientX - hold.x, touch.clientY - hold.y) > TOUCH_HOLD_MOVE_LIMIT) cancelHold();
  };

  const handleTouchEnd = () => {
    cancelHold();
    stopDrag();
  };

  const scrollerRef = elem => {
    scroller = elem;
    elem.addEventListener("touchstart", handleTouchStart, { passive: true });
    elem.addEventListener("touchmove", handleTouchMove, { passive: false });
    elem.addEventListener("touchend", handleTouchEnd);
    elem.addEventListener("touchcancel", handleTouchEnd);
  };

  const handleRowClick = (e, row) => {
    if (handledByMouse) return;
    if (ignoreNextClick) {
      ignoreNextClick = false;
      return;
    }
    selectRow(row, e);
  };

  const handleTriggerClearClick = e => {
    e.preventDefault();
    clearAll();
    if (e.detail === 0) (isTouch() ? openButton : input).focus();
  };

  const handlePanelMouseDown = e => {
    // Keeps the focus in the input, and prevents text selection while dragging over the rows
    if (e.target !== input) e.preventDefault();
  };

  // Pointer events work for both touch and mouse
  let sheetDragStartY, sheetDragged = false;
  const sheetDragDistance = e => Math.max(0, e.clientY - sheetDragStartY);

  const handleSheetDragStart = e => {
    if (e.button !== 0) return;
    sheetDragStartY = e.clientY;
    sheetDragged = false;
    e.currentTarget.setPointerCapture(e.pointerId);
    panelRoot.style.transition = "none";
  };

  const handleSheetDragMove = e => {
    if (sheetDragStartY === undefined) return;
    const distance = sheetDragDistance(e);
    if (distance > DRAG_START_DISTANCE) sheetDragged = true;
    panelRoot.style.translate = `0 ${distance}px`;
  };

  const handleSheetDragEnd = e => {
    if (sheetDragStartY === undefined) return;
    const distance = sheetDragDistance(e);
    sheetDragStartY = undefined;
    // Without the inline styles the panel transitions from where it was dragged, either back up or out of the screen
    panelRoot.style.transition = "";
    panelRoot.style.translate = "";
    if (distance > SHEET_CLOSE_DISTANCE) close();
  };

  const handleDialogClick = e => {
    // Clicked the backdrop
    if (e.target === dialog && !sheetDragged) close();
    sheetDragged = false;
  };

  const searchInput = () => (
    <input
      type="text"
      role="combobox"
      aria-expanded={isOpen()}
      aria-controls={listboxId}
      aria-activedescendant={rows()[cursor()] ? `${listboxId}-${cursor()}` : undefined}
      autocomplete="off"
      autocorrect="off"
      spellcheck={false}
      ref={elem => input = elem}
      value={query()}
      placeholder={isTouch() ? "Search..." : triggerLabel()}
      onInput={handleInput}
      onClick={handleInputClick}
      onKeyDown={handleKeyDown}
    />
  );

  const triggerCount = () => (
    <Show when={isSingle() ? selected().length > 1 : selected().length}>
      <span class="count">{selected().length}</span>
    </Show>
  );

  const triggerIcon = () => (
    <Show when={props.icon}>
      <span class="icon">{props.icon}</span>
    </Show>
  );

  // Touch can't hover to reveal the X, so there the count is rendered next to the button
  const triggerClear = () => (
    <Show when={canClear()}>
      <button class="trigger-clear" aria-label={`${isSingle() ? "Reset" : "Clear"} ${props.button}`} onMouseDown={e => e.preventDefault()} onClick={handleTriggerClearClick}>
        <Show when={!isTouch()}>{triggerCount()}</Show>
        <span class="clear-icon"><XIcon /></span>
      </button>
    </Show>
  );

  const panel = () => (
    <div class="panel" classList={{ mobile: isTouch() }} ref={elem => panelRoot = elem} onMouseDown={handlePanelMouseDown}>
      <Show when={isTouch()}>
        <div class="sheet-header" onPointerDown={handleSheetDragStart} onPointerMove={handleSheetDragMove} onPointerUp={handleSheetDragEnd} onPointerCancel={handleSheetDragEnd}>
          <span class="sheet-handle" />
          <h2>{props.button}</h2>
        </div>
      </Show>
      {/* Always rendered, so selecting the first row doesn't move the rows under the pointer */}
      <div class="selection-header">
        <button class="selected-count" title="Show selected first" aria-pressed={!!pinned()} disabled={!selectedIdsWithoutPreview().length} onClick={togglePinned} onKeyDown={handleCountKeyDown}>
          {props.sort ? "Sorted by" : "Selected"} {selected().length}
        </button>
        <button class="clear" tabindex="-1" disabled={!canClear()} onClick={clearAll}>{isSingle() ? "Reset" : "Clear all"}</button>
      </div>
      <div class="scroller" tabindex="-1" ref={scrollerRef} onScroll={cancelHold}>
        <div class="items" id={listboxId} role="listbox" aria-multiselectable={true} ref={elem => list = elem} onContextMenu={e => (drag || hold) && e.preventDefault()}>
          <For each={rows()} fallback={<p class="empty">No results</p>}>{(row, index) => (
            <div
              class="row"
              id={`${listboxId}-${index()}`}
              role="option"
              aria-selected={isSelected(row.id)}
              classList={{ selected: isSelected(row.id), excluded: !props.sort && isAlt(row.id), preview: isPreview(row.id), cursor: isCursor(row.id), marked: isMarked(row.id) }}
              onPointerDown={e => handleRowPointerDown(e, row)}
              onClick={e => handleRowClick(e, row)}
            >
              <Show when={props.sort} fallback={
                <span class="check">
                  <Checkbox radio={props.radio} checked={!props.excludable && isSelected(row.id)} include={props.excludable && isSelected(row.id) && !isAlt(row.id)} exclude={isAlt(row.id)} />
                </span>
              }>
                <span class="sort-direction">
                  <Show when={isSelected(row.id)}>
                    <SortDirection type={row.type} reversed={isAlt(row.id)} />
                  </Show>
                </span>
              </Show>
              <p>{row.description}</p>
              <Show when={props.countOf}>
                <span class="row-count">{props.countOf(row.id)}</span>
              </Show>
              <Show when={props.sort && entries().size > 1 && entries().get(row.id)?.order}>{order => (
                <span class="order">{order()}</span>
              )}</Show>
            </div>
          )}</For>
        </div>
      </div>
      <Show when={isTouch()}>
        {searchInput()}
        <div class="footer">
          <button class="cancel" onClick={cancel}>Cancel</button>
          <button class="ok" onClick={close}>Ok</button>
        </div>
      </Show>
    </div>
  );

  return (
    <div class="list-filter-select" classList={{ open: isOpen(), closing: isClosing(), "mouse-closed": isMouseClosed(), "has-selection": selected().length > 0 }} ref={elem => root = elem} onFocusOut={handleFocusOut}>
      <Show when={isTouch()} fallback={
        <label class="trigger">
          {triggerIcon()}
          {searchInput()}
          {triggerClear()}
          <Show when={props.tooltip && !isOpen() && !isMouseClosed()}>
            <Tooltip placements={["bottom", "top"]} delay={600}>{props.tooltip}</Tooltip>
          </Show>
        </label>
      }>
        <div class="trigger">
          <button class="trigger-open" ref={elem => openButton = elem} onClick={open} onKeyDown={() => setIsMouseClosed(false)}>
            {triggerIcon()}
            <span class="line-clamp">{triggerLabel()}</span>
            {triggerCount()}
          </button>
          {triggerClear()}
        </div>
      </Show>

      <Show when={isOpen() || isClosing()}>
        <Show when={isTouch()} fallback={panel()}>
          <dialog
            ref={elem => dialog = elem}
            aria-label={props.button}
            onClick={handleDialogClick}
            onCancel={e => { e.preventDefault(); cancel(); }}
          >
            {panel()}
          </dialog>
        </Show>
      </Show>
    </div>
  );
}
