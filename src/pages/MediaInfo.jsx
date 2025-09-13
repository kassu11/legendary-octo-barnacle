import { A, Navigate, useLocation, useNavigate, useParams } from "@solidjs/router";
import { ErrorBoundary, For, Show, Switch, createEffect, createMemo, createRenderEffect, createSignal, on, onCleanup, onMount } from "solid-js";
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
import { MediaScores } from "./MediaPage/MediaScores.jsx";
import Friends from "../components/media/Friends.jsx";
import AnimeThemes from "../components/media/AnimeThemes.jsx";
import { capitalize, formatMediaFormat, formatMediaSource, formatMediaStatus, formatTitleToUrl, languageFromCountry, mediaUrl, numberCommas } from "../utils/formating.js";
import { FavouriteToggle } from "../components/FavouriteToggle.jsx";
import Recommendations from "../components/media/Recommendations.jsx";
import { MediaInfoContext, useAuthentication, useEditMediaEntries, useMediaInfo } from "../context/providers.js";
import { searchFormats, searchSources } from "../utils/searchObjects.js";
import { navigateToMediaPage } from "../utils/navigateUtils.js";
import { fetcherSenderUtils } from "../utils/utils.js";
import { fetchers, fetcherSenders, requests } from "../collections/collections.js";
import { Trailer } from "./MediaPage/Trailer.jsx";

