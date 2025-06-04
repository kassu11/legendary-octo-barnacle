import { A, useParams } from "@solidjs/router";
import { useAuthentication } from "../../../context/AuthenticationContext";
import api from "../../../utils/api";
import { capitalize, countryNameFromCountryCode, formatMediaFormat, numberCommas, plural } from "../../../utils/formating";
import { createEffect, createMemo, createSignal, on, onCleanup } from "solid-js";
import { useUser } from "../../../context/providers";

export function StatsAnimeOverview() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [userStats] = api.anilist.userAnimeStats(() => params.name, accessToken);

  return (
    <Show when={userStats()}>
      <StatsOverview stats={userStats().data} />
    </Show>
  )
}
export function StatsMangaOverview() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [userStats] = api.anilist.userMangaStats(() => params.name, accessToken);

  return (
    <Show when={userStats()}>
      <StatsOverview stats={userStats().data} />
    </Show>
  )
}

function StatsOverview(props) {
  const params = useParams();
  const { user } = useUser();

  return (
    <>
      <section class="user-profile-stats-header-section">
        <ul class="user-profile-stats-general-header">
          <li>
            <div class="svg-container">
              <Switch>
                <Match when={params.type === "anime"}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M592 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h245.1v32h-160c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-160v-32H592c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h512v288z"></path></svg>
                </Match>
                <Match when={params.type === "manga"}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg>
                </Match>
              </Switch>
            </div>
            <div class="right">
              <p class="value">{numberCommas(user().statistics[params.type].count || 0)}</p>
              <p class="title">Total {params.type}</p>
            </div>
          </li>
          <li>
            <div class="svg-container">
              <Switch>
                <Match when={params.type === "anime"}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>
                </Match>
                <Match when={params.type === "manga"}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path></svg>
                </Match>
              </Switch>
            </div>
            <div class="right">
              <p class="value">
                <Switch>
                  <Match when={params.type === "anime"}>
                    {numberCommas(user().statistics.anime.episodesWatched || 0)}
                  </Match>
                  <Match when={params.type === "manga"}>
                    {numberCommas(user().statistics.manga.chaptersRead || 0)}
                  </Match>
                </Switch>
              </p>
              <p class="title">
                <Switch>
                  <Match when={params.type === "anime"}>Episodes watched</Match>
                  <Match when={params.type === "manga"}>Chapters read</Match>
                </Switch>
              </p>
            </div>
          </li>
          <li>
            <div class="svg-container">
              <Switch>
                <Match when={params.type === "anime"}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path></svg>
                </Match>
                <Match when={params.type === "manga"}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"></path></svg>
                </Match>
              </Switch>
            </div>
            <div class="right">
              <p class="value">
                <Switch>
                  <Match when={params.type === "anime"}>
                    {((user().statistics.anime.minutesWatched || 0) / 60 / 24).toFixed(1)}
                  </Match>
                  <Match when={params.type === "manga"}>
                    {user().statistics.manga.volumesRead || 0}
                  </Match>
                </Switch>
              </p>
              <p class="title">
                <Switch>
                  <Match when={params.type === "anime"}>Days watched</Match>
                  <Match when={params.type === "manga"}>Volumes read</Match>
                </Switch>
              </p>
            </div>
          </li>
          <li>
            <div class="svg-container">
              <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64z"></path></svg>
            </div>
            <div class="right">
              <p class="value">
                <Switch>
                  <Match when={params.type === "anime"}>
                    {((props.stats.statuses.find(list => list.status === "PLANNING")?.minutesWatched || 0) / 60 / 24).toFixed(1)}
                  </Match>
                  <Match when={params.type === "manga"}>
                    {((props.stats.statuses.find(list => list.status === "PLANNING")?.chaptersRead || 0))}
                  </Match>
                </Switch>
              </p>
              <p class="title">
                <Switch>
                  <Match when={params.type === "anime"}>Days planned</Match>
                  <Match when={params.type === "manga"}>Chapters planned</Match>
                </Switch>
              </p>
            </div>
          </li>
          <li>
            <div class="svg-container">
              <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M109.25 173.25c24.99-24.99 24.99-65.52 0-90.51-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 25 25 65.52 25 90.51 0zm256 165.49c-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 24.99 24.99 65.52 24.99 90.51 0 25-24.99 25-65.51 0-90.51zm-1.94-231.43l-22.62-22.62c-12.5-12.5-32.76-12.5-45.25 0L20.69 359.44c-12.5 12.5-12.5 32.76 0 45.25l22.62 22.62c12.5 12.5 32.76 12.5 45.25 0l274.75-274.75c12.5-12.49 12.5-32.75 0-45.25z"></path></svg>
            </div>
            <div class="right">
              <p class="value">{(user().statistics[params.type].meanScore || 0).toFixed(2)}</p>
              <p class="title">Mean score</p>
            </div>
          </li>
          <li>
            <div class="svg-container">
              <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm0-192c35.35 0 64-28.65 64-64s-28.65-64-64-64-64 28.65-64 64 28.65 64 64 64zm192 48H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
            </div>
            <div class="right">
              <p class="value">{(user().statistics[params.type].standardDeviation || 0).toFixed(1)}</p>
              <p class="title">Standard Deviation</p>
            </div>
          </li>
        </ul>
      </section>
      <StatsScoreDistributionBars data={props.stats.scores.sort((a, b) => a.score - b.score)}/>
      <StatsEpisodeCountBars data={props.stats.lengths.sort((a, b) => (parseInt(a.length) || Infinity) - (parseInt(b.length) || Infinity))}/>
      <StatsDistributionLists formats={props.stats.formats} statuses={props.stats.statuses} countries={props.stats.countries} />
      <StatsYearLineCharts heading="Release year" data={props.stats.releaseYears.sort((a, b) => a.releaseYear - b.releaseYear)}/>
      <StatsYearLineCharts heading="Watch year" data={props.stats.startYears.sort((a, b) => a.startYear - b.startYear)}/>
    </>
  );
}

