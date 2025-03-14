import { createEffect, createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from "./utils/api.js";
import { redirect } from '@solidjs/router';
import { A } from "./components/CustomA.jsx";
import { useAuthentication } from './context/AuthenticationContext.jsx';

function App(props) {
  const clientId = location.hostname === "kassu11.github.io" ? 24951 : 7936;
  const loginUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`;

  const { accessToken, authUserData, logoutUser } = useAuthentication();

  return (
    <>
      <nav>
        <ul>
          <li><A href="/">Home</A></li>
          <li><A href="/search/anime">Anime</A></li>
          <li><A href="/search/manga">Manga</A></li>
          <li><A href="/search">Search</A></li>
          <Show when={accessToken()} fallback={<li><a href={loginUrl}>Login with AniList</a></li>}>
            <li><button onClick={() => {
              logoutUser();
            }}>Logout</button></li>
            <Show when={authUserData()}>
              <li>{authUserData().data.data.Viewer.name}</li>
              <img src={authUserData().data.data.Viewer.avatar.large} alt="Profile avatar" />
            </Show>
          </Show>
        </ul>
      </nav>
      {props.children}
    </>
  )
}

export default App
