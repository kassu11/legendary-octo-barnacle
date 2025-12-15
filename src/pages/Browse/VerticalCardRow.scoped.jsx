import {A} from "@solidjs/router";
import {For, Match, Show, Switch} from "solid-js";
import {capitalize, formatMediaFormat, mediaUrl, numberCommas} from "../../utils/formating.js";
import EmojiByScoreScoped from "../../components/EmojiByScore.scoped.jsx";
import "./VerticalCardRow.scoped.css";

export function VerticalCardRowScoped(props) {
  asserts.assertTrue("href" in props, "Link is missing");
  asserts.isTypeString(props.type, "type");

  return (
    <section>
      <A href={props.href} class="header">
        <h2>{props.title}</h2>
        View all
      </A>
      <ol class="vertical-search-card-row">
        <For each={props.data}>
          {(card, i) => (
            <li class="vertical-search-card" style={{"--media-background-color": card.coverImage.color}}>
              <p class="ranking">
                #
                <span>{i() + 1}</span>
              </p>
              <div class="vertical-search-card-body">
                <A
                  class="cover-container"
                  href={mediaUrl(card)}>
                  <img src={card.coverImage.large} class="cover" alt="Cover."/>
                </A>
                <div class="vertical-search-card-content clamp">
                  <A class="line-clamp" href={mediaUrl(card)}>
                    {card.title.userPreferred}
                  </A>
                  <ol class="vertical-search-card-genre-list">
                    <For each={card.genres}>{genre => (
                      <li class="vertical-search-card-genre">
                        <A href={`/search${props.type ? ("/" + props.type) : ""}?genre=` + genre}>{genre}</A>
                      </li>
                    )}</For>
                  </ol>
                </div>
                <div class="vertical-search-card-info">
                  <div class="vertical-search-card-score">
                    <EmojiByScoreScoped score={card.averageScore}/>
                    <div class="clamp">
                      <p>{card.averageScore}%</p>
                      <p>{numberCommas(card.popularity)} users</p>
                    </div>
                  </div>
                  <div class="clamp">
                    <p>{formatMediaFormat(card.format)}</p>
                    <p>
                      <Switch>
                        <Match when={card.type === "ANIME"}>
                          <Show when={card.episodes} fallback="Ongoing">
                            {numberCommas(card.episodes)} Episode
                            <Show when={card.episodes > 1}>s</Show>
                          </Show>
                        </Match>
                        <Match when={card.type === "MANGA"}>
                          <Show when={card.chapters} fallback="Ongoing">
                            {numberCommas(card.chapters)} Chapter
                            <Show when={card.chapters > 1}>s</Show>
                          </Show>
                        </Match>
                      </Switch>
                    </p>
                  </div>
                  <div class="clamp">
                    <p>{capitalize(card.season)} {card.seasonYear}</p>
                    <p>{capitalize(card.status)}</p>
                  </div>
                </div>
              </div>
            </li>
          )}
        </For>
      </ol>
    </section>
  );
}
