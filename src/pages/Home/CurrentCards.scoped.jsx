import {For, Show} from "solid-js";
import {CurrentCardScoped} from "./CurrentCard.scoped.jsx";
import "./CurrentCards.scoped.css";

export function CurrentCardsScoped(props) {
  return (
    <Show when={props.cards.length}>
      <div class="grid-column-auto-fill current">
        <For each={props.cards}>{cardData => (
          <CurrentCardScoped data={cardData} mutateCache={props.mutateCache}/>
        )}</For>
      </div>
    </Show>
  );
}