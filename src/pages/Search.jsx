import { A, useLocation, useNavigate, useParams, useSearchParams } from "@solidjs/router";
import api from "../utils/api";
import { createSignal, createEffect, Show, on, For, untrack, Match, Switch, onMount, onCleanup } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";
import { useAuthentication } from "../context/AuthenticationContext";
import { assert } from "../utils/assert";
import "./Search.scss";
import { capitalize, formatMediaFormat, formatTitleToUrl, numberCommas } from "../utils/formating";
import Emoji from "../assets/Emoji";
import { useEditMediaEntries } from "../context/EditMediaEntriesContext";
import { getDates } from "../utils/dates";

function toObject(value) {
  if (value == null) {
    return {};
  }

  if (Array.isArray(value)) {
    return Object.fromEntries(value.map(k => ([k, true])));
  }

  return { [value]: true };
}

function parseUrl(type, header, search) {
  const variables = {};

  const searchObject = new URLSearchParams(search).entries().reduce((acc, [key, val]) => {
    if (Array.isArray(acc[key])) {
      acc[key].push(val);
    } else if(acc[key] && val) {
      acc[key] = [acc[key], val];
    } else {
      acc[key] = val || undefined;
    }

    return acc;
  }, {});

  if (Number(searchObject.page) > 1) {
    variables.page = Number(searchObject.page);
  }

  switch(searchObject.age) {
    case "adult": 
      variables.isAdult = true;
      break;
    case "all": 
      break;
    default: 
      variables.isAdult = false;
  }

  if (searchObject.search && !searchObject.sort) {
    variables.sort = "SEARCH_MATCH"; 
  } else if (searchObject.sort === "TRENDING_DESC") {
    variables.sort = ["TRENDING_DESC", "SCORE_DESC"];
  } else if (searchObject.sort === "SCORE_DESC") {
    variables.sort = ["SCORE_DESC", "POPULARITY_DESC"];
  } else if (searchObject.sort === "CHAPTERS_DESC" || searchObject.sort === "CHAPTERS" || searchObject.sort === "EPISODES_DESC" || searchObject.sort === "EPISODES") {
    variables.sort = [searchObject.sort, "POPULARITY_DESC"];
    variables.chapterGreater = 0;
  } else if (searchObject.sort === "DURATION_DESC" || searchObject.sort === "DURATION" || searchObject.sort === "VOLUMES_DESC" || searchObject.sort === "VOLUMES") {
    variables.sort = [searchObject.sort, "POPULARITY_DESC"];
    variables.durationGreater = 0;
    variables.volumeGreater = 0;
  } else if (searchObject.sort === "END_DATE_DESC" || searchObject.sort === "END_DATE") {
    variables.sort = [searchObject.sort, "POPULARITY_DESC"];
    variables.endDateGreater = 0;
  } else if (searchObject.sort === "START_DATE_DESC" || searchObject.sort === "START_DATE") {
    variables.sort = [searchObject.sort, "POPULARITY_DESC"];
    variables.yearGreater = 0;
  } 

  if (searchObject.sort) { 
    variables.sort ??= searchObject.sort;
  }

  if (searchObject.year) {
    variables.year = searchObject.year + "%";
  }

  if (type === "anime") {
    variables.type = "ANIME";
  } else if (type === "manga") {
    variables.type = "MANGA";
  }

  if (header === "this-season") {
    const dates = getDates();
    variables.year = dates.seasonYear + "%";
    variables.season = dates.season;
  } else if (header === "next-season") {
    const dates = getDates();
    variables.year = dates.nextYear + "%";
    variables.season = dates.nextSeason;
  } else if (header === "trending") {
    variables.sort = ["TRENDING_DESC", "SCORE_DESC"];
  } else if (header === "popular") {
    variables.sort = null;
  } else if (header === "top-100") {
    variables.sort = ["SCORE_DESC", "POPULARITY_DESC"];
  } else if (header === "manwha") {
    variables.countryOfOrigin = "KR";
    variables.sort = null;
  } else if (header === "novel") {
    variables.format = "NOVEL"
    variables.sort = null;
  } else if (header === "new") {
    variables.sort = "ID_DESC";
  } else if (header === "finished" || header === "finished-manga" || header === "finished-novel") {
    variables.sort = "END_DATE_DESC";
    variables.status = "FINISHED";

    if (header === "finished-manga" ) {
      variables.format = "MANGA";
    } else if (header === "finished-novel") {
      variables.format = "NOVEL";
    }
  }

  variables.chapterGreater ??= searchObject.chapterGreater;
  variables.chapterLesser ??= searchObject.chapterLesser;
  variables.countryOfOrigin ??= searchObject.countryOfOrigin;
  variables.durationGreater ??= searchObject.durationGreater;
  variables.durationLesser ??= searchObject.durationLesser;
  variables.episodeGreater ??= searchObject.episodeGreater;
  variables.episodeLesser ??= searchObject.episodeLesser;
  variables.excludedGenres ??= searchObject.excludedGenres;
  variables.excludedTags ??= searchObject.excludedTags;
  variables.format ??= searchObject.format;
  variables.genres ??= searchObject.genres;
  variables.id ??= searchObject.id;
  // variables.isAdult ??= searchObject.isAdult;
  variables.isLicensed ??= searchObject.isLicensed;
  variables.licensedBy ??= searchObject.licensedBy;
  variables.minimumTagRank ??= searchObject.minimumTagRank;
  variables.onList ??= searchObject.onList;
  variables.search ??= searchObject.search;
  variables.season ??= searchObject.season;
  variables.source ??= searchObject.source;
  variables.status ??= searchObject.status;
  variables.tags ??= searchObject.tags;
  // variables.type ??= searchObject.type;
  variables.volumeGreater ??= searchObject.volumeGreater;
  variables.volumeLesser ??= searchObject.volumeLesser;
  variables.year ??= searchObject.year;
  variables.yearGreater ??= searchObject.yearGreater;
  variables.yearLesser ??= searchObject.yearLesser;
  variables.endDateLike ??= searchObject.endDateLike;
  variables.endDateLesser ??= searchObject.endDateLesser;
  variables.endDateGreater ??= searchObject.endDateGreater;

  for(const [key, value] of Object.entries(variables)) {
    if (value == null) { delete variables[key]; }
    if (value === "false") { variables[key] = false; }
    if (value === "true") { variables[key] = true; }
  }

  return variables;
};

