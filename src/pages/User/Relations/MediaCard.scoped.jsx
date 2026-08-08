import { A } from "@solidjs/router";
import { createSignal, For, Match, onCleanup, Show, Switch } from "solid-js";
import { capitalize, formatMediaFormat, formatMediaStatus, languageFromCountry } from "../../../utils/formating";
import "./index-(user-relations).scoped.css";
import { DurationToTime, EpisodeTime2 } from "../../Home/EpisodeTime";
import { formatingUtils, urlUtils } from "../../../utils/utils";
import Star from "../../../assets/Star";
import { setMediaPageAnilistData } from "../../MediaPageAnilist/index(media-page-anilist).scoped";
import "./MediaCard.scoped.css";
import { Portal } from "solid-js/web";
import { assertTypeFunction } from "../../../collections/asserts";
import { ImageLoader } from "./ImageLoader.scoped";


const hovers = [];
const SHOW_HOVER = Symbol("SHOW_HOVER");
const PLACE_HOVER = Symbol("PLACE_HOVER");
const CHILD = Symbol("CHILD");

// Hot reload will always start a new requestAnimationFrame so we make a global "key" to know when hotreload has reloaded file
// When this happens, the old requestAnimationFrame will be stopped
const current = performance.now();
window.currentHotReloadAnimationFrame = current;
requestAnimationFrame(handleHovers);

function handleHovers() {

  hovers.forEach(elem => {
    const hovered = elem.matches(":hover, :focus-visible, :has(:focus-visible)");
    elem[SHOW_HOVER](hovered);
    if (hovered) {
      const child = elem[CHILD];
      if (child) {
        elem[PLACE_HOVER](elem, child);
      }
    }
  });

  if (window.currentHotReloadAnimationFrame === current) {
    requestAnimationFrame(handleHovers);
  }

}

const removeRef = elem => {
  if (elem) {
    const index = hovers.indexOf(elem);
    hovers[index] = hovers.at(-1);
    hovers.pop();
  }
};

const gen = handleHover => {

  assertTypeFunction(handleHover);

  const [show, setShow] = createSignal();
  let parent;
  onCleanup(() => {
    removeRef(parent);
  });

  const handleRef = elem => {
    removeRef(parent);
    parent = elem;
    hovers.push(elem);
    elem[SHOW_HOVER] = setShow;
    elem[PLACE_HOVER] = handleHover;
  };

  const childRef = hoverElem => {
    parent[CHILD] = hoverElem;
  };

  return [handleRef, childRef, show];
};

const handleCardHover = (parent, hover) => {
  if (!hover) return;
  let { x, y, width, height } = parent.getBoundingClientRect();
  x += document.body.parentElement.scrollLeft;
  y += document.body.parentElement.scrollTop;

  if (hover.clientWidth + x + width + 25 < document.body.scrollWidth) {
    hover.style.left = x + width + 25 + "px";
    hover.style.top = y + 25 + "px";
  } else if (x - hover.clientWidth - 25 > 0) {
    hover.style.left = x - hover.clientWidth - 25 + "px";
    hover.style.top = y + 25 + "px";
  } else {
    const max = document.body.scrollWidth - hover.clientWidth;
    hover.style.left = Math.max(0, Math.min(x + width / 2 - hover.clientWidth / 2, max)) + "px";
    hover.style.top = y + height + 25 + "px";
  }
};

export function MediaCard(props) {

  // We don't want this to be reactive, because if they switch between animation, the animation will stop
  const { cardZoomIn } = props;

  const handleClick = () => {
    setMediaPageAnilistData({ data: { data: { Media: props.media } } });
  };

  const [refFunc, childRef, hovered] = gen(handleCardHover);

  return (
    <A scoped ref={refFunc} href={urlUtils.anilistMediaUrl(props.media)} class="media-card" classList={{ "zoom-in": cardZoomIn, "loading": props.loading }} style={{ "--media-background-color": props.media.coverImage?.color }} onClick={handleClick}>
      <ImageLoader scoped class="bg" fadeIn={props.coverFadeIn} src={props.media.coverImage.extraLarge || props.media.coverImage.large} />
      <Show when={props.media.averageScore}>
        <div class="score">
          <Star scoped /> {(props.media.averageScore / 10)}
        </div>
      </Show>
      <p class="line-clamp">{props.media.title.userPreferred}</p>
      <Show when={hovered()}>
        <Portal mount={document.getElementById("hovers")}>
          <HoverCard {...props} ref={childRef} />
        </Portal>
      </Show>
    </A>
  )
}

