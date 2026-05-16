import "./App.scoped.css"
import { InstallPWAInfoPanel } from "./components/InstallPWAInfoPanel.jsx";
import { createEffect } from "solid-js";
import { Show } from "solid-js";
import { localizations } from "./collections/collections";
import { MainNavigation } from "./pages/App/MainNavigation.scoped.jsx";
import { MainLoadingBar } from "./pages/App/MainLoadingBar.scoped";
import { ApplicationNotifications } from "./pages/App/ApplicationNotifications.scoped";

const portIsOpen = port => fetch("http://localhost:" + port, { signal: AbortSignal.timeout(100) }).then(() => true).catch(() => false);


function App(props) {
  let controller = new AbortController();

  createEffect(() => {
    controller.abort()
    controller = new AbortController();

    window.addEventListener("keydown", async e => {
      if (e.target !== document.body || e.shiftKey || e.ctrlKey) {
        return;
      }

      const { port, hostname, href, origin } = location;
      if (e.key === "d" && e.altKey) {
        e.preventDefault();

        if (hostname === "localhost") {
          // Open alternative debug port (used to sign in on alternative user or check behavior between big refactors)
          if (port != __DEBUG_PORT__ && await portIsOpen(__DEBUG_PORT__)) window.open(href.replace(origin, "http://localhost:" + __DEBUG_PORT__));
          else window.open(href.replace(origin, "https://kassu11.github.io"));
        } else window.open(href.replace(origin, "http://localhost:" + __PORT__));
      }
    }, { signal: controller.signal });
  });

  return (
    <>
      <MainLoadingBar />
      <MainNavigation />
      <ApplicationNotifications />
      <Show when={localStorage.getItem(localizations.LOB_DEV_BRANCH)}>{branch => (
        <div class="dev-branch">
          <p>Preview: {branch}</p>
          <button onClick={() => {
            localStorage.removeItem(localizations.LOB_DEV_BRANCH);
            location.reload();
          }}>Back to Production</button>
        </div>
      )}</Show>
      <InstallPWAInfoPanel />
      <main id="page-content">
        {props.children}
      </main>
      <footer class="main-footer"></footer>
    </>
  )
}

export default App
