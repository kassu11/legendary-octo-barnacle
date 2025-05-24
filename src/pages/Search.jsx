import { A, useLocation, useNavigate, useParams, useSearchParams } from "@solidjs/router";
import api from "../utils/api";
import { Show, For, Match, Switch, mergeProps, createSignal, createEffect, batch, useContext, createContext, on } from "solid-js";
import { useAuthentication } from "../context/AuthenticationContext";
import { assert } from "../utils/assert";
import "./Search.scss";
import { capitalize, formatMediaFormat, formatTitleToUrl, numberCommas } from "../utils/formating";
import Emoji from "../assets/Emoji";
import { useEditMediaEntries } from "../context/EditMediaEntriesContext";
import { createStore, reconcile } from "solid-js/store";
import { SearchBarContext, useSearchBar } from "../context/providers";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { DoomScroll } from "../components/utils/DoomScroll";
import { useResponsive } from "../context/ResponsiveContext";
import { RatingInput } from "./Search/RatingInput";
import { SwitchInput } from "./Search/SwitchInput";
import { GenresInput } from "./Search/GenresInput";
import { YearInput } from "./Search/YearInput";
import { compare, objectFromArrayEntries, wrapToArray, wrapToSet } from "../utils/arrays";



class SearchVariable {
  constructor({ url, key, value, active = true, visuallyDisabled = false, reason, desc, name, hidden = false, canClear = true }) {
    assert(!active || key, "key missing");
    assert(hidden || name, "Name is missing");
    assert(!canClear || !active || url, "Url is missing");
    assert(canClear || hidden , "Don't show user meta tags they can't clear");
    assert(typeof active === "boolean", "active is not boolean");
    assert(typeof visuallyDisabled === "boolean", "visuallyDisabled is not boolean");
    assert(typeof hidden === "boolean", "hidden is not boolean");
    assert(typeof canClear === "boolean", "canClear is not boolean");

    this.name = name;
    this.url = url;
    this.key = key;
    this.value = value;
    this.active = active;
    this.visuallyDisabled = visuallyDisabled;
    this.reason = reason;
    this.desc = desc;
    this.hidden = hidden;
    this.canClear = canClear;
  }

  match(searchVariable = {}) {
    return (
      this.name === searchVariable.name &&
      this.url === searchVariable.url &&
      this.key === searchVariable.key &&
      compare(this.value, searchVariable.value) &&
      this.active === searchVariable.active &&
      this.visuallyDisabled === searchVariable.visuallyDisabled &&
      this.reason === searchVariable.reason &&
      this.desc === searchVariable.desc &&
      this.hidden === searchVariable.hidden &&
      this.canClear === searchVariable.canClear
    );
  }

  looseMatch(searchVariable = {}) {
    return (
      this.key === searchVariable.key &&
      compare(this.value, searchVariable.value) &&
      this.active === searchVariable.active
    );
  }
}

