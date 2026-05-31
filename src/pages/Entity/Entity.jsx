import { A, useParams, useSearchParams } from "@solidjs/router";
import { Switch, Match, Show, createSignal, createEffect, For, createMemo, untrack } from "solid-js";
import { OldMarkdownComponent } from "../../components/Markdown.jsx";
import "./Entity.scss";
import { capitalize, formatAnilistDate, formatTitleToUrl, mediaUrl } from "../../utils/formating.js";
import { FavouriteToggle } from "../../components/FavouriteToggle.jsx";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { wrapToArray } from "../../utils/arrays.js";
import { asserts, queries } from "../../collections/collections.js";
import { Intersection } from "../../components/utils/Intersection.scoped.jsx";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils.js";
import { createTimer, formatMSToString } from "../../utils/timeUtils.js";
import { isTypeFunction } from "../../utils/functionUtils.js";
import { setFetcherValueToStorage } from "../../utils/storageUtils.js";

export function Character() {
  const params = useParams();
  const [anilistCharacterInfoTime, startAnilistCharacterInfoTimer, stopAnilistCharacterInfoTimer] = createTimer();
  const [anilistCharacterInfoData, setAnilistCharacterInfoData] = createSignal(undefined, { equals: false });
  let anilistCharacterInfoFetcher, anilistCharacterInfoController;
  createEffect(() => {
    anilistCharacterInfoController?.abort();
    anilistCharacterInfoController = new AbortController();

    anilistCharacterInfoFetcher = createAnilistFetcher(queries.anilistCharacterById, { id: params.id }, anilistCharacterInfoController.signal);

    sendAnilistFetcher(anilistCharacterInfoFetcher, {
      name: "Anilist character info",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === anilistCharacterInfoFetcher.cacheKey) anilistCharacterInfoController = null;
      },
      onStart: startAnilistCharacterInfoTimer,
      onStop: stopAnilistCharacterInfoTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === anilistCharacterInfoFetcher.cacheKey) setAnilistCharacterInfoData(res);
      }
    });
  });

  const mutateCache = mutate => {
    if(isTypeFunction(mutate)) mutate = mutate(untrack(anilistCharacterInfoData));
    setFetcherValueToStorage(mutate);
  }

  return (
    <Body type="CHARACTER" entityInfo={anilistCharacterInfoData()?.data.data.Character} mutateEntityInfoCache={mutateCache} time={formatMSToString(anilistCharacterInfoTime())} />
  );
}

export function Staff() {
  const params = useParams();
  const [anilistStaffInfoTime, startAnilistStaffInfoTimer, stopAnilistStaffInfoTimer] = createTimer();
  const [anilistStaffInfoData, setAnilistStaffInfoData] = createSignal(undefined, { equals: false });
  let anilistStaffInfoFetcher, anilistStaffInfoController;
  createEffect(() => {
    anilistStaffInfoController?.abort();
    anilistStaffInfoController = new AbortController();

    anilistStaffInfoFetcher = createAnilistFetcher(queries.anilistStaffById, { id: params.id }, anilistStaffInfoController.signal);

    sendAnilistFetcher(anilistStaffInfoFetcher, {
      name: "Anilist staff info",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === anilistStaffInfoFetcher.cacheKey) anilistStaffInfoController = null;
      },
      onStart: startAnilistStaffInfoTimer,
      onStop: stopAnilistStaffInfoTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === anilistStaffInfoFetcher.cacheKey) setAnilistStaffInfoData(res);
      }
    });
  });

  const mutateCache = mutate => {
    if(isTypeFunction(mutate)) mutate = mutate(untrack(anilistStaffInfoData));
    setFetcherValueToStorage(mutate);
  }

  return (
    <Body type="STAFF" entityInfo={anilistStaffInfoData()?.data.data.Staff} mutateEntityInfoCache={mutateCache} time={formatMSToString(anilistStaffInfoTime())} /> 
  );
}

