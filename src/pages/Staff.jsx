import { A, useParams, useSearchParams } from "@solidjs/router";
import api from "../utils/api";
import { Switch, Match, Show, createSignal, createEffect, on, onCleanup, onMount, For } from "solid-js";
import { Markdown } from "../components/Markdown";
import "./Staff.scss";
import { assert } from "../utils/assert";
import { capitalize, formatAnilistDate, formatTimeToDate, formatTitleToUrl } from "../utils/formating";
import { useAuthentication } from "../context/AuthenticationContext";
import { FavouriteToggle } from "../components/FavouriteToggle";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";


function Staff() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [staffInfo, { mutateCache: mutateStaffInfoCache }] = api.anilist.staffInfoById(() => params.id);
  const [searchParams, _setSearchParams] = useSearchParams();
  const triggerSearchParams = leadingAndTrailing(debounce, _setSearchParams, 300);
  const [variables, setVariables] = createSignal();
  // const [staffAnime] = api.anilist.staffMediaById(accessToken, () => params.id, "ANIME");
  // const [staffManga] = api.anilist.staffMediaById(accessToken, () => params.id, "MANGA");

  const [favourite, setFavourite] = createSignal(false);
  createEffect(on(staffInfo, info => {
    setFavourite(info?.data.isFavourite);
  }, { defer: true }));


  createEffect(() => {
    setVariables({
      onList: searchParams.list === "true" || undefined,
      sort: searchParams.sort,
    });
  });

  return (
    <div class="staff-page">
      <Show when={staffInfo()}>
        <div className="staff-page-header">
          <img src={staffInfo().data.image.large} class="cover" alt="Staff profile" />
          <div className="row">
            <h1>{staffInfo().data.name.userPreferred}</h1>
            <p class="staff-page-alternative-names">{[staffInfo().data.name.native, ...staffInfo().data.name.alternative].join(", ")}</p>
            <FavouriteToggle 
              checked={favourite()} 
              staffId={params.id} 
              favourites={staffInfo().data.favourites} 
              onChange={setFavourite} 
              mutateCache={(isFavourite) => {
                staffInfo().data.isFavourite = isFavourite;
                mutateStaffInfoCache(data => data);
              }} 
            />
          </div>
          <ul class="description">
            <Show when={staffInfo().data.dateOfBirth}>
              <li><strong>Birth:</strong> {formatAnilistDate(staffInfo().data.dateOfBirth)}</li>
            </Show>
            <Show when={staffInfo().data.age}>
              <li><strong>Age:</strong> {staffInfo().data.age}</li>
            </Show>
            <Show when={staffInfo().data.gender}>
              <li><strong>Age:</strong> {staffInfo().data.gender}</li>
            </Show>
            <Show when={staffInfo().data.yearsActive}>
              <li>
                <strong>Age:</strong> 
                {staffInfo().data.yearsActive.join("-")}
                <Switch>
                  <Match when={staffInfo().data.dateOfDeath.year && staffInfo().data.yearsActive.at(-1) !== staffInfo().data.dateOfDeath.year}>
                    -{staffInfo().data.dateOfDeath.year}
                  </Match>
                  <Match when={staffInfo().data.dateOfDeath.year == null}>
                    -Present
                  </Match>
                </Switch>
              </li>
            </Show>
            <Show when={staffInfo().data.homeTown}>
              <li><strong>Home town:</strong> {staffInfo().data.homeTown}</li>
            </Show>
            <Show when={staffInfo().data.bloodType}>
              <li><strong>Blood type:</strong> {staffInfo().data.bloodType}</li>
            </Show>
            <Show when={staffInfo().data.description}>
              <li>
                <Markdown>{staffInfo().data.description}</Markdown>
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
      <details open>
        <summary class="staff-page-summary">
          <h2>Characters</h2>
        </summary>
        <ol class="staff-page-character-container">
          <StaffCharacterPage variables={variables()} nestLevel={1} />
        </ol>
      </details>
    </div>
  )
}


function StaffCharacterPage(props) {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [variables, setVariables] = createSignal(undefined);
  const [staffCharacters] = api.anilist.staffCharactersById(accessToken, () => params.id, props.nestLevel === 1 ? () => props.variables : variables);
  let intersection;

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
          <CharacterCards edges={staffCharacters().data.edges} lastYearGroup={props.lastYearGroup}/>
          <Show when={staffCharacters().data.pageInfo.hasNextPage}>
            <Show when={staffCharacters().data.edges} keyed={props.nestLevel === 1}>
              <Show when={props.variables}>
                {vars => (
                  <Show when={(staffCharacters.loading && props.loading) === false} fallback="Fetch cooldown">
                    <StaffCharacterPage
                      variables={{ ...vars(), characterPage: (vars()?.characterPage || 1) + 1 }} 
                      nestLevel={props.nestLevel + 1} 
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
  return ( 
    <For each={props.edges}>{(edge, i) => (
      <For each={edge.characters}>{character => (
        <>
          <Switch>
            <Match when={i() === 0}>
              <Show when={props.lastYearGroup !== (edge.node.startDate?.year || "TBA")}>
                <li class="staff-page-character-year-header">
                  <h3>{edge.node.startDate?.year || "TBA"}</h3>
                </li>
              </Show>
            </Match>
            <Match when={i() > 0}>
              <Show when={props.edges[i() - 1].node.startDate?.year !== edge.node.startDate?.year}>
                <li class="staff-page-character-year-header">
                  <h3>{edge.node.startDate?.year || "TBA"}</h3>
                </li>
              </Show>
            </Match>
          </Switch>
          <li>
            <div class="staff-page-character-cover">
              <A href={"/ani/character/" + character.id + "/" + formatTitleToUrl(character.name.userPreferred)}>
                <img src={character.image.large} alt="Character" class="background"/>
              </A>
              <A class="media" href={"/anime/" + edge.node.id + "/" + formatTitleToUrl(edge.node.title.userPreferred)}>
                <img src={edge.node.coverImage.large} alt={capitalize(edge.node.type) + " cover"} />
              </A>
            </div>
            <A href={"/ani/character/" + character.id + "/" + formatTitleToUrl(character.name.userPreferred)}>
              <span>{character.name.userPreferred}</span>
              <span class="role"> {capitalize(edge.characterRole)}</span>
            </A>
            <A href={"/anime/" + edge.node.id + "/" + formatTitleToUrl(edge.node.title.userPreferred)}>
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
    )}</For>
  );
}

export default Staff
