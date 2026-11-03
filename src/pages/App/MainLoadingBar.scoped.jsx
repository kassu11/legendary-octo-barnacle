import { createEffect, createMemo, createSignal } from "solid-js";
import "./MainLoadingBar.scoped.css";
import { mainLoadingCount } from "../../core/globalState";
import { Portal } from "solid-js/web";
import { assertNonNanNumber } from "../../collections/asserts";

const [topElements, setTopElements] = createSignal([document.body]);

// Make sure that when ever modal is opened, we place the progress bar on top
const originalShowModal = HTMLDialogElement.prototype.showModal;
HTMLDialogElement.prototype.showModal = function() {
  originalShowModal.call(this);
  setTopElements(v => [...v, this]);

  // Modal is closed, so remove modal from list
  this.addEventListener("close", () => setTopElements(v => v.filter(elem => elem !== this)), { once: true })
};

const START_DELAY = 200;
const MAX_PROGRESS_TIME = 40_000;
const PROGRESS_DONE_DURATION = 200;

// @keyframes loading-progress {
//   0%   { transform: scaleX(0  ); }
//   0.2% { transform: scaleX(0.1); }
//   1%   { transform: scaleX(.2 ); }
//   3%   { transform: scaleX(.4 ); }
//   4%   { transform: scaleX(.6 ); }
//   6%   { transform: scaleX(.7 ); }
//   10%  { transform: scaleX(.8 ); }
//   13%  { transform: scaleX(.95); }
//   100% { transform: scaleX(.98); }
// }

const loadingScaleKeyframes = [
  // Percent                           scaleX
  [ 0/* %     { transform: scaleX( */ ,0    /* ); } */ ],
  [ 0.002/* % { transform: scaleX( */ ,0.1  /* ); } */ ],
  [ 0.01/* %  { transform: scaleX( */ ,0.2  /* ); } */ ],
  [ 0.03/* %  { transform: scaleX( */ ,0.4  /* ); } */ ],
  [ 0.04/* %  { transform: scaleX( */ ,0.6  /* ); } */ ],
  [ 0.06/* %  { transform: scaleX( */ ,0.7  /* ); } */ ],
  [ 0.10/* %  { transform: scaleX( */ ,0.8  /* ); } */ ],
  [ 0.17/* %  { transform: scaleX( */ ,0.93 /* ); } */ ],
  [ 0.30/* %  { transform: scaleX( */ ,0.95 /* ); } */ ],
  [ 1/* %     { transform: scaleX( */ ,0.98 /* ); } */ ],
];

export function MainLoadingBar() {
  const done = createMemo(() => mainLoadingCount() === 0);

  let progressTime = 0; // Timer when animating progress
  let endingTime = 0; // Timer when progress is done, and we want to smoothly convert x to 100%

  // eslint-disable-next-line no-unassigned-vars
  let ref;

  function gameLoop(prevTime, curTime) {
    const deltaTime = curTime - prevTime;
    progressTime += deltaTime;

    const time = Math.min(Math.max(0, progressTime - START_DELAY), MAX_PROGRESS_TIME);
    const percent = time / MAX_PROGRESS_TIME;
    let scaleX;
    for (let i = 0; i < loadingScaleKeyframes.length; i++) {
      const [p1, s1] = loadingScaleKeyframes[i];
      if (percent === p1) {
        scaleX = s1;
        break;
      }

      if (percent < p1) {
        const [p2, s2] = loadingScaleKeyframes[i - 1];
        const delta = p1 - p2;
        scaleX = ((percent - p2) / delta) * (s1 - s2) + s2;
        break;
      }
    }

    assertNonNanNumber(scaleX);

    // Animate the progress bar
    if (!done()) {
      ref.style.transform = `scaleX(${scaleX})`;
    }
    // Animate progress done
    else {
      endingTime += deltaTime;
      const percent = Math.min(endingTime / PROGRESS_DONE_DURATION, 1);
      ref.style.transform = `scaleX(${scaleX + (1 - scaleX) * percent})`;
    }

    // End loop, when endingTime is over
    if (endingTime < PROGRESS_DONE_DURATION) {
      requestAnimationFrame(t => gameLoop(curTime, t));
    } else {
      progressTime = 0;
      endingTime = 0;
    }
  }

  createEffect(() => {
    if (done()) {
      return;
    }

    // progressTimer can only be 0, if requestAnimationFrame loop is off
    if (progressTime === 0) {
      requestAnimationFrame(prev => requestAnimationFrame(cur => gameLoop(prev, cur)));
    }

    progressTime = 0;
    endingTime = 0;

  });

  // setInterval(() => {
  //   setTimeout(() => setMainLoadingCount(v => v + 1), 1000);
  //   setTimeout(() => setMainLoadingCount(v => v + 1), 100);
  //   setTimeout(() => setMainLoadingCount(v => v - 1), 1000 + Math.random() * 2000);
  //   setTimeout(() => setMainLoadingCount(v => v - 1), 1000 + Math.random() * 2000);
  // }, 3000);

  return (
    // Dialog will go over loading bar, so we want to always portal to the top element layer.
    // But this will always replay animations, so we HAVE TO make the animations using javascripts :c
    <Portal mount={topElements().at(-1)}>
      <div ref={ref} class="loading-bar" classList={{ done: done() }}></div>
    </Portal>
  );
};
