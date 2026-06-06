import { A, useParams } from "@solidjs/router";
import { MediaInfoContext, useMediaInfo } from "../../context/providers.js";
import { localizations, mediaStatuses, queries } from "../../collections/collections.js";
import { arrayUtils, formatingUtils, numberUtils, statusUtils, stringUtils, urlUtils } from "../../utils/utils.js";
import { createEffect, createRenderEffect, createSignal, ErrorBoundary, For, Match, on, Show, Switch } from "solid-js";
import "./MediaInfoJikan.scoped.css";
import { Trailer } from "../MediaPage/Trailer.jsx";
import { FavouriteToggle } from "../../components/FavouriteToggle.jsx";
import { Markdown } from "../../components/Markdown.jsx";
import { MalCharacterCard, MalStaffCard } from "../../components/Cards/Cards.scoped.jsx";
import { MediaPageScores } from "../../components/MediaPage/Scores.scoped.jsx";
import { ExternalLinks } from "../../components/media/ExternalLinks.scoped.jsx";
import { createTimer, formatMSToString } from "../../utils/timeUtils.js";
import { createAnilistFetcher, createJsonGetFetcher, sendAnilistFetcher, sendFetcher } from "../../utils/fetcherUtils.js";
import { isTypeFunction } from "../../utils/functionUtils.js";
import { setFetcherValueToStorage } from "../../utils/storageUtils.js";
import { MediaPageApiSwitcher } from "./MediaPageApiSwitcher.scoped.jsx";

