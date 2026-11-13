import { useParams } from "@solidjs/router";
import { createEffect, createSignal, For, Show } from "solid-js";
import { AnimeTheme } from "@/components/media/AnimeThemes.scoped.jsx";
import "./ArtistIndex.scoped.css";
import { createTimer } from "@/hooks/createTimer.js";
import { formatMSToString } from "@/utils/timeUtils.js";
import { createAnimeThemesFetcher, sendAnimeThemesFetcher } from "@/api/fetcherUtils.js";
import { queries } from "@/api/api.js";
import { createCleanUpAbortController } from "@/utils/abortUtils.js";

function Artist() {
  const params = useParams();

  const [artistTime, startArtistTimer, stopArtistTimer] = createTimer();
  const [artistData, setArtistData] = createSignal(undefined, { equals: false });
  const artistController = createCleanUpAbortController();
  let artistFetcher;

  createEffect(() => {
    const signal = artistController.abortAndRenew();

    artistFetcher = createAnimeThemesFetcher(queries.animeThemesArtistBySlug, { slug: params.name }, signal);

    sendAnimeThemesFetcher(artistFetcher, {
      name: "AnimeThemes artist",
      onFetch: () => artistController.disable(),
      onStart: startArtistTimer,
      onStop: stopArtistTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === artistFetcher.cacheKey) setArtistData(res.data.data.artist);
      }
    });
  });

  // The artist can have multiple roles in the same song, so only list each song once
  const songs = () => {
    const songs = new Map();
    for (const { song } of artistData().songStaff) songs.set(song.id, song);
    return [...songs.values()];
  };
  const image = () => {
    const images = artistData().images.nodes;
    return images.find(image => image.facet === "LARGE_COVER") ?? images[0];
  };

  const video = <video src="" controls autoPlay />;
  document.title = "Artist - LOB";

  return (
    <>
      <p>{formatMSToString(artistTime())}</p>
      <h1>Artist</h1>
      <Show when={artistData()}>
        <p>{artistData().name.main}</p>
        <Show when={image()} fallback={<img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/default.jpg" alt="Artist missing" />}>
          <img src={image().link} alt="Artist" />
        </Show>
        <div class="themes">
          <For each={songs()}>{song => (
            <div class="episode">
              <For each={song.themes}>{theme => (
                <AnimeTheme href={"https://animethemes.moe/anime/" + theme.anime.slug + "/" + theme.slug} theme={theme} video={video} mainArtist={params.name} />
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
