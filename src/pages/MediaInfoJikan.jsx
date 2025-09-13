import { A, useParams } from "@solidjs/router";
import { MediaInfoContext, useAuthentication, useMediaInfo } from "../context/providers";
import { fetchers, fetcherSenders, mediaStatuses } from "../collections/collections";
import { fetcherSenderUtils, formatingUtils, numberUtils, statusUtils, stringUtils, urlUtils } from "../utils/utils";
import { createRenderEffect, createSignal, ErrorBoundary, on } from "solid-js";
import "./MediaInfoJikan.scss";
import { MediaScores } from "./MediaPage/MediaScores";
import { Trailer } from "./MediaPage/Trailer";
import { FavouriteToggle } from "../components/FavouriteToggle";
import ExternalLinks from "../components/media/ExternalLinks";
import { Markdown } from "../components/Markdown";

export function MediaInfoWrapperJikan(props) {
  const params = useParams();
  const { accessToken } = useAuthentication();

  const jikanFetcher = fetcherSenderUtils.createFetcher(fetchers.jikan.getMediaById, () => params.type, () => params.id);
  const [jikanData] = fetcherSenders.sendWithNullUpdates(jikanFetcher);

  const anilistFetcher = fetcherSenderUtils.createFetcher(fetchers.anilist.getMediaByTypeAndMalId, accessToken, () => params.type, () => params.id);
  const [anilistData, { mutateBoth: mutateBothAnilistData }] = fetcherSenders.sendWithNullUpdates(anilistFetcher);

  const [isFavourite, setIsFavourite] = createSignal();
  createRenderEffect(on(anilistData, apiResponse => {
    setIsFavourite(apiResponse?.data?.isFavourite ?? false);
  }));

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
    <ErrorBoundary fallback="Jikan media error">
      <Show when={jikanData()}>
        <MediaInfoContext.Provider value={{ anilistData, jikanData }}>
          <div class="pg-media-info-jikan">
            <aside class="left">
              {console.log(jikanData().data)}
              <img src={jikanData().data.images.webp.large_image_url} alt="Cover" />
              <Show when={anilistData()?.data.id}>
                <A href={"/ani/" + params.type + "/" + anilistData()?.data.id + "/" + formatingUtils.titleToUrl(anilistData()?.data.title.userPreferred)}>Switch to ani</A>
              </Show>
              <MediaScores />
              <FavouriteToggle
                checked={isFavourite()}
                onChange={setIsFavourite}
                idType={anilistData()?.data.type}
                variableId={anilistData()?.data.id}
                anilistValue={anilistData()?.data.favourites}
                jikanValue={jikanData()?.data.favorites}
                mutateCache={mutateBothFavourite}
              />
              <Trailer id={jikanData()?.data.trailer?.youtube_id} site="youtube" />
              {/* <Show when={anilistData()?.data.studios.edges.filter(edge => edge.isMain)}>{edges => ( */}
              {/*   <Show when={edges().length > 0}> */}
              {/*     <div> */}
              {/*       <h2>Studios</h2> */}
              {/*       <ol> */}
              {/*         <For each={edges()}>{edge => ( */}
              {/*           <li> */}
              {/*             <A href={"/ani/studio/" + edge.node.id + "/" + formatTitleToUrl(edge.node.name)}> */}
              {/*               {edge.node.name} */}
              {/*             </A> */}
              {/*           </li> */}
              {/*         )}</For> */}
              {/*       </ol> */}
              {/*     </div> */}
              {/*   </Show> */}
              {/* )}</Show> */}
              {/* <Show when={anilistData()?.data.studios.edges.filter(edge => edge.isMain === false)}>{edges => ( */}
              {/*   <Show when={edges().length > 0}> */}
              {/*     <div> */}
              {/*       <h2>Producers</h2> */}
              {/*       <ol> */}
              {/*         <For each={edges()}>{edge => ( */}
              {/*           <li> */}
              {/*             <A href={"/ani/studio/" + edge.node.id + "/" + formatTitleToUrl(edge.node.name)}> */}
              {/*               {edge.node.name} */}
              {/*             </A> */}
              {/*           </li> */}
              {/*         )}</For> */}
              {/*       </ol> */}
              {/*     </div> */}
              {/*   </Show> */}
              {/* )}</Show> */}
              <ExternalLinks
                type={params.type}
                idMal={jikanData()?.data.mal_id}
                title={jikanData()?.data.title}
                idAni={anilistData()?.data.id}
                media={anilistData()?.data}
                externalLinks={jikanData()?.data.external}
              />
              {/* <ExtraInfo media={anilistData()?.data} loading={loading()} /> */}
              {/* <Rankings rankings={anilistData()?.data.rankings} loading={loading()} /> */}
              {/* <Genres genres={anilistData()?.data.genres} type={anilistData()?.data.type} loading={loading()} /> */}
              {/* <Tags tags={anilistData()?.data.tags} type={anilistData()?.data.type} loading={loading()} /> */}
            </aside>
            <div class="body">
              <h1>{jikanData().data.title}</h1>
              <ul class="flex-bullet-separator">
                <li>
                  <Switch>
                    <Match when={jikanData().data.year && jikanData().data.season}>
                      <A href={"/search/" + params.type + "?year=" + jikanData().data.year + "&season=" + jikanData().data.season + "&malSearch=true"}>{stringUtils.capitalize(jikanData().data.season)} {jikanData().data.year}</A>
                    </Match>
                    <Match when={jikanData().data.season}>
                      <A href={"/search/" + params.type + "?season=" + jikanData().data.season + "&malSearch=true"}>{stringUtils.capitalize(jikanData().data.season)}</A>
                    </Match>
                    <Match when={jikanData().data.year}>
                      <A href={"/search/" + params.type + "?year=" + jikanData().data.year + "&malSearch=true"}>{jikanData().data.year}</A>
                    </Match>
                    <Match when={jikanData().data.aired?.prop?.from?.year}>{year => (
                      <A href={"/search/" + params.type + "?year=" + year() + "&malSearch=true"}>{year()}</A>
                    )}</Match>
                    <Match when={jikanData().data.aired?.prop?.to?.year}>{year => (
                      <A href={"/search/" + params.type + "?year=" + year() + "&malSearch=true"}>{year()}</A>
                    )}</Match>
                    <Match when={jikanData().data.status == mediaStatuses.jikan.NotYetAired}>
                      <A href={"/search/" + params.type + "/tba" }>TBA</A>
                    </Match>
                  </Switch>
                </li>
                <li>
                  <A href={"/search/" + params.type + "?format=" + jikanData().data.type.toLowerCase() + "&malSearch=true"}>{jikanData().data.type}</A>
                </li>
                <li>{statusUtils.jikanEnumToFlavorText(jikanData()?.data.status)}</li>
              </ul>
              <div class="header">
                <ul>
                  <Show when={jikanData()?.data.source}>
                    <li>Source: 
                      <A href={"/search/" + params.type + "?source=" + jikanData().data.source}>
                        {jikanData()?.data.source}
                      </A>
                    </li>
                  </Show>
                  <li>Members: {numberUtils.numberCommas(jikanData().data.members || 0) || "N/A"}</li>
                  <li>Ranked #{jikanData().data.rank || "N/A"}</li>
                  <li>Popularity #{jikanData().data.popularity || "N/A"}</li>
                </ul>
              </div>
                <ol>
                  <For each={jikanData().data.studios}>{studio => (
                    <li>
                      <a href={studio.url} target="_black">{studio.name}</a>
                    </li>
                  )}</For>
                </ol>
              {props.children}
            </div>
          </div>
        </MediaInfoContext.Provider>
      </Show>
    </ErrorBoundary>
  );
}

export function MediaInfoHomeJikan() {
  const { jikanData } = useMediaInfo();
  return (
    <>
      <Show when={jikanData().data.synopsis}>
        <Markdown text={jikanData().data.synopsis} />
      </Show>
      <Show when={jikanData().data.background}>
        <br />
        <p>Background</p>
        <Markdown text={jikanData().data.background} />
      </Show>
      <div>home</div>
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
    </>
  );
}
