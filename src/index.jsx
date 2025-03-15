import { render } from "solid-js/web"
import { Router, Route } from "@solidjs/router";
import "./index.scss"
import App from "./App.jsx"
import AnimeInfo from "./pages/AnimeInfo.jsx"
import Home from "./pages/Home.jsx"
import Authentication from "./pages/Authentication.jsx";
import { AuthenticationProvider } from "./context/AuthenticationContext.jsx";
import Anime from "./pages/Anime.jsx";
import Manga from "./pages/Manga.jsx";
import MangaInfo from "./pages/MangaInfo.jsx";
import Search from "./pages/Search.jsx";
import Character from "./pages/Character.jsx";

const root = document.getElementById("root")

render(
  () => (
    <AuthenticationProvider>
      <Router root={App} base="/MyAniList">
        <Route path="/" component={Home} />
        <Route path="/authentication" component={Authentication} />
        <Route path="/search">
          <Route path="/" component={Search} />
          <Route path="/anime" component={Anime} />
          <Route path="/manga" component={Manga} />
        </Route>
        <Route path="/ani">
          <Route path="/character/:id" component={Character} />
          <Route path="/staff/:id" component={Search} />
        </Route>
        <Route path="/anime">
          <Route path="/:id/:name?" component={AnimeInfo} />
        </Route>
        <Route path="/manga">
          <Route path="/:id/:name?" component={MangaInfo} />
        </Route>
        <Route path="/users" component={() => <div>users</div>} />
      </Router>
    </AuthenticationProvider>
  ),
  root
);
