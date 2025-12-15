import "./DraggableScrollContainer.scoped.css";

export function DraggableScrollContainerScoped(props) {
  let xStart = 0;
  let xScroll = 0;
  let xPrev = NaN;
  let scrollContainer;

  return (
    <div class="scroll-line-chart" ref={scrollContainer} onMouseMove={e => {
      if (e.buttons === 1) {
        e.preventDefault();
        const xDelta = e.clientX - xStart;
        xPrev = e.clientX;
        scrollContainer.style.userSelect = "none";
        scrollContainer.scrollTo(xScroll - xDelta, 0);
      } else {
        scrollContainer.style.userSelect = null;
        xStart = e.clientX;
        xScroll = scrollContainer.scrollLeft;

        const xDelta = e.clientX - xPrev;
        xPrev = NaN;
        if (Math.abs(xDelta) > .1) {
          const momentum = (start, time, deltaMomentum) => {
            if (Math.abs(deltaMomentum) < 0.5) {
              return;
            }
            scrollContainer.scrollBy(-deltaMomentum * 2, 0);
            requestAnimationFrame((t) => momentum(start, t, (deltaMomentum * (time - start < 200 ? 0.99 : 0.95))));
          }
          requestAnimationFrame((t) => momentum(t, t, xDelta));
        }
      }
    }}>
      {props.children}
    </div>
  );
}

export function DraggableScrollContainerScoped2(props) {
  let xStart = 0;
  let xScroll = 0;
  let xPrev = NaN;
  let scrollContainer;

  return (
    <div class="scroll-bar-chart" ref={scrollContainer} onMouseMove={e => {
      if (e.buttons === 1) {
        e.preventDefault();
        const xDelta = e.clientX - xStart;
        xPrev = e.clientX;
        scrollContainer.style.userSelect = "none";
        scrollContainer.scrollTo(xScroll - xDelta, 0);
      } else {
        scrollContainer.style.userSelect = null;
        xStart = e.clientX;
        xScroll = scrollContainer.scrollLeft;

        const xDelta = e.clientX - xPrev;
        xPrev = NaN;
        if (Math.abs(xDelta) > .1) {
          const momentum = (start, time, deltaMomentum) => {
            if (Math.abs(deltaMomentum) < 0.5) {
              return;
            }
            scrollContainer.scrollBy(-deltaMomentum * 2, 0);
            requestAnimationFrame((t) => momentum(start, t, (deltaMomentum * (time - start < 200 ? 0.99 : 0.95))));
          }
          requestAnimationFrame((t) => momentum(t, t, xDelta));
        }
      }
    }}>
      {props.children}
    </div>
  );
}
