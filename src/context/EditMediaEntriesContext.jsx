import { createContext, createEffect, createSignal, useContext } from "solid-js";
import { useAuthentication } from "./AuthenticationContext";
import { assert } from "../utils/assert";
import api from "../utils/api";

const EditMediaEntriesContext = createContext();

export function EditMediaEntriesProvider(props) {
  const [mediaListEntry, setMediaListEntry] = createSignal(undefined);
  const { accessToken, authUserData } = useAuthentication()

  const editor = (
    <dialog>
      <Show when={mediaListEntry()}>
        <form method="dialog" onSubmit={e => {
          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData.entries().map(([k, v]) => [k, v || undefined]));

          const changes = {}
          if (!((data.progress == "0" && mediaListEntry().mediaListEntry?.progress == null) || data.progress == mediaListEntry().mediaListEntry?.progress)) {
            changes.progress = Number(data.progress);
          }
          if (!((data.score == "0" && mediaListEntry().mediaListEntry?.score == null) || data.score == mediaListEntry().mediaListEntry?.score)) {
            changes.score = Number(data.score);
          }






          if (e.submitter?.getAttribute("formmethod") === "dialog") {
            // Closin animation
          } else if (e.submitter.type === "submit") {
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
          } else {
            e.preventDefault();
          }

          console.log("Data: ", { ...data });
          console.log("Changes: ", changes);
        }}>
          <img src={mediaListEntry().bannerImage} alt="Banner" />
          <img src={mediaListEntry().coverImage.large} alt="Cover" />
          <h2>{mediaListEntry().title.userPreferred}</h2>
          <div>
            <label htmlFor="status">Status</label>
            <input type="text" id="status" name="status" value={mediaListEntry().mediaListEntry?.status || ""} />
          </div>
          <div>
            <label htmlFor="score">Score</label>
            <input type="number" min="0" max="10" step=".1" id="score" name="score" value={mediaListEntry().mediaListEntry?.score || 0} />
          </div>
          <div>
            <label htmlFor="progress">Episode Progress</label>
            <input type="number" id="progress" name="progress" value={mediaListEntry().mediaListEntry?.progress || 0} />
          </div>
          <div>
            <label htmlFor="start-date">Start date</label>
            <input type="date" id="start-date" name="start-date" value={mediaListEntry().mediaListEntry?.score || 0} />
          </div>
          <div>
            <label htmlFor="end-date">Finish date</label>
            <input type="date" id="end-date" name="end-date" value={mediaListEntry().mediaListEntry?.score || 0} />
          </div>
          <div>
            <label htmlFor="repeat">Total Rewatches</label>
            <input type="number" id="repeat" name="repeat" value={mediaListEntry().mediaListEntry?.repeat || 0} />
          </div>
          <div>
            <label htmlFor="notes">Notes</label>
            <input type="text" id="notes" name="notes" value={mediaListEntry().mediaListEntry?.notes || ""} />
          </div>
          <h3>Advanced Scores</h3>
          <button>Delete</button>
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
          <button formMethod="dialog">close</button>
        </form>
      </Show>
    </dialog>
  );

  createEffect(() => {
    if (mediaListEntry()) {
      assert(authUserData(), "Should not be able to edit if not authenticated");
      console.log("mediaListData", mediaListEntry());
      console.log("authUserData", authUserData());
      editor.showModal();
    }
  });

  return (
    <EditMediaEntriesContext.Provider value={{ mediaListEntry, setMediaListEntry }}>
      {editor}
      {props.children}
    </EditMediaEntriesContext.Provider>
  );
}

export function useEditMediaEntries() {
  const context = useContext(EditMediaEntriesContext);
  if (!context) {
    throw new Error("useEditMediaEntries must be used within a ResponsiveProvider");
  }
  return context;
} 
