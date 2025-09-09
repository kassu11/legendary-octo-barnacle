import { A, useParams } from "@solidjs/router";
import { MediaInfoContext, useAuthentication } from "../context/providers";
import { fetchers, fetcherSenders } from "../collections/collections";
import { fetcherSenderUtils, numberUtils, stringUtils } from "../utils/utils";
import { ErrorBoundary } from "solid-js";
import "./MediaInfoJikan.scss";
import { MediaScores } from "./MediaPage/MediaScores";
import { Trailer } from "./MediaPage/Trailer";

export function MediaInfoWrapperJikan(props) {
  const params = useParams();
  const { accessToken } = useAuthentication();

  const jikanFetcher = fetcherSenderUtils.createFetcher(fetchers.jikan.getMediaById, () => params.type, () => params.id);
  const [jikanData] = fetcherSenders.sendWithNullUpdates(jikanFetcher);
  const anilistData = () => null;

  return (
    <ErrorBoundary fallback="Jikan media error">
      <Show when={jikanData()}>
        <MediaInfoContext.Provider value={{ anilistData, jikanData }}>
          <div class="pg-media-info-jikan">
            <aside class="left">
              {console.log(jikanData().data)}
              <img src={jikanData().data.images.webp.large_image_url} alt="Cover" />
              <MediaScores />
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
              {/* <ExternalLinks media={anilistData()?.data} loading={loading()} /> */}
              {/* <ExtraInfo media={anilistData()?.data} loading={loading()} /> */}
              {/* <Rankings rankings={anilistData()?.data.rankings} loading={loading()} /> */}
              {/* <Genres genres={anilistData()?.data.genres} type={anilistData()?.data.type} loading={loading()} /> */}
              {/* <Tags tags={anilistData()?.data.tags} type={anilistData()?.data.type} loading={loading()} /> */}
            </aside>
            <div class="body">
              <h1>{jikanData().data.title}</h1>
              <div class="header">
                <div>
                  <div>
                    <p>SCORE</p>
                    <p>{jikanData().data.score}</p>
                    <p>{numberUtils.numberCommas(jikanData().data.scored_by)}</p>
                  </div>
                  <p>Ranked #{jikanData().data.rank || "N/A"}</p>
                  <p>Popularity #{jikanData().data.popularity || "N/A"}</p>
                  <p>Members {numberUtils.numberCommas(jikanData().data.members || 0) || "N/A"}</p>
                </div>
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
                </Switch>
                <A href={"/search/" + params.type + "?format=" + jikanData().data.type.toLowerCase() + "&malSearch=true"}>{jikanData().data.type}</A>
                <ol>
                  <For each={jikanData().data.studios}>{studio => (
                    <li>
                      <a href={studio.url} target="_black">{studio.name}</a>
                    </li>
                  )}</For>
                </ol>
              </div>
              {props.children}
            </div>
          </div>
        </MediaInfoContext.Provider>
      </Show>
    </ErrorBoundary>
  );
}

export function MediaInfoHomeJikan(props) {
  return (
    <div>home</div>
  );
}
