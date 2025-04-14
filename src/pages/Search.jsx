import { A, useLocation, useNavigate, useParams, useSearchParams } from "@solidjs/router";
import api from "../utils/api";
import { createSignal, createEffect, Show, splitProps, on, For, untrack } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";
import { useAuthentication } from "../context/AuthenticationContext";
import { assert } from "../utils/assert";
import "./Search.scss";
import { capitalize, formatMediaFormat, formatTitleToUrl, numberCommas } from "../utils/formating";
import Emoji from "../assets/Emoji";
import { useEditMediaEntries } from "../context/EditMediaEntriesContext";
import { getDates } from "../utils/dates";

const joinIfArray = (arrayOrString, char = "&") => {
  if (Array.isArray(arrayOrString)) {
    return arrayOrString.join(char);
  }

  return arrayOrString;
}

function getSearchQueryFromObject(obj) {
  const search = [];
  if (obj.sort && obj.sort !== "POPULARITY_DESC" && obj !== "SEARCH_MATCH") {
    search.push("sort=" + obj.sort);
  }

  if(obj.isAdult) {
    search.push("age=adult");
  } else if (obj.isAdult === undefined) {
    search.push("age=all");
  }

  if (obj.year) {
    search.push("year=" + parseInt(obj.year));
  }

  if ("chapterGreater" in obj) { search.push("chapterGreater=" + joinIfArray(obj.chapterGreater)); }
  if ("chapterLesser" in obj) { search.push("chapterLesser=" + joinIfArray(obj.chapterLesser)); }
  if ("countryOfOrigin" in obj) { search.push("countryOfOrigin=" + joinIfArray(obj.countryOfOrigin)); }
  if ("durationGreater" in obj) { search.push("durationGreater=" + joinIfArray(obj.durationGreater)); }
  if ("durationLesser" in obj) { search.push("durationLesser=" + joinIfArray(obj.durationLesser)); }
  if ("episodeGreater" in obj) { search.push("episodeGreater=" + joinIfArray(obj.episodeGreater)); }
  if ("episodeLesser" in obj) { search.push("episodeLesser=" + joinIfArray(obj.episodeLesser)); }
  if ("excludedGenres" in obj) { search.push("excludedGenres=" + joinIfArray(obj.excludedGenres)); }
  if ("excludedTags" in obj) { search.push("excludedTags=" + joinIfArray(obj.excludedTags)); }
  if ("format" in obj) { search.push("format=" + joinIfArray(obj.format)); }
  if ("genres" in obj) { search.push("genres=" + joinIfArray(obj.genres)); }
  if ("id" in obj) { search.push("id=" + joinIfArray(obj.id)); }
  if ("isLicensed" in obj) { search.push("isLicensed=" + joinIfArray(obj.isLicensed)); }
  if ("licensedBy" in obj) { search.push("licensedBy=" + joinIfArray(obj.licensedBy)); }
  if ("minimumTagRank" in obj) { search.push("minimumTagRank=" + joinIfArray(obj.minimumTagRank)); }
  if ("onList" in obj) { search.push("onList=" + joinIfArray(obj.onList)); }
  if ("search" in obj) { search.push("search=" + joinIfArray(obj.search)); }
  if ("season" in obj) { search.push("season=" + joinIfArray(obj.season)); }
  if ("source" in obj) { search.push("source=" + joinIfArray(obj.source)); }
  if ("status" in obj) { search.push("status=" + joinIfArray(obj.status)); }
  if ("tags" in obj) { search.push("tags=" + joinIfArray(obj.tags)); }
  if ("volumeGreater" in obj) { search.push("volumeGreater=" + joinIfArray(obj.volumeGreater)); }
  if ("volumeLesser" in obj) { search.push("volumeLesser=" + joinIfArray(obj.volumeLesser)); }
  if ("yearGreater" in obj) { search.push("yearGreater=" + joinIfArray(obj.yearGreater)); }
  if ("yearLesser" in obj) { search.push("yearLesser=" + joinIfArray(obj.yearLesser)); }

  if (search.length) {
    return "?" + search.join("&");
  } 

  return "";
}

