import { render } from 'solid-js/web'
import { Router, Route } from "@solidjs/router";
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')

render(
  () => (
    <Router root={App} base='/MyAniList'>
      <Route path="/" component={() => <div>Home</div>} />
      <Route path="/search" component={() => <div>Search</div>} />
      <Route path="/users" component={() => <div>users</div>} />
    </Router>
  ),
  root
);
