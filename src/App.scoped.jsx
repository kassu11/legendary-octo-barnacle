import "./App.scoped.css"
import { InstallPWAInfoPanel } from "./components/InstallPWAInfoPanel.scoped.jsx";
import { createEffect, Show } from "solid-js";
import { localizations } from "./collections/collections";
import { MainNavigation } from "./pages/App/MainNavigation.scoped.jsx";
import { MainFooter } from "./pages/App/MainFooter.scoped.jsx";
import { MainLoadingBar } from "./pages/App/MainLoadingBar.scoped";
import { ApplicationNotifications } from "./pages/App/ApplicationNotifications.scoped";
import { ParseSearchParams } from "./pages/App/ParseSearchParams";
import { settingsShowDevBranch } from "./core/globalState";
import { createCleanUpAbortController } from "./utils/abortUtils";

const portIsOpen = port => fetch("http://localhost:" + port, { signal: AbortSignal.timeout(100) }).then(() => true).catch(() => false);

function App(props) {
  const controller = createCleanUpAbortController();

  createEffect(() => {
    controller.abortAndRenew();
    window.addEventListener("keydown", debugKeymaps, { signal: controller.signal });
  });

  return (
    <ParseSearchParams>
      <MainLoadingBar />
      <MainNavigation />
      <ApplicationNotifications />
      <InstallPWAInfoPanel />
      {/* Don't store this element to global variable, because hot reloading will randomly remove this */}
      <div id="hovers"></div>
      <PreviewNotice />
      <main id="page-content">
        {props.children}
      </main>
      <MainFooter />
    </ParseSearchParams>
  )
}

async function debugKeymaps(e) {
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
}

function PreviewNotice() {
  return (
    <Show when={!settingsShowDevBranch() && localStorage.getItem(localizations.LOB_DEV_BRANCH)}>{branch => (
      <div class="dev-branch">
        <p>Preview: {branch()}</p>
        <button onClick={() => {
          localStorage.removeItem(localizations.LOB_DEV_BRANCH);
          location.reload();
        }}>Back to Production</button>
      </div>
    )}</Show>
  );
}

export default App
