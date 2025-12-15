import { createEffect, createSignal, For, on } from "solid-js";
import "./SourceInput.scoped.css";
import { useSearchParams } from "@solidjs/router";
import { createStore, reconcile } from "solid-js/store";
import { objectFromArrayEntries } from "../../../utils/arrays.js";
import { useResponsive } from "../../../context/providers.js";

export function SourceInputScoped() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = createSignal("");
  const { isTouch } = useResponsive()
  let open = false;
  let oldOrder;
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
      setSearchParams({[e.target.name]: e.target.value});
    }}>
      <button class="open-multi-input" ref={button} onClick={() => {
        if (open) {
          close();
        } else {
          controller = new AbortController();
          const signal = controller.signal;
          oldOrder = searchParams.source;

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
      }}>Source</button>
      <dialog ref={dialog} onClose={close}>
        <div class="wrapper">
          <div class="multi-input-header">
            <input type="search" placeholder="Filter sources" onInput={e => {
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
                setSearchParams({source: oldOrder});
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
    const [store, setStore] = createStore({});

    createEffect(() => {
      setStore(reconcile(objectFromArrayEntries(searchParams.source, {})));
    });

    const sourceEntries = () => Object.entries(searchObjects.searchSources).sort(([, a], [, b]) => a.flavorText.localeCompare(b))

    return (
      <ol>
        <For each={sourceEntries()} fallback={"Something went wrong"}>{([key, order]) => (
          <li classList={{hidden: !order.flavorText.toLowerCase().includes(filter())}}>
            <label>
              {order.flavorText}
              <input type="radio" name="source" value={key} checked={store[key]} />
            </label>
          </li>
        )}</For>
      </ol>
    );
  }
}
