import { createEffect, createSignal, For, on, Show } from "solid-js";
import { useResponsive } from "../../context/ResponsiveContext";
import "./RatingInput.scss";
import { useSearchParams } from "@solidjs/router";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { TwoHeadedRange } from "./TwoHeadedRange";

export function YearInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isTouch } = useResponsive()
  const [filter, setFilter] = createSignal("");
  const currentYearPlusTwo = new Date().getFullYear() + 2;
  let open = false;
  let oldGenres;
  let dialog, scrollWrapper, controller, button, form;

  const triggerSetSearchParams = leadingAndTrailing(debounce, (params, options) => setSearchParams(params, options), 100);

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
      if (e.target.name === "year") {
        triggerSetSearchParams({ 
          [e.target.name]: e.target.checked ? e.target.value : undefined,
          startYear: undefined,
          endYear: undefined,
        });
      }
    }}>
      <button class="open-multi-input" ref={button} onClick={() => {
        if (open) {
          close();
        } else {
          controller = new AbortController();
          const signal = controller.signal;
          oldGenres = searchParams.genre;

          if(isTouch()) {
            dialog.showModal();
            triggerSetSearchParams({preventFetch: true});
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
          <div class="multi-input-footer">
            <TwoHeadedRange 
              min={1970} 
              max={currentYearPlusTwo} 
              separation={1} 
              minValue={+searchParams.startYear || 1970} 
              maxValue={+searchParams.endYear || currentYearPlusTwo} 
              onChange={([min, max]) => triggerSetSearchParams({startYear: min, endYear: max, year: undefined})} 
            />
            <div class="flex-space-between">
              <input 
                type="number" 
                inputMode="numeric" 
                name="startYear"
                value={+searchParams.startYear || 1970} 
                onChange={e => {
                  triggerSetSearchParams({
                    startYear: Math.min(+e.target.value, +searchParams.endYear || currentYearPlusTwo),
                    endYear: Math.max(+e.target.value, +searchParams.endYear || currentYearPlusTwo),
                    year: undefined,
                  });
                }} 
                onBlur={e => e.target.value = searchParams.startYear || 1970} 
                onBeforeInput={e => {
                  if (e.data?.toLowerCase().includes("e")) {
                    e.preventDefault();
                  }
                }}
              />
              <input 
                type="number" 
                inputMode="numeric" 
                name="endYear"
                value={+searchParams.endYear || currentYearPlusTwo} 
                onChange={e => {
                  triggerSetSearchParams({
                    startYear: Math.min(+e.target.value, +searchParams.startYear || 1970),
                    endYear: Math.max(+e.target.value, +searchParams.startYear || 1970),
                    year: undefined,
                  });
                }} 
                onBlur={e => e.target.value = searchParams.endYear || currentYearPlusTwo} 
                onBeforeInput={e => {
                  if (e.data?.toLowerCase().includes("e")) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <Show when={isTouch()}>
              <button onClick={() => {
                close();
                triggerSetSearchParams({ genre: oldGenres });
              }}>Cancel</button>
              <button onClick={close}>Ok</button>
            </Show>
          </div>
        </div>
      </dialog>
    </form>
  );


  function Content() {
    const [searchParams] = useSearchParams();

    return (
      <ol>
        <For each={Array.from({length: Math.abs(currentYearPlusTwo - 1969)}, (_, i) => currentYearPlusTwo - i)}>{year => (
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