function useWidth(elem) {
  const [width, setWidth] = createSignal(elem()?.getBoundingClientRect().width || 0);
  const resize = () => {
    setWidth(elem()?.getBoundingClientRect().width || 0);
  }

  createEffect(on(elem, resize));

  window.addEventListener("resize", resize);

  onCleanup(() => {
    window.removeEventListener("resize", resize);
  });

  return width;
}

const lerp = (a, b, t) => {
  return a + t * (b - a);
}

function StatsScoreDistributionBars(props) {
  const params = useParams();
  const [state, setState] = createSignal("count");
  const [max, setMax] = createSignal(0);

  createEffect(() => {
    const maxValue = props.data.reduce((acc, v) => Math.max(acc, v[state()]), 0);
    setMax(maxValue);
  });

  return (
    <section class="user-profile-stat-score-bar-section">
      <div class="header flex-space-between">
        <h2>Score distributions</h2>
        <div>
          <button onClick={() => setState("count")}>
            <Switch>
              <Match when={params.type === "anime"}>Titles Watched</Match>
              <Match when={params.type === "manga"}>Titles read</Match>
            </Switch>
          </button>
          <Switch>
            <Match when={params.type === "anime"}>
              <button onClick={() => setState("minutesWatched")}>Hours Watched</button>
            </Match>
            <Match when={params.type === "manga"}>
              <button onClick={() => setState("chaptersRead")}>Chapters Read</button>
            </Match>
          </Switch>
        </div>
      </div>
      <DraggableScrollContainer>
        <ol>
          <For each={props.data}>{stat => (
            <li>
              <p>{stat.score}</p>
              <div style={{height: `${stat[state()] / max() * 85}%`}}></div>
              <p>
                <Show when={state() === "minutesWatched"} fallback={numberCommas(stat[state()])}>
                  {numberCommas(Math.ceil(stat[state()] / 60))}
                </Show>
              </p>
            </li>
          )}</For>
        </ol>
      </DraggableScrollContainer>
    </section>
  );
}

