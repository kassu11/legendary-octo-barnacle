import {  useParams, useSearchParams } from "@solidjs/router";
import { Switch, Match, Show, createSignal, createEffect, For, untrack } from "solid-js";
import "./index(studio).scss";
import { FavouriteToggle } from "../../components/FavouriteToggle.jsx";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { asserts, queries } from "../../collections/collections.js";
import { AnilistMediaCard } from "../../components/Cards/Cards.scoped.jsx";
import { MediaCardContainerScoped } from "../../components/Cards/MediaCardContainer.scoped.jsx";
import { Intersection } from "../../components/utils/Intersection.scoped.jsx";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils.js";
import { isTypeFunction } from "../../utils/functionUtils.js";
import { setFetcherValueToStorage } from "../../utils/storageUtils.js";
import { createTimer, formatMSToString } from "../../utils/timeUtils.js";

export function Studio() {
  const params = useParams();
  const [searchParams, _setSearchParams] = useSearchParams();
  const triggerSearchParams = leadingAndTrailing(debounce, _setSearchParams, 300);
  const [variables, setVariables] = createSignal();
  const [showYears, setShowYears] = createSignal(true);
  const [favourite, setFavourite] = createSignal(false);
  const [anilistStudioMediaTime, startAnilistStudioMediaTimer, stopAnilistStudioMediaTimer] = createTimer();
  const [anilistStudioMediaData, setAnilistStudioMediaData] = createSignal(undefined, { equals: false });
  let anilistStudioMediaFetcher, anilistStudioMediaController;
  createEffect(() => {
    anilistStudioMediaController?.abort();
    anilistStudioMediaController = new AbortController();

    const vars = variables();
    if (!vars) return;

    anilistStudioMediaFetcher = createAnilistFetcher(queries.anilistStudioById, { 
        ...vars,
        "page": vars.page || 1,
        "sort": vars.sort || "START_DATE_DESC",
        "onList": vars.onList,
        id: params.id
      }, anilistStudioMediaController.signal);

    sendAnilistFetcher(anilistStudioMediaFetcher, {
      name: "Anilist studio media",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === anilistStudioMediaFetcher.cacheKey) anilistStudioMediaController = null;
      },
      onStart: startAnilistStudioMediaTimer,
      onStop: stopAnilistStudioMediaTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== anilistStudioMediaFetcher.cacheKey) return;
        setAnilistStudioMediaData(res);
        setFavourite(res.data.data.Studio.isFavourite ?? false);
      }
    });
  });

  const mutateCache = mutate => {
    if(isTypeFunction(mutate)) mutate = mutate(untrack(anilistStudioMediaData));
    setFetcherValueToStorage(mutate);
  }

  createEffect(() => {
    setVariables({
      onList: searchParams.list ? searchParams.list === "true" : undefined,
      sort: searchParams.sort,
    });
  });

  return (
    <div class="studio-page">
      <Show when={anilistStudioMediaData()}>
        <div class="flex-space-between">
          <div>
            <p>{formatMSToString(anilistStudioMediaTime())}</p>
            <h1>{anilistStudioMediaData()?.data.data.Studio.name}</h1>
          </div>
          <FavouriteToggle 
            checked={favourite()} 
            variableId={params.id} 
            idType="STUDIO"
            anilistValue={anilistStudioMediaData()?.data.data.Studio.favourites} 
            onChange={setFavourite} 
            mutateCache={(isFavourite) => {
              mutateCache(res => {
                res.data.data.Studio.isFavourite = isFavourite;
                return res;
              });
            }} 
          />
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <label> 
            <input type="checkbox" checked={showYears()} onChange={e => setShowYears(e.target.checked)}/>
            {" "}Show years
          </label>
          <div>
            <label> 
              <input type="checkbox" name="list" value="false" checked={searchParams.list === "false"} onChange={e => triggerSearchParams({list: e.target.checked ? e.target.value : undefined})}/>
              {" "}Hide from my list
            </label>
            <br />
            <label> 
              <input type="checkbox" name="list" value="true" checked={searchParams.list === "true"} onChange={e => triggerSearchParams({list: e.target.checked ? e.target.value : undefined})}/>
              {" "}Only show my list
            </label>
          </div>
          <select name="sort" value={searchParams.sort || ""} onChange={e => triggerSearchParams({sort: e.target.value})}>
            <option value="DURATION">DURATION</option>
            <option value="DURATION_DESC">DURATION_DESC</option>
            <option value="END_DATE">END_DATE</option>
            <option value="END_DATE_DESC">END_DATE_DESC</option>
            <option value="EPISODES">EPISODES</option>
            <option value="EPISODES_DESC">EPISODES_DESC</option>
            <option value="FAVOURITES">FAVOURITES</option>
            <option value="FAVOURITES_DESC">FAVOURITES_DESC</option>
            <option value="FORMAT">FORMAT</option>
            <option value="FORMAT_DESC">FORMAT_DESC</option>
            <option value="ID">ID</option>
            <option value="ID_DESC">ID_DESC</option>
            <option value="POPULARITY">POPULARITY</option>
            <option value="POPULARITY_DESC">POPULARITY_DESC</option>
            <option value="SCORE">SCORE</option>
            <option value="SCORE_DESC">SCORE_DESC</option>
            <option value="START_DATE">START_DATE</option>
            <option value={searchParams.sort === "START_DATE_DESC" ? "START_DATE_DESC" : ""}>START_DATE_DESC</option>
            <option value="STATUS">STATUS</option>
            <option value="STATUS_DESC">STATUS_DESC</option>
            <option value="TITLE_ENGLISH">TITLE_ENGLISH</option>
            <option value="TITLE_ENGLISH_DESC">TITLE_ENGLISH_DESC</option>
            <option value="TITLE_NATIVE">TITLE_NATIVE</option>
            <option value="TITLE_NATIVE_DESC">TITLE_NATIVE_DESC</option>
            <option value="TITLE_ROMAJI">TITLE_ROMAJI</option>
            <option value="TITLE_ROMAJI_DESC">TITLE_ROMAJI_DESC</option>
            <option value="TRENDING">TRENDING</option>
            <option value="TRENDING_DESC">TRENDING_DESC</option>
            <option value="UPDATED_AT">UPDATED_AT</option>
            <option value="UPDATED_AT_DESC">UPDATED_AT_DESC</option>
          </select>
        </form>
        <MediaCardContainerScoped>
          <ol class="grid-column-auto-fill">
            <CharacterMediaPage variables={variables()} showYears={showYears} nestLevel={1} />
          </ol>
        </MediaCardContainerScoped>
      </Show>
    </div>
  )
} 

