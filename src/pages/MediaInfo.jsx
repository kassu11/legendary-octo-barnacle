import { A, useNavigate, useParams } from "@solidjs/router";
import api from "../utils/api.js";
import { ErrorBoundary, For, Show, Switch, createEffect, createSignal, on, onCleanup, onMount } from "solid-js";
import "./MediaInfo.scss";
import { Markdown } from "../components/Markdown.jsx";
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
import { capitalize, formatMediaFormat, formatMediaSource, formatMediaStatus, formatTitleToUrl, languageFromCountry, numberCommas } from "../utils/formating.js";
import { FavouriteToggle } from "../components/FavouriteToggle.jsx";
import Recommendations from "../components/media/Recommendations.jsx";
import { useAuthentication, useEditMediaEntries } from "../context/providers.js";
import { searchFormats, searchSources } from "../utils/searchObjects.js";
import { navigateToMediaPage } from "../utils/navigateUtils.js";

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
    if (mediaData()) {
      document.title = `${mediaData().data.data.Media.title.userPreferred} - LOB`;
    }
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
  const navigate = useNavigate();
  
  createEffect(() => {
    setIsFavourite(props.media?.isFavourite ?? false);
  });

  const controller = new AbortController();

  onMount(() => {
    window.addEventListener("keydown", e => {
      if (e.target !== document.body || e.shiftKey || e.ctrlKey || e.altKey) {
        return;
      }

      function findTypeAndPreventDefault(type) {
        e.preventDefault();
        return props?.media?.relations?.edges?.find(relation => relation?.relationType === type)?.node;
      }

      if (e.key === "l") {
        navigateToMediaPage(navigate, findTypeAndPreventDefault("SEQUEL"));
      } else if (e.key === "h") {
        navigateToMediaPage(navigate, findTypeAndPreventDefault("PREQUEL"));
      } else if (e.key === "j") {
        const media = findTypeAndPreventDefault("ADAPTATION") || findTypeAndPreventDefault("ALTERNATIVE");
        navigateToMediaPage(navigate, media);
      } else if (e.key === "k") {
        navigateToMediaPage(navigate, findTypeAndPreventDefault("SOURCE"));
      }
    }, { signal: controller.signal });
  });

  onCleanup(() => controller.abort());

  return (
    <ErrorBoundary fallback="Error">
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
          <Tags tags={props.media.tags} type={props.media.type} />
        </aside>
        <section class="media-page-main">
          <div class="media-page-title-info">
            <h1>{props.media.title.userPreferred}</h1>
            <ul class="flex-bullet-separator">
              <li>
                <Switch>
                  <Match when={props.media.type === "MANGA"}>
                    <Switch>
                      <Match when={props.media.startDate?.year}>
                        <A href={"/search/manga?year=" + props.media.startDate.year}>{props.media.startDate.year}</A>
                      </Match>
                      <Match when={props.media.startDate?.year == null}>
                        <A href="/search/manga/tba">TBA</A>
                      </Match>
                    </Switch>
                  </Match>
                  <Match when={props.media.type === "ANIME"}>
                    <Switch>
                      <Match when={props.media.seasonYear && props.media.season}>
                        <A href={"/search/anime/" + props.media.season.toLowerCase() + "-" + props.media.seasonYear}>{capitalize(props.media.season)} {props.media.seasonYear}</A>
                      </Match>
                      <Match when={props.media.startDate?.year}>
                        <A href={"/search/anime?year=" + props.media.startDate.year}>{props.media.startDate.year}</A>
                      </Match>
                      <Match when={props.media.startDate?.year == null}>
                        <A href="/search/anime/tba">TBA</A>
                      </Match>
                    </Switch>
                  </Match>
                </Switch>
              </li>
              <Show when={Object.entries(searchFormats.ani.media).find(([, val]) => val.api === props.media.format)?.[0]}>{formatApiValue => (
                <li>
                  <Switch>
                    <Match when={props.media.countryOfOrigin !== "JP"}> 
                      <A href={"/search/" + props.media.type.toLowerCase() + "?format=" + formatApiValue() + "&country=" + props.media.countryOfOrigin}>
                        {formatMediaFormat(props.media.format)} ({languageFromCountry(props.media.countryOfOrigin)})
                      </A>
                    </Match>
                    <Match when={props.media.countryOfOrigin === "JP"}> 
                      <A href={"/search/" + props.media.type.toLowerCase() + "?format=" + formatApiValue()}>
                        {formatMediaFormat(props.media.format)}
                      </A>
                    </Match>
                  </Switch>
                </li>
              )}</Show>
              <li>{formatMediaStatus(props.media.status)}</li>
            </ul>
            <ul>
              <Show when={props.media.source}>
                <li>Source: 
                  <A href={"/search/" + props.media.type.toLowerCase() + "?source=" + Object.entries(searchSources).find(([, val]) => val.api === props.media.source)[0]}>
                    {formatMediaSource(props.media.source)}
                  </A>
                </li>
              </Show>
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
          <Recommendations 
            recommendations={props.media.recommendations} 
            mutateCache={(i, node) => props.setMediaData(v => {
              v.data.data.Media.recommendations.nodes[i] = node;
              return v;
            })} 
          />
        </section>
      </div>
    </ErrorBoundary>
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
