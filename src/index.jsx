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
import Anime from "./pages/Anime.jsx";
import Manga from "./pages/Manga.jsx";
import Search from "./pages/Search.jsx";
import Character from "./pages/Character.jsx";
import Artist from "./pages/Artist.jsx";
import { MangaCharacters, AnimeCharacters } from "./pages/Characters.jsx";

const root = document.getElementById("root")

const filter = {
  id: /^\d+$/,
}
const search = {
  type: ["anime", "manga"],
  header: ["this-season", "next-season"],
}

render(
  () => (
    <AuthenticationProvider>
      <ResponsiveProvider>
        <EditMediaEntriesProvider>
          <Router root={App} base="/legendary-octo-barnacle">
            <Route path="/" component={Home} />
            <Route path="/authentication" component={Authentication} />
            <Route path="/search/:type?/:header?" matchFilters={search} component={Search} />
            <Route path="/artist/:name" component={Artist} />
            <Route path="/ani">
              <Route path="/character/:id" matchFilters={filter} component={Character} />
              <Route path="/staff/:id" matchFilters={filter} component={Search} />
            </Route>
            <Route path="/anime">
              <Route path="/:id/:name?" matchFilters={filter} component={AnimeInfo} />
              <Route path="/:id/:name?/characters" matchFilters={filter} component={AnimeCharacters} />
            </Route>
            <Route path="/manga">
              <Route path="/:id/:name?" matchFilters={filter} component={MangaInfo} />
              <Route path="/:id/:name?/characters" matchFilters={filter} component={MangaCharacters} />
            </Route>
            <Route path="/users" component={() => <div>users</div>} />
            <Route path="*404" component={() => <div>Not fould 404</div>} />
          </Router>
        </EditMediaEntriesProvider>
      </ResponsiveProvider>
    </AuthenticationProvider>
  ),
  root
);