export function MediaInfoContent(props) {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [isFavourite, setIsFavourite] = createSignal();

  const anilistFetcher = fetcherSenderUtils.createFetcher(fetchers.anilist.getMediaById, accessToken, () => params.id);
  const cacheType = fetcherSenderUtils.createDynamicCacheType({ default: () => requests.anilist.inFiveSeconds() > 2 })
  const [anilistData, { mutateBoth: mutateBothAnilistData }] = fetcherSenders.sendWithCacheTypeWithoutNullUpdates(cacheType, anilistFetcher);

  const idMal = createMemo(() => {
    const data = anilistData()?.data;
    if (!data || data.idMal == null || data.type.toLowerCase() !== params.type) {
      return;
    }
    return data.idMal;
  });

  createRenderEffect(on(anilistData, apiResponse => {
    setIsFavourite(apiResponse?.data?.isFavourite ?? false);
  }));

  const jikanFetcher = fetcherSenderUtils.createFetcher(fetchers.jikan.getMediaById, () => params.type, idMal);
  const [_jikanData] = fetcherSenders.sendWithNullUpdates(jikanFetcher);
  const jikanData = createMemo(() => {
    if (anilistData()?.data.idMal && _jikanData()?.data?.mal_id === anilistData()?.data.idMal) {
      return _jikanData();
    }
    return undefined
  });

  const { openEditor } = useEditMediaEntries();
  const navigate = useNavigate();

  createEffect(() => {
    setIsFavourite(props.media?.isFavourite ?? false);
  });

  createRenderEffect(() => {
    if (anilistData()?.data && params.sub) {
      document.title = `${anilistData().data.title.userPreferred} - ${params.sub} - LOB`;
    } else if (anilistData()?.data) {
      document.title = `${anilistData().data.title.userPreferred} - LOB`;
    }
  });

  const controller = new AbortController();

  onMount(() => {
    window.addEventListener("keydown", e => {
      if (e.target !== document.body || e.shiftKey || e.altKey) {
        return;
      }

      function findTypeAndPreventDefault(type) {
        e.preventDefault();
        return anilistData()?.data?.relations?.edges?.find(relation => relation?.relationType === type)?.node;
      }

      if ((e.key === "l" && !e.ctrlKey) || (e.key === "ArrowRight" && e.ctrlKey)) {
        navigateToMediaPage(navigate, findTypeAndPreventDefault("SEQUEL"));
      } else if ((e.key === "h" && !e.ctrlKey) || (e.key === "ArrowLeft" && e.ctrlKey)) {
        navigateToMediaPage(navigate, findTypeAndPreventDefault("PREQUEL"));
      } else if ((e.key === "j" && !e.ctrlKey) || (e.key === "ArrowDown" && e.ctrlKey)) {
        const media = findTypeAndPreventDefault("ADAPTATION") || findTypeAndPreventDefault("ALTERNATIVE");
        navigateToMediaPage(navigate, media);
      } else if ((e.key === "k" && !e.ctrlKey) || (e.key === "ArrowUp" && e.ctrlKey)) {
        navigateToMediaPage(navigate, findTypeAndPreventDefault("SOURCE") || findTypeAndPreventDefault("PARENT"));
      }
    }, { signal: controller.signal });
  });

  onCleanup(() => controller.abort());

  const loading = () => anilistData.loading && anilistData()?.data.id != params.id;

  const mutateBothFavourite = (isFavourite, variables) => {
    const id = variables[anilistData()?.data?.type] ?? null;
    if (anilistData()?.data?.id === id) {
      setIsFavourite(isFavourite);
      mutateBothAnilistData(api => {
        api.data.isFavourite = isFavourite;
        return api;
      });
    }
  };

  return (
    <ErrorBoundary fallback="Media page error">
      {console.log(jikanData())}
      <MediaInfoContext.Provider value={{ anilistData, mutateBothAnilistData, jikanData }}>
        <Banner src={anilistData()?.data?.bannerImage} loading={loading()} />
        <div class="media-page-content" classList={{loading: loading()}}>
          <aside class="media-page-left-aside">
            <Show when={anilistData()?.data}>
              <img src={anilistData()?.data?.coverImage.large} alt="Cover" class="media-page-cover" />
              <MediaScores />
              <Show when={accessToken()}>
                <button onClick={() => {
                  openEditor(anilistData()?.data, {
                    setIsFavourite: mutateBothFavourite,
                    mutateMedia: response => {
                      if (anilistData()?.data?.id === response?.media.id) {
                        mutateBothAnilistData(api => {
                          api.data.mediaListEntry = response;
                          return api;
                        });
                      }
                    }
                  });
                }}>{anilistData()?.data.mediaListEntry?.status || "Edit"}</button>
                <FavouriteToggle 
                  checked={isFavourite()} 
                  onChange={setIsFavourite} 
                  idType={anilistData()?.data.type}
                  variableId={anilistData()?.data.id}
                  favourites={anilistData()?.data.favourites}
                  mutateCache={mutateBothFavourite} 
                />
              </Show>
              <Trailer id={anilistData()?.data?.trailer?.id} site={anilistData()?.data?.trailer?.site} />
              <Show when={anilistData()?.data.studios.edges.filter(edge => edge.isMain)}>{edges => (
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
              <Show when={anilistData()?.data.studios.edges.filter(edge => edge.isMain === false)}>{edges => (
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
              <ExternalLinks media={anilistData()?.data} loading={loading()} />
              <ExtraInfo media={anilistData()?.data} loading={loading()} />
              <Rankings rankings={anilistData()?.data.rankings} loading={loading()} />
              <Genres genres={anilistData()?.data.genres} type={anilistData()?.data.type} loading={loading()} />
              <Tags tags={anilistData()?.data.tags} type={anilistData()?.data.type} loading={loading()} />
            </Show>
          </aside>
          <section class="media-page-main">
            <div class="media-page-title-info">
              <Show when={anilistData()?.data}>
                <h1>{anilistData()?.data.title.userPreferred}</h1>
                <ul class="flex-bullet-separator">
                  <li>
                    <Switch>
                      <Match when={anilistData()?.data.type === "MANGA"}>
                        <Switch>
                          <Match when={anilistData()?.data.startDate?.year}>
                            <A href={"/search/manga?year=" + anilistData()?.data.startDate.year}>{anilistData()?.data.startDate.year}</A>
                          </Match>
                          <Match when={anilistData()?.data.startDate?.year == null}>
                            <A href="/search/manga/tba">TBA</A>
                          </Match>
                        </Switch>
                      </Match>
                      <Match when={anilistData()?.data.type === "ANIME"}>
                        <Switch>
                          <Match when={anilistData()?.data.seasonYear && anilistData()?.data.season}>
                            <A href={"/search/anime/" + anilistData()?.data.season.toLowerCase() + "-" + anilistData()?.data.seasonYear}>{capitalize(anilistData()?.data.season)} {anilistData()?.data.seasonYear}</A>
                          </Match>
                          <Match when={anilistData()?.data.startDate?.year}>
                            <A href={"/search/anime?year=" + anilistData()?.data.startDate.year}>{anilistData()?.data.startDate.year}</A>
                          </Match>
                          <Match when={anilistData()?.data.startDate?.year == null}>
                            <A href="/search/anime/tba">TBA</A>
                          </Match>
                        </Switch>
                      </Match>
                    </Switch>
                  </li>
                  <Show when={Object.entries(searchFormats.ani.media).find(([, val]) => val.api === anilistData()?.data.format)?.[0]}>{formatApiValue => (
                    <li>
                      <Switch>
                        <Match when={anilistData()?.data.countryOfOrigin !== "JP"}> 
                          <A href={"/search/" + anilistData()?.data.type.toLowerCase() + "?format=" + formatApiValue() + "&country=" + anilistData()?.data.countryOfOrigin}>
                            {formatMediaFormat(anilistData()?.data.format)} ({languageFromCountry(anilistData()?.data.countryOfOrigin)})
                          </A>
                        </Match>
                        <Match when={anilistData()?.data.countryOfOrigin === "JP"}> 
                          <A href={"/search/" + anilistData()?.data.type.toLowerCase() + "?format=" + formatApiValue()}>
                            {formatMediaFormat(anilistData()?.data.format)}
                          </A>
                        </Match>
                      </Switch>
                    </li>
                  )}</Show>
                  <li>{formatMediaStatus(anilistData()?.data.status)}</li>
                </ul>
                <ul>
                  <Show when={anilistData()?.data.source}>
                    <li>Source: 
                      <A href={"/search/" + anilistData()?.data.type.toLowerCase() + "?source=" + Object.entries(searchSources).find(([, val]) => val.api === anilistData()?.data.source)[0]}>
                        {formatMediaSource(anilistData()?.data.source)}
                      </A>
                    </li>
                  </Show>
                  <li>Members: {numberCommas(anilistData()?.data.popularity)}</li>
                  <li>Favourites: {numberCommas(anilistData()?.data.favourites)}</li>
                </ul>
              </Show>
            </div>
            {props.children}
          </section>
        </div>
      </MediaInfoContext.Provider>
    </ErrorBoundary>
  )
}

export function MediaInfoHome() {
  const { accessToken } = useAuthentication();
  const { anilistData, mutateBothAnilistData } = useMediaInfo();

  return (
    <ErrorBoundary fallback="Media page home content error">
      <Show when={anilistData()?.data}>
        <Show when={anilistData().data.description}>
          <div class="media-page-description">
            <Markdown text={anilistData().data.description} />
          </div>
        </Show>
        <Show when={anilistData().data.relations?.edges.length}>
          <div class="media-page-relation-container">
            <h2>Relations</h2>
            <ol class="grid-column-auto-fill">
              <For each={anilistData().data.relations.edges}>{relation => (
                <li>
                  <A
                    href={mediaUrl(relation.node)}
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
        <Characters characters={anilistData().data.characterPreview.edges} countryOfOrigin={anilistData().data.countryOfOrigin} />
        <Staff staff={anilistData().data.staffPreview.edges} />
        <Show when={accessToken()}>
          <Friends />
        </Show>
        <AnimeThemes />
        <StreamingEpisodes streamingEpisodes={anilistData().data.streamingEpisodes} />
        <Recommendations
          recommendations={anilistData().data.recommendations}
          mutateCache={(i, node) => {
            mutateBothAnilistData(api => {
              api.data.recommendations.nodes[i] = node;
              return api;
            });
          }} />
      </Show>
    </ErrorBoundary>
  );
}


export function MediaPageRedirect() {
  const params = useParams();
  const location = useLocation();

  return (
    <Navigate href={"/ani/" + params.type + "/" + params.id + "/" + (params.name || "") + location.search} />
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
