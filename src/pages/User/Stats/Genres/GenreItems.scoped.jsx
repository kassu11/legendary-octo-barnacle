import {A, useParams} from "@solidjs/router";
import {useUser} from "../../../../context/providers.js";
import {For} from "solid-js";
import {GenresCardStats} from "./GenresCardStats.scoped.jsx";
import {GenreMediaCardsScoped} from "./GenreMediaCards.scoped.jsx";
import "./GenreItems.scoped.css";

export function GenreItems(props) {
  const params = useParams();
  const {user} = useUser();

  return (
    <ol class="grid-column-auto-fill">
      <For
        each={props.genres.sort((a, b) => b[props.state()] - a[props.state()] || a.genre.localeCompare(b.genre))}>{(genre, i) => (
        <li class="item">
          <div class="header">
            <div class="flex-space-between">
              <h2>
                <A href={"/search/" + params.type + "?onList=false&genre=" + genre.genre}>
                  {genre.genre}
                </A>
              </h2>
              <p class="ranking">#{i() + 1}</p>
            </div>
            <GenresCardStats genre={genre}/>
          </div>
          <div class="wrapper">
            <div className="flex-space-between">
              <p>User {params.type}</p>
              <A href={"/user/" + user().name + "/" + params.type + "?genre=" + genre.genre}>Show all</A>
            </div>
            <GenreMediaCardsScoped store={props.store} setStore={props.setStore} mediaIds={genre.mediaIds}
                                   allMediaIds={props.mediaIds()}
                                   mutate={props.mutate}/>
          </div>
        </li>
      )}</For>
    </ol>
  );
}