function parseURL() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const type = params.type;
  const engine = (searchParams.malSearch === "true" && params.type !== "media") ? "mal" : "ani";
  const variables = [];
  let preventFetch = searchParams.preventFetch === "true";

  if (searchParams.q) {
    variables.push(new SearchVariable({ 
      url: "q=" + searchParams.q, 
      key: engine === "ani" ? "search" : "q",
      value: searchParams.q,
      name: "Search: " + searchParams.q,
    }));
  }

  if (engine === "ani") {
    if (params.type === "anime") {
      variables.push(new SearchVariable({ key: "type", value: "ANIME", hidden: true, canClear: false }));
    } else if (params.type === "manga") {
      variables.push(new SearchVariable({ key: "type", value: "MANGA", hidden: true, canClear: false }));
    } else if (params.type === "media") {
      variables.push(new SearchVariable({ key: "type", value: undefined, hidden: true, canClear: false }));
    }
  } else if (engine === "mal") {

  }


  if (searchParams.rating === undefined) {
    if (engine === "ani") {
      variables.push(new SearchVariable({ key: "isAdult", value: false, hidden: true, canClear: false }));
    } else if(engine === "mal") {
      variables.push(new SearchVariable({ key: "sfw", value: true, hidden: true, canClear: false }));
    }
  } else {
    const ratings = objectFromArrayEntries(searchParams.rating);
    if (ratings.any) {
      if (engine === "ani") {
        variables.push(new SearchVariable({ name: "Any rating", url: "rating=any", key: "isAdult", value: undefined }));
      } else if(engine === "mal") {
        variables.push(new SearchVariable({ name: "Any rating", url: "rating=any", active: false }));
      }
    } else {
      const names = { g: "G - All ages", pg: "PG - Children", pg13: "PG-13", r17: "R - 17+", r: "R+", rx: "Rx - Hentai" };
      const ratingSet = new Set([searchParams.rating].flat());
      ratingSet.forEach(value => {
        if (value === "g" || value === "pg" || value === "pg13" || value === "r17") {
          variables.push(new SearchVariable({ name: names[value], url: `rating=${value}`, key: "rating", value, visuallyDisabled: engine === "ani", active: engine === "mal" }));
        } else if (value === "r" || value === "rx") {
          variables.push(new SearchVariable({ name: names[value], url: `rating=${value}`, key: "rating", value, active: engine === "mal" }));
        }
      });

      if (engine === "ani") {
        if (ratings.rx && (ratings.g || ratings.pg || ratings.pg13 || ratings.r17 || ratings.r)) {
          variables.push(new SearchVariable({ key: "isAdult", value: undefined, hidden: true, canClear: false }));
        } else {
          variables.push(new SearchVariable({ key: "isAdult", value: ratings.rx === true, hidden: true, canClear: false }));
        }
      }
    }
  }

  if (searchParams.genre) {
    const [, genres, tags] = [...wrapToSet(searchParams.genre)].reduce(parseGenres, ["genre"]);

    if (engine === "ani") {
      if (genres.length) {
        variables.push(new SearchVariable({ key: "genres", value: genres, hidden: true, canClear: false }));
      }
      if (tags.length) {
        variables.push(new SearchVariable({ key: "tags", value: tags, hidden: true, canClear: false }));
      }
    }
    else if(engine === "mal" && genres.length) {
      variables.push(new SearchVariable({ key: "genres", value: genres.join(","), hidden: true, canClear: false }));
    }
  }
  if (searchParams.excludeGenre) {
    const [, excludeGenres, excludeTags] = [...wrapToSet(searchParams.excludeGenre)].reduce(parseGenres, ["excludeGenre"]);

    if (engine === "ani") {
      if (excludeGenres.length) {
        variables.push(new SearchVariable({ key: "excludedGenres", value: excludeGenres, hidden: true, canClear: false }));
      }
      if (excludeTags.length) {
        variables.push(new SearchVariable({ key: "excludeTags", value: excludeTags, hidden: true, canClear: false }));
      }
    }
    else if(engine === "mal" && excludeGenres.length) {
      variables.push(new SearchVariable({ key: "genres_exclude", value: excludeGenres.join(","), hidden: true, canClear: false }));
    }
  }
  function parseGenres([urlKey, validGenres = [], validTags = []], genre) {
    let disabled = false;
    if (engine === "ani") {
      if (genreAndTagTranslations.genres === null) { preventFetch = true } 
      else if (genreAndTagTranslations.tags[genre]) { validTags.push(genre) } 
      else if (genreAndTagTranslations.genres[genre]) { validGenres.push(genre) } 
      else { disabled = true }
    }
    else if (engine === "mal") {
      if (genreAndTagTranslations[type] === null) { preventFetch = true } 
      else if (Number.isInteger(genreAndTagTranslations[type][genre])) { validGenres.push(genreAndTagTranslations[type][genre]) }
      else { disabled = true }
    }

    variables.push(new SearchVariable({ name: genre, url: `${urlKey}=${genre}`, active: false, visuallyDisabled: disabled }));
    return [urlKey, validGenres, validTags];
  };

  const [year] = [searchParams.year].flat();
  if (year) {
    if (engine === "ani") {
      variables.push(new SearchVariable({ name: year, url: `year=${year}`, active: true, key: "year", value: `${year}%` }));
    }
    else if (engine === "mal") {
      variables.push(new SearchVariable({ name: year, url: `year=${year}`, active: true, key: "start_date", value: `${year}-01-01` }));
      variables.push(new SearchVariable({ hidden: true, canClear: false, key: "end_date", value: `${year}-12-31` }));
    }
  } 

  const [startYear] = [+searchParams.startYear].flat();
  if (startYear) {
    if (engine === "ani") {
      variables.push(new SearchVariable({ name: `Year greater than ${startYear - 1}`, active: !year, visuallyDisabled: !!year, url: `startYear=${startYear}`, key: "yearGreater", value: parseInt(`${startYear - 1}9999`) }));
    }
    else if (engine === "mal") {
      variables.push(new SearchVariable({ name: `Year greater than ${startYear - 1}`, active: !year, visuallyDisabled: !!year, url: `startYear=${startYear}`, key: "start_date", value: `${startYear}-01-01` }));
    }
  }
  const [endYear] = [+searchParams.endYear].flat();
  if (endYear) {
    if (engine === "ani") {
      variables.push(new SearchVariable({ name: `Year lesser than ${endYear + 1}`, active: !year, visuallyDisabled: !!year, url: `startYear=${startYear}`, key: "yearLesser", value: parseInt(`${endYear + 1}0000`) }));
    }
    else if (engine === "mal") {
      variables.push(new SearchVariable({ name: `Year lesser than ${endYear + 1}`, active: !year, visuallyDisabled: !!year, url: `endYear=${endYear}`, key: "start_date", value: `${endYear}-12-31` }));
    }
  }

  if (searchParams.onList === "true") {
    variables.push(new SearchVariable({ name: `Show my ${type}`, active: engine === "ani", visuallyDisabled: engine !== "ani", url: `onList=true`, key: "onList", value: true }));
  }
  if (searchParams.onList === "false") {
    variables.push(new SearchVariable({ name: `Hide my ${type}`, active: engine === "ani", visuallyDisabled: engine !== "ani", url: `onList=false`, key: "onList", value: false }));
  }



  return [type, engine, variables, preventFetch];
}

