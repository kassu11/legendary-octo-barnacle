import { render } from "solid-js/web"
import { Router, Route } from "@solidjs/router";
import "./index.scss"
import App from "./App.jsx"
import { MangaInfo, AnimeInfo } from "./pages/MediaInfo.jsx"
import Home from "./pages/Home.jsx"
import Authentication from "./pages/Authentication.jsx";
import { AuthenticationProvider } from "./context/AuthenticationContext.jsx";
import { ResponsiveProvider } from "./context/ResponsiveContext";
import { EditMediaEntriesProvider } from "./context/EditMediaEntriesContext.jsx";
import Search from "./pages/Search.jsx";
import { User, Overview, AnimeList, MangaList, FavouriteContainer, Socials } from "./pages/User.jsx";
import Artist from "./pages/Artist.jsx";
import Notifications from "./pages/Notifications.jsx";
import { MangaCharacters, AnimeCharacters, MangaStaff, AnimeStaff } from "./pages/Entities.jsx";
import { Staff, Character } from "./pages/Entity.jsx";
import Activity from "./pages/Activity.jsx";

const root = document.getElementById("root")

const idFilter = {
  id: /^\d+$/,
}
const animeSearch = {
  type: ["anime"],
  header: ["finished", "this-season", "new", "next-season", "trending", "popular", "top-100"],
}
const mangaSearch = {
  type: ["manga"],
  header: ["finished", "finished-manga", "finished-novel", "novel", "new", "manwha", "trending", "popular", "top-100"],
}

const bothSearch = {
  header: ["finished", "trending", "popular", "top-100"],
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
            <Route path="/search" component={Search}>
              <Route path="/:type?/:header?" matchFilters={animeSearch} />
              <Route path="/:type?/:header?" matchFilters={mangaSearch} />
              <Route path="/:header" matchFilters={bothSearch} />
            </Route>
            <Route path="/artist/:name" component={Artist} />
            <Route path="/ani">
              <Route path="/character/:id/:name?" matchFilters={idFilter} component={Character} />
              <Route path="/staff/:id/:name?" matchFilters={idFilter} component={Staff} />
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
              <Route path="/anime/:list?" component={AnimeList} />
              <Route path="/manga/:list?" component={MangaList} />
              <Route path="/favourites" component={FavouriteContainer} />
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
