import { A, useParams, useSearchParams } from "@solidjs/router";
import { batch, createEffect, createMemo, createSignal, For, mapArray, Match, onCleanup, onMount, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { CompareMediaListContext, useCompareMediaList } from "@/state/providers.js";
import { LoaderCircle } from "@/components/LoaderCircle.scoped.jsx";
import { Tooltip } from "@/components/Tooltip.scoped";
import { setCachedUserInfos } from "@/components/search/inputs/MediaUsersSelect.scoped.jsx";
import CompareMediaListWorker from "@/workers/compare-media-list.js?worker";
import { capitalize, formatMediaFormat, formatUsersMediaStatus, languageFromCountry, mediaUrl } from "@/utils/formatUtils.js";
import "./CompareIndex.scoped.css";
import Score from "@/components/media/Score.scoped.jsx";
import { RepeatIcon, StarIcon } from "@/assets/icons.jsx";
import { queries } from "@/api/api.js";
import { translateToInternalSearchParams } from "@/api/apiTranslations.js";
import { arrayUtils, numberUtils } from "@/utils/utils.js";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { createCleanUpAbortController } from "@/utils/abortUtils.js";
import { debouncer } from "@/utils/scheduleUtils.js";
import { addApplicationNotification } from "@/state/notifications.js";
import { CompareSearchControls } from "./CompareSearchControls.scoped.jsx";

const initialMediaCompareList = () => {
  const count = numberUtils.parse(sessionStorage.getItem(window.location.href), 0);
  return Array(count).fill({ id: -1, coverImage: {} });
}

export default function ComparePage() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const params = useParams();
  const [users, storeUsers] = createStore({});
  // Lists by type and lowercase user name
  const [userListsData, setUserListsData] = createSignal({ anime: {}, manga: {} }, { equals: false });
  const [listData, setListData] = createSignal(undefined);
  const [compareMediaList, _setCompareMediaList] = createSignal(initialMediaCompareList());
  const setCompareMediaList = list => {
    sessionStorage.setItem(window.location.href, list.length);
    _setCompareMediaList(list);
  }
  const [loading, setLoading] = createSignal(true);

  const setSearchParams = options => {
    _setSearchParams(options, { replace: true });
  };
  const multiParam = name => () => arrayUtils.wrapToArray(searchParams[name]).filter(Boolean);
  const search = () => decodeURIComponent(arrayUtils.wrapToArray(searchParams.q).at(-1) || "");
  const excludedUsers = multiParam("exclude");
  const comparedUsers = createMemo(() => {
    const excludedNames = new Set(excludedUsers().map(name => name.toLowerCase()));
    const names = new Map();
    for (const name of multiParam("user")()) {
      if (!excludedNames.has(name.toLowerCase())) names.set(name.toLowerCase(), name);
    }
    return [...names.values()];
  });
  const usersNeeded = () => Math.min(numberUtils.parse(searchParams.reviewsNeeded, comparedUsers().length) || comparedUsers().length, comparedUsers().length);
  const format = multiParam("format");
  const status = multiParam("status");
  const genre = multiParam("genre");
  const countryOfOrigin = multiParam("countryOfOrigin");
  const isAdult = () => searchParams.isAdult;
  const year = multiParam("year");
  const startedYear = multiParam("startedYear");
  const completedYear = multiParam("completedYear");
  const privateFilter = () => searchParams.private;
  const notesFilter = () => searchParams.notes;
  const rewatchedFilter = () => searchParams.repeat;
  const startDateFilter = () => searchParams.startDate;
  const endDateFilter = () => searchParams.endDate;
  const scoreFilter = () => searchParams.score;
  const sortParam = multiParam("sort");
  const sort = () => sortParam().length ? sortParam() : ["score"];
  const userStatus = multiParam("userStatus");
  const studio = multiParam("studio");
  const tag = multiParam("tag");

  const fetchedUserNames = createMemo(() => [...new Set([...comparedUsers(), ...excludedUsers()].map(name => name.toLowerCase()))]);

  createMemo(mapArray(fetchedUserNames, userName => {
    const userListController = createCleanUpAbortController();
    let userListFetcher;
    createEffect(() => {
      const signal = userListController.abortAndRenew();
      const type = params.type;

      userListFetcher = createAnilistFetcher(queries.anilistUserMediaList, { userName, type: type.toUpperCase() }, signal);

      sendAnilistFetcher(userListFetcher, {
        name: "Anilist user media list",
        sessionCache: false,
        onFetch: () => userListController.disable(),
        onError: async res => {
          if (!res || Error.isError(res)) return;
          const { errors } = await res.json().catch(() => ({}));
          if (errors?.some(error => error.status === 404)) {
            addApplicationNotification({ type: "info", message: `Anilist did not find a valid user with a name: "${userName}".`, duration: 10_000 });
            setSearchParams({
              user: arrayUtils.wrapToArray(searchParams.user).filter(name => name.toLowerCase() !== userName),
              exclude: arrayUtils.wrapToArray(searchParams.exclude).filter(name => name.toLowerCase() !== userName),
            });
          } else {
            addApplicationNotification({ type: "error", message: `Anilist errored with a status code: ${res.status}.`, duration: 10_000 });
          }
        },
        setValue: (res, { fetcher: f }) => {
          if (f.cacheKey !== userListFetcher.cacheKey) return;
          const collection = res.data.data.MediaListCollection;
          const { id, name, avatar } = collection.user;
          batch(() => {
            storeUsers(name, collection.user);
            setUserListsData(data => {
              data[type][userName] = collection;
              return data;
            });
            setCachedUserInfos(infos => {
              infos[id] = { name, avatar: avatar.large };
              return infos;
            });
          });
        }
      });
    });
  }));

  let worker;
  const postToWorker = debouncer(postObject => {
    worker = worker instanceof Worker ? worker : new CompareMediaListWorker();
    worker.postMessage(postObject);
    worker.onmessage = message => {
      batch(() => {
        setLoading(false);
        setListData(message.data);
        setCompareMediaList(message.data.entries);
      });
    };
  });

  createEffect(() => {
    if (!window.Worker) return;

    const lists = userListsData()[params.type];
    const includedLists = comparedUsers().map(name => lists[name.toLowerCase()]).filter(Boolean);
    const excludedLists = excludedUsers().map(name => lists[name.toLowerCase()]).filter(Boolean);

    setLoading(true);
    postToWorker(100, {
      includedLists,
      excludedLists,
      usersNeeded: usersNeeded(),
      search: search(),
      format: format(),
      status: status(),
      genre: genre(),
      countryOfOrigin: countryOfOrigin(),
      startDate: startDateFilter(),
      endDate: endDateFilter(),
      score: scoreFilter(),
      isAdult: isAdult(),
      year: year(),
      startedYear: startedYear(),
      completedYear: completedYear(),
      private: privateFilter(),
      notes: notesFilter(),
      repeat: rewatchedFilter(),
      sort: sort(),
      studio: studio(),
      userStatus: userStatus(),
      tag: tag(),
    });
  });

  onCleanup(() => {
    if (worker instanceof Worker) worker.terminate();
  });

  createEffect(() => document.title = `Compare ${params.type} - LOB`);

  const [contentTarget, setContentTarget] = createSignal();

  return (
    <CompareMediaListContext.Provider value={{ compareMediaList, users, loading }}>
      <div class="pg-compare">
        <CompareSearchControls
          listData={listData}
          scrollTarget={contentTarget()}
          setSearchParams={setSearchParams}
          users={comparedUsers}
          excludedUsers={excludedUsers}
          usersNeeded={usersNeeded}
          format={format}
          status={status}
          genre={genre}
          countryOfOrigin={countryOfOrigin}
          isAdult={isAdult}
          year={year}
          startedYear={startedYear}
          completedYear={completedYear}
          privateFilter={privateFilter}
          notesFilter={notesFilter}
          rewatchedFilter={rewatchedFilter}
          startDateFilter={startDateFilter}
          endDateFilter={endDateFilter}
          scoreFilter={scoreFilter}
          sort={sort}
          userStatus={userStatus}
          studio={studio}
          tag={tag}
        />
        <div ref={setContentTarget} class="pg-compare-body">
          <CompareMediaListContent hasUsers={comparedUsers().length > 0} />
        </div>
      </div>
    </CompareMediaListContext.Provider>
  );
}