function searchQueryFromForm(form, fallbackToDefaultSort) {
  assert(typeof fallbackToDefaultSort === "boolean", "Set value for default sorting");
  const formData = new FormData(form);
  const search = [];
  new URLSearchParams(formData).entries().forEach(([key, val]) => {
    if (val && key !== "type") {
      search.push(key + "=" + val);
    }
  });

  if (search.length) {
    return "?" + search.join("&");
  } else if(fallbackToDefaultSort) {
    return "?sort=POPULARITY_DESC"
  }

  return "";
}

function groupTagsByCategory(tags) {
  if (!tags) return {}
  const group = {};

  for(const tag of tags) {
    group[tag.category] ??= [];
    group[tag.category].push(tag);
  }

  return group;
}


function createFormStateObject(variables) {
  return {
    ...variables,
    format: toObject(variables.format),
    genres: toObject(variables.genres),
    excludedGenres: toObject(variables.excludedGenres),
    tags: toObject(variables.tags),
    licensedBy: toObject(variables.licensedBy),
    excludedTags: toObject(variables.excludedTags),
    sort: Array.isArray(variables.sort) ? variables.sort[0] : variables.sort,
  };
}

function Search() {
  const triggerVariable = debounce((variables) => setVariables(variables), 250);
  let _lastTimeHistoryChanged = performance.now()
  let form, sortInput;

  const { accessToken } = useAuthentication();
  const params = useParams();
  const _navigate = useNavigate();
  const location = useLocation();
  const [searchParams, _setSearchParams] = useSearchParams();
  const [variables, setVariables] = createSignal();
  const [cacheVariables, setCacheVariables] = createSignal();
  const [cacheData] = api.anilist.searchMediaCache(accessToken, cacheVariables);
  const [genresAndTags] = api.anilist.genresAndTags();
  const [externalSources] = api.anilist.externalSources(() => (params.type?.toUpperCase() || null));
  let skipFirstDebounce = true;

  const [formStateObject, setFormStateObject] = createSignal(createFormStateObject(parseUrl(params.type, params.header, location.search)));

  createEffect(on(cacheData, data => {
    if (data) {
      setVariables(cacheVariables());
    }
  }));

  function setSearchParams(params, opt) {
    const time = performance.now() - _lastTimeHistoryChanged < 1000;
    _setSearchParams(params, { replace: time, ...opt });
    _lastTimeHistoryChanged = performance.now();
  }
  
  function navigate(string, opt) {
    const time = performance.now() - _lastTimeHistoryChanged < 1000;
    _navigate(string, { replace: time, ...opt });
    _lastTimeHistoryChanged = performance.now();
  }

  createEffect(() => {
    const variables = parseUrl(params.type, params.header, location.search);
    untrack(() => {
      setFormStateObject(createFormStateObject(variables));

      if (location.search.length === 0 && params.header === undefined) {
        skipFirstDebounce = true;
      } else if (params.header && location.search.length) {
        navigate("/search" + (params.type ? ("/" + params.type) : "") + searchQueryFromForm(form, false));
      } else {
        if (skipFirstDebounce) {
          skipFirstDebounce = false;
          setVariables(variables);
        } else {
          triggerVariable(variables);
        }
        setCacheVariables(variables);
      }
    });
  });

  return (
    <div class="search-page">
      <form ref={form} action="https://graphql.anilist.co" class="media-search-header" onInput={e => {
        const formData = new FormData(e.currentTarget);

        if (formData.get("type") === "anime" && params.type !== "anime") {
          navigate("/search/anime" + searchQueryFromForm(e.currentTarget, params.header !== undefined));
        } else if (formData.get("type") === "manga" && params.type !== "manga") { 
          navigate("/search/manga" + searchQueryFromForm(e.currentTarget, params.header !== undefined));
        } else if (formData.get("type") === "" && params.type !== undefined) {
          navigate("/search" + searchQueryFromForm(e.currentTarget, params.header !== undefined));
        } else {
          const data = formData.entries().reduce((acc, [key, val]) => {
            if (Array.isArray(acc[key])) {
              acc[key].push(val);
            } else if(acc[key] && val) {
              acc[key] = [acc[key], val];
            } else {
              acc[key] = val || undefined;
            }

            return acc;
          }, {});
          delete data.type;
          const keysToManuallyReset = ["format", "genres", "excludedGenres", "tags", "excludedTags", "licensedBy"]; 
          keysToManuallyReset.forEach(key => data[key] ??= undefined);

          console.log("Form: ", { ...data });
          setSearchParams(data);
        }
      }}>
        <div>
          <label htmlFor="search">Search</label><br />
          <input type="search" name="search" id="search" value={formStateObject().search || ""} onInput={() => {
            sortInput.value = "";
          }}/>
          <button type="button" onClick={() => setSearchParams({page: +searchParams.page + 1 || 1})}>Next page</button>
        </div>
        <div>
          <p>Media Type</p>
          <select name="type" value={params.type || ""}>
            <option value="">Both</option>
            <option value="anime">Anime</option>
            <option value="manga">Manga</option>
          </select>
        </div>
        <div>
          <p>Rating</p>
          <select name="age">
            <option selected={formStateObject().isAdult === false} value="">R-17+</option>
            <option selected={formStateObject().isAdult === true} value="adult">R-18</option>
            <option selected={formStateObject().isAdult === undefined} value="all">All ratings</option>
          </select>
        </div>
        <div>
          <p>On my list</p>
          <select name="onList" value={formStateObject().onList?.toString() || ""}>
            <option value="">Default</option>
            <option value="false">Exclude</option>
            <option value="true">Include</option>
          </select>
        </div>
        <Show when={params.type === "anime"}>
          <div>
            <p>Season</p>
            <select name="season">
              <option selected={formStateObject().season === ""} value="">Select season</option>
              <option selected={formStateObject().season === "WINTER"} value="WINTER">Winter</option>
              <option selected={formStateObject().season === "SPRING"} value="SPRING">Spring</option>
              <option selected={formStateObject().season === "SUMMER"} value="SUMMER">Summer</option>
              <option selected={formStateObject().season === "FALL"} value="FALL">Fall</option>
            </select>
          </div>
        </Show>
        <div>
          <label htmlFor="year">Year</label><br />
          <input 
            type="number" 
            name="year" 
            id="year" 
            value={formStateObject().year?.substring(0, formStateObject().year.length - 1) || ""} 
          />
        </div>
        <div>
          <p>Format</p>
          <select name="format" multiple>
            <Show when={params.type !== "anime"}>
              <option selected={formStateObject().format?.MANGA} value="MANGA">Manga</option>
              <option selected={formStateObject().format?.NOVEL} value="NOVEL">Novel</option>
              <option selected={formStateObject().format?.ONE_SHOT} value="ONE_SHOT">One shot</option>
            </Show>
            <Show when={params.type !== "manga"}>
              <option selected={formStateObject().format?.MOVIE} value="MOVIE">Movie</option>
              <option selected={formStateObject().format?.MUSIC} value="MUSIC">Music</option>
              <option selected={formStateObject().format?.ONA} value="ONA">Ona</option>
              <option selected={formStateObject().format?.OVA} value="OVA">Ova</option>
              <option selected={formStateObject().format?.SPECIAL} value="SPECIAL">Special</option>
              <option selected={formStateObject().format?.TV} value="TV">TV</option>
              <option selected={formStateObject().format?.TV_SHORT} value="TV_SHORT">TV short</option>
            </Show>
          </select>
        </div>
        <div style={{display: "flex", gap: ".5rem" }}>
          <div>
            <p>Genres</p>
            <select name="genres" multiple>
              <For each={genresAndTags()?.data.data.genres}>{genre => (
                <Show when={formStateObject().excludedGenres[genre] !== true}>
                  <Switch>
                    <Match when={genre !== "Hentai"}>
                      <option selected={formStateObject().genres?.[genre]} value={genre}>{genre}</option>
                    </Match>
                    <Match when={formStateObject().isAdult !== false}>
                      <option selected={formStateObject().genres?.[genre]} value={genre}>{genre} (+18)</option>
                    </Match>
                  </Switch>
                </Show>
              )}</For>
            </select>
          </div>
          <div>
            <p>Exclude Genres</p>
            <select name="excludedGenres" multiple>
              <For each={genresAndTags()?.data.data.genres}>{genre => (
                <Show when={formStateObject().genres[genre] !== true}>
                  <Switch>
                    <Match when={genre !== "Hentai"}>
                      <option selected={formStateObject().excludedGenres?.[genre]} value={genre}>{genre}</option>
                    </Match>
                    <Match when={formStateObject().isAdult !== false}>
                      <option selected={formStateObject().excludedGenres?.[genre]} value={genre}>{genre} (+18)</option>
                    </Match>
                  </Switch>
                </Show>
              )}</For>
            </select>
          </div>
        </div>
        <div style={{display: "flex", gap: ".5rem" }}>
          <div>
            <p>Tags</p>
            <select name="tags" multiple>
              <For each={Object.entries(groupTagsByCategory(genresAndTags()?.data.data.tags))}>
                {([category, tags]) => (
                  <Show when={tags.some(tag => !tag.isAdult || formStateObject().isAdult !== false)}>
                    <optgroup label={category}>
                      <For each={tags}>{tag => (
                        <Show when={formStateObject().excludedTags[tag.name] !== true}>
                          <Switch>
                            <Match when={!tag.isAdult}>
                              <option selected={formStateObject().tags?.[tag.name]} value={tag.name}>{tag.name}</option>
                            </Match>
                            <Match when={(formStateObject().isAdult !== false)}>
                              <option selected={formStateObject().tags?.[tag.name]} value={tag.name}>{tag.name} (+18)</option>
                            </Match>
                          </Switch>
                        </Show>
                      )}</For>
                    </optgroup>
                  </Show>
                )}
              </For>
            </select>
          </div>
          <div>
            <p>Exclude Tags</p>
            <select name="excludedTags" multiple>
              <For each={Object.entries(groupTagsByCategory(genresAndTags()?.data.data.tags))}>
                {([category, tags]) => (
                  <Show when={tags.some(tag => !tag.isAdult || formStateObject().isAdult !== false)}>
                    <optgroup label={category}>
                      <For each={tags}>{tag => (
                        <Show when={formStateObject().tags[tag.name] !== true}>
                          <Switch>
                            <Match when={!tag.isAdult}>
                              <option selected={formStateObject().excludedTags?.[tag.name]} value={tag.name}>{tag.name}</option>
                            </Match>
                            <Match when={(formStateObject().isAdult !== false)}>
                              <option selected={formStateObject().excludedTags?.[tag.name]} value={tag.name}>{tag.name} (+18)</option>
                            </Match>
                          </Switch>
                        </Show>
                      )}</For>
                    </optgroup>
                  </Show>
                )}
              </For>
            </select>
          </div>
        </div>
        <div style={{display: "flex", gap: ".5rem" }}>
          <div>
            <p>Sort Order</p>
            <select onInput={e => {
              const value = e.target.value;
              const sort = formStateObject().sort;
              if (sort === undefined) {
                setFormStateObject(v => ({...v, sort: "POPULARITY"}));
              } else if (value === "ASC") {
                setFormStateObject(v => ({...v, sort: sort.substring(0, sort.length - 5)}));
              } else {
                setFormStateObject(v => ({...v, sort: sort + "_DESC"}));
              }
            }}>
              <Switch>
                <Match when={formStateObject().sort === "SEARCH_MATCH"}>
                  <option selected value="desc">DESC</option>
                </Match>
                <Match when={formStateObject().sort === undefined}>
                  <option selected value="desc">DESC</option>
                  <option value="asc">ASC</option>
                </Match>
                <Match when={formStateObject().sort !== undefined}>
                  <option selected={formStateObject().sort.endsWith("_DESC") === true} value="DESC">DESC</option>
                  <option selected={formStateObject().sort.endsWith("_DESC") === false} value="ASC">ASC</option>
                </Match>
              </Switch>
            </select>
          </div>
          <SortSelect sort={formStateObject().sort} ref={sortInput} />
        </div>
        <div>
          <p>Airing Status</p>
          <select name="status" value={formStateObject().status || ""}>
            <option value="">All Status</option>
            <option value="RELEASING">Releasing</option>
            <option value="FINISHED">Finished</option>
            <option value="NOT_YET_RELEASED">Not Yet Released</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <div>
          <p>Country of Origin</p>
          <select name="countryOfOrigin" value={formStateObject().countryOfOrigin || ""}>
            <option value="">All Countries</option>
            <option value="CN">China</option>
            <option value="JP">Japan</option>
            <option value="KR">South Korea</option>
            <option value="TW">Taiwan</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: ".5rem" }}>
          <div>
            <p>Source</p>
            <select name="source" value={formStateObject().source || ""}>
              <option value="">All Sources</option>
              <option value="ANIME">Anime</option>
              <option value="COMIC">Comic</option>
              <option value="DOUJINSHI">Doujinshi</option>
              <option value="GAME">Game</option>
              <option value="LIGHT_NOVEL">Light Novel</option>
              <option value="LIVE_ACTION">Live Action</option>
              <option value="MANGA">Manga</option>
              <option value="MULTIMEDIA_PROJECT">Multimedia Project</option>
              <option value="NOVEL">Novel</option>
              <option value="ORIGINAL">Original</option>
              <option value="OTHER">Other</option>
              <option value="PICTURE_BOOK">Picture Book</option>
              <option value="VIDEO_GAME">Video Game</option>
              <option value="VISUAL_NOVEL">Visual Novel</option>
              <option value="WEB_NOVEL">Web Novel</option>
            </select>
          </div>
          <div>
            <p>Streaming/Licensed On</p>
            <select name="licensedBy" multiple>
              <Show when={externalSources()}>
                <For each={externalSources().data.data.ExternalLinkSourceCollection}>{source => (
                  <option 
                    selected={formStateObject().licensedBy?.[source.id]} 
                    value={source.id}
                    style={{
                      ...(source.icon ? {
                        "background-image": `url(${source.icon}), linear-gradient(90deg, ${source.color} 0%, ${source.color} 100%)`,
                        "background-size": "16px, 24px",
                        "background-position": "4px center, 0px",
                        "background-repeat": "no-repeat",
                        "padding-left": "28px",
                      } : {})
                    }}
                  >
                    {source.site}
                  </option>
                )}</For>
              </Show>
            </select>
          </div>
        </div>
        <div>
          <p>Episode Range</p>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <div>
              <label htmlFor="episodeGreater">Min</label><br />
              <input 
                type="number" 
                inputMode="numeric" 
                name="episodeGreater" 
                id="episodeGreater"
                min="0"
                value={formStateObject().episodeGreater || ""}
              />
            </div>
            <div>
              <label htmlFor="episodeLesser">Max</label><br />
              <input 
                type="number" 
                inputMode="numeric" 
                name="episodeLesser" 
                id="episodeLesser"
                min="0"
                value={formStateObject().episodeLesser || ""}
              />
            </div>
          </div>
        </div>
        <div>
          <p>License Status</p>
          <select name="isLicensed" value={formStateObject().isLicensed?.toString() || ""}>
            <option value="">All</option>
            <option value="true">Licensed</option>
            <option value="false">Unlicensed</option>
          </select>
        </div>
      </form>
      <Switch>
        <Match when={location.search.length || params.header}>
          <SearchContentCards variables={variables()}/>
        </Match>
        <Match when={location.search.length === 0}>
          <Switch>
            <Match when={params.type === "anime"}>
              <AnimeSearch />
            </Match>
            <Match when={params.type === "manga"}>
              <MangaSearch />
            </Match>
            <Match when={params.type === undefined}>
              <SearchHome />
            </Match>
          </Switch>
        </Match>
      </Switch>
    </div>
  )
}

