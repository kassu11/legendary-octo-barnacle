import { createEffect, createSignal, Show } from "solid-js";
import { HorizontalCardRowScoped } from "./HorizontalCardRow.scoped.jsx";
import { VerticalCardRowScoped } from "./VerticalCardRow.scoped.jsx";
import "./BrowseMediaHome.scoped.css";
import { createTimer, formatMSToString } from "../../utils/timeUtils.js";
import { getDates } from "../../utils/dates.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils.js";
import { queries } from "../../collections/collections.js";

export function BrowseMediaHomeScoped() {
  const [browseTime, startBrowseTimer, stopBrowseTimer] = createTimer();
  const [browseData, setBrowseData] = createSignal(undefined, { equals: false });
  let browseFetcher, browseController;
  createEffect(() => {
    browseController?.abort();
    browseController = new AbortController();

    const dates = getDates();
    browseFetcher = createAnilistFetcher(queries.anilistBrowseMedia, {
      "type": "ANIME",
      "season": dates.season,
      "seasonYear": dates.seasonYear,
      "nextSeason": dates.nextSeason,
      "nextYear": dates.nextYear,
    }, browseController.signal);

    sendAnilistFetcher(browseFetcher, {
      name: "Anilist browse manga",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === browseFetcher.cacheKey) browseController = null;
      },
      onStart: startBrowseTimer,
      onStop: stopBrowseTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === browseFetcher.cacheKey) setBrowseData(res);
      }
    });
  });

  document.title = "Browse media - LOB";

  return (
    <>
    <p>{formatMSToString(browseTime())}</p>
    <Show when={browseData()}>
      <div class="browse-content">
        <HorizontalCardRowScoped data={browseData().data.data.trending.media} href="/search/media/trending" title="Trending anime and manga"/>
        <HorizontalCardRowScoped data={browseData().data.data.newAnime.media} href="/search/anime/new" title="Newly added anime"/>
        <HorizontalCardRowScoped data={browseData().data.data.newManga.media} href="/search/manga/new" title="Newly added manga"/>
        <HorizontalCardRowScoped data={browseData().data.data.finishedAnime.media} href="/search/anime/finished" title="Recently finished anime"/>
        <HorizontalCardRowScoped data={browseData().data.data.finishedManga.media} href="/search/manga/finished" title="Recently finished manga"/>
        <VerticalCardRowScoped data={browseData().data.data.top.media} type="media" href="/search/media/top-100" title="Top 100 anime and manga" />
      </div>
    </Show>
    </>
  );
}
