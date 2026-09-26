import { useNavigate, useParams, useSearchParams } from "@solidjs/router";
import { useParsedSearchParams } from "../../context/providers";
import { SEARCH_DEBOUNCE } from "./index(search2).scoped";
import { createEffect, createRenderEffect, createSignal, For, Show, Switch, Match, createMemo } from "solid-js";
import "./SearchBar.scoped.css";
import { createStore, reconcile } from "solid-js/store";
import { useResponsive } from "../../context/providers";
import SortAlphabetAscendingIcon from "../../assets/SortAlphaUp";
import SortAlphabetDescendingIcon from "../../assets/SortAlphaDown";
import { arrayUtils } from "../../utils/utils";
import { isTypeInteger } from "../../collections/types";
import { untrack } from "solid-js/web";
import SortNumericAscendingIcon from "../../assets/SortNumericUp";
import SortNumericDescendingIcon from "../../assets/SortNumericDown";

export function SearchBar() {
  const parsedSearchParams = useParsedSearchParams();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

  let replace = false, timeout;
  const handleInput = e => {
    setSearchParams({ q: encodeURIComponent(e.target.value) || undefined, skipSortByMatch: undefined }, { replace });
    replace = true;
    clearTimeout(timeout);
    timeout = setTimeout(() => replace = false, SEARCH_DEBOUNCE);
  };

  // Note: These sort options have been removed because they did not work: format
  const sortOptions = createMemo(() => {
    const { type } = params;

    const options = [
      { description: "Duration",      id: "duration",      type: "numeric",    values: [ "duration_desc_plus", "duration_plus",     ] },
      { description: "Favourites",    id: "favourites",    type: "numeric",    values: [ "favourites_desc", "favourites",           ] },
      { description: "Finished Date", id: "end_date",      type: "numeric",    values: [ "end_date_desc_plus", "end_date_plus",     ] },
      { description: "ID",            id: "id",            type: "numeric",    values: [ "id_desc", "id",                           ] },
      { description: "Last Updated",  id: "updated_at",    type: "numeric",    values: [ "updated_at_desc", "updated_at",           ] },
      { description: "Popularity",    id: "popularity",    type: "numeric",    values: [ "popularity_desc", "popularity",           ] },
      { description: "Score",         id: "score",         type: "numeric",    values: [ "score_desc_plus", "score_plus",           ] },
      { description: "Starting Date", id: "start_date",    type: "numeric",    values: [ "start_date_desc_plus", "start_date_plus", ] },
      { description: "Status",        id: "status",        type: "alphabetic", values: [ "status_desc", "status",                   ] },
      { description: "Title English", id: "title_english", type: "alphabetic", values: [ "title_english",                           ] },
      { description: "Title Romaji",  id: "title_romaji",  type: "alphabetic", values: [ "title_romaji", "title_romaji_desc",       ] },
      { description: "Trending",      id: "trending",      type: "numeric",    values: [ "trending_desc", "trending",               ] },
    ]

    if (type === "media") {
      options.push({ description: "Chapters / Episodes", id: "progress", type: "numeric", values: [ "progress_desc_plus", "progress_plus" ] });
      options.push({ description: "Type", id: "type", type: "alphabetic", values: [ "type_desc", "type" ] });
    } else if (type === "anime") {
      options.push({ description: "Episodes", id: "progress", type: "numeric", values: [ "progress_desc_plus", "progress_plus" ] });
    } else if (type === "manga") {
      options.push({ description: "Chapters", id: "progress", type: "numeric", values: [ "progress_desc_plus", "progress_plus" ] });
      options.push({ description: "Volumes", id: "volumes", type: "numeric", values: [ "volumes_desc_plus", "volumes_plus" ] });
    }

    return options.sort((a, b) => a.description.localeCompare(b.description));

  });

  const sortValues = createMemo(() => {
    const values = [];
    const cache = {};
    const sort = parsedSearchParams().sort || [];
    sort.forEach(value => {
      const key = value.replace(/_desc|_plus/g, "");
      if (key === "format") return;

      const obj = cache[key] || {};
      obj.value = value;

      if (obj.id) return;

      values.push(obj);
      obj.id = key;
    });

    return values;
  });

  const handleChange = e => {
    if (e.oldUrl) {
      const path = e.oldUrl.split(__BASE__)[1];
      navigate(path);
      return;
    }

    const newActiveValues = [...sortValues()];
    // No shift, so replace old items
    if (!e.shiftKey) newActiveValues.length = 0;

    const index = newActiveValues.findIndex(val => val.id === e.target);

    const valueIndex = e.entry.values.indexOf(e.entry.value);
    const nextValue = arrayUtils.at(e.entry.values, valueIndex + 1);

    // New item
    if (index == -1) {
      newActiveValues.push({ id: e.target, value: nextValue });
    } else {
      newActiveValues[index].value = nextValue;
    }

    setSearchParams({ sort: newActiveValues.map(e => e.value) }, { replace: true });

  };

  return (
    <div>
      <input type="search" onInput={handleInput} value={parsedSearchParams().q} />
      <StoreSelect each={sortOptions()} value={sortValues()} onChange={handleChange}>{entry => {
        return (
          <div class="item" classList={{ active: !!entry.value, hidden: entry.hidden, hovered: entry.hovered }}>
            <div class="icon-wrapper">
              <Show when={entry.value}>

                <Switch>

                  <Match when={entry.value.includes("_desc")}>
                    <Switch>
                      <Match when={entry.type === "numeric"}>
                        <SortNumericDescendingIcon scoped />
                      </Match>
                      <Match when={entry.type === "alphabetic"}>
                        <SortAlphabetDescendingIcon scoped />
                      </Match>
                    </Switch>
                  </Match>

                  <Match when={true}>
                    <Switch>
                      <Match when={entry.type === "numeric"}>
                        <SortNumericAscendingIcon scoped />
                      </Match>
                      <Match when={entry.type === "alphabetic"}>
                        <SortAlphabetAscendingIcon scoped />
                      </Match>
                    </Switch>
                  </Match>

                </Switch>

              </Show>
            </div>

            <p>{entry.description}</p>
            <Show when={entry.order}>
              <div class="order">
                <span>{entry.order}</span>
              </div>
            </Show>
          </div>
        )
      }}</StoreSelect>
    </div>
  );
}

