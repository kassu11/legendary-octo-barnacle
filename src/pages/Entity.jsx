import { A, useParams, useSearchParams } from "@solidjs/router";
import api from "../utils/api";
import { Switch, Match, Show, createSignal, createEffect, on, For } from "solid-js";
import { Markdown } from "../components/Markdown";
import "./Entity.scss";
import { assert } from "../utils/assert";
import { capitalize, formatAnilistDate, formatTitleToUrl } from "../utils/formating";
import { useAuthentication } from "../context/AuthenticationContext";
import { FavouriteToggle } from "../components/FavouriteToggle";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { DoomScroll } from "../components/utils/DoomScroll";

export function Character() {
  const params = useParams();
  const [characterInfo, { mutateCache: mutateCharacterInfoCache }] = api.anilist.characterInfoById(() => params.id);

  return (
    <Body type="CHARACTER" entityInfo={characterInfo} mutateEntityInfoCache={mutateCharacterInfoCache} />
  );
}

export function Staff() {
  const params = useParams();
  const [staffInfo, { mutateCache: mutateStaffInfoCache }] = api.anilist.staffInfoById(() => params.id);

  return (
    <Body type="STAFF" entityInfo={staffInfo} mutateEntityInfoCache={mutateStaffInfoCache} />
  );
}

function Body(props) {
  const params = useParams();
  const [searchParams, _setSearchParams] = useSearchParams();
  const triggerSearchParams = leadingAndTrailing(debounce, _setSearchParams, 300);
  const [variables, setVariables] = createSignal();

  const [favourite, setFavourite] = createSignal(false);
  createEffect(on(props.entityInfo, info => {
    setFavourite(info?.data.isFavourite);
  }));


  createEffect(() => {
    setVariables({
      onList: searchParams.list === "true" || undefined,
      sort: searchParams.sort,
    });
  });

  return (
    <div class="entity-page">
      <Show when={props.entityInfo()}>
        <div className="entity-page-header">
          <img src={props.entityInfo().data.image.large} class="cover" alt={capitalize(props.type) + " profile"} />
          <div className="row">
            <h1>{props.entityInfo().data.name.userPreferred}</h1>
            <p class="entity-page-alternative-names">{[props.entityInfo().data.name.native, ...props.entityInfo().data.name.alternative].join(", ")}</p>
            <FavouriteToggle 
              checked={favourite()} 
              staffId={props.type === "STAFF" ? params.id : undefined} 
              characterId={props.type === "CHARACTER" ? params.id : undefined} 
              favourites={props.entityInfo().data.favourites} 
              onChange={setFavourite} 
              mutateCache={(isFavourite) => {
                props.entityInfo().data.isFavourite = isFavourite;
                props.mutateEntityInfoCache(data => data);
              }} 
            />
          </div>
          <ul class="description">
            <Show when={formatAnilistDate(props.entityInfo().data.dateOfBirth)}>
              <li><strong>Birth:</strong> {formatAnilistDate(props.entityInfo().data.dateOfBirth)}</li>
            </Show>
            <Show when={props.entityInfo().data.age}>
              <li><strong>Age:</strong> {props.entityInfo().data.age}</li>
            </Show>
            <Show when={props.entityInfo().data.gender}>
              <li><strong>Gender:</strong> {props.entityInfo().data.gender}</li>
            </Show>
            <Show when={props.entityInfo().data.yearsActive?.length}>
              <li>
                <strong>Active years: </strong> 
                {props.entityInfo().data.yearsActive.join("-")}
                <Switch>
                  <Match when={props.entityInfo().data.dateOfDeath?.year && props.entityInfo().data.yearsActive.at(-1) !== props.entityInfo().data.dateOfDeath?.year}>
                    -{props.entityInfo().data.dateOfDeath.year}
                  </Match>
                  <Match when={props.entityInfo().data.dateOfDeath?.year == null}>
                    -Present
                  </Match>
                </Switch>
              </li>
            </Show>
            <Show when={props.entityInfo().data.homeTown}>
              <li><strong>Home town:</strong> {props.entityInfo().data.homeTown}</li>
            </Show>
            <Show when={props.entityInfo().data.bloodType}>
              <li><strong>Blood type:</strong> {props.entityInfo().data.bloodType}</li>
            </Show>
            <Show when={props.entityInfo().data.description}>
              <li>
                <Markdown>{props.entityInfo().data.description}</Markdown>
              </li>
            </Show>
          </ul>
        </div>
        <form class="entity-page-form" onSubmit={e => e.preventDefault()} onInput={e => {
          const formData = new FormData(e.currentTarget);
          triggerSearchParams({
            list: formData.get("list") === "on" || undefined,
            sort: formData.get("sort") || undefined,
          }, { replace: true });
        }}>
          <label> 
            <input type="checkbox" name="list" checked={searchParams.list} />
            {" "}On my list
          </label>
          <select name="sort" value={searchParams.sort || ""}>
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
          <SubSection variables={variables()} type="MEDIA" title="Characters" />
        </Match>
      </Switch>
    </div>
  )
} 

