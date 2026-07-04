import { For, onCleanup, onMount } from "solid-js";
import { AnilistMediaCard } from "../../components/Cards/Cards.scoped.jsx";
import "./HorizontalCardRow.scoped.css";
import { asserts } from "../../collections/collections.js";
import { BrowsePageHeaderLinks } from "./BrowsePageHeaderLinks.scoped.jsx";

export function HorizontalCardRowScoped(props) {
  asserts.assertTrueOLD("href" in props, "Link is missing");

  const controller = new AbortController();
  const { signal } = controller;

  let startX, momentumX = 0, startScrollX, reel, preventClick = false;
  const handleMouseDown = e => {
    if (e.buttons !== 1) return;

    const prev = document.querySelector("ol.dragging");
    prev?.classList.remove("dragging");
    reel.classList.add("dragging");

    prev?.querySelectorAll(":scope > li").forEach(elem => elem.style.viewTransitionName = null);
    reel.querySelectorAll(":scope > li").forEach((elem, i) => elem.style.viewTransitionName = `dragging-${i}`);

    e.preventDefault();
    startX = e.x;
    momentumX = 0;
    preventClick = false;
    startScrollX = reel.scrollLeft;
  }

  const handleRef = elem => {
    reel = elem;
    elem.addEventListener("click", handleClick, { signal });
    elem.addEventListener("mousemove", handleMouseMove, { signal });
    elem.addEventListener("mousedown", handleMouseDown, { signal });
    window.addEventListener("resize", handleResize, { passive: true, signal });
  };

  const handleClick = e => {
    if (preventClick) {
      e.preventDefault();
      e.stopPropagation(); // Make sure that child clicks are cancelled
    }

    document.startViewTransition(() => {
      reel.style.scrollSnapType = null
      reel.scrollBy(momentumX, 0);
    });
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
