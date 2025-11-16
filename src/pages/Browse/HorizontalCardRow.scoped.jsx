import {A} from "@solidjs/router";
import {For} from "solid-js";
import {AnilistMediaCard} from "../../components/Cards/Cards.scoped.jsx";
import "./HorizontalCardRow.scoped.css";

export function HorizontalCardRowScoped(props) {
  asserts.assertTrue("href" in props, "Link is missing");

  return (
    <section>
      <A href={props.href} class="header">
        <h2>{props.title}</h2>
        <span>View all</span>
      </A>
      <ol class="grid-reel-auto-fill">
        <For each={props.data}>{media => (
          <AnilistMediaCard media={media}/>
        )}</For>
      </ol>
    </section>
  );
}