const [genreAndTagTranslations, setGenreAndTagTranslations] = createStore({
  anime: null,
  manga: null,
  genres: null,
  tags: null,
});

export function SearchBar(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchType, setSearchType] = createSignal();
  const [searchEngine, setSearchEngine] = createSignal();
  const [searchVariables, setSearchVariables] = createSignal();
  const [debouncedSearchType, setDebouncedSearchType] = createSignal();
  const [debouncedSearchEngine, setDebouncedSearchEngine] = createSignal();
  const [debouncedSearchVariables, setDebouncedSearchVariables] = createSignal();

  const [anilistGenresAndTags] = api.anilist.genresAndTags(() => searchParams.malSearch !== "true" || undefined);
  const [malGenresAndThemes] = api.myAnimeList.genresAndThemes(() => searchParams.malSearch === "true" && (params.type === "anime" || params.type === "manga") ? params.type : undefined);

  const triggerSetSearchParams = debounce((search, options) => setSearchParams(search, options), 300);
  const triggerSearchValues = leadingAndTrailing(debounce, (type, engine, variables) => {
    batch(() => {
      setDebouncedSearchType(type)
      setDebouncedSearchEngine(engine)
      setDebouncedSearchVariables(vars => {
        const activeVars = vars?.filter(val => val.active) || [];
        const activeVariables = variables.filter(val => val.active);
        if (activeVars.length === activeVariables.length && activeVars.every((variable, i) => variable.looseMatch(activeVariables[i]))) {
          return vars;
        }
        return variables;
      });
    });
  }, 300);

  createEffect(on(malGenresAndThemes, response => {
    if (!response) { return; }
    setGenreAndTagTranslations(response.data.translations);
  }));

  createEffect(on(anilistGenresAndTags, response => {
    if (!response) { return; }
    setGenreAndTagTranslations({
      genres: objectFromArrayEntries(response.data.genres),
      tags: response.data.tags.reduce((acc, tag) => (acc[tag.name] = tag, acc), {}),
    });
  }));


  createEffect(() => {
    const [type, engine, variables, preventFetch] = parseURL(genreAndTagTranslations);
    if (preventFetch) {
      return;
    }

    batch(() => {
      setSearchType(type);
      setSearchEngine(engine);
      setSearchVariables(vars => {
        if (vars?.length === variables.length && variables.every((variable, i) => variable.match(vars[i]))) {
          return vars;
        }
        return variables;
      });
      triggerSearchValues(type, engine, variables);
    });
  });

  return (
    <div class="search-page">
      <div class="header-row">
        <h1>{capitalize(params.mode)}</h1>
        <select name="type" id="type" value={params.type} onChange={e => {
          navigate("/" + params.mode + "/" + e.target.value + "/" + (params.header ? "/" + params.header : "") + location.search);
        }}>
          <option value="anime">Anime</option>
          <option value="manga">Manga</option>
          <option value="media">Media</option>
        </select>
      </div>
      <div>
        <input type="search" placeholder={"Search " + (params.type || "All")} value={searchParams.q || ""} onInput={e => {
          triggerSetSearchParams({ q: e.target.value });
        }} />
        <span>
          <p>Search MAL</p>
          <SwitchInput disabled={params.type === "media"} name="malSearch" checked={searchParams.malSearch === "true" && params.type !== "media"} onInput={e => {
          setSearchParams({ malSearch: e.target.checked || undefined });
        }}/>
        </span>
        <input type="checkbox" name="hideMyAnime" id="hideMyAnime" checked={searchParams.onList === "false"} onInput={e => {
          setSearchParams({ onList: e.target.checked ? false : undefined });
        }} />
        <label htmlFor="hideMyAnime"> Hide my {params.type}</label>
        <input type="checkbox" name="showMyAnime" id="showMyAnime" checked={searchParams.onList === "true"} onInput={e => {
          setSearchParams({ onList: e.target.checked || undefined });
        }} />
        <label htmlFor="showMyAnime"> Only show my {params.type}</label>
        <RatingInput />
        <GenresInput aniGenres={anilistGenresAndTags} malGenres={malGenresAndThemes} translation={genreAndTagTranslations} engine={searchEngine()} showAdult={true} />
        <YearInput />
      </div>
      <SearchBarContext.Provider value={{searchType, searchEngine, searchVariables, debouncedSearchType, debouncedSearchEngine, debouncedSearchVariables }}>
        {props.children}
      </SearchBarContext.Provider>
    </div>
  )
}


