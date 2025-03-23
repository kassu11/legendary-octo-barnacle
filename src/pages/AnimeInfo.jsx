import { useParams } from "@solidjs/router";
import { A } from "../components/CustomA";
import api from "../utils/api";
import { Switch, Match, Show, createEffect, createSignal } from "solid-js";
import style from "./AnimeInfo.module.scss";
import { Markdown } from "../components/Markdown";
import { binaryMediaType } from "../utils/mediaTypes";
import { useAuthentication } from "../context/AuthenticationContext";
import Banner from "../components/media/Banner";
import Rankings from "../components/media/Rankings";
import Genres from "../components/media/Genres";
import Tags from "../components/media/Tags";
import Header from "../components/media/Header";
import Score from "../components/media/Score";
import Status from "../components/media/Status";
import Characters from "../components/media/Characters";


function Anime() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [id, setId]= createSignal(Number(params.id));

  console.assert(!Number.isNaN(id()), "ID should not be NaN");
  const [animeData] = api.anilist.mediaId(id, accessToken);
  const [friendScoreData] = api.anilist.friendsMediaScore(accessToken, id, {page: 1, perPage: 8});

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
          <AnimeInfo anime={animeData().data.data.Media} friend={friendScoreData()?.data.data.Page}></AnimeInfo>
        </Match>
      </Switch>
    </>
  )
}

function AnimeInfo(props) {
  console.assert(props.data, "Data missing");
  console.assert(props.data?.id, "Id missing");


  console.log(props.anime);

  return (
    <>
      <Banner src={props.anime.bannerImage} />
      <div class={style.container}>
        <div class={style.left}>
          <img src={props.anime.coverImage.large} alt="Cover" class={style.cover} />
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
          <Characters characters={props.anime.characterPreview.edges} />
          <Show when={props.friend}>
            <div class={style.friendContainer}>
              <ul>
                <For each={props.friend.mediaList}>{friend => (
                  <li class={style.friend}>
                    <img src={friend.user.avatar.large} alt="User profile" />
                    <p>{friend.user.name}</p>
                    <Status friend={friend} media={props.anime} type="anime" />
                    <Score format={friend.user.mediaListOptions.scoreFormat} score={friend.score} />
                  </li>
                )}</For>
              </ul>
            </div>
          </Show>
        </div>
      </div>
    </>
  )
}

export default Anime
