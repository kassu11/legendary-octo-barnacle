import {Navigate, useLocation, useNavigate, useParams} from "@solidjs/router";
import {AnilistRelationsPreview} from "./RelationsPreview.scoped.jsx";
import Characters from "../../components/media/Characters.jsx";
import {
    createMemo,
    createRenderEffect,
    createSignal,
    ErrorBoundary,
    For, Match,
    on,
    onCleanup,
    onMount,
    Show,
    Switch
} from "solid-js";
import {Markdown} from "../../components/Markdown.jsx";
import {StaffPreview} from "./StaffPreview.scoped.jsx";
import Friends from "../../components/media/Friends.jsx";
import AnimeThemes from "../../components/MediaPage/AnimeThemes.jsx";
import {Recommendations} from "./Recommendations.scoped.jsx";
import {useAuthentication, useMediaInfo} from "../../context/providers.js";
import {AnilistMediaInfo} from "./MediaInfo.jsx";
import {Tags} from "../../components/media/Tags.scoped.jsx";
import {Genres} from "../../components/media/Genres.scoped.jsx";
import {Rankings} from "../../components/media/Rankings.scoped.jsx";
import {ExtraInfo} from "../../components/media/ExtraInfo.scoped.jsx";
import {ExternalLinks} from "../../components/media/ExternalLinks.scoped.jsx";
import { MediaPageScores } from "../../components/MediaPage/Scores.scoped.jsx";
import "./index(media-page-anilist).scoped.css";

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
        navigationUtils.navigateToMediaPage(navigate, findTypeAndPreventDefault("SEQUEL"));
      } else if ((e.key === "h" && !e.ctrlKey) || (e.key === "ArrowLeft" && e.ctrlKey)) {
        navigationUtils.navigateToMediaPage(navigate, findTypeAndPreventDefault("PREQUEL"));
      } else if ((e.key === "j" && !e.ctrlKey) || (e.key === "ArrowDown" && e.ctrlKey)) {
        const media = findTypeAndPreventDefault("ADAPTATION") || findTypeAndPreventDefault("ALTERNATIVE");
        navigationUtils.navigateToMediaPage(navigate, media);
      } else if ((e.key === "k" && !e.ctrlKey) || (e.key === "ArrowUp" && e.ctrlKey)) {
        navigationUtils.navigateToMediaPage(navigate, findTypeAndPreventDefault("SOURCE") || findTypeAndPreventDefault("PARENT"));
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
      <MediaInfoContext.Provider value={{ anilistData, mutateBothAnilistData, jikanData }}>
        <MediaBanner src={anilistData()?.data?.bannerImage} loading={loading()} />
        <div class="media-page-content" classList={{loading: loading()}}>
          <aside class="media-page-left-aside">
            <Show when={anilistData()?.data}>
              <img src={anilistData()?.data?.coverImage.large} alt="Cover" class="media-page-cover" />
              <div class="cp-media-api-switcher">
                <Show when={anilistData()?.data.id}>
                  <a href={"https://anilist.co/" + params.type + "/" + params.id} target="_black" class="active">
                    <span class="visually-hidden">Go to Anilist</span>
                    <Anilist />
                    <ExternalSource />
                  </a>
                </Show>
                <Show when={anilistData()?.data.idMal}>
                  <A href={"/mal/" + params.type + "/" + anilistData()?.data.idMal + "/" + params.name}>
                    <span class="visually-hidden">Switch to MyAnimeList mode</span>
                    <MyAnimeList />
                  </A>
                </Show>
              </div>
              <MediaPageScores />
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
                  anilistValue={anilistData()?.data.favourites}
                  jikanValue={jikanData()?.data.favorites}
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
                          <A href={"/ani/studio/" + edge.node.id + "/" + formatingUtils.titleToUrl(edge.node.name)}>
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
                          <A href={"/ani/studio/" + edge.node.id + "/" + formatingUtils.titleToUrl(edge.node.name)}>
                            {edge.node.name}
                          </A>
                        </li>
                      )}</For>
                    </ol>
                  </div>
                </Show>
              )}</Show>
              <ExternalLinks hashtag={anilistData()?.data.hashtag} externalLinks={anilistData()?.data.externalLinks} />
              <ExtraInfo media={anilistData()?.data} loading={loading()} />
              <Rankings rankings={anilistData()?.data.rankings} loading={loading()} />
              <Genres genres={anilistData()?.data.genres} type={anilistData()?.data.type} loading={loading()} />
              <Tags tags={anilistData()?.data.tags} type={anilistData()?.data.type} loading={loading()} />
            </Show>
          </aside>
          <section class="media-page-main">
            <AnilistMediaInfo />
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
        <AnilistRelationsPreview relations={anilistData().data.relations}/>
        <Characters characters={anilistData().data.characterPreview.edges} countryOfOrigin={anilistData().data.countryOfOrigin} />
        <StaffPreview staff={anilistData().data.staffPreview.edges} />
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