function CompareMediaListContent(props) {
  const { compareMediaList, loading } = useCompareMediaList();
  const params = useParams();

  return (
    <>
      <h1>Total {params.type} {compareMediaList().length}</h1>
      <ol class="pg-compare-content grid-column-auto-fill" classList={{loading: loading()}}>
        <LoaderCircle scoped class="loader-circle" />
        <Show when={compareMediaList()} keyed>
          <ContentPage />
        </Show>
      </ol>
      <Show when={compareMediaList().length === 0}>
        <Switch fallback="No content">
          <Match when={loading()}>Loading content</Match>
          <Match when={!props.hasUsers}>No users selected</Match>
        </Switch>
      </Show>
    </>
  );
}

const [cardsVisibility, storeCardsVisibility] = createStore([]);
function ContentPage() {
  const { compareMediaList, users } = useCompareMediaList();
  const params = useParams();
  const observerList = [];
  function observe(target) {
    observerList.push(target);
  }

  onMount(() => {
    observerList.forEach(elem => intersectionObserver.observe(elem));
  });

  onCleanup(() => {
    intersectionObserver.disconnect();
  });

  const options = { rootMargin: "500px" }
  const callback = (entries) => {
    for (const entry of entries) {
      storeCardsVisibility(entry.target.dataset.index, entry.isIntersecting);
    }
  };

  const intersectionObserver = new IntersectionObserver(callback, options);

  return (
    <For each={compareMediaList()}>{(media, i) => (
      <li ref={observe} attr:data-index={i()} class="pg-compare-media-card inline-container" style={{"--color": media.coverImage.color}}>
        <div class="wrapper">
          <Show when={cardsVisibility[i()] && media.id !== -1}>
            <Show when={media.bannerImage}>
              <img src={media.bannerImage} loading="lazy" class="bg" inert alt="Background banner" />
            </Show>
            <div class="cover-wrapper" href={mediaUrl(media)}>
              <div class="header flex-space-between">
                <Show when={media.repeat}>
                  <div class="cp-card-repeat">
                    <Tooltip placements={["right", "left", "bottom"]}>Compined {params.type === "anime" ? "rewatches" : "rereads"} {media.repeat}</Tooltip>
                    {media.repeat}
                    <RepeatIcon scoped />
                  </div>
                </Show>
                <div class="average-score">
                  <Tooltip placements={["right", "left", "bottom"]}>Global average score</Tooltip>
                  <StarIcon scoped /> {(media.averageScore / 10) || "N/A"}
                </div>
              </div>
              <A scoped class="cover-link" href={mediaUrl(media)}>
                <img class="cover" loading="lazy" src={media.coverImage.large} alt="Media cover" />
              </A>
              <Show when={media.episodes || media.chapters || media.volumes || media.score}>
                <div class="footer flex-space-between">
                  <span>
                    <Switch>
                      <Match when={params.type === "anime"}>
                        <Show when={media.episodes}>Ep {media.episodes}</Show>
                      </Match>
                      <Match when={params.type === "manga"}>
                        <Show when={media.chapters}>Ch {media.chapters}</Show><br />
                        <Show when={media.volumes}>Vol {media.volumes}</Show>
                      </Match>
                    </Switch>
                  </span>
                  <Show when={media.score}>
                    <span>
                      {Math.round(media.score * 100) / 100}
                      <Tooltip placements={["right", "left", "bottom"]}>Users average score</Tooltip>
                    </span>
                  </Show>
                </div>
              </Show>
            </div>
            <div class="pg-compare-card-content">
              <p class="title line-clamp">{media.title.userPreferred}</p>
              <ol class="pg-compare-media-users">
                <For each={media.mediaEntries}>{user => (
                  <li>
                    <A scoped href={ "/user/" + user.name } class="name">
                      <img class="profile" src={users[user.name].avatar.large} alt="Profile picture" />
                      {user.name}
                    </A>
                    <Show when={user.status !== "COMPLETED"}>
                      <span class="status">{formatUsersMediaStatus(user.status, params.type)}</span>
                    </Show>
                    <Show when={user.repeat}>
                      <div class="cp-card-repeat">
                        {user.repeat}
                        <RepeatIcon scoped />
                      </div>
                    </Show>
                    <Score scoped class="score" score={user.score} format={users[user.name].mediaListOptions.scoreFormat || "POINT_10_DECIMAL"} />
                  </li>
                )}</For>
              </ol>
              <ul class="flex-bullet-separator">
                <Show when={translateToInternalSearchParams.format[media.format]}>{formatApiValue => (
                  <li>
                    <Switch>
                      <Match when={media.countryOfOrigin !== "JP"}> 
                        <A scoped href={"/ani/search/" + media.type.toLowerCase() + "?format=" + formatApiValue() + "&country=" + media.countryOfOrigin}>
                          {formatMediaFormat(media.format)} ({languageFromCountry(media.countryOfOrigin)})
                        </A>
                      </Match>
                      <Match when={media.countryOfOrigin === "JP"}> 
                        <A scoped href={"/ani/search/" + media.type.toLowerCase() + "?format=" + formatApiValue()}>
                          {formatMediaFormat(media.format)}
                        </A>
                      </Match>
                    </Switch>
                  </li>
                )}</Show>
                <Switch>
                  <Match when={params.type === "manga"}>
                    <Switch>
                      <Match when={media.startDate?.year}>
                        <A scoped href={"/ani/search/manga?year=" + media.startDate.year}>{media.startDate.year}</A>
                      </Match>
                      <Match when={media.startDate?.year == null}>
                        <A scoped href="/ani/search/manga/tba">TBA</A>
                      </Match>
                    </Switch>
                  </Match>
                  <Match when={params.type === "anime"}>
                    <Switch>
                      <Match when={media.seasonYear && media.season}>
                        <A scoped href={"/ani/search/anime/" + media.season.toLowerCase() + "-" + media.seasonYear}>{capitalize(media.season)} {media.seasonYear}</A>
                      </Match>
                      <Match when={media.startDate?.year}>
                        <A scoped href={"/ani/search/anime?year=" + media.startDate.year}>{media.startDate.year}</A>
                      </Match>
                      <Match when={media.startDate?.year == null}>
                        <A scoped href="/ani/search/anime/tba">TBA</A>
                      </Match>
                    </Switch>
                  </Match>
                </Switch>
              </ul>
            </div>
          </Show>
        </div>
      </li>
    )}</For>
  );
}
