import { createEffect, createSignal, Show } from "solid-js";
import { HorizontalCardRowScoped } from "./HorizontalCardRow.scoped.jsx";
import { VerticalCardRowScoped } from "./VerticalCardRow.scoped.jsx";
import "./BrowseAnimeHome.scoped.css";
import { createTimer, formatMSToString } from "../../utils/timeUtils.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils.js";
import { queries } from "../../collections/collections.js";
import { getDates } from "../../utils/dates.js";

export function BrowseAnimeHome() {
  const [browseTime, startBrowseTimer, stopBrowseTimer] = createTimer();
  const [browseData, setBrowseData] = createSignal(undefined, { equals: false });
  let browseFetcher, browseController;
  createEffect(() => {
    browseController?.abort();
    browseController = new AbortController();

    const dates = getDates();
    browseFetcher = createAnilistFetcher(queries.anilistBrowseAnime, { 
      "type": "ANIME",
      "season": dates.season,
      "seasonYear": dates.seasonYear,
      "nextSeason": dates.nextSeason,
      "nextYear": dates.nextYear,
    }, browseController.signal);

    sendAnilistFetcher(browseFetcher, {
      name: "Anilist browse anime",
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

  document.title = "Browse anime - LOB";

  return (
    <>
      <p>{formatMSToString(browseTime())}</p>
      <Show when={browseData()}>
        <div class="browse-content">
          <HorizontalCardRowScoped data={browseData().data.data.trending.media} href="/search/anime/trending" title="Trending now" />
          <HorizontalCardRowScoped data={browseData().data.data.season.media} href="/search/anime/this-season?order=popularity" title="Popular this season" />
          <HorizontalCardRowScoped data={browseData().data.data.nextSeason.media} href="/search/anime/next-season?order=popularity" title="Upcoming next season" />
          <HorizontalCardRowScoped data={browseData().data.data.finished.media} href="/search/anime/finished" title="Recently finished" />
          <HorizontalCardRowScoped data={browseData().data.data.popular.media} href="/search/anime/popular" title="All time popular" />
          <VerticalCardRowScoped data={browseData().data.data.top.media} type="anime" href="/search/anime/top-100" title="Top 100 anime" />
        </div>
      </Show>
    </>
  );
}
