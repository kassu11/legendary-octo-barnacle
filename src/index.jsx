import { render } from "solid-js/web"
import { Router, Route } from "@solidjs/router";
import "./index.css"
import App from "./App.jsx"
import Anime from "./Anime.jsx"
import Home from "./Home.jsx"

const root = document.getElementById("root")

render(
  () => (
    <Router root={App} base="/MyAniList">
      <Route path="/" component={Home} />
      <Route path="/search" component={() => <div>Search</div>} />
      <Route path="/anime">
        <Route path="/:id/:name?" component={Anime} />
      </Route>
      <Route path="/manga">
        <Route path="/:id/:name?" component={() => <div>Search</div>} />
      </Route>
      <Route path="/users" component={() => <div>users</div>} />
    </Router>
  ),
  root
);
