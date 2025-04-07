import { A } from "../../components/CustomA.jsx";
import { assert } from "../../utils/assert.js";
import style from "./AnimeThemes.module.scss";

function AnimeThemes(props) {
  const videoPlayer = <video src="" controls autoPlay />;

  return (
    <div>
      <h2>Themes</h2>
      <For each={props.theme?.animethemes}>{theme => (
        <AnimeTheme theme={theme} video={videoPlayer} />
      )}</For>
      {videoPlayer}
    </div>
  );
}

export function AnimeTheme(props) {
  assert(props.video, "Missing video element for playback");
  assert(props.theme, "Theme data is missing");
  let artistAndCharacter = false;

  return (
    <div class={style.themeContainer}>
      <div class={style.header}>
        <p>{props.theme.slug}</p>
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
      </div>
      <For each={props.theme.animethemeentries}>{row => (
        <div class={style.details}>
          <p>v{row.version || 1}</p>
          <p>Ep: {row.episodes || "-"}</p>
          <Show when={row.spoiler}><p class={style.spoiler}>Spoilers</p></Show>
          <div class={style.playButtonContainer}>
            <For each={row.videos}>{video => (
              <div class={style.playButton}>
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
  );
}

export default AnimeThemes;
