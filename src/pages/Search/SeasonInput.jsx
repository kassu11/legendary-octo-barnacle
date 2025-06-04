import { createEffect, For, on } from "solid-js";
import { useResponsive } from "../../context/ResponsiveContext";
import "./RatingInput.scss";
import { useParams, useSearchParams } from "@solidjs/router";
import { createStore, reconcile } from "solid-js/store";
import { objectFromArrayEntries } from "../../utils/arrays";
import { searchSeasons } from "../../utils/searchObjects";
import { useVirtualSearchParams } from "../../utils/virtualSearchParams";

export function SeasonInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isTouch } = useResponsive()
  let open = false;
  let oldSeasons;
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
      const formData = new FormData(e.currentTarget);
      const seasons = formData.getAll("season");
      setSearchParams({season: seasons});
    }}>
      <button class="open-multi-input" ref={button} onClick={() => {
        if (open) {
          close();
        } else {
          controller = new AbortController();
          const signal = controller.signal;
          oldSeasons = searchParams.season;

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
                setSearchParams({season: oldSeasons});
              }}>Cancel</button>
              <button onClick={close}>Ok</button>
            </div>
          </Show>
        </div>
      </dialog>
    </form>
  );

  function Content() {
    const [virtualSearchParams] = useVirtualSearchParams();
    const params = useParams();
    const [seasonStore, setSeasonStore] = createStore({});

    createEffect(() => {
      setSeasonStore(reconcile(objectFromArrayEntries(virtualSearchParams("season"), {})));
    });

    const engine = () => (searchParams.malSearch === "true" && (params.type === "anime" || params.type === "manga")) ? "mal" : "ani";

    return (
      <ol>
        <For each={Object.entries(searchSeasons[engine()]?.[params.type] || {})} fallback={"Something went wrong"}>{([key, season]) => (
          <li>
            <label>
              {season.flavorText}
              <input type="radio" name="season" value={key} checked={seasonStore[key]} />
            </label>
          </li>
        )}</For>
      </ol>
    );
  }
}