function HoverCard(props) {
  return (
    <div class="hover-card" classList={{ loading: props.loading }} style={{ "--media-background-color": props.media?.coverImage?.color }} ref={props.ref}>
      <ImageLoader scoped class="banner" waitBeforeFade={300} fadeIn src={props.media?.bannerImage} />
      <p class="line-clamp header shadow">{props.media?.title.userPreferred}</p>
      <Show when={props.media?.nextAiringEpisode?.episode && props.media?.nextAiringEpisode?.airingAt}>
        <p class="episodes">
          <Show when={props.media?.format !== "MOVIE"} fallback="Movie ">
            Ep {props.media?.nextAiringEpisode.episode}{" "}
          </Show>
          <EpisodeTime2 airingAt={props.media?.nextAiringEpisode.airingAt} flavorText="airing in " day=" day" hour=" hour" fallback={
            <EpisodeTime2 airingAt={props.media?.nextAiringEpisode.airingAt} flavorText="airing in " minute=" minute" fallback="has aired" />
          } />
        </p>
      </Show>
      <div class="body">
        <Show when={props.media?.studios?.edges.length}>
          <div class="studios shadow">
            <For each={props.media?.studios?.edges}>{edge => (
              <p>{edge.node.name}</p>
            )}</For>
          </div>
        </Show>
        <Show when={props.media?.genres?.length}>
          <div class="genres">
            <For each={props.media?.genres}>{genre => (
              <p>{genre}</p>
            )}</For>
          </div>
        </Show>
      </div>
      <div class="type-and-season">
        <div class="flex-bullet-separator">
          <Show when={props.media?.format}>
            <span>
              <Switch>
                <Match when={props.media?.countryOfOrigin !== "JP"}>
                  {formatMediaFormat(props.media?.format)} ({languageFromCountry(props.media?.countryOfOrigin)})
                </Match>
                <Match when={props.media?.countryOfOrigin === "JP"}>
                  {formatMediaFormat(props.media?.format)}
                </Match>
              </Switch>
            </span>
          </Show>
          <span>
            <Switch>
              <Match when={props.media?.type === "MANGA"}>
                <Switch>
                  <Match when={props.media?.format === "NOVEL" && props.media?.volumes}>
                    {props.media?.volumes} Volume{formatingUtils.plural(props.media?.volumes)}
                  </Match>
                  <Match when={props.media?.chapters}>
                    {props.media?.chapters} Chapter{formatingUtils.plural(props.media?.chapters)}
                  </Match>
                  <Match when={props.media?.status}>
                    {formatMediaStatus(props.media?.status)}
                  </Match>
                </Switch>
              </Match>
              <Match when={props.media?.type === "ANIME"}>
                <Switch>
                  <Match when={props.media?.format === "MOVIE" && props.media?.duration}>
                    <DurationToTime time={props.media?.duration * 60} minute=" minute" hour=" hour" />
                  </Match>
                  <Match when={props.media?.format !== "MOVIE" && props.media?.episodes}>
                    {props.media?.episodes} Episode{formatingUtils.plural(props.media?.episodes)}
                  </Match>
                </Switch>
              </Match>
            </Switch>
          </span>
        </div>
        <span class="season">
          <Switch>
            <Match when={props.media?.type === "MANGA"}>
              <Switch>
                <Match when={props.media?.startDate?.year}>
                  {props.media?.startDate.year}
                </Match>
                <Match when={props.media?.startDate?.year == null}>
                  TBA
                </Match>
              </Switch>
            </Match>
            <Match when={props.media?.type === "ANIME"}>
              <Switch>
                <Match when={props.media?.seasonYear && props.media?.season}>
                  {capitalize(props.media?.season)} {props.media?.seasonYear}
                </Match>
                <Match when={props.media?.startDate?.year}>
                  {props.media?.startDate.year}
                </Match>
                <Match when={props.media?.startDate?.year == null}>
                  TBA
                </Match>
              </Switch>
            </Match>
          </Switch>
        </span>
      </div>
    </div>
  );
}