function SubSection(props) {
  assert(props.title, "title missing");
  assert(props.title, "title missing");
  assert(props.type, "type missing");

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
      <ol class="entity-page-grid">
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
  const { accessToken } = useAuthentication();
  const [variables, setVariables] = createSignal(undefined);
  const [staffCharacters] = api.anilist.characterMediaById(accessToken, () => params.id, props.nestLevel === 1 ? () => props.variables : variables);

  if (props.nestLevel === 1) {
    createEffect(on(staffCharacters, characters => {
      props.setVisible(characters?.data.edges.length > 0);

      const newLanguages = new Set();
      for(const edge of characters?.data.edges || []) {
        for(const actorRole of edge.voiceActorRoles) {
          newLanguages.add(actorRole.voiceActor.language);
        }
      }

      props.setLanguages([...newLanguages]);
    }));
  }

  return (
    <DoomScroll onIntersection={() => setVariables(props.variables)} fetchResponse={staffCharacters} loading={props.loading}>{fetchCooldown => (
      <>
        <CharacterAndActorCards language={props.language} edges={staffCharacters().data.edges} showYears={props.showYears} lastYearGroup={props.lastYearGroup}/>
        <Show when={staffCharacters().data.pageInfo.hasNextPage}>
          <Show when={staffCharacters().data.edges} keyed={props.nestLevel === 1}>
            <Show when={props.variables}>
              {vars => (
                <Show when={fetchCooldown === false} fallback="Fetch cooldown">
                  <CharacterMediaPage
                    variables={{ ...vars(), page: (vars()?.page || 1) + 1 }} 
                    nestLevel={props.nestLevel + 1} 
                    showYears={props.showYears} 
                    language={props.language} 
                    lastYearGroup={staffCharacters().data.edges.at(-1)?.node.startDate?.year || "TBA"}
                    loading={staffCharacters.loading} 
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

function StaffCharacterPage(props) {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [variables, setVariables] = createSignal(undefined);
  const [staffCharacters] = api.anilist.staffCharactersById(accessToken, () => params.id, props.nestLevel === 1 ? () => props.variables : variables);

  if (props.nestLevel === 1) {
    createEffect(on(staffCharacters, characters => {
      props.setVisible(characters?.data.edges.length > 0);
    }));
  }

  return (
    <DoomScroll onIntersection={() => setVariables(props.variables)} fetchResponse={staffCharacters} loading={props.loading}>{fetchCooldown => (
      <>
        <CharacterAndMediaCards edges={staffCharacters().data.edges} showYears={props.showYears} lastYearGroup={props.lastYearGroup} />
        <Show when={staffCharacters().data.pageInfo.hasNextPage}>
          <Show when={staffCharacters().data.edges} keyed={props.nestLevel === 1}>
            <Show when={props.variables}>
              {vars => (
                <Show when={fetchCooldown === false} fallback="Fetch cooldown">
                  <StaffCharacterPage
                    variables={{ ...vars(), characterPage: (vars()?.characterPage || 1) + 1 }} 
                    nestLevel={props.nestLevel + 1} 
                    showYears={props.showYears} 
                    lastYearGroup={staffCharacters().data.edges.at(-1)?.node.startDate?.year || "TBA"}
                    loading={staffCharacters.loading} 
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

function StaffMediaRolePage(props) {
  assert(props.type, "Type is missing");
  assert(props.nestLevel, "nestLevel is missing");

  const params = useParams();
  const { accessToken } = useAuthentication();
  const [variables, setVariables] = createSignal(undefined);
  const [staffMedia, { mutate }] = api.anilist.staffMediaById(accessToken, () => params.id, props.type, props.nestLevel === 1 ? () => props.variables : variables);

  if (props.nestLevel === 1) {
    createEffect(on(staffMedia, media => {
      props.setVisible(media?.data.edges.length > 0);
    }));
  }

  createEffect(on(staffMedia, media => {
    if (!props.lastMediaId || !media?.data.edges.length) {
      return;
    }
    const edges = structuredClone(media.data.edges);
    const removedEdges = [];

    for(const edge of media.data.edges) {
      if (edge.node.id !== props.lastMediaId) { break; } 
      removedEdges.push(edges.shift());
    }

    if (removedEdges.length === 0) {
      return;
    }
    props.mutate(response => {
      response.data.edges = [...response.data.edges, ...removedEdges];
      return { ...response };
    });
    mutate(response => {
      response.data.edges = edges;
      return { ...response };
    });
  }));

  return (
    <DoomScroll onIntersection={() => setVariables(props.variables)} fetchResponse={staffMedia} loading={props.loading}>{fetchCooldown => (
      <>
        <MediaCards edges={staffMedia().data.edges} showYears={props.showYears} lastYearGroup={props.lastYearGroup}/>
        <Show when={staffMedia().data.pageInfo.hasNextPage}>
          <Show when={props.variables} keyed={props.nestLevel === 1}>
            <Show when={fetchCooldown === false} fallback="Fetch cooldown">
              <StaffMediaRolePage
                variables={{ ...props.variables, staffPage: (props.variables?.staffPage || 1) + 1 }} 
                nestLevel={props.nestLevel + 1} 
                showYears={props.showYears}
                mutate={mutate} 
                type={props.type} 
                lastYearGroup={staffMedia().data.edges.at(-1)?.node.startDate?.year || "TBA"}
                lastMediaId={staffMedia().data.edges.at(-1)?.node.id}
                loading={staffMedia.loading} 
              /> 
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
  assert(props.showYears, "showYears signal is missing");
  assert(props.language, "language signal is missing");

  return ( 
    <For each={props.edges}>{(edge, i) => (
      <>
        <YearHeader showYears={props.showYears} lastYearGroup={props.lastYearGroup} edge={edge} edges={props.edges} index={i} />
        <Show when={edge.voiceActorRoles.filter(role => role.voiceActor.language === props.language())}>{roles => (
          <li class="entity-page-media-voice-actor">
            <A href={"/" + edge.node.type.toLowerCase() + "/" + edge.node.id + "/" + formatTitleToUrl(edge.node.title.userPreferred)}>
              <img src={edge.node.coverImage.large} alt={capitalize(edge.node.type) + " cover"} />
            </A>
            <A href={"/" + edge.node.type.toLowerCase() + "/" + edge.node.id + "/" + formatTitleToUrl(edge.node.title.userPreferred)}>
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
  assert(props.showYears, "showYears signal is missing");
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
          <A href={"/" + edge.node.type.toLowerCase() + "/" + edge.node.id + "/" + formatTitleToUrl(edge.node.title.userPreferred)}>
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
  assert(props.showYears, "showYears signal is missing");

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
              <A class="media" href={"/" + edge.node.type.toLowerCase() + "/" + edge.node.id + "/" + formatTitleToUrl(edge.node.title.userPreferred)}>
                <img src={edge.node.coverImage.large} alt={capitalize(edge.node.type) + " cover"} />
              </A>
            </div>
            <A href={"/ani/character/" + character.id + "/" + formatTitleToUrl(character.name.userPreferred)}>
              <span>{character.name.userPreferred}</span>
              <span class="role"> {capitalize(edge.characterRole)}</span>
            </A>
            <A href={"/" + edge.node.type.toLowerCase() + "/" + edge.node.id + "/" + formatTitleToUrl(edge.node.title.userPreferred)}>
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
