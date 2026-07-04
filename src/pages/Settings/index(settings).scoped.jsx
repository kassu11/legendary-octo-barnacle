import { createEffect, createRenderEffect, createSignal, For, Show } from "solid-js";
import "./index(settings).scoped.css";
import { createStore, produce, reconcile } from "solid-js/store";
import { useSearchParams } from "@solidjs/router";
import { wrapToSet } from "../../utils/arrays";
import { useResponsive } from "../../context/providers";

export function SettingsPage() {
  const [hovered, setHovered] = createSignal();
  const [searchStore, setSearchStore] = createStore({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = createStore([
    { value: "nimi" },
    { value: "nimi tulee tähän" },
    { value: "osoite" },
    { value: "anime" },
    { value: "sao" },
    { value: "idk" },
  ]);

  createRenderEffect(() => {
    const include = wrapToSet(searchParams.include);
    const exclude = wrapToSet(searchParams.exclude);

    const newObject = {}
    include.forEach(v => newObject[v] = "inc");
    exclude.forEach(v => newObject[v] = "exc");

    setSearchStore(reconcile(newObject));
  });

  const handleSearch = search => {
    setData(produce(data => {
      const indecies = [];
      data.forEach((entry, i) => {
        if (!(entry.hidden = !entry.value.includes(search))) indecies.push(i);
      });

      data.indecies = indecies
    }));
  };

  const handleSelect = i => {
    if (i == null) return;
    const value = data[i].value;
    const val = searchStore[value];

    const include = wrapToSet(searchParams.include);
    const exclude = wrapToSet(searchParams.exclude);
    include.delete(value);
    exclude.delete(value);

    if (!val) include.add(value);
    else if (val == "inc") exclude.add(value);
    setSearchParams({ include: [...include], exclude: [...exclude] })
  };

  const handleSubmit = () => handleSelect(hovered());

  let memory;
  const handleOpen = () => {
    memory = { include: undefined, exclude: undefined, ...searchParams };
  };

  const handleCancel = () => {
    setSearchParams(memory);
  };

  return (
    <>
    <Select each={data} onOpen={handleOpen} onCancel={handleCancel} onHover={setHovered} onSubmit={handleSubmit} onSelect={handleSelect} onSearch={handleSearch}>{(entry, i) => (
      <>
        <div class="item" classList={{ inc: searchStore[entry.value] === "inc", exc: searchStore[entry.value] === "exc", hidden: entry.hidden, active: i() === hovered() }} onClick={e => {
          e.preventDefault();
          handleSelect(i());
        }}>{entry.value}</div>
      </>
    )}</Select>
    <button>Click me 2</button>
    </>
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
    console.log(e.target);
    // Dialog is only clicked in mobile, when user clicks outside the select area
    if (e.target === dialog) handleClose();
  }

  const handleOpen = () => {
    controller?.abort();
    controller = new AbortController();
    openDialog();
    props.onOpen();

    window.addEventListener("focusin", handleFocusIn, { signal: controller.signal });
    window.addEventListener("click", handleClick, { signal: controller.signal });
  };

  const handleFocusIn = e => {
    if (e.target?.closest("dialog") === dialog) return;

    handleClose();
  };

  const handleClose = () => {
    controller?.abort();
    dialog.close();
  };

  const handleButtonClick = () => {
    handleOpen()
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit();
    input.select(); // Select text to make the text removal easier after selection
  };

  const handleInputChange = e => {
    setSearch(e.target.value);
    index = 0;
    props.onHover(props.each.indecies[index]);
  }

  let index = 0;
  const handleKeyDown = e => {
    const length = Math.max(props.each.indecies.length, 1);
    if (e.key === "ArrowDown") index += 1;
    else if (e.key === "ArrowUp") index += length - 1;
    else return;

    e.preventDefault();
    index %= length;
    props.onHover(props.each.indecies[index]);
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
  props.onHover(props.each.indecies[index]);

  const handleCancel = () => {
    props.onCancel();
    handleClose();
  }

  return (
    <>
      <button onClick={handleButtonClick}>Click me</button>
      <dialog ref={elem => dialog = elem} classList={{ mobile: isTouch() }}>
        <div class="wrapper">
          <form onSubmit={handleSubmit}>
            <input type="search" ref={elem => input = elem} onBlur={handleInputBlur} onInput={handleInputChange} onKeyDown={handleKeyDown} />
          </form>
          <div class="items">
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
    </>
  )
}
