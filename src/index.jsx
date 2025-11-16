import { render } from "solid-js/web"
import { Router, Route, Navigate } from "@solidjs/router";
import "./index.css"
import App from "./App.scoped.jsx"
import {Home} from "./pages/Home/index.scoped.jsx"
import Authentication from "./pages/Authentication/Authentication.jsx";
import { AuthenticationProvider } from "./context/AuthenticationContext.jsx";
import { ResponsiveProvider } from "./context/ResponsiveContext";
import { RedirectSearchHeaders, SearchBar, SearchContent } from "./pages/Search/index(search).scoped.jsx";
import { User } from "./pages/User/index(user).scoped.jsx";
import { StatsAnimeOverview, StatsMangaOverview } from "./pages/User/Stats/Overview/index(user-stats-overview).scoped.jsx";
import { StatsAnimeGenres, StatsMangaGenres } from "./pages/User/Stats/Genres/index(user-stats-genres).scoped.jsx";
import { StatsAnimeTags, StatsMangaTags } from "./pages/User/Stats/Tags/Tags.scoped.jsx";
import { StatsAnimeStudios } from "./pages/User/Stats/Studios/Studio.scoped.jsx";
import { StatsAnimeVoiceActors } from "./pages/User/Stats/VoiceActors/VoiceActors.scoped.jsx";
import { StatsAnimeStaff, StatsMangaStaff } from "./pages/User/Stats/Staff/Staff.scoped.jsx";
import Artist from "./pages/Artist/Artist.jsx";
import Notifications from "./pages/Notifications/Notifications.jsx";
import { MangaCharacters, AnimeCharacters, MangaStaff, AnimeStaff } from "./pages/Entities/Entities.jsx";
import { Staff as AnilistStaff, Character as AnilistCharacter } from "./pages/Entity/Entity.jsx";
import { Studio as AnilistStudio } from "./pages/Studio/index(studio).jsx";
import {ActivityPage} from "./pages/Activity/index(activity).scoped.jsx";
import { BrowseRedirect } from "./pages/Browse/Browse.scoped.jsx";
import { EditMediaEntriesProvider } from "./context/EditMediaEntriesContext.jsx";
import ComparePage from "./pages/Compare/ComparePage.jsx";
import { MediaInfoHomeJikan, MediaInfoWrapperJikan } from "./pages/MediaPageJikan/MediaInfoJikan.jsx";
import "./libs/tooltips.js";
import { MediaInfoCharactersJikan } from "./pages/MediaPageJikan/MediaInfoCharactersJikan.jsx";
import { MediaInfoStaffJikan } from "./pages/MediaPageJikan/MediaInfoStaffJikan.jsx";
import { CharacterJikan } from "./pages/CharacterJikan/CharacterJikan.jsx";
import {Overview} from "./pages/User/Overview/Overview.jsx";
import {UserMediaList} from "./pages/User/MediaList/index(user-media-list).scoped.jsx";
import {IndexFavouriteScoped} from "./pages/User/Favourites/index-(favourite).scoped.jsx";
import {Stats} from "./pages/User/Stats/index(user-stats).scoped.jsx";
import {MediaInfoContent, MediaInfoHome, MediaPageRedirect} from "./pages/MediaPageAnilist/index.scoped.jsx";
import {Socials} from "./pages/User/Socials/Socials.jsx";
import {BrowseMangaHomeScoped} from "./pages/Browse/BrowseMangaHome.scoped.jsx";
import {BrowseAnimeHome} from "./pages/Browse/BrowseAnimeHome.scoped.jsx";
import {BrowseMediaHomeScoped} from "./pages/Browse/BrowseMediaHome.scoped.jsx";

const root = document.getElementById("root")

const idFilter = {
  id: /^\d+$/,
}
const animeSearch = {
  type: "anime",
  header: (string) => {
    if (string.match(/^(summer|fall|spring|winter)-\d+$/)) {
      return true;
    }

    return ["finished", "this-season", "new", "tba", "next-season", "trending", "popular", "top-100"].includes(string);
  }
}
const mangaSearch = {
  type: "manga",
  header: ["finished", "finished-manga", "tba", "finished-novel", "novel", "new", "manhwa", "trending", "popular", "top-100"],
}