function SortSelect(props) {
  assert("sort" in props, "key \"sort\" is missing");
  const params = useParams();
  const [searchParams] = useSearchParams();

  return (
    <div>
      <p>Sort</p>
      <select name="sort" ref={props.ref}>
        <Switch>
          <Match when={
            props.sort === "SEARCH_MATCH" ||
            props.sort === undefined ||
            props.sort.endsWith("_DESC") === true 
          }>
            <Show when={params.type === "manga"}>
              <option selected={props.sort === "CHAPTERS_DESC"} value="CHAPTERS_DESC">Chapters</option>
            </Show>
            <Show when={params.type === "anime"}>
              <option selected={props.sort === "DURATION_DESC"} value="DURATION_DESC">Duration</option>
            </Show>
            <Show when={params.type === undefined}>
              <option selected={props.sort === "DURATION_DESC"} value="DURATION_DESC">Duration / Volumes</option>
            </Show>
            <option selected={props.sort === "END_DATE_DESC"} value="END_DATE_DESC">End date</option>
            <Show when={params.type === "anime"}>
              <option selected={props.sort === "CHAPTERS_DESC"} value="CHAPTERS_DESC">Episodes</option>
            </Show>
            <Show when={params.type === undefined}>
              <option selected={props.sort === "CHAPTERS_DESC"} value="CHAPTERS_DESC">Episodes / Chapters</option>
            </Show>
            <option selected={props.sort === "FAVOURITES_DESC"} value="FAVOURITES_DESC">Favourites</option>
            <option selected={props.sort === "ID_DESC"} value="ID_DESC">ID</option>
            <option selected={props.sort === "UPDATED_AT_DESC"} value="UPDATED_AT_DESC">Last updated</option>
            <Switch>
              <Match when={props.sort !== undefined}>
                <option selected={props.sort === "POPULARITY_DESC"} value="POPULARITY_DESC">Popularity</option>
              </Match>
              <Match when={props.sort === undefined}>
                <option selected={props.sort === undefined} value="">Popularity (default)</option>
              </Match>
            </Switch>
            <option selected={props.sort === "SCORE_DESC"} value="SCORE_DESC">Score</option>
            <Show when={searchParams.search?.length}>
              <option selected={props.sort === "SEARCH_MATCH"} value="">Search match</option>
            </Show>
            <option selected={props.sort === "START_DATE_DESC"} value="START_DATE_DESC">Start date</option>
            <option selected={props.sort === "TITLE_ENGLISH_DESC"} value="TITLE_ENGLISH_DESC">Title English</option>
            <option selected={props.sort === "TITLE_NATIVE_DESC"} value="TITLE_NATIVE_DESC">Title Native</option>
            <option selected={props.sort === "TITLE_ROMAJI_DESC"} value="TITLE_ROMAJI_DESC">Title Romaji</option>
            <option selected={props.sort === "TRENDING_DESC"} value="TRENDING_DESC">Trending</option>
            <Show when={params.type === "manga"}>
              <option selected={props.sort === "DURATION_DESC"} value="DURATION_DESC">Volumes</option>
            </Show>
          </Match>

          <Match when={props.sort.endsWith("_DESC") === false}>
            <Show when={params.type === "manga"}>
              <option selected={props.sort === "CHAPTERS"} value="CHAPTERS">Chapters</option>
            </Show>
            <Show when={params.type === "anime"}>
              <option selected={props.sort === "DURATION"} value="DURATION">Duration</option>
            </Show>
            <Show when={params.type === undefined}>
              <option selected={props.sort === "DURATION"} value="DURATION">Duration / Volumes</option>
            </Show>
            <option selected={props.sort === "END_DATE"} value="END_DATE">End date</option>
            <Show when={params.type === "anime"}>
              <option selected={props.sort === "CHAPTERS"} value="CHAPTERS">Episodes</option>
            </Show>
            <Show when={params.type === undefined}>
              <option selected={props.sort === "CHAPTERS"} value="CHAPTERS">Episodes / Chapters</option>
            </Show>
            <option selected={props.sort === "FAVOURITES"} value="FAVOURITES">Favourites</option>
            <option selected={props.sort === "ID"} value="ID">ID</option>
            <option selected={props.sort === "UPDATED_AT"} value="UPDATED_AT">Last updated</option>
            <option selected={props.sort === "POPULARITY"} value="POPULARITY">Popularity</option>
            <option selected={props.sort === "SCORE"} value="SCORE">Score</option>
            <Show when={searchParams.search?.length}>
              <option selected={props.sort === "SEARCH_MATCH"} value="">Search match</option>
            </Show>
            <option selected={props.sort === "START_DATE"} value="START_DATE">Start date</option>
            <option selected={props.sort === "TITLE_ENGLISH"} value="TITLE_ENGLISH">Title English</option>
            <option selected={props.sort === "TITLE_NATIVE"} value="TITLE_NATIVE">Title Native</option>
            <option selected={props.sort === "TITLE_ROMAJI"} value="TITLE_ROMAJI">Title Romaji</option>
            <option selected={props.sort === "TRENDING"} value="TRENDING">Trending</option>
            <Show when={params.type === "manga"}>
              <option selected={props.sort === "DURATION"} value="DURATION">Volumes</option>
            </Show>
          </Match>
        </Switch>
      </select>
    </div>
  );
}