function Body(props) {
  const [searchParams, _setSearchParams] = useSearchParams();
  const triggerSearchParams = leadingAndTrailing(debounce, _setSearchParams, 300);
  const [variables, setVariables] = createSignal();

  const [favourite, setFavourite] = createSignal(false);
  createEffect(() => setFavourite(props.entityInfo?.isFavourite ?? false));

  createEffect(() => {
    setVariables({
      onList: searchParams.list ? searchParams.list === "true" : undefined,
      sort: searchParams.sort,
    });
  });

  createEffect(() => {
    const name = props.entityInfo?.name.userPreferred;
    if (!name) return;
    document.title = `${capitalize(props.type)} - ${name} - LOB`
  });

  return (
    <div class="entity-page">
      <Show when={props.entityInfo}>
        <div className="entity-page-header">
          <img src={props.entityInfo.image.large} class="cover" alt={capitalize(props.type) + " profile"} />
          <div className="row">
            <div>
              <p>{props.time}</p>
              <h1>{props.entityInfo.name.userPreferred}</h1>
            </div>
            <p class="entity-page-alternative-names">{[...wrapToArray(props.entityInfo.name.native), ...wrapToArray(props.entityInfo.name.alternative)].join(", ")}</p>
            <FavouriteToggle 
              checked={favourite()} 
              idType={props.type} 
              variableId={props.entityInfo.id} 
              anilistValue={props.entityInfo.favourites} 
              onChange={setFavourite} 
              mutateCache={(isFavourite) => {
                props.entityInfo.isFavourite = isFavourite;
                props.mutateEntityInfoCache(data => data);
              }} 
            />
          </div>
          <ul class="description">
            <Show when={formatAnilistDate(props.entityInfo.dateOfBirth)}>
              <li><strong>Birth:</strong> {formatAnilistDate(props.entityInfo.dateOfBirth)}</li>
            </Show>
            <Show when={props.entityInfo.age}>
              <li><strong>Age:</strong> {props.entityInfo.age}</li>
            </Show>
            <Show when={props.entityInfo.gender}>
              <li><strong>Gender:</strong> {props.entityInfo.gender}</li>
            </Show>
            <Show when={props.entityInfo.yearsActive?.length}>
              <li>
                <strong>Active years: </strong> 
                {props.entityInfo.yearsActive.join("-")}
                <Switch>
                  <Match when={props.entityInfo.dateOfDeath?.year && props.entityInfo.yearsActive.at(-1) !== props.entityInfo.dateOfDeath?.year}>
                    -{props.entityInfo.dateOfDeath.year}
                  </Match>
                  <Match when={props.entityInfo.dateOfDeath?.year == null}>
                    -Present
                  </Match>
                </Switch>
              </li>
            </Show>
            <Show when={props.entityInfo.homeTown}>
              <li><strong>Home town:</strong> {props.entityInfo.homeTown}</li>
            </Show>
            <Show when={props.entityInfo.bloodType}>
              <li><strong>Blood type:</strong> {props.entityInfo.bloodType}</li>
            </Show>
            <Show when={props.entityInfo.description}>
              <li>
                <OldMarkdownComponent>{props.entityInfo.description}</OldMarkdownComponent>
              </li>
            </Show>
          </ul>
        </div>
        <form class="entity-page-form" onSubmit={e => e.preventDefault()}>
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
            <option value="CHAPTERS">CHAPTERS</option>
            <option value="CHAPTERS_DESC">CHAPTERS_DESC</option>
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
            <option value={
              (() => {
                if (props.type === "CHARACTER" && searchParams.sort !== "POPULARITY_DESC") {
                  return "";
                }
                return"POPULARITY_DESC";
              })()
            }>POPULARITY_DESC</option>
            <option value="SCORE">SCORE</option>
            <option value="SCORE_DESC">SCORE_DESC</option>
            <option value="SEARCH_MATCH">SEARCH_MATCH</option>
            <option value="START_DATE">START_DATE</option>
            <option value={
              (() => {
                if (props.type === "STAFF" && searchParams.sort !== "START_DATE_DESC") {
                  return "";
                }
                return "START_DATE_DESC";
              })()
            }>START_DATE_DESC</option>
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
            <option value="TYPE">TYPE</option>
            <option value="TYPE_DESC">TYPE_DESC</option>
            <option value="UPDATED_AT">UPDATED_AT</option>
            <option value="UPDATED_AT_DESC">UPDATED_AT_DESC</option>
            <option value="VOLUMES">VOLUMES</option>
            <option value="VOLUMES_DESC">VOLUMES_DESC</option>
          </select>
        </form>
      </Show>
      <Switch>
        <Match when={props.type === "STAFF"}>
          <SubSection variables={variables()} type="CHARACTER" showYears={true} title="Characters" />
          <SubSection variables={variables()} type="ANIME" title="Anime staff roles" />
          <SubSection variables={variables()} type="MANGA" title="Manga staff roles" />
        </Match>
        <Match when={props.type === "CHARACTER"}>
          <SubSection variables={variables()} type="MEDIA" title="Media entries" />
        </Match>
      </Switch>
    </div>
  )
} 

