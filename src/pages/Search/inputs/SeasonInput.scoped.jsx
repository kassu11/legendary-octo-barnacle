import { createEffect, For, on, Show } from "solid-js";
import "./SeasonInput.scoped.css";
import { useParams } from "@solidjs/router";
import { createStore, reconcile } from "solid-js/store";
import { objectFromArrayEntries } from "../../../utils/arrays.js";
import { useVirtualSearchParams } from "../../../utils/virtualSearchParams.js";
import { useResponsive } from "../../../context/providers.js";

export function SeasonInputScoped() {
  const [virtualSearchParams, setVirtualSearchParams] = useVirtualSearchParams();
  const { isTouch } = useResponsive()
  let open = false;
  let oldSeasons;
  let dialog, scrollWrapper, controller, button, form;

  function close() {
    dialog.close();
    open = false;
    controller?.abort();
    setVirtualSearchParams({preventFetch: undefined});
  }

  function preventMobileDragOverFlow() {
    scrollWrapper.classList.toggle("has-scroll-bar", scrollWrapper.scrollHeight - scrollWrapper.clientHeight > 0);
  }

  createEffect(on(isTouch, close));

  return (
    <form class="multi-input" classList={{mobile: isTouch()}} ref={form} onSubmit={e => {e.preventDefault()}} onInput={e => {
      const formData = new FormData(e.currentTarget);
      const seasons = formData.getAll("season");
      setVirtualSearchParams({ season: seasons, year: virtualSearchParams("year") });
    }}>
      <button class="open-multi-input" ref={button} onClick={() => {
        if (open) {
          close();
        } else {
          controller = new AbortController();
          const signal = controller.signal;
          oldSeasons = virtualSearchParams("season");

          if(isTouch()) {
            dialog.showModal();
            setVirtualSearchParams({preventFetch: true});
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
      }}>Seasons</button>
      <dialog ref={dialog} onClose={close}>
        <div class="wrapper">
          <div class="scroll-wrapper" ref={scrollWrapper}>
            <Content />
          </div>
          <Show when={isTouch()}>
            <div class="multi-input-footer">
              <button onClick={() => {
                close();
                setVirtualSearchParams({season: oldSeasons});
              }}>Cancel</button>
              <button onClick={close}>Ok</button>
            </div>
          </Show>
        </div>
      </dialog>
    </form>
  );

  function Content() {
    const params = useParams();
    const [seasonStore, setSeasonStore] = createStore({});

    createEffect(() => {
      setSeasonStore(reconcile(objectFromArrayEntries(virtualSearchParams("season"), {})));
    });

    const engine = () => (virtualSearchParams("malSearch") === "true" && (params.type === "anime" || params.type === "manga")) ? "mal" : "ani";

    return (
      <ol>
        <For each={Object.entries(searchObjects.searchSeasons[engine()]?.[params.type] || {})} fallback={"Something went wrong"}>{([key, season]) => (
          <Show when={key !== "tba"}>
            <li>
              <label>
                {season.flavorText}
                <input type="radio" name="season" value={key} checked={seasonStore[key]} />
              </label>
            </li>
          </Show>
        )}</For>
      </ol>
    );
  }
}