function SearchHome() {
  const { accessToken } = useAuthentication();
  const [homeData] = api.anilist.trendingMedia(accessToken);

  return (
    <Show when={homeData()}>
      <div>{console.log("Search Home Data:", homeData())}</div>
      <div class="search-home-content">
        <HorizontalCardRow data={homeData().data.data.trending.media} href="trending" title="Trending anime and manga" />
        <HorizontalCardRow data={homeData().data.data.newAnime.media} href="anime/new" title="Newly added anime" />
        <HorizontalCardRow data={homeData().data.data.newManga.media} href="manga/new" title="Newly added manga" />
        <HorizontalCardRow data={homeData().data.data.finishedAnime.media} href="anime/finished" title="Recently finished anime" />
        <HorizontalCardRow data={homeData().data.data.finishedManga.media} href="manga/finished" title="Recently finished manga" />
        <VerticalCardRow data={homeData().data.data.top.media} href="top-100" title="Top 100 anime and manga" />
      </div>
    </Show>
  );
}

function AnimeSearch() {
  const {accessToken} = useAuthentication();
  const [animeData] = api.anilist.trendingAnime(accessToken);

  return (
    <Show when={animeData()}>
      <div class="search-home-content">
        <HorizontalCardRow data={animeData().data.data.trending.media} href="anime/trending" title="Trending now" />
        <HorizontalCardRow data={animeData().data.data.season.media} href="anime/this-season" title="Popular this season" />
        <HorizontalCardRow data={animeData().data.data.nextSeason.media} href="anime/next-season" title="Upcoming next season" />
        <HorizontalCardRow data={animeData().data.data.finished.media} href="anime/finished" title="Recently finished" />
        <HorizontalCardRow data={animeData().data.data.popular.media} href="anime/popular" title="All time popular" />
        <VerticalCardRow data={animeData().data.data.top.media} type="manga" href="anime/top-100" title="Top 100 anime" />
      </div>
    </Show>
  );
}

