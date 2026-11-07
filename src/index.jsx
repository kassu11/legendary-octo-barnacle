import { render } from "solid-js/web"
import { Router, Route, Navigate } from "@solidjs/router";
import "./index.css"
import App from "./app/App.scoped.jsx"
import { Home } from "./pages/Home/HomeIndex.scoped.jsx"
import Authentication from "./pages/Authentication/AuthenticationIndex.jsx";
import { AuthenticationProvider } from "./state/AuthenticationContext.jsx";
import { ResponsiveProvider } from "./state/ResponsiveContext";
import { User } from "./pages/User/UserIndex.scoped.jsx";
import { StatsMediaOverview } from "./pages/User/Stats/Overview/UserStatsOverviewIndex.scoped.jsx";
import { StatsMediaGenres } from "./pages/User/Stats/Genres/UserStatsGenresIndex.scoped.jsx";
import { StatsMediaTags } from "./pages/User/Stats/Tags/UserStatsTagsIndex.scoped.jsx";
import { StatsAnimeStudios } from "./pages/User/Stats/Studios/UserStatsStudiosIndex.scoped.jsx";
import { StatsAnimeVoiceActors } from "./pages/User/Stats/VoiceActors/UserStatsVoiceActorsIndex.scoped.jsx";
import { StatsMediaStaff } from "./pages/User/Stats/Staff/UserStatsStaffIndex.scoped.jsx";
import Artist from "./pages/Artist/ArtistIndex.scoped.jsx";
import Notifications from "./pages/Notifications/NotificationsIndex.scoped.jsx";
import { MangaCharacters, AnimeCharacters, MangaStaff, AnimeStaff } from "./pages/Entities/EntitiesIndex.scoped.jsx";
import { Staff as AnilistStaff, Character as AnilistCharacter } from "./pages/Entity/EntityIndex.scoped.jsx";
import { Studio as AnilistStudio } from "./pages/Studio/StudioIndex.scoped.jsx";
import { ActivityPage } from "./pages/Activity/ActivityIndex.scoped.jsx";
import { EditMediaEntriesProvider } from "./components/media/EditMediaEntriesContext.scoped.jsx";
import ComparePage from "./pages/Compare/CompareIndex.scoped.jsx";
import { MediaInfoHomeJikan, MediaInfoWrapperJikan } from "./pages/Media/Jikan/MediaJikanIndex.scoped.jsx";
import { MediaInfoCharactersJikan } from "./pages/Media/Jikan/MediaJikanCharactersIndex.jsx";
import { MediaInfoStaffJikan } from "./pages/Media/Jikan/MediaJikanStaffIndex.jsx";
import { CharacterJikanScoped } from "./pages/CharacterJikan/CharacterJikanIndex.scoped.jsx";
import { Overview } from "./pages/User/Overview/UserOverviewIndex.scoped.jsx";
import { UserMediaList } from "./pages/User/MediaList/UserMediaListIndex.scoped.jsx";
import { IndexFavouriteScoped } from "./pages/User/Favourites/UserFavouritesIndex.scoped.jsx";
import { Stats } from "./pages/User/Stats/UserStatsIndex.scoped.jsx";
import { MediaInfoContent, MediaInfoHome, MediaPageRedirect } from "./pages/Media/Anilist/MediaAnilistIndex.scoped.jsx";
import { Socials } from "./pages/User/Socials/UserSocialsIndex.scoped.jsx";
import { SettingsPage } from "./pages/Settings/SettingsIndex.scoped";
import { SearchPage } from "./pages/Search/SearchIndex.scoped";
import { UserRelations } from "./pages/User/Relations/UserRelationsIndex.scoped";

const root = document.getElementById("root")

const idFilter = {
  id: /^\d+$/,
}
const animeSearch = {
  type: "anime",
  header: (string) => {
    if (/^(summer|fall|spring|winter)-\d+$/.test(string)) {
      return true;
    }

    return ["finished", "this-season", "new", "tba", "next-season", "trending", "popular", "top"].includes(string);
  }
}
const mangaSearch = {
  type: "manga",
  header: ["finished", "finished-manga", "tba", "finished-novel", "novel", "new", "manhwa", "trending", "popular", "top"],
}

const bothSearch = {
  type: "media",
  header: ["finished", "trending", "popular", "top", "tba"],
}