function StatsEpisodeCountBars(props) {
  const params = useParams();
  const [state, setState] = createSignal("count");
  const [max, setMax] = createSignal(0);

  createEffect(() => {
    const maxValue = props.data.reduce((acc, v) => Math.max(acc, v[state()]), 0);
    setMax(maxValue);
  });

  return (
    <section class="user-profile-stat-score-bar-section">
      <div class="header flex-space-between">
        <h2>Episode count</h2>
        <div>
          <button onClick={() => setState("count")}>
            <Switch>
              <Match when={params.type === "anime"}>Titles Watched</Match>
              <Match when={params.type === "manga"}>Titles read</Match>
            </Switch>
          </button>
          <Switch>
            <Match when={params.type === "anime"}>
              <button onClick={() => setState("minutesWatched")}>Hours Watched</button>
            </Match>
            <Match when={params.type === "manga"}>
              <button onClick={() => setState("chaptersRead")}>Chapters Read</button>
            </Match>
          </Switch>
          <button onClick={() => setState("meanScore")}>Mean Score</button>
        </div>
      </div>
      <DraggableScrollContainer>
        <ol>
          <For each={props.data}>{stat => (
            <li>
              <p>{stat.length || "Unknown"}</p>
              <div style={{height: `${stat[state()] / max() * 85}%`}}></div>
              <p>
                <Show when={state() === "minutesWatched"} fallback={numberCommas(stat[state()])}>
                  {numberCommas(Math.ceil(stat[state()] / 60))}
                </Show>
              </p>
            </li>
          )}</For>
        </ol>
      </DraggableScrollContainer>
    </section>
  );
}

function StatsYearLineCharts(props) {
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
      } if (i < arr.length - 1) {
        return "S" + lerp(getX(i), getX(i - 1), rounding) + " " + lerp(getY(year[state()]), getY(year[state()]) + (getY(arr[i - 1][state()]) - getY(arr[i + 1][state()])) / 2, rounding) + "," + getX(i) + " " + getY(year[state()]);
      }
      return "S" + lerp(getX(i), getX(i - 1), rounding) + " " + lerp(getY(year[state()]), getY(arr[i - 1][state()]), rounding) + "," + getX(i) + " " + getY(year[state()]);
    }).join("");
  });

  const pathFill = createMemo(() => {
    return path() + "L" + getX(props.data.length - 1) + " " + getY(0) + bottomPadding + "L" + inlinePadding + " " + getY(0) + bottomPadding;
  });

  return (
    <Show when={props.data.length}>
      <section class="user-profile-stats-graph-container no-motion" ref={container}>
        <div class="header flex-space-between">
          <h2>{props.heading}</h2>
          <div>
            <button onClick={() => setState("count")}>
              <Switch>
                <Match when={params.type === "anime"}>Titles Watched</Match>
                <Match when={params.type === "manga"}>Titles read</Match>
              </Switch>
            </button>
            <Switch>
              <Match when={params.type === "anime"}>
                <button onClick={() => setState("minutesWatched")}>Hours Watched</button>
              </Match>
              <Match when={params.type === "manga"}>
                <button onClick={() => setState("chaptersRead")}>Chapters Read</button>
              </Match>
            </Switch>
            <button onClick={() => setState("meanScore")}>Mean Score</button>
          </div>
        </div>
        <DraggableScrollContainer>
          <svg width={getX(props.data.length - 1) + inlinePadding} height={getY(0) + bottomPadding}>
            <path d={pathFill()} stroke="none" stroke-width="0" fill="grey" />
            <rect x="0" y={getY(0)} width="100%" height="60" fill="darkgrey" stroke="none" pointer-events="all" />
            <path d={path()} stroke="black" stroke-width="5" fill="transparent" />
            <For each={props.data}>{(year, i) => (
              <g class="item">
                <rect x={getX(i()) - width() / 2} y="0" width={width()} height="100%" fill="none" stroke="none" pointer-events="all" />
                <circle cx={getX(i())} cy={getY(year[state()])} r="6" pointer-events="none" />
                <text class="text" x={getX(i())} y="0" style={{translate: `0 ${getY(year[state()]) - 10}px`}} text-anchor="middle">
                  <Show when={state() === "minutesWatched"} fallback={numberCommas(year[state()])}>
                    {numberCommas(Math.ceil(year[state()] / 60))}
                  </Show>
                </text>
                <text class="year" x={getX(i())} y="304" text-anchor="middle">{year.releaseYear || year.startYear}</text>
              </g>
            )}</For>
          </svg>
        </DraggableScrollContainer>
      </section>
    </Show>
  );
}

