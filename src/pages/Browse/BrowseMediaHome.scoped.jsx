import {useAuthentication} from "../../context/providers.js";
import api from "../../utils/api.js";
import {Show} from "solid-js";
import {HorizontalCardRowScoped} from "./HorizontalCardRow.scoped.jsx";
import {VerticalCardRowScoped} from "./VerticalCardRow.scoped.jsx";

export function BrowseMediaHomeScoped() {
  const {accessToken} = useAuthentication();
  const [homeData] = api.anilist.trendingMedia(accessToken);
  document.title = "Browse media - LOB";

  return (
    <Show when={homeData()}>
      <div class="browse-content">
        <HorizontalCardRowScoped data={homeData().data.data.trending.media} href="/search/media/trending"
                                 title="Trending anime and manga"/>
        <HorizontalCardRowScoped data={homeData().data.data.newAnime.media} href="/search/anime/new"
                                 title="Newly added anime"/>
        <HorizontalCardRowScoped data={homeData().data.data.newManga.media} href="/search/manga/new"
                                 title="Newly added manga"/>
        <HorizontalCardRowScoped data={homeData().data.data.finishedAnime.media} href="/search/anime/finished"
                                 title="Recently finished anime"/>
        <HorizontalCardRowScoped data={homeData().data.data.finishedManga.media} href="/search/manga/finished"
                                 title="Recently finished manga"/>
        <VerticalCardRowScoped data={homeData().data.data.top.media} type="media" href="/search/media/top-100"
                               title="Top 100 anime and manga"/>
      </div>
    </Show>
  );
}
