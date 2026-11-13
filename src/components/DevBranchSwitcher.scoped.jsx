import { useLocation } from "@solidjs/router";
import { createMemo, createResource, createSignal, For, onCleanup } from "solid-js";
import "./DevBranchSwitcher.scoped.css";
import { GitBranchIcon } from "@/assets/icons.jsx";
import { DeploymentDetails } from "@/components/DeploymentDetails.scoped.jsx";

export function DevBranchSwitcher(props) {
  const [open, setOpen] = createSignal(false);
  const random = createMemo(prev => (prev || new Date().getTime()) + open()); // Make sure the list is always fresh
  let ref;

  const closeOnOutsideClick = e => open() && !ref.contains(e.target) && setOpen(false);
  const closeOnEscape = e => e.key === "Escape" && setOpen(false);
  window.addEventListener("pointerdown", closeOnOutsideClick);
  window.addEventListener("keydown", closeOnEscape);
  onCleanup(() => {
    window.removeEventListener("pointerdown", closeOnOutsideClick);
    window.removeEventListener("keydown", closeOnEscape);
  });

  return (
    <div ref={elem => ref = elem} class="dev-branch-switcher" classList={{ open: open() }}>
      <ContextMenu fileHash={random()} current={props.name} />
      <button onClick={() => setOpen(s => !s)} aria-expanded={open()}>
        <GitBranchIcon scoped />
        <span class="name">{props.name}</span>
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
      <For each={branches()} fallback={<span class="empty">No dev branches available</span>}>{branch => (
        <a
          href={location.pathname + search() + "dev-branch=" + branch.path}
          onClick={handleClick}
          aria-current={branch.name === props.current ? "true" : undefined}
        >
          <GitBranchIcon scoped />
          <span class="branch">
            <span class="name">{branch.name}</span>
            <DeploymentDetails branch={branch} />
          </span>
        </a>
      )}</For>
    </div>
  )
}
