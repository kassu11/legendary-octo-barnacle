import { For, Match, Show, Switch } from "solid-js";
import { capitalize, formatMediaFormat, formatMediaStatus, languageFromCountry, plural } from "@/utils/formatUtils";
import { DurationToTime, EpisodeTime2 } from "@/components/media/EpisodeTime";
import "./MediaHoverCard.scoped.css";
import { ImageLoader } from "./ImageLoader.scoped";

export function MediaHoverCard(props) {
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
              <Show when={edge.isMain}>
                <p>{edge.node.name}</p>
              </Show>
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
          <Show when={props.media?.format} fallback="Format TBA">
            <span>
              <Switch>
                <Match when={!props.media?.countryOfOrigin || props.media.countryOfOrigin === "JP"}>
                  {formatMediaFormat(props.media?.format)}
                </Match>
                <Match when={props.media?.countryOfOrigin !== "JP"}>
                  {formatMediaFormat(props.media?.format)} ({languageFromCountry(props.media?.countryOfOrigin)})
                </Match>
              </Switch>
            </span>
          </Show>
          <span>
            <Switch>
              <Match when={props.media?.type === "MANGA"}>
                <Switch>
                  <Match when={props.media?.format === "NOVEL" && props.media?.volumes}>
                    {props.media?.volumes} Volume{plural(props.media?.volumes)}
                  </Match>
                  <Match when={props.media?.chapters}>
                    {props.media?.chapters} Chapter{plural(props.media?.chapters)}
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
                    {props.media?.episodes} Episode{plural(props.media?.episodes)}
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
