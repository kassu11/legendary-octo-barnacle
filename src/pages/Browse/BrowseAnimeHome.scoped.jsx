import {useAuthentication} from "../../context/providers.js";
import api from "../../utils/api.js";
import {Show} from "solid-js";
import {HorizontalCardRowScoped} from "./HorizontalCardRow.scoped.jsx";
import {VerticalCardRowScoped} from "./VerticalCardRow.scoped.jsx";

export function BrowseAnimeHome() {
  const {accessToken} = useAuthentication();
  const [animeData] = api.anilist.trendingAnime(accessToken);
  document.title = "Browse anime - LOB";

  return (
    <Show when={animeData()}>
      <div class="browse-content">
        <HorizontalCardRowScoped data={animeData().data.data.trending.media} href="/search/anime/trending"
                                 title="Trending now"/>
        <HorizontalCardRowScoped data={animeData().data.data.season.media} href="/search/anime/this-season?order=popularity"
                                 title="Popular this season"/>
        <HorizontalCardRowScoped data={animeData().data.data.nextSeason.media}
                                 href="/search/anime/next-season?order=popularity" title="Upcoming next season"/>
        <HorizontalCardRowScoped data={animeData().data.data.finished.media} href="/search/anime/finished"
                                 title="Recently finished"/>
        <HorizontalCardRowScoped data={animeData().data.data.popular.media} href="/search/anime/popular"
                                 title="All time popular"/>
        <VerticalCardRowScoped data={animeData().data.data.top.media} type="anime" href="/search/anime/top-100"
                               title="Top 100 anime"/>
      </div>
    </Show>
  );
}
