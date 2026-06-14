import { For } from "solid-js";
import { AnilistMediaCard } from "../../components/Cards/Cards.scoped.jsx";
import "./HorizontalCardRow.scoped.css";
import { asserts } from "../../collections/collections.js";
import { BrowsePageHeaderLinks } from "./BrowsePageHeaderLinks.scoped.jsx";

export function HorizontalCardRowScoped(props) {
  asserts.assertTrueOLD("href" in props, "Link is missing");

  let startX, startScrollX, reel, preventClick = false;
  const handleMouseDown = e => {
    e.preventDefault();
    startX = e.x;
    startScrollX = reel.scrollLeft;
  }

  const handleRef = elem => {
    reel = elem;
    elem.addEventListener("click", handleClick);
    elem.addEventListener("mousemove", handleMouseMove);
    elem.addEventListener("mousedown", handleMouseDown);
  };

  const handleClick = e => {
    if (preventClick) {
      e.preventDefault();
      e.stopPropagation(); // Make sure that child clicks are cancelled
    }
    preventClick = false;
    reel.style.scrollSnapType = null;
  }

  const handleMouseMove = e => {
    if (startX == null || e.buttons !== 1) return;
    if (Math.abs(startX - e.x) > 20) preventClick = true;

    e.preventDefault();
    reel.scrollTo(startScrollX + (startX - e.x), 0);
    reel.style.scrollSnapType = "unset";
  }

  return (
    <section>
      <BrowsePageHeaderLinks {...props} />
      <ol ref={handleRef} class="grid-reel-auto-fill">
        <For each={props.data || [0, 0, 0, 0, 0, 0]}>{media => (
          <AnilistMediaCard media={media} loading={props.loading} />
        )}</For>
      </ol>
    </section>
  );
}

