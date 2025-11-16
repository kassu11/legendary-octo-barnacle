import {createStore} from "solid-js/store";
import {A, useParams} from "@solidjs/router";
import {useEditMediaEntries, useUser, useUserMediaList} from "../../../context/providers.js";
import {For, onCleanup, onMount, Show} from "solid-js";
import {mediaUrl} from "../../../utils/formating.js";
import {MediaCardEpisodes} from "./MediaCardEpisodes.jsx";
import Score from "../../../components/media/Score.jsx";
import {QuickActionButton} from "../../../components/Buttons.scoped.jsx";
import Edit from "../../../assets/Edit.jsx";

export function MediaListContainerScoped(props) {
  const [cardsVisibility, storeCardsVisibility] = createStore({});
  const params = useParams();
  const {user} = useUser();
  const {openEditor} = useEditMediaEntries();
  const {isOwnProfile} = useUserMediaList();

  const callback = (entries) => {
    for (const entry of entries) {
      storeCardsVisibility(entry.target.dataset.list, entry.target.dataset.index, entry.isIntersecting);
    }
  };

  const intersectionObserver = new IntersectionObserver(callback, {rootMargin: "500px"});
  onCleanup(() => {
    intersectionObserver.disconnect();
  });

  return (
    <div class="user-profile-media-list-container">
      <Show when={props.listData()?.data}>
        <For each={props.listData().data.lists}>{list => {
          storeCardsVisibility(list.name, {});
          return (
            <Show when={list.entries.length && (!params.list || decodeURI(params.list) === list.name)}>
              <h2>{list.name}</h2>
              <ol class="user-profile-media-list-grid">
                <For each={list.entries}>{(entry, i) => {
                  let ref;
                  onMount(() => intersectionObserver.observe(ref));
                  onCleanup(() => intersectionObserver.unobserve(ref));

                  return (
                    <li ref={ref} attr:data-index={i()} attr:data-list={list.name} class="card">
                      <Show when={cardsVisibility[list.name][i()]}>
                        <A class="clean-link" href={mediaUrl(entry.media)}>
                          <div class="container">
                            <img src={entry.media.coverImage.large} class="cover" alt="Cover."/>
                            <div class="card-header">
                              <Show when={entry.repeat}>
                                <div class="badge repeat" label={"Rewatched " + entry.repeat + " times"}>
                                  {entry.repeat}
                                  <svg aria-hidden="true" focusable="false" role="img"
                                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor"
                                          d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"></path>
                                  </svg>
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
                                <MediaCardEpisodes entry={entry}/>
                                <Score score={entry.score}
                                       format={user().mediaListOptions.scoreFormat || "POINT_10_DECIMAL"}/>
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
                                          const listIndex = res.data.lists.findIndex(list => list.name === name && list.isCustomList === isCustomList);
                                          if (listIndex === -1) {
                                            res.data.lists.push({
                                              name,
                                              isCustomList: false,
                                              isCompletedList: false,
                                              entries: []
                                            });
                                          }

                                          const list = res.data.lists.at(listIndex);
                                          list.entries.push(responseEntry);
                                          props.listData().data.indecies[entry.media.id].push([listIndex === -1 ? res.data.lists.length - 1 : listIndex, list.entries.length - 1]);
                                        }

                                        props.listData().data.indecies[entry.media.id].forEach(([listIndex, entryIndex]) => {
                                          res.data.lists[listIndex].entries.splice(entryIndex, 1);
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
                                          res.data.lists[listIndex].entries.splice(entryIndex, 1);
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
                      </Show>
                    </li>
                  )
                }}</For>
              </ol>
            </Show>
          )
        }}
        </For>
      </Show>
    </div>
  );
}
