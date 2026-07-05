import { For, onCleanup, onMount } from "solid-js";
import { AnilistMediaCard } from "../../components/Cards/Cards.scoped.jsx";
import "./HorizontalCardRow.scoped.css";
import { asserts } from "../../collections/collections.js";
import { BrowsePageHeaderLinks } from "./BrowsePageHeaderLinks.scoped.jsx";
import { globalHoverContainer } from "../../App.scoped.jsx";

export function HorizontalCardRowScoped(props) {
  asserts.assertTrueOLD("href" in props, "Link is missing");

  const controller = new AbortController();
  const { signal } = controller;

  let startX, momentumX = 0, startScrollX, reel, preventClick = false;
  const handleMouseDown = e => {
    if (e.buttons !== 1 || reel.scrollWidth === reel.clientWidth) return;

    reel.classList.add("dragging");

    e.preventDefault();
    startX = e.x;
    momentumX = 0;
    preventClick = false;
    startScrollX = reel.scrollLeft;
  }

  function updateHoverPosition() {
    const { x, y, width, height} = hoverParent.getBoundingClientRect();
    if (hover.clientWidth + x + width + 25 < window.innerWidth) {
      hover.style.left = x + width + 25 + "px";
      hover.style.top = y + 25 + "px";
    } else if (x - hover.clientWidth - 25 > 0) {
      hover.style.left = x - hover.clientWidth - 25 + "px";
      hover.style.top = y + 25 + "px";
    } else {
      const max = window.innerWidth - hover.clientWidth;
      hover.style.left = Math.max(0, Math.min(x + width / 2 - hover.clientWidth / 2, max)) + "px";
      hover.style.top = y + height + 25 + "px";
    }
  }

  let prevTarget, hoverParent;
  let hover;
  const handleRef = elem => {
    reel = elem;
    elem.addEventListener("click", handleClick, { signal });
    elem.addEventListener("mousemove", handleMouseMove, { signal });
    elem.addEventListener("mousedown", handleMouseDown, { signal });
    window.addEventListener("resize", handleResize, { passive: true, signal });

    elem.addEventListener("mousemove", e => {
      if (hover) updateHoverPosition();

      if (prevTarget === e.target) return;
      prevTarget = e.target

      const target = e.target.classList.contains("cp-media-card") ? e.target : e.target.closest(".cp-media-card");
      if (target == hoverParent) return;
      if (!target || target != hoverParent) hoverParent?.append(hover);

      hoverParent = target;
      hover = target?.querySelector(".hover-card");
      if (hover) {
        updateHoverPosition();
        globalHoverContainer.append(hover);
      }
    }, { signal });

    elem.addEventListener("mouseleave", () => {
      hoverParent?.append(hover);
      prevTarget = null;
      hoverParent = null;
      hover = null;
    }, { signal });

    signal.addEventListener("abort", () => {
      hoverParent?.append(hover);
      prevTarget = null;
      hoverParent = null;
      hover = null;
    });
  };

  const handleClick = e => {
    if (startX == null) return;
    if (preventClick) {
      e.preventDefault();
      e.stopPropagation(); // Make sure that child clicks are cancelled
    }

    startX = null;
    reel.scrollBy(momentumX, 0);
    reel.classList.remove("dragging");
    reel.style.scrollSnapType = null;
  }

  const handleMouseMove = e => {
    if (startX == null || e.buttons !== 1) return;
    if (Math.abs(startX - e.x) > 20) preventClick = true;
    momentumX -= e.movementX;
    setTimeout(() => momentumX += e.movementX, 50);

    e.preventDefault();
    reel.scrollTo(startScrollX + (startX - e.x), 0);
    reel.style.scrollSnapType = "unset";
  }

  const handleResize = () => reel?.classList.toggle("scrollable", reel.clientWidth < reel.scrollWidth);

  onCleanup(() => controller.abort());
  onMount(handleResize);

  return (
    <section>
      <BrowsePageHeaderLinks {...props} />
      <ol ref={handleRef} class="grid-reel-auto-fill">
        <For each={props.data || Array(6).fill(null)}>{media => (
          <AnilistMediaCard media={media} skeleton={!media} loading={props.loading} />
        )}</For>
      </ol>
    </section>
  );
}
