import { A } from "../../components/CustomA.jsx";
import { assert } from "../../utils/assert.js";
import style from "./AnimeThemes.module.scss";

function AnimeThemes(props) {
  const videoPlayer = <video src="" controls autoPlay />;

  return (
    <div>
      <h2>Themes</h2>
      {console.log(props.theme)}
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
              <A href={"/artist/" + artist.slug}>{artist.name}</A>
            </Show>
          )}</For>
        </p>
      </div>
      <For each={props.theme.animethemeentries}>{row => (
        <div class={style.details}>
          <p>v{row.version || 1}</p>
          <p>Ep: {row.episodes || "-"}</p>
          <Show when={row.spoilers}><p>Spilers</p></Show>
          <div class={style.playButtonContainer}>
            <For each={row.videos}>{video => (
              <div class={style.playButton}>
                <button onClick={() => props.video.src = video.link}>play</button>
                <p>{video.resolution}</p>
                <p>{video.source}</p>
                <p>{video.nc && "NC"}</p>
              </div>
            )}</For>
          </div>
        </div>
      )}</For>
    </div>
  );
}

export default AnimeThemes;
