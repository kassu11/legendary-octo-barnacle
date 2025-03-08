import { createEffect, createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from "./api.js";
import { A } from '@solidjs/router';

function App(props) {
  const clientId = location.hostname === "kassu11.github.io" ? 24951 : 7936;
  const loginUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`;

  return (
    <>
      <nav>
        <ul>
          <li><A href="/">Home</A></li>
          <li><A href="/anime">Anime</A></li>
          <li><A href="/manga">Manga</A></li>
          <li><A href="/search">Search</A></li>
          <li><a href={loginUrl}>Login with AniList</a></li>
        </ul>
      </nav>
      {props.children}
    </>
  )
}


export const optionHandler = (query, variables = {}) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query,
    variables,
  }),
});

export default App
