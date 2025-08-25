import { A } from "@solidjs/router";
import { For, Match, Show, Switch } from "solid-js";
import api from "../../../utils/api.js";
import { useAuthentication, useUser } from "../../../context/providers.js";
import { formatTimeToDate, formatTitleToUrl, numberCommas } from "../../../utils/formating.js";
import { ActivityCard } from "../../../components/Activity.jsx";
import { Tooltip } from "../../../components/Tooltips.jsx";
import "./Overview.scss";
import { asserts } from "../../../utils/utils.js";

export function Overview() {
  const { user } = useUser();
  const { accessToken } = useAuthentication();
  const [activity, { mutateCache: mutateActivityCache }] = api.anilist.activityByUserId(() => user().id || undefined, accessToken);

  return (
    <div class="user-profile-overview-body">
      <div class="user-info-container">
        <Switch>
          <Match when={user().donatorTier === 1}>
            <p>{user().donatorBadge}</p>
          </Match>
          <Match when={user().donatorTier === 2}>
            <p>{user().donatorBadge} (fancy)</p>
          </Match>
          <Match when={user().donatorTier === 3}>
            <p>{user().donatorBadge} (extra fancy)</p>
          </Match>
        </Switch>
        <ActivityHistory history={user().stats?.activityHistory || []} />
        <Show when={user().favourites.anime.edges.length}>
          <div class="user-favourites">
            <h3>Favourite animes</h3>
            <ol class="grid-reel-auto-fill">
              <For each={user().favourites.anime.edges}>{anime => (
                <li class="item">
                  <A href={"/anime/" + anime.node.id + "/" + formatTitleToUrl(anime.node.title.userPreferred)}>
                    <img src={anime.node.coverImage.large} alt="Cover" />
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={user().favourites.manga.edges.length}>
          <div class="user-favourites">
            <h3>Favourite manga</h3>
            <ol class="grid-reel-auto-fill">
              <For each={user().favourites.manga.edges}>{manga => (
                <li class="item">
                  <A href={"/manga/" + manga.node.id + "/" + formatTitleToUrl(manga.node.title.userPreferred)}>
                    <img src={manga.node.coverImage.large} alt="Cover" />
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={user().favourites.characters.edges.length}>
          <div class="user-favourites">
            <h3>Favourite characters</h3>
            <ol class="grid-reel-auto-fill">
              <For each={user().favourites.characters.edges}>{character => (
                <li class="item">
                  <A href={"/ani/character/" + character.node.id + "/" + formatTitleToUrl(character.node.name.userPreferred)}>
                    <img src={character.node.image.large} alt="Cover" />
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={user().favourites.staff.edges.length}>
          <div class="user-favourites">
            <h3>Favourite staff</h3>
            <ol class="grid-reel-auto-fill">
              <For each={user().favourites.staff.edges}>{staff => (
                <li class="item">
                  <A href={"/ani/staff/" + staff.node.id + "/" + formatTitleToUrl(staff.node.name.userPreferred)}>
                    <img src={staff.node.image.large} alt="Cover" />
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
        <Show when={user().favourites.studios.edges.length}>
          <div class="user-favourites-studio">
            <h3>Favourite studio</h3>
            <ol>
              <For each={user().favourites.studios.edges}>{studio => (
                <li class="item">
                  <A href={"/ani/studio/" + studio.node.id + "/" + formatTitleToUrl(studio.node.name)}>
                    {studio.node.name}
                  </A>
                </li>
              )}</For>
            </ol>
          </div>
        </Show>
      </div>
      <div class="user-activity-container">
        <div class="user-profile-progress">
          <Show when={user().statistics.anime.count}>
            <div class="container">
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.anime.count)}</p>
                <p>Total anime</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{(user().statistics.anime.minutesWatched / 60 / 24).toFixed(1)}</p>
                <p>Days watched</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.anime.episodesWatched)}</p>
                <p>Episodes watched</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{user().statistics.anime.meanScore}</p>
                <p>Mean score</p>
              </div>
            </div>
          </Show>
          <Show when={user().statistics.manga.count}>
            <div class="container">
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.manga.count)}</p>
                <p>Total manga</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.manga.chaptersRead)}</p>
                <p>Chapters read</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{numberCommas(user().statistics.manga.volumesRead)}</p>
                <p>Volumes read</p>
              </div>
              <div class="profile-progress-item">
                <p class="header">{user().statistics.manga.meanScore}</p>
                <p>Mean score</p>
              </div>
            </div>
          </Show>
        </div>
        <div class="user-profile-genres">
          <GenrePreview title="Anime genre overview" type="anime" genres={user().statistics.anime.genrePreview} total={user().statistics.anime.count}/>
          <GenrePreview title="Manga genre overview" type="manga" genres={user().statistics.manga.genrePreview} total={user().statistics.manga.count}/>
        </div>
        <div class="user-profile-activity">
          <For each={activity()?.data.data.Page.activities}>{activity => (
            <ActivityCard activity={activity} mutateCache={mutateActivityCache} hideProfile={true} small={true}/>
          )}</For>
        </div>
      </div>
    </div>
  );
}