export function SearchContent(props) {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { debouncedSearchEngine, debouncedSearchType, searchVariables, debouncedSearchVariables } = useSearchBar();
  const navigate = useNavigate();

  return (
    <div class="search-result-container">
      <Show when={params.header}>
        <h1>{params.header}</h1>
      </Show>
      {props.children}
      <Show when={searchVariables()?.filter(variable => !variable.hidden)}>{filteredVariables => (
        <Show when={filteredVariables().length}>
          Tags:
          <ol class="search-meta-tags">
            <For each={filteredVariables()}>{variable => (
              <Show when={!variable.hidden}>
                <li classList={{disabled: variable.visuallyDisabled}}>
                  <button onClick={() => {
                    const [key, ...rest] = variable.url.split("=");
                    const value = rest.join("=");
                    setSearchParams({[key]: [searchParams[key]].flat().filter(v => v !== value)});
                  }}>{variable.name}</button>
                </li>
              </Show>
            )}</For>
            <li>
              <button onClick={() => {
                if (searchParams.malSearch === "true") {
                  navigate("/search/" + params.type + "?malSearch=true"); 
                } else {
                  navigate("/search/" + params.type);
                }
              }}>
                Clear all
              </button>
            </li>
          </ol>
        </Show>
      )}
      </Show>
      <section>
        <ol class="search-page-content grid-column-auto-fill">
          <Switch>
            <Match when={debouncedSearchEngine() === "ani"}>
              <AnilistMediaSearchContent nestLevel={1} page={1} variables={debouncedSearchVariables()} />
            </Match>
            <Match when={debouncedSearchEngine() === "mal"}>
              <Switch>
                <Match when={debouncedSearchType() === "anime"}>
                  <MyAnimeListMediaSearchContent nestLevel={1} type="anime" page={1} variables={debouncedSearchVariables()} />
                </Match>
                <Match when={debouncedSearchType() === "manga"}>
                  <MyAnimeListMediaSearchContent nestLevel={1} type="manga" page={1} variables={debouncedSearchVariables()} />
                </Match>
              </Switch>
            </Match>
          </Switch>
        </ol>
      </section>
    </div>
  );
}

