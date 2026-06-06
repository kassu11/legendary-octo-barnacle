import { onCleanup, onMount } from "solid-js";
import "./Intersection.scoped.css";

export function Intersection(props) {
  // eslint-disable-next-line no-unassigned-vars
  let intersection, intersected = false;

  onCleanup(() => {
    intersected = true;
    intersectionObserver.disconnect();
    mutationObserver.disconnect();
  });

  onMount(() => {
    mutationObserver.observe(intersection, { childList: true });
    if (intersection.matches(":empty")) return intersectionObserver.observe(intersection);

    for (const child of intersection.children) {
      intersectionObserver.observe(child);
    }
  });

  const mutationObserver = new MutationObserver(mutationList => {
    if (intersected) return;

    for (const mutation of mutationList) {
      for (const added of mutation.addedNodes) {
        intersectionObserver.observe(added);
      }
    }
  });

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;

    intersected = true;
    intersectionObserver.disconnect();
    mutationObserver.disconnect();
    // In some case anilist will say we have a next page, but when we load that page the page is empty
    // In this case the intersection will never get childrens, so we need to add a class to hide the loading text inside the element
    intersection.classList.add("resolved");

    props.onIntersection();
  }, { rootMargin: props.rootMargin || "800px" });

  return (
    <div class="intersection" ref={intersection}>
      {props.children}
    </div>
  );
}
