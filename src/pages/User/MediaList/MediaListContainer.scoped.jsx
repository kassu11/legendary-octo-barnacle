import { A, useParams } from "@solidjs/router";
import { useEditMediaEntries, useUser, useUserMediaList } from "@/state/providers.js";
import { createEffect, createMemo, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { mediaUrl } from "@/utils/formatUtils.js";
import { MediaCardEpisodes } from "./MediaCardEpisodes.jsx";
import Score from "@/components/media/Score.scoped.jsx";
import { QuickActionButton } from "@/components/Buttons.scoped.jsx";
import Edit from "@/assets/Edit.jsx";
import { RepeatIcon } from "@/assets/RepeatIcon.jsx";
import "./MediaListContainer.scoped.css";
import { objectUtils } from "@/utils/utils.js";
import { converStatusToListName } from "./UserMediaListIndex.scoped.jsx";

export function MediaListContainerScoped(props) {
  const [grid, setGrid] = createSignal(lastGrid);
  const params = useParams();
  const {user} = useUser();
  const {openEditor} = useEditMediaEntries();
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
    <div>
      <p>{props.timer}</p>
      <ol ref={elem => gridProbe = elem} class="user-profile-media-list-grid" style={{height: "0", margin: "0", visibility: "hidden"}} aria-hidden="true" />
      <Show when={props.listData()?.data} fallback={<CardsLoading isListVisible={props.isListVisible} grid={grid} />}>
        <For each={props.listData().data.lists}>{list => (
          <Show when={list.entries.length && props.isListVisible(list.name)}>
            <h2>{list.name}</h2>
            <VirtualGrid each={list.entries} grid={grid}>{entry => (
              <li class="card">
                <A class="clean-link" href={mediaUrl(entry.media)}>
                  <div class="container">
                    <img src={entry.media.coverImage.large} class="cover" alt="Cover."/>
                    <div class="card-header">
                      <Show when={entry.repeat}>
                        <div class="badge repeat" label={"Rewatched " + entry.repeat + " times"}>
                          {entry.repeat}
                          <RepeatIcon />
                        </div>
                      </Show>
                      <Show when={entry.notes}>
                        <div class="badge notes" label={entry.notes}>
                          <svg aria-hidden="true" focusable="false" role="img"
                               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor"
                                  d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"></path>
                          </svg>
                        </div>
                      </Show>
                    </div>
                    <div class="card-footer">
                      <Show when={entry.media.isAdult}>
                        <p class="adult-warning">18+</p>
                      </Show>
                      <p>
                        {entry.media.title.userPreferred}
                      </p>
                      <div class="scores">
                        <MediaCardEpisodes entry={entry} />
                        <Score score={entry.score} format={user().mediaListOptions.scoreFormat || "POINT_10_DECIMAL"} />
                      </div>
                    </div>
                    <Show when={isOwnProfile()}>
                      <QuickActionButton
                        big
                        label="Edit media"
                        onClick={e => {
                          e.preventDefault();
                          openEditor({...entry.media, mediaListEntry: entry}, {
                            mutateMedia: responseEntry => {
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
                              }, props.updateListInfo);
                            },
                            deleteMedia: () => {
                              props.mutateMediaListCache(res => {
                                props.listData().data.indecies[entry.media.id].forEach(([listIndex, entryIndex]) => {
                                  res.data.data.MediaListCollection.lists[listIndex].entries.splice(entryIndex, 1);
                                });
                                return res;
                              }, props.updateListInfo);
                            }
                          });
                        }}>
                        <Edit/>
                      </QuickActionButton>
                    </Show>
                  </div>
                </A>
              </li>
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
    <ol ref={elem => ref = elem} class="user-profile-media-list-grid" style={{
      "padding-top": `${firstRow() * props.grid().rowHeight}px`,
      "padding-bottom": `${(rowCount() - lastRow()) * props.grid().rowHeight}px`,
    }}>
      <For each={visibleEntries()}>{props.children}</For>
    </ol>
  );
}

const localListCounts = {};
function CardsLoading(props) {
  const params = useParams();
  const lists = createMemo(() => localListCounts[params.name] ?? []);

  return (
    <For each={lists()}>{list => (
      <Show when={list.entries.length && props.isListVisible(list.name)}>
        <h2>{list.name}</h2>
        <VirtualGrid each={list.entries} grid={props.grid}>{() => (
          <li class="card"></li>
        )}</VirtualGrid>
      </Show>
    )}</For>
  );
}
