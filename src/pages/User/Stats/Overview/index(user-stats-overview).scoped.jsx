import {useParams} from "@solidjs/router";
import api from "../../../../utils/api.js";
import {numberCommas} from "../../../../utils/formating.js";
import {Match, Show, Switch} from "solid-js";
import {useAuthentication, useUser} from "../../../../context/providers.js";
import "../index(user-stats).css";
import {StatsDistributionListsScoped} from "./StatsDistributionLists.scoped.jsx";
import {StatsScoreDistributionBarsScoped} from "./StatsScoreDistributionBars.scoped.jsx";
import {StatsEpisodeCountBarsScoped} from "./StatsEpisodeCountBars.scoped.jsx";
import {StatsYearLineChartsScoped} from "./StatsYearLineCharts.scoped.jsx";

export function StatsAnimeOverview() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [userStats] = api.anilist.userAnimeStats(() => params.name, accessToken);

  return (
    <Show when={userStats()}>
      <StatsOverview stats={userStats().data} />
    </Show>
  )
}
export function StatsMangaOverview() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [userStats] = api.anilist.userMangaStats(() => params.name, accessToken);

  return (
    <Show when={userStats()}>
      <StatsOverview stats={userStats().data} />
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
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M592 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h245.1v32h-160c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-160v-32H592c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h512v288z"></path></svg>
                </Match>
                <Match when={params.type === "manga"}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg>
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
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>
                </Match>
                <Match when={params.type === "manga"}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path></svg>
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
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path></svg>
                </Match>
                <Match when={params.type === "manga"}>
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"></path></svg>
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
              <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64z"></path></svg>
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
              <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M109.25 173.25c24.99-24.99 24.99-65.52 0-90.51-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 25 25 65.52 25 90.51 0zm256 165.49c-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 24.99 24.99 65.52 24.99 90.51 0 25-24.99 25-65.51 0-90.51zm-1.94-231.43l-22.62-22.62c-12.5-12.5-32.76-12.5-45.25 0L20.69 359.44c-12.5 12.5-12.5 32.76 0 45.25l22.62 22.62c12.5 12.5 32.76 12.5 45.25 0l274.75-274.75c12.5-12.49 12.5-32.75 0-45.25z"></path></svg>
            </div>
            <div class="right">
              <p class="value">{(user().statistics[params.type].meanScore || 0).toFixed(2)}</p>
              <p class="title">Mean score</p>
            </div>
          </li>
          <li>
            <div class="svg-container">
              <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm0-192c35.35 0 64-28.65 64-64s-28.65-64-64-64-64 28.65-64 64 28.65 64 64 64zm192 48H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
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

