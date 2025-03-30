import { useParams } from "@solidjs/router";
import { A } from "../components/CustomA";
import api from "../utils/api";
import { Show, createEffect, createSignal } from "solid-js";
import style from "./AnimeInfo.module.scss";
import { Markdown } from "../components/Markdown";
import { useAuthentication } from "../context/AuthenticationContext";
import Banner from "../components/media/Banner";
import ExternalLinks from "../components/media/ExternalLinks.jsx";
import Rankings from "../components/media/Rankings";
import Genres from "../components/media/Genres";
import Tags from "../components/media/Tags";
import Header from "../components/media/Header";
import Characters from "../components/media/Characters";
import Friends from "../components/media/Friends";
import AnimeThemes from "../components/media/AnimeThemes.jsx";
import { assert } from "../utils/assert.js";
import { useEditMediaEntries } from "../context/EditMediaEntriesContext.jsx";
import { formatAnilistDate, formatTitleToUrl } from "../utils/formating.js";


function Anime() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [id, setId]= createSignal(Number(params.id));

  assert(!Number.isNaN(id()), "ID should not be NaN");
  const [animeData] = api.anilist.mediaId(id, accessToken);
  const [friendScoreData] = api.anilist.friendsMediaScore(accessToken, id, {page: 1, perPage: 8});
  const [themeData] = api.animeThemes.themesByAniListId(id);

  createEffect(() => {
    setId(Number(params.id))
  });

  return (
    <Show when={animeData()}>
      <AnimeInfo anime={animeData().data.data.Media} theme={themeData()?.data.anime[0]} friend={friendScoreData()?.data.data.Page}></AnimeInfo>
    </Show>
  )
}

function AnimeInfo(props) {
  assert(props.anime, "Data missing");
  assert(props.anime?.id, "Id missing");

  const [malId, setMalId]= createSignal(undefined);
  const [malData] = api.myAnimeList.animeById(malId);
  const { accessToken, authUserData } = useAuthentication();
  const { setMediaListEntry } = useEditMediaEntries();
  
  createEffect(() => {
    if (props.anime.idMal) {
      setMalId(props.anime.idMal);
    }
  });

  createEffect(() => {
    console.log(malData());
  })

  console.log(props.anime);

  return (
    <>
      <Banner src={props.anime.bannerImage} />
      <div class={style.container}>
        <div class={style.left}>
          <img src={props.anime.coverImage.large} alt="Cover" class={style.cover} />
          <Show when={accessToken()}>
            <button onClick={() => {
              const [data] = api.anilist.mediaListEntry(accessToken, props.anime.id);
              createEffect(() => {
                if (data()) {
                  setMediaListEntry(data().data.data.Media);
                }
              })
            }}>{props.anime.mediaListEntry?.status || "Edit"}</button>
          </Show>
          <Show when={props.anime.idMal}>
            {console.log("ID", props.anime.idMal, malData())}
            <Show when={malData()} fallback={<p>MAL score: loading</p>}>
              <p>MAL score: {malData().data.data.score}</p>
            </Show>
          </Show>
          <ExternalLinks media={props.anime}/>
          <div>
            <h2>Extra info</h2>
            <ul>
              <Show when={props.anime.episodes}>
                <li>Episodes: {props.anime.episodes}</li>
              </Show>
              <Show when={props.anime.duration}>
                <li>Duration: {props.anime.duration} mins</li>
              </Show>
              <Show when={props.anime.startDate}>
                <li>Start Date: {formatAnilistDate(props.anime.startDate)}</li>
              </Show>
              <Show when={props.anime.endDate}>
                <li>End Date: {formatAnilistDate(props.anime.endDate)}</li>
              </Show>
              <Show when={!authUserData() || authUserData().data.data.Viewer.options.titleLanguage !== "ENGLISH"}>
                <li>English: {props.anime.title.english}</li>
              </Show>
              <Show when={!authUserData() || authUserData().data.data.Viewer.options.titleLanguage !== "ROMAJI"}>
                <li>Romaji: {props.anime.title.romaji}</li>
              </Show>
              <Show when={!authUserData() || authUserData().data.data.Viewer.options.titleLanguage !== "NATIVE"}>
                <li>Native: {props.anime.title.native}</li>
              </Show>
              <Show when={props.anime.synonyms.length}>
                <li>
                  Synonyms:
                  <ul>
                    <For each={props.anime.synonyms}>{synonym => (
                      <li>{synonym}</li>
                    )}</For>
                  </ul>
                </li>
              </Show>
            </ul>
          </div>
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
          <AnimeThemes theme={props.theme} />
        </div>
      </div>
    </>
  )
}

export default Anime
