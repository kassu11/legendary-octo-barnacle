import { useParams } from "@solidjs/router";
import { A } from "../components/CustomA";
import api from "../utils/api";
import { Switch, Match, Show, createEffect, createSignal } from "solid-js";
import { AnimeTheme } from "../components/media/AnimeThemes.jsx";
import style from "./Artist.module.scss";

function Artist() {
  const params = useParams();
  const [artistData] = api.animeThemes.artisBySlug(() => params.name);
  const video = <video src="" controls autoPlay />;

  createEffect(() => {
    setName(params.name);
  });

  return (
    <>
      <h1>Artist</h1>
      <Show when={artistData()}>
        <p>{artistData().data.artist.name}</p>
        <img src={artistData().data.artist.images[0].link} alt="Artist" />
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
