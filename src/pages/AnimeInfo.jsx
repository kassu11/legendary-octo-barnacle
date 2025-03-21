import { useLocation, useParams } from "@solidjs/router";
import { A } from "../components/CustomA";
import api from "../utils/api";
import { Switch, Match, Show, createEffect, createSignal } from "solid-js";
import style from "./AnimeInfo.module.scss";
import { Markdown } from "../components/Markdown";
import { binaryMediaType } from "../utils/mediaTypes";
import { useAuthentication } from "../context/AuthenticationContext";


function Anime() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [id, setId]= createSignal(Number(params.id));

  console.assert(!Number.isNaN(id()), "ID should not be NaN");
  const [animeData] = api.anilist.mediaId(id, accessToken);

  createEffect(() => {
    setId(Number(params.id))
  });

  return (
    <>
      <Show when={animeData.loading}>
        <p>Loading...</p>
      </Show>
      <Switch>
        <Match when={animeData.error}>
          <span>Error: {animeData.error}</span>
        </Match>
        <Match when={animeData()}>
          <AnimeInfo anime={animeData().data.data.Media}></AnimeInfo>
        </Match>
      </Switch>
    </>
  )
}

function Banner(props) {
  return (
    <Show when={props.src}>
      <div class={style.banner}>
        <img src={props.src} alt="Banner" />
      </div>
    </Show>
  );
}

function AnimeInfo(props) {
  console.assert(props.data, "Data missing");
  console.assert(props.data?.id, "Id missing");


  console.log(props.anime.type);
  console.log(props.anime.relations.edges[0]);

  return (
    <>
      <Banner src={props.anime.bannerImage}></Banner>
      <div class={style.container}>
        <div class={style.left}>
          <img src={props.anime.coverImage.large} alt="Cover" class={style.cover} />
          <div class={style.rankingContainer}>
            <h2>Ranking</h2>
            <ul>
            <For each={props.anime.rankings}>{ranking => (
              <li class={style.ranking}>#{ranking.rank} {ranking.context} {ranking.season} {ranking.year}</li>
            )}</For>
            </ul>
          </div>
          <div class={style.genreContainer}>
            <h2>Genres</h2>
            <ul>
              <For each={props.anime.genres}>{genre => (
                <li class={style.genre}>{genre}</li>
              )}</For>
            </ul>
          </div>
          <div class={style.tagContainer}>
            <h2>Tags</h2>
            <ol>
              <For each={props.anime.tags}>{tag => (
                <li 
                  classList={{[style.tag]: true, [style.spoiler]: tag.isMediaSpoiler || tag.isGeneralSpoiler}} 
                  title={tag.description}>{tag.name} <span>{tag.rank}%</span></li>
              )}</For>
            </ol>
          </div>
        </div>
        <div class={style.main}>
          <div>
            mean score
            {(props.anime.meanScore || 0) / 10}
          </div>
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
                    href={"/" + binaryMediaType(relation.node.type) + "/" + relation.node.id + "/" + relation.node.title.userPreferred}
                    class={style.relation}
                  >
                    <img src={relation.node.coverImage.large} alt="Cover" />
                    <div class={style.content}>
                      <p class={style.type}>{relation.relationType}</p>
                      <p class={style.title}>{relation.node.title.userPreferred}</p>
                      <p class={style.format}>{relation.node.format} - {relation.node.status}</p>
                    </div>
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
          <div>
            <For each={props.anime.characterPreview.edges}>{char => (
              <div>
                <A href={"/ani/character/" + char.node.id}>
                  <span>{char.node.name.userPreferred}</span><br />
                  <img src={char.node.image.large} alt="character" /><br />
                </A>
                <For each={char.voiceActors}>{actor => (
                  <A href={"/ani/staff/" + actor.id}>
                    <span>{actor.name.userPreferred}</span><br />
                    <img src={actor.image.large} alt="character" /><br />
                  </A>
                )}</For>
              </div>
            )}</For>
          </div>
        </div>
      </div>
      {/* <ul> */}
      {/*   <li> */}
      {/*     <b>Banner:</b> */}
      {/*     <img src={props.anime.bannerImage} alt="Banner" /> */}
      {/*   </li> */}
      {/*   <li><b>Title EN:</b> {props.anime.title.english}</li> */}
      {/*   <li><b>Title native:</b> {props.anime.title.native}</li> */}
      {/*   <li><b>Title romaji:</b> {props.anime.title.romaji}</li> */}
      {/*   <li><a target="_blank" href={`https://myanimelist.net/anime/${props.anime.idMal}/`}>MyAnimeList</a></li> */}
      {/*   <li><a target="_blank" href={`https://anilist.co/anime/${props.anime.id}/`}>AniList</a></li> */}
      {/*   <li> */}
      {/*     <b>Cover:</b> */}
      {/*     <img src={props.anime.coverImage.large} alt="Cover" /> */}
      {/*   </li> */}
      {/*   <li><b>Description:</b> {props.anime.description}</li> */}
      {/*   <li><b>Type:</b> {props.anime.type}</li> */}
      {/*   <li><b>Season:</b> {props.anime.season}</li> */}
      {/*   <li><b>SeasonYear:</b> {props.anime.seasonYear}</li> */}
      {/*   <li><b>status:</b> {props.anime.status}</li> */}
      {/*   <li><b>format:</b> {props.anime.format}</li> */}
      {/*   <li><b>date:</b> {JSON.stringify(props.anime.startDate)}</li> */}
      {/*   <li><b>Mean Score:</b> {props.anime.meanScore / 10}</li> */}
      {/*   <li><b>Average Score:</b> {props.anime.averageScore / 10}</li> */}
      {/*   <li> */}
      {/*     <b><A href={"characters"}>Characters:</A></b> */}
      {/*     <For each={props.anime.characterPreview.edges}>{char => ( */}
      {/*       <div> */}
      {/*         <A href={"/ani/character/" + char.node.id}> */}
      {/*           <span>{char.node.name.userPreferred}</span><br /> */}
      {/*           <img src={char.node.image.large} alt="character" /><br /> */}
      {/*         </A> */}
      {/*         <For each={char.voiceActors}>{actor => ( */}
      {/*           <A href={"/ani/staff/" + actor.id}> */}
      {/*             <span>{actor.name.userPreferred}</span><br /> */}
      {/*             <img src={actor.image.large} alt="character" /><br /> */}
      {/*           </A> */}
      {/*         )}</For> */}
      {/*       </div> */}
      {/*     )}</For> */}
      {/*   </li> */}
      {/* </ul> */}
    </>
  )

}


export default Anime
