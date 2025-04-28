import { A, useParams } from "@solidjs/router";
import api from "../utils/api.js";
import { Show, createEffect, createSignal } from "solid-js";
import "./MediaInfo.scss";
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
import Staff from "../components/media/Staff.jsx";
import Friends from "../components/media/Friends.jsx";
import AnimeThemes from "../components/media/AnimeThemes.jsx";
import { assert } from "../utils/assert.js";
import { useEditMediaEntries } from "../context/EditMediaEntriesContext.jsx";
import { capitalize, compactNumber, formatMediaFormat, formatMediaSource, formatMediaStatus, formatTitleToUrl, numberCommas } from "../utils/formating.js";
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
      <div class="media-page-content">
        <aside class="media-page-left-aside">
          <img src={props.media.coverImage.large} alt="Cover" class="media-page-cover" />
          <div class="media-page-score-container">
            <div>
              <p>Mean</p>
              <span>
                <Show when={props.media.meanScore > 0} fallback="N/A">
                  {((props.media.meanScore || 0) / 10).toFixed(1)}
                </Show>
              </span>
            </div>
            <div>
              <p>Average</p>
              <span>
                <Show when={props.media.averageScore > 0} fallback="N/A">
                  {((props.media.averageScore || 0) / 10).toFixed(1)}
                </Show>
              </span>
            </div>
            <p class="media-page-score-anilist-users">
              <Show when={props.media.stats.scoreDistribution?.reduce((acc, v) => v.amount + acc, 0)} fallback="-">
                {numberCommas(props.media.stats.scoreDistribution?.reduce((acc, v) => v.amount + acc, 0))}
              </Show>
              {" "}Users
            </p>
            <Switch>
              <Match when={props.malData}>
                <div>
                  <p>MAL</p>
                  <span>
                    <Show when={props.malData.data?.data.score > 0} fallback="N/A">
                      {((props.malData.data.data.score || 0)).toFixed(2)}
                    </Show>
                  </span>
                </div>
              </Match>
              <Match when={props.media.idMal}>
                <div>
                  <p>MAL</p>
                  <span>...</span>
                </div>
              </Match>
            </Switch>
            <p>
              <Show when={props.malData?.data?.data.scored_by} fallback="-">
                {numberCommas(props.malData.data?.data.scored_by)}
              </Show>
              {" "}Users
            </p>
          </div>
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
              favourites={props.media.favourites}
              mutateCache={(isFavourite) => props.setMediaData(v => {
                v.data.data.Media.isFavourite = isFavourite;
                return v;
              })} 
            />
          </Show>
          <ExternalLinks media={props.media}/>
          <ExtraInfo media={props.media}/>
          <Rankings rankings={props.media.rankings} />
          <Genres genres={props.media.genres} type={props.media.type} />
          <Tags tags={props.media.tags} />
        </aside>
        <section class="media-page-main">
          <div class="media-page-title-info">
            <h1>{props.media.title.userPreferred}</h1>
            <ul class="media-page-info-list">
              <Switch>
                <Match when={props.media.type === "MANGA"}>
                  <li>{(props.media.startDate?.year) || "TBA"}</li>
                </Match>
                <Match when={props.media.type === "ANIME"}>
                  <li>{capitalize(props.media.season) || "TBA"} {props.media.seasonYear}</li>
                </Match>
              </Switch>
              <li>
                {formatMediaFormat(props.media.format)}
                <Switch>
                  <Match when={props.media.countryOfOrigin === "CN"}> (Chinese)</Match>
                  <Match when={props.media.countryOfOrigin === "TW"}> (Taiwanese)</Match>
                </Switch>
              </li>
              <li>{formatMediaStatus(props.media.status)}</li>
            </ul>
            <ul>
              <li>Source: {formatMediaSource(props.media.source)}</li>
              <li>Members: {numberCommas(props.media.popularity)}</li>
              <li>Favourites: {numberCommas(props.media.favourites)}</li>
            </ul>
          </div>
          <div class="media-page-description">
            <Markdown children={props.media.description}/>
          </div>
          <div class="media-page-relation-container">
            <h2>Relations</h2>
            <ol>
              <For each={props.media.relations.edges}>{relation => (
                <li>
                  <A 
                    href={"/" + relation.node.type.toLowerCase() + "/" + relation.node.id + "/" + formatTitleToUrl(relation.node.title.userPreferred)}
                    class="media-page-relation"
                  >
                    <img src={relation.node.coverImage.large} alt="Cover" />
                    <div class="content">
                      <p class="type">{relation.relationType}</p>
                      <p class="line-clamp-3">{relation.node.title.userPreferred}</p>
                      <p class="format">{relation.node.format} - {relation.node.status}</p>
                    </div>
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
          <Characters characters={props.media.characterPreview.edges} countryOfOrigin={props.media.countryOfOrigin} />
          <Staff staff={props.media.staffPreview.edges} />
          <Friends friend={props.friend} media={props.media} type={props.media.type} />
          <Show when={props.media.type === "ANIME"} children={<AnimeThemes theme={props.theme} />} />
        </section>
      </div>
    </>
  )
}
