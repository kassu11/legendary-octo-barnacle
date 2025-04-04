import { batch, createContext, createEffect, createSignal, Match, useContext } from "solid-js";
import { useAuthentication } from "./AuthenticationContext";
import { assert } from "../utils/assert";
import api from "../utils/api";
import ScoreInput from "../components/media/ScoreInput";
import { FavouriteToggle } from "../components/FavouriteToggle.jsx";
import style from "./EditMediaEntriesContext.module.scss";

const EditMediaEntriesContext = createContext();

function formState(auth, initialData) {
  assert(!initialData || auth, "Should not be able to edit if not authenticated");
  const [score, setScore] = createSignal();
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
    setFormat(auth?.data.data.Viewer.mediaListOptions.scoreFormat);

    console.log(auth);

    setScore(data?.mediaListEntry?.score ?? "");
    setStatus(data?.mediaListEntry?.status ?? "none");
    setProgress(data?.mediaListEntry?.progress ?? "");
    setMaxProgress(data?.episodes ?? data?.chapters ?? null);
    setStartedAt(formatDateToInput(data?.mediaListEntry?.startedAt));
    setCompletedAt(formatDateToInput(data?.mediaListEntry?.completedAt));
    setRepeat(data?.mediaListEntry?.repeat ?? "");
    setNotes(data?.mediaListEntry?.notes || "");
    setIsFavourite(data?.isFavourite || false);
  }

  setState(auth, initialData);

  return [{ 
    score, setScore, 
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
    const form = Object.fromEntries(formData.entries().map(([k, v]) => [k, v || null]));

    const changes = {}
    if (form.progress != (mediaListEntry().mediaListEntry?.progress || 0)) {
      changes.progress = Number(form.progress);
    }
    if (form.progressVolume != (mediaListEntry().mediaListEntry?.progressVolume || 0)) {
      changes.progressVolume = Number(form.progressVolume);
    }
    if (form.score != (mediaListEntry().mediaListEntry?.score || 0)) {
      changes.score = Number(form.score);
    }
    if (form.repeat != (mediaListEntry().mediaListEntry?.repeat || 0)) {
      changes.repeat = Number(form.repeat);
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
        console.log("Updating mediaListData");
        batch(() => {
          setMediaListEntry(data().data.data.Media);
          setState(authUserData(), data().data.data.Media);
        });
      }
    });
  }

  return (
    <EditMediaEntriesContext.Provider value={{ openEditor }}>
      <dialog ref={editor} class={style.editor}>
        <Show when={mediaListEntry()}>
          {console.log(mediaListEntry())}
          <form method="dialog" onSubmit={handleSubmit}>
            <header class={style.header}>
              <Show when={mediaListEntry().bannerImage}>
                <img src={mediaListEntry().bannerImage} class={style.banner} alt="Banner" />
              </Show>
              <img src={mediaListEntry().coverImage?.large} class={style.cover} alt="Cover" />
              <h2 class={style.lineClamp}>{mediaListEntry().title?.userPreferred}</h2>
              <div>
                <Switch>
                  <Match when={mediaListEntry().type === "MANGA"}>
                    <FavouriteToggle 
                      checked={state.isFavourite()} 
                      mangaId={mediaListEntry().id} 
                      onChange={state.setIsFavourite} 
                      mutateCache={(isFavourite) => {
                        setMediaListEntry(v => ({ ...v, isFavourite }))
                        mutates()?.setIsFavourite?.(isFavourite);
                      }} />
                  </Match>
                  <Match when={mediaListEntry().type === "ANIME"}> favorite missing</Match>
                </Switch>
                <button type="submit">Save</button>
              </div>
            </header>
            <div>
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
            <div>
              <label htmlFor="score">Score</label>
              {console.log(state.format())}
              <ScoreInput value={state.score()} onChange={state.setScore} format={state.format()} />
            </div>
            <div>
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
              <div>
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
            <div>
              <label htmlFor="start-date">Start date</label>
              <input type="date" id="start-date" name="startedAt" value={state.startedAt()} onChange={e => state.setStartedAt(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="end-date">Finish date</label>
              <input type="date" id="end-date" name="completedAt" value={state.completedAt()} onChange={e => state.setCompletedAt(e.target.value)}/>
            </div>
            <div>
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
            <div>
              <label htmlFor="notes">Notes</label>
              <textarea type="text" id="notes" name="notes" value={state.notes()} onChange={e => state.setNotes(e.target.value)} />
            </div>
            <h3>Advanced Scores</h3>
            <button type="button">Delete</button>
            <h3>Custom Lists</h3>
            <div>
              <input type="checkbox" name="hide-from-status" id="hide-from-status" />
              <label htmlFor="hide-from-status"> Hide from status lists</label>
            </div>
            <div>
              <input type="checkbox" name="private" id="private" />
              <label htmlFor="private"> Private</label>
            </div>
          </form>
          <form method="dialog">
            <button>Close</button>
          </form>
        </Show>
      </dialog>
      {props.children}
    </EditMediaEntriesContext.Provider>
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
