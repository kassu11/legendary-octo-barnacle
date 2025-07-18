import { A } from "@solidjs/router";
import "./App.scss"
import { useAuthentication } from "./context/providers.js";
import { InstallPWAInfoPanel } from "./components/InstallPWAInfoPanel.jsx";

function App(props) {
  const clientId = location.hostname === "kassu11.github.io" ? 24951 : 7936;
  const loginUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`;

  const { accessToken, authUserData, logoutUser } = useAuthentication();

  return (
    <>
      <nav class="main-navigation">
        <ul>
          <li><A href="/">Home</A></li>
          <li><A href="/browse/anime">Anime</A></li>
          <li><A href="/browse/manga">Manga</A></li>
          <li><A href="/browse/media">Search</A></li>
          <Show when={accessToken()} fallback={<li><a href={loginUrl}>Login with AniList</a></li>}>
            <li>
              <button onClick={() => logoutUser()}>Logout</button>
            </li>
            <Show when={authUserData()}>
              <li><A href="/notifications">Notifications ({authUserData().data.unreadNotificationCount})</A></li>
              <li class="main-navigation-profile">
                <A href={"/user/" + authUserData().data.name}>
                  {authUserData().data.name}
                  <img class="main-navigation-profile-image" src={authUserData().data.avatar.large} alt="Profile avatar" />
                </A>
              </li>
            </Show>
          </Show>
        </ul>
      </nav>
      <InstallPWAInfoPanel />
      <main id="page-content">
        {props.children}
      </main>
      <footer class="main-footer"></footer>
    </>
  )
}

export default App