const bothSearch = {
  type: "media",
  header: ["finished", "trending", "popular", "top-100", "tba"],
}

render(
  () => (
    <AuthenticationProvider>
      <ResponsiveProvider>
        <EditMediaEntriesProvider>
          <Router root={App} base="/legendary-octo-barnacle">
            <Route path="/" component={Home} />
            <Route path="/authentication" component={Authentication} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/activity/:id" matchFilters={idFilter} component={ActivityPage} />
            {/* <Route path="/compare/:type" matchFilters={{ type: ["anime", "manga"] }} component={ComparePage} /> */}
            <Route path="/compare">
              <Route path="/" component={() => <Navigate href="anime" />} />
              <Route path="/:type" matchFilters={{ type: ["anime", "manga"] }} component={ComparePage} />
              <Route path="*" component={() => <Navigate href="/compare" />} />
            </Route>
            <Route path="/:mode" matchFilters={{mode: ["browse", "search"]}} component={SearchBar}>
              <Route path="/" matchFilters={{mode: "browse"}} component={BrowseRedirect}>
                <Route path="/:type" matchFilters={{type: "media"}} component={BrowseMediaHomeScoped} />
                <Route path="/:type" matchFilters={{type: "anime"}} component={BrowseAnimeHome} />
                <Route path="/:type" matchFilters={{type: "manga"}} component={BrowseMangaHomeScoped} />
              </Route>
              <Route path="/" matchFilters={{mode: "search"}} component={SearchContent}>
                <Route path="/" component={() => <Navigate href="media" />} />
                <Route path="/:type" matchFilters={{ type: ["anime", "manga", "media"] }}>
                  <Route path="/:header?" matchFilters={animeSearch} />
                  <Route path="/:header?" matchFilters={mangaSearch} />
                  <Route path="/:header?" matchFilters={bothSearch} />
                  <Route path="/:header?" component={RedirectSearchHeaders} />
                </Route>
              </Route>
            </Route>
            <Route path="/artist/:name" component={Artist} />
            <Route path="/:api">
              <Route path="/:sub/:id/:name?" matchFilters={{ api: "ani" }}>
                <Route path="/" matchFilters={{ ...idFilter, sub: "character" }} component={AnilistCharacter} />
                <Route path="/" matchFilters={{ ...idFilter, sub: "staff" }} component={AnilistStaff} />
                <Route path="/" matchFilters={{ ...idFilter, sub: "studio" }} component={AnilistStudio} />
              </Route>
              <Route path="/:sub/:id/:name?" matchFilters={{ api: "mal" }}>
                <Route path="/" matchFilters={{ ...idFilter, sub: "character" }} component={CharacterJikan} />
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
            <Route path="/user/:name" component={User}>
              <Route path="/" component={Overview} />
              <Route path="/:type/:list?" matchFilters={{ type: "anime" }} component={UserMediaList} />
              <Route path="/:type/:list?" matchFilters={{ type: "manga" }} component={UserMediaList} />
              <Route path="/favourites" component={IndexFavouriteScoped} />
              <Route path="/stats" component={Stats}>
                <Route path="/" component={() => <Navigate href="anime" />} />
                <Route path="/:type" matchFilters={{ type: "anime" }}>
                  <Route path="/" component={() => <Navigate href="overview" />} />
                  <Route path="/overview" component={StatsAnimeOverview} />
                  <Route path="/genres" component={StatsAnimeGenres} />
                  <Route path="/tags" component={StatsAnimeTags} />
                  <Route path="/studios" component={StatsAnimeStudios} />
                  <Route path="/staff" component={StatsAnimeStaff} />
                  <Route path="/voice-actors" component={StatsAnimeVoiceActors} />
                </Route>
                <Route path="/:type" matchFilters={{ type: "manga" }}>
                  <Route path="/" component={() => <Navigate href="overview" />} />
                  <Route path="/overview" component={StatsMangaOverview} />
                  <Route path="/genres" component={StatsMangaGenres} />
                  <Route path="/tags" component={StatsMangaTags} />
                  <Route path="/staff" component={StatsMangaStaff} />
                </Route>
              </Route>
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
