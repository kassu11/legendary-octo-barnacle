import { A, useParams, useSearchParams } from "@solidjs/router";
import api from "../utils/api";
import { Switch, Match, Show, createSignal, createEffect, on, For } from "solid-js";
import "./Studio.scss";
import { assert } from "../utils/assert";
import { formatTitleToUrl } from "../utils/formating";
import { FavouriteToggle } from "../components/FavouriteToggle";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { DoomScroll } from "../components/utils/DoomScroll";
import { useAuthentication } from "../context/providers";

export function Studio() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [searchParams, _setSearchParams] = useSearchParams();
  const triggerSearchParams = leadingAndTrailing(debounce, _setSearchParams, 300);
  const [variables, setVariables] = createSignal();
  const [showYears, setShowYears] = createSignal(true);
  const [studioInfo, { mutateCache: mutateStudioInfoCache }] = api.anilist.studioInfoAndMediaById(() => params.id, variables, accessToken);

  const [favourite, setFavourite] = createSignal(false);
  createEffect(on(studioInfo, info => {
    setFavourite(info?.data.isFavourite);
  }));


  createEffect(() => {
    setVariables({
      onList: searchParams.list ? searchParams.list === "true" : undefined,
      sort: searchParams.sort,
    });
  });

  return (
    <div class="studio-page">
      <Show when={studioInfo()}>
        <div class="flex-space-between">
          <h1>{studioInfo().data.name}</h1>
          <FavouriteToggle 
            checked={favourite()} 
            studioId={params.id} 
            favourites={studioInfo().data.favourites} 
            onChange={setFavourite} 
            mutateCache={(isFavourite) => {
              studioInfo().data.isFavourite = isFavourite;
              mutateStudioInfoCache(data => data);
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
        <ol class="grid-column-auto-fill">
          <CharacterMediaPage variables={variables()} studioInfo={studioInfo} showYears={showYears} nestLevel={1} />
        </ol>
      </Show>
    </div>
  )
} 

function CharacterMediaPage(props) {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [variables, setVariables] = createSignal(undefined);
  const [studioInfo] = api.anilist.studioInfoAndMediaById(() => params.id, props.nestLevel === 1 ? undefined : variables, accessToken);
  const studioInfo2 = props.studioInfo || studioInfo;

  return (
    <DoomScroll onIntersection={() => setVariables(props.variables)} fetchResponse={studioInfo2} loading={props.loading}>{fetchCooldown => (
      <>
        <MediaCards edges={studioInfo2().data.media.edges} showYears={props.showYears} lastMediaId={props.lastMediaId} lastYearGroup={props.lastYearGroup}/>
        <Show when={studioInfo2().data.media.pageInfo.hasNextPage}>
          <Show when={studioInfo2().data.media.edges} keyed={props.nestLevel === 1}>
            <Show when={props.variables}>
              {vars => (
                <Show when={fetchCooldown === false} fallback="Fetch cooldown">
                  <CharacterMediaPage
                    variables={{ ...vars(), page: (vars()?.page || 1) + 1 }} 
                    nestLevel={props.nestLevel + 1} 
                    showYears={props.showYears} 
                    language={props.language} 
                    lastMediaId={studioInfo2().data.media.edges.at(-1)?.node.id}
                    lastYearGroup={studioInfo2().data.media.edges.at(-1)?.node.startDate?.year || "TBA"}
                    loading={studioInfo2.loading} 
                  /> 
                </Show>
              )}
            </Show>
          </Show>
        </Show>
      </>
    )}</DoomScroll>
  );
}



function YearHeader(props) {
  return (
    <Show when={props.showYears()}>
      <Switch>
        <Match when={props.index() === 0}>
          <Show when={props.lastYearGroup !== (props.edge.node.startDate?.year || "TBA")}>
            <li class="full-span">
              <h3>{props.edge.node.startDate?.year || "TBA"}</h3>
            </li>
          </Show>
        </Match>
        <Match when={true}>
          <Show when={props.edges[props.index() - 1].node.startDate?.year !== props.edge.node.startDate?.year}>
            <li class="full-span">
              <h3>{props.edge.node.startDate?.year || "TBA"}</h3>
            </li>
          </Show>
        </Match>
      </Switch>
    </Show>
  );
}


function MediaCards(props) {
  assert(props.showYears, "showYears signal is missing");

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
        <li>
          <A href={"/" + edge.node.type.toLowerCase() + "/" + edge.node.id + "/" + formatTitleToUrl(edge.node.title.userPreferred)}>
            <img src={edge.node.coverImage.large} alt="Character" />
            <p>
              <Show when={edge.node.mediaListEntry?.status}>
                <div class="list-status" attr:data-status={edge.node.mediaListEntry.status} />
              </Show>
              {edge.node.title.userPreferred}
            </p>
          </A>
        </li>
      </>
    )}</For>
  );
}
