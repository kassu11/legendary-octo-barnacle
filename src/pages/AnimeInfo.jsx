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
  console.log(props.anime.characterPreview.edges[0]);

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
                      <p class={style.lineClamp}>{relation.node.title.userPreferred}</p>
                      <p class={style.format}>{relation.node.format} - {relation.node.status}</p>
                    </div>
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
          <div class={style.characterContainer}>
            <h2>Characters</h2>
            <ol>
              <For each={props.anime.characterPreview.edges}>{char => (
                <li class={style.character}>
                  <A href={"/ani/character/" + char.node.id} class={style.characterLeft}>
                    <img src={char.node.image.large} alt="Character" />
                    <div class={style.content}>
                      <p class={style.lineClamp}>{char.node.name.userPreferred}</p>
                      <p>{char.role}</p>
                    </div>
                  </A>
                  <Show when={char.voiceActors[0]}>{actor => (
                    <A href={"/ani/staff/" + actor().id} class={style.characterRight}>
                      <div class={style.content}>
                        <p class={style.lineClamp}>{actor().name.userPreferred}</p>
                        <p>{actor().language}</p>
                      </div>
                      <img src={actor().image.large} alt="Voice actor" />
                    </A>
                  )}</Show>
                </li>
              )}</For>
            </ol>
          </div>
        </div>
      </div>
    </>
  )

}


export default Anime
