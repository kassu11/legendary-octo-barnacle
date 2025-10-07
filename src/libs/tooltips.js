let previousFocusTarget, previousHoverTarget;

function focusing({ target }) {
  const tooltip = target.querySelector("[data-tooltip-positions]");
  if (!tooltip) {
    return;
  }

  previousFocusTarget = tooltip;
  updateTooltipPositions(tooltip);
}

function updateActiveTooltips() {
  if (previousHoverTarget) {
    updateTooltipPositions(previousHoverTarget)
  }
  if (previousFocusTarget) {
    updateTooltipPositions(previousFocusTarget)
  }
}

let previousMoveTarget;
function move({target}) {
  if (target === previousMoveTarget || !target) {
    return;
  }

  previousMoveTarget = target;

  const tooltipTrigger = target.matches("[data-tooltip-trigger]") ? target : target.closest("[data-tooltip-trigger]");
  if (!tooltipTrigger) {
    return;
  }

  const tooltip = tooltipTrigger.querySelector("[data-tooltip-positions]");

  let i = 0;
  updatePositionsIfTooltipIsActive();

  // This will only be used when mobile mode is active and the user holds a button
  // This will trigger the pointerenter event before the CSS hover is activated
  // Because the CSS hover is not active the tooltip might be display: none, so the sizing will be wrong.
  // We will buffer the call untill the CSS hover is activated.
  function updatePositionsIfTooltipIsActive() {
    if (tooltipTrigger.matches(":hover")) {
      previousHoverTarget = tooltip;
      updateTooltipPositions(tooltip);
      // Because we don't want an infinite loop the check is disabled after 100 iterations or if pointerleave is triggered
    } else if (i++ < 500 || previousMoveTarget !== target) {
      requestAnimationFrame(updatePositionsIfTooltipIsActive);
    }
  }
}

function updateTooltipPositions(tooltip) {
  const positions = tooltip.dataset.tooltipPositions.split(" ");
  const tooltipWrapper = tooltip.closest("[data-tooltip-wrapper]");
  const wrapperRect = tooltipWrapper?.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();

  for (const position of positions) {
    tooltip.classList.remove(...positions);
    tooltip.classList.add(position);
    let rect = tooltip.getBoundingClientRect();

    if (wrapperRect) {
      if (rect.left < wrapperRect.left || rect.right > wrapperRect.right || rect.top < wrapperRect.top || rect.bottom > wrapperRect.bottom) {
        continue;
      }
    }

    // I use body bounding client rect because innerWidth will sometimes break when I emulate mobile device with brave
    if (rect.left < 0 || rect.right > bodyRect.width || rect.top < 0 || rect.bottom > bodyRect.height) {
      continue;
    }

    break;
  }
}

// Update tooltips when focusing or hovering
window.addEventListener("focusin", focusing);
window.addEventListener("pointermove", move);
window.addEventListener("pointerdown", move);

// Update open tooltips when scrolling or resizing page
window.addEventListener("scroll", updateActiveTooltips, { passive: true });
window.addEventListener("resize", updateActiveTooltips, { passive: true });