function Search() {
  const triggerVariable = debounce((variables) => setVariables(variables), 250);
  let _lastTimeHistoryChanged = performance.now()

  const { accessToken } = useAuthentication();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, _setSearchParams] = useSearchParams();
  const _initVariables = getSearchParamObject();
  const [variables, setVariables] = createSignal(_initVariables);
  const [cacheVariables, setCacheVariables] = createSignal(_initVariables);
  const [mediaData, { mutate: mutateMediaData }] = api.anilist.searchMedia(accessToken, variables);
  const [cacheData] = api.anilist.searchMediaCache(accessToken, cacheVariables);

  createEffect(on(cacheData, data => {
    if (data) {
      triggerVariable.clear();
      mutateMediaData(data);
    }
  }));

  function setSearchParams(params, opt) {
    const time = performance.now() - _lastTimeHistoryChanged < 1000;
    _setSearchParams(params, { replace: time, ...opt });
    _lastTimeHistoryChanged = performance.now();
  }

  function getSearchParamObject() {
    if (location.search.length === 0 && params.header === undefined) {
      return undefined;
    }

    const search = { "page": 1, "sort": "POPULARITY_DESC" };
    if (Number(searchParams.page) > 1) {
      search.page = Number(searchParams.page);
    }

    switch(searchParams.age) {
      case "adult": 
        search.isAdult = true;
        break;
      case "all": 
        break;
      default: 
        search.isAdult = false;
    }

    if (searchParams.year) {
      search.year = searchParams.year + "%";
    }

    if (searchParams.search && !searchParams.sort) {
      search.sort = "SEARCH_MATCH"
    } else {
      search.sort = searchParams.sort;
    }

    if (params.type === "anime") {
      search.type = "ANIME";
    } else if (params.type === "manga") {
      search.type = "MANGA";
    }

    if (params.header === "this-season") {
      const dates = getDates();
      search.year = dates.seasonYear + "%";
      search.season = dates.season;
    }



    search.chapterGreater ??= searchParams.chapterGreater;
    search.chapterLesser ??= searchParams.chapterLesser;
    search.countryOfOrigin ??= searchParams.countryOfOrigin;
    search.durationGreater ??= searchParams.durationGreater;
    search.durationLesser ??= searchParams.durationLesser;
    search.episodeGreater ??= searchParams.episodeGreater;
    search.episodeLesser ??= searchParams.episodeLesser;
    search.excludedGenres ??= searchParams.excludedGenres;
    search.excludedTags ??= searchParams.excludedTags;
    search.format ??= searchParams.format;
    search.genres ??= searchParams.genres;
    search.id ??= searchParams.id;
    // search.isAdult ??= searchParams.isAdult;
    search.isLicensed ??= searchParams.isLicensed;
    search.licensedBy ??= searchParams.licensedBy;
    search.minimumTagRank ??= searchParams.minimumTagRank;
    search.onList ??= searchParams.onList;
    search.search ??= searchParams.search;
    search.season ??= searchParams.season;
    search.source ??= searchParams.source;
    search.status ??= searchParams.status;
    search.tags ??= searchParams.tags;
    // search.type ??= searchParams.type;
    search.volumeGreater ??= searchParams.volumeGreater;
    search.volumeLesser ??= searchParams.volumeLesser;
    // search.year ??= searchParams.year;
    search.yearGreater ??= searchParams.yearGreater;
    search.yearLesser ??= searchParams.yearLesser;

    for(const [key, value] of Object.entries(search)) {
      if (value == null) { delete search[key]; }
      if (value === "false") { search[key] = false; }
      if (value === "true") { search[key] = true; }
    }

    return search;
  }


  createEffect(() => {
    searchParams;
    const search = getSearchParamObject()
    untrack(() => {
      if(search) {
        if (params.header && location.search.length) {
          const newSearchQuery = getSearchQueryFromObject(search);
          console.log("newSearchQuery:", newSearchQuery);
          navigate("/search" + (!params.type || ("/" + params.type)) + newSearchQuery);
          return;
        }
        triggerVariable(search);
        setCacheVariables(search);
      } else {
        mutateMediaData(undefined);
      }
    });
  });

  return (
    <div class="search-page">
      <form action="https://graphql.anilist.co" class="media-search-header" onInput={e => {
        const formData = new FormData(e.currentTarget);
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
        const keysToManuallyReset = ["format"]; 
        keysToManuallyReset.forEach(key => data[key] ??= undefined);

        if (data.type === "anime" && params.type !== "anime") {
          navigate("/search/anime" + location.search);
        } else if (data.type === "manga" && params.type !== "manga") { 
          navigate("/search/manga" + location.search);
        } else if (params.type !== undefined) {
          navigate("/search" + location.search);
        }
        delete data.type;

        console.log("Form: ", { ...data });
        setSearchParams(data);
      }}>
        <button type="button" onClick={() => setSearchParams({page: +searchParams.page + 1 || 1})}>Next page</button>
        <div>
          <InputSearch type="search" id="search" name="search">Search </InputSearch>
        </div>
        <div>
          <p>Media Type</p>
          <select name="type">
            <TypeOption name="type" value="">Both</TypeOption>
            <TypeOption name="type" value="anime">Anime</TypeOption>
            <TypeOption name="type" value="manga">Manga</TypeOption>
          </select>
        </div>
        <div>
          <p>Rating</p>
          <select name="age">
            <Option name="age" value="">R-17+</Option>
            <Option name="age" value="adult">R-18</Option>
            <Option name="age" value="all">All ratings</Option>
          </select>
        </div>
        <div>
          <p>On my list</p>
          <select name="onList">
            <Option name="onList" value="">Default</Option>
            <Option name="onList" value="false">Exclude</Option>
            <Option name="onList" value="true">Include</Option>
          </select>
        </div>
        <div>
          <InputSearch type="number" name="year" id="year" maxlength="4" size="4">Year</InputSearch>
        </div>
        <Show when={params.type === "anime"}>
          <div>
            <p>Season</p>
            <select name="season">
              <Option name="season" value="">Select season</Option>
              <Option name="season" value="WINTER">Winter</Option>
              <Option name="season" value="SPRING">Spring</Option>
              <Option name="season" value="SUMMER">Summer</Option>
              <Option name="season" value="FALL">Fall</Option>
            </select>
          </div>
        </Show>
        <div>
          <p>Format</p>
          <select name="format" multiple>
            <Show when={searchParams.type !== "ANIME"}>
              <Option name="format" value="MANGA">Manga</Option>
              <Option name="format" value="NOVEL">Novel</Option>
              <Option name="format" value="ONE_SHOT">One shot</Option>
            </Show>
            <Show when={searchParams.type !== "MANGA"}>
              <Option name="format" value="MOVIE">Movie</Option>
              <Option name="format" value="MUSIC">Music</Option>
              <Option name="format" value="ONA">Ona</Option>
              <Option name="format" value="OVA">Ova</Option>
              <Option name="format" value="SPECIAL">Special</Option>
              <Option name="format" value="TV">TV</Option>
              <Option name="format" value="TV_SHORT">TV short</Option>
            </Show>
          </select>
        </div>
      </form>
      {/* {console.log(mediaData())} */}
      <Switch>
        <Match when={location.search.length || params.header}>
          <SearchContent content={mediaData()}/>
        </Match>
        <Match when={location.search.length === 0}>
          <Switch>
            <Match when={params.type === "anime"}>
              <AnimeSearch />
            </Match>
            <Match when={params.type === "manga"}>
              manga
            </Match>
            <Match when={params.type === undefined}>
              Both
            </Match>
          </Switch>
        </Match>
      </Switch>
    </div>
  )

  function InputSearch(props) {
    const [otherProps, inputProps] = splitProps(props, ["children"]);
    assert(inputProps.type, "Input type is missing");
    assert(inputProps.name, "Input name is missing");

    return (
      <>
        <label htmlFor={inputProps.id}>{otherProps.children}</label><br />
        <input value={searchParams[props.name] || ""} {...inputProps} />
      </>
    )
  }

  function Input(props) {
    const [otherProps, inputProps] = splitProps(props, ["children"]);
    assert(inputProps.type, "Input type is missing");
    assert(inputProps.name, "Input name is missing");
    assert(!inputProps.value !== undefined, "Input value is missing");

    return (
      <>
        <input checked={(searchParams[props.name] || "") === props.value} {...inputProps} />
        <label htmlFor={inputProps.id}>{otherProps.children}</label>
      </>
    )
  }

  function Option(props) {
    assert(props.name, "Option name is missing");
    assert(props.value !== undefined, "Option value is missing");

    return (
      <option selected={(searchParams[props.name] || "").includes(props.value)} {...props} />
    )
  }

  function TypeOption(props) {
    assert(props.name, "Option name is missing");
    assert(props.value !== undefined, "Option value is missing");

    return (
      <option selected={(params.type || "") === props.value} {...props} />
    )
  }
}

