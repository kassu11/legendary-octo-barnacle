import { useParams } from "@solidjs/router";
import api from "../utils/api";
import { Switch, Match, Show, createEffect, createSignal } from "solid-js";
import { AnimeTheme } from "../components/media/AnimeThemes.jsx";
import style from "./Artist.module.scss";

function Artist() {
  const params = useParams();
  const [artistData] = api.animeThemes.artisBySlug(() => params.name);
  const video = <video src="" controls autoPlay />;
  document.title = "Artist - LOB";

  return (
    <>
      <h1>Artist</h1>
      <Show when={artistData()}>
        <p>{artistData().data.artist.name}</p>
        <Show when={artistData().data.artist.images.length} fallback={<img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/default.jpg" alt="Artist missing" />}>
          <img src={artistData().data.artist.images[0].link} alt="Artist" />
        </Show>
        <div class={style.themes}>
          <For each={artistData().data.artist.songs}>{theme => (
            <div class={style.episode}>
              <For each={theme.animethemes}>{theme => (
                <AnimeTheme theme={theme} video={video} mainArtist={params.name} />
              )}</For>
            </div>
          )}</For>
        </div>
        {video}
      </Show>
    </>
  );
}

export default Artist