function GenrePreview(props) {
  asserts.assertTrue(props.genres, "Genres missing");
  asserts.assertTrue(props.title, "Title missing");

  const { user } = useUser();

  return (
    <Show when={props.total}>
      <div class="user-genres-overview">
        <h3>{props.title}</h3>
        <ol>
          <For each={props.genres}>{genre => (
            <li class="item">
              <A href={"/user/" + user().name + "/" + props.type + "?genre=" + genre.genre}>
                {genre.genre} <span>{Math.round(genre.count / props.total * 100)}%</span>
              </A>
            </li>
          )}</For>
        </ol>
      </div>
    </Show>
  );
}

function ActivityHistory(props) {
  const _now = new Date();
  let start = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate());
  const end = start.getTime() / 1000;
  start.setDate(start.getDate() - 7 * 25 + (6 - start.getDay()) - 5);
  const lastDate = props.history.at(-1).date;
  start /= 1000;

  return (
    <Show when={props.history.at(-1).date > start}>
      <div>
        <h3>Activity</h3>
        <div class="activity-history-container">
          <ol class="activity-history-header-list">
            <li class="activity-history-header">Mon</li>
            <li class="activity-history-header">Tue</li>
            <li class="activity-history-header">Wed</li>
            <li class="activity-history-header">Thu</li>
            <li class="activity-history-header">Fri</li>
            <li class="activity-history-header">Sat</li>
            <li class="activity-history-header">Sun</li>
          </ol>
          <ol class="activity-history-list">
            <For each={props.history}>{(activity, i) => {

              const emtySpace = Math.max(0, Math.round((activity.date - (props.history[i() - 1]?.date || start)) / 3600 / 24) - 1);
              return (
                <Show when={activity.date > start}>
                  <For each={Array(emtySpace).fill(0)}>{(_, j) => (
                    <li class="activity-item">
                      <ActivityTooltip date={(activity.date + 3600 * 24 * (j() - emtySpace)) * 1000}/>
                    </li>
                  )}</For>
                  <li class="activity-item" attr:data-level={activity.level}>
                    <ActivityTooltip date={activity.date * 1000} amount={activity.amount} />
                  </li>
                </Show>
              );
            }}</For>
            <For each={Array(Math.max(0, Math.round((end - (props.history.at(-1)?.date || start)) / 3600 / 24) - 1)).fill(0)}>{(_, j) => (
              <li class="activity-item">
                <ActivityTooltip date={(lastDate + 3600 * 24 * (j() + 1)) * 1000} />
              </li>
            )}</For>
          </ol>
        </div>
      </div>
    </Show>
  );

  function ActivityTooltip(props) {
    const getTipPosition = date => {
      if (date < (start + 3600 * 24 * 60) * 1000) {
        return "right";
      }
      if (date > (start + 3600 * 24 * (180 - 60)) * 1000) {
        return "left";
      }
    }

    return (
      <Tooltip tipPosition={getTipPosition(props.date)}>
        <p>{formatTimeToDate(props.date)}</p>
        <p>Amount: {props.amount || 0}</p>
      </Tooltip>
    );
  }
}
