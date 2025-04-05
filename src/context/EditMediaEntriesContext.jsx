import { batch, createContext, createEffect, createSignal, Match, useContext } from "solid-js";
import { useAuthentication } from "./AuthenticationContext";
import { assert } from "../utils/assert";
import api from "../utils/api";
import ScoreInput from "../components/media/ScoreInput";
import { FavouriteToggle } from "../components/FavouriteToggle.jsx";
import "./EditMediaEntriesContext.scss";

const EditMediaEntriesContext = createContext();

function formState(auth, initialData) {
  assert(!initialData || auth, "Should not be able to edit if not authenticated");
  const [score, setScore] = createSignal();
  const [advancedScores, setAdvancedScores] = createSignal();
  const [advancedScoresEnabled, setAdvancedScoresEnabled] = createSignal();
  const [advancedScoring, setAdvancedScoring] = createSignal();
  const [status, setStatus] = createSignal();
  const [format, setFormat] = createSignal();
  const [isFavourite, setIsFavourite] = createSignal();
  const [progress, setProgress] = createSignal()
  const [volumeProgress, setvolumeProgress] = createSignal()
  const [maxProgress, setMaxProgress] = createSignal()
  const [startedAt, setStartedAt] = createSignal()
  const [completedAt, setCompletedAt] = createSignal()
  const [repeat, setRepeat] = createSignal()
  const [notes, setNotes] = createSignal()
  const [like, setLike] = createSignal()
  const [hideFromStatus, setHideFromStatus] = createSignal()
  const [mediaPrivate, setMediaPrivate] = createSignal()

  function setState(auth, data) {
    batch(() => {
      setFormat(auth?.data.data.Viewer.mediaListOptions.scoreFormat);
      setAdvancedScoresEnabled(() => {
        if (data?.type === "ANIME") {
          return auth?.data.data.Viewer.mediaListOptions.animeList.advancedScoringEnabled;
        } else if (data?.type === "MANGA") {
          return auth?.data.data.Viewer.mediaListOptions.mangaList.advancedScoringEnabled;
        }
      });
      setAdvancedScoring(() => {
        if (data?.type === "ANIME") {
          return auth?.data.data.Viewer.mediaListOptions.animeList.advancedScoring || [];
        } else if (data?.type === "MANGA") {
          return auth?.data.data.Viewer.mediaListOptions.mangaList.advancedScoring || [];
        }
      });

      console.log(auth);

      setScore(data?.mediaListEntry?.score ?? "");
      setAdvancedScores(data?.mediaListEntry?.advancedScores ?? {});
      setStatus(data?.mediaListEntry?.status ?? "none");
      setProgress(data?.mediaListEntry?.progress ?? "");
      setMaxProgress(data?.episodes ?? data?.chapters ?? null);
      setStartedAt(formatDateToInput(data?.mediaListEntry?.startedAt));
      setCompletedAt(formatDateToInput(data?.mediaListEntry?.completedAt));
      setRepeat(data?.mediaListEntry?.repeat ?? "");
      setNotes(data?.mediaListEntry?.notes || "");
      setIsFavourite(data?.isFavourite || false);
    });
  }

  setState(auth, initialData);

  return [{ 
    score, setScore, 
    advancedScores, setAdvancedScores,
    advancedScoresEnabled, setAdvancedScoresEnabled,
    advancedScoring, setAdvancedScoring,
    status, setStatus,
    format, setFormat,
    progress, setProgress,
    volumeProgress, setvolumeProgress,
    maxProgress, setMaxProgress,
    startedAt, setStartedAt,
    completedAt, setCompletedAt,
    isFavourite, setIsFavourite,
    repeat, setRepeat,
    notes, setNotes,
    like, setLike,
    hideFromStatus, setHideFromStatus,
    mediaPrivate, setMediaPrivate,
  }, setState];
}

