import { A, useNavigate, useParams, useSearchParams } from "@solidjs/router";
import api from "../utils/api";
import { Show, For, Match, Switch, createSignal, createEffect, batch, on, mergeProps } from "solid-js";
import "./Search.scss";
import { capitalize, formatMediaFormat, formatTitleToUrl, mediaUrl } from "../utils/formating";
import { createStore } from "solid-js/store";
import { SearchBarContext, useAuthentication, useEditMediaEntries, useSearchBar } from "../context/providers";
import { debounce, leadingAndTrailing } from "@solid-primitives/scheduled";
import { DoomScroll } from "../components/utils/DoomScroll";
import { RatingInput } from "./Search/RatingInput";
import { SwitchInput } from "./Search/SwitchInput";
import { GenresInput } from "./Search/GenresInput";
import { YearInput } from "./Search/YearInput";
import { compare, first, objectFromArrayEntries, wrapToArray, wrapToSet } from "../utils/arrays";
import { FormatInput } from "./Search/FormatInput";
import { SortInput } from "./Search/SortInput";
import { searchCountries, searchFormats, searchSeasons, searchSources, searchStatuses, sortOrders } from "../utils/searchObjects";
import { StatusInput } from "./Search/StatusInput";
import { CountryInput } from "./Search/CountryInput";
import { SourceInput } from "./Search/SourceInput";
import { ExternalSourceInput } from "./Search/ExternalSourcesInput";
import { TwoHeadedRange } from "./Search/TwoHeadedRange";
import { useVirtualHeaderRedirect, useVirtualSearchParams, useVirtualType } from "../utils/virtualSearchParams.js";
import { SeasonInput } from "./Search/SeasonInput.jsx";
import { moveSeasonObject } from "../utils/dates.js";
import { asserts } from "../collections/collections.js";



