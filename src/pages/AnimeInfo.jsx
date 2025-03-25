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
import Characters from "../components/media/Characters";
import Friends from "../components/media/Friends";
import AnimeThemes from "../components/media/AnimeThemes.jsx";
import { assert } from "../utils/assert.js";
import { useEditMediaEntries } from "../context/EditMediaEntriesContext.jsx";


function Anime() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [id, setId]= createSignal(Number(params.id));

  assert(!Number.isNaN(id()), "ID should not be NaN");
  const [animeData] = api.anilist.mediaId(id, accessToken);
  const [friendScoreData] = api.anilist.friendsMediaScore(accessToken, id, {page: 1, perPage: 8});
  const [themeData] = api.anilist.animeThemeById(id);

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
  const { accessToken } = useAuthentication();
  const { setMediaListEntry } = useEditMediaEntries();

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
          <Friends friend={props.friend} media={props.anime} type="anime" />
          <AnimeThemes theme={props.theme} />
        </div>
      </div>
    </>
  )
}

export default Anime