function CharacterMediaPage(props) {
  const params = useParams();
  const [variables, setVariables] = createSignal(undefined);
  const [anilistStudioMediaLoading, setAnilistStudioMediaLoading] = createSignal(false);
  const [anilistStudioMediaData, setAnilistStudioMediaData] = createSignal(undefined, { equals: false });
  let anilistStudioMediaFetcher, anilistStudioMediaController;

  createEffect(() => {
    anilistStudioMediaController?.abort();
    anilistStudioMediaController = new AbortController();

    const {nestLevel} = props;
    const vars = nestLevel === 1 ? props.variables : variables();
    if (!vars) return;


    anilistStudioMediaFetcher = createAnilistFetcher(queries.anilistStudioById, { 
        ...vars,
        "page": vars.page || 1,
        "sort": vars.sort || "START_DATE_DESC",
        "onList": vars.onList,
        id: params.id
      }, anilistStudioMediaController.signal);

    sendAnilistFetcher(anilistStudioMediaFetcher, {
      name: "Anilist studio media",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === anilistStudioMediaFetcher.cacheKey) anilistStudioMediaController = null;
      },
      onStart: () => setAnilistStudioMediaLoading(true),
      onStop: () => setAnilistStudioMediaLoading(false),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === anilistStudioMediaFetcher.cacheKey) setAnilistStudioMediaData(res.data.data.Studio.media);
      }
    });
  });

  return (
    <>
      <Intersection onIntersection={() => setVariables(props.variables)}>
        <Show when={anilistStudioMediaData()?.edges}>
          <MediaCards edges={anilistStudioMediaData().edges} showYears={props.showYears} lastMediaId={props.lastMediaId} lastYearGroup={props.lastYearGroup} />
        </Show>
      </Intersection>
      <Show when={!anilistStudioMediaLoading() && anilistStudioMediaData()?.pageInfo.hasNextPage}>
        <Show when={anilistStudioMediaData().edges} keyed={props.nestLevel === 1}>
          <Show when={props.variables}>{vars => (
            <CharacterMediaPage variables={{ ...vars(), page: (vars()?.page || 1) + 1 }} nestLevel={props.nestLevel + 1} showYears={props.showYears} language={props.language} lastMediaId={anilistStudioMediaData().edges.at(-1)?.node.id} lastYearGroup={anilistStudioMediaData().edges.at(-1)?.node.startDate?.year || "TBA"} />
          )}</Show>
        </Show>
      </Show>
    </>
  );
}



function YearHeader(props) {
  return (
    <Show when={props.showYears()}>
      <Switch>
        <Match when={props.index() === 0}>
          <Show when={props.lastYearGroup !== (props.edge.node.startDate?.year || "TBA")}>
            <li class="grid-full-span">
              <h3>{props.edge.node.startDate?.year || "TBA"}</h3>
            </li>
          </Show>
        </Match>
        <Match when={true}>
          <Show when={props.edges[props.index() - 1].node.startDate?.year !== props.edge.node.startDate?.year}>
            <li class="grid-full-span">
              <h3>{props.edge.node.startDate?.year || "TBA"}</h3>
            </li>
          </Show>
        </Match>
      </Switch>
    </Show>
  );
}


function MediaCards(props) {
  asserts.assertTrueOLD(props.showYears, "showYears signal is missing");

  const merge = (acc, edge) => {
    if (acc.at(-1)?.node.id !== edge.node.id && props.lastMediaId !== edge.node.id) {
      acc.push(edge);
    }
    return acc;
  }

  return (
    <For each={props.edges.reduce(merge, [])}>{(edge, i) => (
      <>
        <YearHeader showYears={props.showYears} lastYearGroup={props.lastYearGroup} edge={edge} edges={props.edges} index={i} />
        <AnilistMediaCard media={edge.node} />
      </>
    )}</For>
  );
}
