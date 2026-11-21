import { useParams } from "@solidjs/router";
import { useUser, useUserMediaList } from "@/state/providers.js";
import { createEffect, createMemo, For, onCleanup, Show } from "solid-js";
import "./MediaListContainer.scoped.css";
import { objectUtils } from "@/utils/utils.js";
import { converStatusToListName } from "./UserMediaListIndex.scoped.jsx";
import { MediaCard } from "@/components/media/MediaCard.scoped.jsx";
import { listTitle } from "./SearchControls.scoped.jsx";
import { COMBINED_LIST } from "@/constants/mediaLists.js";
import { VirtualGrid } from "@/components/VirtualGrid.scoped.jsx";
import { VirtualList } from "@/components/VirtualList.scoped.jsx";
import { MediaRowCard } from "@/components/media/MediaRowCard.scoped.jsx";
import { CardStyleToggle } from "@/components/search/CardStyleToggle.scoped.jsx";
import { setUserMediaListCardStyle, userMediaListCardStyle } from "@/state/globalState.js";

export function MediaListContainerScoped(props) {
  const params = useParams();
  const {user} = useUser();
  const {isOwnProfile} = useUserMediaList();

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

  const entryWithShownScore = entry => {
    const score = props.shownScores.get(entry.media.id);
    return score === undefined ? entry : { ...entry, score };
  };

  const firstVisibleList = createMemo(() => props.listData()?.data?.lists.find(list => list.entries.length && props.isListVisible(list.name)));

  // Edit mode selection: click selects only the card, ctrl click, tap or enter adds or removes it, shift click adds every card from the previous click
  // Dragging selects every card between the start and the pointer in place of the selection. Ctrl drag adds them to the selection instead,
  // or removes them when the drag starts from a selected card
  let anchor, drag, lastPointerType;

  const cardPosition = element => {
    const card = element?.closest("[data-entry-index]");
    if (!card) return;
    const listIndex = Number(card.dataset.listIndex);
    const entryIndex = Number(card.dataset.entryIndex);
    const id = props.listData()?.data?.lists[listIndex]?.entries[entryIndex]?.media.id;
    if (id === undefined) return;
    return { listIndex, entryIndex, id };
  };

  const samePosition = (a, b) => a.listIndex === b.listIndex && a.entryIndex === b.entryIndex;
  const isBefore = (a, b) => a.listIndex < b.listIndex || (a.listIndex === b.listIndex && a.entryIndex <= b.entryIndex);

  // Ranges continue from one visible list to the next, in the order the lists are shown
  const idsBetween = (from, to) => {
    const [start, end] = isBefore(from, to) ? [from, to] : [to, from];
    const lists = props.listData().data.lists;
    const ids = [];
    for (let listIndex = start.listIndex; listIndex <= end.listIndex; listIndex++) {
      const list = lists[listIndex];
      if (!list?.entries.length || !props.isListVisible(list.name)) continue;
      const first = listIndex === start.listIndex ? start.entryIndex : 0;
      const last = listIndex === end.listIndex ? Math.min(end.entryIndex, list.entries.length - 1) : list.entries.length - 1;
      for (let entryIndex = first; entryIndex <= last; entryIndex++) ids.push(list.entries[entryIndex].media.id);
    }
    return ids;
  };

  // The list data is replaced when the filters change, so the anchor only counts while it still points to the same entry
  const validAnchor = () => anchor && props.listData()?.data?.lists[anchor.listIndex]?.entries[anchor.entryIndex]?.media.id === anchor.id ? anchor : undefined;

  const toggleSelection = position => {
    const ids = new Set(props.selectedIds);
    if (ids.has(position.id)) ids.delete(position.id);
    else ids.add(position.id);
    props.setSelectedIds(ids);
  };

  const clickSelection = (e, position) => {
    const from = validAnchor();
    if (e.shiftKey && from) props.setSelectedIds(new Set([...props.selectedIds, ...idsBetween(from, position)]));
    else if (isAdditive(e)) toggleSelection(position);
    else props.setSelectedIds(new Set([position.id]));
    anchor = position;
  };

  const paintDrag = position => {
    drag.last = position;
    const ids = new Set(drag.initialIds);
    for (const id of idsBetween(drag.start, position)) {
      if (drag.removing) ids.delete(id);
      else ids.add(id);
    }
    props.setSelectedIds(ids);
  };

  // Polls every frame instead of following pointer moves, so the selection keeps up while the page scrolls under a still pointer
  const dragTick = () => {
    if (!props.editMode) return stopDrag();
    if (drag.moved) {
      if (drag.y < DRAG_SCROLL_ZONE) window.scrollBy(0, -DRAG_SCROLL_SPEED);
      else if (drag.y > window.innerHeight - DRAG_SCROLL_ZONE) window.scrollBy(0, DRAG_SCROLL_SPEED);

      const position = cardPosition(document.elementFromPoint(drag.x, drag.y));
      if (position && !samePosition(position, drag.last)) paintDrag(position);
    }
    drag.frame = requestAnimationFrame(dragTick);
  };

  const handleDragMove = e => {
    drag.moved ||= Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) >= DRAG_START_DISTANCE;
    drag.x = e.clientX;
    drag.y = e.clientY;
  };

  const handleDragEnd = e => {
    if (drag.moved) anchor = drag.last;
    else clickSelection(e, drag.start);
    stopDrag();
    props.onMouseSelect();
  };

  function stopDrag() {
    if (!drag) return;
    cancelAnimationFrame(drag.frame);
    drag.controller.abort();
    drag = undefined;
  }

  onCleanup(stopDrag);

  const handlePointerDown = e => {
    lastPointerType = e.pointerType;
    if (!props.editMode || e.pointerType !== "mouse" || e.button !== 0) return;
    const position = cardPosition(e.target);
    if (!position) return;
    // Prevents text selection, which also keeps the focus. Blurring commits a score typed for the previous selection
    e.preventDefault();
    document.activeElement?.blur();
    stopDrag();
    const controller = new AbortController();
    drag = {
      start: position,
      last: position,
      startX: e.clientX,
      startY: e.clientY,
      x: e.clientX,
      y: e.clientY,
      moved: false,
      initialIds: isAdditive(e) ? props.selectedIds : new Set(),
      removing: isAdditive(e) && props.selectedIds.has(position.id),
      controller,
    };
    window.addEventListener("pointermove", handleDragMove, { signal: controller.signal });
    window.addEventListener("pointerup", handleDragEnd, { signal: controller.signal });
    window.addEventListener("pointercancel", stopDrag, { signal: controller.signal });
    drag.frame = requestAnimationFrame(dragTick);
  };

  const handleClick = e => {
    if (!props.editMode) return;
    const position = cardPosition(e.target);
    if (!position) return;
    e.preventDefault();
    // Mouse selection is handled by the pointer events. Keyboard clicks have an empty pointer type
    if ((e.pointerType ?? lastPointerType) === "mouse") return;
    toggleSelection(position);
    anchor = position;
  };

  return (
    <div class="list-content" onPointerDown={handlePointerDown} onClick={handleClick}>
      <Show when={props.listData()?.data} fallback={<CardsLoading isListVisible={props.isListVisible} />}>
        <For each={props.listData().data.lists}>{(list, listIndex) => (
          <Show when={list.entries.length && props.isListVisible(list.name)}>
            <section>
              <div class="list-header">
                <h2>{listTitle(list.name)}</h2>
                <Show when={list === firstVisibleList()}>
                  <CardStyleToggle cardStyle={userMediaListCardStyle()} setCardStyle={setUserMediaListCardStyle} />
                </Show>
              </div>
              <Show when={userMediaListCardStyle() === "rows"} fallback={
                <VirtualGrid each={list.entries}>{(entry, index) => (
                  <MediaCard selectable={props.editMode} selected={props.editMode && props.selectedIds.has(entry.media.id)} data-list-index={listIndex()} data-entry-index={index()} showScore showStatus={list.name === COMBINED_LIST} hoverCard showDates showAdult showRepeats showNotes showHaltedStatus showFooter showAdvancedScores scoreFormat={user().mediaListOptions.scoreFormat} progressIncrement={isOwnProfile()} quickActions otherUsersEntry={!isOwnProfile()} media={entry.media} mediaListEntry={entryWithShownScore(entry)} afterMutation={responseEntry => mutateEntry(entry, responseEntry)} afterProgressMutation={responseEntry => mutateEntry(entry, responseEntry, false)} afterDelete={() => deleteEntry(entry)} />
                )}</VirtualGrid>
              }>
                <VirtualList cacheKey={`${params.name}-${params.type}-${list.name}`} each={list.entries}>{(entry, index) => (
                  <MediaRowCard selectable={props.editMode} selected={props.editMode && props.selectedIds.has(entry.media.id)} data-list-index={listIndex()} data-entry-index={index()} type={params.type} showStatus={list.name === COMBINED_LIST} showDates showProgress showUserScore scoreFormat={user().mediaListOptions.scoreFormat} otherUsersEntry={!isOwnProfile()} media={entry.media} mediaListEntry={entryWithShownScore(entry)} afterMutation={responseEntry => mutateEntry(entry, responseEntry)} afterDelete={() => deleteEntry(entry)} />
                )}</VirtualList>
              </Show>
            </section>
          </Show>
        )}</For>
      </Show>
    </div>
  );
}

