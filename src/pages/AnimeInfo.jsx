import { useLocation, useParams } from "@solidjs/router";
import { A } from "../components/CustomA";
import api from "../utils/api";
import { Switch, Match, Show, createEffect, createSignal } from "solid-js";
import style from "./AnimeInfo.module.scss";
import { Markdown } from "../components/Markdown";
import { binaryMediaType } from "../utils/mediaTypes";
import { useAuthentication } from "../context/AuthenticationContext";
import Star from "../assets/Star.jsx";


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


  console.log(props.anime);

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
          <div class={style.mainScoreContainer}>
            <div class={style.scoresWrapper}>
              <div class={style.scoreBox}>
                <p class={style.scoreLabel}>Mean</p>
                <span class={style.scoreValue}>{((props.anime.meanScore || 0) / 10).toFixed(1)}</span>
              </div>
              <div class={style.scoreBox}>
                <p class={style.scoreLabel}>Average</p>
                <span class={style.scoreValue}>{((props.anime.averageScore || 0) / 10).toFixed(1)}</span>
              </div>
            </div>
            <div class={style.statsWrapper}>
              <div class={style.statColumn}>
                <p class={style.statRow}>
                  <span>Total Users</span>
                  <span>{Intl.NumberFormat("ja-JP").format(props.anime.stats.scoreDistribution.reduce((acc, v) => v.amount + acc, 0))}</span>
                </p>
                <p class={style.statRow}>
                  <span>Source</span>
                  <span>{props.anime.source}</span>
                </p>
                <p class={style.statRow}>
                  <span>Members</span>
                  <span>{Intl.NumberFormat("ja-JP").format(props.anime.popularity)}</span>
                </p>
              </div>
              <div class={style.statColumn}>
                <p class={style.statRow}>
                  <span>Episodes</span>
                  <span>{props.anime.episodes}</span>
                </p>
                <p class={style.statRow}>
                  <span>Season</span>
                  <span>{props.anime.season} {props.anime.seasonYear}</span>
                </p>
                <p class={style.statRow}>
                  <span>Format</span>
                  <span>{props.anime.format}</span>
                </p>
              </div>
            </div>
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

function Status(props) {
  return (
    <p>
      <Switch fallback={props.friend.status}>
        <Match when={props.friend.status === "COMPLETED"}>Completed</Match>
        <Match when={props.friend.status === "CURRENT"}>
          <Switch>
            <Match when={props.type === "anime"}>Watching</Match>
            <Match when={props.type === "manga"}>Reading</Match>
          </Switch>
        </Match>
        <Match when={props.friend.status === "DROPPED"}>Dropped</Match>
        <Match when={props.friend.status === "PAUSED"}>Paused</Match>
        <Match when={props.friend.status === "PLANNING"}>Planning</Match>
        <Match when={props.friend.status === "REPEATING"}>
          <Switch>
            <Match when={props.type === "anime"}>Rewatching</Match>
            <Match when={props.type === "manga"}>Rereading</Match>
          </Switch>
        </Match>
      </Switch>
      <Show when={props.friend.progress !== 0 && props.friend.progress !== props.media.episodes}>
        <Switch>
          <Match when={props.type === "anime"}> Ep {props.friend.progress}</Match>
          <Match when={props.type === "manga"}> Ch {props.friend.progress}</Match>
        </Switch>
      </Show>
    </p>
  );
}

function Score(props) {
  return (
    <Show when={props.score !== 0}>
      <div class={style.scoreContainer}>
        <Switch>
          <Match when={props.format === "POINT_10"}>{props.score}/10</Match>
          <Match when={props.format === "POINT_100"}>{props.score}/100</Match>
          <Match when={props.format === "POINT_10_DECIMAL"}>{props.score}/10</Match>
          <Match when={props.format === "POINT_5"}>{props.score}/5 <Star class={style.scoreStar} /></Match>
          <Match when={props.format === "POINT_3"}>
            <Switch>
              <Match when={props.score === 1}>😟</Match>
              <Match when={props.score === 2}>😐</Match>
              <Match when={props.score === 3}>😁</Match>
            </Switch>
          </Match>
        </Switch>
      </div>
    </Show>
  );
}


export default Anime
