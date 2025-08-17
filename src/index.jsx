import { render } from "solid-js/web"
import { Router, Route, Navigate } from "@solidjs/router";
import "./index.scss"
import App from "./App.jsx"
import { MangaInfo, AnimeInfo } from "./pages/MediaInfo.jsx"
import Home from "./pages/Home.jsx"
import Authentication from "./pages/Authentication.jsx";
import { AuthenticationProvider } from "./context/AuthenticationContext.jsx";
import { ResponsiveProvider } from "./context/ResponsiveContext";
import { SearchBar, SearchContent } from "./pages/Search.jsx";
import { User, Overview, AnimeList, MangaList, FavouriteContainer, Socials } from "./pages/User.jsx";
import { Stats } from "./pages/User/Stats/Stats.jsx";
import { StatsAnimeOverview, StatsMangaOverview } from "./pages/User/Stats/Overview.jsx";
import { StatsAnimeGenres, StatsMangaGenres } from "./pages/User/Stats/Genres.jsx";
import { StatsAnimeTags, StatsMangaTags } from "./pages/User/Stats/Tags.jsx";
import { StatsAnimeStudios } from "./pages/User/Stats/Studios.jsx";
import { StatsAnimeVoiceActors } from "./pages/User/Stats/VoiceActors.jsx";
import { StatsAnimeStaff, StatsMangaStaff } from "./pages/User/Stats/Staff.jsx";
import Artist from "./pages/Artist.jsx";
import Notifications from "./pages/Notifications.jsx";
import { MangaCharacters, AnimeCharacters, MangaStaff, AnimeStaff } from "./pages/Entities.jsx";
import { Staff, Character } from "./pages/Entity.jsx";
import { Studio } from "./pages/Studio.jsx";
import Activity from "./pages/Activity.jsx";
import { BrowseAnimeHome, BrowseMangaHome, BrowseMediaHome, BrowseRedirect } from "./pages/Browse.jsx";
import { RedirectSearchHeaders } from "./pages/SearchHeaderRedirect.jsx";
import { EditMediaEntriesProvider } from "./context/EditMediaEntriesContext.jsx";
import ComparePage from "./pages/ComparePage.jsx";

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
            <Route path="/activity/:id" matchFilters={idFilter} component={Activity} />
            {/* <Route path="/compare/:type" matchFilters={{ type: ["anime", "manga"] }} component={ComparePage} /> */}
            <Route path="/compare">
              <Route path="/" component={() => <Navigate href="anime" />} />
              <Route path="/:type" matchFilters={{ type: ["anime", "manga"] }} component={ComparePage} />
              <Route path="*" component={() => <Navigate href="/compare" />} />
            </Route>
            <Route path="/:mode" matchFilters={{mode: ["browse", "search"]}} component={SearchBar}>
              <Route path="/" matchFilters={{mode: "browse"}} component={BrowseRedirect}>
                <Route path="/:type" matchFilters={{type: "media"}} component={BrowseMediaHome} />
                <Route path="/:type" matchFilters={{type: "anime"}} component={BrowseAnimeHome} />
                <Route path="/:type" matchFilters={{type: "manga"}} component={BrowseMangaHome} />
              </Route>
              <Route path="/" matchFilters={{mode: "search"}} component={SearchContent}>
                <Route path="/:type/:header?" matchFilters={animeSearch} />
                <Route path="/:type/:header?" matchFilters={mangaSearch} />
                <Route path="/:type/:header?" matchFilters={bothSearch} />
                {/* <Route path="/:type/:header?" component={RedirectSearchHeaders} /> */}
              </Route>
            </Route>
            <Route path="/artist/:name" component={Artist} />
            <Route path="/ani">
              <Route path="/character/:id/:name?" matchFilters={idFilter} component={Character} />
              <Route path="/staff/:id/:name?" matchFilters={idFilter} component={Staff} />
              <Route path="/studio/:id/:name?" matchFilters={idFilter} component={Studio} />
            </Route>
            <Route path="/anime">
              <Route path="/:id/:name?" matchFilters={idFilter} component={AnimeInfo} />
              <Route path="/:id/:name?/characters" matchFilters={idFilter} component={AnimeCharacters} />
              <Route path="/:id/:name?/staff" matchFilters={idFilter} component={AnimeStaff} />
            </Route>
            <Route path="/manga">
              <Route path="/:id/:name?" matchFilters={idFilter} component={MangaInfo} />
              <Route path="/:id/:name?/characters" matchFilters={idFilter} component={MangaCharacters} />
              <Route path="/:id/:name?/staff" matchFilters={idFilter} component={MangaStaff} />
            </Route>
            <Route path="/user/:name" component={User}>
              <Route path="/" component={Overview} />
              <Route path="/:type/:list?" matchFilters={{type: "anime"}} component={AnimeList} />
              <Route path="/:type/:list?" matchFilters={{type: "manga"}} component={MangaList} />
              <Route path="/favourites" component={FavouriteContainer} />
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
