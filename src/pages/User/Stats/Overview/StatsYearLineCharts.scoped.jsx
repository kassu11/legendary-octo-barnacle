import {useParams} from "@solidjs/router";
import {createEffect, createMemo, createSignal, For, Match, on, Show, Switch} from "solid-js";
import {useWidth} from "./UseWidth.jsx";
import {DraggableScrollContainerScoped} from "./DraggableScrollContainer.scoped.jsx";
import {numberCommas} from "../../../../utils/formating.js";
import {SortHeaderButtons} from "../SortHeaderButtons.scoped.jsx";
import { numberUtils } from "../../../../utils/utils.js";
import "./StatsYearLineCharts.scoped.css";

export function StatsYearLineChartsScoped(props) {
  let container;
  const params = useParams();
  const [max, setMax] = createSignal(0);
  const containerWidth = useWidth(() => container);
  const [state, setState] = createSignal("count");

  const inlinePadding = 32;
  const topPadding = 64;
  const bottomPadding = 60;
  const width = () => Math.max(50, containerWidth() / props.data.length);
  const getX = (x) => inlinePadding + x * width();
  const getY = (stat) => Math.ceil((1 - stat / max()) * 200 + topPadding);

  createEffect(() => {
    const maxValue = props.data.reduce((acc, v) => Math.max(acc, v[state()]), 0);
    setMax(maxValue);
  });

  createEffect(on(containerWidth, () => {
    container?.classList.add("no-motion");

    setTimeout(() => {
      container?.classList.remove("no-motion");
    }, 100);
  }));

  const path = createMemo(() => {
    const rounding = .35;
    return props.data.map((year, i, arr) => {
      if (i === 0) {
        return "M" + getX(i) + " " + getY(year[state()]);
      }
      if (i < arr.length - 1) {
        return "S" + numberUtils.lerp(getX(i), getX(i - 1), rounding) + " " + numberUtils.lerp(getY(year[state()]), getY(year[state()]) + (getY(arr[i - 1][state()]) - getY(arr[i + 1][state()])) / 2, rounding) + "," + getX(i) + " " + getY(year[state()]);
      }
      return "S" + numberUtils.lerp(getX(i), getX(i - 1), rounding) + " " + numberUtils.lerp(getY(year[state()]), getY(arr[i - 1][state()]), rounding) + "," + getX(i) + " " + getY(year[state()]);
    }).join("");
  });

  const pathFill = createMemo(() => {
    return path() + "L" + getX(props.data.length - 1) + " " + getY(0) + bottomPadding + "L" + inlinePadding + " " + getY(0) + bottomPadding;
  });

  return (
    <Show when={props.data.length}>
      <section class="no-motion" ref={container}>
        <div class="flex-space-between">
          <h2>{props.heading}</h2>
          <SortHeaderButtons setState={ setState } />
        </div>
        <DraggableScrollContainerScoped>
          <svg width={getX(props.data.length - 1) + inlinePadding} height={getY(0) + bottomPadding}>
            <path d={pathFill()} stroke="none" stroke-width="0" fill="var(--background-350)"/>
            <rect x="0" y={getY(0)} width="100%" height="60" fill="var(--background-300)" stroke="none"
                  pointer-events="all"/>
            <path d={path()} stroke="black" stroke-width="5" fill="transparent"/>
            <For each={props.data}>{(year, i) => (
              <g class="item">
                <rect x={getX(i()) - width() / 2} y="0" width={width()} height="100%" fill="none" stroke="none"
                      pointer-events="all"/>
                <circle cx={getX(i())} cy={getY(year[state()])} r="6" pointer-events="none"/>
                <text fill="currentColor" class="text" x={getX(i())} y="0"
                      style={{translate: `0 ${getY(year[state()]) - 10}px`}} text-anchor="middle">
                  <Show when={state() === "minutesWatched"} fallback={numberCommas(year[state()])}>
                    {numberCommas(Math.ceil(year[state()] / 60))}
                  </Show>
                </text>
                <text fill="currentColor" class="year" x={getX(i())} y="304"
                      text-anchor="middle">{year.releaseYear || year.startYear}</text>
              </g>
            )}</For>
          </svg>
        </DraggableScrollContainerScoped>
      </section>
    </Show>
  );
}
