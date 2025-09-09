import { createSignal, createEffect, on, Show, Switch } from "solid-js";
import "./Trailer.scss";

export function Trailer(props) {
  const [open, setOpen] = createSignal(false);
  let dialog;

  return (
    <Show when={props.id}>
      <button onClick={() => {
        dialog.showModal();
        setOpen(true);
      }}>Watch trailer</button>
      <dialog class="cp-trailer-dialog" onClose={() => setOpen(false)} ref={dialog} onClick={e => e.target === dialog && dialog.close()}>
        <div class="wrapper">
          <Show when={open()}>
            <Switch>
              <Match when={props.site === "youtube"}>
                <iframe src={"https://www.youtube-nocookie.com/embed/" + props.id + "?enablejsapi=1&wmode=opaque&autoplay=1"} frameborder="0" allowFullScreen></iframe>
              </Match>
            </Switch>
          </Show>
          <form method="dialog" class="close">
            <button>Close trailer</button>
          </form>
        </div>
      </dialog>
    </Show>
  );
}