function MangaSearch() {
  const {accessToken} = useAuthentication();
  const [mangaData] = api.anilist.trendingManga(accessToken);

  return (
    <Show when={mangaData()}>
      <div class="search-home-content">
        <HorizontalCardRow data={mangaData().data.data.trending.media} href="manga/trending" title="Trending now" />
        <HorizontalCardRow data={mangaData().data.data.novel.media} href="manga/novel" title="Popular light novels" />
        <HorizontalCardRow data={mangaData().data.data.manhwa.media} href="manga/manwha" title="Popular Manwhas" />
        <HorizontalCardRow data={mangaData().data.data.finishedManga.media} href="manga/finished-manga" title="Recently finished mangas" />
        <HorizontalCardRow data={mangaData().data.data.finishedNovel.media} href="manga/finished-novel" title="Recently finished light novels" />
        <HorizontalCardRow data={mangaData().data.data.popular.media} href="manga/popular" title="All time popular" />
        <VerticalCardRow data={mangaData().data.data.top.media} type="manga" href="manga/top-100" title="Top 100 manga" />
      </div>
    </Show>
  );
}

function SearchContentCards(props) {
  const params = useParams();
  return (
    <div class="search-result-container">
      <Show when={params.header}>
        <h1>{params.header}</h1>
      </Show>
      <ol class="search-page-content">
        <SearchPage variables={props.variables} nestLevel={1} />
      </ol>
    </div>
  );
}

