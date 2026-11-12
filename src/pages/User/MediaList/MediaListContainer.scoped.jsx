import { useParams } from "@solidjs/router";
import { useUser, useUserMediaList } from "@/state/providers.js";
import { createEffect, createMemo, For, Show } from "solid-js";
import "./MediaListContainer.scoped.css";
import { objectUtils } from "@/utils/utils.js";
import { converStatusToListName } from "./UserMediaListIndex.scoped.jsx";
import { MediaCard } from "@/components/media/MediaCard.scoped.jsx";
import { listTitle } from "./SearchControls.scoped.jsx";
import { VirtualGrid } from "@/components/VirtualGrid.scoped.jsx";

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

  return (
    <div class="list-content">
      <p>{props.timer}</p>
      <Show when={props.listData()?.data} fallback={<CardsLoading isListVisible={props.isListVisible} />}>
        <For each={props.listData().data.lists}>{list => (
          <Show when={list.entries.length && props.isListVisible(list.name)}>
            <h2>{listTitle(list.name)}</h2>
            <VirtualGrid each={list.entries}>{entry => (
              <MediaCard scoped class="media-card" showScore hoverCard showDates showAdult showRepeats showNotes showFooter scoreFormat={user().mediaListOptions.scoreFormat} progressIncrement={isOwnProfile()} quickActions={isOwnProfile()} media={entry.media} mediaListEntry={entry} afterMutation={responseEntry => mutateEntry(entry, responseEntry)} afterProgressMutation={responseEntry => mutateEntry(entry, responseEntry, false)} afterDelete={() => deleteEntry(entry)} />
            )}</VirtualGrid>
          </Show>
        )}</For>
      </Show>
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
        <VirtualGrid each={list.entries}>{() => (
          <MediaCard scoped class="media-card" />
        )}</VirtualGrid>
      </Show>
    )}</For>
  );
}
