import { useParams } from "@solidjs/router";
import { createEffect, createSignal, For, Show } from "solid-js";
import { AnimeTheme } from "../../components/MediaPage/AnimeThemes.jsx";
import style from "./Artist.module.scss";
import { createTimer, formatMSToString } from "../../utils/timeUtils.js";
import { createJsonGetFetcher, sendFetcher } from "../../utils/fetcherUtils.js";
import { queries } from "../../collections/collections.js";
import { createCleanUpAbortController } from "../../utils/abortUtils.js";

function Artist() {
  const params = useParams();

  const [artistTime, startArtistTimer, stopArtistTimer] = createTimer();
  const [artistData, setArtistData] = createSignal(undefined, { equals: false });
  const artistController = createCleanUpAbortController();
  let artistFetcher;

  createEffect(() => {
    const signal = artistController.abortAndRenew();

    artistFetcher = createJsonGetFetcher(queries.animeThemesByArtisSlug, { slug: params.name }, signal);

    sendFetcher(artistFetcher, {
      name: "AnimeThemes artist",
      onFetch: () => artistController.disable(),
      onStart: startArtistTimer,
      onStop: stopArtistTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === artistFetcher.cacheKey) setArtistData(res);
      }
    });
  });

  const video = <video src="" controls autoPlay />;
  document.title = "Artist - LOB";

  return (
    <>
      <p>{formatMSToString(artistTime())}</p>
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
