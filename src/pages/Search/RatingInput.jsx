import { createEffect, createSignal, on } from "solid-js";
import { useResponsive } from "../../context/ResponsiveContext";
import "./RatingInput.scss";
import { useSearchParams } from "@solidjs/router";
import { createStore, reconcile } from "solid-js/store";

export function RatingInput(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isTouch } = useResponsive()
  let open = false;
  let oldRatings;
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
      const inputCount = e.currentTarget.querySelectorAll("input").length;
      const formData = new FormData(e.currentTarget);
      const ratings = formData.getAll("rating");
      if (e.target.value === "any") {
        if (e.target.checked) {
          setSearchParams({rating: "any"});
        } else {
          setSearchParams({rating: undefined});
        }
      }
      else if (e.target.checked && inputCount - 1 === ratings.length) {
        setSearchParams({rating: "any"});
      }
      else {
        setSearchParams({rating: ratings.filter(rating => rating !== "any")});
      }
    }}>
      <button class="open-multi-input" ref={button} onClick={() => {
        if (open) {
          close();
        } else {
          controller = new AbortController();
          const signal = controller.signal;
          oldRatings = searchParams.rating;

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
      }}>Rating</button>
      <dialog ref={dialog} onClose={close}>
        <div class="wrapper">
          <div class="scroll-wrapper" ref={scrollWrapper}>
            <Content />
          </div>
          <Show when={isTouch()}>
            <div class="multi-input-footer">
              <button onClick={() => {
                close();
                setSearchParams({rating: oldRatings});
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
    const [ratings, setRatings] = createStore({});

    createEffect(() => {
      if (Array.isArray(searchParams.rating)) {
        setRatings(reconcile(searchParams.rating.reduce((acc, rating) => ({...acc, [rating]: true}), {})));
      } else {
        setRatings(reconcile({[searchParams.rating]: true}));
      }
    });

    return (
      <ol>
        <li>
          <label>
            Any rating 
            <input type="checkbox" name="rating" value="any" checked={ratings.any} />
          </label>
        </li>
        <Show when={searchParams.malSearch === "true"}>
          <li>
            <label>
              G - All ages 
              <input type="checkbox" name="rating" value="g" checked={ratings.any || ratings.g} />
            </label>
          </li>
          <li>
            <label>
              PG - Children 
              <input type="checkbox" name="rating" value="pg" checked={ratings.any || ratings.pg} />
            </label>
          </li>
          <li>
            <label>
              PG-13 - Teen 13 or older 
              <input type="checkbox" name="rating" value="pg13" checked={ratings.any || ratings.pg13} />
            </label>
          </li>
          <li>
            <label>
              R - 17+ (violence & profanity) 
              <input type="checkbox" name="rating" value="r17" checked={ratings.any || ratings.r17} />
            </label>
          </li>
          <li>
            <label>
              R+ - Mild nudity 
              <input type="checkbox" name="rating" value="r" checked={ratings.any || ratings.r} />
            </label>
          </li>
        </Show>
        <Show when={searchParams.malSearch !== "true"}>
          <li>
            <label>
              R+ - (violence, profanity & mild nudity)
              <input type="checkbox" name="rating" value="r" checked={ratings.any || ratings.r} />
            </label>
          </li>
        </Show>
        <li>
          <label>
            Rx - Hentai 
            <input type="checkbox" name="rating" value="rx" checked={ratings.any || ratings.rx} />
          </label>
        </li>
      </ol>
    );
  }
}
