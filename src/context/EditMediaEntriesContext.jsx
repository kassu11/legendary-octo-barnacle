import { createContext, createEffect, createSignal, useContext } from "solid-js";
import { useAuthentication } from "./AuthenticationContext";
import { assert } from "../utils/assert";
import api from "../utils/api";
import ScoreInput from "../components/media/ScoreInput";

const EditMediaEntriesContext = createContext();

function formState(initialData) {
  const [score, setScore] = createSignal();

  function setState(data) {
    setScore(data?.mediaListEntry?.score || 0);
  }

  setState(initialData);

  return [{ score, setScore }, setState];
}

export function EditMediaEntriesProvider(props) {
  const [mediaListEntry, setMediaListEntry] = createSignal(undefined);
  const { accessToken, authUserData } = useAuthentication()

  const [state, setState] = formState();

  let editor;

  createEffect(() => {
    if (mediaListEntry()) {
      assert(authUserData(), "Should not be able to edit if not authenticated");
      console.log("mediaListData", mediaListEntry());
      console.log("authUserData", authUserData());
      setState(mediaListEntry());
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
              <select name="status" id="status">
                <option value="none" selected={mediaListEntry().mediaListEntry?.status == null} disabled hidden>Select status</option>
                <option value="COMPLETED" selected={mediaListEntry().mediaListEntry?.status === "COMPLETED"}>Completed</option>
                <option value="CURRENT" selected={mediaListEntry().mediaListEntry?.status === "CURRENT"}>
                  <Switch>
                    <Match when={mediaListEntry().type === "MANGA"}> Reading</Match>
                    <Match when={mediaListEntry().type === "ANIME"}> Watching</Match>
                  </Switch>
                </option>
                <option value="DROPPED" selected={mediaListEntry().mediaListEntry?.status === "DROPPED"}>Dropped</option>
                <option value="PAUSED" selected={mediaListEntry().mediaListEntry?.status === "PAUSED"}>Paused</option>
                <option value="PLANNING" selected={mediaListEntry().mediaListEntry?.status === "PLANNING"}>Planning</option>
                <option value="REPEATING" selected={mediaListEntry().mediaListEntry?.status === "REPEATING"}>
                  <Switch>
                    <Match when={mediaListEntry().type === "MANGA"}>Rereading</Match>
                    <Match when={mediaListEntry().type === "ANIME"}>Rewatching</Match>
                  </Switch>
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="score">Score</label>
              <ScoreInput value={state.score()} onChange={state.setScore} format={authUserData().data.data.Viewer.mediaListOptions.scoreFormat} />
            </div>
            <div>
              <label htmlFor="progress">Episode Progress</label>
              <input type="number" id="progress" name="progress" value={mediaListEntry().mediaListEntry?.progress || 0} />
            </div>
            <div>
              <label htmlFor="start-date">Start date</label>
              <input type="date" id="start-date" name="startedAt" value={formatDateToInput(mediaListEntry().mediaListEntry?.startedAt)} />
            </div>
            <div>
              <label htmlFor="end-date">Finish date</label>
              <input type="date" id="end-date" name="completedAt" value={formatDateToInput(mediaListEntry().mediaListEntry?.completedAt)} />
            </div>
            <div>
              <label htmlFor="repeat">Total Rewatches</label>
              <input type="number" id="repeat" name="repeat" value={mediaListEntry().mediaListEntry?.repeat || 0} />
            </div>
            <div>
              <label htmlFor="notes">Notes</label>
              <textarea type="text" id="notes" name="notes" value={mediaListEntry().mediaListEntry?.notes || ""} />
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