function SubSection(props) {
  asserts.assertThruthy(props.title, "title missing");
  asserts.assertThruthy(props.title, "title missing");
  asserts.assertThruthy(props.type, "type missing");

  const [showYears, setShowYears] = createSignal(props.showYears || false);
  const [visible, setVisible] = createSignal(false);
  const [languages, setLanguages] = createSignal([]);
  const [language, setLanguage] = createSignal(["Japanese"]);

  if (props.type === "MEDIA") {
    createEffect(() => {
      if (languages().length) {
        setLanguage(languages().find(l => l === "Japanese") || languages().find(l => l === "Chinese") || languages()[0]);
      }
    });
  }

  return (
    <details class="entity-page-details" classList={{hidden: !visible()}} open>
      <summary class="entity-page-summary">
        <h2>{props.title}</h2>
        <div>
          <label> 
            <input type="checkbox" checked={showYears()} onChange={e => {
              e.preventDefault();
              setShowYears(e.target.checked);
            }}/>
            {" "}Show years
          </label>
          <Show when={props.type === "MEDIA" && languages().length}>
            <select value={language()} onInput={e => setLanguage(e.target.value)}>
              <For each={languages()}>{lang => (
                <option value={lang}>{lang}</option>
              )}</For>
            </select>
          </Show>
        </div>
      </summary>
      <ol class="grid-column-auto-fill">
        <Switch>
          <Match when={props.type === "CHARACTER"}>
            <StaffCharacterPage setVisible={setVisible} variables={props.variables} showYears={showYears} nestLevel={1} />
          </Match>
          <Match when={props.type === "ANIME"}>
            <StaffMediaRolePage setVisible={setVisible} variables={props.variables} type="ANIME" showYears={showYears} nestLevel={1} />
          </Match>
          <Match when={props.type === "MANGA"}>
            <StaffMediaRolePage setVisible={setVisible} variables={props.variables} type="MANGA" showYears={showYears} nestLevel={1} />
          </Match>
          <Match when={props.type === "MEDIA"}>
            <CharacterMediaPage 
              setVisible={setVisible} 
              variables={props.variables} 
              showYears={showYears} 
              setLanguages={setLanguages} 
              language={language} 
              nestLevel={1} 
            />
          </Match>
        </Switch>
      </ol>
    </details>
  );
}

