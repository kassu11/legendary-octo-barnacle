import { useParams } from "@solidjs/router";
import { useUser, useUserMediaList } from "@/state/providers.js";
import { createEffect, createMemo, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import "./MediaListContainer.scoped.css";
import { objectUtils } from "@/utils/utils.js";
import { converStatusToListName } from "./UserMediaListIndex.scoped.jsx";
import { MediaCard } from "@/components/media/MediaCard.scoped.jsx";
import { listTitle } from "./SearchControls.scoped.jsx";

export function MediaListContainerScoped(props) {
  const [grid, setGrid] = createSignal(lastGrid);
  const params = useParams();
  const {user} = useUser();
  const {isOwnProfile} = useUserMediaList();

  let gridProbe;
  onMount(() => {
    const observer = new ResizeObserver(() => {
      const style = getComputedStyle(gridProbe);
      const tracks = style.gridTemplateColumns.split(" ");
      lastGrid = {columns: tracks.length, rowHeight: parseFloat(tracks[0]) * 8 / 5.5 + parseFloat(style.rowGap)};
      setGrid(lastGrid);
    });
    observer.observe(gridProbe);
    onCleanup(() => observer.disconnect());
  });

  // Moves the edited entry to the lists matching its new status and custom lists
  // Without refreshing, the visible lists stay the same until the next refresh
  function mutateEntry(entry, responseEntry, refreshList = true) {
    responseEntry = objectUtils.mergeObjects(entry, responseEntry);
    props.mutateMediaListCache(res => {
      function pushEntryToList(name, isCustomList) {
        const listIndex = res.data.data.MediaListCollection.lists.findIndex(list => list.name === name && list.isCustomList === isCustomList);
        if (listIndex === -1) {
          res.data.data.MediaListCollection.lists.push({
            name,
            isCustomList: false,
            isCompletedList: false,
            entries: []
          });
        }

        const list = res.data.data.MediaListCollection.lists.at(listIndex);
        list.entries.push(responseEntry);
        props.listData().data.indecies[entry.media.id].push([listIndex === -1 ? res.data.data.MediaListCollection.lists.length - 1 : listIndex, list.entries.length - 1]);
      }

      props.listData().data.indecies[entry.media.id].forEach(([listIndex, entryIndex]) => {
        res.data.data.MediaListCollection.lists[listIndex].entries.splice(entryIndex, 1);
      });
      props.listData().data.indecies[entry.media.id] = [];

      if (!responseEntry.hiddenFromStatusLists) {
        const name = converStatusToListName(responseEntry.status, params.type);
        pushEntryToList(name, false);
      }

      for (const [listName, enabled] of Object.entries(responseEntry.customLists ?? {})) {
        if (enabled) {
          pushEntryToList(listName, true);
        }
      }
      return res;
    }, refreshList ? props.updateListInfo : undefined);
  }

  function deleteEntry(entry) {
    props.mutateMediaListCache(res => {
      props.listData().data.indecies[entry.media.id].forEach(([listIndex, entryIndex]) => {
        res.data.data.MediaListCollection.lists[listIndex].entries.splice(entryIndex, 1);
      });
      return res;
    }, props.updateListInfo);
  }

  // Keep track of the entries sizes
  // This is used to keep the scroll position same when navigating back
  createEffect(() => {
    if (!props.listData()?.data) return;
    localListCounts[params.name] = props.listData()?.data.lists.map(list => ({
      name: list.name,
      entries: new Int8Array(list.entries.length),
    }));
  });

  return (
    <div class="list-content">
      <p>{props.timer}</p>
      <div ref={elem => gridProbe = elem} class="user-profile-media-list-grid" style={{height: "0", margin: "0", visibility: "hidden"}} aria-hidden="true" />
      <Show when={props.listData()?.data} fallback={<CardsLoading isListVisible={props.isListVisible} grid={grid} />}>
        <For each={props.listData().data.lists}>{list => (
          <Show when={list.entries.length && props.isListVisible(list.name)}>
            <h2>{listTitle(list.name)}</h2>
            <VirtualGrid each={list.entries} grid={grid}>{entry => (
              <MediaCard scoped class="card" showScore hoverCard showAdult showRepeats showNotes showFooter scoreFormat={user().mediaListOptions.scoreFormat} progressIncrement={isOwnProfile()} quickActions={isOwnProfile()} media={entry.media} mediaListEntry={entry} afterMutation={responseEntry => mutateEntry(entry, responseEntry)} afterProgressMutation={responseEntry => mutateEntry(entry, responseEntry, false)} afterDelete={() => deleteEntry(entry)} />
            )}</VirtualGrid>
          </Show>
        )}</For>
      </Show>
    </div>
  );
}

// Last measured grid size. Like localListCounts, this gives the lists their full height on the first render
let lastGrid = {columns: 1, rowHeight: 0};
const OVERSCAN_PX = 500;

// Only renders the rows near the viewport, the height of the other rows is filled with padding
function VirtualGrid(props) {
  let ref;
  const [viewport, setViewport] = createSignal({ top: 0, bottom: 0 });
  const rowCount = () => Math.ceil(props.each.length / props.grid().columns);
  const rowAt = y => Math.max(y / (props.grid().rowHeight || Infinity), 0);
  // At least one row is always rendered, so that the last row gap doesn't change the list height
  const firstRow = createMemo(() => Math.min(Math.floor(rowAt(viewport().top)), rowCount() - 1));
  const lastRow = createMemo(() => Math.max(Math.min(Math.ceil(rowAt(viewport().bottom)), rowCount()), firstRow() + 1));
  const visibleEntries = createMemo(() => props.each.slice(firstRow() * props.grid().columns, lastRow() * props.grid().columns));

  const updateViewport = () => {
    const { top } = ref.getBoundingClientRect();
    setViewport({ top: -top - OVERSCAN_PX, bottom: window.innerHeight - top + OVERSCAN_PX });
  };

  onMount(() => {
    // The body size changes also when something above the list changes its height
    const observer = new ResizeObserver(updateViewport);
    observer.observe(document.body);
    window.addEventListener("scroll", updateViewport, { passive: true });
    window.addEventListener("resize", updateViewport);
    onCleanup(() => {
      observer.disconnect();
      window.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
    });
  });

  return (
    <div ref={elem => ref = elem} class="user-profile-media-list-grid" style={{
      "padding-top": `${firstRow() * props.grid().rowHeight}px`,
      "padding-bottom": `${(rowCount() - lastRow()) * props.grid().rowHeight}px`,
    }}>
      <For each={visibleEntries()}>{props.children}</For>
    </div>
  );
}

const localListCounts = {};
function CardsLoading(props) {
  const params = useParams();
  const lists = createMemo(() => localListCounts[params.name] ?? []);

  return (
    <For each={lists()}>{list => (
      <Show when={list.entries.length && props.isListVisible(list.name)}>
        <h2>{listTitle(list.name)}</h2>
        <VirtualGrid each={list.entries} grid={props.grid}>{() => (
          <MediaCard scoped class="card" />
        )}</VirtualGrid>
      </Show>
    )}</For>
  );
}
