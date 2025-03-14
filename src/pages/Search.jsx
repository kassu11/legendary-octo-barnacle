import { useSearchParams } from "@solidjs/router";
import { A } from "../CustomA";
import api from "../api";
import { createSignal, createResource, createEffect, Switch, Match, Show, splitProps } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";
import { useAuthentication } from "../AuthenticationContext";

function Search() {
  const triggerVariable = debounce((variables) => setVariables(variables), 250);

  const { accessToken } = useAuthentication();
  const [variables, setVariables] = createSignal({ "page": 1, "type": "ANIME", "sort": "POPULARITY_DESC" });
  const [searchParams, setSearchParams] = useSearchParams();
  const [mediaData] = createResource(variables, (variables) => api.anilist.searchMedia(accessToken(), variables));

  createEffect(() => {
    const search = { "page": 1, "type": "ANIME", "sort": "POPULARITY_DESC" };
    if (Number(searchParams.page) > 1) {
      search.page = Number(searchParams.page);
    }

    search.id = searchParams.id;
    search.type = searchParams.type;
    search.isAdult = searchParams.isAdult;
    search.search = searchParams.search;
    search.format = searchParams.format;
    search.status = searchParams.status;
    search.countryOfOrigin = searchParams.countryOfOrigin;
    search.source = searchParams.source;
    search.season = searchParams.season;
    search.seasonYear = searchParams.seasonYear;
    search.year = searchParams.year;
    search.onList = searchParams.onList;
    search.yearLesser = searchParams.yearLesser;
    search.yearGreater = searchParams.yearGreater;
    search.episodeLesser = searchParams.episodeLesser;
    search.episodeGreater = searchParams.episodeGreater;
    search.durationLesser = searchParams.durationLesser;
    search.durationGreater = searchParams.durationGreater;
    search.chapterLesser = searchParams.chapterLesser;
    search.chapterGreater = searchParams.chapterGreater;
    search.volumeLesser = searchParams.volumeLesser;
    search.volumeGreater = searchParams.volumeGreater;
    search.licensedBy = searchParams.licensedBy;
    search.isLicensed = searchParams.isLicensed;
    search.genres = searchParams.genres;
    search.excludedGenres = searchParams.excludedGenres;
    search.tags = searchParams.tags;
    search.excludedTags = searchParams.excludedTags;
    search.minimumTagRank = searchParams.minimumTagRank;
    search.sort = searchParams.sort;

    for(const [key, value] of Object.entries(search)) {
      if (value == null) { delete search[key]; }
      if (value === "false") { search[key] = false; }
      if (value === "true") { search[key] = true; }
    }

    triggerVariable(search);
  })

  return (
    <>
      <h1>Search</h1>
      <button onClick={() => setSearchParams({page: +searchParams.page + 1 || 1, delete: undefined})}>Next page</button>
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
    console.assert(inputProps.type, "Input type is missing");
    console.assert(inputProps.name, "Input name is missing");

    return (
      <>
        <label htmlFor={inputProps.id}>{otherProps.children}</label>
        <input value={searchParams[props.name] || ""} {...inputProps} />
      </>
    )
  }

  function Input(props) {
    const [otherProps, inputProps] = splitProps(props, ["children"]);
    console.assert(inputProps.type, "Input type is missing");
    console.assert(inputProps.name, "Input name is missing");
    console.assert(!(inputProps.value === undefined), "Input value is missing");

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
