import { useParams } from "@solidjs/router";
import { Switch, Match } from "solid-js";
import { HorizontalCardRowScoped } from "../Browse/HorizontalCardRow.scoped";
import { VerticalCardRowScoped } from "../Browse/VerticalCardRow.scoped";
import "./BrowsePage.scoped.css";


export function BrowsePage(props) {
  const params = useParams();

  return (
    <div class="browse-page">
      <p class="time">{props.time}</p>
      <Switch>
        <Match when={params.type === "anime"}>
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.trending?.media} loading={props.loading} href="/ani/search/anime/trending" title="Trending Now" />
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.season?.media} loading={props.loading} href="/ani/search/anime/this-season" title="Popular This Season" />
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.nextSeason?.media} loading={props.loading} href="/ani/search/anime/next-season" title="Upcoming Next Season" />
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.finished?.media} loading={props.loading} href="/ani/search/anime/finished" title="Recently Finished" />
          <HorizontalCardRowScoped data={props.cards?.season && props.cards?.popular?.media} loading={props.loading} href="/ani/search/anime/popular" title="All Time Popular" />
          <VerticalCardRowScoped data={props.cards?.season && props.cards?.top?.media} type="anime" href="/ani/search/anime/top" title="Top 100 Anime" />
        </Match>
        <Match when={params.type === "manga"}>
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.trending?.media} loading={props.loading} href="/ani/search/manga/trending" title="Trending Now" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.novel?.media} loading={props.loading} href="/ani/search/manga/novel" title="Popular Light Lovels" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.manhwa?.media} loading={props.loading} href="/ani/search/manga/manhwa" title="Popular Manhwas" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.finishedManga?.media} loading={props.loading} href="/ani/search/manga/finished-manga" title="Recently Finished Mangas" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.finishedNovel?.media} loading={props.loading} href="/ani/search/manga/finished-novel" title="Recently Finished Light Novels" />
          <HorizontalCardRowScoped data={props.cards?.novel && props.cards?.popular?.media} loading={props.loading} href="/ani/search/manga/popular" title="All Time Popular" />
          <VerticalCardRowScoped data={props.cards?.novel && props.cards?.top?.media} type="manga" href="/ani/search/manga/top" title="Top 100 Manga" />
        </Match>
        <Match when={params.type === "media"}>
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.trending?.media} loading={props.loading} href="/ani/search/media/trending" title="Trending Anime and Manga" />
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.newAnime?.media} loading={props.loading} href="/ani/search/anime/new" title="Newly Added Anime" />
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.newManga?.media} loading={props.loading} href="/ani/search/manga/new" title="Newly Added Manga" />
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.finishedAnime?.media} loading={props.loading} href="/ani/search/anime/finished" title="Recently Finished Anime" />
          <HorizontalCardRowScoped data={props.cards?.newAnime && props.cards?.finishedManga?.media} loading={props.loading} href="/ani/search/manga/finished" title="Recently Finished Manga" />
          <VerticalCardRowScoped data={props.cards?.newAnime && props.cards?.top?.media} type="media" href="/ani/search/media/top" title="Top 100 Anime And Manga" />
        </Match>
      </Switch>
    </div>
  );
}

