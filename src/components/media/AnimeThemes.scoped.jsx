import { A, useParams, useSearchParams } from "@solidjs/router";
import "./AnimeThemes.scoped.css";
import { queries } from "@/api/api.js";
import { asserts } from "@/utils/utils.js";
import { localizations } from "@/constants/constants.js";
import { createEffect, createSignal, ErrorBoundary, For, Match, Show, Switch } from "solid-js";
import { useMediaInfo } from "@/state/providers.js";
import { createAnimeThemesFetcher, sendAnimeThemesFetcher } from "@/api/fetcherUtils";
import { createCleanUpAbortController } from "@/utils/abortUtils.js";

function AnimeThemes() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { anilistData } = useMediaInfo();
  const videoPlayer = <video src="" controls autoPlay />;
  const [themeData, setThemeData] = createSignal(undefined, { equals: false });

  createEffect(() => {
    params.id;
    params.api;
    params.type;
    videoPlayer.src = "";
  });

  const controller = createCleanUpAbortController();
  let fetcher;
  createEffect(() => {
    if (params.type !== localizations.anime) return;

    const api = searchParams.isMalId != null ? localizations.mal : params.api;
    const site = api === localizations.mal ? "MAL" : "ANILIST";

    const signal = controller.abortAndRenew();
    fetcher = createAnimeThemesFetcher(queries.animeThemesByExternalSite, { site, id: [Number(params.id)] }, signal);
    sendAnimeThemesFetcher(fetcher, {
      name: "Themes",
      onFetch: () => controller.disable(),
      setValue: (res, { fetcher: f }) => {
        // Ignore responses from fetchers that have since been replaced
        if (f.cacheKey === fetcher.cacheKey) setThemeData(res.data.data.filterAnimeByExternalSite[0]);
      },
    });
  });

  return (
    <ErrorBoundary fallback="AnimeThemes error">
      <Show when={themeData() && anilistData()?.data.data.Media?.type === localizations.ANIME}>
        <div>
          <h2>Themes</h2>
          <For each={themeData().themes}>{theme => (
            <AnimeTheme href={"https://animethemes.moe/anime/" + themeData().slug + "/" + theme.slug} theme={theme} video={videoPlayer} />
          )}</For>
          {videoPlayer}
        </div>
      </Show>
    </ErrorBoundary>
  );
}

export function AnimeTheme(props) {
  asserts.assertTruthy(props.video, "Missing video element for playback");
  asserts.assertTruthy(props.theme, "Theme data is missing");
  let artistAndCharacter = false;
  const artists = () => props.theme.song?.staff.filter(staff => staff.role === "Performance").map(staff => staff.artist);

  return (
    <ErrorBoundary fallback="AnimeThemes row error">
      <div class="theme-container">
        <div class="header">
          <p>{props.theme.slug}</p>
          <Show when={props.theme.song}>
            <p>{props.theme.song.title.romaji}
              <Switch>
                <Match when={props.mainArtist}>
                  <Show when={artists().length > 1}> feat </Show>
                </Match>
                <Match when={artists().length}> by </Match>
              </Switch>
              <For each={artists()}>{artist => (
                <Show when={!props.mainArtist || artist.slug !== props.mainArtist}>
                  <Show when={artistAndCharacter} fallback={artistAndCharacter = true}> & </Show>
                  <A href={"/artist/" + artist.slug}>{artist.name.main}</A>
                </Show>
              )}</For>
            </p>
          </Show>
          {props.children}
        </div>
        <For each={props.theme.entries}>{row => (
          <div class="details">
            <p>v{row.version || 1}</p>
            <p>Ep: {row.episodes || "-"}</p>
            <Show when={row.spoiler}><p class="spoiler">Spoilers</p></Show>
            <div class="play-button-container">
              <For each={row.videos.nodes}>{video => (
                <div class="play-button">
                  <button onClick={() => props.video.src = video.link}>play</button>
                  <a target="_blank" href={props.href + (row.version > 1 ? "v" + row.version : "") + (video.tags ? "-" + video.tags : "")}>open</a>
                  <span>{video.resolution}</span>
                  <span>{video.source}</span>
                  <span>{video.nc && "NC"}</span>
                </div>
              )}</For>
            </div>
          </div>
        )}</For>
      </div>
    </ErrorBoundary>
  );
}

export default AnimeThemes;
