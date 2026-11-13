import { A, useParams } from "@solidjs/router";
import { createEffect, createSignal, For, Show } from "solid-js";
import { AnimeTheme } from "@/components/media/AnimeThemes.scoped.jsx";
import "./ArtistIndex.scoped.css";
import { createTimer } from "@/hooks/createTimer.js";
import { formatMSToString } from "@/utils/timeUtils.js";
import { createAnimeThemesFetcher, sendAnimeThemesFetcher } from "@/api/fetcherUtils.js";
import { queries } from "@/api/api.js";
import { createCleanUpAbortController } from "@/utils/abortUtils.js";
import { capitalize, formatMediaFormat, formatTitleToUrl } from "@/utils/formatUtils.js";

const seasonOrder = { WINTER: 0, SPRING: 1, SUMMER: 2, FALL: 3 };
const themeTypeOrder = { OP: 0, ED: 1, IN: 2 };

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

  // The artist can have multiple roles in the same song, so collect the credits per song
  // and group the themes by the anime they are from, newest anime first
  const animes = () => {
    const credits = new Map();
    const animes = new Map();

    for (const { song, ...credit } of artistData().songStaff) {
      if (credits.has(song.id)) {
        credits.get(song.id).push(credit);
        continue;
      }

      credits.set(song.id, [credit]);

      for (const theme of song.themes) {
        if (!animes.has(theme.anime.slug)) animes.set(theme.anime.slug, { anime: theme.anime, themes: [] });
        animes.get(theme.anime.slug).themes.push({ theme, credits: credits.get(song.id) });
      }
    }

    const sortedAnimes = [...animes.values()].sort((a, b) =>
      (b.anime.year ?? 0) - (a.anime.year ?? 0) ||
      (seasonOrder[b.anime.season] ?? -1) - (seasonOrder[a.anime.season] ?? -1) ||
      a.anime.title.romaji.localeCompare(b.anime.title.romaji)
    );

    for (const { themes } of sortedAnimes) {
      themes.sort((a, b) =>
        (themeTypeOrder[a.theme.type] ?? 3) - (themeTypeOrder[b.theme.type] ?? 3) ||
        (a.theme.sequence ?? 1) - (b.theme.sequence ?? 1)
      );
    }

    return sortedAnimes;
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
          <img class="artist-cover-image" src={image().link} alt="Artist" />
        </Show>
        <div class="animes">
          <For each={animes()}>{({ anime, themes }) => (
            <section class="anime">
              <AnimeHeader anime={anime} />
              <div class="themes">
                <For each={themes}>{({ theme, credits }) => (
                  <AnimeTheme href={"https://animethemes.moe/anime/" + anime.slug + "/" + theme.slug} theme={theme} video={video} mainArtist={params.name}>
                    <p class="credits">
                      <Show when={theme.group}>
                        <span class="group">{theme.group.name}</span>
                      </Show>
                      <For each={credits}>{credit => (
                        <span class="credit">
                          {credit.role}
                          <Show when={credit.alias}> as {credit.alias}</Show>
                          <Show when={credit.as}> as <span class="character">{credit.as}</span></Show>
                        </span>
                      )}</For>
                    </p>
                  </AnimeTheme>
                )}</For>
              </div>
            </section>
          )}</For>
        </div>
        {video}
      </Show>
    </>
  );
}

function AnimeHeader(props) {
  const cover = () => {
    const images = props.anime.images.nodes;
    return images.find(image => image.facet === "SMALL_COVER") ?? images[0];
  };
  const url = () => {
    const resources = props.anime.resources.nodes;
    const anilist = resources.find(resource => resource.site === "ANILIST" && resource.externalId);
    if (anilist) return "/ani/anime/" + anilist.externalId + "/" + formatTitleToUrl(props.anime.title.romaji);

    const mal = resources.find(resource => resource.site === "MAL" && resource.externalId);
    if (mal) return "/mal/anime/" + mal.externalId + "/" + formatTitleToUrl(props.anime.title.romaji);
  };
  const details = () => [
    formatMediaFormat(props.anime.format),
    [capitalize(props.anime.season), props.anime.year].filter(Boolean).join(" "),
  ].filter(Boolean).join(" · ");

  return (
    <header class="anime-header">
      <Show when={cover()} fallback={<div class="cover" />}>
        <img class="cover" src={cover().link} alt="Cover" loading="lazy" />
      </Show>
      <div class="info">
        <h2>
          <Show when={url()} fallback={props.anime.title.romaji}>
            <A href={url()}>{props.anime.title.romaji}</A>
          </Show>
        </h2>
        <Show when={props.anime.title.english && props.anime.title.english !== props.anime.title.romaji}>
          <p class="english-title">{props.anime.title.english}</p>
        </Show>
        <p class="details">{details()}</p>
      </div>
    </header>
  );
}

export default Artist
