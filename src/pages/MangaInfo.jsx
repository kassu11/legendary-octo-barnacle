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
      <MangaInfo anime={mangaData().data.data.Media} setMangaData={setMangaData} friend={friendScoreData()?.data.data.Page}></MangaInfo>
    </Show>
  )
}

function MangaInfo(props) {
  assert(props.anime, "Data missing");
  assert(props.anime?.id, "Id missing");

  const [malData] = api.myAnimeList.mangaById(() => props.anime?.idMal);
  const { accessToken } = useAuthentication();
  const { openEditor } = useEditMediaEntries();
  const [isFavourite, setIsFavourite] = createSignal(props.anime?.isFavourite ?? false);
  
  createEffect(() => {
    console.log(malData());
  })

  createEffect(() => {
    setIsFavourite(props.anime?.isFavourite ?? false);
  });

  console.log(props.anime);

  return (
    <>
      <Banner src={props.anime.bannerImage} />
      <div class={style.container}>
        <div class={style.left}>
          <img src={props.anime.coverImage.large} alt="Cover" class={style.cover} />
          <Show when={accessToken()}>
            <button onClick={() => {
              openEditor(
                { id: props.anime.id }, 
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
            }}>{props.anime.mediaListEntry?.status || "Edit"}</button>
            <FavouriteToggle 
              checked={isFavourite()} 
              onChange={setIsFavourite} 
              mangaId={props.anime.id}
              mutateCache={(isFavourite) => props.setMangaData(v => {
                v.data.data.Media.isFavourite = isFavourite;
                return v;
              })} />
          </Show>
          <Show when={props.anime.idMal}>
            {console.log("ID", props.anime.idMal, malData())}
            <Show when={malData()} fallback={<p>MAL score: loading</p>}>
              <p>MAL score: {malData().data.data.score}</p>
            </Show>
          </Show>
          <ExternalLinks media={props.anime}/>
          <ExtraInfo media={props.anime}/>
          <Rankings rankings={props.anime.rankings} />
          <Genres genres={props.anime.genres} />
          <Tags tags={props.anime.tags} />
        </div>
        <div class={style.main}>
          <Header 
            averageScore={props.anime.averageScore} 
            favourites={props.anime.favourites}
            format={props.anime.format}
            meanScore={props.anime.meanScore} 
            popularity={props.anime.popularity}
            season={props.anime.season}
            seasonYear={props.anime.seasonYear}
            source={props.anime.source}
            ratingUsers={props.anime.stats.scoreDistribution.reduce((acc, v) => v.amount + acc, 0)}
            stats={props.anime.stats}
            status={props.anime.status}
          />
          <div>
            <h1>{props.anime.title.userPreferred}</h1>
            <Markdown children={props.anime.description}/>
          </div>
          <div class={style.relationContainer}>
            <h2>Relations</h2>
            <ol>
              <For each={props.anime.relations.edges}>{relation => (
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
          <Characters characters={props.anime.characterPreview.edges} />
          <Friends friend={props.friend} media={props.anime} type="anime" />
        </div>
      </div>
    </>
  )
}

export default Manga

