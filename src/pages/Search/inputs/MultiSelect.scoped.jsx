import { createSignal, createRenderEffect, createEffect, For, Show } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { untrack } from "solid-js/web";
import { isTypeInteger } from "../../../collections/types.js";
import { useResponsive } from "../../../context/providers.js";
import { arrayUtils } from "../../../utils/utils.js";
import "./MultiSelect.scoped.css";

export function MultiSelect(props) {
  const [extraMetadata, storeExtraMetadata] = createStore({});
  const [hovered, setHovered] = createSignal(-1);
  const visibleIndices = [];
  const [search, setSearch] = createSignal("");

  // Update metadata
  createRenderEffect(() => {
    const metadata = {};
    // Handle selected values user gives by props.value
    arrayUtils.wrapToArray(props.value).forEach(({ id, ...rest }, i, arr) => {
      metadata[id] = rest;
      if (arr.length > 1) {
        metadata[id].order ??= i + 1;
      }
    });

    // Handle searched indices
    const allValues = props.each || [];
    const searchString = search();
    if (searchString) {
      const regex = new RegExp(searchString, "i");
      visibleIndices.length = 0;

      allValues.forEach((value, i) => {

        if (regex.test(value.description)) visibleIndices.push(i);
        else {
          metadata[value.id] ??= {};
          metadata[value.id].hidden = true;
        }

      });

    } else if (allValues.length !== visibleIndices.length) {
      visibleIndices.length = 0;
      for (let i = 0; i < allValues.length; i++) visibleIndices[i] = i;
    }


    // Highlight the hovered element
    const index = visibleIndices[hovered()];
    const hoverTarget = allValues[index];
    if (hoverTarget) {
      metadata[hoverTarget.id] ??= {};
      metadata[hoverTarget.id].hovered = true;
    }

    storeExtraMetadata(reconcile(metadata));
  });

  let memory, memoryUrl;

  const { isTouch } = useResponsive();
  let dialog, input, controller;

  // For debugging, this will reopen the dialog in mobile if touch changes
  createEffect(() => {
    isTouch();
    if (!dialog.open) return;
    dialog.close();
    openDialog();
  });

  const openDialog = () => {
    if (isTouch()) dialog.showModal();
    else dialog.show();
  };

  const handleClick = e => {
    // Dialog is only clicked in mobile, when user clicks outside the select area
    if (e.target === dialog) handleClose();
    if (dialog.open && e.target.closest("dialog") !== dialog) handleClose();
    else {
      input.focus();
      input.select();
    }
  };

  let itemsRef;
  const handleHover = i => {
    setHovered(i);
    const index = visibleIndices[i];
    if (isTypeInteger(index)) {
      itemsRef?.children?.[index]?.scrollIntoView({ block: "center" });
    }
  };

  const handleOpen = () => {
    controller?.abort();
    controller = new AbortController();
    openDialog();
    handleHover(-1);
    memory = structuredClone(props.value);
    memoryUrl = window.location.href;

    window.addEventListener("focusin", handleFocusIn, { signal: controller.signal });
    window.addEventListener("click", handleClick, { signal: controller.signal });
  };

  const handleFocusIn = e => {
    if (e.target?.closest("dialog") === dialog) return;

    handleClose();
  };

  const handleMouseDown = () => {
    // Dialog is open, and we clicked the open button. Eat the next input
    if (dialog.open) {
      window.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
      }, { once: true, capture: true });
    }
  };

  const handleClose = () => {
    controller?.abort();
    dialog.close();
    setSearch("");
    handleHover(-1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const index = untrack(hovered);
    const s = untrack(search);
    if (index !== -1 && visibleIndices.length) {
      const value = props.each[visibleIndices[index]];
      const entry = extraMetadata[value.id] ? { ...value, ...extraMetadata[value.id] } : value;
      props.onChange({ target: value.id, entry, shiftKey: holdingShift(), search: s });
    } else {
      props.onChange({ shiftKey: holdingShift(), search: s });
    }

    input.select(); // Select text to make the text removal easier after submit

    if (!visibleIndices.length) {
      setSearch("");
      handleHover(-1);
    }

    if (index === -1) {
      handleClose();
    }
  };

  const handleInputChange = e => {
    setSearch(e.target.value);
    props.onChange({ shiftKey: e.shiftKey, input: e.target.value });
    if (e.target.value) {
      handleHover(0);
    } else {
      handleHover(-1);
    }
  };

  const [holdingShift, setHoldingShift] = createSignal(false);

  const handleKeyDown = e => {
    if (e.key === "Escape") {
      handleClose();
      return;
    }

    setHoldingShift(e.shiftKey);

    let index = untrack(hovered);
    const max = visibleIndices.length - 1;
    if (e.key === "ArrowDown" && index >= max) index = Math.min(0, max);
    else if (e.key === "ArrowDown") index += 1;
    else if (e.key === "ArrowUp" && index <= 0) index = max;
    else if (e.key === "ArrowUp") index -= 1;
    else return;

    e.preventDefault();
    handleHover(index);
  };

  const handleKeyUp = e => {
    setHoldingShift(e.shiftKey);
  };

  const handleInputBlur = e => {
    // Probably opened dev tools or some other target change, we don't want to close the dialog
    if (e.relatedTarget === null) return;

    if (e.relatedTarget === dialog) {
      input.focus();
      input.select(); // Select text to make the text removal easier after selection
      return;
    }

    const parent = e.relatedTarget?.closest("dialog");
    if (parent !== dialog) {
      handleClose();
      return;
    }
  };

  const handleCancel = () => {
    props.onChange({ oldValue: memory, oldUrl: memoryUrl });
    handleClose();
  };

  const handleButtonClick = e => {
    e.preventDefault();
    e.stopPropagation();
    if (dialog.open) handleClose();
    else handleOpen();
  };

  const handleItemClick = (value) => e => {
    e.stopPropagation();
    const entry = extraMetadata[value.id] ? { ...value, ...extraMetadata[value.id] } : value;
    props.onChange({ target: value.id, entry, shiftKey: e.shiftKey });
    setHovered(-1);
    input.focus();
    input.select();
  };

  return (
    <div class="custom-select" classList={{ "holding-shift": holdingShift() }}>
      <button onMouseDown={handleMouseDown} onClick={handleButtonClick} class="open-button">{props.button}</button>
      <dialog ref={elem => dialog = elem} classList={{ mobile: isTouch() }}>
        <div class="wrapper">
          <form onSubmit={handleSubmit}>
            <input type="search" value={search()} placeholder="Search..." autocorrect="off" ref={elem => input = elem} onBlur={handleInputBlur} onInput={handleInputChange} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
          </form>
          <div class="items" ref={elem => itemsRef = elem} tabindex="-1">
            <For each={props.each}>{(v, i) => (
              <div class="contents" onClick={handleItemClick(v)}>{props.children(extraMetadata[v.id] ? { ...v, ...extraMetadata[v.id] } : v, i)}</div>
            )}</For>
          </div>
          <Show when={isTouch()}>
            <div class="footer">
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleClose}>Ok</button>
            </div>
          </Show>
        </div>
      </dialog>
    </div>
  );
}