const DRAG_START_DISTANCE = 5;
// Dragging this close to the top or bottom of the screen scrolls the page
const DRAG_SCROLL_ZONE = 80;
const DRAG_SCROLL_SPEED = 16;
// Cmd is the same key on macOS, where Ctrl click opens the context menu
const isAdditive = e => e.ctrlKey || e.metaKey;

const localListCounts = {};
function CardsLoading(props) {
  const params = useParams();
  const lists = createMemo(() => localListCounts[params.name] ?? []);
  const firstVisibleList = createMemo(() => lists().find(list => list.entries.length && props.isListVisible(list.name)));

  return (
    <For each={lists()}>{list => (
      <Show when={list.entries.length && props.isListVisible(list.name)}>
        <section>
          <div class="list-header">
            <h2>{listTitle(list.name)}</h2>
            <Show when={list === firstVisibleList()}>
              <CardStyleToggle cardStyle={userMediaListCardStyle()} setCardStyle={setUserMediaListCardStyle} />
            </Show>
          </div>
          <Show when={userMediaListCardStyle() === "rows"} fallback={
            <VirtualGrid each={list.entries}>{() => (
              <MediaCard />
            )}</VirtualGrid>
          }>
            <VirtualList each={list.entries}>{() => (
              <MediaRowCard />
            )}</VirtualList>
          </Show>
        </section>
      </Show>
    )}</For>
  );
}
