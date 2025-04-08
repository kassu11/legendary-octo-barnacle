import { useParams } from "@solidjs/router";
import { A } from "../components/CustomA";
import api from "../utils/api";
import { Show, createEffect, createSignal } from "solid-js";
import style from "./AnimeInfo.module.scss";
import { Markdown } from "../components/Markdown";
import { useAuthentication } from "../context/AuthenticationContext";
import Banner from "../components/media/Banner";
import ExternalLinks from "../components/media/ExternalLinks.jsx";
import ExtraInfo from "../components/media/ExtraInfo.jsx";
import Rankings from "../components/media/Rankings";
import Genres from "../components/media/Genres";
import Tags from "../components/media/Tags";
import Header from "../components/media/Header";
import Characters from "../components/media/Characters";
import Friends from "../components/media/Friends";
import { assert } from "../utils/assert.js";
import { useEditMediaEntries } from "../context/EditMediaEntriesContext.jsx";
import { formatTitleToUrl } from "../utils/formating.js";
import { FavouriteToggle } from "../components/FavouriteToggle.jsx";


function Manga() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [mangaData, { mutateCache: setMangaData }] = api.anilist.mediaId(() => params.id, accessToken);
  const [friendScoreData] = api.anilist.friendsMediaScore(accessToken, () => params.id, {page: 1, perPage: 8});

  return (
    <Show when={mangaData()}>
      <MangaInfo media={mangaData().data.data.Media} setMangaData={setMangaData} friend={friendScoreData()?.data.data.Page} />
    </Show>
  )
}

function MangaInfo(props) {
  assert(props.media, "Data missing");
  assert(props.media?.id, "Id missing");

  const [malData] = api.myAnimeList.mangaById(() => (props.media?.idMal ?? undefined));
  const { accessToken } = useAuthentication();
  const { openEditor } = useEditMediaEntries();
  const [isFavourite, setIsFavourite] = createSignal(props.media?.isFavourite ?? false);
  
  createEffect(() => {
    setIsFavourite(props.media?.isFavourite ?? false);
  });

  return (
    <>
      <Banner src={props.media.bannerImage} />
      <div class={style.container}>
        <div class={style.left}>
          <img src={props.media.coverImage.large} alt="Cover" class={style.cover} />
          <Show when={accessToken()}>
            <button onClick={() => {
              openEditor(
                { id: props.media.id }, 
                {
                  setIsFavourite: (isFavourite) => {
                    setIsFavourite(isFavourite);
                    props.setMangaData(v => {
                      v.data.data.Media.isFavourite = isFavourite;
                      return v;
                    });
                  }
                }
              );
            }}>{props.media.mediaListEntry?.status || "Edit"}</button>
            <FavouriteToggle 
              checked={isFavourite()} 
              onChange={setIsFavourite} 
              mangaId={props.media.id}
              mutateCache={(isFavourite) => props.setMangaData(v => {
                v.data.data.Media.isFavourite = isFavourite;
                return v;
              })} />
          </Show>
          <Show when={props.media.idMal}>
            <Show when={malData()} fallback={<p>MAL score: loading</p>}>
              <p>MAL score: {malData().data.data.score}</p>
            </Show>
          </Show>
          <ExternalLinks media={props.media}/>
          <ExtraInfo media={props.media}/>
          <Rankings rankings={props.media.rankings} />
          <Genres genres={props.media.genres} />
          <Tags tags={props.media.tags} />
        </div>
        <div class={style.main}>
          <Header 
            averageScore={props.media.averageScore} 
            favourites={props.media.favourites}
            format={props.media.format}
            meanScore={props.media.meanScore} 
            popularity={props.media.popularity}
            season={props.media.season}
            seasonYear={props.media.seasonYear}
            source={props.media.source}
            ratingUsers={props.media.stats.scoreDistribution.reduce((acc, v) => v.amount + acc, 0)}
            stats={props.media.stats}
            status={props.media.status}
          />
          <div>
            <h1>{props.media.title.userPreferred}</h1>
            <Markdown children={props.media.description}/>
          </div>
          <div class={style.relationContainer}>
            <h2>Relations</h2>
            <ol>
              <For each={props.media.relations.edges}>{relation => (
                <li>
                  <A 
                    href={"/" + relation.node.type.toLowerCase() + "/" + relation.node.id + "/" + formatTitleToUrl(relation.node.title.userPreferred)}
                    class={style.relation}
                  >
                    <img src={relation.node.coverImage.large} alt="Cover" />
                    <div class={style.content}>
                      <p class={style.type}>{relation.relationType}</p>
                      <p class={style.lineClamp}>{relation.node.title.userPreferred}</p>
                      <p class={style.format}>{relation.node.format} - {relation.node.status}</p>
                    </div>
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
          <Characters characters={props.media.characterPreview.edges} />
          <Friends friend={props.friend} media={props.media} type={props.media.type} />
        </div>
      </div>
    </>
  )
}

export default Manga

