import { A, useLocation } from "@solidjs/router";
import { createMemo, createResource, createSignal, For, Show } from "solid-js";
import "./MainFooter.scoped.css";
import { GitBranchIcon } from "@/assets/icons.jsx";
import { CreatedAt } from "@/components/CreatedAt.jsx";
import { settingsShowDevBranch } from "@/state/globalState";

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
          <BuildInfo />
        </div>
      </div>
    </footer>
  );
}

function ExternalLink(props) {
  return <a href={props.href} target="_blank" rel="noreferrer">{props.children}</a>;
}

function BuildInfo() {
  // Comes from the running build instead of branches.json, which only knows the latest deployment
  const name = __DEPLOYMENT__?.name ?? __BRANCH__;

  return (
    <div class="build">
      <Show when={__DEPLOYMENT__}>
        <DeploymentDetails branch={__DEPLOYMENT__} />
      </Show>
      <Show when={settingsShowDevBranch()} fallback={<span>{name}</span>}>
        <DevBranchSwitcher name={name} />
      </Show>
    </div>
  );
}

function DeploymentDetails(props) {
  return (
    <span class="deployment-details">
      <span class="hash" title={props.branch.commit}>
        {props.branch.commit.slice(0, 7)}{props.branch.dirty ? "-dirty" : ""}
      </span>
      <CreatedAt createdAt={Date.parse(props.branch.updatedAt) / 1000} />
    </span>
  );
}

function DevBranchSwitcher(props) {
  const [open, setOpen] = createSignal(false);
  const random = createMemo(prev => (prev || new Date().getTime()) + open()); // Make sure the list is always fresh

  return (
    <div class="dev-branch-switcher" classList={{ open: open() }}>
      <ContextMenu fileHash={random()} />
      <button onClick={() => setOpen(s => !s)}>
        <GitBranchIcon scoped /> {props.name}
      </button>
    </div>
  );
}

function ContextMenu(props) {
  const [branches] = createResource(() => props.fileHash, async (hash) => {
    const res = await fetch(__BASE__ + "/branches.json?" + hash);
    const text = await res.text();
    // In coding enviroment we don't have branches.json file, so the fetch returns HTML
    // This is just quick check if the returned file is json or not
    if (text?.startsWith("[")) return JSON.parse(text);
    else return [];
  });

  const location = useLocation();
  const search = createMemo(() => location.search.length < 2 ? "?" : location.search + "&");
  const handleClick = e => window.location.href = e.currentTarget.href;

  return (
    <div class="context-menu">
      <For each={branches()} fallback="No dev branches available">{branch => (
        <a href={location.pathname + search() + "dev-branch=" + branch.path} onClick={handleClick}>
          <GitBranchIcon scoped />
          <span class="branch">
            <span>{branch.name}</span>
            <DeploymentDetails branch={branch} />
          </span>
        </a>
      )}</For>
    </div>
  )
}