export function MediaInfoWrapperJikan(props) {
  const params = useParams();

  const [time, startTimer, stopTimer] = createTimer();
  const [jikanData, setJikanData] = createSignal(undefined, { equals: false });
  let jikanFetcher, jikanController;
  createEffect(() => {
    jikanController?.abort();
    jikanController = new AbortController();

    jikanFetcher = createJsonGetFetcher(queries.myAnimeListMediaById, { id: params.id, type: params.type }, jikanController.signal);

    sendFetcher(jikanFetcher, {
      name: "Jikan media page",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === jikanFetcher.cacheKey) jikanController = null;
      },
      onStart: startTimer,
      onStop: stopTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === jikanFetcher.cacheKey) setJikanData(res);
      }
    });
  });

  const [anilistData, setAnilistData] = createSignal(undefined, { equals: false });
  const mutateBothAnilistData = mutate => {
    setAnilistData(data => {
      if (isTypeFunction(mutate)) mutate = mutate(data);
      setFetcherValueToStorage(mutate);
      return mutate;
    });
  }

  let aniFetcher, aniController;
  createEffect(() => {
    aniController?.abort();
    aniController = new AbortController();

    aniFetcher = createAnilistFetcher(queries.anilistMediaById, { idMal: params.id, type: params.type.toUpperCase() }, aniController.signal);

    sendAnilistFetcher(aniFetcher, {
      name: "Anilist media page (jikan)",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === aniFetcher.cacheKey) aniController = null;
      },
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === aniFetcher.cacheKey) setAnilistData(res);
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
              <img src={jikanData().data.data.images.webp.large_image_url} alt="Cover"/>
              <MediaPageApiSwitcher anilistData={anilistData} jikanData={jikanData} />
              <MediaPageScores/>
              <FavouriteToggle
                checked={isFavourite()}
                onChange={setIsFavourite}
                idType={anilistData()?.data.data.Media?.type}
                variableId={anilistData()?.data.data.Media?.id}
                anilistValue={anilistData()?.data.data.Media?.favourites}
                jikanValue={jikanData()?.data.data.favorites}
                mutateCache={mutateBothFavourite}
              />
              <Trailer id={jikanData()?.data.data.trailer?.youtube_id} site="youtube"/>
              <Show when={jikanData()?.data.data.studios?.length}>
                <div>
                  <h2>Studios</h2>
                  <ol>
                    <For each={jikanData()?.data.data.studios}>{studio => (
                      <li>
                        <a href={studio.url} target="_black">{studio.name}</a>
                      </li>
                    )}</For>
                  </ol>
                </div>
              </Show>
              <Show when={jikanData()?.data.data.producers?.length}>
                <div>
                  <h2>Producers</h2>
                  <ol>
                    <For each={jikanData()?.data.data.producers}>{producer => (
                      <li>
                        <a href={producer.url} target="_black">{producer.name}</a>
                      </li>
                    )}</For>
                  </ol>
                </div>
              </Show>
              <ExternalLinks externalLinks={jikanData()?.data.data.external}/>
            </aside>
          </Show>
          <div class="body">
            <Show when={jikanData()}>
              <p class="time">{formatMSToString(time())}</p>
              <div class="header">
                <h1>{jikanData().data.data.title}</h1>
                <ul class="flex-bullet-separator">
                  <li>
                    <Switch>
                      <Match when={jikanData().data.data.year && jikanData().data.data.season}>
                        <A
                          href={"/search/" + params.type + "?year=" + jikanData().data.data.year + "&season=" + jikanData().data.data.season + "&malSearch=true"}>{stringUtils.capitalize(jikanData().data.data.season)} {jikanData().data.data.year}</A>
                      </Match>
                      <Match when={jikanData().data.data.season}>
                        <A
                          href={"/search/" + params.type + "?season=" + jikanData().data.data.season + "&malSearch=true"}>{stringUtils.capitalize(jikanData().data.data.season)}</A>
                      </Match>
                      <Match when={jikanData().data.data.year}>
                        <A
                          href={"/search/" + params.type + "?year=" + jikanData().data.data.year + "&malSearch=true"}>{jikanData().data.data.year}</A>
                      </Match>
                      <Match
                        when={jikanData().data.data.aired?.prop?.from?.year || jikanData().data.data.published?.prop?.from?.year}>{year => (
                        <A href={"/search/" + params.type + "?year=" + year() + "&malSearch=true"}>{year()}</A>
                      )}</Match>
                      <Match
                        when={jikanData().data.data.aired?.prop?.to?.year || jikanData().data.data.published?.prop?.to?.year}>{year => (
                        <A href={"/search/" + params.type + "?year=" + year() + "&malSearch=true"}>{year()}</A>
                      )}</Match>
                      <Match when={jikanData().data.data.status == mediaStatuses.jikan.NotYetAired}>
                        <A href={"/search/" + params.type + "/tba"}>TBA</A>
                      </Match>
                    </Switch>
                  </li>
                  <li>
                    <A
                      href={"/search/" + params.type + "?format=" + jikanData().data.data.type.toLowerCase() + "&malSearch=true"}>{jikanData().data.data.type}</A>
                  </li>
                  <li>{statusUtils.jikanEnumToFlavorText(jikanData()?.data.data.status)}</li>
                </ul>
                <ul>
                  <Show when={jikanData()?.data.data.source}>
                    <li>Source:{" "}
                      <A href={"/search/" + params.type + "?source=" + jikanData().data.data.source}>
                        {jikanData()?.data.data.source}
                      </A>
                    </li>
                  </Show>
                  <li>Members: {numberUtils.numberCommas(jikanData().data.data.members || 0) || "N/A"}</li>
                  <li>Ranked: #{jikanData().data.data.rank || "N/A"}</li>
                  <li>Popularity: #{jikanData().data.data.popularity || "N/A"}</li>
                  <Show when={jikanData().data.data.authors?.length}>{size => (
                    <li>Author{formatingUtils.plural(size())}:
                      <For each={jikanData().data.data.authors}>{(author, i) => (
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

  const [charTime, startCharTimer, stopCharTimer] = createTimer();
  const [staffTime, startStaffTimer, stopStaffTimer] = createTimer();
  const [charData, setCharData] = createSignal(undefined, { equals: false });
  const [staffData, setStaffData] = createSignal(undefined, { equals: false });
  let charFetcher, charController, staffFetcher, staffController;
  createEffect(() => {
    charController?.abort();
    staffController?.abort();
    charController = new AbortController();
    staffController = new AbortController();

    charFetcher = createJsonGetFetcher(queries.myAnimeListMediaCharactersById, { id: params.id, type: params.type }, charController.signal);

    sendFetcher(charFetcher, {
      name: "Jikan characters",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === charFetcher.cacheKey) charController = null;
      },
      onStart: startCharTimer,
      onStop: stopCharTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === charFetcher.cacheKey) setCharData(res);
      }
    });

    if (params.type !== localizations.anime) return;
    staffFetcher = createJsonGetFetcher(queries.myAnimeListAnimeStaffById, { id: params.id }, charController.signal);

    sendFetcher(staffFetcher, {
      name: "Jikan staff",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === staffFetcher.cacheKey) staffController = null;
      },
      onStart: startStaffTimer,
      onStop: stopStaffTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === staffFetcher.cacheKey) setStaffData(res);
      }
    });
  });

  return (
    <>
      <Show when={jikanData()}>
        <Show when={jikanData().data.data.synopsis}>
          <div class="pg-media-jikan-desc">
            <Markdown text={jikanData().data.data.synopsis} singleLineBreaks={true} />
          </div>
        </Show>
        <Show when={jikanData().data.data.background}>
          <div>
            <strong>Background</strong>
            <Markdown text={jikanData().data.data.background} />
          </div>
        </Show>
        <Show when={jikanData().data.data.relations?.length}>
          <div class="relations">
            <h2>Relations</h2>
            <ol class="grid-column-auto-fill">
              <For each={jikanData().data.data.relations}>{relation => (
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
        <Show when={charData()}>
          <div>
            <p>{formatMSToString(charTime())}</p>
            <A href="characters">
              <h2>Characters</h2>
            </A>
            <ol class="grid-column-auto-fill">
              <For each={charData().data.data.slice(0, 6)}>{({voice_actors, ...rest}) => (
                <MalCharacterCard
                  voiceActor={arrayUtils.findOrFirst(voice_actors, (({language}) => (language === localizations.Japanese)))}
                  {...rest}
                />
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={staffData()}>
          <div>
            <p>{formatMSToString(staffTime())}</p>
            <A href="staff">
              <h2>Staff</h2>
            </A>
            <ol class="grid-column-auto-fill">
              <For each={staffData().data.data.slice(0, 6)}>{({person, positions}) => (
                <MalStaffCard staff={person} positions={positions} />
              )}</For>
            </ol>
          </div>
        </Show>
      </Show>
    </>
  );
}