export function EditMediaEntriesProvider(props) {
  const [mediaListEntry, setMediaListEntry] = createSignal(undefined);
  const [mutates, setMutates] = createSignal(undefined);
  const { accessToken, authUserData } = useAuthentication()
  const [state, setState] = formState();

  let editor;

  const handleSubmit = e => {
    const formData = new FormData(e.currentTarget);
    const form = formData.entries().reduce((acc, [key, val]) => {
      if (Array.isArray(acc[key])) {
        acc[key].push(val || null);
      } else if(key in acc) {
        acc[key] = [acc[key], val || null];
      } else {
        acc[key] = val || null;
      }

      return acc;
    }, {});

    const changes = {}
    if (Number.isNaN(+form.progress) === false && form.progress != (mediaListEntry().mediaListEntry?.progress || 0)) {
      changes.progress = Number(form.progress);
    }
    if (Number.isNaN(+form.progressVolume) === false && form.progressVolume != (mediaListEntry().mediaListEntry?.progressVolume || 0)) {
      changes.progressVolume = Number(form.progressVolume);
    }
    if (Number.isNaN(+form.score) === false && form.score != (mediaListEntry().mediaListEntry?.score || 0)) {
      changes.score = Number(form.score);
    }
    if (Number.isNaN(+form.repeat) === false && form.repeat != (mediaListEntry().mediaListEntry?.repeat || 0)) {
      changes.repeat = Number(form.repeat);
    }

    if (state.advancedScoresEnabled()) {
      const inputValues = state.advancedScoring().map((_, i) => form["advanced-scores-" + i]);
      const numbers = inputValues.map(val => Number(val || 0));
      const valid = !numbers.some(Number.isNaN);
      const serverValues = Object.values(mediaListEntry().mediaListEntry.advancedScores)
      const hasChanges = numbers.some((num, i) => num != serverValues[i]);
      if (valid && hasChanges) {
        changes.advancedScores = numbers;
      }
    }

    assert(form.status != "none" || mediaListEntry().mediaListEntry?.score == null, "Replacing current status with default none value");

    if (!(form.status == "none" || mediaListEntry().mediaListEntry?.status == form.status)) {
      changes.status = form.status;
    }
    if ((form.startedAt || "") != formatDateToInput(mediaListEntry().mediaListEntry?.startedAt)) {
      const [year, month, day] = form.startedAt.split("-");
      changes.startedAt = { year, month, day };
    }
    if ((form.completedAt || "") != formatDateToInput(mediaListEntry().mediaListEntry?.completedAt)) {
      const [year, month, day] = form.completedAt.split("-");
      changes.completedAt = { year, month, day };
    }
    if (form.notes != mediaListEntry().mediaListEntry?.notes) {
      changes.notes = form.notes;
    }






    if (e.submitter.type === "submit") {
      // Send changes to anilist
      if (Object.keys(changes).length > 0) {
        changes.mediaId = mediaListEntry().id;
        for(const [key, value] of Object.entries(changes)) {
          assert(Number.isNaN(value) === false, `Key "${key}" is NaN`);
        }
        api.anilist.mutateMedia(accessToken(), changes).then(data => {
          console.log(data);
        }).catch(err => {
            console.error(err);
        });
      } else {
        console.log("No changes");
      }
    } 

    console.log("Data: ", { ...form });
    console.log("Changes: ", changes);
  } 

  /**
   * @param {Object} defaultData - Default filler values for media editor
   * @param {number} defaultData.id - Media id
   * @param {undefined|number} defaultData.score - Default score
   * @param {Object} mutate - Default score
   * @param {undefined|Function} mutate.setIsFavourite
   */
  async function openEditor(defaultData, mutate) {
    assert("id" in defaultData, "Missing editor id");

    batch(() => {
      setMediaListEntry(defaultData);
      setMutates(mutate);
      setState(authUserData(), defaultData);
    });

    editor.showModal();

    const [data] = api.anilist.mediaListEntry(accessToken, defaultData.id);
    createEffect(() => {
      // TODO: refactor this
      if (data()) {
        console.log("Updating mediaListData", data());
        batch(() => {
          setMediaListEntry(data().data.data.Media);
          setState(authUserData(), data().data.data.Media);
        });
      }
    });

  }

  return (
    <EditMediaEntriesContext.Provider value={{ openEditor }}>
      <dialog ref={editor} class="editor">
        <Show when={mediaListEntry()}>
          {console.log(mediaListEntry())}
          <form method="dialog" class="close">
            <button>Close</button>
          </form>
          <form method="dialog" onSubmit={handleSubmit}>
            <header class="header">
              <Show when={mediaListEntry().bannerImage}>
                <img src={mediaListEntry().bannerImage} class="banner" alt="Banner" />
              </Show>
              <img src={mediaListEntry().coverImage?.large} class="cover" alt="Cover" />
              <h2 class="line-clamp">{mediaListEntry().title?.userPreferred}</h2>
              <div class="header-action">
                <Switch>
                  <Match when={mediaListEntry().type === "MANGA"}>
                    <FavouriteToggle 
                      checked={state.isFavourite()} 
                      mangaId={mediaListEntry().id} 
                      onChange={state.setIsFavourite} 
                      mutateCache={(isFavourite) => {
                        mutates()?.setIsFavourite?.(isFavourite);
                      }} />
                  </Match>
                  <Match when={mediaListEntry().type === "ANIME"}>
                    <FavouriteToggle 
                      checked={state.isFavourite()} 
                      animeId={mediaListEntry().id} 
                      onChange={state.setIsFavourite} 
                      mutateCache={(isFavourite) => {
                        mutates()?.setIsFavourite?.(isFavourite);
                      }} />
                  </Match>
                </Switch>
                <button type="submit">Save</button>
              </div>
            </header>
            <div class="main">
              <div class={"input-grid " + mediaListEntry().type?.toLowerCase()}>
                <div class="form status">
                  <label htmlFor="status">Status</label>
                  <select name="status" id="status" value={state.status()} onChange={e => state.setStatus(e.target.value)}>
                    <option value="none" disabled hidden>Select status</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CURRENT">
                      <Switch>
                        <Match when={mediaListEntry().type === "MANGA"}> Reading</Match>
                        <Match when={mediaListEntry().type === "ANIME"}> Watching</Match>
                      </Switch>
                    </option>
                    <option value="DROPPED">Dropped</option>
                    <option value="PAUSED">Paused</option>
                    <option value="PLANNING">Planning</option>
                    <option value="REPEATING">
                      <Switch>
                        <Match when={mediaListEntry().type === "MANGA"}>Rereading</Match>
                        <Match when={mediaListEntry().type === "ANIME"}>Rewatching</Match>
                      </Switch>
                    </option>
                  </select>
                </div>
                <div class="form score">
                  {console.log(state.format())}
                  <ScoreInput value={state.score()} label="Score" onChange={state.setScore} format={state.format()} />
                </div>
                <div class="form progress">
                  <label htmlFor="progress">
                    <Switch>
                      <Match when={mediaListEntry().type === "ANIME"}>Episode Progress</Match>
                      <Match when={mediaListEntry().type === "MANGA"}>Chapter Progress</Match>
                    </Switch>
                  </label>
                  <input 
                    type="number" 
                    inputMode="numeric" 
                    id="progress" 
                    name="progress" 
                    min="0" 
                    max={state.maxProgress()}
                    value={state.progress()} 
                    onChange={e => state.setProgress(e.target.value)} 
                    onBlur={e => e.target.value = state.progress()} 
                    onBeforeInput={e => {
                      if (e.data?.toLowerCase().includes("e")) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <Show when={mediaListEntry().type === "MANGA"}>
                  <div class="form volume-progress">
                    <label htmlFor="volume-progress">Volume Progress</label>
                    <input 
                      type="number" 
                      inputMode="numeric" 
                      id="volume-progress" 
                      name="volumeProgress" 
                      min="0" 
                      value={state.volumeProgress()} 
                      onChange={e => state.setvolumeProgress(e.target.value)} 
                      onBlur={e => e.target.value = state.volumeProgress()} 
                      onBeforeInput={e => {
                        if (e.data?.toLowerCase().includes("e")) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                </Show>
                <div class="form start-date">
                  <label htmlFor="start-date">Start date</label>
                  <input type="date" id="start-date" name="startedAt" value={state.startedAt()} onChange={e => state.setStartedAt(e.target.value)}/>
                </div>
                <div class="form finish-date">
                  <label htmlFor="end-date">Finish date</label>
                  <input type="date" id="end-date" name="completedAt" value={state.completedAt()} onChange={e => state.setCompletedAt(e.target.value)}/>
                </div>
                <div class="form repeat">
                  <label htmlFor="repeat">Total Rewatches</label>
                  <input 
                    type="number" 
                    inputMode="numeric" 
                    id="repeat" 
                    name="repeat" 
                    min="0" 
                    value={state.repeat()} 
                    onChange={e => state.setRepeat(e.target.value)} 
                    onBlur={e => e.target.value = state.repeat()} 
                    onBeforeInput={e => {
                      if (e.data?.toLowerCase().includes("e")) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div class="form notes">
                  <label htmlFor="notes">Notes</label>
                  <textarea type="text" id="notes" name="notes" value={state.notes()} onChange={e => state.setNotes(e.target.value)} />
                </div>
                <Show when={state.advancedScoresEnabled() && state.advancedScoring().length}>
                  <p class="advanced-scoring-header">Advanced scoring</p>
                  <For each={state.advancedScoring()}>{(scoreFieldName, i) => ( 
                    <div class="form advanced-score">
                      <ScoreInput 
                        value={state.advancedScores()[scoreFieldName] ?? ""} 
                        id={"advanced-score-" + i()} 
                        name={"advanced-scores-" + i()}
                        label={scoreFieldName} 
                        onChange={(score) => {
                          state.setAdvancedScores(aScore => {
                            const newScores = ({...aScore, [scoreFieldName]: score});
                            const total = Object.values(newScores).reduce((acc, v) => acc + (v || 0), 0);
                            if (Number.isNaN(total) === false && typeof total === "number") {
                              state.setScore(total / Object.values(newScores).length);
                            }
                            return newScores;
                          })
                        }} 
                        format={state.format()} />
                    </div>
                  )}</For>
                </Show>
              </div>
              <div>
                <h3>Custom Lists</h3>
                <Switch>
                  <Match when={mediaListEntry().type === "ANIME"}>
                    <CustomLists list={authUserData().data.data.Viewer.mediaListOptions.animeList.customLists}/>
                  </Match>
                  <Match when={mediaListEntry().type === "MANGA"}>
                    <CustomLists list={authUserData().data.data.Viewer.mediaListOptions.mangaList.customLists}/>
                  </Match>
                </Switch>
                <div>
                  <input type="checkbox" name="hide-from-status" id="hide-from-status" />
                  <label htmlFor="hide-from-status"> Hide from status lists</label>
                </div>
                <div>
                  <input type="checkbox" name="private" id="private" />
                  <label htmlFor="private"> Private</label>
                </div>
                <button type="button">Delete</button>
              </div>
            </div>
          </form>
        </Show>
      </dialog>
      {props.children}
    </EditMediaEntriesContext.Provider>
  );
}

function CustomLists(props) {
  assert("list" in props, "List is missing");

  return (
    <Show when={props.list?.length}>
      <ul>
        <For each={props.list}>{(listName, i) => ( 
          <li>
            <input type="checkbox" name="customLists" id={"custom-list-" + i()} />
            <label htmlFor={"custom-list-" + i()}> {listName}</label>
          </li>
        )}</For>
      </ul>
      <hr />
    </Show>
  );
}

function formatDateToInput(date) {
  if (!date || !date.day || !date.month || !date.year) {
    return "";
  }

  const day = String(date.day).padStart(2, "0");
  const month = String(date.month).padStart(2, "0");
  return `${date.year}-${month}-${day}`;
}

export function useEditMediaEntries() {
  const context = useContext(EditMediaEntriesContext);
  if (!context) {
    throw new Error("useEditMediaEntries must be used within a ResponsiveProvider");
  }
  return context;
} 
