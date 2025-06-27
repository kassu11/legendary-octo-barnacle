import { createEffect, createSignal, For, on } from "solid-js";
import "./RatingInput.scss";
import { useSearchParams } from "@solidjs/router";
import { createStore, reconcile } from "solid-js/store";
import { objectFromArrayEntries } from "../../utils/arrays";
import { useResponsive } from "../../context/providers";

export function ExternalSourceInput(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = createSignal("");
  const { isTouch } = useResponsive()
  let open = false;
  let oldExternalSources;
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
      setSearchParams({[e.target.name]: formData.getAll(e.target.name)});
    }}>
      <button class="open-multi-input" ref={button} onClick={() => {
        if (open) {
          close();
        } else {
          controller = new AbortController();
          const signal = controller.signal;
          oldExternalSources = searchParams.externalSource;

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
      }}>ExternalSources</button>
      <dialog ref={dialog} onClose={close}>
        <div class="wrapper">
          <div class="multi-input-header">
            <input type="search" placeholder="Filter external sources" onInput={e => {
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
                setSearchParams({externalSource: oldExternalSources});
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
    const [externalSourceStore, setExternalSourceStore] = createStore({});

    createEffect(() => {
      setExternalSourceStore(reconcile(objectFromArrayEntries(searchParams.externalSource, {})));
    });

    return (
      <ol>
        <For each={props.sources()?.data || []} fallback={"Loading"}>{source => (
          <li classList={{hidden: !source.site.toLowerCase().includes(filter())}}>
            <label>
              <div class="grid-wrapper">
                <Show when={source.icon}>
                  <img src={source.icon} style={{"background-color": source.color}} alt="External source logo" />
                </Show>
                <span>
                  {source.site}
                  <Show when={source.language}>
                    <sup>{source.language}</sup>
                  </Show>
                </span>
              </div>
              <input type="checkbox" name="externalSource" value={source.id} checked={externalSourceStore[source.id]} />
            </label>
          </li>
        )}</For>
      </ol>
    );
  }
}
