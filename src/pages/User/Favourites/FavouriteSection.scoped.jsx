import { Show, Switch, Match, createSignal } from "solid-js";
import { useAuthentication, useUser } from "../../../context/providers.js";
import { FavouritesContext } from "../../../context/providers.js";
import { FavouritesPageScoped } from "./FavouritesPage.scoped.jsx";
import { asserts, queries } from "../../../collections/collections.js";
import "./FavouriteSection.scoped.css"
import { createAnilistFetcher, fetcherToFetch } from "../../../utils/fetcherUtils.js";
import { addApplicationNotification } from "../../App/ApplicationNotifications.scoped.jsx";

export function FavouriteSectionScoped(props) {
  asserts.assertTrueOLD(props.title, "title missing");
  asserts.assertTrueOLD(props.type, "type missing");
  const [visible, setVisible] = createSignal(false);
  const [reorder, setReorder] = createSignal(false);
  const [allEdges, setAllEdges] = createSignal([]);
  const { authUserData } = useAuthentication();
  const { user } = useUser();

  let ol, dragging, offsetX,offsetY;

  const resetOrder = () => {
    setReorder(false);
    allEdges().forEach(edge => {
      const elem = ol.querySelector(`li[data-id="${edge.node.id}"]`);
      if (elem) {
        ol.append(elem);
      }
    });
  }

  const dragStart = e => {
    if (!reorder()) {
      return;
    }
    const dragged = e.target.closest("li");
    if (!dragged) {
      return
    }

    dragged.classList.add("dragging");
    const rect = dragged.getBoundingClientRect();
    if (e.type === "touchstart") {
      const touch = e.touches[0];
      offsetX = touch.clientX - rect.x;
      offsetY = touch.clientY - rect.y;
    } else {
      offsetX = e.clientX - rect.x;
      offsetY = e.clientY - rect.y;
    }
    dragging = dragged;
  }

  const dragMove = e => {
    if (!reorder() || !dragging) {
      return;
    }

    if (e.type === "touchmove") {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY)?.closest("li");
      if (target) { 
        if (dragging.nextElementSibling === target) { target.after(dragging); } 
        else { target.before(dragging); } 
      }
      translateMove();
    }
    else if (e.buttons === 1 && e.target?.tagName === "LI") {
      if (dragging.nextElementSibling === e.target) { e.target.after(dragging); } 
      else { e.target.before(dragging); } 
    } else if(e.buttons !== 1) {
      dragEnd();
    }

    if (e.buttons === 1) {
      translateMove();
    }

    function translateMove() {
      const rect = dragging.getBoundingClientRect();
      let curX = 0, curY = 0, x = e.clientX, y = e.clientY;
      if (e.type === "touchmove") {
        const touch = e.touches[0];
        x = touch.clientX;
        y = touch.clientY;
      }
      if (dragging.style.transform) {
        const numbers = dragging.style.transform.match(/-?[\d.]+(?=px)/g).map(Number);
        [curX, curY] = numbers;
      }
      dragging.style.transform = `translate(${curX + (x - (rect.x + offsetX))}px, ${curY + (y - (rect.y + offsetY))}px)`;
    }
  }

  const dragEnd = () => {
    if (dragging) {
      dragging.style.transform = null;
      dragging.classList.remove("dragging");
    }
    dragging = null;
  }

  return (
    <details classList={{hidden: !visible()}} open>
      <summary>
        <h3>{props.title}</h3>
        <Show when={user().id === authUserData()?.data.id}>
          <Switch>
            <Match when={reorder()}>
              <button onClick={async () => {
                const newIds = [...ol.querySelectorAll(".favourite-item")].map(elem => +elem.dataset.id);
                const newOrder = newIds.map((_, i) => i + 1);

                let fetcher;
                if (props.type === "anime") fetcher = createAnilistFetcher(queries.anilistUserMutateFavourites, { animeIds: newIds, animeOrder: newOrder }, AbortSignal.timeout(30_000));
                else if (props.type === "manga") fetcher = createAnilistFetcher(queries.anilistUserMutateFavourites, { mangaIds: newIds, mangaOrder: newOrder }, AbortSignal.timeout(30_000));
                else if (props.type === "studios") fetcher = createAnilistFetcher(queries.anilistUserMutateFavourites, { studioIds: newIds, studioOrder: newOrder }, AbortSignal.timeout(30_000));
                else if (props.type === "staff") fetcher = createAnilistFetcher(queries.anilistUserMutateFavourites, { staffIds: newIds, staffOrder: newOrder }, AbortSignal.timeout(30_000));
                else if (props.type === "characters") fetcher = createAnilistFetcher(queries.anilistUserMutateFavourites, { characterIds: newIds, characterOrder: newOrder }, AbortSignal.timeout(30_000));
                else return;

                const res = await fetcherToFetch(fetcher);
                if (res.status === 200) {
                  setAllEdges(edges => {
                    const indexFromId = Object.fromEntries(edges.map((edge, i) => [edge.node.id, i]));
                    return edges.map((_, i) => (edges[indexFromId[newIds[i]]]));
                  });
                  setReorder(false);
                } else {
                  resetOrder();
                  addApplicationNotification({ type: "error", message: "Saving favourites has failed", duration: 30_000 });
                }
              }}>Save</button>
              <button onClick={resetOrder}>Cancel</button>
            </Match>
            <Match when={!reorder()}>
              <button onClick={() => setReorder(v => !v)}>Reorder</button>
            </Match>
          </Switch>
        </Show>
      </summary>
      <ol ref={el => ol = el} classList={{reorder: reorder(), grid: props.type !== "studios", flex: props.type === "studios"}} onMouseMove={dragMove} onTouchMove={dragMove} onTouchEnd={dragEnd} onMouseDown={dragStart} onTouchStart={dragStart} >
        <FavouritesContext.Provider value={{ type: props.type, setAllEdges, allEdges}}>
          <Show when={user().id} keyed>
            <FavouritesPageScoped page={1} setVisible={setVisible} />
          </Show>
        </FavouritesContext.Provider>
      </ol>
    </details>
  );
}