render(
  () => (
    <AuthenticationProvider>
      <ResponsiveProvider>
        <EditMediaEntriesProvider>
          <Router root={App} base={__BASE__}>
            <Route path="/" component={Home} />
            <Route path="/authentication" component={Authentication} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/activity/:id" matchFilters={idFilter} component={ActivityPage} />
            {/* <Route path="/compare/:type" matchFilters={{ type: ["anime", "manga"] }} component={ComparePage} /> */}
            <Route path="/compare">
              <Route path="/" component={() => <Navigate href="anime" />} />
              <Route path="/:type" matchFilters={{ type: ["anime", "manga"] }} component={ComparePage} />
              <Route path="*" component={() => <Navigate href="/compare" />} />
            </Route>
            <Route path="/:api/:mode/:type" matchFilters={{ api: ["ani", "mal"], mode: ["browse", "search"], type: ["anime", "manga", "media"] }} component={SearchPage}>
              <Route path="/:header?" matchFilters={animeSearch} />
              <Route path="/:header?" matchFilters={mangaSearch} />
              <Route path="/:header?" matchFilters={bothSearch} />
            </Route>
            <Route path="/artist/:name" component={Artist} />
            <Route path="/:api">
              <Route path="/:sub/:id/:name?" matchFilters={{ api: "ani" }}>
                <Route path="/" matchFilters={{ ...idFilter, sub: "character" }} component={AnilistCharacter} />
                <Route path="/" matchFilters={{ ...idFilter, sub: "staff" }} component={AnilistStaff} />
                <Route path="/" matchFilters={{ ...idFilter, sub: "studio" }} component={AnilistStudio} />
              </Route>
              <Route path="/:sub/:id/:name?" matchFilters={{ api: "mal" }}>
                <Route path="/" matchFilters={{ ...idFilter, sub: "character" }} component={CharacterJikanScoped} />
                {/* <Route path="/" matchFilters={{ ...idFilter, sub: "staff" }} component={Staff} /> */}
                {/* <Route path="/" matchFilters={{ ...idFilter, sub: "studio" }} component={Studio} /> */}
              </Route>
            </Route>
            <Route path="/:type/:id/:name?" matchFilters={{ ...idFilter, type: ["anime", "manga"] }} component={MediaPageRedirect} />

            <Route path="/:api">
              <Route path="/:type/:id/:name?" matchFilters={{ ...idFilter, api: "ani" }} component={MediaInfoContent}>
                <Route path="/" matchFilters={{ type: ["anime", "manga"] }} component={MediaInfoHome} />
                <Route path="/:sub" matchFilters={{ sub: "characters" }}>
                  <Route path="/" matchFilters={{ type: "anime" }} component={AnimeCharacters} />
                  <Route path="/" matchFilters={{ type: "manga" }} component={MangaCharacters} />
                </Route>
                <Route path="/:sub" matchFilters={{ sub: "staff" }}>
                  <Route path="/" matchFilters={{ type: "anime" }} component={AnimeStaff} />
                  <Route path="/" matchFilters={{ type: "manga" }} component={MangaStaff} />
                </Route>
              </Route>
              <Route path="/:type/:id/:name?" matchFilters={{ ...idFilter, api: "mal" }} component={MediaInfoWrapperJikan}>
                <Route path="/" matchFilters={{ type: ["anime", "manga"] }} component={MediaInfoHomeJikan} />
                <Route path="/:sub">
                  <Route path="/" matchFilters={{ sub: "characters", type: ["anime", "manga"] }} component={MediaInfoCharactersJikan} />
                  <Route path="/" matchFilters={{ sub: "staff", type: "anime" }} component={MediaInfoStaffJikan} />
                </Route>
              </Route>
            </Route>

            {/* User profile page */}
            <Route path="/user/:name" component={User}>
              {/* Default to user overview page */}
              <Route path="/" component={Overview} />

              {/* All pages that can change content based on media type */}
              <Route path="/:type" matchFilters={{ type: [ "anime", "manga" ] }}>

                {/* Default to list view */}
                <Route path="/" component={() => <Navigate href="list" />} />
                <Route path="/list/:list?" component={UserMediaList} />
                <Route path="/relations" component={UserRelations} />

                {/* User stats page */}
                <Route path="/stats" component={Stats}>
                  {/* Default to stats overview page */}
                  <Route path="/" component={() => <Navigate href="overview" />} />

                  <Route path="/overview" component={StatsMediaOverview} />
                  <Route path="/genres" component={StatsMediaGenres} />
                  <Route path="/tags" component={StatsMediaTags} />
                  <Route path="/staff" component={StatsMediaStaff} />

                  {/* Mangas don't have studios or voice actors */}
                  <Route path="/studios" matchFilters={{ type: "anime" }} component={StatsAnimeStudios} />
                  <Route path="/voice-actors" matchFilters={{ type: "anime" }} component={StatsAnimeVoiceActors} />

                </Route>

              </Route>
              <Route path="/favourites" component={IndexFavouriteScoped} />
              <Route path="/socials" component={Socials} />

            </Route>
            <Route path="*404" component={() => <div>Not fould 404</div>} />
          </Router>
        </EditMediaEntriesProvider>
      </ResponsiveProvider>
    </AuthenticationProvider>
  ),
  root
);
