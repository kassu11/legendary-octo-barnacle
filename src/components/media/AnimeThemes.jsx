import { A } from "../../components/CustomA.jsx";
import style from "./AnimeThemes.module.scss";

function AnimeThemes(props) {
  const videoPlayer = <video src="" controls autoPlay />;

  return (
    <div>
      <h2>Themes</h2>
      {console.log(props.theme)}
      <For each={props.theme?.animethemes}>{theme => (
        <div class={style.themeContainer}>
          <div class={style.header}>
            <p>{theme.slug}</p>
            <p>{theme.song.title}
              <Show when={theme.song.artists?.length}> by </Show>
              <For each={theme.song.artists}>{artist => (
                <A href={"/artist/" + artist.slug}>{artist.name}</A>
              )}</For>
            </p>
          </div>
          <For each={theme.animethemeentries}>{row => (
            <div class={style.details}>
              <p>v{row.version || 1}</p>
              <p>Ep: {row.episodes || "-"}</p>
              <Show when={row.spoilers}><p>Spilers</p></Show>
              <div class={style.playButtonContainer}>
              <For each={row.videos}>{video => (
                <div class={style.playButton}>
                  <button onClick={() => videoPlayer.src = video.link}>play</button>
                  <p>{video.resolution}</p>
                  <p>{video.source}</p>
                  <p>{video.nc && "NC"}</p>
                </div>
              )}</For>
              </div>
            </div>
          )}</For>
        </div>
      )}</For>
      {videoPlayer}
    </div>
  );
}

export default AnimeThemes;
