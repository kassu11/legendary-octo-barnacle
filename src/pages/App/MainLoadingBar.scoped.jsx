import { createEffect, createMemo, Show } from "solid-js";
import "./MainLoadingBar.scoped.css";
import { mainLoadingCount } from "../../core/globalState";

export function MainLoadingBar() {
  const visible = createMemo(prev => mainLoadingCount() || prev);
  const done = createMemo(() => mainLoadingCount() === 0);

  // eslint-disable-next-line no-unassigned-vars
  let ref;

  createEffect(() => {
    if (done()) return;

    // Refresh animation keyframe timers
    ref.style.animation = 'none';
    ref.offsetHeight; /* trigger reflow */
    ref.style.animation = null;
  });

  // setInterval(() => {
  //   setTimeout(() => setMainLoadingCount(v => v + 1), 1000);
  //   setTimeout(() => setMainLoadingCount(v => v + 1), 100);
  //   setTimeout(() => setMainLoadingCount(v => v - 1), 1000 + Math.random() * 2000);
  //   setTimeout(() => setMainLoadingCount(v => v - 1), 1000 + Math.random() * 2000);
  // }, 3000);

  return (
    <Show when={visible()}>
      <div ref={ref} class="loading-bar" classList={{ done: done() }}></div>
    </Show>
  );
};
