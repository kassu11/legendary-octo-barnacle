import { createContext, createEffect, createSignal, useContext } from "solid-js";
import { useAuthentication } from "./AuthenticationContext";
import { assert } from "../utils/assert";
import api from "../utils/api";
import ScoreInput from "../components/media/ScoreInput";

const EditMediaEntriesContext = createContext();

function formState(auth, initialData) {
  assert(!initialData || auth, "Should not be able to edit if not authenticated");
  const [score, setScore] = createSignal();
  const [status, setStatus] = createSignal();
  const [format, setFormat] = createSignal();
  const [progress, setProgress] = createSignal()
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

    setScore(data?.mediaListEntry?.score || 0);
    setStatus(data?.mediaListEntry?.status || "none");
    setProgress(data?.mediaListEntry?.progress || 0);
    setMaxProgress(data?.episodes || data?.chapters || null);
    setStartedAt(formatDateToInput(data?.mediaListEntry?.startedAt));
    setCompletedAt(formatDateToInput(data?.mediaListEntry?.completedAt));
    setRepeat(data?.mediaListEntry?.repeat || 0);
    setNotes(data?.mediaListEntry?.notes || "");
  }

  setState(auth, initialData);

  return [{ 
    score, setScore, 
    status, setStatus,
    format, setFormat,
    progress, setProgress,
    maxProgress, setMaxProgress,
    startedAt, setStartedAt,
    completedAt, setCompletedAt,
    repeat, setRepeat,
    notes, setNotes,
    like, setLike,
    hideFromStatus, setHideFromStatus,
    mediaPrivate, setMediaPrivate,
  }, setState];
}

export function EditMediaEntriesProvider(props) {
  const [mediaListEntry, setMediaListEntry] = createSignal(undefined);
  const { accessToken, authUserData } = useAuthentication()
  const [state, setState] = formState();

  let editor;

  createEffect(() => {
    setState(authUserData(), mediaListEntry());
    if (mediaListEntry()) {
      console.log("mediaListData", mediaListEntry());
      console.log("authUserData", authUserData());
      editor.showModal();
    }
  });

  return (
    <EditMediaEntriesContext.Provider value={{ mediaListEntry, setMediaListEntry }}>
      <dialog ref={editor}>
        <Show when={mediaListEntry()}>
          {console.log(mediaListEntry())}
          <form method="dialog" onSubmit={e => {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries().map(([k, v]) => [k, v || null]));

            const changes = {}
            if (!((data.progress == "0" && mediaListEntry().mediaListEntry?.progress == null) || data.progress == mediaListEntry().mediaListEntry?.progress)) {
              changes.progress = Number(data.progress);
            }
            if (!((data.score == "0" && mediaListEntry().mediaListEntry?.score == null) || data.score == mediaListEntry().mediaListEntry?.score)) {
              changes.score = Number(data.score);
            }
            if (!((data.repeat == "0" && mediaListEntry().mediaListEntry?.repeat == null) || data.repeat == mediaListEntry().mediaListEntry?.repeat)) {
              changes.repeat = Number(data.repeat);
            }
            assert(data.status != "none" || mediaListEntry().mediaListEntry?.score == null, "Replacing current status with default none value");

            if (!(data.status == "none" || mediaListEntry().mediaListEntry?.status == data.status)) {
              changes.status = data.status;
            }
            if ((data.startedAt || "") != formatDateToInput(mediaListEntry().mediaListEntry?.startedAt)) {
              changes.startedAt = data.startedAt;
            }
            if ((data.completedAt || "") != formatDateToInput(mediaListEntry().mediaListEntry?.completedAt)) {
              changes.completedAt = data.completedAt;
            }
            if (data.notes != mediaListEntry().mediaListEntry?.notes) {
              changes.notes = data.notes;
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

            console.log("Data: ", { ...data });
            console.log("Changes: ", changes);
          }}>
            <img src={mediaListEntry().bannerImage} alt="Banner" />
            <img src={mediaListEntry().coverImage.large} alt="Cover" />
            <h2>{mediaListEntry().title.userPreferred}</h2>
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
              <label htmlFor="progress">Episode Progress</label>
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
            <button type="submit">Save</button>
            <h3>Custom Lists</h3>
            <div>
              <input type="checkbox" name="like" id="like" />
              <label htmlFor="like"> Like</label>
            </div>
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
