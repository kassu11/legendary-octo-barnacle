import { A, Navigate, useLocation, useNavigate, useParams, useSearchParams } from "@solidjs/router";
import { AnilistRelationsPreview } from "./RelationsPreview.scoped.jsx";
import Characters from "../../components/media/Characters.jsx";
import { createEffect, createMemo, createRenderEffect, createSignal, ErrorBoundary, For, Match, on, onCleanup, onMount, Show, Switch } from "solid-js";
import { Markdown } from "../../components/Markdown.jsx";
import { StaffPreview } from "./StaffPreview.scoped.jsx";
import Friends from "../../components/media/Friends.jsx";
import AnimeThemes from "../../components/MediaPage/AnimeThemes.jsx";
import { Recommendations } from "./Recommendations.scoped.jsx";
import { MediaInfoContext, useAuthentication, useEditMediaEntries, useMediaInfo } from "../../context/providers.js";
import { AnilistMediaInfo } from "./MediaInfo.scoped.jsx";
import { Tags } from "../../components/media/Tags.scoped.jsx";
import { Genres } from "../../components/media/Genres.scoped.jsx";
import { Rankings } from "../../components/media/Rankings.scoped.jsx";
import { ExtraInfo } from "../../components/media/ExtraInfo.scoped.jsx";
import { ExternalLinks } from "../../components/media/ExternalLinks.scoped.jsx";
import { MediaPageScores } from "../../components/MediaPage/Scores.scoped.jsx";
import "./index(media-page-anilist).scoped.css";
import { queries } from "../../collections/collections.js";
import { formatingUtils, navigationUtils } from "../../utils/utils.js";
import { MediaBanner } from "./Banner.scoped.jsx";
import { FavouriteToggle } from "../../components/FavouriteToggle.jsx";
import { Trailer } from "../MediaPage/Trailer.jsx";
import { isTypeFunction } from "../../utils/functionUtils.js";
import { createAnilistFetcher, createJsonGetFetcher, sendAnilistFetcher, sendFetcher } from "../../utils/fetcherUtils.js";
import { setFetcherValueToStorage } from "../../utils/storageUtils.js";
import { createTimer } from "../../utils/timeUtils.js";
import { MediaPageApiSwitcher } from "../MediaPageJikan/MediaPageApiSwitcher.scoped.jsx";

