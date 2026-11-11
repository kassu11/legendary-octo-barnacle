import { useParams } from "@solidjs/router";
import { numberCommas } from "@/utils/formatUtils.js";
import { createEffect, createSignal, Match, Show, Switch } from "solid-js";
import { useUser } from "@/state/providers.js";
import { BookIcon, BookmarkIcon, BookOpenIcon, CalendarIcon, DivideIcon, HourglassIcon, PercentIcon, PlayIcon, TvIcon } from "@/assets/icons.jsx";
import "./UserStatsOverviewIndex.scoped.css";
import { StatsDistributionListsScoped } from "./StatsDistributionLists.scoped.jsx";
import { StatsScoreDistributionBarsScoped } from "./StatsScoreDistributionBars.scoped.jsx";
import { StatsEpisodeCountBarsScoped } from "./StatsEpisodeCountBars.scoped.jsx";
import { StatsYearLineChartsScoped } from "./StatsYearLineCharts.scoped.jsx";
import { createAnilistFetcher, sendAnilistFetcher } from "@/api/fetcherUtils.js";
import { queries } from "@/api/api.js";
import { localizations } from "@/constants/constants.js";
import { createTimer } from "@/hooks/createTimer.js";
import { formatMSToString } from "@/utils/timeUtils.js";
import { createCleanUpAbortController } from "@/utils/abortUtils.js";

export function StatsMediaOverview() {
  const params = useParams();

  const [userStatsTime, startUserStatsTimer, stopUserStatsTimer] = createTimer();
  const [userStatsData, setUserStatsData] = createSignal(undefined, { equals: false });
  const userStatsController = createCleanUpAbortController();
  let userStatsFetcher;
  createEffect(() => {
    const signal = userStatsController.abortAndRenew();

    if (params.type === localizations.anime) userStatsFetcher = createAnilistFetcher(queries.anilistGetUserAnimeStats, { name: params.name }, signal);
    if (params.type === localizations.manga) userStatsFetcher = createAnilistFetcher(queries.anilistGetUserMangaStats, { name: params.name }, signal);

    sendAnilistFetcher(userStatsFetcher, {
      name: "Anilist user stats",
      onFetch: () => userStatsController.disable(),
      onStart: startUserStatsTimer,
      onStop: stopUserStatsTimer,
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === userStatsFetcher.cacheKey) setUserStatsData(res.data.data.User.statistics);
      }
    });
  });

  return (
    <Show when={userStatsData()}>
      <p>{formatMSToString(userStatsTime())}</p>
      <StatsOverview stats={userStatsData().anime || userStatsData().manga} />
    </Show>
  )
}

function StatsOverview(props) {
  const params = useParams();
  const { user } = useUser();

  return (
    <>
      <section class="user-profile-stats-header-section">
        <ul class="user-profile-stats-general-header">
          <li>
            <div class="svg-container">
              <Switch>
                <Match when={params.type === "anime"}>
                  <TvIcon scoped />
                </Match>
                <Match when={params.type === "manga"}>
                  <BookIcon scoped />
                </Match>
              </Switch>
            </div>
            <div class="right">
              <p class="value">{numberCommas(user().statistics[params.type].count || 0)}</p>
              <p class="title">Total {params.type}</p>
            </div>
          </li>
          <li>
            <div class="svg-container">
              <Switch>
                <Match when={params.type === "anime"}>
                  <PlayIcon scoped />
                </Match>
                <Match when={params.type === "manga"}>
                  <BookmarkIcon scoped />
                </Match>
              </Switch>
            </div>
            <div class="right">
              <p class="value">
                <Switch>
                  <Match when={params.type === "anime"}>
                    {numberCommas(user().statistics.anime.episodesWatched || 0)}
                  </Match>
                  <Match when={params.type === "manga"}>
                    {numberCommas(user().statistics.manga.chaptersRead || 0)}
                  </Match>
                </Switch>
              </p>
              <p class="title">
                <Switch>
                  <Match when={params.type === "anime"}>Episodes watched</Match>
                  <Match when={params.type === "manga"}>Chapters read</Match>
                </Switch>
              </p>
            </div>
          </li>
          <li>
            <div class="svg-container">
              <Switch>
                <Match when={params.type === "anime"}>
                  <CalendarIcon scoped />
                </Match>
                <Match when={params.type === "manga"}>
                  <BookOpenIcon scoped />
                </Match>
              </Switch>
            </div>
            <div class="right">
              <p class="value">
                <Switch>
                  <Match when={params.type === "anime"}>
                    {((user().statistics.anime.minutesWatched || 0) / 60 / 24).toFixed(1)}
                  </Match>
                  <Match when={params.type === "manga"}>
                    {user().statistics.manga.volumesRead || 0}
                  </Match>
                </Switch>
              </p>
              <p class="title">
                <Switch>
                  <Match when={params.type === "anime"}>Days watched</Match>
                  <Match when={params.type === "manga"}>Volumes read</Match>
                </Switch>
              </p>
            </div>
          </li>
          <li>
            <div class="svg-container">
              <HourglassIcon scoped />
            </div>
            <div class="right">
              <p class="value">
                <Switch>
                  <Match when={params.type === "anime"}>
                    {((props.stats.statuses.find(list => list.status === "PLANNING")?.minutesWatched || 0) / 60 / 24).toFixed(1)}
                  </Match>
                  <Match when={params.type === "manga"}>
                    {((props.stats.statuses.find(list => list.status === "PLANNING")?.chaptersRead || 0))}
                  </Match>
                </Switch>
              </p>
              <p class="title">
                <Switch>
                  <Match when={params.type === "anime"}>Days planned</Match>
                  <Match when={params.type === "manga"}>Chapters planned</Match>
                </Switch>
              </p>
            </div>
          </li>
          <li>
            <div class="svg-container">
              <PercentIcon scoped />
            </div>
            <div class="right">
              <p class="value">{(user().statistics[params.type].meanScore || 0).toFixed(2)}</p>
              <p class="title">Mean score</p>
            </div>
          </li>
          <li>
            <div class="svg-container">
              <DivideIcon scoped />
            </div>
            <div class="right">
              <p class="value">{(user().statistics[params.type].standardDeviation || 0).toFixed(1)}</p>
              <p class="title">Standard Deviation</p>
            </div>
          </li>
        </ul>
      </section>
      <StatsScoreDistributionBarsScoped data={props.stats.scores.sort((a, b) => a.score - b.score)}/>
      <StatsEpisodeCountBarsScoped data={props.stats.lengths.sort((a, b) => (parseInt(a.length) || Infinity) - (parseInt(b.length) || Infinity))}/>
      <StatsDistributionListsScoped formats={props.stats.formats} statuses={props.stats.statuses} countries={props.stats.countries} />
      <StatsYearLineChartsScoped heading="Release year" data={props.stats.releaseYears.sort((a, b) => a.releaseYear - b.releaseYear)}/>
      <StatsYearLineChartsScoped heading="Watch year" data={props.stats.startYears.sort((a, b) => a.startYear - b.startYear)}/>
    </>
  );
}

