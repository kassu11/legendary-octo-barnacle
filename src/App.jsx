import { A } from "@solidjs/router";
import "./App.scss"
import { useAuthentication } from "./context/AuthenticationContext.jsx";

function App(props) {
  const clientId = location.hostname === "kassu11.github.io" ? 24951 : 7936;
  const loginUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`;

  const { accessToken, authUserData, logoutUser } = useAuthentication();

  return (
    <>
      <nav class="main-navigation">
        <ul>
          <li><A href="/">Home</A></li>
          <li><A href="/search/anime">Anime</A></li>
          <li><A href="/search/manga">Manga</A></li>
          <li><A href="/search">Search</A></li>
          <Show when={accessToken()} fallback={<li><a href={loginUrl}>Login with AniList</a></li>}>
            <li>
              <button onClick={() => logoutUser()}>Logout</button>
            </li>
            <Show when={authUserData()}>
              <li class="main-navigation-profile">
                <A href={"/user/" + authUserData().data.name}>
                  {authUserData().data.name}
                  <img class="main-navigation-profile-icon" src={authUserData().data.avatar.large} alt="Profile avatar" />
                </A>
              </li>
            </Show>
          </Show>
        </ul>
      </nav>
      <main id="page-content">
        {props.children}
      </main>
      <footer class="main-footer"></footer>
    </>
  )
}

export default App
