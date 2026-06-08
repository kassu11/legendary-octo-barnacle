import { createEffect, createSignal, Show } from "solid-js";
import { HorizontalCardRowScoped } from "./HorizontalCardRow.scoped.jsx";
import { VerticalCardRowScoped } from "./VerticalCardRow.scoped.jsx";
import "./BrowseMangaHome.scoped.css";
import { queries } from "../../collections/collections.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils.js";
import { createTimer, formatMSToString } from "../../utils/timeUtils.js";
import { getDates } from "../../utils/dates.js";

export function BrowseMangaHomeScoped() {
  const [browseTime, startBrowseTimer, stopBrowseTimer] = createTimer();
  const [browseData, setBrowseData] = createSignal(undefined, { equals: false });
  let browseFetcher, browseController;
  createEffect(() => {
    browseController?.abort();
    browseController = new AbortController();

    const dates = getDates();
    browseFetcher = createAnilistFetcher(queries.anilistBrowseManga, {
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

  document.title = "Browse manga - LOB";

  return (
    <>
      <p>{formatMSToString(browseTime())}</p>
      <Show when={browseData()}>
        <div class="browse-content">
          <HorizontalCardRowScoped data={browseData().data.data.trending.media} href="/search/manga/trending" title="Trending now" />
          <HorizontalCardRowScoped data={browseData().data.data.novel.media} href="/search/manga/novel" title="Popular light novels" />
          <HorizontalCardRowScoped data={browseData().data.data.manhwa.media} href="/search/manga/manhwa" title="Popular Manhwas" />
          <HorizontalCardRowScoped data={browseData().data.data.finishedManga.media} href="/search/manga/finished-manga" title="Recently finished mangas" />
          <HorizontalCardRowScoped data={browseData().data.data.finishedNovel.media} href="/search/manga/finished-novel" title="Recently finished light novels" />
          <HorizontalCardRowScoped data={browseData().data.data.popular.media} href="/search/manga/popular" title="All time popular" />
          <VerticalCardRowScoped data={browseData().data.data.top.media} type="manga" href="/search/manga/top-100" title="Top 100 manga" />
        </div>
      </Show>
    </>
  );
}
