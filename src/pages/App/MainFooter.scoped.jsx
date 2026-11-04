import { A, useLocation } from "@solidjs/router";
import { createMemo, createResource, createSignal, For, Show } from "solid-js";
import "./MainFooter.scoped.css";
import BranchIcon from "../../assets/BranchIcon";
import { localizations } from "../../collections/collections";
import { settingsShowDevBranch } from "../../core/globalState";

const repositoryUrl = "https://github.com/kassu11/legendary-octo-barnacle";

export function MainFooter() {
  return (
    <footer class="main-footer">
      <div class="content">
        <div class="about">
          <p class="name">Legendary Octo Barnacle</p>
          <p>AniList and MyAnimeList combined into one simple site.</p>
        </div>
        <div class="links">
          <p class="title">Explore</p>
          <ul>
            <li><A scoped href="/ani/browse/anime">Anime</A></li>
            <li><A scoped href="/ani/browse/manga">Manga</A></li>
            <li><A scoped href="/ani/browse/media">Search</A></li>
            <li><A scoped href="/settings">Settings</A></li>
          </ul>
        </div>
        <div class="links">
          <p class="title">GitHub</p>
          <ul>
            <li><ExternalLink href={repositoryUrl}>Source code</ExternalLink></li>
            <li><ExternalLink href={repositoryUrl + "/issues"}>Issues</ExternalLink></li>
            <li><ExternalLink href={repositoryUrl + "/issues/new"}>Report a bug</ExternalLink></li>
          </ul>
        </div>
        <div class="links">
          <p class="title">Data from</p>
          <ul>
            <li><ExternalLink href="https://anilist.co">AniList</ExternalLink></li>
            <li><ExternalLink href="https://myanimelist.net">MyAnimeList</ExternalLink></li>
            <li><ExternalLink href="https://api.tenrai.org">Tenrai</ExternalLink></li>
            <li><ExternalLink href="https://jikan.moe">Jikan</ExternalLink></li>
            <li><ExternalLink href="https://animethemes.moe">AnimeThemes</ExternalLink></li>
          </ul>
        </div>
        <div class="legal">
          <p>
            © {new Date().getFullYear()} <ExternalLink href="https://github.com/kassu11">kassu11</ExternalLink>.
            {" "}Not affiliated with AniList or MyAnimeList. All media data and images belong to their respective owners.
          </p>
          <div class="build">
            <span>{__VERSION__}</span>
            <DevBranchSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}

function ExternalLink(props) {
  return <a href={props.href} target="_blank" rel="noreferrer">{props.children}</a>;
}

function DevBranchSwitcher() {
  const [open, setOpen] = createSignal(false);
  return (
    <Show when={settingsShowDevBranch()}>
      <div class="dev-branch-switcher" classList={{ open: open() }}>
        <ContextMenu />
        <button onClick={() => setOpen(s => !s)}>
          <BranchIcon /> {localStorage.getItem(localizations.LOB_DEV_BRANCH) || "main"}
        </button>
      </div>
    </Show>
  );
}

function ContextMenu() {
  const [branches] = createResource(async () => {
    const res = await fetch(__BASE__ + "/branches.json");
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
