import { A, useParams } from "@solidjs/router";
import api from "../utils/api.js";
import { For, Show, Switch, createEffect, createSignal, on } from "solid-js";
import "./MediaInfo.scss";
import { Markdown } from "../components/Markdown.jsx";
import { useAuthentication } from "../context/AuthenticationContext.jsx";
import Banner from "../components/media/Banner.jsx";
import ExternalLinks from "../components/media/ExternalLinks.jsx";
import ExtraInfo from "../components/media/ExtraInfo.jsx";
import Rankings from "../components/media/Rankings.jsx";
import Genres from "../components/media/Genres.jsx";
import Tags from "../components/media/Tags.jsx";
import Characters from "../components/media/Characters.jsx";
import Staff from "../components/media/Staff.jsx";
import Friends from "../components/media/Friends.jsx";
import AnimeThemes from "../components/media/AnimeThemes.jsx";
import { assert } from "../utils/assert.js";
import { useEditMediaEntries } from "../context/EditMediaEntriesContext.jsx";
import { capitalize, formatMediaFormat, formatMediaSource, formatMediaStatus, formatTitleToUrl, numberCommas } from "../utils/formating.js";
import { FavouriteToggle } from "../components/FavouriteToggle.jsx";
import Recommendations from "../components/media/Recommendations.jsx";

export function AnimeInfo() {
  const params = useParams();
  const [idMal, setIdMal] = createSignal();
  const [malData] = api.myAnimeList.animeById(idMal);
  const [themeData] = api.animeThemes.themesByAniListId(() => params.id);

  return (
    <MediaProvider setIdMal={setIdMal} theme={themeData()?.data.anime[0]} malData={malData} />
  )
}

export function MangaInfo() {
  const [idMal, setIdMal] = createSignal();
  const [malData] = api.myAnimeList.mangaById(idMal);

  return (
    <MediaProvider setIdMal={setIdMal} malData={malData} />
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
            <div>
              <p>MAL</p>
              <span>
                <Switch fallback="N/A">
                  <Match when={props.malData.loading}>...</Match>
                  <Match when={props.malData()?.data?.score > 0 && props.media.idMal}>
                    {((props.malData().data.score || 0)).toFixed(2)}
                  </Match>
                </Switch>
              </span>
            </div>
            <p>
              <Show when={props.malData()?.data?.scored_by && props.media.idMal} fallback="-">
                {numberCommas(props.malData().data.scored_by)}
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
          <Trailer trailer={props.media.trailer} />
          <Show when={props.media.studios.edges.filter(edge => edge.isMain)}>{edges => (
            <Show when={edges().length > 0}>
              <div>
                <h2>Studios</h2>
                <ol>
                  <For each={edges()}>{edge => (
                    <li>
                      <A href={"/ani/studio/" + edge.node.id + "/" + formatTitleToUrl(edge.node.name)}>
                        {edge.node.name}
                      </A>
                    </li>
                  )}</For>
                </ol>
              </div>
            </Show>
          )}</Show>
          <Show when={props.media.studios.edges.filter(edge => edge.isMain === false)}>{edges => (
            <Show when={edges().length > 0}>
              <div>
                <h2>Producers</h2>
                <ol>
                  <For each={edges()}>{edge => (
                    <li>
                      <A href={"/ani/studio/" + edge.node.id + "/" + formatTitleToUrl(edge.node.name)}>
                        {edge.node.name}
                      </A>
                    </li>
                  )}</For>
                </ol>
              </div>
            </Show>
          )}</Show>
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
          <Show when={props.media?.relations?.edges.length}>
            <div class="media-page-relation-container">
              <h2>Relations</h2>
              <ol class="grid-column-auto-fill">
                <For each={props.media.relations.edges}>{relation => (
                  <li>
                    <A 
                      href={"/" + relation.node.type.toLowerCase() + "/" + relation.node.id + "/" + formatTitleToUrl(relation.node.title.userPreferred)}
                      class="media-page-relation"
                    >
                      <img src={relation.node.coverImage.large} alt="Cover" />
                      <div class="content">
                        <p class="type">{relation.relationType}</p>
                        <p class="line-clamp">{relation.node.title.userPreferred}</p>
                        <p class="format">{relation.node.format} - {relation.node.status}</p>
                      </div>
                    </A>
                  </li>
                )}</For>
              </ol>
            </div>
          </Show>
          <Characters characters={props.media.characterPreview.edges} countryOfOrigin={props.media.countryOfOrigin} />
          <Staff staff={props.media.staffPreview.edges} />
          <Friends friend={props.friend} media={props.media} type={props.media.type} />
          <Show when={props.media.type === "ANIME"} children={<AnimeThemes theme={props.theme} />} />
          <StreamingEpisodes streamingEpisodes={props.media.streamingEpisodes}/>
          {console.log("media", props.media)}
          <Recommendations 
            recommendations={props.media.recommendations} 
            mutateCache={(i, node) => props.setMediaData(v => {
              v.data.data.Media.recommendations.nodes[i] = node;
              return v;
            })} 
          />
        </section>
      </div>
    </>
  )
}

function Trailer(props) {
  const [open, setOpen] = createSignal(false);
  const [id, setId] = createSignal();
  let dialog;

  createEffect(on(() => props.trailer?.id, id => {
    setId(id);
  }));

  return (
    <Show when={props.trailer}>
      <button  onClick={() => {
        dialog.showModal();
        setOpen(true);
      }}>Watch trailer</button>
      <dialog class="trailer-dialog" onClose={() => setOpen(false)} ref={dialog} onClick={e => e.target === dialog && dialog.close()}>
        <div class="wrapper">
          <Show when={open()}>
            <Switch>
              <Match when={props.trailer.site === "youtube"}>
                <iframe src={"https://www.youtube-nocookie.com/embed/" + id() + "?enablejsapi=1&wmode=opaque&autoplay=1"} frameborder="0" allowFullScreen></iframe>
              </Match>
            </Switch>
          </Show>
          <form method="dialog" class="close">
            <button>Close trailer</button>
          </form>
        </div>
      </dialog>
    </Show>
  );
}

function StreamingEpisodes(props) {
  return (
    <Show when={props.streamingEpisodes?.length}>
      <div class="media-page-watch-episodes">
        <h2>Watch</h2>
        <ol class="grid-reel-auto-fill">
          <For each={props.streamingEpisodes}>{episode => (
            <li>
              <Switch>
                <Match when={episode.site === "Crunchyroll"}>
                  <a href={episode.url} target="_black">
                    <img src={episode.thumbnail} alt="Episode thumbnail" />
                    <div class="wrapper">
                      <p>{episode.title}</p>
                    </div>
                  </a>
                </Match>
              </Switch>
            </li>
          )}</For>
        </ol>
      </div>
    </Show>
  );
}
