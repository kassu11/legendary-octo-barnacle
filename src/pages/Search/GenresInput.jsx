import { createEffect, createSignal, For, Match, on, Show, Switch } from "solid-js";
import { useResponsive } from "../../context/ResponsiveContext";
import "./RatingInput.scss";
import { useSearchParams } from "@solidjs/router";
import { createStore, reconcile } from "solid-js/store";

export function GenresInput(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isTouch } = useResponsive()
  const [filter, setFilter] = createSignal("");
  let open = false;
  let oldGenres, oldTags;
  let dialog, scrollWrapper, controller, button, form;

  function close() {
    dialog.close();
    open = false;
    controller?.abort();
    setSearchParams({preventFetch: undefined});
  }

  function preventMobileDragOverFlow() {
    scrollWrapper.classList.toggle("has-scroll-bar", scrollWrapper.scrollHeight - scrollWrapper.clientHeight > 0);
  }

  createEffect(on(isTouch, close));

  return (
    <form class="multi-input" classList={{mobile: isTouch()}} ref={form} onSubmit={e => {e.preventDefault()}} onInput={e => {
      const parent = e.target.closest("li");
      const originalName = e.target.name;
      if (!e.target.checked && !parent.classList.contains("exclude")) {
        parent.classList.add("exclude");
        e.target.checked = true;
        e.target.name = e.target.name === "tag" ? "excludeTag" : "excludeGenre";
      } else if (parent.classList.contains("exclude")) {
        parent.classList.remove("exclude");
      }

      const formData = new FormData(e.currentTarget);
      if (parent.classList.contains("exclude")) {
        setSearchParams({
          [originalName]: formData.getAll(originalName),
          [e.target.name]: formData.getAll(e.target.name),
        });
      } else {
        console.log(formData.getAll(e.target.name), e.target.name)
        setSearchParams({[e.target.name]: formData.getAll(e.target.name)});
      }
    }}>
      <button class="open-multi-input" ref={button} onClick={() => {
        if (open) {
          close();
        } else {
          controller = new AbortController();
          const signal = controller.signal;
          oldGenres = searchParams.genre;
          oldTags = searchParams.tag;

          if(isTouch()) {
            dialog.showModal();
            setSearchParams({preventFetch: true});
            preventMobileDragOverFlow();
            window.addEventListener("resize", preventMobileDragOverFlow, { signal });

            dialog.addEventListener("touchstart", e => {
              if (e.target !== dialog) { return }

              dialog.addEventListener("touchend", e => {
                if (e.target !== dialog) { return }

                e.preventDefault();
                close();
              }, {once: true, signal});

            }, {signal});
          } else {
            window.addEventListener("mousedown", e => e.target !== button && e.target.closest("dialog") !== dialog && close(), {signal});
            dialog.show();
          }
          open = true;
        }
      }}>Genres</button>
      <dialog ref={dialog} onClose={close}>
        <div class="wrapper">
          <div class="multi-input-header">
            <input type="search" placeholder="Filter genres" onInput={e => {
              e.stopPropagation();
              setFilter(e.target.value.toLowerCase());
            }} />
          </div>
          <div class="scroll-wrapper" ref={scrollWrapper}>
            <Content {...props} />
          </div>
          <Show when={isTouch()}>
            <div class="multi-input-footer">
              <button onClick={() => {
                close();
                setSearchParams({ genre: oldGenres, tag: oldTags });
              }}>Cancel</button>
              <button onClick={close}>Ok</button>
            </div>
          </Show>
        </div>
      </dialog>
    </form>
  );

  function Content() {
    const [searchParams] = useSearchParams();
    const [genres, setGenres] = createStore({exclude: {}});

    createEffect(() => {
      setGenres(reconcile({
        ...[searchParams.genre].flat().reduce((acc, genre) => ({...acc, [genre]: true}), {}),
        ...[searchParams.tag].flat().reduce((acc, tag) => ({...acc, [tag]: true}), {}),
        exclude: {
          ...[searchParams.excludeGenre].flat().reduce((acc, genre) => ({...acc, [genre]: true}), {}),
          ...[searchParams.excludeTag].flat().reduce((acc, tag) => ({...acc, [tag]: true}), {}),
        }
      }));
    });

    return (
      <Switch>
        <Match when={props.engine === "ani"}>
          <Show when={props.aniGenres()} fallback="Loading...">
            <h3>Genres</h3>
            <ol>
              <For each={props.aniGenres().data.genres}>{genre => (
                <li classList={{exclude: genres.exclude[genre], hidden: !genre.toLowerCase().includes(filter())}} >
                  <label>
                    {genre}
                    <Show when={genres.exclude[genre]} fallback={
                      <input type="checkbox" data-steps="2" name="genre" value={genre} checked={genres[genre]} />
                    }>
                      <input type="checkbox" data-steps="2" name="excludeGenre" value={genre} checked={genres.exclude[genre]} />
                    </Show>
                  </label>
                </li>
              )}</For>
            </ol>
            <h3>Tags</h3>
            <ol>
              <For each={props.aniGenres().data.tags}>{tag => (
                <li classList={{exclude: genres.exclude[tag.name], hidden: !tag.name.toLowerCase().includes(filter())}}>
                  <label>
                    {tag.name}
                    <Show when={genres.exclude[tag.name]} fallback={
                      <input type="checkbox" data-steps="2" name="tag" value={tag.name} checked={genres[tag.name]} />
                    }>
                      <input type="checkbox" data-steps="2" name="excludeTag" value={tag.name} checked={genres.exclude[tag.name]} />
                    </Show>
                  </label>
                </li>
              )}</For>
            </ol>
          </Show>
        </Match>
      </Switch>
    );
  }
}
