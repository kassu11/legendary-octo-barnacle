import { useSearchParams } from "@solidjs/router";
import { A } from "../components/CustomA";
import api from "../utils/api";
import { createSignal, createEffect, Switch, Match, Show, splitProps } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";
import { useAuthentication } from "../context/AuthenticationContext";
import { assert } from "../utils/assert";

function Search() {
  const triggerVariable = debounce((variables) => setVariables(variables), 250);
  let _lastTimeHistoryChanged = performance.now()

  const { accessToken } = useAuthentication();
  const [searchParams, _setSearchParams] = useSearchParams();
  const [variables, setVariables] = createSignal(getSearchParamObject());
  const [mediaData] = api.anilist.searchMedia(accessToken, variables);

  function setSearchParams(params, opt) {
    const time = performance.now() - _lastTimeHistoryChanged < 1000;
    _setSearchParams(params, { replace: time, ...opt });
    _lastTimeHistoryChanged = performance.now();
  }

  function getSearchParamObject() {
    const search = { "page": 1, "type": "ANIME", "sort": "POPULARITY_DESC" };
    if (Number(searchParams.page) > 1) {
      search.page = Number(searchParams.page);
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
    search.isAdult = searchParams.isAdult;
    search.isLicensed = searchParams.isLicensed;
    search.licensedBy = searchParams.licensedBy;
    search.minimumTagRank = searchParams.minimumTagRank;
    search.onList = searchParams.onList;
    search.search = searchParams.search;
    search.season = searchParams.season;
    search.seasonYear = searchParams.seasonYear;
    search.sort = searchParams.sort;
    search.source = searchParams.source;
    search.status = searchParams.status;
    search.tags = searchParams.tags;
    search.type = searchParams.type;
    search.volumeGreater = searchParams.volumeGreater;
    search.volumeLesser = searchParams.volumeLesser;
    search.year = searchParams.year;
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
    triggerVariable(search);
  });

  return (
    <>
      <h1>Search</h1>
      <button onClick={() => setSearchParams({page: +searchParams.page + 1 || 1})}>Next page</button>
      <form action="https://graphql.anilist.co" onInput={e => {
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries().map(([k, v]) => [k, v || undefined]));
        console.log("Form: ", { ...data });
        setSearchParams(data);
      }}>
        <InputSearch type="search" id="search" name="search">Search </InputSearch>
        <div>
          <p>Type</p>
          <Input type="radio" name="type" id="type1" value="">Both</Input>
          <Input type="radio" name="type" id="type2" value="ANIME">Anime</Input>
          <Input type="radio" name="type" id="type3" value="MANGA">Manga</Input>
        </div>
        <div>
          <p>IsAdult</p>
          <Input type="radio" name="isAdult" id="isAdult1" value="">Both</Input>
          <Input type="radio" name="isAdult" id="isAdult2" value="false">Off</Input>
          <Input type="radio" name="isAdult" id="isAdult3" value="true">On</Input>
        </div>
        <div>
          <p>onList</p>
          <Input type="radio" name="onList" id="onList1" value="">Both</Input>
          <Input type="radio" name="onList" id="onList2" value="false">Off</Input>
          <Input type="radio" name="onList" id="onList3" value="true">On</Input>
        </div>
      </form>
      <br />
      <br />
      <div>
        <Show when={mediaData.loading}>
          <p>Loading...</p>
        </Show>
        <Switch>
          <Match when={mediaData.error}>
            <span>Error: {mediaData.error}</span>
          </Match>
          <Match when={mediaData()}>
            <CardRow data={mediaData().data.data.Page.media}/>
          </Match>
        </Switch>
      </div>
    </>
  )

  function InputSearch(props) {
    const [otherProps, inputProps] = splitProps(props, ["children"]);
    assert(inputProps.type, "Input type is missing");
    assert(inputProps.name, "Input name is missing");

    return (
      <>
        <label htmlFor={inputProps.id}>{otherProps.children}</label>
        <input value={searchParams[props.name] || ""} {...inputProps} />
      </>
    )
  }

  function Input(props) {
    const [otherProps, inputProps] = splitProps(props, ["children"]);
    assert(inputProps.type, "Input type is missing");
    assert(inputProps.name, "Input name is missing");
    assert(!(inputProps.value === undefined), "Input value is missing");

    return (
      <>
        <input checked={(searchParams[props.name] || "") === props.value} {...inputProps} />
        <label htmlFor={inputProps.id}>{otherProps.children}</label>
      </>
    )
  }
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
    <A href={"/anime/" + props.card.id + "/" + props.card.title.userPreferred}>
      <img src={props.card.coverImage.large} alt="" />
      <p>{props.card.title.userPreferred}</p>
    </A> 
  );
}

export default Search
