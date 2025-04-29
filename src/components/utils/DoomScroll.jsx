import { Match } from "solid-js";
import { onCleanup, onMount, Switch } from "solid-js";

export function DoomScroll(props) {
  let intersection;

  onMount(() => {
    intersectionObserver.observe(intersection);
  });

  onCleanup(() => {
    intersectionObserver.disconnect();
  });

  const options = { rootMargin: props.rootMargin || "800px" }
  const callback = (entries) => {
    if (entries[0].isIntersecting === false) {
      return;
    }

    intersectionObserver.unobserve(entries[0].target);
    props.onIntersection();
  };

  const intersectionObserver = new IntersectionObserver(callback, options);

  return (
    <Switch fallback={<div ref={intersection}>Intersection</div>}>
      <Match when={props.fetchResponse()}>
        {props.children(props.fetchResponse.loading && props.loading)}
      </Match>
      <Match when={props.fetchResponse.loading}>
        loading...
      </Match>
    </Switch>
  );
}
