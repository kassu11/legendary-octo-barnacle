import { useSearchParams } from "@solidjs/router";
import { CustomInputs, useCustomInpunts, useParsedSearchParams } from "../../context/providers";
import { SEARCH_DEBOUNCE } from "./index(search2).scoped";
import { createEffect, createRenderEffect, createSignal, For, mergeProps, Show, } from "solid-js";
import "./SearchBar.scoped.css";
import { createStore, produce } from "solid-js/store";
import { useResponsive } from "../../context/providers";
import SortAscending from "../../assets/SortAscending";
import SortDescending from "../../assets/SortDescending";

export function SearchBar() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();

  let replace = false, timeout;
  const handleInput = e => {
    setSearchParams({ q: encodeURIComponent(e.target.value) || undefined, skipSortByMatch: undefined }, { replace });
    replace = true;
    clearTimeout(timeout);
    timeout = setTimeout(() => replace = false, SEARCH_DEBOUNCE);
  };

  const [each, store] = createStore([
    { value: "ID",            id: "ID" },
    { value: "Title Romaji",  id: "TITLE_ROMAJI" },
    { value: "Title English", id: "TITLE_ENGLISH" },
    { value: "Title Native",  id: "TITLE_NATIVE" },
    { value: "Type",          id: "TYPE" },
    { value: "Format",        id: "FORMAT" },
    { value: "Starting Date", id: "START_DATE" },
    { value: "Finished Date", id: "END_DATE" },
    { value: "Score",         id: "SCORE" },
    { value: "Popularity",    id: "POPULARITY" },
    { value: "Trending",      id: "TRENDING" },
    { value: "Episodes",      id: "EPISODES" },
    { value: "Duration",      id: "DURATION" },
    { value: "Status",        id: "STATUS" },
    { value: "Chapters",      id: "CHAPTERS" },
    { value: "Volumes",       id: "VOLUMES" },
    { value: "Last Updated",  id: "UPDATED_AT" },
    { value: "Favourites",    id: "FAVOURITES" },
  ]);

  return (
    <div>
      <input type="search" onInput={handleInput} value={parsedSearchParams().q} />
      <StoreSelect each={each} store={store} states={["asc", "desc"]}>{(entry, i) => {

        const handleSelect = useCustomInpunts();

        const handleClick = e => {
          e.preventDefault();
          handleSelect(i(), e.shiftKey);
        };

        return (
          <div class="item" classList={{ active: !!entry.state, hidden: entry.hidden, hovered: entry.hovered }} onClick={handleClick}>
            <div class="icon-wrapper">
              <Show when={entry.state === "asc"} fallback={<SortDescending scoped />}>
                <SortAscending scoped />
              </Show>
              <Show when={entry.order}>
                <p class="order">{entry.order}</p>
              </Show>
            </div>
            <p>{entry.value}</p>
          </div>
        )

      }}</StoreSelect>
    </div>
  );
}

function StoreSelect(props) {

  props = mergeProps({ states: [true] }, props);

  let hovered = 0;
  const setHovered = i => {

    props.store(produce(entries => {
      if (hovered != null) entries[hovered].hovered = false;
      if (i != null) entries[i].hovered = true;
    }));

    hovered = i;

  };

  const handleSearch = search => {
    const regex = new RegExp(search, "i");
    props.store(produce(entries => {
      const indecies = [];
      entries.forEach((entry, i) => {
        if (!(entry.hidden = !regex.test(entry.value))) indecies.push(i);
      });

      entries.indecies = indecies
    }));
  };

  const values = [];

  const handleSelect = (i, multiSelect) => {
    if (i == null) return;

    props.store(produce(entries => {
      if (!multiSelect) {
        entries[i].order = null;
        for (const index of values) {
          entries[index].order = null;
          if (index != i) {
            memory[index] ??= props.each[index].state;
            entries[index].state = undefined;
          }
        }
        values.length = 0;
      }

      memory[i] ??= props.each[i].state;

      const index = props.states.indexOf(entries[i].state);
      entries[i].state = props.states[index + 1];

      if (!values.includes(i)) values.push(i);

      if (multiSelect) {
        let order = 1;
        for (const index of values) {
          entries[index].order = order++;
        }
      }

    }));


  };

  const handleSubmit = () => handleSelect(hovered);

  let memory;
  const handleOpen = () => {
    memory = {};
  };

  const handleCancel = () => {
    props.store(produce(entries => {
      for (const key in memory) {
        entries[key].state = memory[key];
      }
    }));
  };

  return (
    <CustomInputs.Provider value={handleSelect}>
      <Select onOpen={handleOpen} onCancel={handleCancel} onHover={setHovered} onSubmit={handleSubmit} onSelect={handleSelect} onSearch={handleSearch} {...props}></Select>
    </CustomInputs.Provider>
  );
}

function Select(props) {
  // props.onClick
  // props.onChange => (target)
  const [search, setSearch] = createSignal("");
  const { isTouch } = useResponsive()
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
  }

  const handleClick = e => {
    // Dialog is only clicked in mobile, when user clicks outside the select area
    if (e.target === dialog) handleClose();
    if (dialog.open && e.target.closest("dialog") !== dialog) handleClose();
    else {
      input.focus();
      input.select();
    }
  }

  let itemsRef;
  const handleHover = i => {
    props.onHover(i);
    itemsRef?.children?.[i]?.scrollIntoView({ block: "center" });
  };

  const handleOpen = () => {
    controller?.abort();
    controller = new AbortController();
    openDialog();
    props.onOpen();
    handleHover(props.each.indecies[index]);

    window.addEventListener("focusin", handleFocusIn, { signal: controller.signal });
    console.log("Adding");
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
    index = 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(e.shiftKey);
    input.select(); // Select text to make the text removal easier after selection
  };

  const handleInputChange = e => {
    setSearch(e.target.value);
    index = 0;
    handleHover(props.each.indecies[index]);
  }

  const [holdingShift, setHoldingShift] = createSignal(false);

  let index = 0;
  const handleKeyDown = e => {
    if (e.key === "Escape") {
      handleClose()
      return;
    }

    setHoldingShift(e.shiftKey);

    const length = Math.max(props.each.indecies.length, 1);
    if (e.key === "ArrowDown") index += 1;
    else if (e.key === "ArrowUp") index += length - 1;
    else return;

    e.preventDefault();
    index %= length;
    handleHover(props.each.indecies[index]);
  }

  const handleKeyUp = e => {
    setHoldingShift(e.shiftKey);
  }

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

  createRenderEffect(() => props.onSearch(search()));

  const handleCancel = () => {
    props.onCancel();
    handleClose();
  }

  const handleButtonClick = e => {
    e.preventDefault()
    e.stopPropagation()
    if (dialog.open) handleClose();
    else handleOpen()
  };


  return (
    <div class="custom-select" classList={{ "holding-shift": holdingShift() }}>
      <button onMouseDown={handleMouseDown} onClick={handleButtonClick} class="open-button">Sort</button>
      <dialog ref={elem => dialog = elem} classList={{ mobile: isTouch() }}>
        <div class="wrapper">
          <form onSubmit={handleSubmit}>
            <input type="search" value={search()} placeholder="Search..." autocorrect="off" ref={elem => input = elem} onBlur={handleInputBlur} onInput={handleInputChange} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
          </form>
          <div class="items" ref={elem => itemsRef = elem} tabindex="-1">
            <For each={props.each} children={props.children} />
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
  )
}
