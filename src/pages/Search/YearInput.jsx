import { createEffect, createSignal, For, on, Show } from "solid-js";
import { useResponsive } from "../../context/ResponsiveContext";
import "./RatingInput.scss";
import { useSearchParams } from "@solidjs/router";

export function YearInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isTouch } = useResponsive()
  const [filter, setFilter] = createSignal("");
  let open = false;
  let oldGenres;
  let dialog, scrollWrapper, controller, button, form;

  function close() {
    dialog.close();
    open = false;
    controller?.abort();
    setSearchParams({preventFetch: undefined});
  }

  function preventMobileDragOverFlow() {
    scrollWrapper.classList.toggle("has-scroll-bar", scrollWrapper.scrollHeight - scrollWrapper.clientHeight > 0);
  }

  createEffect(on(isTouch, close));

  return (
    <form class="multi-input" classList={{mobile: isTouch()}} ref={form} onSubmit={e => {e.preventDefault()}} onInput={e => {
      setSearchParams({ [e.target.name]: e.target.checked ? e.target.value : undefined });
    }}>
      <button class="open-multi-input" ref={button} onClick={() => {
        console.log(document.activeElement);
        if (open) {
          close();
        } else {
          controller = new AbortController();
          const signal = controller.signal;
          oldGenres = searchParams.genre;

          if(isTouch()) {
            dialog.showModal();
            setSearchParams({preventFetch: true});
            preventMobileDragOverFlow();
            window.addEventListener("resize", preventMobileDragOverFlow, { signal });

            dialog.addEventListener("touchstart", e => {
              if (e.target !== dialog) { return }

              dialog.addEventListener("touchend", e => {
                if (e.target !== dialog) { return }

                e.preventDefault();
                close();
              }, {once: true, signal});

            }, {signal});
          } else {
            window.addEventListener("mousedown", e => e.target !== button && e.target.closest("dialog") !== dialog && close(), {signal});
            dialog.show();
          }
          open = true;
        }
      }}>Year</button>
      <dialog ref={dialog} closedBy="any" onClose={close}>
        <div class="wrapper">
          <div class="multi-input-header">
            <input type="search" placeholder="Search year" onInput={e => {
              e.stopPropagation();
              setFilter(e.target.value.toLowerCase());
            }} />
          </div>
          <div class="scroll-wrapper" ref={scrollWrapper}>
            <Content />
          </div>
          <Show when={isTouch()}>
            <div class="multi-input-footer">
              <button onClick={() => {
                close();
                setSearchParams({ genre: oldGenres });
              }}>Cancel</button>
              <button onClick={close}>Ok</button>
            </div>
          </Show>
        </div>
      </dialog>
    </form>
  );

  function Content() {
    const [searchParams] = useSearchParams();
    const startYear = new Date().getFullYear() + 2;

    return (
      <ol>
        <For each={Array.from({length: Math.abs(startYear - 1969)}, (_, i) => startYear - i)}>{year => (
          <li classList={{ hidden: !year.toString().startsWith(filter()) }}>
            <label>
              {year} <input type="radio" name="year" value={year} checked={searchParams.year == year} />
            </label>
          </li>
        )}</For>
      </ol>
    );
  }
}