function SearchPage(props) {
  const {accessToken} = useAuthentication();
  const [variables, setVariables] = createSignal(undefined);
  const [mediaData] = api.anilist.searchMedia(accessToken, props.nestLevel === 1 ? () => props.variables : variables);
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
    <Switch fallback={<div ref={intersection}>Intersection</div>}>
      <Match when={mediaData()}>
        <CardRow data={mediaData().data.media}/>
        <Show when={mediaData().data.media} keyed={props.nestLevel === 1}>
          <Show when={props.variables}>
            {vars => (
              <Show when={(mediaData.loading && props.loading) === false} fallback="Fetch cooldown">
                <SearchPage 
                  variables={{ ...vars(), page: (vars()?.page || 1) + 1 }}
                  nestLevel={props.nestLevel + 1}
                  loading={mediaData.loading}
                />
              </Show>
            )}
          </Show>
        </Show>
      </Match>
      <Match when={mediaData.loading}>
        loading...
      </Match>
    </Switch>
  );
}

function VerticalCardRow(props) {
  assert("href" in props, "Link is missing");

  return (
    <section class="vertical-search-card-section">
      <div class="search-cards-header">
        <h2>{props.title}</h2>
        <A href={props.href}>View all</A>
      </div>
      <ol class="vertical-search-card-row">
        <For each={props.data}>
          {(card, i) => (
            <li class="vertical-search-card" style={{"--media-background-color": card.coverImage.color}}>
              <p class="ranking">
                #
                <span>{i() + 1}</span>
              </p>
              <div class="vertical-search-card-body">
                <A 
                  class="cover-container"
                  href={"/" + card.type.toLowerCase() +  "/" + card.id + "/" + formatTitleToUrl(card.title.userPreferred)}>
                  <img src={card.coverImage.large} class="cover" alt="Cover." />
                </A> 
                <div class="vertical-search-card-content clamp">
                  <A class="line-clamp-2" href={"/" + card.type.toLowerCase() +  "/" + card.id + "/" + formatTitleToUrl(card.title.userPreferred)}>
                    {card.title.userPreferred}
                  </A> 
                  <ol class="vertical-search-card-genre-list">
                    <For each={card.genres}>{genre => (
                      <li class="vertical-search-card-genre">
                        <A href={`/search${props.type ? ("/" + props.type) : ""}?genres=` + genre}>{genre}</A>
                      </li>
                    )}</For>
                  </ol>
                </div>
                <div class="vertical-search-card-info">
                  <div class="vertical-search-card-score">
                    <Emoji score={card.averageScore} />
                    <div class="clamp">
                      <p>{card.averageScore}%</p>
                      <p>{numberCommas(card.popularity)} users</p>
                    </div>
                  </div>
                  <div class="clamp">
                    <p>{formatMediaFormat(card.format)}</p>
                    <p>
                      <Switch>
                        <Match when={card.type === "ANIME"}>
                          <Show when={card.episodes} fallback="Ongoing">
                            {numberCommas(card.episodes)} Episode
                            <Show when={card.episodes > 1}>s</Show>
                          </Show>
                        </Match>
                        <Match when={card.type === "MANGA"}>
                          <Show when={card.chapters} fallback="Ongoing">
                            {numberCommas(card.chapters)} Chapter
                            <Show when={card.chapters > 1}>s</Show>
                          </Show>
                        </Match>
                      </Switch>
                    </p>
                  </div>
                  <div class="clamp">
                    <p>{capitalize(card.season)} {card.seasonYear}</p>
                    <p>{capitalize(card.status)}</p>
                  </div>
                </div>
              </div>
            </li>
          )}
        </For>
      </ol>
    </section>
  );
}

function HorizontalCardRow(props) {
  assert("href" in props, "Link is missing");

  return (
    <section class="horizontal-search-card-section">
      <A href={props.href} class="search-cards-header">
        <h2>{props.title}</h2>
        <span>View all</span>
      </A>
      <ol class="horizontal-search-card-row">
        <For each={props.data}>{card => (
          <Card card={card} />
        )}</For>
      </ol>
    </section>
  );
}


function CardRow(props) {
  return (
    <For each={props.data}>
      {card => <Card card={card} />}
    </For>
  );
}

function Card(props) {
  const { openEditor } = useEditMediaEntries();
  const { accessToken } = useAuthentication();

  return ( 
    <li class="horizontal-search-card">
      <A href={"/" + props.card.type.toLowerCase() +  "/" + props.card.id + "/" + formatTitleToUrl(props.card.title.userPreferred)}>
        <div class="container">
          <img src={props.card.coverImage.large} class="cover" alt="Cover." />
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
        <p class="line-clamp-2">
          <Show when={props.card.mediaListEntry?.status}>
            <div class="list-status" attr:data-status={props.card.mediaListEntry.status}></div>
          </Show>
          {props.card.title.userPreferred}
        </p>
      </A> 
    </li>
  );
}

export default Search
