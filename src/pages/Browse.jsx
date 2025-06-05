import { A, Navigate, useLocation, useParams } from "@solidjs/router";
import api from "../utils/api";
import { Show, For, Match, Switch } from "solid-js";
import { useAuthentication } from "../context/AuthenticationContext";
import { assert } from "../utils/assert";
import "./Search.scss";
import { capitalize, formatMediaFormat, formatTitleToUrl, numberCommas } from "../utils/formating";
import Emoji from "../assets/Emoji";
import { useEditMediaEntries } from "../context/providers";

export function BrowseRedirect(props) {
  const params = useParams();
  const location = useLocation();

  console.log("test")
  return (
    <Show when={!location.search} fallback={<Navigate href={"/search/" + params.type + location.search} />}>
      {props.children}
    </Show>
  );
}

export function BrowseMediaHome() {
  const { accessToken } = useAuthentication();
  const [homeData] = api.anilist.trendingMedia(accessToken);

  return (
    <Show when={homeData()}>
      <div>{console.log("Search Home Data:", homeData())}</div>
      <div class="search-home-content">
        <HorizontalCardRow data={homeData().data.data.trending.media} href="/search/media/trending" title="Trending anime and manga" />
        <HorizontalCardRow data={homeData().data.data.newAnime.media} href="/search/anime/new" title="Newly added anime" />
        <HorizontalCardRow data={homeData().data.data.newManga.media} href="/search/manga/new" title="Newly added manga" />
        <HorizontalCardRow data={homeData().data.data.finishedAnime.media} href="/search/anime/finished" title="Recently finished anime" />
        <HorizontalCardRow data={homeData().data.data.finishedManga.media} href="/search/manga/finished" title="Recently finished manga" />
        <VerticalCardRow data={homeData().data.data.top.media} href="/search/media/top-100" title="Top 100 anime and manga" />
      </div>
    </Show>
  );
}

export function BrowseAnimeHome() {
  const {accessToken} = useAuthentication();
  const [animeData] = api.anilist.trendingAnime(accessToken);

  return (
    <Show when={animeData()}>
      <div class="search-home-content">
        <HorizontalCardRow data={animeData().data.data.trending.media} href="/search/anime/trending" title="Trending now" />
        <HorizontalCardRow data={animeData().data.data.season.media} href="/search/anime/this-season" title="Popular this season" />
        <HorizontalCardRow data={animeData().data.data.nextSeason.media} href="/search/anime/next-season" title="Upcoming next season" />
        <HorizontalCardRow data={animeData().data.data.finished.media} href="/search/anime/finished" title="Recently finished" />
        <HorizontalCardRow data={animeData().data.data.popular.media} href="/search/anime/popular" title="All time popular" />
        <VerticalCardRow data={animeData().data.data.top.media} type="manga" href="/search/anime/top-100" title="Top 100 anime" />
      </div>
    </Show>
  );
}

export function BrowseMangaHome() {
  const {accessToken} = useAuthentication();
  const [mangaData] = api.anilist.trendingManga(accessToken);

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
  assert("href" in props, "Link is missing");

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
                  href={"/" + card.type.toLowerCase() +  "/" + card.id + "/" + formatTitleToUrl(card.title.userPreferred)}>
                  <img src={card.coverImage.large} class="cover" alt="Cover." />
                </A> 
                <div class="vertical-search-card-content clamp">
                  <A class="line-clamp" href={"/" + card.type.toLowerCase() +  "/" + card.id + "/" + formatTitleToUrl(card.title.userPreferred)}>
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
  assert("href" in props, "Link is missing");

  return (
    <section class="horizontal-search-card-section">
      <A href={props.href} class="search-cards-header">
        <h2>{props.title}</h2>
        <span>View all</span>
      </A>
      <ol class="horizontal-search-card-row">
        <For each={props.data}>{card => (
          <Card card={card} />
        )}</For>
      </ol>
    </section>
  );
}



function Card(props) {
  const { openEditor } = useEditMediaEntries();
  const { accessToken } = useAuthentication();

  return ( 
    <li class="horizontal-search-card">
      <A href={"/" + props.card.type.toLowerCase() +  "/" + props.card.id + "/" + formatTitleToUrl(props.card.title.userPreferred)}>
        <div class="container">
          <img src={props.card.coverImage.large} class="cover" alt="Cover." />
          <div class="search-card-quick-action">
            <ul class="search-card-quick-action-items">
              <li class="item" label="Edit media">
                <button onClick={e => {
                  e.preventDefault();
                  openEditor(props.card);
                }}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg>
                </button>
              </li>
              <li class="item" label="Set to planning">
                <button onClick={e => {
                  e.preventDefault();
                  api.anilist.mutateMedia(accessToken(), { mediaId: props.card.id, status: "PLANNING" });
                }}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path></svg>
                </button>
              </li>
              <li class="item" label="Set to watching">
                <button onClick={e => {
                  e.preventDefault();
                  api.anilist.mutateMedia(accessToken(), { mediaId: props.card.id, status: "CURRENT" });
                }}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>
                </button>
              </li>
              <li class="item" label="Set to completed">
                <button onClick={e => {
                  e.preventDefault();
                  api.anilist.mutateMedia(accessToken(), { mediaId: props.card.id, status: "COMPLETED" });
                }}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                </button>
              </li>
              <li class="item" label="Set to rewatching">
                <button onClick={e => {
                  e.preventDefault();
                  api.anilist.mutateMedia(accessToken(), { mediaId: props.card.id, status: "REPEAT" });
                }}>
                  <svg  viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M5.23331,0.493645 C6.8801,-0.113331 8.6808,-0.161915 10.3579,0.355379 C11.5179,0.713177 12.5743,1.32796 13.4526,2.14597 L14.2929,1.30564 C14.9229,0.675676 16,1.12184 16,2.01275 L16,6.00002 L12.0127,6.00002 C11.1218,6.00002 10.6757,4.92288 11.3056,4.29291 L12.0372,3.56137 C11.389,2.97184 10.6156,2.52782 9.76845,2.26653 C8.5106,1.87856 7.16008,1.915 5.92498,2.37023 C4.68989,2.82547 3.63877,3.67423 2.93361,4.78573 C2.22844,5.89723 1.90836,7.20978 2.02268,8.52112 C2.13701,9.83246 2.6794,11.0698 3.56627,12.0425 C4.45315,13.0152 5.63528,13.6693 6.93052,13.9039 C8.22576,14.1385 9.56221,13.9407 10.7339,13.3409 C11.9057,12.7412 12.8476,11.7727 13.4147,10.5848 C13.6526,10.0864 14.2495,9.8752 14.748,10.1131 C15.2464,10.351 15.4575,10.948 15.2196,11.4464 C14.4635,13.0302 13.2076,14.3215 11.6453,15.1213 C10.0829,15.921 8.30101,16.1847 6.57402,15.8719 C4.84704,15.559 3.27086,14.687 2.08836,13.39 C0.905861,12.0931 0.182675,10.4433 0.0302394,8.69483 C-0.122195,6.94637 0.304581,5.1963 1.2448,3.7143 C2.18503,2.2323 3.58652,1.10062 5.23331,0.493645 Z"/>
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <p class="line-clamp">
          <Show when={props.card.mediaListEntry?.status}>
            <div class="list-status" attr:data-status={props.card.mediaListEntry.status}></div>
          </Show>
          {props.card.title.userPreferred}
        </p>
      </A> 
    </li>
  );
}
