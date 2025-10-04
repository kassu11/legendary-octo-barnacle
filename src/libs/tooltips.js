let previousFocusTarget, previousHoverTarget;

function focusing({ target }) {
  const tooltip = target.querySelector("[data-tooltip-positions]");
  if (!tooltip) {
    return;
  }

  previousFocusTarget = tooltip;
  updateTooltipPositions(tooltip);
}

function pointerOver({ target }) {
  const tooltip = target.querySelector("[data-tooltip-positions]");
  if (!tooltip) {
    return;
  }

  let bufferIfNoHoverPresent = true, i = 0;
  target.addEventListener("pointerleave", () => { bufferIfNoHoverPresent = false; }, { once: true })
  updatePositionsIfTooltipIsActive(tooltip);

  // This will only be used when mobile mode is active and the user holds a button
  // This will trigger the pointerenter event before the CSS hover is activated
  // Because the CSS hover is not active the tooltip might be display: none, so the sizing will be wrong.
  // We will buffer the call untill the CSS hover is activated.
  function updatePositionsIfTooltipIsActive(tooltip) {
    if (target.matches(":hover, :focus-visible")) {
      previousHoverTarget = tooltip;
      updateTooltipPositions(tooltip);
      // Because we don't want an infinite loop the check is disabled after 100 iterations or if pointerleave is triggered
    } else if (bufferIfNoHoverPresent && i++ < 100) {
      requestAnimationFrame(() => updatePositionsIfTooltipIsActive(tooltip));
    }
  }
}

function updateActiveTooltips() {
  if (previousHoverTarget) {
    updateTooltipPositions(previousHoverTarget)
  }
  if (previousFocusTarget) {
    updateTooltipPositions(previousFocusTarget)
  }
}

function updateTooltipPositions(tooltip) {
  const positions = tooltip.dataset.tooltipPositions.split(" ");
  const tooltipWrapper = tooltip.closest("[data-tooltip-wrapper]");

  for (const position of positions) {
    tooltip.classList.remove(...positions);
    tooltip.classList.add(position);
    let rect = tooltip.getBoundingClientRect();

    if (tooltipWrapper) {
      const wrapperRect = tooltipWrapper.getBoundingClientRect();
      if (rect.left < wrapperRect.left || rect.right > wrapperRect.right || rect.top < wrapperRect.top || rect.bottom > wrapperRect.bottom) {
        continue;
      }
    }

    if (rect.left < 0 || rect.right > window.innerWidth || rect.top < 0 || rect.bottom > window.innerHeight) {
      continue;
    }

    break;
  }
}

// Update tooltips when focusing or hovering
window.addEventListener("focusin", focusing);
window.addEventListener("pointerover", pointerOver);

// Update open tooltips when scrolling or resizing page
window.addEventListener("scroll", updateActiveTooltips, { passive: true });
window.addEventListener("resize", updateActiveTooltips, { passive: true });
