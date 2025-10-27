import { A, Navigate, useLocation, useParams } from "@solidjs/router";
import api from "../../utils/api.js";
import { Show, For, Match, Switch } from "solid-js";
import "../Search/index.scss";
import { capitalize, formatMediaFormat, formatTitleToUrl, mediaUrl, numberCommas } from "../../utils/formating.js";
import Emoji from "../../assets/Emoji.jsx";
import { useAuthentication, useEditMediaEntries } from "../../context/providers.js";
import { asserts } from "../../collections/collections.js";
import { AnilistMediaCard } from "../../components/Cards.scoped.jsx";

export function BrowseRedirect(props) {
  const params = useParams();
  const location = useLocation();

  return (
    <Show when={!location.search} fallback={<Navigate href={"/search/" + params.type + location.search} />}>
      {props.children}
    </Show>
  );
}

export function BrowseMediaHome() {
  const { accessToken } = useAuthentication();
  const [homeData] = api.anilist.trendingMedia(accessToken);
  document.title = "Browse media - LOB";

  return (
    <Show when={homeData()}>
      <div class="search-home-content">
        <HorizontalCardRow data={homeData().data.data.trending.media} href="/search/media/trending" title="Trending anime and manga" />
        <HorizontalCardRow data={homeData().data.data.newAnime.media} href="/search/anime/new" title="Newly added anime" />
        <HorizontalCardRow data={homeData().data.data.newManga.media} href="/search/manga/new" title="Newly added manga" />
        <HorizontalCardRow data={homeData().data.data.finishedAnime.media} href="/search/anime/finished" title="Recently finished anime" />
        <HorizontalCardRow data={homeData().data.data.finishedManga.media} href="/search/manga/finished" title="Recently finished manga" />
        <VerticalCardRow data={homeData().data.data.top.media} type="media" href="/search/media/top-100" title="Top 100 anime and manga" />
      </div>
    </Show>
  );
}

export function BrowseAnimeHome() {
  const {accessToken} = useAuthentication();
  const [animeData] = api.anilist.trendingAnime(accessToken);
  document.title = "Browse anime - LOB";

  return (
    <Show when={animeData()}>
      <div class="search-home-content">
        <HorizontalCardRow data={animeData().data.data.trending.media} href="/search/anime/trending" title="Trending now" />
        <HorizontalCardRow data={animeData().data.data.season.media} href="/search/anime/this-season?order=popularity" title="Popular this season" />
        <HorizontalCardRow data={animeData().data.data.nextSeason.media} href="/search/anime/next-season?order=popularity" title="Upcoming next season" />
        <HorizontalCardRow data={animeData().data.data.finished.media} href="/search/anime/finished" title="Recently finished" />
        <HorizontalCardRow data={animeData().data.data.popular.media} href="/search/anime/popular" title="All time popular" />
        <VerticalCardRow data={animeData().data.data.top.media} type="anime" href="/search/anime/top-100" title="Top 100 anime" />
      </div>
    </Show>
  );
}

export function BrowseMangaHome() {
  const {accessToken} = useAuthentication();
  const [mangaData] = api.anilist.trendingManga(accessToken);
  document.title = "Browse manga - LOB";

  return (
    <Show when={mangaData()}>
      <div class="search-home-content">
        <HorizontalCardRow data={mangaData().data.data.trending.media} href="/search/manga/trending" title="Trending now" />
        <HorizontalCardRow data={mangaData().data.data.novel.media} href="/search/manga/novel" title="Popular light novels" />
        <HorizontalCardRow data={mangaData().data.data.manhwa.media} href="/search/manga/manhwa" title="Popular Manhwas" />
        <HorizontalCardRow data={mangaData().data.data.finishedManga.media} href="/search/manga/finished-manga" title="Recently finished mangas" />
        <HorizontalCardRow data={mangaData().data.data.finishedNovel.media} href="/search/manga/finished-novel" title="Recently finished light novels" />
        <HorizontalCardRow data={mangaData().data.data.popular.media} href="/search/manga/popular" title="All time popular" />
        <VerticalCardRow data={mangaData().data.data.top.media} type="manga" href="/search/manga/top-100" title="Top 100 manga" />
      </div>
    </Show>
  );
}



function VerticalCardRow(props) {
  asserts.assertTrue("href" in props, "Link is missing");
  asserts.isTypeString(props.type, "type");

  return (
    <section class="vertical-search-card-section">
      <A href={props.href} class="search-cards-header">
        <h2>{props.title}</h2>
        View all
      </A>
      <ol class="vertical-search-card-row">
        <For each={props.data}>
          {(card, i) => (
            <li class="vertical-search-card" style={{"--media-background-color": card.coverImage.color}}>
              <p class="ranking">
                #
                <span>{i() + 1}</span>
              </p>
              <div class="vertical-search-card-body">
                <A 
                  class="cover-container"
                  href={mediaUrl(card)}>
                  <img src={card.coverImage.large} class="cover" alt="Cover." />
                </A> 
                <div class="vertical-search-card-content clamp">
                  <A class="line-clamp" href={mediaUrl(card)}>
                    {card.title.userPreferred}
                  </A> 
                  <ol class="vertical-search-card-genre-list">
                    <For each={card.genres}>{genre => (
                      <li class="vertical-search-card-genre">
                        <A href={`/search${props.type ? ("/" + props.type) : ""}?genre=` + genre}>{genre}</A>
                      </li>
                    )}</For>
                  </ol>
                </div>
                <div class="vertical-search-card-info">
                  <div class="vertical-search-card-score">
                    <Emoji score={card.averageScore} />
                    <div class="clamp">
                      <p>{card.averageScore}%</p>
                      <p>{numberCommas(card.popularity)} users</p>
                    </div>
                  </div>
                  <div class="clamp">
                    <p>{formatMediaFormat(card.format)}</p>
                    <p>
                      <Switch>
                        <Match when={card.type === "ANIME"}>
                          <Show when={card.episodes} fallback="Ongoing">
                            {numberCommas(card.episodes)} Episode
                            <Show when={card.episodes > 1}>s</Show>
                          </Show>
                        </Match>
                        <Match when={card.type === "MANGA"}>
                          <Show when={card.chapters} fallback="Ongoing">
                            {numberCommas(card.chapters)} Chapter
                            <Show when={card.chapters > 1}>s</Show>
                          </Show>
                        </Match>
                      </Switch>
                    </p>
                  </div>
                  <div class="clamp">
                    <p>{capitalize(card.season)} {card.seasonYear}</p>
                    <p>{capitalize(card.status)}</p>
                  </div>
                </div>
              </div>
            </li>
          )}
        </For>
      </ol>
    </section>
  );
}

function HorizontalCardRow(props) {
  asserts.assertTrue("href" in props, "Link is missing");

  return (
    <section class="horizontal-search-card-section">
      <A href={props.href} class="search-cards-header">
        <h2>{props.title}</h2>
        <span>View all</span>
      </A>
      <ol class="grid-reel-auto-fill">
        <For each={props.data}>{media => (
          <AnilistMediaCard media={media} />
        )}</For>
      </ol>
    </section>
  );
}