function AnimeSearch() {
  const {accessToken} = useAuthentication();
  const [animeData] = api.anilist.trendingAnime(accessToken);

  return (
    <Show when={animeData()}>
      {/* <div>{console.log(animeData())}</div> */}
      <div class="search-home-content">
        <HorizontalCardRow data={animeData().data.data.trending.media} href="" title="Trending now" />
        <HorizontalCardRow data={animeData().data.data.season.media} href="this-season" title="Popular this season" />
        <HorizontalCardRow data={animeData().data.data.nextSeason.media} href="" title="Upcoming next season" />
        <HorizontalCardRow data={animeData().data.data.popular.media} href="" title="All time popular" />
        <VerticalCardRow data={animeData().data.data.top.media} href="" title="Top 100 anime" />
      </div>
    </Show>
  );
}

function SearchContent(props) {
  return (
    <ol class="search-page-content">
      <Show when={props.content}>
        <CardRow data={props.content.data.data.Page.media}/>
      </Show>
    </ol>
  );
}

function VerticalCardRow(props) {
  return (
    <section class="vertical-search-card-section">
      <div class="search-cards-header">
        <h2>{props.title}</h2>
        <A href="">View all</A>
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
                        <A href={"/search/anime?genres=" + genre.toLowerCase()}>{genre}</A>
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
                    <p>{numberCommas(card.episodes)} Episode
                      <Show when={card.episodes > 1}>s</Show>
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
      <div class="search-cards-header">
        <h2>{props.title}</h2>
        <A href={props.href}>View all</A>
      </div>
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
