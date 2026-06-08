import { A, useParams, useSearchParams } from "@solidjs/router";
import style from "./AnimeThemes.module.scss";
import { queries } from "../../collections/collections.js";
import { asserts } from "../../collections/collections.js";
import { localizations } from "../../collections/collections.js";
import { createEffect, createSignal, ErrorBoundary, For, Match, Show, Switch } from "solid-js";
import { useMediaInfo } from "../../context/providers.js";
import { createJsonGetFetcher, sendFetcher } from "../../utils/fetcherUtils";

function AnimeThemes() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { anilistData } = useMediaInfo();
  const videoPlayer = <video src="" controls autoPlay />;
  const [themeData, setThemeData] = createSignal();

  createEffect(() => {
    params.id;
    params.api;
    params.type;
    videoPlayer.src = "";
  });

  let sessionId = 0;
  createEffect(() => {
    if (params.type !== localizations.anime) return;

    const api = searchParams.isMalId != null ? localizations.mal : params.api;

    let query;
    if (api === localizations.ani) query = queries.animeThemesByAnilistId;
    else if (api === localizations.mal) query = queries.animeThemesByMyAnimeListId;

    let curId = ++sessionId;
    const fetcher = createJsonGetFetcher(query, { id: params.id });
    sendFetcher(fetcher, {
      name: "Themes",
      setValue: res => {
        if (curId === sessionId) setThemeData(res);
      }
    });
  });

  return (
    <ErrorBoundary fallback="AnimeThemes error">
      <Show when={themeData() && anilistData()?.data.data.Media?.type === localizations.ANIME}>
        <div>
          <h2>Themes</h2>
          <For each={themeData()?.data?.anime?.[0]?.animethemes}>{theme => (
            <AnimeTheme theme={theme} video={videoPlayer} />
          )}</For>
          {videoPlayer}
        </div>
      </Show>
    </ErrorBoundary>
  );
}

export function AnimeTheme(props) {
  asserts.assertTrueOLD(props.video, "Missing video element for playback");
  asserts.assertTrueOLD(props.theme, "Theme data is missing");
  let artistAndCharacter = false;

  return (
    <ErrorBoundary fallback="AnimeThemes row error">
      <div className={style.themeContainer}>
        <div className={style.header}>
          <p>{props.theme.slug}</p>
          <Show when={props.theme.song}>
            <p>{props.theme.song.title}
              <Switch>
                <Match when={props.mainArtist}>
                  <Show when={props.theme.song.artists?.length > 1}> feat </Show>
                </Match>
                <Match when={props.theme.song.artists?.length}> by </Match>
              </Switch>
              <For each={props.theme.song.artists}>{artist => (
                <Show when={!props.mainArtist || artist.slug !== props.mainArtist}>
                  <Show when={artistAndCharacter} fallback={artistAndCharacter = true}> & </Show>
                  <A href={"/artist/" + artist.slug}>{artist.name}</A>
                </Show>
              )}</For>
            </p>
          </Show>
        </div>
        <For each={props.theme.animethemeentries}>{row => (
          <div className={style.details}>
            <p>v{row.version || 1}</p>
            <p>Ep: {row.episodes || "-"}</p>
            <Show when={row.spoiler}><p className={style.spoiler}>Spoilers</p></Show>
            <div className={style.playButtonContainer}>
              <For each={row.videos}>{video => (
                <div className={style.playButton}>
                  <button onClick={() => props.video.src = video.link}>play</button>
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
