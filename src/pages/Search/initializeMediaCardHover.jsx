import { onCleanup } from "solid-js";

export function initializeMediaCardHover() {
  const controller = new AbortController();
  const { signal } = controller;

  function updateHoverPosition() {
    if (!hover) return;
    let { x, y, width, height } = hoverParent.getBoundingClientRect();
    x += document.body.parentElement.scrollLeft;
    y += document.body.parentElement.scrollTop;

    if (hover.clientWidth + x + width + 25 < document.body.scrollWidth) {
      hover.style.left = x + width + 25 + "px";
      hover.style.top = y + 25 + "px";
    } else if (x - hover.clientWidth - 25 > 0) {
      hover.style.left = x - hover.clientWidth - 25 + "px";
      hover.style.top = y + 25 + "px";
    } else {
      const max = document.body.scrollWidth - hover.clientWidth;
      hover.style.left = Math.max(0, Math.min(x + width / 2 - hover.clientWidth / 2, max)) + "px";
      hover.style.top = y + height + 25 + "px";
    }

    if (!hoverButton) return;

    ({ x, y, width, height } = hoverButton.getBoundingClientRect());
    x += document.body.parentElement.scrollLeft;
    y += document.body.parentElement.scrollTop;

    hoverButtonTooltip.style.top = y + height / 2 + "px";
    if (x - hoverButtonTooltip.clientWidth - 8 > 0) {
      hoverButtonTooltip.style.left = x - hoverButtonTooltip.clientWidth - 8 + "px";
    } else {
      hoverButtonTooltip.style.left = x + width + 8 + "px";
    }
  }

  let prevTarget, hoverParent, hover;
  let hoverButton, hoverButtonTooltip;
  window.addEventListener("mousemove", e => {
    updateHoverPosition();
    if (prevTarget === e.target) return;
    prevTarget = e.target;

    const target = e.target.classList.contains("cp-media-card") ? e.target : e.target.closest(".cp-media-card");
    if (target?.classList.contains("skeleton")) return;
    if (target != hoverParent) {
      if (!target || target != hoverParent) hoverParent?.append(hover);

      hoverParent = target;
      hover = target?.querySelector(".hover-card");
      if (hover) document.getElementById("hovers").append(hover);
    }


    const button = e.target.classList.contains("cp-media-action-item") ? e.target : e.target.closest(".cp-media-action-item");
    if (button != hoverButton) {
      if (!button || button != hoverButton) hoverButton?.after(hoverButtonTooltip);

      hoverButton = button;
      hoverButtonTooltip = button?.nextElementSibling;
      if (hoverButtonTooltip) document.getElementById("hovers").append(hoverButtonTooltip);
    }


    updateHoverPosition();
  }, { signal });

  signal.addEventListener("abort", () => {
    hoverParent?.append(hover);
    hoverButton?.after(hoverButtonTooltip);
    prevTarget = null;
    hoverParent = null;
    hover = null;
  });

  onCleanup(() => controller.abort());
}

