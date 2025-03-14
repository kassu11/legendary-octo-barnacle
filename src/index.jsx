import { render } from "solid-js/web"
import { Router, Route } from "@solidjs/router";
import "./index.css"
import App from "./App.jsx"
import AnimeInfo from "./AnimeInfo.jsx"
import Home from "./Home.jsx"
import Authentication from "./Authentication.jsx";
import { AuthenticationProvider } from "./AuthenticationContext.jsx";
import Anime from "./Anime.jsx";
import Manga from "./Manga.jsx";
import MangaInfo from "./MangaInfo.jsx";
import Search from "./Search.jsx";
import Character from "./Character.jsx";

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
