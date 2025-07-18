import { createEffect, onCleanup, onMount } from "solid-js";
import { mergeProps, on } from "solid-js";
import { assert } from "../../utils/assert";
import "./TwoHeadedRange.scss";

export function TwoHeadedRange(_props) {
  assert(_props.onChange, "onChange is missing");
  const _defaults = mergeProps({min: 0, max: 100, separation: 1 }, _props);
  const props = mergeProps({value: [_defaults.min, _defaults.max]}, _defaults);
  let startPoint, endPoint;

  createEffect(on(() => props.minValue, value => {
    updateValue(startPoint, value || props.min);
  }));
  createEffect(on(() => props.maxValue, value => {
    updateValue(endPoint, value || props.max);
  }));

  let intersection;

  onMount(() => {
    intersectionObserver.observe(intersection);
  });

  onCleanup(() => {
    intersectionObserver.disconnect();
  });

  const callback = (entries) => {
    if (entries[0].isIntersecting === true) {
      updateValue(endPoint, props.maxValue);
      updateValue(startPoint, props.minValue);
    }
  };

  const intersectionObserver = new IntersectionObserver(callback);

  return (
    <div class="cp-two-headed-range" ref={intersection} onTouchStart={rangeMovePoint} onMouseDown={rangeMovePoint}>
      <div class="point start" ref={startPoint} style={{"--value": props.min, "--percentage": "0%"}}></div>
      <div class="point end" ref={endPoint} style={{"--value": props.max, "--percentage": "100%"}}></div>
      <div class="progress-bar"></div>
    </div>
  );

  function updateValue(target, value) {
    const parent = target.closest(".cp-two-headed-range");
    const pointA = parent.querySelector(".point.start");
    const pointB = parent.querySelector(".point.end");
    const pointARect = pointA.getBoundingClientRect();
    const pointBRect = pointB.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    if (target === pointA) {
      const width = (pointBRect.left - parentRect.left) - (pointARect.width / 2);
      const newWidth = Math.min(1, Math.max(0, (value - props.min) / (parseInt(pointB.style.getPropertyValue("--value")) - props.min))) * width;
      const percentage = newWidth / parentRect.width;
      
      parent.querySelector(".progress-bar").style.left = `${(percentage * 100).toFixed(1)}%`;
      parent.querySelector(".progress-bar").style.width = `${(parseInt(pointB.style.getPropertyValue("--percentage")) - percentage * 100).toFixed(1)}%`;
      target.style.setProperty("--percentage", (percentage * 100 || 0).toFixed(1) + "%");
      target.style.setProperty("--value", value);
    } else if (target === pointB) {
      const width = parentRect.width - (pointARect.right - parentRect.left) - (pointBRect.width / 2);
      const min = parseInt(pointA.style.getPropertyValue("--value"));
      const newWidth = Math.min(1, Math.max(0, (value - min) / (props.max - min))) * width;
      const percentage = ((pointARect.right - parentRect.left) + (pointBRect.width / 2) + newWidth) / parentRect.width;
      
      parent.querySelector(".progress-bar").style.width = `${(percentage * 100 - parseInt(pointA.style.getPropertyValue("--percentage"))).toFixed(1)}%`;
      target.style.setProperty("--percentage", (percentage * 100 || 0).toFixed(1) + "%");
      target.style.setProperty("--value", value);
    }
  }

  function rangeMovePoint(e) {
    e.preventDefault();
    const controller = new AbortController();
    const signal = controller.signal;

    const parent = e.target.closest(".cp-two-headed-range");
    const initialX = e.clientX || e.touches[0].clientX;
    const pointARect = parent.querySelector(".point.start").getBoundingClientRect();
    const pointBRect = parent.querySelector(".point.end").getBoundingClientRect();
    const pointADelta = Math.min(Math.abs(initialX - pointARect.left), Math.abs(initialX - pointARect.right));
    const pointBDelta = Math.min(Math.abs(initialX - pointBRect.left), Math.abs(initialX - pointBRect.right));
    let target, notTarget, delta = 0;
    if (e.target.classList.contains("start")) {
      target = e.target;
      notTarget = parent.querySelector(".point.end");
    } else if (e.target.classList.contains("end")) {
      target = e.target;
      notTarget = parent.querySelector(".point.start");
    } else if(pointADelta < pointBDelta) {
      target = parent.querySelector(".point.start");
      notTarget = parent.querySelector(".point.end");
    } else {
      target = parent.querySelector(".point.end");
      notTarget = parent.querySelector(".point.start");
    }

    const hasSelectedEnd = target.classList.contains("end");
    const parentRect = parent.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const notTargetRect = notTarget.getBoundingClientRect();
    let widthBetweenTargets;
    let left = parentRect.left;
    if (hasSelectedEnd) {
      widthBetweenTargets = parentRect.width - (notTargetRect.right - parentRect.left) - notTargetRect.width / 2;
      left = notTargetRect.right + notTargetRect.width / 2;
    }
    else {
      widthBetweenTargets = notTargetRect.left - parentRect.left - (targetRect.width / 2);
    }

    if (e.target === target) { // Don't snap
      delta = initialX - (targetRect.left + targetRect.width / 2);
    }

    movePoint(initialX);

    function movePoint(x) {
      const percentageBetweenTargets = Math.max(Math.min(1, (x - delta - left) / widthBetweenTargets), 0);
      const min = hasSelectedEnd ? parseInt(notTarget.style.getPropertyValue("--value")) + props.separation : props.min;
      const max = hasSelectedEnd ? props.max : parseInt(notTarget.style.getPropertyValue("--value")) - props.separation;
      const minP = hasSelectedEnd ? (parentRect.width - widthBetweenTargets) / parentRect.width : 0;
      const maxP = hasSelectedEnd ? 1 : widthBetweenTargets / parentRect.width;
      const percentage = Math.max(Math.min(maxP, (x - delta - parentRect.left) / parentRect.width), minP);

      if (hasSelectedEnd) {
        parent.querySelector(".progress-bar").style.width = `${(percentage * 100 - parseInt(notTarget.style.getPropertyValue("--percentage"))).toFixed(1)}%`;
      } else {
        parent.querySelector(".progress-bar").style.left = `${(percentage * 100).toFixed(1)}%`;
        parent.querySelector(".progress-bar").style.width = `${(parseInt(notTarget.style.getPropertyValue("--percentage")) - percentage * 100).toFixed(1)}%`;
      }
      target.style.setProperty("--percentage", (percentage * 100).toFixed(1) + "%");
      target.style.setProperty("--value", min + Math.round((max - min) * percentageBetweenTargets));
    }

    target.classList.add("active");
    signal.addEventListener("abort", () => {
      target.classList.remove("active");
      if (hasSelectedEnd) {
        props.onChange([parseInt(notTarget.style.getPropertyValue("--value")), parseInt(target.style.getPropertyValue("--value"))]);
      } else {
        props.onChange([parseInt(target.style.getPropertyValue("--value")), parseInt(notTarget.style.getPropertyValue("--value"))]);
      }
    });

    window.addEventListener("mousemove", e => {
      e.preventDefault();
      if (e.buttons === 1) {
        movePoint(e.clientX);
      } else {
        controller.abort();
      }
    }, {signal});


    window.addEventListener("touchmove", e => {
      e.preventDefault();
      const [{clientX}] = e.touches;
      movePoint(clientX);
    }, {signal});

    window.addEventListener("touchend", () => {
      controller.abort();
    }, {signal, once: true});
  }
}
