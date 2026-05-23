import {A, useParams} from "@solidjs/router";
import {MediaInfoContext, useMediaInfo} from "../../context/providers.js";
import {
  fetcherSendersOLD,
  fetchersOLD,
  localizations,
  mediaStatuses,
  queries,
  requests
} from "../../collections/collections.js";
import {
  arrayUtils,
  fetcherSenderUtils,
  formatingUtils,
  numberUtils,
  statusUtils,
  stringUtils,
  urlUtils
} from "../../utils/utils.js";
import {createEffect, createRenderEffect, createSignal, ErrorBoundary, For, Match, on, Show, Switch} from "solid-js";
import "./MediaInfoJikan.scoped.css";
import {Trailer} from "../MediaPage/Trailer.jsx";
import {FavouriteToggle} from "../../components/FavouriteToggle.jsx";
import {Markdown} from "../../components/Markdown.jsx";
import {MalCharacterCard, MalStaffCard} from "../../components/Cards/Cards.scoped.jsx";
import {MediaPageScores} from "../../components/MediaPage/Scores.scoped.jsx";
import {ExternalLinks} from "../../components/media/ExternalLinks.scoped.jsx";
import {createTimer, formatMSToString} from "../../utils/timeUtils.js";
import {createAnilistFetcher, sendAnilistFetcher} from "../../utils/fetcherUtils.js";
import {isTypeFunction} from "../../utils/functionUtils.js";
import {setFetcherValueToStorage} from "../../utils/storageUtils.js";
import {MediaPageApiSwitcher} from "./MediaPageApiSwitcher.scoped.jsx";

export function MediaInfoWrapperJikan(props) {
  const params = useParams();

  const jikanFetcher = fetcherSenderUtils.createFetcherOLD(fetchersOLD.jikan.getMediaById, () => params.type, () => params.id);
  const cacheType = fetcherSenderUtils.createDynamicCacheType({ "only-if-cached": () => requests.jikan.inOneSeconds() })
  const [jikanData] = fetcherSendersOLD.sendWithCacheTypeWithoutNullUpdates(cacheType, jikanFetcher);

  const [time, startTimer, stopTimer] = createTimer();
  const [anilistData, setAnilistData] = createSignal(undefined, { equals: false });

  const mutateBothAnilistData = mutate => {
    setAnilistData(data => {
      if (isTypeFunction(mutate)) mutate = mutate(data);
      setFetcherValueToStorage(mutate);
      return mutate;
    });
  }

  let fetcher, controller;
  createEffect(() => {
    controller?.abort();
    controller = new AbortController();

    fetcher = createAnilistFetcher(queries.anilistMediaById, { idMal: params.id, type: params.type.toUpperCase() }, controller.signal);

    sendAnilistFetcher(fetcher, {
      name: "Anilist media page (jikan)",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === fetcher.cacheKey) controller = null;
      },
      onStart: startTimer,
      onStop: stopTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === fetcher.cacheKey) setAnilistData(res);
      }
    });
  });

  const [isFavourite, setIsFavourite] = createSignal();
  createRenderEffect(on(anilistData, apiResponse => {
    setIsFavourite(apiResponse?.data.data.Media?.isFavourite ?? false);
  }));

  const mutateBothFavourite = (isFavourite, variables) => {
    const id = variables[anilistData()?.data.data.Media?.type] ?? null;
    if (anilistData()?.data.data.Media?.id === id) {
      setIsFavourite(isFavourite);
      mutateBothAnilistData(api => {
        api.data.isFavourite = isFavourite;
        return api;
      });
    }
  };

  return (
    <ErrorBoundary fallback="Jikan media error">
      <MediaInfoContext.Provider value={{anilistData, jikanData}}>
        <div class="pg-media-info-jikan">
          <Show when={jikanData()}>
            <aside class="left">
              <img src={jikanData().data.images.webp.large_image_url} alt="Cover"/>
              <MediaPageApiSwitcher anilistData={anilistData} jikanData={jikanData} />
              <MediaPageScores/>
              <FavouriteToggle
                checked={isFavourite()}
                onChange={setIsFavourite}
                idType={anilistData()?.data.data.Media?.type}
                variableId={anilistData()?.data.data.Media?.id}
                anilistValue={anilistData()?.data.data.Media?.favourites}
                jikanValue={jikanData()?.data.favorites}
                mutateCache={mutateBothFavourite}
              />
              <Trailer id={jikanData()?.data.trailer?.youtube_id} site="youtube"/>
              <Show when={jikanData()?.data.studios?.length}>
                <div>
                  <h2>Studios</h2>
                  <ol>
                    <For each={jikanData()?.data.studios}>{studio => (
                      <li>
                        <a href={studio.url} target="_black">{studio.name}</a>
                      </li>
                    )}</For>
                  </ol>
                </div>
              </Show>
              <Show when={jikanData()?.data.producers?.length}>
                <div>
                  <h2>Producers</h2>
                  <ol>
                    <For each={jikanData()?.data.producers}>{producer => (
                      <li>
                        <a href={producer.url} target="_black">{producer.name}</a>
                      </li>
                    )}</For>
                  </ol>
                </div>
              </Show>
              <ExternalLinks externalLinks={jikanData()?.data.external}/>
            </aside>
          </Show>
          <div class="body">
            <Show when={jikanData()}>
              <p class="time">{formatMSToString(time())}</p>
              <div class="header">
                <h1>{jikanData().data.title}</h1>
                <ul class="flex-bullet-separator">
                  <li>
                    <Switch>
                      <Match when={jikanData().data.year && jikanData().data.season}>
                        <A
                          href={"/search/" + params.type + "?year=" + jikanData().data.year + "&season=" + jikanData().data.season + "&malSearch=true"}>{stringUtils.capitalize(jikanData().data.season)} {jikanData().data.year}</A>
                      </Match>
                      <Match when={jikanData().data.season}>
                        <A
                          href={"/search/" + params.type + "?season=" + jikanData().data.season + "&malSearch=true"}>{stringUtils.capitalize(jikanData().data.season)}</A>
                      </Match>
                      <Match when={jikanData().data.year}>
                        <A
                          href={"/search/" + params.type + "?year=" + jikanData().data.year + "&malSearch=true"}>{jikanData().data.year}</A>
                      </Match>
                      <Match
                        when={jikanData().data.aired?.prop?.from?.year || jikanData().data.published?.prop?.from?.year}>{year => (
                        <A href={"/search/" + params.type + "?year=" + year() + "&malSearch=true"}>{year()}</A>
                      )}</Match>
                      <Match
                        when={jikanData().data.aired?.prop?.to?.year || jikanData().data.published?.prop?.to?.year}>{year => (
                        <A href={"/search/" + params.type + "?year=" + year() + "&malSearch=true"}>{year()}</A>
                      )}</Match>
                      <Match when={jikanData().data.status == mediaStatuses.jikan.NotYetAired}>
                        <A href={"/search/" + params.type + "/tba"}>TBA</A>
                      </Match>
                    </Switch>
                  </li>
                  <li>
                    <A
                      href={"/search/" + params.type + "?format=" + jikanData().data.type.toLowerCase() + "&malSearch=true"}>{jikanData().data.type}</A>
                  </li>
                  <li>{statusUtils.jikanEnumToFlavorText(jikanData()?.data.status)}</li>
                </ul>
                <ul>
                  <Show when={jikanData()?.data.source}>
                    <li>Source:
                      <A href={"/search/" + params.type + "?source=" + jikanData().data.source}>
                        {jikanData()?.data.source}
                      </A>
                    </li>
                  </Show>
                  <li>Members: {numberUtils.numberCommas(jikanData().data.members || 0) || "N/A"}</li>
                  <li>Ranked: #{jikanData().data.rank || "N/A"}</li>
                  <li>Popularity: #{jikanData().data.popularity || "N/A"}</li>
                  <Show when={jikanData().data.authors?.length}>{size => (
                    <li>Author{formatingUtils.plural(size())}:
                      <For each={jikanData().data.authors}>{(author, i) => (
                        <>
                          <a href={author.url}>{author.name}</a>
                          <Show when={i() < size() - 1}> & </Show>
                        </>
                      )}</For>
                    </li>
                  )}</Show>
                </ul>
              </div>
            </Show>
            {props.children}
          </div>
        </div>
      </MediaInfoContext.Provider>
    </ErrorBoundary>
  );
}

