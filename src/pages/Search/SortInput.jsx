import { createEffect, For, on } from "solid-js";
import { useResponsive } from "../../context/ResponsiveContext";
import "./RatingInput.scss";
import { useParams, useSearchParams } from "@solidjs/router";
import { createStore, reconcile } from "solid-js/store";
import { objectFromArrayEntries } from "../../utils/arrays";
import { sortOrders } from "../../utils/searchObjects";

export function SortInput() {
  const [searchParams, setSearchParams] = useSearchParams();
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
      setSearchParams({order: e.target.value});
    }}>
      <div class="open-button-wrapper">
        <button class="open-multi-input" ref={button} onClick={() => {
          if (open) {
            close();
          } else {
            controller = new AbortController();
            const signal = controller.signal;
            oldOrder = searchParams.order;

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
        }}>Sort order</button>
        <button type="button" onClick={() => setSearchParams({sort: searchParams.sort ? undefined : "ASC"})}>{searchParams.sort || "DESC"}</button>
      </div>
      <dialog ref={dialog} onClose={close}>
        <div class="wrapper">
          <div class="scroll-wrapper" ref={scrollWrapper}>
            <Content />
          </div>
          <Show when={isTouch()}>
            <div class="multi-input-footer">
              <button onClick={() => {
                close();
                setSearchParams({order: oldOrder});
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
    const params = useParams();

    createEffect(() => {
      setStore(reconcile(objectFromArrayEntries(searchParams.order, {})));
    });

    const engine = () => (searchParams.malSearch === "true" && (params.type === "anime" || params.type === "manga")) ? "mal" : "ani";

    return (
      <ol>
        <For each={Object.entries(sortOrders[engine()][params.type] || {})} fallback={"Something went wrong"}>{([key, order]) => (
          <li>
            <label>
              {order.flavor}
              <input type="radio" name="order" value={key} checked={store[key]} />
            </label>
          </li>
        )}</For>
      </ol>
    );
  }
}
