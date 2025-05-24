import { createEffect, For, on } from "solid-js";
import { useResponsive } from "../../context/ResponsiveContext";
import "./RatingInput.scss";
import { useParams, useSearchParams } from "@solidjs/router";
import { createStore, reconcile } from "solid-js/store";
import { formatMediaFormat } from "../../utils/formating";
import { objectFromArrayEntries } from "../../utils/arrays";

export function FormatInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isTouch } = useResponsive()
  let open = false;
  let oldFormats;
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
      const formats = formData.getAll("format");
      setSearchParams({format: formats});
    }}>
      <button class="open-multi-input" ref={button} onClick={() => {
        if (open) {
          close();
        } else {
          controller = new AbortController();
          const signal = controller.signal;
          oldFormats = searchParams.format;

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
      }}>Formats</button>
      <dialog ref={dialog} onClose={close}>
        <div class="wrapper">
          <div class="scroll-wrapper" ref={scrollWrapper}>
            <Content />
          </div>
          <Show when={isTouch()}>
            <div class="multi-input-footer">
              <button onClick={() => {
                close();
                setSearchParams({format: oldFormats});
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
    const [formatStore, setFormatStore] = createStore({});
    const params = useParams();
    const formats = {
      mal: {
        anime: [ "cm", "movie", "music", "ona", "ova", "pv", "special", "tv", "tv_special", ],
        manga: [ "doujin", "lightnovel", "manga", "manhua", "manhwa", "novel", "one-shot", ],
      },
      ani: {
        anime: [ "movie", "music", "ona", "ova", "special", "tv", "tv_short", ],
        manga: [ "manga", "novel", "one-shot", ],
        media: [ "manga", "movie", "music", "novel", "ona", "one-shot", "ova", "special", "tv", "tv_short", ],
      }
    };

    createEffect(() => {
      setFormatStore(reconcile(objectFromArrayEntries(searchParams.format, {})));
    });

    const engine = () => (searchParams.malSearch === "true" && (params.type === "anime" || params.type === "manga")) ? "mal" : "ani";

    return (
      <ol>
        <For each={formats[engine()][params.type] || []} fallback={"Something went wrong"}>{format => (
          <li>
            <label>
              {formatMediaFormat(format.toUpperCase())}
              <input type="checkbox" name="format" value={format} checked={formatStore[format]} />
            </label>
          </li>
        )}</For>
      </ol>
    );
  }
}