function CharacterMediaPage(props) {
  const params = useParams();
  const [variables, setVariables] = createSignal(undefined);
  const [anilistCharacterInfoLoading, setAnilistCharacterInfoLoading] = createSignal(false);
  const [anilistCharacterInfoData, setAnilistCharacterInfoData] = createSignal(undefined, { equals: false });
  let anilistCharacterInfoFetcher, anilistCharacterInfoController;
  createEffect(() => {
    anilistCharacterInfoController?.abort();
    anilistCharacterInfoController = new AbortController();

    const { nestLevel } = props;
    const vars = nestLevel === 1 ? props.variables : variables();

    if (!vars) return;

    anilistCharacterInfoFetcher = createAnilistFetcher(queries.anilistCharacterById, {
      ...vars, 
      "page": vars.page || 1,
      "sort": vars.sort || "POPULARITY_DESC",
      "onList": vars.onList,
      "withRoles": vars.withRoles || true,
      id: params.id,
    }, anilistCharacterInfoController.signal);

    sendAnilistFetcher(anilistCharacterInfoFetcher, {
      name: "Anilist character info",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === anilistCharacterInfoFetcher.cacheKey) anilistCharacterInfoController = null;
      },
      onStart: () => setAnilistCharacterInfoLoading(true),
      onStop: () => setAnilistCharacterInfoLoading(false),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== anilistCharacterInfoFetcher.cacheKey) return;
        const { media } = res.data.data.Character;
        setAnilistCharacterInfoData(media);

        if (nestLevel !== 1) return;
        props.setVisible(media.edges.length > 0);

        const newLanguages = new Set();
        for (const { voiceActorRoles } of media.edges) {
          for (const { voiceActor } of voiceActorRoles) {
            newLanguages.add(voiceActor.language);
          }
        }

        props.setLanguages([...newLanguages]);
      }
    });
  });


  return (
    <>
      <Intersection onIntersection={() => setVariables(props.variables)}>
        <Show when={anilistCharacterInfoData()}>
          <CharacterAndActorCards language={props.language} edges={anilistCharacterInfoData().edges} showYears={props.showYears} lastYearGroup={props.lastYearGroup} />
        </Show>
      </Intersection>
      <Show when={!anilistCharacterInfoLoading() && anilistCharacterInfoData()?.pageInfo.hasNextPage}>
        <Show when={anilistCharacterInfoData().edges} keyed={props.nestLevel === 1}>
          <Show when={props.variables}>{vars => (
            <CharacterMediaPage variables={{ ...vars(), page: (vars()?.page || 1) + 1 }} nestLevel={props.nestLevel + 1} showYears={props.showYears} language={props.language} lastYearGroup={anilistCharacterInfoData().edges.at(-1)?.node.startDate?.year || "TBA"} />
          )}</Show>
        </Show>
      </Show>
    </>
  );
}

function StaffCharacterPage(props) {
  const params = useParams();
  const [variables, setVariables] = createSignal(undefined);
  const [anilistStaffCharacterLoading, setAnilistStaffCharacterLoading] = createSignal(false);
  const [anilistStaffCharacterData, setAnilistStaffCharacterData] = createSignal(undefined, { equals: false });
  let anilistStaffCharacterFetcher, anilistStaffCharacterController;
  createEffect(() => {
    anilistStaffCharacterController?.abort();
    anilistStaffCharacterController = new AbortController();

    const { nestLevel } = props;
    const vars = nestLevel === 1 ? props.variables : variables();
    if (!vars) return;

    anilistStaffCharacterFetcher = createAnilistFetcher(queries.anilistStaffById, { 
        ...vars, 
        "characterPage": vars.characterPage || 1,
        "sort": vars.sort || "START_DATE_DESC",
        "onList": vars.onList,
        "withCharacterRoles": true,
        id: params.id,
      }, anilistStaffCharacterController.signal);

    sendAnilistFetcher(anilistStaffCharacterFetcher, {
      name: "Anilist staff media",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === anilistStaffCharacterFetcher.cacheKey) anilistStaffCharacterController = null;
      },
      onStart: () => setAnilistStaffCharacterLoading(true),
      onStop: () => setAnilistStaffCharacterLoading(false),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== anilistStaffCharacterFetcher.cacheKey) return;

        const media = res.data.data.Staff.characterMedia;
        setAnilistStaffCharacterData(media);
        if (nestLevel === 1) props.setVisible(media.edges.length > 0);
      }
    });
  });

  return (
    <>
      <Intersection onIntersection={() => setVariables(props.variables)}>
        <Show when={anilistStaffCharacterData()?.edges}>
          <CharacterAndMediaCards edges={anilistStaffCharacterData().edges} showYears={props.showYears} lastYearGroup={props.lastYearGroup} />
        </Show>
      </Intersection>
      <Show when={!anilistStaffCharacterLoading() && anilistStaffCharacterData()?.pageInfo.hasNextPage}>
        <Show when={anilistStaffCharacterData().edges} keyed={props.nestLevel === 1}>
          <Show when={props.variables}>{vars => (
            <StaffCharacterPage variables={{ ...vars(), characterPage: (vars()?.characterPage || 1) + 1 }} nestLevel={props.nestLevel + 1} showYears={props.showYears} lastYearGroup={anilistStaffCharacterData().edges.at(-1)?.node.startDate?.year || "TBA"} />
          )}</Show>
        </Show>
      </Show>
    </>
  );
}

