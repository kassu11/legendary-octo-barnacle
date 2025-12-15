import {useAuthentication} from "../../context/providers.js";
import api from "../../utils/api.js";
import {Show} from "solid-js";
import {HorizontalCardRowScoped} from "./HorizontalCardRow.scoped.jsx";
import {VerticalCardRowScoped} from "./VerticalCardRow.scoped.jsx";
import "./BrowseMangaHome.scoped.css";

export function BrowseMangaHomeScoped() {
  const {accessToken} = useAuthentication();
  const [mangaData] = api.anilist.trendingManga(accessToken);
  document.title = "Browse manga - LOB";

  return (
    <Show when={mangaData()}>
      <div class="browse-content">
        <HorizontalCardRowScoped data={mangaData().data.data.trending.media} href="/search/manga/trending"
                                 title="Trending now"/>
        <HorizontalCardRowScoped data={mangaData().data.data.novel.media} href="/search/manga/novel"
                                 title="Popular light novels"/>
        <HorizontalCardRowScoped data={mangaData().data.data.manhwa.media} href="/search/manga/manhwa"
                                 title="Popular Manhwas"/>
        <HorizontalCardRowScoped data={mangaData().data.data.finishedManga.media} href="/search/manga/finished-manga"
                                 title="Recently finished mangas"/>
        <HorizontalCardRowScoped data={mangaData().data.data.finishedNovel.media} href="/search/manga/finished-novel"
                                 title="Recently finished light novels"/>
        <HorizontalCardRowScoped data={mangaData().data.data.popular.media} href="/search/manga/popular"
                                 title="All time popular"/>
        <VerticalCardRowScoped data={mangaData().data.data.top.media} type="manga" href="/search/manga/top-100"
                               title="Top 100 manga"/>
      </div>
    </Show>
  );
}
