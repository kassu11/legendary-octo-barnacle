import { A, useParams } from "@solidjs/router";
import api from "../utils/api.js";
import { Show, createEffect, createSignal } from "solid-js";
import style from "./MediaInfo.module.scss";
import { Markdown } from "../components/Markdown.jsx";
import { useAuthentication } from "../context/AuthenticationContext.jsx";
import Banner from "../components/media/Banner.jsx";
import ExternalLinks from "../components/media/ExternalLinks.jsx";
import ExtraInfo from "../components/media/ExtraInfo.jsx";
import Rankings from "../components/media/Rankings.jsx";
import Genres from "../components/media/Genres.jsx";
import Tags from "../components/media/Tags.jsx";
import Header from "../components/media/Header.jsx";
import Characters from "../components/media/Characters.jsx";
import Friends from "../components/media/Friends.jsx";
import AnimeThemes from "../components/media/AnimeThemes.jsx";
import { assert } from "../utils/assert.js";
import { useEditMediaEntries } from "../context/EditMediaEntriesContext.jsx";
import { formatTitleToUrl } from "../utils/formating.js";
import { FavouriteToggle } from "../components/FavouriteToggle.jsx";

export function AnimeInfo() {
  const params = useParams();
  const [idMal, setIdMal] = createSignal();
  const [malData] = api.myAnimeList.animeById(idMal);
  const [themeData] = api.animeThemes.themesByAniListId(() => params.id);

  return (
    <MediaProvider setIdMal={setIdMal} theme={themeData()?.data.anime[0]} malData={malData()} />
  )
}

export function MangaInfo() {
  const [idMal, setIdMal] = createSignal();
  const [malData] = api.myAnimeList.mangaById(idMal);

  return (
    <MediaProvider setIdMal={setIdMal} malData={malData()} />
  )
}

function MediaProvider(props) {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [mediaData, { mutateCache: setMediaData }] = api.anilist.mediaId(() => params.id, accessToken);
  const [friendScoreData] = api.anilist.friendsMediaScore(accessToken, () => params.id, {page: 1, perPage: 8});

  createEffect(() => {
    props.setIdMal(mediaData()?.data.data.Media.idMal ?? undefined);
  });

  return (
    <Show when={mediaData()}>
      <MediaInfo 
        media={mediaData().data.data.Media} 
        setMediaData={setMediaData} 
        theme={props.theme} 
        friend={friendScoreData()?.data.data.Page} 
        malData={props.malData}
      />
    </Show>
  )
}

function MediaInfo(props) {
  assert(props.media, "Data missing");
  assert(props.media?.id, "Id missing");

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
              openEditor(props.media, {
                setIsFavourite: (isFavourite) => {
                  setIsFavourite(isFavourite);
                  props.setMediaData(v => {
                    v.data.data.Media.isFavourite = isFavourite;
                    return v;
                  });
                }
              });
            }}>{props.media.mediaListEntry?.status || "Edit"}</button>
            <FavouriteToggle 
              checked={isFavourite()} 
              onChange={setIsFavourite} 
              animeId={props.media.type === "ANIME" ? props.media.id : undefined}
              mangaId={props.media.type === "MANGA" ? props.media.id : undefined}
              mutateCache={(isFavourite) => props.setMediaData(v => {
                v.data.data.Media.isFavourite = isFavourite;
                return v;
              })} 
            />
          </Show>
          <Show when={props.media.idMal}>
            <Show when={props.malData} fallback={<p>MAL score: loading</p>}>
              <p>MAL score: {props.malData.data.data.score}</p>
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
          <Show when={props.media.type === "ANIME"} children={<AnimeThemes theme={props.theme} />} />
        </div>
      </div>
    </>
  )
}