function StaffMediaRolePage(props) {
  asserts.assertThruthy(props.type, "Type is missing");
  asserts.assertThruthy(props.nestLevel, "nestLevel is missing");

  const params = useParams();
  const [variables, setVariables] = createSignal(undefined);

  const lastId = createMemo(() => props.lastMediaId);
  const [anilistStaffMediaLoading, setAnilistStaffMediaLoading] = createSignal(undefined, { equals: false });
  const [anilistStaffMediaData, setAnilistStaffMediaData] = createSignal(undefined, { equals: false });
  let anilistStaffMediaFetcher, anilistStaffMediaController;
  createEffect(() => {
    anilistStaffMediaController?.abort();
    anilistStaffMediaController = new AbortController();

    const { id } = params;
    const { type, nestLevel } = props;
    const lastMediaId = lastId();
    const vars = nestLevel === 1 ? props.variables : variables();

    if (!vars || !type) return;

    anilistStaffMediaFetcher = createAnilistFetcher(queries.anilistStaffById, {
      ...vars,
      "staffPage": vars.staffPage || 1,
      "sort": vars.sort ? [vars.sort, "TITLE_ENGLISH"].flat() : "START_DATE_DESC",
      "onList": vars.onList,
      "withStaffRoles": true,
      id,
      type,
    }, anilistStaffMediaController.signal);

    sendAnilistFetcher(anilistStaffMediaFetcher, {
      name: "Anilist staff media",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === anilistStaffMediaFetcher.cacheKey) anilistStaffMediaController = null;
      },
      onStart: () => setAnilistStaffMediaLoading(true),
      onStop: () => setAnilistStaffMediaLoading(false),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== anilistStaffMediaFetcher.cacheKey) return;
        const media = structuredClone(res.data.data.Staff.staffMedia);

        if (nestLevel === 1) {
          props.setVisible(media.edges.length > 0);
        }

        // Merge same media entries
        if (lastMediaId && media.edges.length) {
          const { edges } = media;
          const removedEdges = [];

          while (edges.length && edges[0]?.node.id === lastMediaId) {
            removedEdges.push(edges.shift());
          }

          if (removedEdges.length > 0) props.mutate(response => {
            response.edges = [...response.edges, ...removedEdges];
            return { ...response };
          });
        }

        setAnilistStaffMediaData(media);
      }
    });
  });

  return (
    <>
      <Intersection onIntersection={() => setVariables(props.variables)}>
        <Show when={anilistStaffMediaData()?.edges} keyed>
          <MediaCards edges={anilistStaffMediaData().edges} showYears={props.showYears} lastYearGroup={props.lastYearGroup} />
        </Show>
      </Intersection>
      <Show when={!anilistStaffMediaLoading() && anilistStaffMediaData()?.pageInfo.hasNextPage}>
        <Show when={props.variables} keyed={props.nestLevel === 1}>
          <Show when={props.variables}>{vars => (
            <StaffMediaRolePage variables={{ ...vars(), staffPage: (vars()?.staffPage || 1) + 1 }} nestLevel={props.nestLevel + 1} showYears={props.showYears} mutate={setAnilistStaffMediaData} type={props.type} lastYearGroup={anilistStaffMediaData().edges.at(-1)?.node.startDate?.year || "TBA"} lastMediaId={anilistStaffMediaData().edges.at(-1)?.node.id} />
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
            <li class="entity-page-grid-year-header">
              <h3>{props.edge.node.startDate?.year || "TBA"}</h3>
            </li>
          </Show>
        </Match>
        <Match when={true}>
          <Show when={props.edges[props.index() - 1].node.startDate?.year !== props.edge.node.startDate?.year}>
            <li class="entity-page-grid-year-header">
              <h3>{props.edge.node.startDate?.year || "TBA"}</h3>
            </li>
          </Show>
        </Match>
      </Switch>
    </Show>
  );
}

function CharacterAndActorCards(props) {
  asserts.assertThruthy(props.showYears, "showYears signal is missing");
  asserts.assertThruthy(props.language, "language signal is missing");

  return ( 
    <For each={props.edges}>{(edge, i) => (
      <>
        <YearHeader showYears={props.showYears} lastYearGroup={props.lastYearGroup} edge={edge} edges={props.edges} index={i} />
        <Show when={edge.voiceActorRoles.filter(role => role.voiceActor.language === props.language())}>{roles => (
          <li class="entity-page-media-voice-actor">
            <A href={mediaUrl(edge.node)}>
              <img src={edge.node.coverImage.large} alt={capitalize(edge.node.type) + " cover"} />
            </A>
            <A href={mediaUrl(edge.node)}>
              <p>
                <Show when={edge.node.mediaListEntry?.status}>
                  <div class="list-status" attr:data-status={edge.node.mediaListEntry.status} />
                </Show>
                {edge.node.title.userPreferred} 
                <Show when={edge.characterRole}>
                  <span class="role"> {capitalize(edge.characterRole)}</span>
                </Show>
              </p>
            </A>
            <Show when={roles().length}>
              <ol>
                <For each={roles()}>{role => (
                  <li>
                    <A class="actor" href={"/ani/staff/" + role.voiceActor.id + "/" + formatTitleToUrl(role.voiceActor.name.userPreferred)}>
                      <span>{role.voiceActor.name.userPreferred}</span>
                      <Show when={role.roleNotes}>
                        <span class="role"> ({role.roleNotes})</span>
                      </Show>
                      <Show when={role.dubGroup}>
                        <span class="role"> ({role.dubGroup})</span>
                      </Show>
                      <img src={role.voiceActor.image.large} alt="Staff profile" class="background"/>
                    </A>
                  </li>
                )}</For>
              </ol>
            </Show>
          </li>
        )}</Show>
      </>
    )}</For>
  );
}

function MediaCards(props) {
  asserts.assertThruthy(props.showYears, "showYears signal is missing");
  const combine = (acc, edge) => {
    const last = acc.at(-1);
    if (last?.node.id !== edge.node.id) {
      edge.staffRoles = [edge.staffRole];
      acc.push(edge);
    } else if(last?.staffRoles) {
      last.staffRoles.push(edge.staffRole);
    }
    return acc;
  };
  
  return ( 
    <For each={props.edges.reduce(combine, [])}>{(edge, i) => (
      <>
        <YearHeader showYears={props.showYears} lastYearGroup={props.lastYearGroup} edge={edge} edges={props.edges} index={i} />
        <li>
          <A href={mediaUrl(edge.node)}>
            <img src={edge.node.coverImage.large} alt="Character" class="background"/>
            <p>
              <Show when={edge.node.mediaListEntry?.status}>
                <div class="list-status" attr:data-status={edge.node.mediaListEntry.status} />
              </Show>
              {edge.node.title.userPreferred}
            </p>
            <Show when={edge.staffRoles}>
              <ol>
                <For each={edge.staffRoles}>{role => (
                  <li>{role}</li>
                )}</For>
              </ol>
            </Show>
          </A>
        </li>
      </>
    )}</For>
  );
}

function CharacterAndMediaCards(props) {
  asserts.assertThruthy(props.showYears, "showYears signal is missing");

  return ( 
    <For each={props.edges}>{(edge, i) => (
      <For each={edge.characters}>{character => (
        <Show when={character}>
          <YearHeader showYears={props.showYears} lastYearGroup={props.lastYearGroup} edge={edge} edges={props.edges} index={i} />
          <li>
            <div class="entity-page-character-cover">
              <A href={"/ani/character/" + character.id + "/" + formatTitleToUrl(character.name.userPreferred)}>
                <img src={character.image.large} alt="Character" class="background"/>
              </A>
              <A class="media" href={mediaUrl(edge.node)}>
                <img src={edge.node.coverImage.large} alt={capitalize(edge.node.type) + " cover"} />
              </A>
            </div>
            <A href={"/ani/character/" + character.id + "/" + formatTitleToUrl(character.name.userPreferred)}>
              <span>{character.name.userPreferred}</span>
              <span class="role"> {capitalize(edge.characterRole)}</span>
            </A>
            <A href={mediaUrl(edge.node)}>
              <p>
                <Show when={edge.node.mediaListEntry?.status}>
                  <div class="list-status" attr:data-status={edge.node.mediaListEntry.status} />
                </Show>
                {edge.node.title.userPreferred}
              </p>
            </A>
          </li>
        </Show>
      )}</For>
    )}</For>
  );
}