function AnilistMediaSearchContent(props) {
  const {accessToken} = useAuthentication();
  const { debouncedSearchVariables } = useSearchBar();
  const [variables, setVariables] = createSignal(undefined);
  const [cacheData] = api.anilist.searchMediaCache(accessToken, debouncedSearchVariables, props.page);
  const [mediaData] = api.anilist.searchMedia(accessToken, props.nestLevel === 1 ? () => props.variables : variables, props.page);
  const [newestData, setNewestData] = createSignal();

  createEffect(on(cacheData, data => data && setNewestData(data.data.media)));
  createEffect(on(mediaData, data => data && setNewestData(data.data.media)));
  return (
    <DoomScroll onIntersection={() => setVariables(props.variables)} fetchResponse={mediaData} loadingElement={newestData() && <AniCardRow data={newestData()} />} loading={props.loading}>{fetchCooldown => (
      <>
        <AniCardRow data={newestData()} />
        <Show when={mediaData().data.pageInfo.hasNextPage}>
          <Show when={mediaData().data.media} keyed={props.nestLevel === 1}>
            <Show when={props.variables}>
              {vars => (
                <Show when={fetchCooldown === false} fallback="Fetch cooldown">
                  <AnilistMediaSearchContent 
                    variables={vars()}
                    page={props.page + 1}
                    nestLevel={props.nestLevel + 1}
                    loading={mediaData.loading}
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

function MyAnimeListMediaSearchContent(props) {
  const { debouncedSearchVariables } = useSearchBar();
  const [variables, setVariables] = createSignal(undefined);
  const [cacheData] = api.myAnimeList.mediaSearchCache(props.type, debouncedSearchVariables, props.page);
  const [mediaData] = api.myAnimeList.mediaSearch(props.type, props.nestLevel === 1 ? () => props.variables : variables, props.page);
  const [newestData, setNewestData] = createSignal();

  createEffect(on(cacheData, data => data && setNewestData(data.data.data)));
  createEffect(on(mediaData, data => data && setNewestData(data.data.data)));
  return (
    <DoomScroll rootMargin="200px" onIntersection={() => setVariables(props.variables)} fetchResponse={mediaData} loadingElement={newestData() && <MalCardRow data={newestData()} />} loading={props.loading}>{fetchCooldown => (
      <>
        <MalCardRow data={newestData()} />
        <Show when={mediaData().data.pagination.has_next_page}>
          <Show when={mediaData().data.data} keyed={props.nestLevel === 1}>
            <Show when={props.variables}>
              {vars => (
                <Show when={fetchCooldown === false} fallback="Fetch cooldown">
                  <MyAnimeListMediaSearchContent 
                    variables={vars()}
                    type={props.type}
                    page={props.page + 1}
                    nestLevel={props.nestLevel + 1}
                    loading={mediaData.loading}
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

function MalCardRow(props) {
  return (
    <For each={props.data}>
      {card => <MalCard card={card} />}
    </For>
  );
}

function MalCard(props) {
  return (
    <li class="horizontal-search-card">
      <A href={props.card.url}>
        <img src={props.card.images.webp.image_url} alt="Anime cover" />
        <p class="line-clamp">
          <Switch>
            <Match when={props.card.titles.English}>{props.card.titles.English}</Match>
            <Match when={props.card.titles.Default}>{props.card.titles.Default}</Match>
          </Switch>
        </p>
      </A>
    </li>
  );
}

function AniCardRow(props) {
  return (
    <For each={props.data}>
      {card => <AniCard card={card} />}
    </For>
  );
}

function AniCard(props) {
  const { openEditor } = useEditMediaEntries();
  const { accessToken } = useAuthentication();

  return ( 
    <li class="horizontal-search-card">
      <A href={"/" + props.card.type.toLowerCase() +  "/" + props.card.id + "/" + formatTitleToUrl(props.card.title.userPreferred)}>
        <div class="container">
          <img src={props.card.coverImage.large} alt="Cover." />
          <div class="search-card-quick-action">
            <ul class="search-card-quick-action-items">
              <li class="item" label="Edit media">
                <button onClick={e => {
                  e.preventDefault();
                  openEditor(props.card);
                }}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg>
                </button>
              </li>
              <li class="item" label="Set to planning">
                <button onClick={e => {
                  e.preventDefault();
                  api.anilist.mutateMedia(accessToken(), { mediaId: props.card.id, status: "PLANNING" });
                }}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path></svg>
                </button>
              </li>
              <li class="item" label="Set to watching">
                <button onClick={e => {
                  e.preventDefault();
                  api.anilist.mutateMedia(accessToken(), { mediaId: props.card.id, status: "CURRENT" });
                }}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>
                </button>
              </li>
              <li class="item" label="Set to completed">
                <button onClick={e => {
                  e.preventDefault();
                  api.anilist.mutateMedia(accessToken(), { mediaId: props.card.id, status: "COMPLETED" });
                }}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                </button>
              </li>
              <li class="item" label="Set to rewatching">
                <button onClick={e => {
                  e.preventDefault();
                  api.anilist.mutateMedia(accessToken(), { mediaId: props.card.id, status: "REPEAT" });
                }}>
                  <svg  viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M5.23331,0.493645 C6.8801,-0.113331 8.6808,-0.161915 10.3579,0.355379 C11.5179,0.713177 12.5743,1.32796 13.4526,2.14597 L14.2929,1.30564 C14.9229,0.675676 16,1.12184 16,2.01275 L16,6.00002 L12.0127,6.00002 C11.1218,6.00002 10.6757,4.92288 11.3056,4.29291 L12.0372,3.56137 C11.389,2.97184 10.6156,2.52782 9.76845,2.26653 C8.5106,1.87856 7.16008,1.915 5.92498,2.37023 C4.68989,2.82547 3.63877,3.67423 2.93361,4.78573 C2.22844,5.89723 1.90836,7.20978 2.02268,8.52112 C2.13701,9.83246 2.6794,11.0698 3.56627,12.0425 C4.45315,13.0152 5.63528,13.6693 6.93052,13.9039 C8.22576,14.1385 9.56221,13.9407 10.7339,13.3409 C11.9057,12.7412 12.8476,11.7727 13.4147,10.5848 C13.6526,10.0864 14.2495,9.8752 14.748,10.1131 C15.2464,10.351 15.4575,10.948 15.2196,11.4464 C14.4635,13.0302 13.2076,14.3215 11.6453,15.1213 C10.0829,15.921 8.30101,16.1847 6.57402,15.8719 C4.84704,15.559 3.27086,14.687 2.08836,13.39 C0.905861,12.0931 0.182675,10.4433 0.0302394,8.69483 C-0.122195,6.94637 0.304581,5.1963 1.2448,3.7143 C2.18503,2.2323 3.58652,1.10062 5.23331,0.493645 Z"/>
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <p class="line-clamp">
          <Show when={props.card.mediaListEntry?.status}>
            <div class="list-status" attr:data-status={props.card.mediaListEntry.status}></div>
          </Show>
          {props.card.title.userPreferred}
        </p>
      </A> 
    </li>
  );
}