export function MediaInfoContent(props) {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { accessToken } = useAuthentication();
  const [isFavourite, setIsFavourite] = createSignal();
  const [anilistData, setAnilistData] = createSignal(undefined, { equals: false });
  const [loading, setLoading] = createSignal(false);
  const [time, startTimer, stopTimer] = createTimer();

  let fetcher, controller;
  createEffect(() => {
    controller?.abort();
    controller = new AbortController();

    if (searchParams.isMalId == null) fetcher = createAnilistFetcher(queries.anilistMediaById, { id: params.id }, controller.signal);
    else fetcher = createAnilistFetcher(queries.anilistMediaById, { idMal: params.id, type: params.type.toUpperCase() }, controller.signal);

    sendAnilistFetcher(fetcher, {
      name: "Anilist media page",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === fetcher.cacheKey) controller = null;
      },
      onStart: time => {
        startTimer(time);
        setLoading(true);
      },
      onStop: time => {
        stopTimer(time);
        setLoading(false);
      },
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === fetcher.cacheKey) setAnilistData(res);
      }
    });
  });

  const mutateBothAnilistData = mutate => {
    setAnilistData(data => {
      if (isTypeFunction(mutate)) mutate = mutate(data);
      setFetcherValueToStorage(mutate);
      return mutate;
    });
  }

  createRenderEffect(on(anilistData, apiResponse => {
    setIsFavourite(apiResponse?.data.data.Media?.isFavourite ?? false);
  }));

  const [_jikanData, setJikanData] = createSignal(undefined, { equals: false });
  const jikanData = createMemo(() => {
    if (anilistData()?.data.data.Media.id == params.id && anilistData()?.data.data.Media.idMal === _jikanData()?.data.data.mal_id) {
      return _jikanData();
    }
    return undefined
  });
  let jikanFetcher, jikanController;
  createEffect(() => {
    if (anilistData()?.data.data.Media.type.toLowerCase() !== params.type) return;
    if (anilistData()?.data.data.Media.id != params.id) return;
    const id = anilistData()?.data.data.Media.idMal;
    if (!id) return;

    jikanController?.abort();
    jikanController = new AbortController();

    jikanFetcher = createJsonGetFetcher(queries.myAnimeListMediaById, { id, type: params.type }, jikanController.signal);

    sendFetcher(jikanFetcher, {
      name: "Jikan media page (Anilist)",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === jikanFetcher.cacheKey) jikanController = null;
      },
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === jikanFetcher.cacheKey) setJikanData(res);
      }
    });
  });

  const { openEditor } = useEditMediaEntries();
  const navigate = useNavigate();

  createRenderEffect(() => {
    if (!anilistData()) return;
    if (params.sub) {
      document.title = `${anilistData().data.data.Media.title.userPreferred} - ${params.sub} - LOB`;
    } else {
      document.title = `${anilistData().data.data.Media.title.userPreferred} - LOB`;
    }
  });

  const keyController = new AbortController();

  onMount(() => {
    window.addEventListener("keydown", e => {
      if (e.target !== document.body || e.shiftKey || e.altKey) {
        return;
      }

      function findTypeAndPreventDefault(type) {
        e.preventDefault();
        return anilistData()?.data.data.Media?.relations?.edges?.find(relation => relation?.relationType === type)?.node;
      }

      if ((e.key === "l" && !e.ctrlKey) || (e.key === "ArrowRight" && e.ctrlKey)) {
        navigationUtils.navigateToMediaPage(navigate, findTypeAndPreventDefault("SEQUEL"));
      } else if ((e.key === "h" && !e.ctrlKey) || (e.key === "ArrowLeft" && e.ctrlKey)) {
        navigationUtils.navigateToMediaPage(navigate, findTypeAndPreventDefault("PREQUEL"));
      } else if ((e.key === "j" && !e.ctrlKey) || (e.key === "ArrowDown" && e.ctrlKey)) {
        const media = findTypeAndPreventDefault("ADAPTATION") || findTypeAndPreventDefault("ALTERNATIVE");
        navigationUtils.navigateToMediaPage(navigate, media);
      } else if ((e.key === "k" && !e.ctrlKey) || (e.key === "ArrowUp" && e.ctrlKey)) {
        navigationUtils.navigateToMediaPage(navigate, findTypeAndPreventDefault("SOURCE") || findTypeAndPreventDefault("PARENT"));
      }
    }, { signal: keyController.signal });
  });

  onCleanup(() => keyController.abort());

  const mutateBothFavourite = (isFavourite, variables) => {
    const id = variables[anilistData()?.data.data.Media?.type] ?? null;
    if (anilistData()?.data.data.Media?.id === id) {
      setIsFavourite(isFavourite);
      mutateBothAnilistData(api => {
        api.data.data.Media.isFavourite = isFavourite;
        return api;
      });
    }
  };

  return (
    <ErrorBoundary fallback="Media page error">
      <MediaInfoContext.Provider value={{ anilistData, mutateBothAnilistData, jikanData }}>
        <MediaBanner src={anilistData()?.data.data.Media?.bannerImage} loading={loading()} />
        <div class="media-page-content" classList={{loading: loading()}}>
          <aside class="media-page-left-aside">
            <Show when={anilistData()}>
              <img src={anilistData()?.data.data.Media?.coverImage.extraLarge} alt="Cover" class="media-page-cover" />
              <MediaPageApiSwitcher anilistData={anilistData} jikanData={jikanData} />
              <MediaPageScores />
              <Show when={accessToken()}>
                <button onClick={() => {
                  openEditor(anilistData()?.data.data.Media, {
                    setIsFavourite: mutateBothFavourite,
                    mutateMedia: response => {
                      if (anilistData()?.data.data.Media?.id === response?.media.id) {
                        mutateBothAnilistData(api => {
                          api.data.data.Media.mediaListEntry = response;
                          return api;
                        });
                      }
                    }
                  });
                }}>{anilistData()?.data.data.Media.mediaListEntry?.status || "Edit"}</button>
                <FavouriteToggle
                  checked={isFavourite()}
                  onChange={setIsFavourite}
                  idType={anilistData()?.data.data.Media.type}
                  variableId={anilistData()?.data.data.Media.id}
                  anilistValue={anilistData()?.data.data.Media.favourites}
                  jikanValue={jikanData()?.data.favorites}
                  mutateCache={mutateBothFavourite}
                />
              </Show>
              <Trailer id={anilistData()?.data.data.Media?.trailer?.id} site={anilistData()?.data.data.Media?.trailer?.site} />
              <Show when={anilistData()?.data.data.Media.studios.edges.filter(edge => edge.isMain)}>{edges => (
                <Show when={edges().length > 0}>
                  <div>
                    <h2>Studios</h2>
                    <ol>
                      <For each={edges()}>{edge => (
                        <li>
                          <A href={"/ani/studio/" + edge.node.id + "/" + formatingUtils.titleToUrl(edge.node.name)}>
                            {edge.node.name}
                          </A>
                        </li>
                      )}</For>
                    </ol>
                  </div>
                </Show>
              )}</Show>
              <Show when={anilistData()?.data.data.Media.studios.edges.filter(edge => edge.isMain === false)}>{edges => (
                <Show when={edges().length > 0}>
                  <div>
                    <h2>Producers</h2>
                    <ol>
                      <For each={edges()}>{edge => (
                        <li>
                          <A href={"/ani/studio/" + edge.node.id + "/" + formatingUtils.titleToUrl(edge.node.name)}>
                            {edge.node.name}
                          </A>
                        </li>
                      )}</For>
                    </ol>
                  </div>
                </Show>
              )}</Show>
              <ExternalLinks hashtag={anilistData()?.data.data.Media.hashtag} externalLinks={anilistData()?.data.data.Media.externalLinks} />
              <ExtraInfo media={anilistData()?.data.data.Media} loading={loading()} />
              <Rankings rankings={anilistData()?.data.data.Media.rankings} loading={loading()} />
              <Genres genres={anilistData()?.data.data.Media.genres} type={anilistData()?.data.data.Media.type} loading={loading()} />
              <Tags tags={anilistData()?.data.data.Media.tags} type={anilistData()?.data.data.Media.type} loading={loading()} />
            </Show>
          </aside>
          <section class="media-page-main">
            <AnilistMediaInfo time={time} />
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
      <Show when={anilistData()?.data.data.Media}>
        <Show when={anilistData().data.data.Media.description}>
          <div class="media-page-description">
            <Markdown text={anilistData().data.data.Media.description} />
          </div>
        </Show>
        <AnilistRelationsPreview relations={anilistData().data.data.Media.relations}/>
        <Characters characters={anilistData().data.data.Media.characterPreview.edges} countryOfOrigin={anilistData().data.data.Media.countryOfOrigin} />
        <StaffPreview staff={anilistData().data.data.Media.staffPreview.edges} />
        <Show when={accessToken()}>
          <Friends />
        </Show>
        <AnimeThemes />
        <StreamingEpisodes streamingEpisodes={anilistData().data.data.Media.streamingEpisodes} />
        <Recommendations
          recommendations={anilistData().data.data.Media.recommendations}
          mutateCache={(i, node) => {
            mutateBothAnilistData(api => {
              api.data.data.Media.recommendations.nodes[i] = node;
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
      <div class="no-overflow media-page-watch-episodes">
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
