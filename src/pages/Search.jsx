import { A, useLocation, useNavigate, useParams, useSearchParams } from "@solidjs/router";
import api from "../utils/api";
import { createSignal, createEffect, Show, splitProps, on, For, untrack } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";
import { useAuthentication } from "../context/AuthenticationContext";
import { assert } from "../utils/assert";
import style from "./Search.module.scss";
import { formatTitleToUrl } from "../utils/formating";

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
    if (location.search.length === 0) {
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



    search.chapterGreater = searchParams.chapterGreater;
    search.chapterLesser = searchParams.chapterLesser;
    search.countryOfOrigin = searchParams.countryOfOrigin;
    search.durationGreater = searchParams.durationGreater;
    search.durationLesser = searchParams.durationLesser;
    search.episodeGreater = searchParams.episodeGreater;
    search.episodeLesser = searchParams.episodeLesser;
    search.excludedGenres = searchParams.excludedGenres;
    search.excludedTags = searchParams.excludedTags;
    search.format = searchParams.format;
    search.genres = searchParams.genres;
    search.id = searchParams.id;
    // search.isAdult = searchParams.isAdult;
    search.isLicensed = searchParams.isLicensed;
    search.licensedBy = searchParams.licensedBy;
    search.minimumTagRank = searchParams.minimumTagRank;
    search.onList = searchParams.onList;
    search.search = searchParams.search;
    search.season = searchParams.season;
    search.source = searchParams.source;
    search.status = searchParams.status;
    search.tags = searchParams.tags;
    // search.type = searchParams.type;
    search.volumeGreater = searchParams.volumeGreater;
    search.volumeLesser = searchParams.volumeLesser;
    // search.year = searchParams.year;
    search.yearGreater = searchParams.yearGreater;
    search.yearLesser = searchParams.yearLesser;

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
        triggerVariable(search);
        setCacheVariables(search);
      } else {
        mutateMediaData(undefined);
      }
    });
  });

  return (
    <>
      <h1>Search</h1>
      <form action="https://graphql.anilist.co" class={style.form} onInput={e => {
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
      <br />
      <br />
      {console.log(mediaData())}
      <Switch>
        <Match when={location.search.length}>
          <ol class={style.cards}>
            <Show when={mediaData()}>
              <CardRow data={mediaData().data.data.Page.media}/>
            </Show>
          </ol>
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
    </>
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

function AnimeSearch(props) {
  const {accessToken} = useAuthentication();
  const [animeData] = api.anilist.trendingAnime(accessToken);

  return (
    <Show when={animeData()}>

      <div>{console.log(animeData())}</div>
      <h2>Trending now</h2>
      <ol class={style.cards}>
        <CardRow data={animeData().data.data.trending.media}/>
      </ol>
      <h2>Popular this season</h2>
      <ol class={style.cards}>
        <CardRow data={animeData().data.data.season.media}/>
      </ol>
      <h2>Upcoming next season</h2>
      <ol class={style.cards}>
        <CardRow data={animeData().data.data.nextSeason.media}/>
      </ol>
      <h2>All time popular</h2>
      <ol class={style.cards}>
        <CardRow data={animeData().data.data.popular.media}/>
      </ol>
    </Show>
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
  return ( 
    <li class={style.card}>
      <A href={"/" + props.card.type.toLowerCase() +  "/" + props.card.id + "/" + formatTitleToUrl(props.card.title.userPreferred)}>
        <img src={props.card.coverImage.large} class={style.cover} alt="Cover." />
        <p>{props.card.title.userPreferred}</p>
      </A> 
    </li>
  );
}

export default Search