function StoreSelect(props) {
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
    if (index !== -1 && visibleIndices.length) {
      const value = props.each[visibleIndices[index]];
      const entry = extraMetadata[value.id] ? { ...value, ...extraMetadata[value.id] } : value;
      props.onChange({ target: value.id, entry, shiftKey: holdingShift() });
    }

    input.select(); // Select text to make the text removal easier after submit

    if (index === -1) {
      handleClose();
    }
  };

  const handleInputChange = e => {
    setSearch(e.target.value);
    if (e.target.value) {
      handleHover(0);
    } else {
      handleHover(-1);
    }
  }

  const [holdingShift, setHoldingShift] = createSignal(false);

  const handleKeyDown = e => {
    if (e.key === "Escape") {
      handleClose()
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

  const handleCancel = () => {
    props.onChange({ oldValue: memory, oldUrl: memoryUrl });
    handleClose();
  }

  const handleButtonClick = e => {
    e.preventDefault()
    e.stopPropagation()
    if (dialog.open) handleClose();
    else handleOpen()
  };

  const handleItemClick = (value) => e => {
    e.stopPropagation();
    const entry = extraMetadata[value.id] ? { ...value, ...extraMetadata[value.id] } : value;
    props.onChange({ target: value.id, entry, shiftKey: e.shiftKey });
    setHovered(-1);
    input.focus();
    input.select();
  }

  return (
    <div class="custom-select" classList={{ "holding-shift": holdingShift() }}>
      <button onMouseDown={handleMouseDown} onClick={handleButtonClick} class="open-button">Sort</button>
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
  )
}
