import "./App.scoped.css"
import { InstallPWAInfoPanel } from "./components/InstallPWAInfoPanel.jsx";
import { createSignal, createEffect, createMemo, createResource, For, Match, Switch } from "solid-js";
import { localizations } from "./collections/collections";
import { MainNavigation } from "./pages/App/MainNavigation.scoped.jsx";
import { MainLoadingBar } from "./pages/App/MainLoadingBar.scoped";
import { ApplicationNotifications } from "./pages/App/ApplicationNotifications.scoped";
import { ParseSearchParams } from "./pages/App/ParseSearchParams";
import { settingsShowDevBranch } from "./core/globalState";
import BranchIcon from "./assets/BranchIcon";
import { useLocation } from "@solidjs/router";

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
    <ParseSearchParams>
      <MainLoadingBar />
      <MainNavigation />
      <ApplicationNotifications />
      <InstallPWAInfoPanel />
      {/* Don't store this element to global variable, because hot reloading will randomly remove this */}
      <div id="hovers"></div>
      <DevBranches />
      <main id="page-content">
        {props.children}
      </main>
      <footer class="main-footer"></footer>
    </ParseSearchParams>
  )
}

function DevBranches() {
  const [open, setOpen] = createSignal(false);
  return (
    <Switch>
      <Match when={settingsShowDevBranch()}>
        <div class="dev-branch2" classList={{ open: open() }}>
          <ContextMenu />
          <button onClick={() => setOpen(s => !s)}>
            <BranchIcon /> {localStorage.getItem(localizations.LOB_DEV_BRANCH) || "main"}
          </button>
        </div>
      </Match>
      <Match when={localStorage.getItem(localizations.LOB_DEV_BRANCH)}>{branch => (
        <div class="dev-branch">
          <p>Preview: {branch}</p>
          <button onClick={() => {
            localStorage.removeItem(localizations.LOB_DEV_BRANCH);
            location.reload();
          }}>Back to Production</button>
        </div>
      )}</Match>
    </Switch>
  );
}

function ContextMenu() {
  const [branches] = createResource(async () => {
    const res = await fetch("/legendary-octo-barnacle/branches.json");
    const text = await res.text();
    // In coding enviroment we don't have branches.json file, so the fetch returns HTML
    // This is just quick check if the returned file is json or not
    if (text?.startsWith("[")) return JSON.parse(text);
    else return [];
  });

  const location = useLocation();
  const search = createMemo(() => location.search.length < 2 ? "?" : location.search + "&");
  const handleClick = e => window.location.href = e.target.href;

  return (
    <div class="context-menu">
      <For each={branches()} fallback="No dev branches available">{branch => (
        <a href={location.pathname + search() + "dev-branch=" + branch} onClick={handleClick}>
          <BranchIcon />
          {branch}
        </a>
      )}</For>
    </div>
  )
}

export default App
