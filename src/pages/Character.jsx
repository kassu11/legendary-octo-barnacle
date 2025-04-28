import { A, useParams, useSearchParams } from "@solidjs/router";
import api from "../utils/api";
import { Switch, Match, Show, createSignal, createEffect, on, onCleanup, onMount, For } from "solid-js";
import { Markdown } from "../components/Markdown";
import "./Staff.scss";
import { assert } from "../utils/assert";
import { capitalize, formatAnilistDate, formatTitleToUrl } from "../utils/formating";
import { useAuthentication } from "../context/AuthenticationContext";
import { FavouriteToggle } from "../components/FavouriteToggle";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";


function Staff() {
  const params = useParams();
  const [characterInfo, { mutateCache: mutateCharacterInfoCache }] = api.anilist.characterInfoById(() => params.id);
  const [searchParams, _setSearchParams] = useSearchParams();
  const triggerSearchParams = leadingAndTrailing(debounce, _setSearchParams, 300);
  const [variables, setVariables] = createSignal();

  const [favourite, setFavourite] = createSignal(false);
  createEffect(on(characterInfo, info => {
    setFavourite(info?.data.isFavourite);
  }));


  createEffect(() => {
    setVariables({
      onList: searchParams.list === "true" || undefined,
      sort: searchParams.sort,
    });
  });

  return (
    <div class="staff-page">
      <Show when={characterInfo()}>
        <div className="staff-page-header">
          <img src={characterInfo().data.image.large} class="cover" alt="Staff profile" />
          <div className="row">
            <h1>{characterInfo().data.name.userPreferred}</h1>
            <p class="staff-page-alternative-names">{[characterInfo().data.name.native, ...characterInfo().data.name.alternative].join(", ")}</p>
            <FavouriteToggle 
              checked={favourite()} 
              staffId={params.id} 
              favourites={characterInfo().data.favourites} 
              onChange={setFavourite} 
              mutateCache={(isFavourite) => {
                characterInfo().data.isFavourite = isFavourite;
                mutateCharacterInfoCache(data => data);
              }} 
            />
          </div>
          <ul class="description">
            <Show when={characterInfo().data.dateOfBirth}>
              <li><strong>Birth:</strong> {formatAnilistDate(characterInfo().data.dateOfBirth)}</li>
            </Show>
            <Show when={characterInfo().data.age}>
              <li><strong>Age:</strong> {characterInfo().data.age}</li>
            </Show>
            <Show when={characterInfo().data.gender}>
              <li><strong>Gender:</strong> {characterInfo().data.gender}</li>
            </Show>
            <Show when={characterInfo().data.yearsActive}>
              <li>
                <strong>Active years: </strong> 
                {characterInfo().data.yearsActive.join("-")}
                <Switch>
                  <Match when={characterInfo().data.dateOfDeath.year && characterInfo().data.yearsActive.at(-1) !== characterInfo().data.dateOfDeath.year}>
                    -{characterInfo().data.dateOfDeath.year}
                  </Match>
                  <Match when={characterInfo().data.dateOfDeath.year == null}>
                    -Present
                  </Match>
                </Switch>
              </li>
            </Show>
            <Show when={characterInfo().data.homeTown}>
              <li><strong>Home town:</strong> {characterInfo().data.homeTown}</li>
            </Show>
            <Show when={characterInfo().data.bloodType}>
              <li><strong>Blood type:</strong> {characterInfo().data.bloodType}</li>
            </Show>
            <Show when={characterInfo().data.description}>
              <li>
                <Markdown>{characterInfo().data.description}</Markdown>
              </li>
            </Show>
          </ul>
        </div>
        <form class="staff-page-form" onSubmit={e => e.preventDefault()} onInput={e => {
          const formData = new FormData(e.currentTarget);
          triggerSearchParams({
            list: formData.get("list") === "on" || undefined,
            sort: formData.get("sort") || undefined,
          });
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
            <option value="POPULARITY_DESC">POPULARITY_DESC</option>
            <option value="SCORE">SCORE</option>
            <option value="SCORE_DESC">SCORE_DESC</option>
            <option value="SEARCH_MATCH">SEARCH_MATCH</option>
            <option value="START_DATE">START_DATE</option>
            <Switch>
              <Match when={searchParams.sort === "START_DATE_DESC"}>
                <option value="START_DATE_DESC">START_DATE_DESC</option>
              </Match>
              <Match when={searchParams.sort !== "START_DATE_DESC"}>
                <option value="">START_DATE_DESC</option>
              </Match>
            </Switch>
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
      <StaffSection variables={variables()} type="MEDIA" title="Characters" />
    </div>
  )
}

function StaffSection(props) {
  assert(props.title, "title missing");
  assert(props.title, "title missing");
  assert(props.type, "type missing");

  const [showYears, setShowYears] = createSignal(props.showYears || false);
  const [visible, setVisible] = createSignal(false);

  return (
    <details class="staff-page-details" classList={{hidden: !visible()}} open>
      <summary class="staff-page-summary">
        <h2>{props.title}</h2>
        <label> 
          <input type="checkbox" checked={showYears()} onChange={e => {
            e.preventDefault();
            setShowYears(e.target.checked);
          }}/>
          {" "}Show years
        </label>
      </summary>
      <ol class="staff-page-character-container">
        <Switch>
          <Match when={props.type === "MEDIA"}>
            <CharacterMediaPage setVisible={setVisible} variables={props.variables} showYears={showYears} nestLevel={1} />
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
  let intersection;

  if (props.nestLevel === 1) {
    createEffect(on(staffCharacters, characters => {
      props.setVisible(characters?.data.edges.length > 0);
    }));
  }

  onMount(() => {
    if (props.nestLevel > 1) {
      intersectionObserver.observe(intersection);
    }
  });

  onCleanup(() => {
    intersectionObserver.disconnect();
  });

  const options = { rootMargin: "800px" }
  const callback = (entries) => {
    if (entries[0].isIntersecting === false) {
      return;
    }

    intersectionObserver.unobserve(entries[0].target);
    setVariables(props.variables);
  };

  const intersectionObserver = new IntersectionObserver(callback, options);

  return (
    <Show when={staffCharacters() || props.nestLevel > 1}>
      <Switch fallback={<div ref={intersection}>Intersection</div>}>
        <Match when={staffCharacters()}>
          <CharacterCards edges={staffCharacters().data.edges} showYears={props.showYears} lastYearGroup={props.lastYearGroup}/>
          <Show when={staffCharacters().data.pageInfo.hasNextPage}>
            <Show when={staffCharacters().data.edges} keyed={props.nestLevel === 1}>
              <Show when={props.variables}>
                {vars => (
                  <Show when={(staffCharacters.loading && props.loading) === false} fallback="Fetch cooldown">
                    <CharacterMediaPage
                      variables={{ ...vars(), page: (vars()?.page || 1) + 1 }} 
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
        </Match>
        <Match when={staffCharacters.loading}>
          loading...
        </Match>
      </Switch>
    </Show>
  );
}

function CharacterCards(props) {
  assert(props.showYears, "showYears signal is missing");

  return ( 
    <For each={props.edges}>{(edge, i) => (
      <For each={edge.voiceActorRoles.filter(role => role.voiceActor.language === "Japanese")} fallback={<CharacterCard {...props} edge={edge} index={0} />}>{role => (
        <CharacterCard {...props} index={i()} edge={edge} role={role}/>
      )}</For>
    )}</For>
  );
}

function CharacterCard(props) {
  return (
    <>
      <Show when={props.showYears()}>
        <Switch>
          <Match when={props.index === 0}>
            <Show when={props.lastYearGroup !== (props.edge.node.startDate?.year || "TBA")}>
              <li class="staff-page-character-year-header">
                <h3>{props.edge.node.startDate?.year || "TBA"}</h3>
              </li>
            </Show>
          </Match>
          <Match when={props.index > 0}>
            <Show when={props.edges[props.index - 1].node.startDate?.year !== props.edge.node.startDate?.year}>
              <li class="staff-page-character-year-header">
                <h3>{props.edge.node.startDate?.year || "TBA"}</h3>
              </li>
            </Show>
          </Match>
        </Switch>
      </Show>
      <li>
        <div class="staff-page-character-cover">
          <A href={"/anime/" + props.edge.node.id + "/" + formatTitleToUrl(props.edge.node.title.userPreferred)}>
            <img src={props.edge.node.coverImage.large} alt={capitalize(props.edge.node.type) + " cover"} />
          </A>
          <Show when={props.role}>
            <A class="media" href={"/ani/staff/" + props.role.voiceActor.id + "/" + formatTitleToUrl(props.role.voiceActor.name.userPreferred)}>
              <img src={props.role.voiceActor.image.large} alt="Staff profile" class="background"/>
            </A>
          </Show>
        </div>
        <A href={"/anime/" + props.edge.node.id + "/" + formatTitleToUrl(props.edge.node.title.userPreferred)}>
          <p>
            <Show when={props.edge.node.mediaListEntry?.status}>
              <div class="list-status" attr:data-status={props.edge.node.mediaListEntry.status} />
            </Show>
            {props.edge.node.title.userPreferred}
          </p>
        </A>
        <Show when={props.role}>
          <A href={"/ani/character/" + props.role.id + "/" + formatTitleToUrl(props.role.voiceActor.name.userPreferred)}>
            <span>{props.role.voiceActor.name.userPreferred}</span>
            <span class="role"> {capitalize(props.edge.characterRole)}</span>
          </A>
        </Show>
      </li>
    </>
  );
}

export default Staff