class SearchVariable {
  constructor({ url, key, value, active = true, visuallyDisabled = false, reason, desc, name, hidden = false, canClear = true, addUrl }) {
    asserts.assertTrue(!active || key, "key missing");
    asserts.assertTrue(hidden || name, "Name is missing");
    asserts.assertTrue(!canClear || !active || url, "Url is missing");
    asserts.assertTrue(canClear || hidden , "Don't show user meta tags they can't clear");
    asserts.assertTrue(typeof active === "boolean", "active is not boolean");
    asserts.assertTrue(typeof visuallyDisabled === "boolean", "visuallyDisabled is not boolean");
    asserts.assertTrue(typeof hidden === "boolean", "hidden is not boolean");
    asserts.assertTrue(typeof canClear === "boolean", "canClear is not boolean");

    this.name = name;
    this.url = url;
    this.addUrl = addUrl;
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
      compare(this.url, searchVariable.url) &&
      compare(this.addUrl, searchVariable.addUrl) &&
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
  const [virtualSearchParams] = useVirtualSearchParams();

  const type = params.type;
  const engine = (searchParams.malSearch === "true" && params.type !== "media") ? "mal" : "ani";
  const notEngine = engine === "ani" ? "mal" : "ani";
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

  const [season] = wrapToArray(virtualSearchParams("season"));
  if (season) {
    const { api, flavorText } = searchSeasons[engine]?.[type]?.[season] || { flavorText: searchStatuses.flavorTexts[season] || season }
    variables.push(new SearchVariable({ name: flavorText, url: `season=${season}`, key: "season", value: api, active: api !== undefined, visuallyDisabled: api === undefined}));
  }

  let hasEndDateSet = false;
  let hasStartDateSet = false;
  const [year] = wrapToArray(virtualSearchParams("year"));
  if (year) {
    hasEndDateSet = true;
    hasStartDateSet = true;
    if (engine === "ani") {
      if (season && type === "anime") {
        variables.push(new SearchVariable({ name: year, url: `year=${year}`, active: true, key: "seasonYear", value: year }));
      } else {
        variables.push(new SearchVariable({ name: year, url: `year=${year}`, active: true, key: "year", value: `${year}%` }));
      }
    }
    else if (engine === "mal") {
      variables.push(new SearchVariable({ name: year, url: `year=${year}`, active: true, key: "start_date", value: `${year}-01-01` }));
      variables.push(new SearchVariable({ hidden: true, canClear: false, key: "end_date", value: `${year}-12-31` }));
    }
  } 

  const [startYear] = [+searchParams.startYear].flat();
  if (startYear) {
    hasStartDateSet = true;
    if (engine === "ani") {
      variables.push(new SearchVariable({ name: `Year greater than ${startYear - 1}`, active: !year, visuallyDisabled: !!year, url: `startYear=${startYear}`, key: "yearGreater", value: parseInt(`${startYear - 1}9999`) }));
    }
    else if (engine === "mal") {
      variables.push(new SearchVariable({ name: `Year greater than ${startYear - 1}`, active: !year, visuallyDisabled: !!year, url: `startYear=${startYear}`, key: "start_date", value: `${startYear}-01-01` }));
    }
  }
  const [endYear] = [+searchParams.endYear].flat();
  if (endYear) {
    hasEndDateSet = true;
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

  {
    const validFormats = [];
    wrapToSet(virtualSearchParams("format")).forEach(format => {
      const {api, flavorText} = searchFormats[engine][type]?.[format] || {};
      const flavorTextFallback = flavorText || searchFormats.flavorTexts[format] || format;
      if (engine === "ani" && api) {
        validFormats.push(api);
      }
      if (api) {
        variables.push(new SearchVariable({ name: "Format: " + flavorText, active: engine === "mal", key: "type", value: api, url: `format=${format}` }));
      } else {
        variables.push(new SearchVariable({ name: "Format: " + flavorTextFallback, active: false, visuallyDisabled: true, url: `format=${format}` }));
      }
    });

    if (validFormats.length) {
      variables.push(new SearchVariable({ key: "format", value: validFormats, canClear: false, hidden: true }));
    }
  }


  {
    const validAniOrders = [];
    let validMalOrder = false;
    let reverseMalSort = false;

    const orderSet = wrapToSet(virtualSearchParams("order"));
    orderSet.forEach(order => {
      let orderWithoutAlternativeKey = order;
      if (order === sortOrders.ani.anime.duration.alternative_key) {
        orderWithoutAlternativeKey = "duration";
        variables.push(new SearchVariable({ 
          name: "Duration greater than 0", 
          url: `order=${order}`, 
          active: engine === "ani", visuallyDisabled: engine !== "ani", 
          addUrl: `order=${orderWithoutAlternativeKey}`, 
          key: "durationGreater", 
          value: 0 
        }));
      }
      else if (order === sortOrders.mal.anime.episodes.alternative_key) {
        orderWithoutAlternativeKey = "episodes";
        if (engine === "ani") {
          if (type === "anime") {
            variables.push(new SearchVariable({ name: "Episodes greater than 0", url: `order=${order}`, addUrl: `order=${orderWithoutAlternativeKey}`, key: "chapterGreater", value: 0 }));
          } else if(type === "manga") {
            variables.push(new SearchVariable({ name: "Chapters greater than 0", url: `order=${order}`, addUrl: `order=${orderWithoutAlternativeKey}`, key: "chapterGreater", value: 0 }));
          } else if(type === "media") {
            variables.push(new SearchVariable({ name: "Episodes/Chapters greater than 0", url: `order=${order}`, addUrl: `order=${orderWithoutAlternativeKey}`, key: "chapterGreater", value: 0 }));
          }
        }
        else if (engine === "mal") {
          variables.push(new SearchVariable({ name: "Status complete", url: `order=${order}`, addUrl: `order=${orderWithoutAlternativeKey}`, key: "status", value: "complete" }));
        }
      }
      else if (order === sortOrders.mal.manga.volumes.alternative_key) {
        orderWithoutAlternativeKey = "volumes";
        if (engine === "ani") {
          variables.push(new SearchVariable({ 
            name: "Volumes greater than 0", 
            url: `order=${order}`, 
            addUrl: `order=${orderWithoutAlternativeKey}`, 
            active: type === "manga",
            visuallyDisabled: type !== "manga",
            key: "volumeGreater", 
            value: 0 
          }));
        }
        else if (engine === "mal") {
          variables.push(new SearchVariable({ name: "Status complete", url: `order=${order}`, addUrl: `order=${orderWithoutAlternativeKey}`, key: "status", value: "complete" }));
        }
      }
      else if (order === sortOrders.mal.anime.end_date.alternative_key) {
        orderWithoutAlternativeKey = "end_date";
        const base = { name: "Only valid dates", active: !hasEndDateSet, hidden: hasEndDateSet, url: `order=${order}`, addUrl: `order=${orderWithoutAlternativeKey}` };
        if (engine === "ani") {
          variables.push(new SearchVariable({ ...base, key: "endDateGreater", value: 0 }));
        }
        else if (engine === "mal") {
          variables.push(new SearchVariable({ ...base, key: "end_date", value: `${new Date().getFullYear() + 100}-01-01` }));
        }
      }
      else if (order === sortOrders.mal.anime.start_date.alternative_key) {
        orderWithoutAlternativeKey = "start_date";
        const base = { name: "Only valid dates", active: !hasStartDateSet, hidden: hasStartDateSet, url: `order=${order}`, addUrl: `order=${orderWithoutAlternativeKey}` };
        if (engine === "ani") {
          variables.push(new SearchVariable({ ...base, key: "yearGreater", value: 0 }));
        }
        else if (engine === "mal") {
          variables.push(new SearchVariable({ ...base, key: "start_date", value: `0000-01-01` }));
        }
      }


      const {api, flavorText, reverse} = sortOrders[engine][type]?.[orderWithoutAlternativeKey] || {};
      const flavorTextFallback = flavorText || sortOrders[engine === "ani" ? "mal" : "ani"][type]?.[orderWithoutAlternativeKey]?.flavorText || sortOrders.flavorTexts[orderWithoutAlternativeKey] || order;
      if (engine === "ani" && api) {
        if (searchParams.sort === "ASC") {
          validAniOrders.push(api);
        } else {
          validAniOrders.push(api + "_DESC");
        }
      }
      else if (engine === "mal" && reverse) {
        reverseMalSort = true;
      }
      const url = [`order=${order}`];
      if (searchParams.sort) { url.push(`sort=${searchParams.sort}`); }
      if (api) {
        validMalOrder ||= engine === "mal";
        variables.push(new SearchVariable({ name: "Sort: " + flavorText, active: engine === "mal", key: "order_by", value: api, url }));
      } else {
        variables.push(new SearchVariable({ name: "Sort: " + flavorTextFallback, active: false, visuallyDisabled: true, url }));
      }
    });

    asserts.assertTrue(validAniOrders.length === 0 || engine === "ani", "validAniOrder should not have anilist orders when engine is mal");
    asserts.assertTrue(validMalOrder === false || engine === "mal", "validMalOrder should be false if engine is ani");

    if (engine === "ani") {
      if (validAniOrders.length) {
        variables.push(new SearchVariable({ key: "sort", value: validAniOrders, canClear: false, hidden: true }));
      } else if (searchParams.q) {
        variables.push(new SearchVariable({ key: "sort", value: "SEARCH_MATCH", canClear: false, hidden: true }));
      } else {
        variables.push(new SearchVariable({ key: "sort", value: "POPULARITY_DESC", canClear: false, hidden: true }));
      }
    }
    else if (engine === "mal") {
      if (!validMalOrder && !searchParams.q) {
        reverseMalSort = true;
        variables.push(new SearchVariable({ key: "order_by", value: "popularity", canClear: false, hidden: true }));
      }
      if (reverseMalSort) {
        variables.push(new SearchVariable({ key: "sort", value: searchParams.sort === "ASC" ? "desc" : "asc", hidden: true, canClear: false }));
      } else {
        variables.push(new SearchVariable({ key: "sort", value: searchParams.sort === "ASC" ? "asc" : "desc", hidden: true, canClear: false }));
      }
    }
  }

  if (virtualSearchParams("status")) {
    const [status] = wrapToArray(virtualSearchParams("status"));
    const { api, flavorText } = searchStatuses[engine][type]?.[status] || {
      flavorText: searchStatuses[notEngine][type]?.[status]?.flavorText || searchStatuses.flavorTexts[status] || status
    };
    variables.push(new SearchVariable({ name: flavorText, active: !!api, visuallyDisabled: !api, key: "status", value: api, url: `status=${status}` }));
  }

  if (virtualSearchParams("country")) {
    const [country] = wrapToArray(virtualSearchParams("country"));
    const { flavorText } = searchCountries[country] || { flavorText: country };
    variables.push(new SearchVariable({ name: flavorText, active: engine === "ani", visuallyDisabled: engine !== "ani", key: "countryOfOrigin", value: country, url: `country=${country}` }));
  }

  if (searchParams.source) {
    const [source] = wrapToArray(searchParams.source);
    const { api, flavorText } = searchSources[source] || { flavorText: source };
    variables.push(new SearchVariable({ name: flavorText, active: engine === "ani", visuallyDisabled: engine !== "ani", key: "source", value: api, url: `source=${source}` }));
  }

  if (searchParams.license !== undefined) {
    const value = searchParams.license === "true";
    variables.push(new SearchVariable({ name: value ? "Licensed" : "Unlicensed", active: engine === "ani", visuallyDisabled: engine !== "ani", key: "isLicensed", value, url: `license=${value}` }));
  }

  if (searchParams.externalSource !== undefined) {
    const externalSources = wrapToArray(searchParams.externalSource).map(Number);
    externalSources.forEach(id => {
      variables.push(new SearchVariable({ name: externalSourceStore[id] || id, active: false, visuallyDisabled: engine !== "ani", url: `externalSource=${id}` }));
    });
    variables.push(new SearchVariable({ active: engine === "ani", hidden: true, canClear: false, key: "licensedBy", value: externalSources }));
  }

  if (searchParams.episodeGreater !== undefined) {
    const [ep] = wrapToArray(searchParams.episodeGreater).map(Number);
    const base = {active: engine === "ani", visuallyDisabled: engine !== "ani", key: "episodeGreater", value: Math.max(ep + 1, 0), url: `episodeGreater=${ep}`};
    if (type === "manga") {
      variables.push(new SearchVariable({ name: `Chapters greater than ${ep}`, ...base }));
    } else if (type === "anime") {
      variables.push(new SearchVariable({ name: `Episodes greater than ${ep}`, ...base }));
    } else if (type === "media") {
      variables.push(new SearchVariable({ name: `Episode/Chapters greater than ${ep}`, ...base }));
    }
  }
  if (searchParams.episodeLesser !== undefined) {
    const [ep] = wrapToArray(searchParams.episodeLesser).map(Number);
    const base = {active: engine === "ani", visuallyDisabled: engine !== "ani", key: "episodeLesser", value: Math.max(ep, 0), url: `episodeLesser=${ep}`};
    if (type === "manga") {
      variables.push(new SearchVariable({ name: `Chapters lesser than ${ep}`, ...base }));
    } else if (type === "anime") {
      variables.push(new SearchVariable({ name: `Episodes lesser than ${ep}`, ...base }));
    } else if (type === "media") {
      variables.push(new SearchVariable({ name: `Episode/Chapters lesser than ${ep}`, ...base }));
    }
  }


  if (searchParams.rank) {
    const [rank] = wrapToArray(searchParams.rank);
    variables.push(new SearchVariable({ name: `Tags above ${rank}%`, url: `rank=${rank}`, key: "minimumTagRank", value: rank, active: engine === "ani", visuallyDisabled: engine !== "ani" }));
  }



  return [type, engine, variables, preventFetch];
}

const [genreAndTagTranslations, setGenreAndTagTranslations] = createStore({
  anime: null,
  manga: null,
  genres: null,
  tags: null,
});

const [externalSourceStore, setExternalSourceStore] = createStore({});

export function SearchBar(props) {
  const navigate = useNavigate();
  const changeType = useVirtualType();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchType, setSearchType] = createSignal();
  const [searchEngine, setSearchEngine] = createSignal();
  const [searchVariables, setSearchVariables] = createSignal();
  const [debouncedSearchType, setDebouncedSearchType] = createSignal();
  const [debouncedSearchEngine, setDebouncedSearchEngine] = createSignal();
  const [debouncedSearchVariables, setDebouncedSearchVariables] = createSignal();

  const [anilistGenresAndTags] = api.anilist.genresAndTags(() => searchParams.malSearch !== "true" || undefined);
  const [externalSources] = api.anilist.externalSources(() => {
    if (searchParams.malSearch !== "true" || params.type === "media") { return null }
    else if (params.type === "anime" || params.type === "manga") { return params.type.toUpperCase(); }
    else return undefined
  });
  const [malGenresAndThemes] = api.myAnimeList.genresAndThemes(() => searchParams.malSearch === "true" && (params.type === "anime" || params.type === "manga") ? params.type : undefined);

  const triggerSetSearchParams = debounce(setSearchParams, 300);
  const triggerSetSearchParamsFast = leadingAndTrailing(debounce, setSearchParams, 100);
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

  createEffect(on(externalSources, response => {
    if (!response) { return; }
    setExternalSourceStore(response.data.reduce((acc, source) => (acc[source.id] = source.site, acc), {}));
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
        <select name="type" id="type" value={params.type} onChange={e => changeType(e.target.value) }>
          <option value="anime">Anime</option>
          <option value="manga">Manga</option>
          <option value="media">Media</option>
        </select>
      </div>
      <div class="grid-column-auto-fill">
        <input type="search" placeholder={"Search " + (params.type || "All")} value={searchParams.q || ""} onInput={e => {
          triggerSetSearchParams({ q: e.target.value });
        }} />
        <span>
          <p>Search MAL</p>
          <SwitchInput disabled={params.type === "media"} name="malSearch" checked={searchParams.malSearch === "true" && params.type !== "media"} onInput={e => {
          setSearchParams({ malSearch: e.target.checked || undefined });
        }}/>
        </span>
        <div>
          <input type="checkbox" name="hideMyAnime" id="hideMyAnime" checked={searchParams.onList === "false"} onInput={e => {
            setSearchParams({ onList: e.target.checked ? false : undefined });
          }} />
          <label htmlFor="hideMyAnime"> Hide my {params.type}</label>
          <br />
          <input type="checkbox" name="showMyAnime" id="showMyAnime" checked={searchParams.onList === "true"} onInput={e => {
            setSearchParams({ onList: e.target.checked || undefined });
          }} />
          <label htmlFor="showMyAnime"> Only show my {params.type}</label>
        </div>
        <div>
          <input type="checkbox" name="hasNotLicense" id="hasNotLicense" checked={searchParams.license === "true"} onInput={e => {
            setSearchParams({ license: e.target.checked || undefined });
          }} />
          <label htmlFor="hasNotLicense"> Licensed</label>
          <br />
          <input type="checkbox" name="hasLicense" id="hasLicense" checked={searchParams.license === "false"} onInput={e => {
            setSearchParams({ license: e.target.checked ? false : undefined });
          }} />
          <label htmlFor="hasLicense"> Unlicensed</label>
        </div>
        <RatingInput />
        <GenresInput aniGenres={anilistGenresAndTags} malGenres={malGenresAndThemes} translation={genreAndTagTranslations} engine={searchEngine()} showAdult={true} />
        <YearInput />
        <FormatInput />
        <SortInput />
        <StatusInput />
        <CountryInput />
        <SourceInput />
        <SeasonInput />
        <ExternalSourceInput sources={externalSources} />
        <TwoHeadedRange 
          min={0} 
          max={500} 
          separation={1} 
          minValue={+searchParams.episodeGreater || 0} 
          maxValue={+searchParams.episodeLesser || 500} 
          onChange={([min, max]) => setSearchParams({ episodeLesser: max, episodeGreater: min })} 
        />
        <Show when={params.type === "anime"}>
          <div>
            <A href="/search/anime/tba">
              <button>TBA</button>
            </A>
            <A href="/search/anime/this-season">
              <button>Current season</button>
            </A>
            <A href="/search/anime/next-season">
              <button>Next season</button>
            </A>
          </div>
        </Show>
      </div>
      <SearchBarContext.Provider value={{searchType, searchEngine, searchVariables, debouncedSearchType, debouncedSearchEngine, debouncedSearchVariables }}>
        {props.children}
      </SearchBarContext.Provider>
    </div>
  )
}


export function SearchContent(props) {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [virtualSearchParams, setVirtualSearchParams] = useVirtualSearchParams();
  const { debouncedSearchEngine, debouncedSearchType, searchVariables, debouncedSearchVariables } = useSearchBar();
  const navigate = useNavigate();

  return (
    <div class="search-result-container">
      <Switch>
        <Match when={params.header?.match(/^(summer|fall|spring|winter)-\d+$/) || params.header === "this-season" || params.header === "next-season"}>
          <ol class="flex-space-between cp-search-season-controls">
            <li>
              <button onClick={() => {
                const seasonObj = moveSeasonObject(first(virtualSearchParams("season")), +first(virtualSearchParams("year")), - 1);
                setVirtualSearchParams({year: seasonObj.year, season: seasonObj.season.toLowerCase()});
              }}>{"<"}</button>
            </li>
            <For each={["winter", "spring", "summer", "fall"]}>{season => (
              <li class="item" classList={{selected: season === first(virtualSearchParams("season"))}}>
                <button onClick={() => setVirtualSearchParams({ season, year: +first(virtualSearchParams("year")) })}>
                  <h3>{capitalize(season)}</h3>
                  <p>{first(virtualSearchParams("year"))}</p>
                </button>
              </li>
            )}</For>
            <li>
              <button onClick={() => {
                const seasonObj = moveSeasonObject(first(virtualSearchParams("season")), +first(virtualSearchParams("year")), 1);
                setVirtualSearchParams({year: seasonObj.year, season: seasonObj.season.toLowerCase()});
              }}>{">"}</button>
            </li>
          </ol>
        </Match>
      </Switch>
      <Switch>
        <Match when={params.header?.match(/^(summer|fall|spring|winter)-\d+$/)}>
          <h1>{capitalize(params.header.split("-")[0])} {params.header.split("-")[1]}</h1>
        </Match>
        <Match when={params.header === "this-season"}>
          <h1>
            <Show when={searchParams.season || searchParams.year} fallback="Current season">
              {capitalize(first(virtualSearchParams("season")))} {first(virtualSearchParams("year"))}
            </Show>
          </h1>
        </Match>
        <Match when={params.header === "next-season"}>
          <h1>
            <Show when={searchParams.season || searchParams.year} fallback="Next season">
              {capitalize(first(virtualSearchParams("season")))} {first(virtualSearchParams("year"))}
            </Show>
          </h1>
        </Match>
        <Match when={params.header === "tba"}>
          <h1>TBA</h1>
        </Match>
        <Match when={params.header}>
          <h1>{params.header}</h1>
        </Match>
      </Switch>
      {props.children}
      <Show when={searchVariables()?.filter(variable => !variable.hidden)}>{filteredVariables => (
        <Show when={filteredVariables().length}>
          Tags:
          <ol class="search-meta-tags">
            <For each={filteredVariables()}>{variable => (
              <Show when={!variable.hidden}>
                <li classList={{disabled: variable.visuallyDisabled}}>
                  <button onClick={() => {
                    const search = {};
                    wrapToArray(variable.url).forEach(url => {
                      const [key, ...rest] = url.split("=");
                      const value = rest.join("=");
                      search[key] = wrapToArray(search[key] || searchParams[key]).filter(v => v !== value);
                    });

                    wrapToArray(variable.addUrl).forEach(url => {
                      const [key, ...rest] = url.split("=");
                      const value = rest.join("=");
                      search[key] ??= wrapToArray(searchParams[key]);
                      search[key].push(value);
                    });
                    setVirtualSearchParams(search);
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
              <Switch>
                <Match when={params.header?.match(/^(summer|fall|spring|winter)-\d+$/) || params.header === "this-season" || params.header === "next-season"}>
                  <Show when={debouncedSearchVariables().find(v => v.key === "seasonYear")?.value}>{seasonYear => (
                    <Show when={debouncedSearchVariables().find(v => v.key === "season")?.value}>{season => (
                      <Show when={debouncedSearchVariables().filter(v => v.key === "format").length === 0 || debouncedSearchVariables().some(v => v.key === "format" && v.value?.includes("TV"))}>
                        <AnilistMediaSeasonContent 
                          page={1} 
                          variables={debouncedSearchVariables()} 
                          title="Leftovers" 
                          groupCards={false} 
                          extraVariables={{ 
                            seasonYear: moveSeasonObject(season(), +seasonYear(), - 1).year,
                            season: moveSeasonObject(season(), +seasonYear(), - 1).season,
                            episodeGreater: 16,
                            format: "TV"
                          }} 
                        />
                      </Show>
                    )}</Show>
                  )}</Show>
                  <AnilistMediaSeasonContent page={1} variables={debouncedSearchVariables()} extraVariables={{ sort: "FORMAT" }} />
                </Match>
                <Match when={true}>
                  <AnilistMediaSearchContent nestLevel={1} page={1} variables={debouncedSearchVariables()} />
                </Match>
              </Switch>
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

export function RedirectSearchHeaders() {
  const redirect = useVirtualHeaderRedirect();
  redirect();
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

function AnilistMediaSeasonContent(_props) {
  const props = mergeProps({groupCards: true}, _props);
  asserts.assertTrue(props.page, "page is missing");
  asserts.assertTrue(props.extraVariables, "extraVariables is missing");

  const {accessToken} = useAuthentication();
  const [variables, setVariables] = createSignal(undefined);
  const [mediaData] = api.anilist.searchMedia(accessToken, () => props.variables, props.page, () => props.extraVariables);

  createEffect(on(mediaData, response => {
    if (response?.data.pageInfo.hasNextPage) {
      setVariables(props.variables);
    }
  }));

  return (
    <Show when={mediaData()}>
      <Show when={props.title && mediaData().data.media.length}>
        <li class="full-span">
          <h2>{props.title}</h2>
        </li>
      </Show>
      <Switch>
        <Match when={props.groupCards}>
          <AniCardRowWithFormatHeader data={mediaData().data.media} lastFormat={props.previousFormat || "Unknown format"} />
        </Match>
        <Match when={props.groupCards === false}>
          <AniCardRow data={mediaData().data.media} />
        </Match>
      </Switch>
      <Show when={mediaData().data.pageInfo.hasNextPage}>
        <AnilistMediaSeasonContent 
          variables={variables()} 
          extraVariables={props.extraVariables} 
          page={props.page + 1} 
          previousFormat={mediaData().data.media.at(-1)?.format || "Unknown format"} 
        />
      </Show>
    </Show>
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
      <a href={props.card.url} target="_blank">
        <img src={props.card.images.webp.image_url} alt="Anime cover" />
        <p class="line-clamp">
          <Switch>
            <Match when={props.card.titles.English}>{props.card.titles.English}</Match>
            <Match when={props.card.titles.Default}>{props.card.titles.Default}</Match>
          </Switch>
        </p>
      </a>
    </li>
  );
}

function AniCardRowWithFormatHeader(props) {
  return (
    <>
      <Show when={props.data[0] && props.lastFormat !== props.data[0].format}>
        <li class="full-span">
          <h2>{formatMediaFormat(props.data[0].format) || "Unknown format"}</h2>
        </li>
      </Show>
      <For each={props.data}>{(card, i) => (
        <>
          <Show when={i() > 0 && props.data[i() - 1].format !== card.format}>
            <li class="full-span">
              <h2>{formatMediaFormat(card.format)}</h2>
            </li>
          </Show>
          <AniCard card={card} />
        </>
      )}</For>
    </>
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
      <A href={mediaUrl(props.card)}>
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
              <li class="item" label={"Set to " + (props.card.type === "ANIME" ? "watching" : "reading")}>
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
              <li class="item" label={"Set to " + (props.card.type === "ANIME" ? "rewatching" : "rereading")}>
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