export function MediaInfoHomeJikan() {
  const params = useParams();
  const { jikanData } = useMediaInfo();

  const jikanCharacterFetcher = fetcherSenderUtils.createFetcherOLD(fetchersOLD.jikan.getCharactersByMediaId, () => params.type, () => params.id);
  const characterCacheType = fetcherSenderUtils.createDynamicCacheType({ "only-if-cached": () => requests.jikan.inOneSeconds() || jikanData.loading })
  const [jikanCharactersData] = fetcherSendersOLD.sendWithCacheTypeWithoutNullUpdates(characterCacheType, jikanCharacterFetcher);

  const jikanStaffFetcher = fetcherSenderUtils.createFetcherOLD(fetchersOLD.jikan.getStaffByMediaId, () => params.type, () => params.id);
  const staffCacheType = fetcherSenderUtils.createDynamicCacheType({ "only-if-cached": () => requests.jikan.inTwoSeconds() || jikanCharactersData.loading})
  const [jikanStaffData] = fetcherSendersOLD.sendWithCacheTypeWithoutNullUpdates(staffCacheType, jikanStaffFetcher);

  return (
    <>
      <Show when={jikanData()}>
        <Show when={jikanData().data.synopsis}>
          <div class="pg-media-jikan-desc">
            <Markdown text={jikanData().data.synopsis} singleLineBreaks={true} />
          </div>
        </Show>
        <Show when={jikanData().data.background}>
          <div>
            <strong>Background</strong>
            <Markdown text={jikanData().data.background} />
          </div>
        </Show>
        <Show when={jikanData().data.relations?.length}>
          <div class="relations">
            <h2>Relations</h2>
            <ol class="grid-column-auto-fill">
              <For each={jikanData().data.relations}>{relation => (
                <For each={relation.entry}>{entry => (
                  <li>
                    <A class="item" href={urlUtils.jikanMediaUrl(entry.type, { mal_id: entry.mal_id, title: entry.name })}>
                      <p class="name line-clamp">{entry.name}</p>
                      <p class="type">{relation.relation} ({formatingUtils.capitalize(entry.type)})</p>
                    </A>
                  </li>
                )}</For>
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={jikanCharactersData()}>
          <div>
            <A href="characters">
              <h2>Characters</h2>
            </A>
            <ol class="grid-column-auto-fill">
              <For each={jikanCharactersData().data.slice(0, 6)}>{({voice_actors, ...rest}) => (
                <MalCharacterCard
                  voiceActor={arrayUtils.findOrFirst(voice_actors, (({language}) => (language === localizations.Japanese)))}
                  {...rest}
                />
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={jikanStaffData()}>
          <div>
            <A href="staff">
              <h2>Staff</h2>
            </A>
            <ol class="grid-column-auto-fill">
              <For each={jikanStaffData().data.slice(0, 6)}>{({person, positions}) => (
                <MalStaffCard staff={person} positions={positions} />
              )}</For>
            </ol>
          </div>
        </Show>
        {console.log("jikan", jikanData())}
      </Show>
      {console.log("characters", jikanCharactersData())}
    </>
  );
}
