import { useParams } from "@solidjs/router";
import { A } from "../components/CustomA";
import api from "../utils/api";
import { Switch, Match, Show } from "solid-js";
import { AnimeTheme } from "../components/media/AnimeThemes.jsx";

function Artist() {
  const params = useParams();
  const [artistData] = api.anilist.animeThemeByArtisSlug(params.name);
  const video = <video src="" controls autoPlay />;

  return (
    <>
      <h1>Artist</h1>
      <Show when={artistData()}>
        <p>{artistData().data.artist.name}</p>
        <img src={artistData().data.artist.images[0].link} alt="Artist" />
        <For each={artistData().data.artist.songs}>{theme => (
          <For each={theme.animethemes}>{theme => (
            <AnimeTheme theme={theme} video={video} mainArtist={params.name} />
          )}</For>
        )}</For>
        {video}
      </Show>
    </>
  );
}

export default Artist