function DraggableScrollContainer(props) {
  let xStart = 0;
  let xScroll = 0;
  let xPrev = NaN;
  let scrollContainer;

  return (
    <div class="scroll" ref={scrollContainer} onMouseMove={e => {
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

function StatsDistributionLists(props) {
  const [formats, setFormats] = createSignal();
  const params = useParams();
  const { user } = useUser();

  createEffect(() => {
    setFormats(props.formats.reduce((acc, v) => acc + v.count, 0));
  });

  return (
    <section class="user-profile-stats-formats">
      <div>
        <h2>Format distribution</h2>
        <ol>
          <For each={props.formats}>{format => (
            <li>
              <div>
                <div class="container">
                  <A class="title" href={"/user/" + user().name + "/" + params.type + "/" + "?format=" + format.format}>{formatMediaFormat(format.format)}</A>
                  <p>{format.meanScore || ""}</p>
                </div>
                <DistributionFooter stats={format} />
              </div>
              <div class="right">
                <p>{(format.count / formats() * 100).toFixed(2)}%</p>
                <p>{numberCommas(format.count)}/{formats()}</p>
              </div>
            </li>
          )}</For>
        </ol>
        <div class="filler"></div>
      </div>
      <div>
        <h2>Status distribution</h2>
        <ol>
          <For each={props.statuses}>{status => (
            <li>
              <div>
                <div class="container">
                  <A class="title" href={"/user/" + user().name + "/" + params.type + "?userStatus=" + status.status}>
                    <Switch fallback={capitalize(status.status)}>
                      <Match when={status.status === "CURRENT"}>
                        <Switch>
                          <Match when={params.type === "anime"}>Watching</Match>
                          <Match when={params.type === "manga"}>Reading</Match>
                        </Switch>
                      </Match>
                      <Match when={status.status === "REPEATING"}>
                        <Switch>
                          <Match when={params.type === "anime"}>Rewatching</Match>
                          <Match when={params.type === "manga"}>Rereading</Match>
                        </Switch>
                      </Match>
                    </Switch>
                  </A>
                  <p>{status.meanScore || ""}</p>
                </div>
                <DistributionFooter stats={status} />
              </div>
              <div class="right">
                <p>{(status.count / formats() * 100).toFixed(2)}%</p>
                <p>{numberCommas(status.count)}/{formats()}</p>
              </div>
            </li>
          )}</For>
        </ol>
        <div class="filler"></div>
      </div>
      <div>
        <h2>Country distribution</h2>
        <ol>
          <For each={props.countries}>{country => (
            <li>
              <div>
                <div class="container">
                  <A class="title" href={"/user/" + user().name + "/" + params.type + "?countryOfOrigin=" + country.country}>{countryNameFromCountryCode(country.country)}</A>
                  <p>{country.meanScore || ""}</p>
                </div>
                <DistributionFooter stats={country} />
              </div>
              <div class="right">
                <p>{(country.count / formats() * 100).toFixed(2)}%</p>
                <p>{numberCommas(country.count)}/{formats()}</p>
              </div>
            </li>
          )}</For>
        </ol>
        <div class="filler"></div>
      </div>
    </section>
  );
}

function DistributionFooter(props) {
  const params = useParams();

  return (
    <p class="time">
      <Switch>
        <Match when={params.type === "anime"}>
          <Show when={Math.floor(props.stats.minutesWatched / 60 / 24)}>{days => <>{numberCommas(days())} day{plural(days())} </>}</Show>
          <Show when={Math.floor(props.stats.minutesWatched / 60 % 24)}>{hours => <>{numberCommas(hours())} hour{plural(hours())} </>}</Show>
          <Show when={props.stats.minutesWatched < 60}>{props.stats.minutesWatched} minute{plural(props.stats.minutesWatched)}</Show>
        </Match>
        <Match when={params.type === "manga"}>
          Chapters read {numberCommas(props.stats.chaptersRead)}
        </Match>
      </Switch>
    </p>
  );
}
